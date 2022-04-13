$(document).ready(function () {
  $("#calling").on("click", function () {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    
    $.ajax({
      url: "../node/allow-times/check",
      type: "GET",
      data: {
        minute: minutes,
      },
      success: function (data) {
        if (data["status"]) {
          location.href = "./seat-list.html";
        } else {
          alert("콜 가능 시간이 아닙니다.");
        }
      },
      error: function () {
        alert("Allow time check error");
      },
    });
  });

  $("#reservation").on("click", function () {
    alert("아직은 지원하지 않는 기능입니다.");
  });
});
