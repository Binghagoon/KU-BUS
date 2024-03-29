var recordList;
let map;

var mylat, mylng;
var from = {
  lat: Intl,
  lng: Intl,
  name: String,
};
var to = {
  lat: Intl,
  lng: Intl,
  name: String,
};

var fromclicked = false,
  toclicked = false;
var clickblocked = false;

function startMap(callback = null) {
  var getpos = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  if (!!navigator.geolocation) {
    getpos
      .then(function (data) {
        successCallback(data);
        if (callback) {
          callback();
        }
      })
      .catch(function (error) {
        console.log(error.message);
        alert("현재 위치를 가져올 수 없습니다.");
        window.location.href = "../location-permission.html";
      });
  } else {
    alert("현재 브라우저에서 위치정보를 지원하지 않습니다.");
  }
}

function successCallback(position) {
  var coord = position["coords"];
  var lat = coord["latitude"];
  var lng = coord["longitude"];
  //Anam station
  lat = 37.586232954034564;
  lng = 127.02928291766814;
  //end

  var container = document.getElementById("map");
  var options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
  container.append(map);
}

function recordPositionGet() {
  $.ajax({
    url: "../node/record-position",
    type: "GET",
    error: function (request, status, error) {
      console.log(
        "record positions are not read from server, but we can read local json file."
      );
      $.ajax({
        url: "../src/json/record-position.json",
        error: function (request, status, error) {
          alert("record position get error");
        },
        success: function (data) {
          mapPinWithRecord(data);
        },
      });
    },
    success: function (data, status, xhr) {
      mapPinWithRecord(data);
    },
  });
}

function pinCurrentPosition(who) {
  var getpos = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  let newCoords = {
    lat: 37.586232954034564,
    lng: 127.02928291766814,
  };
  if (!!navigator.geolocation) {
    getpos
      .then(function (data) {
        newCoords = {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        };
      })
      .catch(function (error) {
        console.log(error.message);
        alert("위치 정보를 획득하는 데 실패했습니다. 안암역으로 이동합니다.");
      })
      .finally(function () {
        pinUpdate(newCoords, who);
      });
  } else {
    alert("현재 브라우저에서 위치정보를 지원하지 않습니다.");
  }
}

function pinUpdate(position, who) {
  //console.log(position, who);
  if (userMarker[who] == null) {
    userMarker[who] = markerCreate(position, who, who, map);
  } else {
    markerLocationChange(userMarker[who], position);
  }
  return userMarker[who];
}

function traceAnother(id, who) {
  return setInterval(function () {
    updateAnother(id, who);
  }, 1000);
}

function updateAnother(id, who) {
  UserLocation.getPosViaServer(id).then((result) => {
    pinUpdate(result, who);
  });
}

function nextStat() {
  statnum++;
  if (statnum >= orderStat.length) console.log("Error On nextStat()");
  console.log("Stat is " + orderStat[statnum]);
  markerImageChange(null, imgChangedMarker);
  openedIwcontent.close();
}

function mapPinWithRecord(data) {
  if (typeof data == "string") {
    recordList = JSON.parse(data);
  } else {
    recordList = data;
  }

  recordList.forEach(function (value, index) {
    let marker = markerCreate(value, "STAR", value.name, map);
    kakao.maps.event.addListener(marker, "click", () => {
        let imageSize = new kakao.maps.Size(24, 35);
        markerClickEvent(value, marker, imageSize);
      }
    );
  });
}
