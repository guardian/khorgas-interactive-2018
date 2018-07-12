import VideoPlayer from '../components/video/index.html'
import dragscroll from 'dragscroll'
import Siema from 'siema'


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


// SLIDER CODE

var ticking = false;
var slider = document.getElementById("slider");
var sliderInner = document.getElementById("slider-inner");
var slidesWidth = sliderInner.getBoundingClientRect().width / 3;

slider.addEventListener("scroll", function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {

            slidesWidth = sliderInner.getBoundingClientRect().width / 3;

        if (slider.scrollLeft >= (slidesWidth)) {
             
           slider.scrollLeft = 0;
          
         }
            ticking = false;
        });
    }
    ticking = true;
});

// CAROUSEL CODE

const carousel = new Siema({
  selector: '.carousel',
  duration: 300,
  easing: 'ease-out',
  startIndex: 0,
  draggable: true,
  multipleDrag: true,
  threshold: 20,
  loop: false,
  rtl: false,
  onInit: () => {},
  onChange: () => { updateDots(); }
});

updateDots();

function updateDots() {


  [].slice.apply(document.querySelectorAll('.dot')).forEach(dot => {
       dot.classList.remove("dot-highlight");
    });

  document.getElementById("dot_" + carousel.currentSlide).classList.add("dot-highlight");

  var slideW = document.getElementById("carousel-slide_0").getBoundingClientRect().width;
  var wrapperW = document.getElementById("carousel-wrapper").getBoundingClientRect().width;


  var offsetWidth = ((wrapperW - slideW) / 2) + "px";

  console.log(offsetWidth);
 


  if (carousel.currentSlide != 0) {
   document.getElementById("carousel").style.marginLeft = offsetWidth;
 } else {
  document.getElementById("carousel").style.marginLeft="0";
 }


}
