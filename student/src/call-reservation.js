$(document).ready(function () {
  let query = Object.fromEntries(new URLSearchParams(window.location.search));
  //printData("아산이학관", "하나스퀘어", "2021-09-20", "13:00", "홍길동", "010-1234-5678", "asdf@adsf.com");
  printData(
    query.fromName,
    query.toName,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  $("#submit").on("click", function () {
    if (!top.debugging) {
      $.ajax({
        url: window.location.origin + "/node/reservation-post",
        type: "POST",
        data: {
          now_place_no: query.fromNo,
          to_place_no: query.toNo,
          id: query.id,
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("failed");
        },
        success: function (data, status, xhr) {
          top.args["requestid"] = data.insertId;
          console.log("move to doing-reservation.html");
          window.location.href = "doing-reservation.html";
        },
      });
    } else {
      console.log("move to doing-reservation.html");
      window.location.href = "doing-reservation.html";
    }
    return false;
  });
  $("button#cancel").click(function () {
    console.log("move to map.html");
    window.location.href = "map.html";
    return false;
  });
});
function printData(from, dest, date, time, name, mp, email) {
  $("#from").html($("#from").html() + from);
  $("#dest").html($("#dest").html() + dest);
  $("#date").html($("#date").html() + date);
  $("#pick-up-time").html($("#pick-up-time").html() + time);
  $("#user-name").val(name);
  $("user-phone-number").val(mp);
  $("#user-email-address").val(email);
}
