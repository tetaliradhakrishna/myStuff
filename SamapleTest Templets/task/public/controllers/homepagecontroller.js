
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

        
      


 $scope.search = function(){
  $scope.dataShow = false;
  
  let searchData = {
          type:$scope.selectedType,
          searchName:$scope.movieName,
          y:$scope.selectedYear,
          pageCount:1
  }


  $http.post('/search',searchData).success((res)=>{
               console.log(res);
               $scope.resData = res.body.Search;
              
               if(res.body.Response == 'False' ){
                $scope.message = "Stop The server and  Hite & refresh again. "
                 $scope.dataShow = false;

               }else{
                 $scope.dataShow = true;
               }
              // console.log($scope.resData);
                 $scope.reset();

           }).error((err)=>{
                  console.log(err)
            });
 }






        $scope.reset = function(){
          $scope.selectedType = "";
          $scope.movieName = "";
          $scope.selectedYear="";

                  } ;  


}]);