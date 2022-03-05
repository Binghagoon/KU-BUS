var params = new URLSearchParams(window.location.search);

$.ajax({
  url: "https://kauth.kakao.com/oauth/token",
  type: "POST",
  data: {
    grant_type: "authorization_code",
    client_id: "f0d540b36132f5297ab997d121a5c838",
    redirect_uri: window.location.origin + "/kakao-login/auth.html",
    code: params.get("code"),
  },
  error: function (jqXHR, textstatus, errorthrown) {
    alert("Error on login\n Is node server alive?");
  },
  success: function (data, status, xhr) {
    const Url = new URL(window.location.origin + "/kakao-login/gotoexpress.html");
    localStorage.setItem("kubus_member_id", data["id"]);
    Object.keys(data).forEach((key) => {
      Url.searchParams.append(key, data[key]);
    });
    window.location.href = Url.href;
  },
});
