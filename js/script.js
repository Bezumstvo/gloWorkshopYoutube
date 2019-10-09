'use strict';
document.addEventListener('DOMContentLoaded', () => {
/* <screen keyboard> */
{
    const keyboardButton=document.querySelector('.search-form__keyboard');
    const keyboard=document.querySelector('.keyboard');
    const closeKeybard=document.querySelector('#close-keyboard');
    let searchInput=document.querySelector('.search-form__input');
    const toggleKeyboard =()=> {
        keyboard.style.top=keyboard.style.top?'':'50%';
    }
    const typing =event=> {
        let key = event.target.textContent;
        if (event.target.tagName == 'BUTTON') {
            if (!key.length) {key=' ';}else{key.trim()}
                switch (key.charCodeAt(0)) {
                    case 11013 : searchInput.value = searchInput.value.slice(0,-1);
                        break;
                    case 32 : searchInput.value += ' ';
                        break;
                    case 10 : break;
                default: searchInput.value += key.trim();
            }
        }
    }
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
// Modal
{
    const divYoutuber = document.createElement('div');

}



});