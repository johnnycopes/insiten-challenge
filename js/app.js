const app = angular.module('InsitenChallenge', ['ngAnimate', 'ui.router']);


// ================
// SERVICES
// ================

app.factory('storage', function () {
  var service = {};

  // This factory is used to make the targets' info available between states
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

  $scope.delete = function(target) {
    let index = $scope.targets.indexOf(target);
    $scope.targets.splice(index, 1);
  };

  $scope.edit = function(target) {
    $state.go('edit_target', {targetName: target});
  };
});


app.controller('TargetController', function($rootScope, $scope, $stateParams, $state, storage) {
  $scope.targets = storage.targets;
  $scope.keyContacts = [];

  // This view handles both the 'add new' and 'edit' functionality. This code checks to see if the url contains an existing target name and if so, populates the form fields with the existing information
  if ($stateParams.targetName) {
    $scope.targets = storage.targets;
    for (let i = 0; i < $scope.targets.length; i++) {
      if ($scope.targets[i].name === $stateParams.targetName) {
        $scope.targetIndex = i;
        $scope.target = $scope.targets[i];
      }
    }
    $scope.name = $scope.target.name;
    $scope.status = $scope.target.status;
    $scope.description = $scope.target.companyInfo;
    $scope.keyContacts = $scope.target.keyContacts;
    $scope.performance = $scope.target.financialPerformance;
  }

  // These three functions are for adding or removing key contacts to the target's key contacts array
  $scope.addContact = function(contact) {
    $scope.keyContacts.push(contact);
    $scope.keyContact = "";
  };

  $scope.addContactOnEnter = function(keyEvent) {
    if (keyEvent.which === 13) {
      $scope.addContact($scope.keyContact);
    }
  };

  $scope.deleteContact = function(contact) {
    let index = $scope.keyContacts.indexOf(contact);
    $scope.keyContacts.splice(index, 1);
  };

  $scope.saveChanges = function() {
    // The behavior of the submit button also changes depending on if the user is in the 'add new' or 'edit' page. If it's 'edit', update the target's info in the main targets array. Otherwise, push the target info to the array
    let target = {
      name: $scope.name,
      status: $scope.status,
      companyInfo: $scope.description,
      keyContacts: $scope.keyContacts,
      financialPerformance: $scope.performance
    };
    if ($stateParams.targetName) {
      $scope.targets[$scope.targetIndex] = target;
    }
    else {
      $scope.targets.push(target);
    }
    $scope.name = "";
    $scope.status = "";
    $scope.description = "";
    $scope.keyContacts = [];
    $scope.performance = "";
    $state.go('home');
  };
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
  $stateProvider
    .state({
      name: 'new_target',
      url: '/new_target',
      templateUrl: 'templates/target.html',
      controller: 'TargetController'
    })
  $stateProvider
    .state({
      name: 'edit_target',
      url: '/edit/{targetName}',
      templateUrl: 'templates/target.html',
      controller: 'TargetController'
    })
    ;

  $urlRouterProvider.otherwise('/');
});
