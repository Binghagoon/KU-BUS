$(document).ready(function () {
  $.ajax({
    // 디버깅 용 sample:
    // ../src/alarm-sample.json
    url: "../node/alarm",
    type: "GET",
    data: {
      id: id,
    },
    error: function (jqXHR, textstatus, errorthrown) {
      alert("Error");
    },
    success: function (data, status, xhr) {
      //sj should be done here TBDJS
    },
  });
});
