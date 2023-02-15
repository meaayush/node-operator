const express = require('express');
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({encoded:true}));

app.get("", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

let arr = [];

app.post("/solve", (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);
    const op = req.body.operator;
    let r = 0;
    let v;
    if(op == "add"){
        r = num1 + num2;
        v = "+";
    }
    else if(op == "sub"){
        r = num1 - num2;
        v = "-";
    }
    else if(op == "mult"){
        r = num1 * num2;
        v = "*";
    }
    else {
        if(num2 == 0){
            res.send("Denominator is zero\n");
        }
        r = num1 / num2;
        v = "/";
    }
    let arr1 = [];
    arr1[0] = num1;
    arr1[1] = num2;
    arr1[2] = v;
    arr1[3] = r;
    let arr2 = [...arr, arr1];
    const ans = num1 + " " + v + " " + num2 + " = " + r + "\n";

    res.set("Content-Type", "text/html");
    res.write(ans);

    res.write("<br><br><h3>History</h3>");
    if(arr.length == 0){
        res.write("History Empty");
    }
    for(var i = 0; i < arr.length; i++){
        const h = arr[i][0] + " " + arr[i][2] + " " + arr[i][1] + " = " + arr[i][3];
        res.write(h);
        res.write("<br>");
    }
    arr = arr2;

    res.send();
    
})


app.listen(3001, () => {
    console.log("Server running");
})