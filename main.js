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
  const link = event.target.dataset.link;
  if (!link) {
    return;
  }
  // 해당 섹션으로 이동 후 메뉴바 닫힘
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// 스크린 줄어들 경우 Navbar toggle btn
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

//contact버튼 화면이동 처리
const contact = document.querySelector(".home__contact");
contact.addEventListener("click", () => {
  scrollIntoView("#contact");
});

//스크롤에 따른 home 컨테이너 fade out
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  //   console.log(1 - window.scrollY / homeHeight);
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// arrow-up 버튼 생성, 해제
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// arrow-up 버튼 클릭시 홈화면 이동
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

//project filtering
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (!filter) {
    return;
  }

  //categoryBtn 선택시 이전 선택지 제거
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  //새 선택지 선택
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("animation-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("animation-out");
  }, 300);
});

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testmonials",
  "#contact",
];
//섹션과 메뉴아이템을 가져옴
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  // 이전 선택된 navitem의 active 삭제
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  // console.log(selector);
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

//옵저버 옵션
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

//옵저버가 할 일 정의 (해당섹션을 찾아 메뉴활성화)
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    //화면이 밖으로 나가거나 && 화면에 노출중인 것(intersectionRatio!==0) 제외
    // 페이지가 로딩되자마자 밖으로 나가지기 때문
    console.log(entry.target);
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

// 옵저버를 만들고 옵션과 콜백을 전달
// 원하는 요소가 특정 영역에 들어오거나 나갈 때 콜백함수 실행
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 옵저버를 이용하여 섹션들을 관찰
sections.forEach((section) => observer.observe(section));

//scroll 과 wheel의 차이점 -> wheel은 사용자가 직접 이동할 때만 이벤트 발생
// --> scroll은 화면 이동시 자동적으로 이벤트 발생
window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
    //(스크롤을 맨 밑으로 내렸을때 y포지션과 남은 윈도우창의 높이의 합) 과
    //페이지의 전체높이와 같다면  --> 맨 밑임을 확인함.
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
