$(document).ready(function () {
  userInformation(
    "홍길동",
    "userImage",
    "userDepartment",
    "userStudentNumber",
    "userPhoneNumber",
    "userEmailAddress"
  );
});

function userInformation(
  userName,
  userImage,
  userDepartment,
  userStudentNumber,
  userPhoneNumber,
  userEmailAddress
) {
  $("#user-name").prepend(userName);
  $("#user-image").append(userImage);
  $("#user-department").append(userDepartment);
  $("#user-student-number").append(userStudentNumber);
  $("#user-student-number").append(userPhoneNumber);
  $("#user-email-address").append(userEmailAddress);
}
