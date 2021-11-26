
function LocationChack(){       //TBD
    var isValueExist;

    $.when($.ajax({
        url: "https://smartku.bingha.me/node/my-location-select",
        type: "GET",
        data: {
            'id':args['id'],
        },
        error: function(jqXHR, textStatus, errorThrown){
            isValueExist = false;
        },
        success: function(data, status, xhr){
            isValueExist = true;
        },
    })).done();
    return isValueExist;
    
}
function LocationTrace(position){
    var coord = position.coords;
    //$.when(LocationDelete()).done( 
        $.ajax({
            url: "https://smartku.bingha.me/node/my-location-insert",
            type: "POST",
            data: {
                'id':args['id'],
                'latitude': coord['latitude'],
                'longitude': coord['longitude'],
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("failed on insert location");
            },
            success: function(data, status, xhr){
                setInterval(CheckGeolocation, 500);
            },
        })
    //);
    
}
function CheckGeolocation(){
    navigator.geolocation.getCurrentPosition(LocationUpdate, ()=>alert('현재 위치를 가져올 수 없습니다.'));
}
function LocationUpdate(position){
    var coords = position.coords;
    $.ajax({
        url: "https://smartku.bingha.me/node/my-location-update",
        type: "POST",
        data: {
            'id':args['id'],
            'latitude': coords['latitude'],
            'longitude': coords['longitude'],
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("failed on location update");
        },
        success: function(data, status, xhr){
            count = count + 1;
        },
    });
}
function LocationDelete(){
    $.ajax({
        url: "https://smartku.bingha.me/node/my-location-delete",
        type: "POST",
        //async: false,
        data: {
            'id':args['id'],
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("failed on location delete");
            return false;
        },
        success: function(data, status, xhr){
            console.log("Delete success");
            return true;
        },
        complete : function(jqXHR, textStatus){

        },
    });
}