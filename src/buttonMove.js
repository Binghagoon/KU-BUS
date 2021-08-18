var ifr;
var buttonParent;
var now = 2;

$(function(){
    ifr =  $("#Iframe");
    buttonParent = $("FrameSuffix");
    $("#ReservationHome").on("click",GotoReservation);
    $("#MapHome").on("click",GotoMap);
    $("#NoticeHome").on("click",GotoAlarm);
    $("#MyInfoHome").on("click",GotoMyPage);
});

function ChangeSelectClass(to){
    $("div#FrameSuffix Button:nth-child(" + to +")").addClass("select");
    $("div#FrameSuffix Button:nth-child(" + now +")").removeClass("select");
    now = to;
    debugger;
}

function GotoReservation(){
    ifr.attr("src", "Reservation-Driver.html");
    ChangeSelectClass(1);
}
function GotoMap(){
    ifr.attr("src", "Map.html");
    ChangeSelectClass(2);

}
function GotoMyPage(){
    ifr.attr("src", "MyPage-Driver.html");
    ChangeSelectClass(4);

}
function GotoAlarm(){
    ifr.attr("src", "Alarm.html");
    ChangeSelectClass(3);
}
/* Frame의 동적움직임을 정의 */