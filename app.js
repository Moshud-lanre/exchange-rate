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

    console.log(req.body.base);

    const query = _.upperCase(req.body.base);
    const url = "https://api.exchangeratesapi.io/latest?base=" + query;

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
})



   

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log( "server has started successfully.");
});