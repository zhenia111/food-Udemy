function forms(){

    const forms = document.querySelectorAll('form');
    const modalForm = document.querySelector('.modal');
    const modalInputs = document.querySelectorAll('.modal__input');

    const message = {
        loading: 'img/formspiner/spinner.svg',
        seccess: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bingPostData(item);
    });

    

    const postData = async (url, data)=>{
        const res = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

       return await res.json(); 
    } 


    function bingPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests',json ) 
            .then(data => {
                console.log(data);
                showThanksModal(message.seccess);
                statusMessage.remove();
            }).catch(()=>{
                showThanksModal(message.failure);
            }).finally(()=>{
                form.reset();
            })

        });
    }




    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        
        openModal(modalForm);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
    <div class='modal__content'>
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(modalForm);
        }, 4000)
    }



    function openModal(targetModal) {
        targetModal.classList.add('show');
        targetModal.classList.remove('hide');
        //запрещает скролить пока открыто модальное окно
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);

    }

    function closeModal(targetModal) {
        targetModal.classList.add('hide');
        targetModal.classList.remove('show');
        document.body.style.overflow = '';
        //вызываем для стрерания данных из инпутов!!!!!!!!
        clearModalInput();
    }

    function clearModalInput() {
        modalInputs.forEach(input => {
            input.value = '';
        })
    }


    fetch('http://localhost:3000/menu')
    .then(data=> data.json())
    .then(res=>console.log(res));






}

// module.exports = forms;

export default forms;