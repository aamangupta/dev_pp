const cheerio =  require("cheerio");
const request = require("request");
const fs = require("fs");

let highestWickerTaker = {};

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard" , cb);

function cb(error , response , data){
    parseData(data);
}


function parseData(html){
    let highwick = 0;
    let name;
    let eco;

    let ch= cheerio.load(html);
    let bothTables = ch('.Collapsible .table.bowler');
    // {  '0' :{} , '1' :{}  }
    for(let i=0 ; i<bothTables.length ; i++){
        let bowlingTable = bothTables[`${i}`];
        let allTrs = ch(bowlingTable).find("tbody tr");
        for(let j=0 ; j<allTrs.length ; j++){
            let allTds = ch(allTrs[j]).find("td");
            let wicketsTaken = ch(allTds['4']).text();
            if(wicketsTaken > highwick){
                highwick = wicketsTaken;
                name = ch(allTds['0']).text();
                eco = ch(allTds['5']).text();
            }
            // 0=> name  // 4=>wickets  // 5=>eco
        }
    }
    highestWickerTaker.name = name;
    highestWickerTaker.wickets = highwick;
    highestWickerTaker.economy = eco;   
    console.log(highestWickerTaker);
}