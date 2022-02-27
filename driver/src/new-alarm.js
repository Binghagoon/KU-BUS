// import ../src/url-parameter.js

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
    reqData["email"]
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
        if (data.studentid) {
          sessionStorage.setItem("driverStatus", "working");
          urlChangeWithQuery("map.html", {
            callNo: reqData["callNo"],
            studentid: data["studentid"],
            departure: reqData["departure"],
            arrival: reqData["arrival"],
            name: reqData["name"],
            phoneNumber: reqData["phoneNumber"],
          });
        } else {
          alert("콜에 문제가 생겼습니다. 원래 화면으로 돌아갑니다.");
          console.error(data["errorMessage"]);
          window.location.href = "map.html";
        }
      },
    });
  });
  $("#reject").on("click", function () {});
});

function printData(date, dep, arr, name, phone, email) {
  var td = $("#student-detail td");
  td[0].append(timezoneChange(date));
  td[1].append(dep);
  td[2].append(arr);
  td[3].append(name);
  td[4].append(phone);
  td[5].append(email);
}

function timezoneChange(time) {
  var date = new Date(time);
  var dateString = date.toLocaleTimeString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  var newTime = dateString.toString();
  return newTime;
}
