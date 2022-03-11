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
        <td id="wheelchair">휠체어 좌석 여부: ${data.isWheelchairSeat}</td>
      </tr>
      </table>
    </td>
  </tr>`).appendTo(parentEle);
  const rideInBtn = newEle.find("#caller-ridein");
  rideInBtn.on("click", () => {
    if (callData[data.callNo].isRiding) {
      updateCallStatus(data.callNo, 2);
      rideInBtn.html("탑승 완료");
    } else {
      updateCallStatus(data.callNo, 3);
      rideInBtn.html("탑승 취소");
    }
  });
}

function updateCallStatus(callNo, nextCallStatus) {
  // nextCallStatus = 0 | 1 | 2 | 3 | 4  =>  취소됨 | 미할당 | 이동중 | 운행중 | 운행완료
  $.ajax({
    url: "/node/call-status",
    type: "PUT",
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
      callData[data.callNo].isRiding = nextCallStatus > 2;
      sessionStorage.setItem("callData", JSON.stringify(callData));
    }
  })
}
