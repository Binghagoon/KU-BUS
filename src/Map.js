let recordList;
let map;
let markers = [];

let mylat, mylng;
let from = {
  lat: Intl,
  lng: Intl,
  name: String,
};
let to = {
  lat: Intl,
  lng: Intl,
  name: String,
};
let fromclicked = false,
  toclicked = false;
function startMap() {
  getMyPosition();
}

// for debugging
let click = 0;

function successCallback(position) {
  //    let args = top.args;
  let coord = position["coords"];
  let lat = coord["latitude"];
  let lng = coord["longitude"];
  //    mylat = lat;
  //    mylng = lng;
  //    from["lat"] = lat;
  //    from["lng"] = lng;
  //To Be cleared 09.14 TBDJS
  //Anam station
  lat = 37.586232954034564 + click * 0.0001;
  click += 1;
  lng = 127.02928291766814;
  //end
  $("#set_location").html("latitude : " + lat + ", longitude : " + lng);
  let container = document.getElementById("Map");
  let options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
  let myPosition = new kakao.maps.LatLng(lat, lng);
  let driverPosition = new kakao.maps.LatLng(lat, lng + click * 0.0001);
  let myMarker = new kakao.maps.Marker({
    map: map,
    position: myPosition,
  });
  let driverMarker = new kakao.maps.Marker({
    map: map,
    position: driverPosition,
  });
}

function recordPositionGet() {
  if (!top.debugging) {
    $.ajax({
      url: "https://smartku.bingha.me/node/record-position",
      type: "GET",
      error: function (request, status, error) {
        //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        alert("record position get error");
      },
      success: function (data, status, xhr) {
        mapPinWithRecord(data);
      },
    });
  } else {
    $.ajax({
      url: window.location.origin + "/src/json/recordPosition.json",
      error: function (request, status, error) {
        alert("record position get error");
      },
      success: function (data) {
        mapPinWithRecord(data);
      },
    });
  }
}

function mapPinWithRecord(data) {
  let iwContent = "", // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
  if (typeof data == "string") {
    recordList = JSON.parse(data);
  } else {
    recordList = data;
  }
  let imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  let bluepin = window.location.origin + "/src/img/blue-map-pin.png";
  let redpin = window.location.origin + "/src/img/red-map-pin.png";

  recordList.forEach(function (value, index) {
    //refernce with https://apis.map.kakao.com/web/sample/multipleMarkerImage/

    // 마커 이미지의 이미지 크기 입니다
    let imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(value.lat, value.lng), // 마커를 표시할 위치
      title: value.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });
    markers.push(marker);
    marker.setMap(map);
    kakao.maps.event.addListener(marker, "click", function () {
      let infowindowopen = function (status) {
        $("#PositionName").html(value.name + status);

        iwContent = $("#InfowindowTemplete").html();
        let infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });
        infowindow.open(map, marker);
      };
      let MarkerImageChange = function (what) {
        let markerurl;
        if (what == "Blue") {
          markerurl = bluepin;
        } else if (what == "Red") {
          markerurl = redpin;
        } else {
          console.log("fail an argument");
        }
        marker.setImage(new kakao.maps.MarkerImage(markerurl, imageSize));
      };

      if (!fromclicked) {
        //지도에서 출발지 선택할때
        from = value;
        infowindowopen("from");
        $("#MapStartOrDest").html("도착지");
        MarkerImageChange("Blue");
        fromclicked = true;
      } else if (!toclicked) {
        //지도에서 도착지 선택할때
        to = value;
        infowindowopen("to");
        MarkerImageChange("Red");
        toclicked = true;
      } else {
        console.log("Too many click");
      }
    });
  });
}

function getMyPosition() {
  if (!!navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, () =>
      alert("현재 위치를 가져올 수 없습니다.")
    );
  } else {
    alert("현재 위치를 가져올 수 없습니다.");
  }
}
