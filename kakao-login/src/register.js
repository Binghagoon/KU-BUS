var sp;
function register() {
  var data = {};
  data["username"] = sp.get("id");
  data["realname"] = $("#user-name").val();
  data["email"] = $("#user-email-address").val();
  data["mp"] = $("#user-phone-number").val();
  $.ajax({
    url: window.location.origin + "/node/sign-up",
    type: "POST",
    data: data,
    error: function (jqXHR, textstatus, errorthrown) {
      console.log("Error Sign up");
      alert("Error on sign up");
    },
    success: function (data, status, xhr) {
    },
  });
  
  console.log("회원가입이 완료 되었습니다. 승인 후 로그인 해주세요");
  window.location.href = window.location.origin + "/kakao-login/login.html";
}
$(document).ready(function () {
  sp = new URLSearchParams(window.location.search);
  $("#submit").click(function () {
    register();
  });
  $("#cancel").click(function () {
    window.location.href = "/kakao-login/login.html";
  });
});
