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
        data["license"],
        data["carname"],
        data["phone"],
        data["email"],
        data["carId"]
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
  license,
  carname,
  userPhoneNumber,
  userEmailAddress,
  carid
) {
  $("#name").html(`${userName} (${carid})`)
  //userImage && $("#user-image").append(userImage);
  $("#license").html(license);
  $("#carname").html(carname);
  $("#phone-number").html(userPhoneNumber);
  $("#email-address").html(userEmailAddress);
}
