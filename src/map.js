var recordList;
var map;

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
        console.log(error.code);
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
  if (!debugging) {
    $.ajax({
      url: window.location.origin + "/node/record-position",
      type: "GET",
      error: function (request, status, error) {
        alert("record position get error");
      },
      success: function (data, status, xhr) {
        mapPinWithRecord(data);
      },
    });
  } else {
    $.ajax({
      url: window.location.origin + "/src/json/record-position.json",
      error: function (request, status, error) {
        alert("record position get error");
      },
      success: function (data) {
        mapPinWithRecord(data);
      },
    });
  }
}
function pinUpdate(position, who) {
  if (userMarker[who] == null) {
    userMarker[who] = markerCreate(position, who);
  } else {
    markerLocationChange(userMarker[who], position);
  }
}

async function traceAnother(id, who) {
  setInterval(() => updateAnother(id, who), 1000);
}

async function updateAnother(id, who) {
  var result = await getPositionById(id);
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
    var marker = createMarker(StarMarkerSrc, value, null);
    markers.push(marker);
    marker.setMap(map);
    kakao.maps.event.addListener(marker, "click", () =>
      markerClickEvent(value, marker, imageSize)
    );
  });
}
