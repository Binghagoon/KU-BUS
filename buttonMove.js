var ifr =  document.getElementById("Iframe");

function GotoReservation(){
    ifr.src = "Reservation.html";
}
function GotoMap(){
    ifr.src = "Map.html";
}
function GotoMyPage(){
    ifr.src = "My Page.html";
}
function GotoAlarm(){
    ifr.src = "Alarm.html";
}
/* Frame의 동적움직임을 정의 */
//TBDJS ms;버튼 클릭한 디자인을 현재 클릭한 버튼에 적용을 하기  힌트: 클래스에 select를 잘 활용하기!