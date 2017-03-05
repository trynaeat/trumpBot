app.controller('homeController', [ '$scope', '$http', function($scope, $http) {
  function _getTweet() {
    $http.get('/tweet').then(function(result) {
      $scope.tweet = _htmlifyLinks(result.data.tweet);
    });
  }

  function _htmlifyLinks(tweet) {
    var tokens = tweet.split(' ');
    for(var i = 0; i < tokens.length; i++) {
      if(tokens[i].startsWith('https://')) {
        tokens[i] = '<a href="' + tokens[i] + '">' + tokens[i] + '</a>';
      }
      if(tokens[i].startsWith('@')) {
        tokens[i] = '<a>' + tokens[i] + '</a>';
      }
    }
    return tokens.join(' ');
  }
  _getTweet();
  var today = new Date();
  var locale = "en-us";
  var month = today.toLocaleString(locale, { month: "long" }).substring(0, 3);
  $scope.day = month + ' ' + today.getDate();


  // Exposed functions
  $scope.getTweet = _getTweet;
}]);
