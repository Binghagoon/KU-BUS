// import ../src/url-parameter.js

const debugging = (sessionStorage.getItem("debugging") === "true");
const id = sessionStorage.getItem("kubus_member_id");
const reqData = queryToObject();
const location = new Location(id);

$(document).ready(function () {
  if(sessionStorage.getItem("ignoreList") == null)
  sessionStorage.setItem("ignoreList","");
  startMap(() => {
    location.awakeInterval(1000, pos => pinUpdate(pos, "DRIVER"));
  });

  if (!sessionStorage.getItem("driverStatus")) {
    sessionStorage.setItem("driverStatus", "waiting");
  }

  if (sessionStorage.getItem("driverStatus") === "waiting") {
    showOnlyEx(1);

    setTimeout(checkCall, 1000); // 1초마다 새 콜이 오는지 확인
  }
  if (sessionStorage.getItem("driverStatus") === "working") {
    showOnlyEx(3);
    $("#ex3").append(printData(reqData));
    
    traceAnother(reqData["studentid"], "STUDENT");
  }

  if (debugging) {
    console.log("In debugging mode");
    $("#debugging").hidden = false;
    //showOnlyEx(4);
    $("#button").on("click", function () {
      urlChangeWithQuery("new-alarm.html", {
        id: "test_id_000",
        name: "asdf",
        date: "2021-10-03T11:32:40.000Z",
        departure: "우당교양관",
        arrival: "정경대학과 타이거 프라자 사이",
        phoneNumber: "010-0000-0000",
      });
    });
  }
});

function checkCall() {
  $.ajax({
    url: "../node/no-driver-call",
    type: "GET",
    error: function (jqxhr, textStatus, errorThrown) {
      console.log("Reservation Get Error");
    },
    success: function (data, textStatus, jqxhr) {
        for(const val of data){
          let ignoreList = sessionStorage.getItem("ignoreList");
          if(ignoreList.includes(val.callNo)){
            continue;
          }
          console.log("Move to new-alarm");
          urlChangeWithQuery("new-alarm.html", val);
        }
      setTimeout(checkCall, 1000);
    },
  });
}

function showOnlyEx(idx) {
  let divs = $("#header div");
  for (let i = 0; i < divs.length; ++i) {
    if (i === idx - 1) {
      divs[i].hidden = false;
    } else {
      divs[i].hidden = true;
    }
  }
}

function printData(data) {
  let newString = "";

  newString += `이름 : ${data.name}<br>`;
  newString += `출발 : ${data.departure}<br>`;
  newString += `도착 : ${data.arrival}<br>`;
  newString += `전화번호 : ${data.phoneNumber}<br>`;

  return newString;
}
