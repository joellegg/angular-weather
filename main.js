angular
  .module('angularWeather', ['ngRoute'])
  .config(($routeProvider) => {
    $routeProvider
    .when('/', {
      controller: 'RootCtrl',
      templateUrl: '/partials/root.html'
    })
    .when('/weather/:zipcode', {
      controller: 'WeatherCtrl',
      templateUrl: '/partials/weather.html'
    })
  })
  .controller('RootCtrl', function($scope, $location) {
    console.log("I'm a turtle/root controller");
    $scope.gotoWeather = () => {
      //change the url
      $scope.gotoWeather = ()=> $location.url(`/weather/${$scope.zip}`);
    }
  })
  .controller('WeatherCtrl', function($scope, weatherFactory, $routeParams) {
    console.log("I'm a cow/weather controller")
    // the .zipcode comes from the routeProvider /:zipcode
    weatherFactory
      .getWeather($routeParams.zipcode)
      .then((weather) => {
        $scope.temperature = weather.temp;
        $scope.city = weather.city;
      })
  })
  .factory('weatherFactory', ($http) => {
    return {
      getWeather (zipcode) {
        return $http
          .get(`http://api.wunderground.com/api/bd2a021594b37732/conditions/q/${zipcode}.json`)
          .then((response) => {
            return {
              temp: response.data.current_observation.temp_f,
              city: response.data.current_observation.display_location.full
            }
          })
      }
    }
  })
