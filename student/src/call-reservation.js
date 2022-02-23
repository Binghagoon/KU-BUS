$(() => {
  let query = Object.fromEntries(new URLSearchParams(window.location.search));
  console.log(query);
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
    if (!top.debugging) {
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
          top.args["callNo"] = data.callNo;
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
  $("button#cancel").on("click", () => {
    console.log("move to map.html");
    window.location.href = "map.html";
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
