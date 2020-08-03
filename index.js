const arg = process.argv[2];
const axios = require('axios');
const {to}=require('await-to-js'); 
let moment=require('moment');

             
 async function contestsList() {
    let [err, res] = await to(axios.get('https://clist.by/get/events/'));
    if (err) {
        console.log("Error Occured", err);
    }  
    
    let currTime = new Date();
    currTime = currTime.getTime();
    switch (arg) {
        case "past":
            console.log(`########---> PAST EVENTS <---########`);
            res.data.forEach(ele => {
                //let starting = new Date(ele.start);
                let ending = new Date(ele.end);
                if (moment(ending).isBefore(currTime)) {
                    console.log(ele);
                }

            });
            break;
        case "running":
            console.log(`########---> RUNNING EVENTS <---########`);
            res.data.forEach(ele => {
                let starting = new Date(ele.start);
                let ending = new Date(ele.end);
                if (moment(starting).isBefore(currTime) && moment(ending).isAfter(currTime)) {
                    console.log(ele);
                }

            });
            break;
        case "upcoming":
            console.log(`########---> UPCOMING EVENTS <---########`);
            res.data.forEach(ele => {
                let starting = new Date(ele.start);
                //let e = new Date(ele.end);
                if (moment(starting).isAfter(currTime)) {
                    console.log(ele);
                }
            });
            break;
        default:
            console.log(
                'Invalid command, valid commands: "past", "upcoming", "running" '
            );


    }
}
contestsList();
    
    
    
