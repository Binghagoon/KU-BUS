
function LocationChack(){       //TBD
    var isValueExist;
    $.when($.ajax({
        url:  window.location.origin + "/node/my-location-select",
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
function GetPositionById(id, updateCallback){
    $.ajax({
        url:  window.location.origin + "/node/get-location",
        type: "GET",
        //async: false,
        data: {
            'id':id,
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error getting  a position')
        },
        success: function(data, status, xhr){
            if(!updateCallback) return;
            updateCallback(data[0])
        },
    });
}
function LocationTrace(position){
    var coord = position.coords;
    try{
        $.ajax({
            url:  window.location.origin + "/node/my-location-insert",
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
        });
    } catch(e) {
        console.error(e);
    }
}
function CheckGeolocation(){
    navigator.geolocation.getCurrentPosition(LocationUpdate, ()=>alert('현재 위치를 가져올 수 없습니다.'));
}
function LocationUpdate(position){
    var coords = position.coords;
    $.ajax({
        url:  window.location.origin + "/node/my-location-update",
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
        url:  window.location.origin + "/node/my-location-delete",
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