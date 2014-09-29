'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('BackgroundMainCtrl', ['$scope', 'IgnoreService', function($scope, IgnoreService){
  IgnoreService.setup();
}]);
