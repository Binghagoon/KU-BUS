// import ../src/url-parameter.js

let parse;
let checkIntervalId;
const query = queryToObject();

window.onbeforeunload = cancelReservation;

$(function () {
  printData(query["fromName"], query["toName"]);
  //PrintData(top.args["from"]["name"], top.args["to"]["name"]);
  if (!sessionStorage.getItem("debugging")) {
    checkIntervalId = setInterval(checkCall, 1000);
  } else {
    setTimeout(successCall, 1000);
  }
  $("#cancel-reservation").on("click", cancelCall);
});

function printData(fromName, toName) {
  var dep = $("#departure > h4");
  var arr = $("#arrival > h4");
  dep.html(dep.html() + fromName);
  arr.html(arr.html() + toName);
}

function checkCall() {
  if (!sessionStorage.getItem("debugging")) {
    $.ajax({
      url: "../node/call-status",
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
            successCall();
          } else {
            alert("배차에 실패했습니다. 잠시 후 다시 시도해주세요.");
            cancelCall();
          }
        }
      },
    });
  } else {
    console.log(`on debugging mode, skip`);
  }
}

function successCall() {
  query["status"] = "waiting";
  // To be add argument
  window.onbeforeunload = () => {};
  alert("예약이 완료되었습니다!");

  urlChangeWithQuery("assignment-complete.html", query);
}

// first-page에서 쓰는 query들을 다시 가져와야되는데 이건 어카지
function cancelCall() {
  if (sessionStorage.getItem("debugging")) {
    window.location.href = "first-page.html";
  }
  $.ajax({
    url: "../node/call-cancel",
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
