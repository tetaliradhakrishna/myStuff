
mainapp.controller( 'HomePageController', ['$scope',
                                           '$global',
                                           '$location',
                                           '$http',
                                           '$filter',
                                           function($scope,
                                                    $global,
                                                    $location,
                                                    $http,
                                                    $filter){


     // insilizing the value
     $scope.showLang = "Telugu";
    
     getLang( $scope.showLang)
     $scope.displayValue = $scope.langValue.Telugu.vale;
     $scope.lang = function(){

         $scope.showLang = ($scope.showLang  == "Telugu") ? "English":"Telugu" ;
         $scope.displayValue = ($scope.displayValue == $scope.langValue.Telugu.vale) ? $scope.langValue.English.vale:$scope.langValue.Telugu.vale;

      };

      function getLang(){


$scope.langValue = {
  "Telugu":{
      "vale":"ఒకటి"
   },
  "English":{

      "vale":"one"
  }
};

      }

}]);
