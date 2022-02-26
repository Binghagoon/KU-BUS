var Position = {
  //사용자 타입의 ENUM
  STUDENT: 1,
  DRIVER: 2,
  ADMIN: 3,
  etc: 4,
};

const firstPage = {
  undefined: "/student/first-page.html",
  STUDENT: "/student/first-page.html",
  DRIVER: "/driver/map.html",
  ADMINISTRATOR: "/administrator/first-page.html",
};

function pageChange(position) {
  //positino = {"name":"HEllo World","id":"asdf"(??),"role":"STUDENT"}
  if (position["role"] == "DRIVER") {
  } else if (position["role"] == "STUDENT") {
  }
  position["role"] = position["role"].toUpperCase();
  var url = updateURLParameter(
    "." + firstPage[position["role"]],
    "role",
    position["role"]
  );
  url = updateURLParameter(url, "id", position["id"]);
  if (position["debugging"] == "true")
    url = updateURLParameter(url, "debugging", position["debugging"]);
  window.location.href = url;
}

function IDSubmit(id, pw) {
  pw = sha3_256(pw); //PW는 sha 256으로 해싱후 확인(평문이 노출되지 않도록)
  if (!debugging) {
    $.ajax({
      url: "../node/sign-in",
      type: "GET",
      data: {
        id: id,
        pw: pw,
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("failed");
      },
      success: function (data, status, xhr) {
        pageChange(data);
      },
    });
  } else {
    var student = {
      role: "STUDENT",
      id: "asdf",
      name: "student",
      no: "1",
      debugging: "true",
    };
    var driver = {
      role: "DRIVER",
      id: "asdf",
      name: "driver",
      no: "1",
      debugging: "true",
    };
    //var val = isStudent ? student : driver;
    let val = student;
    pageChange(val);
  }
  /*
    if(id == "Driver"){
        pageChange(Position.DRIVER);
    } else if (id=="Student"){
        pageChange(Position.STUDENT);
    }
    */
  //debugger;
}

function IDFind() {}
function signUp() {}
function etc() {}
