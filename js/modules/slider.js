function slider({container, slide, nextArrow, prevArrow,
                 totalCounter, currentCounter, wrapper, field}) {
    // Slider

    const prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          slider = document.querySelector(container),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slides = document.querySelectorAll(slide),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;

    // продвинутый слайдер(карусель)
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
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);

        dots.push(dot);
    }

    function addZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function dotOpasity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function replacePx(str)  {
        return +str.replace(/\D/g,'');
    }

    next.addEventListener('click', () => {
                    // width = '500px'
        if (offset == replacePx(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += replacePx(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZero();
        dotOpasity();
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
           offset = replacePx(width) * (slides.length - 1);
        } else {
            offset -= replacePx(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero();
        dotOpasity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = replacePx(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();
            dotOpasity();
        });
    });
}

export default slider;