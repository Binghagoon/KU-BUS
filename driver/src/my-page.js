$(document).ready(function () {
  $("#toggle > input[type='checkbox']").click(function () {
    $("#condition-message").toggle();
  });
  $.ajax({
    url: "../php/driver-info-sample.php",
    type: "POST",
    data: {
      id: id,
    },
    error: function (jqXHR, textstatus, errorthrown) {
      alert("Error");
    },
    success: function (data, status, xhr) {
      editProfile(data.name, data.carInfo);
    },
  });
  editProfile("장기사", "123가4567 카니발");
});

// 버튼 클릭 시 연결할 링크는 추후에 결정
function editProfile(name, carInfo) {
  $("#car-info").text(carInfo);
  $("#name").text(name + " 기사님");
}

function showHistory() {
  window.open("");
}

function signOut() {
  window.open("");
}
