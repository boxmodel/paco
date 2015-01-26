  var myApp = angular.module("myApp", ["firebase", "ngRoute"]);

  myApp.controller('MyController', ['$scope', '$firebase',
    function($scope, $firebase) {
      //CREATE A FIREBASE REFERENCE
      var ref = new Firebase("https://n9hhz66gqk8.firebaseio-demo.com/");

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
      }
    }
  ]);
  
  myApp.config(function($locationProvider, $routeProvider) {
    $routeProvider
    .when('/form', {
      templateUrl: 'views/form.html', 
      controller: ''
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'views/search.html'
    });
});
  
  myApp.controller('modalController', function($scope) {
      var showForm;
    
      $scope.isClicked = function() {
        //debugger;
        
        if (showForm == !false) {
          $scope.showForm = false;
          console.log("cklicked", showForm);
        } else {
          $scope.showForm = true;
        }
          console.log("cklicked", showForm);
      
      }
    
      
  });
  
/*myApp.directive('pacoForm', function() {
  return {
    restrict: 'AE',
    templateUrl: 'views/form.html',
    link: function($scope, element, attrs) {
      console.log($scope);
    }
  };
});*/