// import ../src/login.js

var params = new URLSearchParams(window.location.search);
var token = params.get("access_token");
var debugging = false;
Kakao.init("d2481bf8dd089370ad295dd73d94a65a");
if (Kakao.isInitialized()) {
  Kakao.Auth.setAccessToken(token);
  Kakao.API.request({
    url: "/v2/user/me",
    success: function (response) {
      //console.log(response);
      KUBUSSignin(response);
    },
    fail: function (error) {
      console.log(error);
      alert(error);
    },
  });
}

function KUBUSSignin(response) {
  $.ajax({
    url: window.location.origin + "/node/sign-in",
    type: "GET",
    data: {
      ...response,
      username: response.id,
    },
    error: function (jqXHR, textstatus, errorthrown) {
      console.log(jqXHR);
      jqXHR.done(data => {
        console.log(data);
        if (data.status == "fail") {
          //If user are not regisetered, sign up.
          KUBUSSignup(response);
        } else if (data.status == "notAllowed") {
          alert("아직 가입 승인이 안되었습니다.\n센터에 문의해주세요.");
          console.log("Move to Login Page");
          window.location.href =
            window.location.origin + "/kakao-login/login.html";
        }
      });
    },
    success: function (data, status, xhr) {
      SigninAfter(data);
    },
  });
}

function KUBUSSignup(data) {
  var sp = new URLSearchParams();
  sp.append("id", data["id"]);
  alert("KUBUS서비스를 처음이용하시는것 같네요! 회원가입을 하셔야 됩니다!");
  window.location.href =
    window.location.origin + "/kakao-login/register.html?" + sp.toString();
}
