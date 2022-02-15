
var recordList;
var map

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
var clickblocked = false;

function StartMap(callback) {
    var getpos = new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    if (!!navigator.geolocation) {
        getpos.then(function(data){
            successCallback(data);
            callback();
        }).catch(function(error){
            console.log(error);
            alert("현재 위치를 가져올 수 없습니다.");
        });
    } else {
        alert("현재 위치를 가져올 수 없습니다.");
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

    var container = document.getElementById('Map');
    var options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3
    };
    map = new kakao.maps.Map(container, options);
}

function RecordPositionGet(){
    if(!top.debugging && self != top){
        $.ajax({
            url:  window.location.origin + "/node/record-position",
            type: "GET",
            error:function(request,status,error){
                alert("record position get error");
            },
            success: function(data, status, xhr){
                MapPinWithRecord(data);
            },
        });

    } else{
        $.ajax({
            url: window.location.origin + "/src/json/recordPosition.json",
            error:function(request,status,error){
                alert("record position get error");
            },
            success:function(data){
                MapPinWithRecord(data);
            }
        });
    }
}
function Pinupdate(position, who){
    if(UserMarker[who] == null){
        UserMarker[who] = MarkerCreate(position, who);
    } else {
        MarkerLocationChange(UserMarker[who], position);
    }
}

async function TraceAnother(id, who){
    setInterval(()=>UpdateAnother(id, who),1000);
}

async function UpdateAnother(id, who){
    var result = await top.GetPositionById(id);
    Pinupdate(result,who);
}

function NextStat(){
    statnum++;
    if(statnum >= orderStat.length) console.log("Error On NextStat()");
    console.log("Stat is " + orderStat[statnum]);
    MarkerImageChange(null, imgChangedMarker);
    openedIwcontent.close();
}


function MapPinWithRecord(data){
    if(typeof(data) == "string"){
        recordList = JSON.parse(data);

    } else{
        recordList = data;
    }

    recordList.forEach(function(value, index){
        var marker = CreateMarker(StarMarkerSrc, value, null);
        markers.push(marker);
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', ()=>MarkerClickEvent(value, marker, imageSize));
    });
}