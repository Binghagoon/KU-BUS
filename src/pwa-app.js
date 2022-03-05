if ("serviceWorker" in navigator) {
  // kakao-login/login.html 기준
  navigator.serviceWorker.register("/service-worker.js").then(regist => {
    console.log("Service Worker Registered");

    regist.addEventListener("updatefound", () => {
      const newWorker = regist.installing;
      console.log("Service Worker update found!");

      newWorker.addEventListener("statechange", () => {
        console.log("Service Worker state changed:", newWorker.state);
      });
    });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("Controller changed");
  });
}
