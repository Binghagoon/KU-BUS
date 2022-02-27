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
    DRIVER: "../src/img/car-pin.png",
    STUDENT: "../src/img/human-pin.png",
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
    title: title == undefined ? who : title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
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

function createMarker(imgSrc, value, event) {}

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
    var iwContent = `<span class="info-title">${value.name}</span>`,
      iwRemoveable = false;

    if (openedIwcontent) {
      openedIwcontent.close();
    }
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
  openedIwcontent = infoWindowOpen(value.name, orderStat[statnum]);

  let infoTitle = document.querySelector(".info-title");
  const w = infoTitle.offsetWidth + 10;
  const ml = w / 2;
  infoTitle.parentElement.style.left = "50%";
  infoTitle.parentElement.style.marginLeft = -ml + "px";
  infoTitle.parentElement.style.width = w + "px";
  infoTitle.parentElement.previousSibling.style.display = "none";
  infoTitle.parentElement.parentElement.style.border = "0px";
  infoTitle.parentElement.parentElement.style.background = "unset";
}
