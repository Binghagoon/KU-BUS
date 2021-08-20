var ifr;
var buttonParent;
var now = 2;
var buttons = [];
var pages = [];

$(function(){
    ifr =  $("#Iframe");
    buttonParent = $("FrameSuffix");
    buttons = [ undefined , $("#ReservationHome"), $("#MapHome"), $("#NoticeHome"), $("#MyInfoHome") ]
    pages = [ undefined, "Reservation-Driver", "Map", "Alarm", "MyPage-Driver" ]
    buttons[1].on("click",() => IframeChange(1));
    buttons[2].on("click",() => IframeChange(2));
    buttons[3].on("click",() => IframeChange(3));
    buttons[4].on("click",() => IframeChange(4));
});

function ChangeSelectClass(to){
    buttons[to].addClass("select");
    buttons[now].removeClass("select");
    now = to;
}
function IframeChange(to){
    ifr.attr("src", pages[to] + ".html");
    ChangeSelectClass(to);
}

/* Frame의 동적움직임을 정의 */