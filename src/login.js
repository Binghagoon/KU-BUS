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
        SigninAfter(data);
      },
    });
  } else {
    var student = {
      role: "STUDENT",
      id: "asdf",
      name: "student",
      debugging: "true",
    };
    var driver = {
      role: "DRIVER",
      id: "asdf",
      name: "driver",
      debugging: "true",
    };
    let val = debuggingIsStudent ? student : driver;
    SigninAfter(val);
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

function SigninAfter(data) {
  console.log("Successfully Sign in via Kakao API");
  console.log(data);

  sessionStorage.clear();
  sessionStorage.setItem("kubus_member_id", data["no"]);
  sessionStorage.setItem("kubus_member_name", data["name"]);
  sessionStorage.setItem("kubus_member_role", data["role"]);
  sessionStorage.setItem("debugging", debugging);

  window.location.href = "." + firstPage[data["role"]];
}

function IDFind() {}
function signUp() {}
function etc() {}
