
var Position  = {  //사용자 타입의 ENUM
    STUDENT: 1,
    DRIVER: 2,
    ADMIN: 3,
    ETC: 4
}

function PageChange(position){      // position은 Position 타입이라고 생각하자.
    if(position == Position.DRIVER){

    } else if(position == Position.STUDENT){
    }
    window.location.href= "./Frame.html";
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
            alert(data);
            //PageChange();
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