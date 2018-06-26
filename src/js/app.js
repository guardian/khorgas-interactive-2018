import VideoPlayer from '../components/video/index.html'

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
