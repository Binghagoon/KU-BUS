var sample = {
  1: {
    name: "김기사",
    location: "공학관",
    destination: "아산이학관",
    message: "호출을 승인하셨습니다. 지금 가는 중입니다",
    time: "???",
  },
  2: {
    name: "임기사",
    location: "공학관 -> ",
    destination: "산학관",
    message: "호출을 승인하셨습니다. 지금 가는 중입니다",
    time: "???",
  },
  3: {
    name: "박기사",
    location: "공학관 -> ",
    destination: "신공학관",
    message: "호출을 승인하셨습니다. 지금 가는 중입니다",
    time: "???",
  },
};

$(document).ready(function () {
  PrintData();
});
function Onedata(id, location, destination, message, time) {
  $("div#alarm-tempelete div#alarm-contents > #alarmer").html(id);
  $("div#alarm-tempelete div#alarm-contents > #alarm-title").html(location);
  $("div#alarm-tempelete div#alarm-contents > #alarm-email").html("asdf");
  $("div#alarm-tempelete div#alarm-contents > #alarm-message").html(message);
  $("div#alarm-tempelete div#alarm-contents > #alarm-send-time").html(time);
}
function PrintData(id, location, destination, message, time) {
  var data = sample;
  var templete = $("#alarm-tempelete");
  var td = $("#studentAlarm td");
  var contents = $("div#Alarmcontents");
  templete.removeClass("template");
  for (var i = 0; i < Object.keys(sample).length; i++) {
    var key = Object.keys(data)[i]; //key는 자주 접근하니 선언!
    Onedata(
      data[key].name,
      data[key].location,
      data[key].destination,
      data[key].message,
      data[key].time
    );
    $("div#alarms").append(templete.html());
  }
}
