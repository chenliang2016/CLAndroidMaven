/**
 * Created by chenliang on 2016/11/1.
 */
var App = {};
App.showToast = function (msg) {
    THClientToast.showToast(msg)
}

App.push = function (url) {
    var jsonparams = {
        className:"com.cl.clandroidmvp.CommonWebViewActivity",
        params:{
            url:url
        }
    };
    var paramsString = JSON.stringify(jsonparams);
    THNavigator.push('com.cl.clandroidmvp.CommonWebViewActivity',paramsString);
}

App.pop = function () {
    THNavigator.pop();
}

App.showLoading = function (loadingtext) {
    THAlert.showLoading(loadingtext);
}

App.hideLoading = function () {
    THAlert.hideLoading();
}

App.alertMessage = function (message) {
    THAlert.alertMessage(message);
}



var H5App = {
    increase: 0,
    callbackStack: {},

    generatePort: function() {
        return Math.floor(Math.random() * (1 << 50)) + '' + (this.increase++);
    },

    callNative: function(method, data, success, failure) {
        var port = H5App.generatePort();

        H5App.registerCallback(port, success, failure);
        H5App.invokeNative(method, port, data);
    },

    registerCallback: function(port, success, failure) {
        H5App.callbackStack[port] = {
            success: success,
            failure: failure
        };
    },
    invokeNative: function(method, port, data) {
        H5Native.callNative(method,port,data);
    },

    onSuccess: function(port, data) {
        H5App.callbackStack[port].success(data);
        delete H5App.callbackStack[port];
    },

    onFailure: function(port, data) {
        H5App.callbackStack[port].failure(data);
        delete H5App.callbackStack[port];
    }

};