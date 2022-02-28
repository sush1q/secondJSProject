// window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for(let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    let deadline = '2022-03-27';
        

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/(1000*60*60));
            
            return {
                'total' : t,
                'seconds' : seconds,
                'minutes' : minutes,
                'hours' : hours,
            };
    }

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = document.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock(){
            let t = getTimeRemaining(endtime);
            function addZero(num){
                if (num <= 9){
                    return '0'+num;
                }
                else{
                    return num;
                }
            }
            seconds.textContent = addZero(t.seconds);
            minutes.textContent = addZero(t.minutes);
            hours.textContent = addZero(t.hours);

            if(t.total <= 0){
                seconds.textContent = '00';
                minutes.textContent = '00';
                hours.textContent = '00';
                clearInterval(timeInterval);
            }
        }
    }
    setClock('timer', deadline+' 00:00:00');

    //Modal

    let more = document.querySelector('.more'),
        close = document.querySelector('.popup-close'),
        descriptionMore = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay');

    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        // document.body.style.overflow = 'hidden';       //запрет прокрутки страницы с открытым поп-ап окном
    });

    
    function showTabMore(){
        for(let i = 0; i < descriptionMore.length; i++){
            descriptionMore[i].addEventListener('click', function(){
                overlay.style.display = 'block';
                descriptionMore[i].classList.add('more-splash');
               // document.body.style.overflow = 'hidden';       //запрет прокрутки страницы с открытым поп-ап окном
            });
        }
    }
    showTabMore();

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form

    let message = {
        loading: "Загрузка...",
        success: "Спасибо, мы скоро с вами свяжемся!",
        failure: "Что-то пошло не так..."
    };

    let form = document.querySelector('.main-form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        contactForm = document.querySelector('#form');

    statusMessage.classList.add('status');


    function sendForm(elem){
        elem.addEventListener('submit', function(event){
            event.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);
            console.log('formData ' + formData);
            let obj = {};
            formData.forEach(function(value, key){
                obj[key] = value;
                console.log('obj ' + obj);
            })
            let json = JSON.stringify(obj);
            console.log('json ' + json);


        function postData(data){
            return new Promise(function(resolve, reject){
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php');

                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                request.onreadystatechange =  function(){
                    if(request.readyState < 4){
                        resolve()
                    } else if(request.readyState === 4){
                        if (request.status == 200 && request.readyState < 3){
                            resolve()
                        }
                        else{
                            reject()
                        }
                    }
                }
                request.send(data);
            });
        }

        function clearInput(){  
            for(let i = 0; i < input.length; i++){
                input[i].value = '';
            }
        }

        postData(json)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(()=> statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput)
    });
}
sendForm(form);
sendForm(contactForm);

// Slider
    let slideIndex = 1, 
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    function showSlides(n){

        if(n > slides.length){
            slideIndex = 1;
        }
        if(n < 1){
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n){
        showSlides(slideIndex += n);
    }
    function currentSlide(n){
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', function(){
        plusSlides(-1);
    });
    next.addEventListener('click', function(){
        plusSlides(1);
    })
    dotsWrap.addEventListener('click', function(event){
        for(let i = 0; i < dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });

    //calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue =  document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function(){
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(restDays.value == ''|| persons.value == ''){
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function(){
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(persons.value == ''|| restDays.value == ''){
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function(){
            if(restDays.value == '' || persons.value == ''){
                totalValue.innerHTML = 0
            } else{
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        })
// });
