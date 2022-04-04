var sp;
function register() {
  var data = {};
  data["username"] = sp.get("id");
  data["realname"] = $("#user-name").val();
  data["email"] = $("#user-email-address").val();
  data["phone"] = $("#user-phone-number").val();
  $.ajax({
    url: window.location.origin + "/node/sign-up",
    type: "POST",
    data: data,
    error: function (jqXHR, textstatus, errorthrown) {
      console.log("Error Sign up, " + textstatus);
      alert("회원가입이 실패했습니다. 관리자에게 문의해주세요.");
    },
    success: function (data, status, xhr) {
      alert("회원가입이 완료 되었습니다. 관리자의 승인 후 로그인 해주세요");
    },
    complete: function (jqXHR, textStatus) {
      window.location.href = window.location.origin + "/kakao-login/login.html";
    }
  });
}

$(document).ready(function () {
  sp = new URLSearchParams(window.location.search);
  $("#submit").click(function (e) {
    e.preventDefault();
    register();
  });
  $("#cancel").click(function (e) {
    e.preventDefault();
    if (window.confirm("처음 화면으로 돌아가시겠습니까?")) {
      window.location.href = "/kakao-login/login.html";
    }
  });
});
