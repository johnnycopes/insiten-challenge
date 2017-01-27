const app = angular.module('InsitenChallenge', ['ngAnimate', 'ui.router']);

// ================
// DIRECTIVES
// ================


// ================
// SERVICES
// ================

app.factory('storage', function () {
  var service = {};

  service.targets = [
    {
      name: 'J.R. Andersson LLC',
      status: 'researching',
      companyInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis enim pharetra, pharetra massa et, dictum nibh. Nullam in lorem at ex rutrum ornare.',
      keyContacts: ['May Richards', 'Dana Velasquez', 'Tanya Solis'],
      financialPerformance: 'Up 25% from last quarter'
    },
    {
      name: 'Rhino & Capricorn',
      status: 'pending approval',
      companyInfo: 'Nunc pharetra orci vel metus auctor, sit amet lacinia orci placerat. Suspendisse ac eros ut nulla ornare rutrum non id ipsum.',
      keyContacts: ['Darryl Mullins', 'Charity Schneider'],
      financialPerformance: 'Up 5% from last quarter'
    },
    {
      name: 'Globex Corporation',
      status: 'declined',
      companyInfo: 'Donec fermentum mauris a felis tincidunt, eu ullamcorper mauris sagittis.',
      keyContacts: ['Hank Scorpio', 'Homer Simpson'],
      financialPerformance: 'Down 8% from last quarter'
    },
    {
      name: 'Skynet',
      status: 'declined',
      companyInfo: 'Mauris at ullamcorper urna, eu efficitur arcu. Aenean ullamcorper massa volutpat tincidunt lacinia. Phasellus non vehicula nunc.',
      keyContacts: ['Kyle Reese', 'Fay Zimmerman', 'Maile Glass', 'Indigo Evans'],
      financialPerformance: 'Down 3% from last quarter'
    },
    {
      name: 'Fern & Station',
      status: 'approved',
      companyInfo: 'Etiam vitae risus varius, fermentum libero eu, dignissim arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut non sodales augue, ac commodo turpis.',
      keyContacts: ['Rhea Allen', 'Rina Brady', 'Tamara Byrd'],
      financialPerformance: 'Up 16% from last quarter'
    },
    {
      name: 'Major Lazer Ventures',
      status: 'researching',
      companyInfo: 'Nam id sapien in elit dapibus gravida. Proin at rutrum ipsum.',
      keyContacts: ['Desiree Osborne', 'Orla Graham'],
      financialPerformance: 'Up 9% from last quarter'
    },
    {
      name: 'Quavo Productions',
      status: 'pending approval',
      companyInfo: 'Phasellus ac convallis orci, ac dapibus mauris. Mauris lectus ex, gravida vel quam id, pretium vestibulum metus. Integer quis mi massa.',
      keyContacts: ['McKenzie Case', 'Evangeline Holmes', 'Delilah Brady', 'Fay Hester'],
      financialPerformance: 'No increase/decrease from last quarter'
    },
    {
      name: 'Scarlet Wrench',
      status: 'approved',
      companyInfo: 'Proin at rutrum ipsum. Phasellus ac convallis orci, ac dapibus mauris. Mauris lectus ex, gravida vel quam id, pretium vestibulum metus.',
      keyContacts: ['Macey Bowers', 'Mercedes Pennington'],
      financialPerformance: 'Down 5% from last quarter'
    }
  ];

  return service;
});


// ================
// CONTROLLERS
// ================

app.controller('HomeController', function($rootScope, $scope, $stateParams, $state, storage) {
  $scope.targets = storage.targets;
  $scope.expand = function(target) {

  }
});


// ================
// STATES
// ================

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state({
      name: 'home',
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    })
    ;

    $urlRouterProvider.otherwise('/');
});
