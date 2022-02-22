$(document).ready(function () {
  $("#calling").on("click", function () {
    parent.$("iframe").attr("src", "./student/seat-list.html");
  });

  $("#reservation").on("click", function () {
    parent.alert("아직은 지원하지 않는 기능입니다.");
  });
});
