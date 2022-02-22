/** this file might need to be import JQuery file. otherwise it works not fine. */
class Location {
  //pos returns {lat:Number,lng:Number}, position returns {latitude:Number, longitude:Number}
  static async checkIsValueExist(id) {
    //To be merged on getPosViaServer()
    let isValueExist;
    await $.ajax({
      url: "../node/my-location-select",
      type: "GET",
      data: {
        id: args["id"],
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
      success: function (data, status, xhr) {
        if ($.isEmptyObject(data)) {
          isValueExist = false; //TBD
        } else {
          isValueExist = true;
        }
      },
    });
    return isValueExist;
  }

  static getCurPosPromise = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  static async getPositionViaClient(callback) {
    let lat, lng;
    await this.getCurPosPromise
      .then(function (position) {
        let coords = position.coords;
        lat = coords.latitude;
        lng = coords.longitude;
        if (callback != undefined) {
          callback(coords);
        }
      })
      .catch(function (err) {
        console.log(e);
        console.log("Could not get Position via client");
      });
    return {
      lat: lat,
      lng: lng,
    };
  }

  static async serverPosUpdate(pos, id, successCallback) {
    $.ajax({
      url: "../node/my-location-update",
      type: "POST",
      data: {
        id: id,
        latitude: pos.lat,
        longitude: pos.lng,
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("failed on location update");
      },
      success: function (data, status, xhr) {
        successCallback(data);
      },
    });
  }

  static async getPosViaServer(id, callback) {
    let location = {};
    await $.ajax({
      type: "GET",
      url: "../node/get-location",
      data: {
        id: id,
      },
      dataType: "JSON",
      success: function (response) {
        location = {
          lat: response.latitude,
          lng: response.longitude,
        };
        callback(location);
      },
    });
    return location;
  }
  constructor(id, callback) {
    //Anam station
    let lat = 37.586232954034564;
    let lng = 127.02928291766814;
    this.lat = lat;
    this.lng = lng;
    this.id = id;
    callback(this);
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
    this.intervalID = setInterval(async function () {
      let pos = await Location.getPositionViaClient();
      Location.serverPosUpdate(pos, loc.id);
      try {
        if (callback != undefined) {
          callback(pos);
        }
      } catch (e) {
        console.log(e.stack);
      }
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
      url: "../node/my-location-delete",
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
