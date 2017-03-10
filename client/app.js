var app = angular.module('trumpBot', [ 'ngRoute', 'ngSanitize' ]);
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider
  .when('/', {
    templateUrl: '/client/js/pages/home/home.html',
    controller: 'homeController'
  })
  .when('/fatherJoeMustard', {
    templateUrl: '/client/js/pages/fjm/fjm.html',
    controller: 'fjmController'
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.controller('rootController', [ function() {

}]);
