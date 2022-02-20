var userMarker = {
  DRIVER: null,
  STUDENT: null,
};
var starMarkerSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
var imageSize = new kakao.maps.Size(24, 35);
//var orderStat = ["from", "to", "reserve"];
//var statnum = 0;
var imgChangedMarker = null;
var deletedMarker = [];
var openedIwcontent = null;

function markerCreate(position, who, title, map) {
  const imgconvert = {
    DRIVER: window.location.origin + "/src/img/car-pin.png",
    STUDENT: window.location.origin + "/src/img/human-pin.png",
    STAR: starMarkerSrc,
    null: null,
    undefined: null,
  };
  let pos = position;

  // img : String value : Object
  let imageSize = new kakao.maps.Size(24, 35);
  let markerImage = new kakao.maps.MarkerImage(imgconvert[who], imageSize);
  let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: new kakao.maps.LatLng(pos.lat, pos.lng), // 마커를 표시할 위치
    title: title==undefined ? who: title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    image: markerImage, // 마커 이미지
  });
  marker.setMap(map);
  return marker;
}

function markerLocationChange(marker, position) {
  marker.setPosition(
    new kakao.maps.LatLng(position["latitude"], position["longitude"])
  );
}

function createMarker(imgSrc, value, event) {
}

function clickedMarkerDelete() {
  imgChangedMarker.setMap(null);
  deletedMarker.push(imgChangedMarker);
}

function deletedMarkerRevive() {
  deletedMarker.forEach(function (value, index) {
    value.setMap(map);
  });
}

function markerImageChange(what, marker) {
  if (!marker) return;
  var imgsrc =
    what == "star"
      ? starMarkerSrc
      : "https://t1.daumcdn.net/mapjsapi/images/marker.png";
  marker.setImage(new kakao.maps.MarkerImage(imgsrc, imageSize));
  imgChangedMarker = marker;
}

function markerClickEvent(value, marker, imageSize) {
  function infoWindowOpen(status) {
    var iwContent = "", // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
    $("#position-name").html(value.name);

    if (openedIwcontent) {
      openedIwcontent.close();
    }
    iwContent = $("#infowindow-templete").html();
    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });
    infowindow.open(map, marker);
    return infowindow;
  }
  function orderInput(status) {
    if (status == orderStat[0]) {
      //from
      from = value;
    } else if (status == orderStat[1]) {
      //to
      to = value;
    } else {
      console.log("Too many click");
    }
  }
  markerImageChange("star", imgChangedMarker);
  markerImageChange(null, marker);
  nextButtonSwitch(true);
  orderInput(orderStat[statnum]);
  openedIwcontent = infoWindowOpen(orderStat[statnum]);
}
