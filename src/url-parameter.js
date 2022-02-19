/**
 * http://stackoverflow.com/a/10997390/11236
 */
function updateURLParameter(url, param, paramVal) {
  var newAdditionalURL = "";
  var tempArray = url.split("?");
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  var temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] != param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }
  var rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}
function queryToObject(query){
  let sp;
  let ob = {};
  if(query == undefined){
    sp = new URLSearchParams(window.location.search);
  } else{
    sp = new URLSearchParams(query);
  }
  for (const pair of sp.entries()) {
    ob[pair[0]]=pair[1];
  }
  return ob;
}
