/** this file might need to be import JQuery file. otherwise it works not fine. */
class Location {
  //pos returns {lat:Number,lng:Number}, position returns {latitude:Number, longitude:Number}
  static async checkIsValueExist(id) {
    //To be merged on getPosViaServer()
    let isValueExist;
    await $.ajax({
      url: window.location.origin + "/node/my-location-select",
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
        callback(coords);
      })
      .catch(function (err) {
        console.log("Could not get Position via client");
      });
    return {
      lat: lat,
      lng: lng,
    };
  }

  static async serverPosUpdate(pos, id, successCallback) {
    $.ajax({
      url: window.location.origin + "/node/my-location-update",
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
      url: window.location.origin + "/node/get-location",
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
    this.lat = 0;
    this.lng = 0;
    this.id = id;
    callback();
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
    this.interval = setInterval(function () {
      Location.getPosViaClient().then(function (pos) {
        Location.serverPosUpdate(pos, this.id);
        callback(pos);
      });
    }, timed);
  }

  killInterval() {
    try {
      clearInterval(this.interval);
    } catch (e) {
      console.log(e);
    }
  }
  delete() {
    $.ajax({
      url: window.location.origin + "/node/my-location-delete",
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
