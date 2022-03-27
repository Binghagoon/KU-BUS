// import url-parameter.js

const query = queryToObject();

$(function () {
    $("#go-next").on("click", (e) => {
        e.preventDefault();
        const allAgree = 
        $("#persnal-check").is(":checked") &&
        $("#persnal-check").is(":checked") &&
        $("#location-check").is(":checked");

        if (allAgree) {
            urlChangeWithQuery("/kakao-login/register.html", query);
        } else {
            alert("모든 사항에 동의해야합니다.");
        }
    })
});
