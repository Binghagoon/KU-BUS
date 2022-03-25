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
  $("#give-token").click(function () {
    sessionStorage.setItem("give-token","1");
    $("#give-token").html("O");
  });

  // Checks if should display install popup notification in ios:
  if (isIos() && !isInStandaloneMode()) {
    let topHelpBanner = $("#ios-pwa-help");
    topHelpBanner.css("display", "block");
    $("#ios-pwa-help-closeBtn").on("click", e => {
      e.preventDefault();
      topHelpBanner.css("display", "none");
    })
  }

  /// PWA button actions
  let deferredPrompt;
  const addBtn = $("#installpwa");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    if (isInStandaloneMode()) return;
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

// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Detects if device is on iOS 
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent ) ||
  ((navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) &&
  !window.MSStream);
}
