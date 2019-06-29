var cmd=require('node-cmd');
let new_Folder_Name = "test";
let createPath = "/home/radhakrishna/Desktop/"
let commond  = " mkdir " + createPath +new_Folder_Name;
console.log(">> commond prints >>",commond);
 cmd.get(
    commond,
        function(err, data, stderr){
            if(err){
                console.log(' >> ERROR >>',err)  
            }else{
                console.log(">> folder created ")
            }
            
        }
    );