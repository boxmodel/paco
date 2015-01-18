var myApp = angular.module("myApp", ["firebase"]);

myApp.controller('MyController', ['$scope', '$firebase',
  function($scope, $firebase) {
    var ref = new Firebase("https://n9hhz66gqk8.firebaseio-demo.com/");
    $scope.messages = $firebase(ref).$asArray();
    //Code here
  }
]);