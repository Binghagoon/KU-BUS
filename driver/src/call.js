var query = [];
function callIncome(id, nlo, mp, ResTime, rlo, dst, carfull) {
  var arg = [id, nlo, mp, ResTime, rlo, dst, carfull];
  var i;
  for (i = 0; i < arguments.length; i++) {
    query[i].text(query[i].text() + arg[i]);
  }
}

$(document).ready(function () {
  query = [
    $("#caller_id"),
    $("#caller-position-button"),
    $("#caller-phone-button"),
    $("#res-time"),
    $("#res-position"),
    $("#destination"),
    $("#car-full"),
  ];
  callIncome("1", "2", "3", "4", "5", "6", "7");
});
