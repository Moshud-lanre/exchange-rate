const express = require("express");
const https = require("https"); // using node module request for data from api
const bodyParser = require("body-parser");
const _ = require("lodash");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html");
    
});

app.post("/", (req, res) => {
    const inputs = req.body.base;
    var query1; var query2; var query3;

    if(inputs.length > 4){
        query2 = _.upperCase(inputs.slice(4,8));
        query1 = _.upperCase(inputs.slice(0,3));

    } 
    if (inputs.length > 10 ){
        query3 = _.upperCase(inputs.slice(10,14));
    } 
    if(inputs.length === 3){
        query1 = _.upperCase(inputs);
    }
    console.log(inputs.length);
    console.log(query1, query2, query3);
    

    const url = "https://api.exchangeratesapi.io/latest?base=" + query1;
    const url1 = "https://api.exchangeratesapi.io/latest?base=" + query2;
    const url2 = "https://api.exchangeratesapi.io/latest?base=" + query3;

    https.get(url, (response) => {
        console.log(response.statusCode);
        const parts = [];   
        response.on("data", (part) => {
            parts.push(part);
            });

            response.on("end", ()=>{
                const data = Buffer.concat(parts);
                var result = JSON.parse(data);

                res.send(result);
            })
        }).on("error", (e)=>{
            console.log(e);
        });

        https.get(url1, (response) => {
            console.log(response.statusCode);
            const parts1 = [];   
            response.on("data", (part) => {
                parts1.push(part);
                });
    
                response.on("end", ()=>{
                    const data1 = Buffer.concat(parts1);
                    var result1 = JSON.parse(data1);
    
                    res.send(result1);
                })
            }).on("error", (e)=>{
                console.log(e);
            });
        
            https.get(url2, (response) => {
                console.log(response.statusCode);
                const parts2 = [];   
                response.on("data", (part) => {
                    parts2.push(part);
                    });
        
                    response.on("end", ()=>{
                        const data2 = Buffer.concat(parts2);
                        var result2 = JSON.parse(data2);
        
                        res.send(result2);
                    })
                }).on("error", (e)=>{
                    console.log(e);
                });
})



   

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log( "server has started successfully.");
});