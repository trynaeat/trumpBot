var app = angular.module('trumpBot', [ 'ngRoute', 'ngSanitize' ]);
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider
  .when('/home', {
    templateUrl: '/client/js/pages/home/home.html',
    controller: 'homeController'
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.controller('rootController', [ function() {

}]);
