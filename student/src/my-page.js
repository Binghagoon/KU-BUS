$(function() {
  $.ajax({
    url: "../node/users/" + sessionStorage.getItem("kubus-member-id"),
    type: "GET",
    data: {
      id: sessionStorage.getItem("kubus-member-id"),
    },
    success: function (data) {
      userInformation(
        data["realname"],
        null,
        data["major"],
        data["student_number"],
        data["phone"],
        data["email"]
      );
    },
    error: function () {
      alert("Error");
    },
  });

  $("#logout").on("click", (e) => {
    e.preventDefault();

    sessionStorage.clear();
    location.replace("/kakao-login/login.html");
  });
});

function userInformation(
  userName,
  userImage,
  userDepartment,
  userStudentNumber,
  userPhoneNumber,
  userEmailAddress
) {
  $("#name").html(userName)
  //userImage && $("#user-image").append(userImage);
  $("#academic-information").html(userDepartment);
  $("#student-number").html(userStudentNumber);
  $("#phone-number").html(userPhoneNumber);
  $("#email-address").html(userEmailAddress);
}
