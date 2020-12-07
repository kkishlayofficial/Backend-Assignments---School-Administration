const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 8080;
var id1 = 8;
const student = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
app.get("/api/student", (req, res) => {
  res.send(student);
});
app.get("/api/student/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < student.length; i++) {
    if (student[i].id == id) {
      res.send(student[i]);
      return;
    }
  }
  res.sendStatus(404);
});
app.post("/api/student", (req, res) => {
  if (req.body.name && !isNaN(req.body.currentClass) && req.body.division) {
    const data = {
      id: id1,
      name: req.body.name,
      currentClass: Number(req.body.currentClass),
      division: req.body.division,
    };
    id1++;
    student.push(data);
    res.send({ id: data.id });
  } else {
    res.sendStatus(400);
  }
});
app.put("/api/student/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < student.length; i++) {
    if (student[i].id == id) {
      if (req.body.name) {
        const newName = req.body.name;
        student[i].name = newName;
        res.end();
        return;
      }
      else if (req.body.currentClass) {
          if(!isNaN(req.body.currentClass)){
        const newClass = req.body.currentClass;
        student[i].currentClass = Number(newClass);
        res.end();
        return;
      }
    }
      else if (req.body.division) {
        const newDivison = req.body.division;
        student[i].division = newDivison;
        res.end();
        return;
      }
      
    }
  }
  res.sendStatus(400);
});
app.delete("/api/student/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < student.length; i++) {
    if (student[i].id == id) {
      student.splice(i,1);
      res.end();
      return;
    }
  }
  res.sendStatus(404);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
