$(document).ready(function () {
  $("#calling").on("click", function () {
    location.href = "./seat-list.html";
  });

  $("#reservation").on("click", function () {
    alert("아직은 지원하지 않는 기능입니다.");
  });
});
