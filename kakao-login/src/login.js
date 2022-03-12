Kakao.init("d2481bf8dd089370ad295dd73d94a65a");

let debugging;
sessionStorage.removeItem("give-token");

$(document).ready(function () {
  $("#login-with-kakao").click(function () {
    Kakao.Auth.authorize({
      redirectUri: window.location.origin + "/kakao-login/auth.html",
    });
  });
  $("#logout").click(() =>
    Kakao.Auth.logout(function () {
      alert("카카오 로그아웃에 성공했습니다.");
    })
  );

  /// PWA button actions
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
