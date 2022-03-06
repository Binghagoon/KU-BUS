// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init("d2481bf8dd089370ad295dd73d94a65a");
let debugging;
sessionStorage.removeItem("give-token");
$(document).ready(function () {
  $("#embed-login").click(function () {
    console.log("goto embed login");
    window.location.href = "../login-page.html";
  });
  $("#debug").click(function () {
    debugging = !debugging;
    if (debugging) {
      $("#debug").html("Debugging");
      $("#class").show();
      $("#give-token").show();
    } else {
      $("#debug").html("Not Debugging");
      $("#class").hide();
      $("#give-token").hide();
    }
  });
  $("#logout").click(() =>
    Kakao.Auth.logout(function () {
      alert("logout");
    })
  );
  $("#class").click(function () {
    isStudent = !isStudent;
    $("#class").html(isStudent ? "학생" : "기사");
  });
  $("#give-token").click(function () {
    sessionStorage.setItem("give-token","1");
    $("#give-token").html("O");
  });
  $("#login-with-kakao").click(function () {
    Kakao.Auth.authorize({
      redirectUri: window.location.origin + "/kakao-login/auth.html",
    });
  });
});
