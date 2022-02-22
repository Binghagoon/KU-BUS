var parse;

window.onbeforeunload = cancelReservation;

$(document).ready(function () {
  printData(top.args["from"]["name"], top.args["to"]["name"]);
  if (!top.debugging) {
    setInterval(() => checkReservation(), 1000);
  } else {
    setInterval(() => successReservation(), 1000);
  }
  $("#cancel-reservation").click(cancelReservation);
});

function printData(fromName, toName) {
  var dep = $("#Departure > h4");
  var arr = $("#Arrival > h4");
  dep.html(dep.html() + fromName);
  arr.html(arr.html() + toName);
}

function checkReservation() {
  if (!top.debugging) {
    var args = top.args;
    $.ajax({
      url: window.location.origin + "/node/check-driver",
      type: "GET",
      data: {
        no: args["requestid"],
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("failed on chack reservation");
      },
      success: function (data, status, xhr) {
        if (data) data = data[0];
        if (data == undefined) return;
        if (data["name"] != null) {
          top.args["reqData"] = {};
          top.args["reqData"] = data;
          successReservation();
        }
      },
    });
  } else {
  }
}

function successReservation() {
  top.args["stat"] = "wating";
  // To be add argument
  window.onbeforeunload = () => {};
  console.log("Move to map.html");
  window.location.href = "map.html";
}
function cancelReservation() {
  $.ajax({
    url: window.location.origin + "/node/reservation-delete",
    type: "POST",
    data: {
      no: top.args["requestid"],
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error");
      return false;
    },
    success: function (data, textStatus, jqXHR) {
      console.log("Move to call-reservation");
      window.location.href = "call-reservation.html";
    },
  });
}
