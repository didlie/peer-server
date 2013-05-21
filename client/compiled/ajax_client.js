// Generated by CoffeeScript 1.6.1
(function() {
  var _this = this;

  window.AJAXClient = (function() {

    function AJAXClient(sendEvent, socketIdFcn) {
      var _this = this;
      this.sendEvent = sendEvent;
      this.socketIdFcn = socketIdFcn;
      this.receiveAjax = function(data) {
        return AJAXClient.prototype.receiveAjax.apply(_this, arguments);
      };
      this.requestAjax = function(path, options, callback) {
        return AJAXClient.prototype.requestAjax.apply(_this, arguments);
      };
      this.outstandingRequests = {};
    }

    AJAXClient.prototype.requestAjax = function(path, options, callback) {
      var data, requestId;
      console.log("sending ajax request for path: " + path + " on socket id " + this.socketIdFcn());
      requestId = Math.random().toString(36).substr(2, 10);
      if (typeof callback !== "undefined") {
        if (typeof callback !== "function") {
          throw "callback must be a function";
        }
        this.outstandingRequests[requestId] = {
          "callback": callback,
          "timestamp": new Date().getTime()
        };
      }
      data = {
        "path": path,
        "socketId": this.socketIdFcn(),
        "requestId": requestId,
        "options": options
      };
      console.log("sending ajax request:");
      console.log(data);
      return this.sendEvent("requestAjax", data);
    };

    AJAXClient.prototype.receiveAjax = function(data) {
      var request;
      console.log("Received ajax response:" + data.requestId);
      console.log(data);
      if (!('requestId' in data)) {
        console.log("received AJAX response with no request ID");
        return;
      }
      if (!('contents' in data)) {
        console.log("received AJAX response with no contents");
        return;
      }
      request = this.outstandingRequests[data.requestId];
      delete this.outstandingRequests[data.requestId];
      if (typeof request === "undefined") {
        console.log("Got ajax response with no callback");
        return;
      }
      return request.callback(data['contents']);
    };

    return AJAXClient;

  })();

}).call(this);
