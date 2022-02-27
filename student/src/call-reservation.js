// import ../src/url-parameter.js

const query = queryToObject();
$(() => {
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
    if (!(sessionStorage.getItem("debugging") === "true")) {
      $.ajax({
        url: "../node/call-request",
        type: "POST",
        data: {
          departureNo: query.fromNo,
          arrivalNo: query.toNo,
          id: sessionStorage.getItem("kubus_member_id"),
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("failed to call");
          //console.error(`${textStatus}\n${errorThrown}`);
        },
        success: function (data, status, xhr) {
          console.log("move to doing-reservation.html");
          urlChangeWithQuery("doing-reservation.html", {
            fromName: query.fromName,
            toName: query.toName,
            callNo: data.callNo,
          });
        },
      });
    } else {
      console.log("on debugging mode, move to doing-reservation.html");
      urlChangeWithQuery("doing-reservation.html", {
        fromName: query.fromName,
        toName: query.toName,
        callNo: 10,
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

function printData(from, dest, date, time, name, phone, email) {
  const div = $("<div />");
  const tag = {
    from: $("<p />").text(`출발지: ${from}`),
    dest: $("<p />").text(`도착지: ${dest}`),
    date: $("<p />").text(`예약일: ${date}`),
    time: $("<p />").text(`픽업 시간대: ${time}`),
    name: $("<p />").text(`이름: ${name}`),
    phone: $("<p />").text(`연락처: ${phone}`),
    email: $("<p />").text(`이메일: ${email}`),
  };

  from && div.append(tag.from);
  dest && div.append(tag.dest);
  date && div.append(tag.date);
  time && div.append(tag.time);
  name && div.append(tag.name);
  phone && div.append(tag.phone);
  email && div.append(tag.email);
  div.insertBefore("#submit");
}
