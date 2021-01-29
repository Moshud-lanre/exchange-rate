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
    const inputs = _.upperCase(req.body.base);
    const curr = _.upperCase(req.body.currency);
    
    console.log(curr);

    const url = "https://api.exchangeratesapi.io/latest?base=" + inputs + "&" + "currency=" + curr;
    

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

        // https.get(url1, (response) => {
        //     console.log(response.statusCode);
        //     const parts1 = [];   
        //     response.on("data", (part) => {
        //         parts1.push(part);
        //         });
    
        //         response.on("end", ()=>{
        //             const data1 = Buffer.concat(parts1);
        //             var result1 = JSON.parse(data1);
    
        //             res.send(result1);
        //         })
        //     }).on("error", (e)=>{
        //         console.log(e);
        //     });
        
        //     https.get(url2, (response) => {
        //         console.log(response.statusCode);
        //         const parts2 = [];   
        //         response.on("data", (part) => {
        //             parts2.push(part);
        //             });
        
        //             response.on("end", ()=>{
        //                 const data2 = Buffer.concat(parts2);
        //                 var result2 = JSON.parse(data2);
        
        //                 res.send(result2);
        //             })
        //         }).on("error", (e)=>{
        //             console.log(e);
        //         });
})



   

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log( "server has started successfully.");
});