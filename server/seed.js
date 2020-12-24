import "./database/index.js";
import { Quiz, Question } from "./database/index.js";
import fetch from "node-fetch";

// create a few quiz sets
//setTimeout(async () => {
//try {
//const q1 = (await new Quiz({ name: "Set 1" }).save())._id;
//const q2 = (await new Quiz({ name: "Set 2" }).save())._id;
//const q3 = (await new Quiz({ name: "Set 3" }).save())._id;
//const q4 = (await new Quiz({ name: "Set 4" }).save())._id;

//console.log({ q1, q2, q3, q4 });
//} catch (err) {
//console.log(err.message);
//}
//}, 5000);

// from stackOverflow
//function shuffle(array) {
  //var currentIndex = array.length,
    //temporaryValue,
    //randomIndex;

  //// While there remain elements to shuffle...
  //while (0 !== currentIndex) {
    //// Pick a remaining element...
    //randomIndex = Math.floor(Math.random() * currentIndex);
    //currentIndex -= 1;

    //// And swap it with the current element.
    //temporaryValue = array[currentIndex];
    //array[currentIndex] = array[randomIndex];
    //array[randomIndex] = temporaryValue;
  //}

  //return array;
//}

//fetch("https://opentdb.com/api.php?amount=10")
  //.then((data) => data.json())
  //.then(async (d) => {
    //const { results } = d;

    //for (let r of results) {
      //const q = new Question({
        //question: r.question,
        //options: shuffle([...r.incorrect_answers, r.correct_answer]),
        //correct_answer: r.correct_answer,
        //partOf: "5fe4d1804a7e3755eed4432c",
      //});

      //console.log(await q.save());
    //}
  //})
  //.catch(console.log);
