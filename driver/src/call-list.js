$(document).ready(function () {
  const callData = JSON.parse(sessionStorage.getItem("callData"));

  Object.keys(callData).forEach(element => {
    createCallBlock($("#call-request"), callData[element]);
  })
});

function createCallBlock(appendTo, data) {
  appendTo.append(`
  <tr id="caller-template=${data.callNo}}">
    <td id="caller-id">
      <div id="profile-image"></div>
      <div id="call_no">콜 번호: ${data.callNo}</div>
      <div id="caller_id">요청자 이름: ${data.name}</div>
      <div id="caller-pp">
      <button id="caller-position-button" href="#">위치:</button>
      <button id="caller-phone-button" href="#">전화: ${data.phoneNumber}</button>
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
  </tr>`);
}
