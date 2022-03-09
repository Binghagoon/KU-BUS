function makeNavigator(role) {
  const navigator = $("<nav></nav>");
  navigator.attr("id", "sticky-nav");

  const mapBtn = $("<button></button>");
  mapBtn.attr("id", "map-home");
  mapBtn.text("홈");
  mapBtn.on("click", () => {
    if (role === "DRIVER") {
      location.href = "./map.html";
    } else if (role === "STUDENT") {
      location.href = "./first-page.html";
    }
  });
  const reservationBtn = $("<button></button>");
  reservationBtn.attr("id", "reservation-home");
  reservationBtn.text("예약내역");
  reservationBtn.on("click", () => {
    if (role === "DRIVER") {
      location.href = "./call-list.html";
    } else if (role === "STUDENT") {
      alert("미구현입니다.");
    }
  });
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
  const role = sessionStorage.getItem("kubus_member_role");

  makeNavigator(role);
});
