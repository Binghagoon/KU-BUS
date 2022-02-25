const reqData = queryToObject();

$(document).ready(function () {
  //printData("asdf", "2021-09-20", "아산이학관", "하나스퀘어");
  //data = reqData; //ex: {name: 'asdf', time: '2021-10-03T11:32:40.000Z', now_name: '우당교양관', to_name: '정경대학과 타이거 프라자 사이'}
  printData(
    reqData["name"],
    reqData["date"],
    reqData["departure"],
    reqData["arrival"],
    reqData["carfull"],
    reqData["phone"]
  );
  $("#accept").on("click", function () {
    $.ajax({
      url: "../node/driver-select-request",
      type: "POST",
      data: {
        responser_id: id,
        requester_id: reqData["id"],
      },
      error: function (jqXHR, textstatus, errorthrown) {},
      success: function (data, status, xhr) {
        stat = "working";
        console.log("Move to map.html");
        window.location.href = "map.html";
      },
    });
  });
  $("#reject").on("click", function () {});
});
function printData(name, date, dep, arr, carfull, phone) {
  var td = $("#student-detail td");
  td[0].append(name);
  td[1].append(timezoneChange(date));
  td[2].append(dep);
  td[3].append(arr);
  td[4].append(carfull);
  td[5].append(phone);
}
function timezoneChange(time) {
  var date = new Date(time);
  var dateString = date.toLocaleTimeString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  var newTime = dateString.toString();
  return newTime;
}
