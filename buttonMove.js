var ifr =  document.getElementById("Iframe");
var buttonParent = document.getElementById("FrameSuffix");
var now = 4;

function ChangeSelectClass(to){
    $("div#FrameSuffix Button:nth-child(" + to +")").addClass("select");
    $("div#FrameSuffix Button:nth-child(" + now +")").removeClass("select");
    now = to;
    debugger;
}

function GotoReservation(){
    ifr.src = "Reservation.html";
    ChangeSelectClass(1);
}
function GotoMap(){
    ifr.src = "Map.html";
    ChangeSelectClass(2);

}
function GotoMyPage(){
    ifr.src = "My Page.html";
    ChangeSelectClass(4);

}
function GotoAlarm(){
    ifr.src = "Alarm.html";
    ChangeSelectClass(3);
}
/* Frame의 동적움직임을 정의 */
//TBDJS ms;버튼 클릭한 디자인을 현재 클릭한 버튼에 적용을 하기  힌트: 클래스에 select를 잘 활용하기!