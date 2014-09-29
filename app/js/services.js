'use strict';

/* Services */

var services = angular.module('services', []);

services.service('IgnoreService', function() {
  this.setup = function(){
    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          var url = details.url;
          console.log(url);

          var m = url.match(/\+\-site:/i);
          if (m) {
            return {};
          }

          var match = url.match(/^(.*[?&]q=.*?)(&.*)?$/i);
          if (match) {
            url = match[1] + '+-site:*.dummy.com' + (match[2] ? match[2] : '');
          }
          match = url.match(/^(.*[?&]oq=.*?)(&.*)?$/i);
          if (match) {
            url = match[1] + '+-site:*.dummy.com' + (match[2] ? match[2] : '');
          }
          console.info(url);

          return {
            redirectUrl: url
          };
        },
        {urls: ["*://*/search*"]},
        ["blocking"]
    );
  };
});
