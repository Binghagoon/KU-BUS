// It might need to import the Map.js
class Marker{
    
    static imgSrc ={
        'star' : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        null : 'https://t1.daumcdn.net/mapjsapi/images/marker.png',
        undefined : 'https://t1.daumcdn.net/mapjsapi/images/marker.png',
    }
    static initialImgSize =  new kakao.maps.Size(24, 35);

    
    static markerList = []

    static ShowMarkerList(){
        this.markerList.forEach(console.log);
        
    }

    static FindMarker(kakaoMarker){ //for compatibility
        var marker;
        this.markerList.forEach(function(value,index,thisArg){
            if(kakaoMarker == value.kakaoMarker){
                marker = value;
            }
        });
        return marker;
    }

    constructor(map, imgSrc, value) {
        if(typeof map !='object'){
            console.log('map is not initalized.');
            throw new Error();
        }
        // img : String value : Object
        var markerImage = new kakao.maps.MarkerImage(imgSrc,Marker.initialImgSize);
        this.kakaoMarker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(value.lat,value.lng), // 마커를 표시할 위치
            title : value.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage, // 마커 이미지 
        });
        this.map = map;     //it may make to static variable.
        Marker.markerList.push(this);
    }

    ImgChange(imgname) {
        var imgSize = Marker.initialImgSize;
        this.kakaoMarker.setImage(new kakao.maps.MarkerImage(Marker.imgSrc[imgname], imgSize));
    }

    LocationChange(position) {
        var latlng = new kakao.maps.LatLng(position['latitude'], position['longitude']);
        this.kakaoMarker.setPosition(latlng);
    }

    Enable(){
        this.kakaoMarker.setmap(this.map);
    }

    Disable(){
        this.kakaoMarker.setMap(null);
    }

    Untrace(){
        clearInterval(this.traceTimeout);
    }

    Trace(func){
        // func should return {'latitude':Number, 'longitude':Number}
        func().then(function(value){
            try{
                console.log(`initial locations are value['latitude']:` +
                ` ${value['latitude']} and value['longitude']: ${value['longitude']}`);
                this.traceTimeout = setTimeout(function(){
                    func().then(function(value){
                        this.LocationChange(value);
                    });
                },1000);
            } catch(e){
                console.log("func should return {'latitude':Number, 'longitude':Number}");
                console.log(e);
            }
        });
    }

}