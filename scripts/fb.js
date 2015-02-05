  var myApp = angular.module("myApp", ["firebase", "ngRoute", "ngAnimate"]);
  var ref = new Firebase("https://aestheticdrift.firebaseio.com/web/saving-data/fireblog/posts");

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
      }
    
      $scope.findscope = function() {
        var x = this;
        //alert("my form");
        //$scope.user = '';
        console.log(x.item);
      };
      
      $scope.languages = ['english', 'spanish', 'indonesia'];

    }
  ]);
  
  myApp.config(function($locationProvider, $routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: 'views/search.html', 
      controller: ''
    })
    .when('/form', {
      templateUrl: 'views/form.html', 
      controller: ''
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


myApp.controller('navController',
  function($scope) {
    
    var isClicked = false;
    
    $scope.pulldown = function() {

      if (isClicked == !false) {
        isClicked = false;
        $scope.isClicked = false;
      } else {
        isClicked = true;
        $scope.isClicked = true;
      }

    };
    
    $scope.languages = ['english', 'spanish', 'INDONESIA'];
    
  });





myApp.controller('myForm', ['$scope', '$firebase',
function($scope, $firebase) {

  $scope.master = {};

  var ref = new Firebase("https://aestheticdrift.firebaseio.com/web/saving-data/fireblog");
// set() with unique id

/*var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});*/



  $scope.submitForm = function(user) {
    //console.log("user", user);
    
    var postsRef = ref.child("posts");
    
    postsRef.push({
      author: user.name,
      title: user.msg,
      language: user.language
    });
    
    $scope.reset();
    // $scope.master = angular.copy(user);
  };
      
  $scope.reset = function(user) {
    //alert("my form");
    $scope.user = '';
  };

//UPDATE OBJCT
// var hopperRef = usersRef.child("gracehop");
// hopperRef.update({
//   "nickname": "eugene"
// });

  // GET MESSAGES AS AN ARRAY
  // $scope.messages = $firebase(ref).$asArray();
      
  // $scope.submitForm = function (data) {
  //         $scope.messages.set({
  //           from: $scope.username,
  //           body: $scope.msg
  //         });
  // };
  
}]);