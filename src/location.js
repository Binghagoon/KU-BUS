/** this file might need to be import JQuery file. otherwise it works not fine. */
class UserLocation {
  constructor(id, callback) {
    //Anam station
    let lat = 37.586232954034564;
    let lng = 127.02928291766814;
    this.lat = lat;
    this.lng = lng;
    this.id = id;
    if (callback) callback(this);
  }

  //pos returns {lat:Number,lng:Number}, position returns {latitude:Number, longitude:Number}
  static async checkIsValueExist(id) {
    //To be merged on getPosViaServer()
    let isValueExist;
    await $.ajax({
      url: "../node/get-location",
      type: "GET",
      data: {
        id: id,
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
        isValueExist = false;
      },
      success: function (data, status, xhr) {
        if (data.status) {
          isValueExist = false;
        } else {
          isValueExist = true;
        }
      },
    });
    return isValueExist;
  }

  static getPositionViaClient(callback) {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let coords = position.coords;
          if (callback != undefined) {
            callback(coords);
          }
          res({
            lat: coords.latitude,
            lng: coords.longitude,
          })
        },
        function (err) {
          console.error(err);
          console.log("Could not get Position via client");
          rej(err);
        }
      )
    });
  }

  static serverPosInsert(pos, id, successCallback) {
    return new Promise((res, rej) => {
      $.ajax({
        url: "../node/location-insert",
        type: "POST",
        data: {
          id: id,
          latitude: pos.lat,
          longitude: pos.lng,
        },
        success: function (data, status, xhr) {
          if (data.status === "success") {
            console.log("serverPosInsert success");
            if (successCallback) {
              successCallback(data);
            }
            res(data);
          } else {
            console.log(data.errorMessage);
            rej(data.status);
          }
        },
      })
    })
  } 

  static serverPosUpdate(pos, id, successCallback) {
    return new Promise((res, rej) => {
      $.ajax({
        url: "../node/location-update",
        type: "POST",
        data: {
          id: id,
          latitude: pos.lat,
          longitude: pos.lng,
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("failed on location update");
          rej("error in serverPosUpdate");
        },
        success: function (data, status, xhr) {
          if (successCallback) {
            successCallback(data);
          }
          res(data);
        },
      });
    });
  }

  static getPosViaServer(id, callback) {
    return new Promise((res, rej) => {
      let location = {};
      $.ajax({
        type: "GET",
        url: "../node/get-location",
        data: {
          id: id,
        },
        dataType: "JSON",
        success: function (response) {
          if (response.status == "error") {
            console.error(response.errorMessage);
            rej(response.status);
          } else {
            location = {
              lat: response.latitude,
              lng: response.longitude,
            };
            if (callback) callback(location);
            res(location);
          }
        },
      });
    });
  }

  get pos() {
    return {
      lat: this.lat,
      lng: this.lng,
    };
  }

  get position() {
    return {
      latitude: this.lat,
      longitude: this.lng,
    };
  }
  /** callback argument is pos */
  awakeInterval(timed = 1000, callback) {
    let loc = this;
    UserLocation.getPositionViaClient()
    .then(pos => {
      return UserLocation.serverPosInsert(pos, loc.id);
    });

    this.intervalID = setInterval(function () {
      UserLocation.getPositionViaClient()
      .then(pos => {
        if (callback) callback(pos);

        return UserLocation.serverPosUpdate(pos, loc.id);
      });
    }, timed);
  }

  killInterval() {
    try {
      clearInterval(this.intervalID);
    } catch (e) {
      console.log(e);
    }
  }

  delete() {
    $.ajax({
      url: "../node/mlocation-delete",
      type: "POST",
      //async: false,
      data: {
        id: args["id"],
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("failed on location delete");
        return false;
      },
      success: function (data, status, xhr) {
        console.log("Delete success");
        return true;
      },
      complete: function (jqXHR, textStatus) {},
    });
  }
}

class Pos {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
  get pos() {
    return {
      lat: this.lat,
      lng: this.lng,
    };
  }
}
