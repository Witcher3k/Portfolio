window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const typing = document.querySelector('.typing h1');
const info = document.querySelectorAll('.more-info')
const cv = $('.cv');
const projects = $('.projects');

const infoAnimation = (e) => {
    if (e.animationName === "typing") {
        info[0].classList.add('animated', 'bounceInLeft');
    }
}
typing.addEventListener("animationend", infoAnimation);


projects.waypoint(function () {
    console.log('halko');
    info[1].classList.add('animated', 'bounceInLeft');
}, {
    offset: '50%'
})
cv.waypoint(function () {
    info[2].classList.add('animated', 'bounceInLeft');
    info[3].classList.add('animated', 'bounceInLeft');
}, {
    offset: '50%'
});



info[0].addEventListener('click', function () {
    document.querySelector('main').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})
info[1].addEventListener('click', function () {
    document.querySelector('.cv h2').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})