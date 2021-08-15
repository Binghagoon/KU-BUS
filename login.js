
var Position  = {  //사용자 타입의 ENUM
    STUDENT: 1,
    DRIVER: 2,
    ADMIN: 3,
    ETC: 4
}

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

function PageChange(position){  
    if(position == "DRIVER"){

    } else if(position == "STUDENT"){
    }
    window.location.href= "./Frame.html";
    updateURLParameter("./Frame.html", "role", position);
}

function IDSubmit(id, pw){
    
    pw = sha3_256(pw);
    $.ajax({
        url: "./php/idget.php",
        type: "POST",
        data: {
            id:id,
            pw:pw
        },
        error: function(a, b, c){
            alert("failed");
        },
        success: function(data, status, xhr){
            PageChange(data);
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