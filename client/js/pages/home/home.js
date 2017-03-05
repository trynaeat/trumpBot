app.controller('homeController', [ '$scope', '$http', function($scope, $http) {
  $scope.emailCount = 0;
  var emailKeywords = [
    'email',
    'clinton',
    'clinton\'s',
    'clintons',
    'hillary',
    'podesta',
    'podesta\'s',
    'podesta',
    'dnc',
    'emails'
  ];

  function _getTweet() {
    $http.get('/tweet').then(function(result) {
      $scope.tweet = _htmlifyLinks(result.data.tweet);
      _clintonCount($scope.tweet);
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

  function _clintonCount(tweet) {
    for(var i = 0; i < emailKeywords.length; i++) {
      if(tweet.toLowerCase().indexOf(emailKeywords[i]) > -1) {
        $scope.emailCount++;
        return;
      }
      if(tweet.toLowerCase().indexOf('maga') > -1 || tweet.toLowerCase().indexOf('makeamericagreatagain') > -1) {
        $scope.maga = true;
        window.setTimeout(function() {
          $scope.maga = false;
          $scope.$apply();
        }, 3000);
        return;
      }
    }
  }

  _getTweet();
  var today = new Date();
  var locale = "en-us";
  var month = today.toLocaleString(locale, { month: "long" }).substring(0, 3);
  $scope.day = month + ' ' + today.getDate();


  // Exposed functions
  $scope.getTweet = _getTweet;
}]);
