const express = require('express')
const app = express()
const exec = require('child_process').exec
const port = 3000;

runSingleCommandWithoutWait();
function runSingleCommandWithoutWait() {
     app.get('/', (req, res) =>{
          exec("pm2 list", (err, stdout, stderr) =>{
			  if(err){
			  res.send(err);
			  }
			  else if (stderr){
			  res.send(stderr);
			  }
			  else{
			   res.send(stdout);
			  }
			}) ;
			 });
}

app.listen(port, () => console.log(`http://localhost:${port}`));
