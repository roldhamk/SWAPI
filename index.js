const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const swapi = require("./lib/getAPI");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  let title = req.body.title;
  let data = await swapi.swapi(title);
  let openingcrawl = data.results[0].opening_crawl;

  res.render("index", { data: { title, openingcrawl } });
});

app.use((req, res, next) => {
  if (res.status(404)) {
    res.render("404");
    return;
  }
  next();
});
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
