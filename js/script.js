window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer 

    let deadline = '2021-11-21';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

     // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
// contact form
        let form2 = document.querySelector("#form");
        let input2 = form2.getElementsByTagName('input');

        form2.addEventListener('submit', function(event) {
            event.preventDefault();
            form2.appendChild(statusMessage);
            let formData2 = new FormData(form2);
            
            function postData(data) {
                return new Promise(function(resolve, reject ){
                    let request2 = new XMLHttpRequest();
                    request2.open('POST', 'server.php');
                    request2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    let obj = {};
                    formData2.forEach(function(value, key) {
                        obj[key] = value;
                    });
            
                    let json = JSON.stringify(obj);
            
                    request2.addEventListener('readystatechange', function() {
                        if (request2.readyState < 4) {
                            resolve();
                        } else if (request2.readyState === 4) {
                            if(request2.status == 200 && request2.status < 3 ) {
                                resolve();
                            }
                            else{
                                reject();
                            }
                        } 
                    });
                    request2.send(json);
                });
           } //End PostData

        function clearInput() {
           for (let i = 0; i < input2.length; i++) {
            input2[i].value = '';
            }
        }

           postData(formData2) 
           .then(() => statusMessage.innerHTML = message.loading)
           .then(() => statusMessage.innerHTML = message.success)

           .catch(() => statusMessage.innerHTML = message.failure);

        });


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    let slideIndex = 1, 
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        showSlides(slideIndex);

        function showSlides(n) {

            if(n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            slides.forEach((item) => item.style.display = 'none');
            dots.forEach((item) => item.classList.remove('dot-active'));
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
        function currentSlides(n) {
            showSlides(slideIndex = n);
        }

        prev.addEventListener('click', function(){
            plusSlides(-1);
        });
        next.addEventListener('click', function(){
            plusSlides(1);
        });

        dotsWrap.addEventListener('click', function(event) {
            for(let i = 0; i < dots.length + 1; i++){
                if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
                    currentSlides(i);
                }
            }
        });


        //calc

        let persons = document.querySelectorAll(".counter-block-input")[0],
            restDays = document.querySelectorAll(".counter-block-input")[1],
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            personSum = 0,
            daysSum = 0,
            total = 0;

            totalValue.innerHTML = 0;

            persons.addEventListener('change', function(){
                personSum =+ this.value;
                total =(daysSum * personSum)+4000;

                if (restDays.value == '' || persons.value == '' ) {
                    totalValue.innerHTML = 0;
                }  else {
                    totalValue.innerHTML = total;
                }
            });

            restDays.addEventListener('change', function(){
                daysSum = +this.value;
                total =(daysSum * personSum)+4000;

                if (restDays.value == '' || persons.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }
            });

            place.addEventListener('change', function(){
                if(restDays.value == '' || persons.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    let a = total;
                    totalValue.innerHTML = a * this.options[this.selectedIndex].value;
                }
            });

});