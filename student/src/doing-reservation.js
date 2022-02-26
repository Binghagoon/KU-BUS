// import ../src/url-parameter.js

let parse;
let checkIntervalId;
const query = queryToObject();

window.onbeforeunload = cancelReservation;

$(function () {
  printData(query["fromName"], query["toName"]);
  //PrintData(top.args["from"]["name"], top.args["to"]["name"]);
  if (!sessionStorage.getItem("debugging")) {
    checkIntervalId = setInterval(checkReservation, 1000);
  } else {
    setTimeout(successReservation, 1000);
  }
  $("#cancel-reservation").on("click", cancelReservation);
});

function printData(fromName, toName) {
  var dep = $("#Departure > h4");
  var arr = $("#Arrival > h4");
  dep.html(dep.html() + fromName);
  arr.html(arr.html() + toName);
}

function checkReservation() {
  if (!sessionStorage.getItem("debugging")) {
    $.ajax({
      url: "../node/check-driver",
      type: "GET",
      data: {
        callNo: query["callNo"],
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("failed on check reservation");
      },
      success: function (data, status, xhr) {
        if (data) data = data[0];
        if (data == undefined) return;
        if (data.callSuccess != null) {
          if (data.callSuccess) {
            query["driverId"] = data.driverId;
            clearInterval(checkIntervalId);
            successReservation();
          } else {
            alert("콜에 실패했습니다. 잠시 후 다시 시도해주세요.");
          }
        }
      },
    });
  } else {
  }
}

function successReservation() {
  query["status"] = "waiting";
  // To be add argument
  window.onbeforeunload = () => {};
  alert("예약이 완료되었습니다!");

  urlChangeWithQuery("assignment-complete.html", query);
}

// first-page에서 쓰는 query들을 다시 가져와야되는데 이건 어카지
function cancelReservation() {
  if (sessionStorage.getItem("debugging")) {
    window.location.href = "first-page.html";
  }
  $.ajax({
    url: "../node/reservation-delete",
    type: "POST",
    data: {
      no: query["callNo"],
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus);
      return false;
    },
    success: function (data, textStatus, jqXHR) {
      console.log("Move to first page");
      window.location.href = "first-page.html";
    },
  });
}
