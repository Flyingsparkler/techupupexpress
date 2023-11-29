import * as http from 'http';
import * as parse from 'querystring';
import * as fs from 'fs';
import OpenAI from "openai";
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import promise from 'promise';

const app = express();
const __dirname = path.resolve();
var status = false;
var mealPlans = '';

app.listen(8080, () => {
    console.log("Application started and Listening on port 8080");
});

// server css as static
app.use(express.static(__dirname));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});  

app.post("/", (req, res) => {
    var cuisine = req.body.cuisine
    var diet = req.body.diet
    var noOfDays = req.body.noOfDays; 
    
    getMealPlanFromOpenAI (cuisine, diet, noOfDays).then(data => {
        res.send(mealPlans); 
    })
    .catch(err => {
        res.send('Unable to process request.');
    })
});

    async function getMealPlanFromOpenAI (cuisine, diet, noOfDays) {
    const prompt = "Hello ChatGPT, please suggest a " + noOfDays + " days meals plan with recipes for a " + diet + " with cuisines, " + cuisine + " and formatted in HTML.";
    
    console.log(prompt);
    //const openai = new OpenAI(); 
    const openai = new OpenAI({
        apiKey: process.env["OPENAI_API_KEY"],
    });
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        //instruction: prompt,
        max_tokens: 1000,     
    });
        mealPlans = completion.choices[0].message.content;
  }


