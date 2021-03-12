let content = process.argv.slice(2);
let fs = require("fs");

let flags = [];
let files = [];

for(let i=0 ; i<content.length ; i++){
    // "-s"
    if( content[i].startsWith('-') ){
        flags.push(content[i])
    }
    else{
        files.push(content[i]);
    }
}

let fileKaData = "";
for(let i=0 ; i<files.length ; i++){
    // f1.txt => f2.txt
    fileKaData += fs.readFileSync( files[i] ) + "";
}

console.log(fileKaData);