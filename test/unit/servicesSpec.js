'use strict';

/* jasmine specs for services go here */

describe('services', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });

    var dummyStorage = {};
    window.chrome = {
      storage: {
        local: {
          get: function(){},
          set: function(){}
        }
      }
    };
    spyOn(chrome.storage.local, 'get').andCallFake(function(key, callback){
      callback(dummyStorage);
    });
    spyOn(chrome.storage.local, 'set').andCallFake(function(data, callback){
      dummyStorage = data;
      callback();
    });
  });

  beforeEach(module('app'));

  describe('CounterService', function(){
    var service;

    beforeEach(inject(function(CounterService) {
      service = CounterService;
    }));

    it('When increment calls three times, get returns 3', function() {
      service.increment(function(){
        service.increment(function(){
          service.increment(function(){
            service.get(function(count){
              expect(count).toEqual(3);
            });
          });
        });
      });
    });
  });
});
