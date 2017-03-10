app.controller('fjmController', [ '$scope', '$http', function($scope, $http) {

  var names = [
    'Father John Misty',
    'Father Joe Mustard',
    'Padre Jim Montegue',
    'Fallen Jack Mahone',
    'Flimsy Jill Manspread',
    'Filthy Jeb Fishy'
  ];

  function _getLyrics() {
    $http.get('/lyric').then(function(result) {
      $scope.lyrics = _format(result.data.lyric);
    });
    $scope.johnsname = names[_getRandomInt(0, names.length)];
  }


  function _format(lyrics) {
    return lyrics.replace(/\n/g, '<br />');
  }
  _getLyrics();

  function _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // Exposed functions
  $scope.getLyrics = _getLyrics;
}]);
