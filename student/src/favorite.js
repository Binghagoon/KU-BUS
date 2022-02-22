circles = [];
$(document).ready(function () {
  [1, 2, 3].forEach((index) => {
    var circle = $("circle" + index);
    circles.push(circle);
    circle.click(function () {
      alert(circle.val() + "를 출발지로 지정하시겠습니까");
    });
  });
  [1, 2, 3].forEach((index) => circles.push($("circle" + index)));
  $.ajax({
    url: "../php/record-position-get.php",
    type: "GET",
    error: function (request, status, error) {
      alert("record position get error");
    },
    success: function (data, status, xhr) {
      //data:{ num, lat, lon, name }  num:array num, name: position number; Korean, how to access datas is like date["name"].
      data = JSON.parse(data);
      var i = 0;
      for (i = 0; i < data.length; i++) {
        var name = data[i]["name"];
        $(".templete > .circle").html(name);
        var dom = $(".templete").html();
        $("#favorite.group").append(dom);
      }
      //TBDJS for han
    },
  });
  $("#button").click(function () {
    //TBDJS
  });
  circles[0].click(function () {
    //TBDJS
  });
  circles[1].click(function () {
    //TBDJS
  });
});
