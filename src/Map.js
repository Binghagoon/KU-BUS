
var recordList;
var map
var markers = [];


var mylat, mylng;
var from={
    "lat": Intl,
    "lng": Intl,
    "name": String
};
var to={
    "lat": Intl,
    "lng": Intl,
    "name": String
};
var fromclicked = false,
    toclicked = false;
function StartMap() {
    if (!!navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, ()=>alert('현재 위치를 가져올 수 없습니다.'));
    } else {
        alert("현재 위치를 가져올 수 없습니다.");
    }
}

function successCallback(position) {
//    var args = top.args;
    var coord = position["coords"];
    var lat = coord["latitude"];
    var lng = coord["longitude"];
//    mylat = lat;
//    mylng = lng;
//    from["lat"] = lat;
//    from["lng"] = lng;
    //To Be cleared 09.14 TBDJS
    //Anam station
        lat = 37.586232954034564;
        lng = 127.02928291766814;
    //end
    $("#set_location").html('latitude : ' + lat + ', longitude : ' + lng);
    var container = document.getElementById('Map');
    var options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3
    };
    map = new kakao.maps.Map(container, options);
    /*  var markerPosition = new kakao.maps.LatLng(lat,lng);
        var marker = new kakao.maps.Marker({
        position: markerPosition
        });
        marker.setMap(map); */
    var iwContent = "현재 있는 위치.";
    var iwPosition = new kakao.maps.LatLng(lat, lng);
    var iwRemoveable = true;
    var infowindow = new kakao.maps.InfoWindow({
        map: map,
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable
    });
}

function RecordPositionGet(){
    if(!top.debugging){
        $.ajax({
            url: "http://smartku.bingha.me/node/record-position",
            type: "GET",
            error:function(request,status,error){
                //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                alert("record position get error");
            },
            success: function(data, status, xhr){
                MapPinWithRecord(data);
            }
        });

    } else{
        $.ajax({
            url: window.location.origin + "/src/recordPosition.json",
            error:function(request,status,error){
                alert("record position get error");
            },
            success:function(data){
                MapPinWithRecord(data);
            }
        });
    }
}

function MapPinWithRecord(data){
    var iwContent = "", // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
    if(typeof(data) == "string"){
        recordList = JSON.parse(data);

    } else{
        recordList = data;
    }
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    var bluepin = window.location.origin + "/src/img/blue-map-pin.png";
    var redpin =  window.location.origin + "/src/img/red-map-pin.png";

    


    recordList.forEach(function(value, index){
        //refernce with https://apis.map.kakao.com/web/sample/multipleMarkerImage/

        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);
        
        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(value.lat,value.lng), // 마커를 표시할 위치
            title : value.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });
        markers.push(marker);
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', function() {
            
            var infowindowopen = function(status){
                $("#PositionName").html(value.name + status)

                iwContent = $("#InfowindowTemplete").html();
                var infowindow = new kakao.maps.InfoWindow({
                    content : iwContent,
                    removable : iwRemoveable
                });   
                infowindow.open(map, marker); 
            };
            var MarkerImageChange = function(what){
                var markerurl;
                if(what =="Blue"){
                    markerurl = bluepin;
                } else if (what == "Red"){
                    markerurl = redpin;
                } else{
                    console.log("fail an argument");
                }
                marker.setImage(new kakao.maps.MarkerImage(markerurl, imageSize));
            };

            if(!fromclicked){           //지도에서 출발지 선택할때
                from = value;
                infowindowopen("from");
                $("#MapStartOrDest").html("도착지");
                MarkerImageChange("Blue");
                fromclicked = true;
            }
            else if(!toclicked){          //지도에서 도착지 선택할때
                to = value;
                infowindowopen("to");;
                MarkerImageChange("Red");
                toclicked = true;
            }
            else{
                console.log("Too many click");
            }
            
        });
    });
}