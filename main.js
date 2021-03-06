'use strict'

// Make navbar transparent when is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    }else {
        navbar.classList.remove('navbar--dark');
    }
});

// navbar메뉴
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    console.log(event.target.dataset.link);
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) { //링크가 있는경우만 실행
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoViews(link);
});

// navbar 햄버거
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

//home contact button
const contact_btn = document.querySelector('.home__contact');
contact_btn.addEventListener('click', (event) => {
    console.log(event.target.dataset.link);
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) { //링크가 있는경우만 실행
        return;
    }    
    scrollIntoViews(link);
})

// home 스크롤 시 투명하게
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(1 - window.scrollY / homeHeight);
    home.style.opacity = (1 - window.scrollY / homeHeight);
});

// arrow up 버튼 스크롤 시 보여지게
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2 ){
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

arrowUp.addEventListener('click', () => {
    scrollIntoViews('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    // 카테고리 클릭
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    //버튼을 클릭한경우 그대로 이벤트 사용 버튼이 아닌 span부분 클릭했을때는 부모노드에서 선택
    const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');    
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter ==='*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);

    
    console.log(filter);
});

function scrollIntoViews(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth'});
}