var request = requrie("request");
testHttpCall();

 function testHttpCall(){

					var Totaldata = {
					_id:"test@gail.com"
				};
					console.log("data",Totaldata);
					$scope.whiznextLoader=true;
    var URL = "https://whiznextapi.mybluemix.net/crm/v1/storeContact";
   	var config = {
						headers: {
							'Content-Type': 'application/json; charset=utf-8',
							"client-Id": $scope.clientId,
							"secret-Id": $scope.secretId   
						}

					};
					//console.log( "API : " + URL);
					console.log("Data passed to the API call: " + Totaldata);

					request(URL, Totaldata, config)
						.success(function (data, status, headers, config) {
							console.log(data + ": " + status);
						$scope.whiznextLoader=false;


						})
						.error(function (data, status, header, config) {

							var ResponseDetails = "Data: " + data +
								"<hr />status: " + status +
								"<hr />headers: " + header +
								"<hr />config: " + config;
							console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
							//$location.path('/error');
							// error massage.
							$scope.errorMassage = "OOPS! Check Your Interent Connection.";


						});
	}