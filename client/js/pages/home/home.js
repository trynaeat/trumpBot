app.controller('homeController', [ '$scope', '$http', function($scope, $http) {
  function _getTweet() {
    $http.get('/tweet').then(function(result) {
      $scope.tweet = result.data.tweet;
      console.log($scope.tweet);
    });
  }
  _getTweet();


  // Exposed functions
  $scope.getTweet = _getTweet;
}]);
