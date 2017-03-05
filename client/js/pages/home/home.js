app.controller('homeController', [ '$scope', '$http', function($scope, $http) {
  function _getTweet() {
    $http.get('/tweet').then(function(result) {
      $scope.tweet = result.data.tweet;
    });
  }
  _getTweet();
  var today = new Date();
  var locale = "en-us";
  var month = today.toLocaleString(locale, { month: "long" }).substring(0, 3);
  $scope.day = month + ' ' + today.getDate();


  // Exposed functions
  $scope.getTweet = _getTweet;
}]);
