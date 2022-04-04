// import url-parameter.js

const query = queryToObject();

$(function () {
    $("#all_chk").change(function() {
        let checked = $(this).prop('checked');

        $("#terms_chk").prop('checked', checked);
        $("#personal_info_chk").prop('checked', checked);
        $("#location_info_chk").prop('checked', checked);
    });

    $("#go-next").on("click", (e) => {
        e.preventDefault();
        const allAgree = 
        $("#terms_chk").is(":checked") &&
        $("#personal_info_chk").is(":checked") &&
        $("#location_info_chk").is(":checked");

        if (allAgree) {
            urlChangeWithQuery("/kakao-login/register.html", query);
        } else {
            alert("모든 사항에 동의해야합니다.");
        }
    });
});
