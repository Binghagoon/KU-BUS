const callData = JSON.parse(sessionStorage.getItem("callData"));

$(function () {
  Object.keys(callData).forEach(element => {
    createCallBlock($("#call-request"), callData[element]);
  })
});

function createCallBlock(parentEle, data) {
  const newEle = $(`
  <tr id="caller-template=${data.callNo}}">
    <td id="caller-id">
      <div id="profile-image"></div>
      <div id="call_no">콜 번호: ${data.callNo}</div>
      <div id="caller_id">요청자 이름: ${data.name}</div>
      <div id="caller-pp">
      <button id="caller-position-button" href="#">위치:</button>
      <button id="caller-phone-button" href="#">전화: ${data.phoneNumber}</button>
      <button id="caller-ridein" href="#">탑승 완료</button>
      </div>
    </td>
    <td>
      <table id="caller-detail">
      <tr>
        <td id="res-time">호출 예약 시간:</td>
      </tr>
      <tr>
        <td id="res-position">출발지: ${data.departure}</td>
      </tr>
      <tr>
        <td id="destination">목적지: ${data.arrival}</td>
      </tr>
      <tr>
        <td id="wheelchair">휠체어 좌석 여부: ${data.isWheelchairSeat ? "예" : "아니오"}</td>
      </tr>
      </table>
    </td>
  </tr>`).appendTo(parentEle);
  const rideInBtn = newEle.find("#caller-ridein");

  if (callData[data.callNo].callStatus == "allocated") {
    rideInBtn.html("탑승 완료");
  } else if (callData[data.callNo].callStatus == "moving") {
    rideInBtn.html("운행 완료");
  }

  rideInBtn.on("click", () => {
    if (callData[data.callNo].callStatus == "allocated") {
      updateCallStatus(data.callNo, "moving");
      rideInBtn.html("운행 완료");
    } else if (callData[data.callNo].callStatus == "moving") {
      updateCallStatus(data.callNo, "finish");
      rideInBtn.html("완료");
      rideInBtn.attr("disabled", "true");
    }
  });
}

function updateCallStatus(callNo, nextCallStatus) {
  // nextCallStatus = “canceled“ | “waiting” | “allocated” | “moving” | “finish”  =>  취소됨 | 미할당 | 이동중 | 운행중 | 운행완료
  if (nextCallStatus == "moving") {
    $.ajax({
      url: "/node/change-call-status",
      type: "POST",
      data: {
        callNo: callNo,
        nextCallStatus: nextCallStatus
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error in update call status");
      },
      success: function (data, textStatus, jqXHR) {
        if (data.status !== "success") {
          console.error(data.errorMessage);
        }
        callData[data.callNo].callStatus = nextCallStatus;
        sessionStorage.setItem("callData", JSON.stringify(callData));
      }
    });
  } else if (nextCallStatus == "finish") {
    $.ajax({
      url: "/node/call-end",
      type: "POST",
      data: {
        callNo: callNo,
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error in update call status");
      },
      success: function (data, textStatus, jqXHR) {
        if (data.status !== "success") {
          console.error(data.errorMessage);
        }
        callData[data.callNo] = undefined;
        sessionStorage.setItem("callData", JSON.stringify(callData));
      }
    });
  }
}
