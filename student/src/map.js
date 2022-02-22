const korean = {
  from: "출발지",
  to: "도착지",
};
let orderStat = ["from", "to", "reserve"];
let statnum = 0;

let arg = queryToObject();
let debugging, seatnum;
if ($(arg).empty()) {
  //default setting
  debugging = true;
  seatnum = 0;
} else {
  debugging = arg.debugging;
  seatnum = arg.seatnum;
}

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
      goToCallReservation();
    }
  });

  startMap(function () {
    recordPositionGet();
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

function goToCallReservation() {
  var query = {
    fromName: from.name,
    fromNo: from.num,
    toName: to.name,
    toNo: to.num,
    id: arg.id,
  }; //id does not work
  urlChangeWithQuery("call-reservation.html", query);
}
