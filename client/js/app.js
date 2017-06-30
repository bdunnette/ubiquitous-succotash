function logMilestone(message) {
  console.log(" ================== " + message + " ================== ")
}

var app = angular.module('folks', [
  'ui.router',
  'ui.bootstrap',
  'lbServices'
]);

app.run(RunBlock);

RunBlock.$inject = ['$state', '$rootScope'];

function RunBlock($state, $rootScope) {
  // $state.go('home');
  $rootScope.$on('$stateChangeError', function $stateChangeError(event, toState,
    toParams, fromState, fromParams, error) {
    console.group();
    console.error('$stateChangeError', error);
    console.error(error.stack);
    console.info('event', event);
    console.info('toState', toState);
    console.info('toParams', toParams);
    console.info('fromState', fromState);
    console.info('fromParams', fromParams);
    console.groupEnd();
  });
}

app.config(ConfigBlock);

ConfigBlock.$inject = ['$stateProvider', '$urlRouterProvider'];

function ConfigBlock($stateProvider, $urlRouterProvider) {

  logMilestone("Config");

  var HomeState = {
    name: 'home',
    url: '/',
    templateUrl: 'views/volunteer-list.html',
    controller: 'VolunteerListController'
  };

  var VolunteerState = {
    name: 'volunteerView',
    url: '/volunteer/:volunteerId',
    templateUrl: 'views/volunteer-view.html',
    controller: 'VolunteerViewController'
  };

  $stateProvider.state('home', HomeState);
  $stateProvider.state('volunteerView', VolunteerState);
  $urlRouterProvider.otherwise('/');
}

app.controller('VolunteerListController', function($scope, $state, Volunteer) {
  // Fetch all volunteers' name and ID
  Volunteer.find({
    filter: {
      fields: ['name', 'id']
    }
  }, function(volunteers) {
    $scope.volunteers = volunteers;
  }, function(error) {
    console.error(error);
  });
});

app.controller('VolunteerViewController', function($scope, $state, $stateParams, Volunteer) {
  // Fetch volunteer by ID
  Volunteer.findOne({
    filter: {
      where: {
        id: $stateParams.volunteerId
      },
      include: {'attendances':['workArea']}
      // include: ['attendances']
    }
  }, function(volunteer) {
    console.log(volunteer);
    $scope.volunteer = volunteer;
  }, function(error) {
    console.error(error);
  });
});
