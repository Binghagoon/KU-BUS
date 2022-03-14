// import ../src/url-parameter.js

const query = queryToObject();
const studentLocation = new UserLocation(
  sessionStorage.getItem("kubus_member_id")
);
let driverID = query["driverid"];
let studentID = sessionStorage.getItem("kubus_member_id");

let clicked = 0;
let checkCallStatusIntervalId = -1;

$(document).ready(function () {
  window.onbeforeunload = cancelCall;

  startMap(() => {
    studentLocation.awakeInterval(1000, (pos) => pinUpdate(pos, "STUDENT"));
  });

  traceAnother(driverID, "DRIVER");

  checkCallStatusIntervalId = setInterval(checkCallStatus, 3000);

  $("#cancel-call").on("click", cancelCall);
  $("#send-message").on("click", function (e) {
    //for use debug
    //e.preventDefault();
    clicked = clicked + 1;
  });
});

function cancelCall(e) {
  e.preventDefault();
  $.ajax({
    url: "/node/call-cancel",
    type: "POST",
    data: {
      callNo: query["callNo"],
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error in cancel call");
    },
    success: function (data, textStatus, jqXHR) {
      if (data.status != "success") {
        console.error(data.errorMessage);
      } else {
        alert("취소가 완료되었습니다.");
        clearInterval(checkCallStatusIntervalId);
        deleteLocation();
      }
      window.location.href = "first-page.html";
    },
  });
}

function deleteLocation() {
  $.ajax({
    url: "/node/location-delete",
    type: "POST",
    async: false,
    data: {
      id: sessionStorage.getItem("kubus_member_id")
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error in delete Location");
    },
    success: function (data, textStatus, jqXHR) {
      if (data.status != "success") {
        console.error(data.errorMessage);
      }
    },
  })
}

function checkCallStatus() {
  $.ajax({
    url: "/node/call-status",
    type: "GET",
    data: {
      callNo: query["callNo"]
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error in get call status");
      clearInterval(checkCallStatusIntervalId);
    },
    success: function (data, textStatus, jqXHR) {
      if (data.callStatus == "moving") { // 운행중
        $("#minute-left").html("<h4>운행중입니다.</h4>");
      } else if (data.callStatus == "finish") { // 운행완료
        $("#minute-left").html("<h4>운행이 완료되었습니다.</h4>");
        window.onbeforeunload = () => {};
        setTimeout(() => {
          window.location.href = "first-page.html";
        }, 5000);
      }
    }
  });
}
