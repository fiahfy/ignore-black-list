'use strict';

/* Services */

var services = angular.module('services', []);

services.service('CounterService', function() {
  var me = this;
  this.increment = function(callback){
    me.get(function(count){
      me.set(++count, function(){
        callback(count);
      });
    });
  };
  this.get = function(callback){
    chrome.storage.local.get('count', function(items){
      callback(items['count'] || 0);
    });
  };
  this.set = function(count, callback){
    chrome.storage.local.set({'count': count}, function() {
      callback();
    });
  }
});
