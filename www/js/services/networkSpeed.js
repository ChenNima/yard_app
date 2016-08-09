/**
 * Created by yichen on 8/9/16.
 */
angular.module('NetworkSpeed', [])
  .factory('NetworkSpeed', [
    function () {

      function isConnected() {
        var xhr = new XMLHttpRequest();
        var file = "https://www.baidu.com/img/baidu_jgylogo3.gif";
        var r = Math.round(Math.random() * 10000);
        xhr.open('HEAD', file + "?subins=" + r, false);
        try {
          xhr.send();
          if (xhr.status >= 200 && xhr.status < 304) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }

      function showResults(startTime, endTime, imageAddr, downloadSize, callback) {
        if (isConnected) {
          var duration = (endTime - startTime) / 1000; //Math.round()
          var bitsLoaded = downloadSize * 8;
          var speedBps = (bitsLoaded / duration).toFixed(2);
          var speedKbps = (speedBps / 1024).toFixed(2);
          var finalSpeed = (speedKbps / 8);
          callback(finalSpeed);
        }
      }

      return {
        getSpeed: function (callback) {
          var downloadSize = 97615;
          var imageAddr = "http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1408/07/c0/37179063_1407421362265_800x600.jpg" + "?n=" + Math.random();
          var startTime, endTime = 0;
          var download = new Image();

          download.onload = function () {
            endTime = (new Date()).getTime();
            showResults(startTime, endTime, imageAddr, downloadSize, callback);
          };

          startTime = (new Date()).getTime();
          download.src = imageAddr;
        }
    }
    }
  ])
;
