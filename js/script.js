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

    let deadline = '2022-02-17';
        

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

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //FormData Format
        // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')   //JSON Format

        let formData = new FormData(form);

        // let obj = {};     //JSON Format
        // formData.forEach(function(value, keyframes){
        //     obj[key] = value;
        // });                                //JSON Format
        // let json = JSON.stringify(obj);    //JSON Format

        request.send(formData);  //FormData Format
        // request.send(json); //JSON Format


        request.addEventListener('readystatechange', function(){
            if(request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState == 4 && request.status == 200){
                statusMessage.innerHTML = message.success;
            } else{
                statusMessage.innerHTML = message.failure;
            }
        });
        for(let i = 0; i < input.length; i++){
            input[i].value = '';
        } 
    });

    contactForm.addEventListener('submit', function(event){
        event.preventDefault();
        contactForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //FormData Format
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')   //JSON Format

        let formData = new FormData(contactForm);

        let obj = {};     //JSON Format
        formData.forEach(function(value, keyframes){
            obj[key] = value;
        });                                //JSON Format
        let json = JSON.stringify(obj);    //JSON Format

        // request.send(formData);  //FormData Format
        request.send(json); //JSON Format


        request.addEventListener('readystatechange', function(){
            if(request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState == 4 && request.status == 200){
                statusMessage.innerHTML = message.success;
            } else{
                statusMessage.innerHTML = message.failure;
            }
        });
    
        for(let i = 0; i < input.length; i++){
            input[i].value = '';
        } 
    });
// });