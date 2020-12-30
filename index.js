const jsonfile = require("jsonfile");
const moment = require("moment")
const simpleGit = require("simple-git")();

const FILE_PATH = "./data.json";
const points = require('./points.json');

// restrictions : 1 <= x <= 52 && 1 <= y <= 7
const makeCommit = (points , n) => {
    // setting up at end of the graph of github

    if(n >= points.length - 1){
        simpleGit.push();
        return;
    }

    let x = points[n]['x'];
    if(x > 51 || x < 0){
        makeCommit.bind(this , points , ++n);
    }
    let y = points[n]['y'];
    if(y > 7 || y < 0){
        makeCommit.bind(this , points , ++n);
    }

    let DATE = moment().day(0).subtract(10,'y').day(7);
    // setting up date to postion at (x , y);
    DATE = DATE.add(x , 'w').add(y-1 , 'd').format();
    
    const DATA = {
        date : DATE
    };

    jsonfile.writeFile(FILE_PATH , DATA , () => {
        // console.log(DATE);
        simpleGit.add([FILE_PATH]).commit(DATE , {'--date' : DATE} , makeCommit.bind(this , points , ++n));
    });
}

makeCommit(points , 0)







