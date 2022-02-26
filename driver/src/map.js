const debugging = true;
const id = 0;
var stat = "working";

$(document).ready(function () {
  startMap();

  /*
  받아와야 할 것들
  id, stat, reqData
  */

  setInterval(checkReservation, 1000); // 1초마다 새 콜이 오는지 확인
  traceAnother(id, "DRIVER");
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
  if (stat == "working") {
    $("#ex1").hide();
    $("#ex2").removeAttr("hidden");
    traceAnother(reqData["id"], "STUDENT");
  }
});

function checkReservation() {
  $.ajax({
    url: "../node/no-driver-call",
    type: "GET",
    error: function (jqxhr, textStatus, errorThrown) {
      console.log("Reservation Get Error");
    },
    success: function (data, textStatus, jqxhr) {
      if (data.length != 0) moveToNew(data);
      7;
    },
  });
}

function moveToNew(data) {
  console.log("Move to new-alarm");
  urlChangeWithQuery("new-alarm.html", data[0]);
}
