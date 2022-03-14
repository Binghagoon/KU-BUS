// import ../src/url-parameter.js

const korean = {
  from: "출발지",
  to: "도착지",
};
let orderStat = ["from", "to", "reserve"];
let statnum = 0;

let lat = 37.586232954034564;
let lng = 127.02928291766814; //Anam Stn.

let arg = queryToObject();
let isWheelchairSeat = arg.isWheelchairSeat? arg.isWheelchairSeat : false;

$(document).ready(function () {
  $("#next").click(function () {
    var thisJq = $(this);
    if (thisJq.hasClass("on")) {
      clickedMarkerDelete();
      nextButtonSwitch(false);
      nextStat();
      prefixModify();
    } else {
      alert(korean[orderStat[statnum]] + "를 선택해주십시오");
    }
    if (statnum == 2) {
      goToCallConfirm();
    }
  });

  startMap(function () {
    recordPositionGet();
    pinCurrentPosition("STUDENT");
  });
});

function nextButtonSwitch(isOn) {
  if (isOn) {
    $("#next").removeClass("off");
    $("#next").addClass("on");
  } else {
    $("#next").removeClass("on");
    $("#next").addClass("off");
  }
}

function prefixModify() {
  $("#prefix").html(korean[orderStat[statnum]]);
}

function goToCallConfirm() {
  var query = {
    fromName: from.name,
    fromNo: from.id,
    toName: to.name,
    toNo: to.id,
    isWheelchairSeat: isWheelchairSeat,
  };
  urlChangeWithQuery("call-confirm.html", query);
}
