// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init("d2481bf8dd089370ad295dd73d94a65a");
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
    } else {
      $("#debug").html("Not Debugging");
      $("#class").hide();
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
  $("#class").click(function () {
    isStudent = !isStudent;
    $("#class").html(isStudent ? "학생" : "기사");
  });
  $("#login-with-kakao").click(function () {
    Kakao.Auth.authorize({
      redirectUri: window.location.origin + "/kakao-login/auth.html",
    });
  });

  let deferredPrompt;
  const addBtn = $("#installpwa");
  addBtn.css("display", "none");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.css("display", "inline-block");

    addBtn.click(function () {
      addBtn.css("display", "none");
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  });
});
