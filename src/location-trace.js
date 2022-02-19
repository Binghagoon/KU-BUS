function locationCheck() {
  //TBD
  var isValueExist;
  $.when(
    $.ajax({
      url: window.location.origin + "/node/my-location-select",
      type: "GET",
      data: {
        id: args["id"],
      },
      error: function (jqXHR, textStatus, errorThrown) {
        isValueExist = false;
      },
      success: function (data, status, xhr) {
        isValueExist = true;
      },
    })
  ).done();
  return isValueExist;
}
async function getPositionById(id) {
  var r;
  await $.ajax({
    url: window.location.origin + "/node/get-location",
    type: "GET",
    //async: false,
    data: {
      id: id,
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error getting  a position");
    },
    success: function (data, status, xhr) {
      r = data[0];
    },
  });
  return r;
}
function locationTrace(position) {
  var coord = position.coords;
  $.ajax({
    url: window.location.origin + "/node/my-location-insert",
    type: "POST",
    data: {
      id: args["id"],
      latitude: coord["latitude"],
      longitude: coord["longitude"],
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("failed on insert location");
    },
    success: function (data, status, xhr) {
      setInterval(checkGeolocation, 500);
    },
  });
}
function checkGeolocation() {
  if (!!navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      locationUpdate,
      cannotGetPositionError
    );
  } else {
    alert("현재 브라우저에서 위치정보를 지원하지 않습니다.");
  }
}
function locationUpdate(position) {
  var coords = position.coords;
  $.ajax({
    url: window.location.origin + "/node/my-location-update",
    type: "POST",
    data: {
      id: args["id"],
      latitude: coords["latitude"],
      longitude: coords["longitude"],
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("failed on location update");
    },
    success: function (data, status, xhr) {
      count = count + 1;
    },
  });
}
function locationDelete() {
  $.ajax({
    url: window.location.origin + "/node/my-location-delete",
    type: "POST",
    //async: false,
    data: {
      id: args["id"],
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("failed on location delete");
      return false;
    },
    success: function (data, status, xhr) {
      console.log("Delete success");
      return true;
    },
    complete: function (jqXHR, textStatus) {},
  });
}

function cannotGetPositionError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("위치정보 사용 요청이 거부되었습니다.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("사용할 수 없는 위치정보입니다.");
      break;
    case error.TIMEOUT:
      alert("위치정보를 가져오는 시간을 초과했습니다.");
      break;
    case error.UNKNOWN_ERROR:
    default:
      alert("확인 불가능 오류입니다. 관리자에게 문의해주세요.");
      break;
  }
};
