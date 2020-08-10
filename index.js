const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const adoptSearch = require("./lib/getAPI");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  let search = req.body.search;
  let data = await adoptSearch.adoptSearch(search);
  let link = data.hits.hits[0]._source.document;
  let result = JSON.stringify(data.hits.hits[0]._source.pages[0].Content);
  res.render("index", { data: { link, result } });
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
