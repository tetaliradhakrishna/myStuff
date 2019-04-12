// covert the Date to integer 


var convertDateToInteger = function(data){
		if(data == undefined || data ==  null || data ==""){
			return Number();

		}else{
		var dateToConvert = new Date(data);
		// month should return with a leading zero incase of single digit number
		var month = (dateToConvert.getMonth() + 1) <= 9 ? '0' + (dateToConvert.getMonth() + 1) : (dateToConvert.getMonth() + 1);
		var day = dateToConvert.getDate() <= 9 ? '0' + dateToConvert.getDate() : dateToConvert.getDate();
		var formattedDate = dateToConvert.getFullYear().toString() + month + day;
		return Number(formattedDate); //This will convert the date string into number, in order to store in database
		}
	};
// current months  
let dateToInteger = convertDateToInteger(new Date()).toString().substr(4,8);
// current Year date month 
let currentYear = convertDateToInteger(new Date(new Date().setFullYear(new Date().getFullYear())));
//this addtion of one year to the current year  
let addOneYear = convertDateToInteger(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));

console.log('business Year ',currentYear.toString().substr(0,4) + '-' + addOneYear.toString().substr(0,4));

console.log('status',validation());
function validation(){

			if(dateToInteger == "0402" ){
				return 'Matched';
			}
			else{
			   return "Wait till macth the  Record";
			}
    }


	