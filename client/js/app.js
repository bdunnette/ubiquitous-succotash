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
    template: '<ui-view></ui-view>'
  };

  $stateProvider.state('home', HomeState);
  $urlRouterProvider.otherwise('/');
}
