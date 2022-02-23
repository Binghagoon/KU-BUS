// import ../src/url-parameter.js

$(() => {
  let query = queryToObject();
  //console.log(query);
  //PrintData("아산이학관", "하나스퀘어", "2021-09-20", "13:00", "홍길동", "010-1234-5678", "asdf@adsf.com");
  printData(
    query.fromName,
    query.toName,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );

  $("#submit").on("click", () => {
    if (!query.debugging) {
      $.ajax({
        url: "../node/reservation-post",
        type: "POST",
        data: {
          now_place_no: query.fromNo,
          to_place_no: query.toNo,
          id: query.id,
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("failed, " + textStatus);
        },
        success: function (data, status, xhr) {
          console.log("move to doing-reservation.html");
          urlChangeWithQuery("doing-reservation.html", {
            id: query.id,
            fromName: query.fromName,
            toName: query.toName,
            callNo: data.callNo,
          })
        },
      });
    } else {
      console.log("on debugging mode, move to doing-reservation.html");
      urlChangeWithQuery("doing-reservation.html", {
        id: query.id,
        fromName: query.fromName,
        toName: query.toName,
        callNo: 10,
        debugging: true,
      });
    }
    return false;
  });
  $("button#cancel").on("click", () => {
    console.log("move to first-page.html");
    window.location.href = "first-page.html";
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
