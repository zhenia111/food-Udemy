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

export default slider;