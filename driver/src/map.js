// import ../src/url-parameter.js

const driverSeatMaximum = {
  "normal": 3, // 일반좌석
  "wheel": 1 // 휠체어좌석
};

const debugging = (sessionStorage.getItem("debugging") === "true");
const id = sessionStorage.getItem("kubus_member_id");
const driverLocation = new UserLocation(id);

let checkWaitingTimeoutId = -1;
let checkAllocatedIntervalId = {};

window.onbeforeunload = (e) => {
  e.preventDefault();
  if (checkWaitingCallTimeoutId >= 0) {
    clearTimeout(checkWaitingCallTimeoutId);
  }
};

$(document).ready(function () {
  if (sessionStorage.getItem("ignoreList") == null)
    sessionStorage.setItem("ignoreList", "");

  startMap(() => {
    driverLocation.awakeInterval(1000, (pos) => pinUpdate(pos, "DRIVER"));
  });

  if (!sessionStorage.getItem("driverStatus")) {
    sessionStorage.setItem("driverStatus", "waiting"); // "waiting", "working", "full"
    sessionStorage.setItem("normalSeat", 0);
    sessionStorage.setItem("wheelSeat", 0);
    sessionStorage.setItem("callData", JSON.stringify({}));
  }

  refreshSeatLeft();
  refreshHeader();

  if (sessionStorage.getItem("driverStatus") !== "full") {
    checkWaitingCallTimeoutId = setTimeout(checkWaitingCall, 1000); // 1초마다 새 콜이 오는지 확인
  }
  if (sessionStorage.getItem("driverStatus") !== "waiting") {
    const callData = JSON.parse(sessionStorage.getItem("callData"));
    // { callNo : { studentid, callNo, name, departure, arrival, phoneNumber, isWheelchairSeat }, ... }
    //$("#ex1").append(printData(reqData));
    
    Object.keys(callData).forEach(element => {
      traceAnother(callData[element]["studentid"], "STUDENT");
      checkAllocatedIntervalId[element] = setInterval(() => { checkAllocatedCall(element) }, 1000);
    });
  }

  /* unused
  if (debugging) {
    console.log("In debugging mode");
    $("#debugging").show();
    $("#debuggingCallButton").on("click", function () {
      urlChangeWithQuery("new-alarm.html", {
        callNo: 8888,
        id: "test_id_000",
        name: "asdf",
        date: "2021-10-03T11:32:40.000Z",
        departure: "우당교양관",
        arrival: "정경대학과 타이거 프라자 사이",
        phoneNumber: "010-0000-0000",
      });
    });
  } else {
  } */
  $("#debugging").hide();
});

function checkWaitingCall() {
  $.ajax({
    url: "../node/no-driver-call",
    type: "GET",
    error: function (jqxhr, textStatus, errorThrown) {
      console.log("Call Get Error");
    },
    success: function (data, textStatus, jqxhr) {
      for(const val of data){
        let ignoreList = sessionStorage.getItem("ignoreList");
        if(ignoreList.includes(val.callNo)){
          continue;
        }
        console.log("Move to new-alarm");
        if (checkSeatLeft(parseInt(val["isWheelchairSeat"]) > 0)) {
          urlChangeWithQuery("new-alarm.html", val);
        }
      }
      checkWaitingCallTimeoutId = setTimeout(checkWaitingCall, 1000);   //if error use setTimeout(checkCall, 1000);
    },
  });
}

function checkAllocatedCall(callNo) {
  $.ajax({
    url: "/node/call-status",
    type: "GET",
    data: {
      callNo: callNo,
    },
    error: function (jqxhr, textStatus, errorThrown) {
      console.error(textStatus);
    },
    success: function (data, textStatus, jqxhr) {
      if (data["callStatus"] === "canceled") {
        removeCall(callNo, "사용자가 취소했습니다.");
        clearInterval(checkAllocatedIntervalId[callNo]);
      }
    }
  })
}

function printData(data, prefix) {
  let newString = prefix ? prefix + "<br>" : "";

  newString += `이름 : ${data.name}<br>`;
  newString += `출발 : ${data.departure}<br>`;
  newString += `도착 : ${data.arrival}<br>`;
  newString += `전화번호 : ${data.phoneNumber}<br>`;

  return newString;
}

function refreshHeader() {
  if (sessionStorage.getItem("driverStatus") !== "full") {
    $("#ex1").html(`콜을 받는 중입니다...(남은자리 
      일반${driverSeatMaximum["normal"] - parseInt(sessionStorage.getItem("normalSeat"))}/
      휠체어${driverSeatMaximum["wheel"] - parseInt(sessionStorage.getItem("wheelSeat"))})
      <br>`);
  } else {
    $("#ex1").html(`자리가 모두 찼습니다.`);
  }
}

function checkSeatLeft(isWheel) {
  const normalSeatLeft = driverSeatMaximum["normal"] - parseInt(sessionStorage.getItem("normalSeat"));
  const wheelSeatLeft = driverSeatMaximum["wheel"] - parseInt(sessionStorage.getItem("wheelSeat"));

  return isWheel ? wheelSeatLeft > 0 : normalSeatLeft > 0;
}

function removeCall(callNo, message) {
  const callData = JSON.parse(sessionStorage.getItem("callData"));

  callData[callNo] = undefined;

  if (normalSeatUsed + wheelSeatUsed === 0) {
    sessionStorage.setItem("driverStatus", "waiting");
  } else {
    sessionStorage.setItem("driverStatus", "working");
  }
  sessionStorage.setItem("callData", JSON.stringify(callData));

  refreshSeatLeft();
  refreshHeader();
  alert(`${callNo}번 콜이 취소되었습니다.${message ? "\n" + message : ""}`)
}

function refreshSeatLeft() {
  const callData = JSON.parse(sessionStorage.getItem("callData"));
  let normalSeatUsed = 0;
  let wheelSeatUsed = 0;

  Object.keys(callData).forEach(e => {
    callData[e].isWheelchairSeat ? wheelSeatUsed++ : normalSeatUsed++;
  });

  const normalSeatLeft = driverSeatMaximum["normal"] - normalSeatUsed;
  const wheelSeatLeft = driverSeatMaximum["wheel"] - wheelSeatUsed;

  sessionStorage.setItem("driverStatus", normalSeatLeft <= 0 && wheelSeatLeft <= 0 ? "full" : "working");
  sessionStorage.setItem("normalSeat", normalSeatUsed);
  sessionStorage.setItem("wheelSeat", wheelSeatUsed);
}
