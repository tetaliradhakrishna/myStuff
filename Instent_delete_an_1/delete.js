function RecordCtrl ($scope) {
        // Historical data
        $scope.history = [];
        console.log(history);
        // Default data (can be loaded from a database)
		$scope.records = [
			{ shipper: 'CA', blNumber: 22, blDate: 2017-10-5,blQuty:2,noOfPackages:5,billOfEntryNO:12023,billOfEntryDate:12-10-2017, include: false },
			{ shipper: 'bA', blNumber: 21, blDate: 2017-1-5,blQuty:6,noOfPackages:8,billOfEntryNO:1033,billOfEntryDate:1-10-2017, include: false },
            { shipper: 'DA', blNumber: 21, blDate: 2017-1-5,blQuty:6,noOfPackages:8,billOfEntryNO:1043,billOfEntryDate:1-10-2017, include: false },
            { shipper: 'CA', blNumber: 22, blDate: 2017-10-5,blQuty:2,noOfPackages:5,billOfEntryNO:12023,billOfEntryDate:12-10-2017, include: false },
			{ shipper: 'bA', blNumber: 21, blDate: 2017-1-5,blQuty:6,noOfPackages:8,billOfEntryNO:1033,billOfEntryDate:1-10-2017, include: false },
            { shipper: 'DA', blNumber: 21, blDate: 2017-1-5,blQuty:6,noOfPackages:8,billOfEntryNO:1043,billOfEntryDate:1-10-2017, include: false },
            { shipper: 'CA', blNumber: 22, blDate: 2017-10-5,blQuty:2,noOfPackages:5,billOfEntryNO:12023,billOfEntryDate:12-10-2017, include: false },
			{ shipper: 'bA', blNumber: 21, blDate: 2017-1-5,blQuty:6,noOfPackages:8,billOfEntryNO:1033,billOfEntryDate:1-10-2017, include: false },
            { shipper: 'DA', blNumber: 21, blDate: 2017-1-5,blQuty:6,noOfPackages:8,billOfEntryNO:1043,billOfEntryDate:1-10-2017, include: false },

		];
        // Delete data
        $scope.Delete = function (index) {
            //
                $scope.history.length;
              //console .log(length);
                $scope.history.shift();
                $scope.history.push($scope.records[index]);
             // Remove from main records (using index)
                $scope.records.splice(index, 1);
                  console .log(index);
        };   
	}