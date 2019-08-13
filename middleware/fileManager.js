const fs = require('fs');

module.exports={
     createNewFile: (filename)=>{
         const fd = fs.openSync(filename,'w');
     },
     saveJsonObjectToFile:(obj,filename)=> {
         const jsonString = JSON.stringify(obj);
         fs.writeFile(filename, jsonString, 'utf-8',(err,data)=>{
            if(err) throw err;    
        //   console.log('saved to file ${filename}')       
         });
     }
}