
var Position  = {  //사용자 타입의 ENUM
    STUDENT: 1,
    DRIVER: 2,
    ADMIN: 3,
    ETC: 4
}
/**
 * http://stackoverflow.com/a/10997390/11236
 */
function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function PageChange(position){  //position = {id: String, name: String, no: Int}
    if(position["name"] == "DRIVER"){

    } else if(position["name"] == "STUDENT"){

    }
    position["name"] = position["name"].toUpperCase();
    var url = updateURLParameter("./Frame.html", "role", position["name"]);
    url = updateURLParameter(url, "id", position["id"] );
    window.location.href=url;
}

function IDSubmit(id, pw){
    
    pw = sha3_256(pw);  //PW는 sha 256으로 해싱후 확인(평문이 노출되지 않도록)
    $.ajax({
        url: "http://smartku.bingha.me/php/idget-test.php",     //"STUDENT"를 불러오는 php 실제론 idget.php를 쓰면 로그인이 가능함
        type: "POST",
        data: {
            id:id,
            pw:pw
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("failed");
        },
        success: function(data, status, xhr){
            PageChange( JSON.parse(data));
        }
    });

    /*
    if(id == "Driver"){
        PageChange(Position.DRIVER);
    } else if (id=="Student"){
        PageChange(Position.STUDENT);
    }
    */
    //debugger;
}

function IDFind(){

}
function SignUp(){

}
function Etc(){

}