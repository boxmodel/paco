var myApp = angular.module("myApp", ["firebase", "ngRoute", "ngAnimate", "vimeoEmbed"]);
var ref = new Firebase("https://aestheticdrift.firebaseio.com/web/saving-data/fireblog/posts");
var main,
    showMe;

myApp.controller('MyController', ['$scope', '$firebase',
  function($scope, $firebase) {
    //CREATE A FIREBASE REFERENCE

    // GET MESSAGES AS AN ARRAY
    $scope.messages = $firebase(ref).$asArray();

    //ADD MESSAGE METHOD
    $scope.addMessage = function(e) {

      //LISTEN FOR RETURN KEY
      if (e.keyCode === 13 && $scope.msg) {
        //ALLOW CUSTOM OR ANONYMOUS USER NAMES
        var name = $scope.name || 'anonymous';

        //ADD TO FIREBASE
        $scope.messages.$add({
          from: name,
          body: $scope.msg
        });

        //RESET MESSAGE
        $scope.msg = "";
      }
    };
    
    $scope.languages = ['english', 'spanish', 'indonesia'];
    
    $scope.closeResults = function() {
      $(".search-results").hide();
      $scope.findscope();
    };

    $scope.findscope = function() {
      $scope.$parent.main = true;
      $scope.$parent.showMe = true;
    };

    $scope.closeBox = function() {
      $scope.$parent.main = false;
      $scope.$parent.showMe = false;
    };

  }
]);


myApp.config(function($locationProvider, $routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html', 
      controller: ''
    })
    .when('/form', {
      templateUrl: 'views/form.html', 
      controller: ''
    })
    .when('/english/', {
      templateUrl: 'views/english.html', 
      controller: 'englishController'
    })
    .when('/spanish/', {
      templateUrl: 'views/spanish.html', 
      controller: 'spanishController'
    })
    .when('/indonesia/', {
      templateUrl: 'views/indonesia.html', 
      controller: 'indonesiaController'
    })
    .when('/english/:itemTitle', {
      templateUrl: 'views/english.html', 
      controller: 'englishController'
    })
    .when('/spanish/:itemTitle', {
      templateUrl: 'views/spanish.html', 
      controller: 'spanishController'
    })
    .when('/indonesia/:itemTitle', {
      templateUrl: 'views/indonesia.html', 
      controller: 'indonesiaController'
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'views/search.html'
    });
});


myApp.controller('myForm', ['$scope', '$firebase',
function($scope, $firebase) {

  var ref = new Firebase("https://aestheticdrift.firebaseio.com/web/saving-data/fireblog");
  var d = new Date();
  
  $scope.today = Date.parse(d);

  $scope.submitForm = function(user) {
    var postsRef = ref.child("posts");
    postsRef.push({
      author: user.name,
      title: user.title,
      description: user.description,
      language: user.language
    });
    $scope.reset();
  };

  $scope.reset = function(user) {
    $scope.user = '';
  };

}]);

/*repeat UGC form fields*/
myApp.directive('ngFormElements', function() {
  return {
    transclude: true,
    template: '<div class=\"group\">' +
              '   <div class=\"flex-1\"><label>Language:</label></div>' +
              '   <div class=\"flex-1\">' +
              '       <div ng-repeat=\"item in messages\"><input for=\"user.language.\" ng-model=\"user.language\" type=\"checkbox\"/> {{item.language}}  </div>' +
              '   </div>' +
              '</div>',
    replace: true,
    restrict: 'E'
  }
});


//ng-modal isOpen
myApp.directive('ngModal', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="modal-mask flexbox-column" ng-class="{\'show-modal\': openModal}">' +
                '<div class="modal display-flex margin-auto">' +
                  '<div ng-click="closeModal()" class="close cursor">X</div>' +
                  '<div class="margin-auto"><vimeo-video player-id="video1" video-id="103384798" player-width="640" player-height="360"></vimeo-video></div>' +
                '</div>' +
              '</div>'
  }
});

// language controllers
myApp.controller('englishController', function($scope, $routeParams) {
    $scope.titleMessage = "English";
    $scope.item = $routeParams.itemTitle;
});

myApp.controller('indonesiaController', function($scope, $routeParams) {
  $scope.titleMessage = "Indonesia";
  $scope.item = $routeParams.itemTitle;
});

myApp.controller('spanishController', function($scope, $routeParams) {
  $scope.titleMessage = "Spanish";
  $scope.item = $routeParams.itemTitle;
});