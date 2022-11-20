/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector,activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem=>{
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            };
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });


    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');




}
//старый стандарт
// module.exports = calc;

// новый стандарт
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            //вызываем внутри чтоб автоматически произвести конвертацию валют
            this.chahgeToUAH();
        }

        chahgeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
        
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                
        `;
            this.parent.append(element);
        }

    }


    // CПОСОБ ДОБАВЛЕНИЯ ИЗ ВООБРАЖАЕМОЙ БАЗЫ ДАННЫХ db.json



    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        //данные прийдут в обычном формате и их не нужно трансформировать
        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });


    // axios.get('http://localhost:3000/menu')
    //     // .then(data => console.log(data));
    //     .then(data=>{
    //         data.data.forEach(({img,altimg,title,descr,price})=>{
    //                         new MenuCard(img,altimg,title,descr,price, '.menu .container').render();
    //         });
    //     });

    

     //СПОСОБ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ ЧЕРЕЗ НОВЫЙ ЭКЗЕМПЛЯР!!!!!!!!!





    // можем выбрать такой способ
    // const div = new MenuCard();
    // div.render();

    // а можем такой способ если не хотит сохранять в переменной

    
    
    
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     'menu__item',
    //     'big'
    // ).render();


    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     14,
    //     '.menu .container',
    //     // специально не вставляю классы чтоб проверить условие в методе render
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     21,
    //     '.menu .container',
    //     'menu__item'
    // ).render();







}

// module.exports = cards;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(){

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modalForm = document.querySelector('.modal');
    // const modalCloseBtn = document.querySelector('[data-close]');
    const modalInputs = document.querySelectorAll('.modal__input');
    
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', ()=>{
            openModal(modalForm);
        });
    });
    
    // modalCloseBtn.addEventListener('click', ()=>{
    //     closeModal(modalForm);
    // });
    
    
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
    
    modalForm.addEventListener('click', (e) => {
    
        //потомучто modal занимает всю страницу высота и ширина 100% и позишион фиксед!!!!!!
        //и задали бакграунд!!!!!!!серый 
        if (e.target === modalForm || e.target.getAttribute('data-close') == '') {
            closeModal(modalForm);
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalForm.classList.contains('show')) {
            closeModal(modalForm);
        }
    });
    
    //чаще используется для рекламы!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const modalTimerId = setTimeout(function(){
    //     modalForm.classList.add('show');
    //     modalForm.classList.remove('hide');
    //     //запрещает скролить пока открыто модальное окно
    //     document.body.style.overflow = 'hidden';
    //     //clearInterval(modalTimerId);
    // }, 3000);
    //setTimeout(openModal,3000);
    
    
   //c урока MYfreedom
    
    // const modalBtn = document.querySelector('.modal__btn');
    
    
    // modalBtn.addEventListener('click', function(event) {
    //     event.preventDefault();
    
    //     const resData ={};
    //     modalInputs.forEach(input =>{
    //         resData[input.getAttribute('name')] =input.value;
    //         //resData['name'] = input.value;
    //     });
    //     console.log(resData);
    //     closeModal(modalForm);
    //     openModal(modalConfirmation);
    //     setTimeout(() =>{
    //         closeModal(modalConfirmation);
    //     }, 3000);
        
    // });
    
    // const modalConfirmation = document.querySelector('.modal-confirmation');
    // const orderInputs = document.querySelectorAll('.order__input');
    // const orderBtn = document.querySelector('.order__btn');
    
    
    // orderBtn.addEventListener('click', function(event) {
    //     event.preventDefault();
    
    //     const resData = {};
    //     orderInputs.forEach(input =>{
    //         resData[input.getAttribute('name')] = input.value;
    //         //resData['name'] = input.value;
    //     });
    //     console.log(resData);
    //     openModal(modalConfirmation);
    //     setTimeout(() =>{
    //         closeModal(modalConfirmation);
    //     }, 3000);
    // });
    
    
    
    
    
    

}

// module.exports = modal;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){

    //простой способ

    // const slides = document.querySelectorAll('.offer__slide');
    // const prev = document.querySelector('.offer__slider-prev');
    // const next = document.querySelector('.offer__slider-next');
    // const total = document.querySelector('#total');
    // const current = document.querySelector('#current');

    //     let slideIndex = 1;

    //     showSlides(slideIndex);

    //     if(slides.length < 10){
    //         total.textContent = `0${slides.length}`;
    //     } else{
    //         total.textContent = slides.length;
    //     }

    //    function showSlides(n){
    //         if(n > slides.length){
    //             slideIndex = 1;
    //         }
    //         if(n < 1){
    //             slideIndex = slides.length;
    //         }

    //         slides.forEach(item=>{
    //             item.style.display ='none';
    //         })

    //         slides[slideIndex - 1].style.display ='block';

    //         if(slides.length < 10){
    //             current.textContent = `0${slideIndex}`;
    //         } else{
    //             current.textContent = slideIndex;
    //         }

    //     }

    //     function plusSlides(n){
    //         showSlides(slideIndex += n);
    //     }

    //     prev.addEventListener('click',()=>{
    //         plusSlides(-1);
    //     });
    //     next.addEventListener('click',()=>{
    //         plusSlides(1);
    //     });


    
    
    
    //карусель сложный вариант

    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    // Создание навигации для слайдера
    const slider = document.querySelector('.offer__slider');

    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.8s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });


    //навигация по слайдеру 

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    const dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        // if(i = 0){
        //     dot.style.opacity = 1;
        // }    

        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {

        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { //650px
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        checkAmountSlidseBeforeTen(slides);
        getActiveDot(dots);
    })

    prev.addEventListener('click', () => {
        if (offset == 0) { //650px
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        
        checkAmountSlidseBeforeTen(slides);
        getActiveDot(dots);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            
            slidesField.style.transform = `translateX(-${offset}px)`;

            checkAmountSlidseBeforeTen(slides);
            getActiveDot(dots);
        });
    });


    function getActiveDot(arrDots){
        arrDots.forEach(dot => dot.style.opacity = '.5');
        arrDots[slideIndex - 1].style.opacity = 1;
    }

    function checkAmountSlidseBeforeTen(slides){
        if (slides.length < 10) {
          return  current.textContent = `0${slideIndex}`;
        } else {
          return  current.textContent = slideIndex;
        }
    }


}

// module.exports = slider;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){

    //tabs

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


}


// module.exports = tabs;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {

    // timer

    const deadLine = new Date('2023-12-31T12:00:00');

    function getRemainingTame(endTime) {
        let remaningTime = Date.parse(endTime) - Date.parse(new Date());
        if (remaningTime <= 0) {
            return {
                total: remaningTime,
                days: 0,
                hours: 0,
                minuts: 0,
                seconds: 0
            }
        } else {
            let remaningDays = Math.floor((remaningTime / (1000 * 60 * 60 * 24)));
            let remaningHours = Math.floor((remaningTime / (1000 * 60 * 60)) % 24);
            let remaningMinuts = Math.floor((remaningTime / (1000 * 60)) % 60);
            let remaningSeconds = Math.floor((remaningTime / (1000)) % 60);

            return {
                total: remaningTime,
                days: remaningDays,
                hours: remaningHours,
                minuts: remaningMinuts,
                seconds: remaningSeconds
            }
        }
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTime(selector, endTime) {
        const timeWrapper = document.querySelector(selector);
        const days = timeWrapper.querySelector('#days');
        const hours = timeWrapper.querySelector('#hours');
        const minuts = timeWrapper.querySelector('#minutes');
        const seconds = timeWrapper.querySelector('#seconds');
        const timeInterval = setInterval(updateTime, 1000);
        //вызываем чтоб небылр мегания верстки т к setInerval запуститься только через 1 с
        updateTime();

        function updateTime() {
            const timeDifferens = getRemainingTame(endTime);

            days.innerHTML = addZero(timeDifferens.days);
            hours.innerHTML = addZero(timeDifferens.hours);
            minuts.innerHTML = addZero(timeDifferens.minuts);
            seconds.innerHTML = addZero(timeDifferens.seconds);

            if (timeDifferens.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }
    setTime('.timer', deadLine);









}


// module.exports = timer;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
// ES 6








window.document.addEventListener('DOMContentLoaded', () => {


    // const calc = require('./modules/calc');
    // const cards = require('./modules/cards');
    // const forms = require('./modules/forms');
    // const modal = require('./modules/modal');
    // const slider = require('./modules/slider');
    // const tabs = require('./modules/tabs');
    // const timer = require('./modules/timer');
     

    
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();

   

    



    




});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map