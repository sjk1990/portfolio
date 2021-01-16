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

  const scrollTo = document.querySelector(link);
  console.log(scrollTo);
  scrollTo.scrollIntoView({ behavior: "smooth" });
});
