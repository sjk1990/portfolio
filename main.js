"use strict";

// 스크롤시 navbar 배경색을 추가함
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//navbar 메뉴 클릭시 해당 화면으로 이동
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  //   console.dir(event.target.dataset.link);
  const link = event.target.dataset.link;
  if (!link) {
    return;
  }

  scrollIntoView(link);
});

//contact버튼 화면이동 처리
const contact = document.querySelector(".home__contact");
contact.addEventListener("click", () => {
  scrollIntoView("#contact");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

//스크롤에 따른 home 컨테이너 fade out
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  //   console.log(1 - window.scrollY / homeHeight);
  home.style.opacity = 1 - window.scrollY / homeHeight;
});
