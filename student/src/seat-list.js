// import ../src/url-parameter.js

const par = {
  normal: 1,
  wheel: 2,
};
let seatnum = 0;
let pre = null;

$(document).ready(function () {
  //renderTR("target-tr1", [['3번', 'three'], ['4번', 'four']]);
  //renderTR('target-tr2', [['5번', 'five'], ['6번', 'sixth']]);
  $(".chair.selectable").on("click", function () {
    var thisJquery = $(this);
    var v = thisJquery.attr("id");
    num = par[v];
    if (pre) chairUnclicked();
    chairClicked(par[v], thisJquery);
  });
  $("#next").on("click", function () {
    /*checkGeolocation((position) => {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            //Anam station
            lat = 37.586232954034564;
            lng = 127.02928291766814;
            //end
            var url = new URLSearchParams();
            url.append("seatnum", seatnum);
            url.append("lat", lat);
            url.append("lng", lng);
          });*/
    if (seatnum === 0) {
      alert("좌석을 선택해주세요.");
      return;
    }
    urlChangeWithQuery("map.html", {
      isWheelchairSeat: seatnum > 1,
    });
  });
});

function chairClicked(num, button) {
  //alert('좌석이 선택되었습니다 \n 호출 버튼을 누르는 창으로 이동합니다');
  function changeExplain(sel) {
    var text = "seatnum번 좌석 선택";
    sel.html(text.replace("seatnum", num));
  }
  var sel = $("#selected");
  seatnum = num;
  changeExplain(sel);
  sel.show();
  button.removeClass("unselected");
  button.addClass("selected");
  $("#next").addClass("crimson");
  pre = button;
}

function chairUnclicked() {
  if (!pre) {
    console.log("Pre-selected chair does not exist.");
    return;
  }
  var sel = $(pre);
  sel.removeClass("selected");
  //sel.addClass("unselected");
}

function renderTR(target, idValueArr) {
  var tr = document.getElementById(target);
  tr.innerHTML = "";
  for (var index in idValueArr) {
    var value = idValueArr[index][0];
    var id = idValueArr[index][1];
    tr.innerHTML +=
      '<td><input type="submit" value="' +
      value +
      '" id="' +
      id +
      '" onclick="touch()"/> </td>';
  }
}
