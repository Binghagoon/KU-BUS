function makeNavigator() {
  const navigator = $("<nav></nav>");
  navigator.attr("id", "sticky-nav");

  const mapBtn = $("<button></button>");
  mapBtn.attr("id", "map-home");
  mapBtn.text("홈");
  mapBtn.on("click", () => {
    location.href = "./first-page.html";
  });
  const reservationBtn = $("<button></button>");
  reservationBtn.attr("id", "reservation-home");
  reservationBtn.text("예약내역");
  /*reservationBtn.on("click", () => {
    location.href = "./first-page.html";
  });*/
  const noticeBtn = $("<button></button>");
  noticeBtn.attr("id", "notice-home");
  noticeBtn.text("알림");
  /*noticeBtn.on("click", () => {
    location.href = "./first-page.html";
  });*/
  const myInfoBtn = $("<button></button>");
  myInfoBtn.attr("id", "my-info-home");
  myInfoBtn.text("내정보");
  myInfoBtn.on("click", () => {
    location.href = "./my-page.html";
  });

  navigator.append(mapBtn, reservationBtn, noticeBtn, myInfoBtn);
  $("body").append(navigator);
}

$(function () {
  makeNavigator();
});
