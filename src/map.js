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
      console.log("record positions are not read from server, but we can read local json file.");
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
  if (!!navigator.geolocation) {
    getpos
      .then(function (data) {
        let newCoords = {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        }
        pinUpdate(newCoords, who);
      })
      .catch(function (error) {
        console.log(error.message);
        alert("현재 위치를 가져올 수 없습니다.");
      });
  } else {
    alert("현재 브라우저에서 위치정보를 지원하지 않습니다.");
  }
}

function pinUpdate(position, who) {
  if (userMarker[who] == null) {
    userMarker[who] = markerCreate(position, who, who, map);
  } else {
    markerLocationChange(userMarker[who], position);
  }
  return userMarker[who];
}

async function traceAnother(id, who) {
  return setInterval(() => updateAnother(id, who), 1000);
}

async function updateAnother(id, who) {
  var result = await UserLocation.getPosViaServer(id);
  pinUpdate(result, who);
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
    kakao.maps.event.addListener(marker, "click", () =>
      markerClickEvent(value, marker, imageSize)
    );
  });
}
