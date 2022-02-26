$.ajax({
  url: "../node/get-user-info",
  type: "GET",
  data: {
    id: localStorage.getItem("kubus-member-id"),
  },
  success: function (data) {
    userInformation(
      data["realname"],
      null,
      null,
      null,
      data["phone_number"],
      data["email"]
    );
  },
  error: function () {
    alert("Error");
  },
});

$.ajax({
  url: "../node/get-student-info",
  type: "GET",
  data: {
    id: localStorage.getItem("kubus-member-id"),
  },
  success: function (data) {
    userInformation(
      null,
      null,
      data["major"],
      data["student_number"],
      null,
      null
    );
  },
  error: function () {
    alert("Error");
  },
});

function userInformation(
  userName,
  userImage,
  userDepartment,
  userStudentNumber,
  userPhoneNumber,
  userEmailAddress
) {
  userName && $("#user-name").prepend(userName);
  userImage && $("#user-image").append(userImage);
  userDepartment && $("#user-department").append(userDepartment);
  userStudentNumber && $("#user-student-number").append(userStudentNumber);
  userPhoneNumber && $("#user-student-number").append(userPhoneNumber);
  userEmailAddress && $("#user-email-address").append(userEmailAddress);
}
