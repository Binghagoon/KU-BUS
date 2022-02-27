// import ../src/url-parameter.js

const debugging = sessionStorage.getItem("debugging");
const id = sessionStorage.getItem("kubus_member_id");
const reqData = queryToObject();

$(document).ready(function () {
  startMap();
  if (!sessionStorage.getItem("driverStatus")) {
    sessionStorage.setItem("driverStatus", "waiting");
  }

  if (sessionStorage.getItem("driverStatus") == "waiting") {
    $("#ex1").show();
    $("#ex2").hide();

    setTimeout(checkCall, 1000); // 1초마다 새 콜이 오는지 확인
  }
  if (sessionStorage.getItem("driverStatus") == "working") {
    $("#ex1").hide();
    $("#ex2").show();

    console.log(reqData);
    //traceAnother(reqData["id"], "STUDENT");
  }
  //traceAnother(id, "DRIVER");

  if (debugging) {
    $("#debugging").show();
    $("#button").on("click", function () {
      moveToNew([
        {
          id: "test_id_000",
          name: "asdf",
          date: "2021-10-03T11:32:40.000Z",
          departure: "우당교양관",
          arrival: "정경대학과 타이거 프라자 사이",
          carfull: "없음",
          phone: "010-0000-0000",
        },
      ]);
      return false;
    });
  }
});

function checkCall() {
  $.ajax({
    url: "../node/no-driver-call",
    type: "GET",
    error: function (jqxhr, textStatus, errorThrown) {
      console.log("Reservation Get Error");
    },
    success: function (data, textStatus, jqxhr) {
      if (data.length != 0) {
        console.log("Move to new-alarm");
        urlChangeWithQuery("new-alarm.html", data[0]);
      }
      else {
        setTimeout(checkCall);
      }
    },
  });
}
