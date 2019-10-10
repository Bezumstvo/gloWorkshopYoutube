'use strict';
document.addEventListener('DOMContentLoaded', () => {
/* <screen keyboard> */
{
    const keyboardButton=document.querySelector('.search-form__keyboard');
    const keyboard=document.querySelector('.keyboard');
    const closeKeybard=document.querySelector('#close-keyboard');
    let searchInput=document.querySelector('.search-form__input');
    let cursorStart,cursorEnd;
    searchInput.addEventListener('click', () => { 
        cursorStart = searchInput.selectionStart;
        cursorEnd = searchInput.selectionEnd;
        console.log(searchInput.focus);
    })
    const toggleKeyboard =()=> {
        keyboard.style.top=keyboard.style.top?'':'50%';
        searchInput.focus();
    }
    const changeLang = (btn, lang) => {
        const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
            'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
            'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
            'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
            'en', ' '
        ];
        const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
            'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
            'ru', ' '
        ];
        if (lang === 'en') {
            btn.forEach((elem, i) => {
                elem.textContent = langEn[i];
            })
        } else {
            btn.forEach((elem, i) => {
                elem.textContent = langRu[i];
            })
        }
    };

    const typing = event => {
        const target = event.target;
        searchInput.focus();
        searchInput.selectionStart = cursorStart;
        searchInput.selectionEnd = cursorEnd;
        if (target.tagName === 'BUTTON') {
            const buttons = [...keyboard.querySelectorAll('button')]
                .filter(elem => elem.style.visibility !== 'hidden');
            const contentButton = target.textContent.trim();

            if (contentButton === '⬅') {
                searchInput.value = searchInput.value.slice(0,cursorStart-1)+searchInput.value.slice(cursorEnd);
                cursorStart=cursorStart-2;
            } else if (!contentButton) {
                searchInput.value = searchInput.value.slice(0,cursorStart)+ ' ' + searchInput.value.slice(cursorEnd);
            } else if (contentButton === 'en' || contentButton === 'ru') {
                changeLang(buttons, contentButton)
            } else {
                searchInput.value = searchInput.value.slice(0,cursorStart)+contentButton + searchInput.value.slice(cursorEnd);
            }
            cursorStart++;
            cursorEnd = cursorStart;
            searchInput.selectionStart = cursorStart;
            searchInput.selectionEnd = cursorStart;
        }
    };

    keyboardButton.addEventListener('click', toggleKeyboard);
    closeKeybard.addEventListener('click', toggleKeyboard);
    keyboard.addEventListener('click', typing);
}
/* </screen keyboard> */
/* <menu> */
{
    const burger = document.querySelector('.spinner');
    const sidebarMenu = document.querySelector('.sidebarMenu');

    burger.addEventListener('click', ()=> {
        burger.classList.toggle('active');
        sidebarMenu.classList.toggle('rollUp');
    })
    sidebarMenu.addEventListener('click', event => {
        const target= event.target.closest('a[href="#"]');
        if (target) {
            const parentTarget = target.parentElement;
            sidebarMenu.querySelectorAll('li').forEach(elem => {
                if (elem === parentTarget) {
                    elem.classList.add('active') }
                else{
                    elem.classList.remove('active');
                }
            })
            }
    })
}
/* </menu> */
/* <Modal> */
{
    document.body.insertAdjacentHTML('beforeend', `
    <div class="youTuberModal">
     <div id="youtuberClose">&#215;</div>
     <div id="youtuberContainer"></div>
    </div>`);

    const youtuberItems = document.querySelectorAll('[data-youtuber]');
    const youTuberModal = document.querySelector('.youTuberModal');
    const youtuberContainer = document.getElementById('youtuberContainer');
    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];
    const sizeVideo = () => {
            let ww = document.documentElement.clientWidth;
            let wh = document.documentElement.clientHeight;
           for (let i = 0; i < qw.length; i++) {
                if (ww > qw[i]) {
                    youtuberContainer.querySelector('iframe').style.cssText = `
                        width: ${qw[i]}px;
                        height: ${qh[i]}px;
                    `;
                    youtuberContainer.style.cssText = `
                        width: ${qw[i]}px;
                        height: ${qh[i]}px;
                        top: ${(wh - qh[i]) / 2}px;
                        left: ${(ww - qw[i]) / 2}px;
                    `;
                    break;
                }
            }
        };

    youtuberItems.forEach(elem => {
        elem.addEventListener('click', () => {
            const idVideo = elem.dataset.youtuber;
            youTuberModal.style.display = 'block';
            const youTuberFrame = document.createElement('iframe');
            youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
            youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);
            window.addEventListener('resize', sizeVideo);
            sizeVideo();
        });
    });
    youTuberModal.addEventListener('click', () => {
        youTuberModal.style.display = '';
        youtuberContainer.textContent = '';
        window.removeEventListener('resize', sizeVideo);
    });
}
/* </Modal> */
/* <Youtube> */
{
    const API_KEY = 'AIzaSyC2wQ5A4450vaXIM9efyrWD6vFekTAK-18';
    const CLIENT_ID = '731282509146-fqk9b684lk93b6tstm7dudeoo8u5js9g.apps.googleusercontent.com';
}
/* </Youtube> */


});