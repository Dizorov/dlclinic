'use strict';


import { event } from 'jquery';
import * as swiper from './modules/swiper.js';
import * as animation from './modules/animation.js';
import * as menu from './modules/menu.js';
import * as validation from './modules/validation.js';
import { mapInit } from './modules/map.js';

import 'lazysizes';

var $ = require("jquery");
window.jQuery = $;

var fancybox = require("@fancyapps/fancybox");

import Masonry from 'masonry-layout'

// Определение тач устройств
const breakpointMobile = window.matchMedia('(min-width:1180px)');

let mobileFlag = false;
const breakpointCheckerForMobile = function() {
    // if larger viewport and multi-row layout needed

    if (breakpointMobile.matches === true) {
        mobileFlag = false
    } else if (breakpointMobile.matches === false) {
        mobileFlag = true;
    }
}

breakpointMobile.addListener(breakpointCheckerForMobile);
breakpointCheckerForMobile();


// Нестандартная сетка в отзывах
var grid = document.querySelector('.grid');
var msnry;
if (grid) {
    imagesLoaded(grid, function() {
        // init Isotope after all images have loaded
        msnry = new Masonry(grid, {
            gutter: '.gup-item',
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            percentPosition: true
        });
    });
}

// Фэнси бокс галерея для галерей и попапов

$('[data-fancybox]').fancybox({
    buttons: [
        'slideShow',
        'fullScreen',
        'thumbs',
        //'share',
        'download',
        //'zoom',
        'close'
    ],
    thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        // parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
    },

});




// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});






function muteAndUnMuteVideo() {
    let btnSound = document.querySelector('.hero__sound');
    let flagVideo = false;
    if (btnSound) {
        btnSound.addEventListener('click', function() {
            btnSound.classList.toggle('off');
            if (!flagVideo) {
                videoHero.muted = false;
                flagVideo = true;
            } else {
                videoHero.muted = true;
                flagVideo = false;
            }
        })
    }

};

let videoHero = document.querySelector('.hero__video');
let preloader = document.querySelector('.preloader');
window.addEventListener('load', function() {


    if (document.querySelector('.swiper-container--banner')) {
        document.querySelector('.swiper-container--banner').classList.add('load');
    }

    if (!mobileFlag) {
        if (videoHero) {
            // Загружаем видео
            videoHero.getElementsByTagName('source')[0].src = videoHero.dataset.src;
            videoHero.load();
            videoHero.muted = true;
        }

        setTimeout(function() {
            // Убираем прелоадер и начинаем проигрывать видео
            if (preloader) {
                preloader.style.opacity = 0;
                preloader.style.pointerEvents = 'none';

                if (videoHero) {
                    videoHero.play();
                }

                // При клике включаем звук, пока оставить потом посмотри
                let firstClick;
                document.querySelector('.hero').addEventListener('click', function() {
                    if (!firstClick) {
                        firstClick = true;
                        document.querySelector('.hero__sound').click();
                    }

                })

                // Запускаем функцию вкл выкл звук
                muteAndUnMuteVideo();
            }




        }, 2000)


    }


    setTimeout(function() {
        mapInit();
    }, 5000)
})






















// Маленькие действия
// Поиск
// Кнопка поделиться


// Клик по фрейму включается скролл
let frame = document.querySelectorAll('.frame3d__wrap');

for (let i = 0; i < frame.length; i++) {

    frame[i].addEventListener('click', function() {
        frame[i].querySelector('iframe').style.pointerEvents = "auto";
    })
}

document.querySelector('.search').addEventListener('click', function() {
    document.querySelector('.search').classList.toggle('active');
    document.querySelector('.form-search').classList.toggle('active');
})

if (document.querySelector('.share__btn')) {
    document.querySelector('.share__btn').addEventListener('click', function() {
        document.querySelector('.share').classList.toggle('active');
    })
}