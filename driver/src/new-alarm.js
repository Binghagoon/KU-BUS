// import ../src/url-parameter.js

const driverSeatMaximum = {
  "normal": 3, // 일반좌석
  "wheel": 1 // 휠체어좌석
};
const reqData = queryToObject();

$(document).ready(function () {
  //printData("asdf", "2021-09-20", "아산이학관", "하나스퀘어");
  //data = reqData; //ex: {name: 'asdf', time: '2021-10-03T11:32:40.000Z', now_name: '우당교양관', to_name: '정경대학과 타이거 프라자 사이'}
  printData(
    reqData["time"],
    reqData["departure"],
    reqData["arrival"],
    reqData["name"],
    reqData["phoneNumber"],
    reqData["email"],
    reqData["isWheelchairSeat"] > 0,
  );
  $("#accept").on("click", function () {
    $.ajax({
      url: "../node/call-accept",
      type: "POST",
      data: {
        callNo: reqData["callNo"],
        driverid: sessionStorage.getItem("kubus_member_id"),
      },
      error: function (jqXHR, textstatus, errorthrown) {
        alert("호출을 받는데 오류가 발생했습니다. 센터에 문의해주세요.");
        window.location.href = "map.html";
      },
      success: function (data, status, xhr) {
        if (data["studentid"]) {
          refreshDriverStatus(reqData["isWheelchairSeat"]);
          let callData = JSON.parse(sessionStorage.getItem("callData"));
          callData[reqData["callNo"]] = {
            callNo: reqData["callNo"],
            studentid: data["studentid"],
            departure: reqData["departure"],
            arrival: reqData["arrival"],
            name: reqData["name"],
            phoneNumber: reqData["phoneNumber"],
            isWheelchairSeat: reqData["isWheelchairSeat"] > 0,
            isRiding: false,
          }
          sessionStorage.setItem("callData", JSON.stringify(callData));
          urlChangeWithQuery("map.html", {});
        } else {
          alert("콜에 문제가 생겼습니다. 원래 화면으로 돌아갑니다.");
          console.error(data["errorMessage"]);
          window.location.href = "map.html";
        }
      },
    });
  });
  $("#reject").on("click", function () {
    let ignoreList = sessionStorage.getItem("ignoreList");
    sessionStorage.setItem("ignoreList", ignoreList + " " + reqData.callNo);
    urlChangeWithQuery("map.html",{});
  });
});

function printData(date, dep, arr, name, phone, email, wheel) {
  var td = $("#student-detail td");
  td[0].append(timezoneChange(date));
  td[1].append(dep);
  td[2].append(arr);
  td[3].append(name);
  td[4].append(phone);
  td[5].append(email);
  td[6].append(wheel);
}

function timezoneChange(time) {
  var date = new Date(time);
  var dateString = date.toLocaleTimeString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  var newTime = dateString.toString();
  return newTime;
}

function refreshDriverStatus(isWheel) {
  let normalSeatUsed = sessionStorage.getItem("normalSeat");
  let wheelSeatUsed = sessionStorage.getItem("wheelSeat");

  if (isWheel) {
    wheelSeatUsed += 1;
  } else {
    normalSeatUsed += 1;
  }

  const normalSeatLeft = driverSeatMaximum["normal"] - normalSeatUsed;
  const wheelSeatLeft = driverSeatMaximum["wheel"] - wheelSeatUsed;

  sessionStorage.setItem("driverStatus", normalSeatLeft <= 0 && wheelSeatLeft <= 0 ? "full" : "working");
  sessionStorage.setItem("normalSeat", wheelSeatUsed);
  sessionStorage.setItem("wheelSeat", wheelSeatUsed);
}
