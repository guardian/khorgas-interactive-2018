import VideoPlayer from '../components/video/index.html'
//import dragscroll from 'dragscroll'
//import Siema from 'siema'
import Swiper from 'swiper'
import detect from './detect'


var isAndroidApp = ( detect.isAndroid() && window.location.origin === "file://" ) ? true : false;


//initialise video player
const VideoEls = document.querySelectorAll(".visual-element--video[data-header=true]");
let videoPlayers = [];

[].slice.apply(VideoEls).forEach((el, i) => {
    console.log(i)
    const player = new VideoPlayer({
    	target: el,
        data: {
            loop: true,
            targetEl: el,
            mobileSrc: el.getAttribute("data-mobileSrc"),
            desktopSrc: el.getAttribute("data-desktopSrc")
        }
    })
    videoPlayers.push(player);
});

setTimeout(() => {
    const mainVideoEls = document.querySelectorAll(".visual-element--video[data-header=false]");

    [].slice.apply(mainVideoEls).forEach((el, i) => {
        const player = new VideoPlayer({
            target: el,
            data: {
                loop: true,
                targetEl: el,
                mobileSrc: el.getAttribute("data-mobileSrc"),
                desktopSrc: el.getAttribute("data-desktopSrc")
            }
        })
        videoPlayers.push(player);
    });
}, 500);



//initialise share tools

const twitterBaseUrl = 'https://twitter.com/intent/tweet?text=';
const facebookBaseUrl = 'https://www.facebook.com/dialog/feed?display=popup&app_id=741666719251986&redirect_uri=http://www.theguardian.com&link=';
const googleBaseUrl = 'https://plus.google.com/share?url=';

function share(title, shareURL, fbImg, twImg, hashTag) {
    var twImgText = twImg ? ` ${twImg.trim()} ` : ' ';
    var fbImgQry = fbImg ? `&picture=${encodeURIComponent(fbImg)}` : '';
    return function (network, extra='') {
        var twitterMessage = `${extra}${title}`;
        var shareWindow;

        if (network === 'twitter') {
            shareWindow = twitterBaseUrl + encodeURIComponent(twitterMessage + ' ') + shareURL;
        } else if (network === 'facebook') {
            shareWindow = facebookBaseUrl + 'https://www.theguardian.com/inequality/ng-interactive/2017/nov/18/life-shadow-grenfell-tower-next-door';
        } else if (network === 'email') {
            shareWindow = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + 'https://www.theguardian.com/inequality/ng-interactive/2017/nov/18/life-shadow-grenfell-tower-next-door';
        } else if (network === 'google') {
            shareWindow = googleBaseUrl + '';
        }

        window.open(shareWindow, network + 'share', 'width=640,height=320');
    }
}


var shareFn = share('The tower next door: Life #InTheShadowOfGrenfell https://www.theguardian.com/inequality/ng-interactive/2017/nov/18/life-shadow-grenfell-tower-next-door', 'https://t.co/MJ8I1aLw8n', '');
[].slice.apply(document.querySelectorAll('.interactive-share')).forEach(shareEl => {
    var network = shareEl.getAttribute('data-network');
    shareEl.addEventListener('click',() => shareFn(network));



});


// SLIDER STUFF


var fastSpeed = 400;
var slowSpeed = 14000;

var swiper = new Swiper('.slider-container', {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 0,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      speed: slowSpeed
    });


var i = 0;


swiper.forEach(swipe => {
    var index = i;
    swiper[index].on('touchStart', function(e) { onSliderTouchStart(index); });
    swiper[index].on('touchEnd', function(e) { onSliderTouchEnd(index); });
    swiper[index].on('slideChangeTransitionEnd', function(e) { onSliderTransitionEnd(index); });
    i++;
});


function onSliderTransitionEnd(ind) {
 swiper[ind].autoplay.start();
 swiper[ind].params.speed = slowSpeed;
}

function onSliderTouchStart(ind) {
 swiper[ind].autoplay.stop();
 swiper[ind].params.speed = fastSpeed;
}

function onSliderTouchEnd(ind) {

  var spd;
 
  if (swiper[ind].touches.diff > 0) {
     //swiper[ind].slideToClosest(300);
    spd=450;
    //swiper[ind].slideNext();
  } else {
    spd = 350;
    swiper[ind].autoplay.start();
    
  }
  swiper[ind].params.speed = spd;
  swiper[ind].el.classList.add("ease");
  //console.log(swiper[ind]);
  

  setTimeout(function(){ updateSliderTransitions(ind);}, (spd - 10));

}

