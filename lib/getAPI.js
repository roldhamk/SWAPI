const fetch = require("node-fetch");

const swapi = async title => {
  const url = `https://swapi.co/api/films?search=${title}`;
  let data = await fetch(url);
  return (jsonData = await data.json());
};

module.exports = {
  swapi
};
