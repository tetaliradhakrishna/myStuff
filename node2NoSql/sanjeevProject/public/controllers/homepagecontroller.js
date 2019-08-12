
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


 testHttpCall();

  
 function testHttpCall(){
                     
   $scope.auraData =[];

					$http.post('/sendBackTOtheUI')
						.success(function (data, status, headers, config) {
						
					     console.log("ResponseData",data);
					     $scope.auraData = data;
					     for(var i=0;i< $scope.auraData.rows.length;i++){
					     	 console.log($scope.auraData.rows[i].key.customer);
					     }
					    
						})
						.error(function (data, status, header, config) {

							var ResponseDetails = "Data: " + data +
								"<hr />status: " + status +
								"<hr />headers: " + header +
								"<hr />config: " + config;
							console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
						
						});

	}


}]);