var ifr;
var buttonParent;
var now = 2;
var buttons = [];
var pages = [];
var firstPage ={
    undefined:"./Student/Firstpage.html",
    "STUDENT":"./Student/Firstpage.html",
    "DRIVER":"./Driver/Map.html"
};

$(function(){
    ifr =  $("#Iframe");
    buttonParent = $("FrameSuffix");
    buttons = [ undefined , $("#ReservationHome"), $("#MapHome"), $("#NoticeHome"), $("#MyInfoHome") ]
    pages = [ undefined, "Reservation", "Map", "Alarm", "MyPage" ]
    pre = { "STUDENT" : "Student", "DRIVER" : "Driver"};
    buttons[1].on("click",() => Click(1));
    buttons[2].on("click",() => Click(2));
    buttons[3].on("click",() => Click(3));
    buttons[4].on("click",() => Click(4));
    ifr.attr("src",firstPage[args["role"]]);        //frame's first page
});

function Click(to){
    var src = pages[to] + ".html";
    if(to == 1 || to == 2 || to == 3 || to == 4){
        src = pre[args["role"]] + "/" + src;
    }
    ifr.attr("src", src + window.location.search);
    buttons[to].addClass("select");
    buttons[now].removeClass("select");
    now = to;
}

/* Frame의 동적움직임을 정의 */