function updateSliderTransitions(ind) {
  //console.log("fired2");
  swiper[ind].params.speed = slowSpeed;
  swiper[ind].el.classList.remove("ease");
  swiper[ind].autoplay.start();

  //swiper[ind].el.querySelector(".swiper-wrapper").style.transitionDuration ="14000ms";


//console.log(swiper[ind].autoplay.running);
  //swiper[ind].autoplay.stop();
  //swiper[ind].autoplay.start();
  //swiper[ind].autoplay.start();
  //swiper[ind].update();
  // if (!swiper[ind].animating) {
  //   swiper[ind].slideNext();
  // }
  //setTimeout(function(){ console.log("fired3");swiper[ind].autoplay.start();}, 100);
}


// CAROUSEL STUFF

var carousel = new Swiper('.carousel-container', {
      slidesPerView: "auto",
      spaceBetween: 20,
      centeredSlides: false,
      breakpoints: {
        579: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesOffsetAfter: 0
        },
        739: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesOffsetAfter: 0
        },
        979: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesOffsetAfter: 0
        }
      },
      loop: false,
      grabCursor: true,
      pagination: {
        el: '.carousel-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      speed: 300,
      slidesOffsetAfter: 80
    });

var beginning = true;

carousel.on('slideChangeTransitionStart', function(e) { updateCarouselMargin(); });
//carousel.on('reachBeginning', function(e) { beginning = true; });


carousel.slideTo(1, 10);
carousel.slideTo(0, 10);

function updateCarouselMargin() {

var trans;

  var marginEl = document.querySelector(".swiper-dummy");

 if ( carousel.activeIndex == 0 && isMobile()) {

  var margin = marginEl.offsetWidth - marginEl.clientWidth; 
//console.log(margin);
 trans = carousel.translate - marginEl.clientWidth + margin;
 //console.log(marginEl.offsetWidth + "  " + marginEl.clientWidth);

  carousel.setTranslate(trans);

}

if (carousel.activeIndex == 0) {
  //console.log(carousel.params.navigation);
  // hide prevButton;
  carousel.allowSlidePrev = false;
  carousel.navigation.prevEl.classList.add(carousel.params.navigation.disabledClass);
} else {
  carousel.allowSlidePrev = true;
  carousel.navigation.prevEl.classList.remove(carousel.params.navigation.disabledClass);
}

//beginning = false;



  //console.log(carousel.translate);

  //var trans = carousel.translate + 200;

  //carousel.setTranslate(trans);
  //carousel.translate -=200;
  //console.log(carousel.getTranslate());
  //console.log(carousel.previousIndex);
  // var el = document.querySelector(".swiper-margin-wrapper");
  // if ( carousel.activeIndex == 0 && carousel.previousIndex == 1) {
  //   //el.classList.remove("carousel-centered");
  //   centerCarousel(false);
  // } else if (carousel.activeIndex == 1 && carousel.previousIndex == 0) {
  //   centerCarousel(true);
  //   //carousel.params.centeredSlides = true;
  //   //carousel.update();
  //   //el.classList.add("carousel-centered");
  // }
}

// Fix android app horizontal scroll issues


if(isAndroidApp && window.GuardianJSInterface.registerRelatedCardsTouch){

i = 0;

swiper.forEach(swipe => {
    var index = i;
    swiper[index].wrapperEl.addEventListener("touchstart", function(){
            window.GuardianJSInterface.registerRelatedCardsTouch(true);
        });
    swiper[index].wrapperEl.addEventListener("touchend", function(){
            window.GuardianJSInterface.registerRelatedCardsTouch(false);
        });
    i++;
});



        var sliderEl = document.querySelector('.carousel-container');

        sliderEl.addEventListener("touchstart", function(){
            window.GuardianJSInterface.registerRelatedCardsTouch(true);
        });
        sliderEl.addEventListener("touchend", function(){
            window.GuardianJSInterface.registerRelatedCardsTouch(false);
        });
  }

// function centerCarousel(bool) {
//    var el = document.querySelector(".swiper-margin-wrapper");
//   if (bool) {
//     el.classList.add("carousel-centered");
//     //setTimeout(function(){ carousel.params.centeredSlides = true;carousel.update(); }, 230);
//     //setTimeout(function(){ el.classList.add("carousel-centered"); }, 1);
//   } else {
//     el.classList.remove("carousel-centered");
//     //setTimeout(function(){ carousel.params.centeredSlides = false;carousel.update(); }, 230);
//     //setTimeout(function(){ el.classList.remove("carousel-centered"); }, 1);
//   }
// }

function isMobile() {
    var dummy = document.querySelector(".swiper-dummy");
    if (getStyle(dummy) == 'block') {
        return true;
    } else {
        return false;
    }
}

function getStyle(element) {
    return element.currentStyle ? element.currentStyle.display :
        getComputedStyle(element, null).display;
}

