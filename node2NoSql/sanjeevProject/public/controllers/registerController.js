
mainapp.controller( 'registerController', ['$scope', 
                                           '$global', 
                                           '$location', 
                                           '$http', 
                                           '$filter', 
                                           function($scope, 
                                                    $global, 
                                                    $location, 
                                                    $http, 
                                                    $filter){




	 $scope.submit=function(){
			//json data//

       	var data={
		        customer:$scope.customer,
		    	number:$scope.number,
		    	PhoneNumber:$scope.PhoneNumber,
		    	Email:$scope.Email,
		    	Address:$scope.Address,
		    	Positive:$scope.Positive,
		    	address:$scope.address,
		    	addres:$scope.addres,
		    	city:$scope.city,
		    	state:$scope.state,
		    	zip:$scope.zip,
		    	mooladhara:$scope.mooladhara,
		        swadhisthana:$scope.swadhisthana,
		        naval:$scope.naval,
		        plexus:$scope.plexus,
		        frontheart:$scope.frontheart,
		        backheart:$scope.backheart,
		        throat:$scope.throat,
		        ajna:$scope.ajna,
		        forehead:$scope.forehead,
		        crown:$scope.crown,
		        sun:$scope.sun,
		        moon:$scope.moon,
		        mars:$scope.mars,
		        mercury:$scope.mercury,
		        jupiter:$scope.jupiter,
		        venus:$scope.venus,
		        saturn:$scope.saturn,
		        rahu:$scope.rahu,
		        ketu:$scope.ketu,
		        photo:$scope.photo,
		        blueprintOfHouse:$scope.blueprintOfHouse,
		        housePlan:$scope.housePlan,
		        impression:$scope.impression 
       };

   //console.log("json",data);
                     
					
					$http.post('/sendData',data)
						.success(function (data, status, headers, config) {
					                console.log(data);
						})
						.error(function (data, status, header, config) {

							var ResponseDetails = "Data: " + data +
								"<hr />status: " + status +
								"<hr />headers: " + header +
								"<hr />config: " + config;
							console.log("error to send." + ResponseDetails);

						});
	
	}


}]);