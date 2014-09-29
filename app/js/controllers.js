'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('PopupMainCtrl', ['$scope', 'CounterService', function($scope, CounterService){
  $scope.message = 'This is my popup!';

  CounterService.increment(function(count){
    $scope.count = count;
    $scope.$apply();
  });
}]);
