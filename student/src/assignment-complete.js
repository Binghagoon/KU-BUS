// import ../src/url-parameter.js

const query = queryToObject();
let clicked = 0;

$(function () {
  window.onbeforeunload = cancelCall;

  startMap(function () {
    let driverID = query["driverId"];
    let studentID = sessionStorage.getItem("kubus_member_id");

    try {
      traceAnother(driverID, "DRIVER");

      let studentLoc = new Location(studentID, function (loc) {
        let studentMarker = pinUpdate(loc.pos, "STUDENT");
        loc.awakeInterval(1000, function (pos) {
          markerLocationChange(studentMarker, {
            latitude: pos.lat - 0.0001 * clicked,
            longitude: pos.lng,
          });
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  });
  $("#cancel-reservation").on("click", cancelCall);
  $("#send-message").on("click", function (e) {
    //for use debug
    //e.preventDefault();
    clicked = clicked + 1;
  });
});

function cancelCall() {
  $.ajax({
    url: "../node/call-cancel",
    data: {
      id: query["callNo"],
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
    },
    success: function (data, textStatus, jqXHR) {
      alert("취소가 완료되었습니다.");
      console.log("Move to first-page");
      window.location.href = "first-page.html";
    },
  });
}
