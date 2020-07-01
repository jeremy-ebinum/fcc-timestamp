// init env variables
require("dotenv").config();

// server.js
// where your node app starts

// init project
const express = require("express");

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");

app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

const isValidDate = (d) => {
  return d instanceof Date && Number.isFinite(d.getTime());
};

app.get("/api/timestamp/:date_string", (req, res) => {
  const { date_string: dateString } = req.params;

  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString, 10);
    return res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  }

  let date;

  if (!dateString) date = new Date();
  else date = new Date(dateString);

  if (isValidDate(date)) {
    return res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  }

  return res.json({ error: "Invalid Date" });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
