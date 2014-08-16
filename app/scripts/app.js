'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Beaconbabe', ['ionic', 'config', 'Beaconbabe.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var logToDom = function (message) {
      var e = document.createElement('label');
      e.innerText = message;
  
      var br = document.createElement('br');
      var br2 = document.createElement('br');
      document.body.appendChild(e);
      document.body.appendChild(br);
      document.body.appendChild(br2);
  
      window.scrollTo(0, window.document.height);
    };
  
    var delegate = new window.cordova.plugins.locationManager.Delegate().implement({
  
      didDetermineStateForRegion: function (pluginResult) {
  
        console.log('[bbb][DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
  
        window.cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                                                          + JSON.stringify(pluginResult));
      },
  
      didStartMonitoringForRegion: function (pluginResult) {
        console.log('didStartMonitoringForRegion:', pluginResult);
  
        console.log('[bbb]didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
      },
  
      didRangeBeaconsInRegion: function (pluginResult) {
        alert('[bbb] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
      },
      
      didEnterRegion: function(pluginResult){
        console.log('bbb] didEnterRegion: ' + JSON.stringify(pluginResult));
        console.log('bbb] didEnterRegion.region.rssi: ' + JSON.stringify(pluginResult.region.rssi));
      }

      , didExitRegion: function(pluginResult){
        console.log('[bbb] didExitRegion' + JSON.stringify(pluginResult));
      }
  
    });
  
    var uuid = '19d5f76a-fd04-5aa3-b16e-e93277163af6'.toUpperCase();
    var identifier = 'GemTot USB';
    var minor = 0;//1000;
    var major = 0;//5;
    var beaconRegion = new window.cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
  
    window.cordova.plugins.locationManager.setDelegate(delegate);
    window.cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
    .fail(console.error)
    .done();

    window.cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
    .fail(console.error)
    .done();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent' :{
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent' :{
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent' :{
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

