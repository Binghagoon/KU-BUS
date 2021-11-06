
var Position  = {  //사용자 타입의 ENUM
    STUDENT: 1,
    DRIVER: 2,
    ADMIN: 3,
    ETC: 4
}

function PageChange(position){  //position = {id: String, name: String, no: Int}
    if(position["name"] == "DRIVER"){

    } else if(position["name"] == "STUDENT"){

    }
    position["name"] = position["name"].toUpperCase();
    var url = updateURLParameter("./Frame.html", "role", position["role"]);
    url = updateURLParameter(url, "id", position["id"] );
    if(position["debugging"] == "true") url = updateURLParameter(url, "debugging", position["debugging"]);
    console.log("Move to Frame");
    window.location.href=url;
}

function IDSubmit(id, pw){
    
    pw = sha3_256(pw);  //PW는 sha 256으로 해싱후 확인(평문이 노출되지 않도록)
    if(!debugging){
        $.ajax({
            url: "http://smartku.bingha.me/node/id-get",
            type: "GET",
            data: {
                id:id,
                pw:pw
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("failed");
            },
            success: function(data, status, xhr){
                PageChange(data);
            }
        });

    }else{
        var student = { role:"STUDENT", id:"asdf", name:"student", no:"1", debugging:"true"}
        var driver = { role:"DRIVER", id:"asdf", name:"driver", no:"1", debugging:"true"}
        var val = isStudent ? student: driver;
        PageChange(val);
    }
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