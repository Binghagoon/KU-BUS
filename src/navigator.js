function makeNavigator() {
  const navigator = $("<nav></nav>");
  navigator.attr("id", "sticky-nav");

  const mapBtn = $("<button></button>");
  mapBtn.attr("id", "map-home");
  mapBtn.attr("class", "select");
  mapBtn.text("지도");
  const reservationBtn = $("<button></button>");
  reservationBtn.attr("id", "reservation-home");
  reservationBtn.text("예약내역");
  const noticeBtn = $("<button></button>");
  noticeBtn.attr("id", "notice-home");
  noticeBtn.text("알림");
  const myInfoBtn = $("<button></button>");
  myInfoBtn.attr("id", "my-info-home");
  myInfoBtn.text("내 정보");

  navigator.append(mapBtn, reservationBtn, noticeBtn, myInfoBtn);
  $("body").append(navigator);
}

$(function () {
  makeNavigator();
});
