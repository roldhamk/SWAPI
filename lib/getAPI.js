const fetch = require("node-fetch");

const adoptSearch = async (search) => {
  const url = `https://search-docindexstack-yylg3stvo7i3wq5r76ykz4r6gm.us-east-1.es.amazonaws.com/documents/_search?q=${search}`;
  let data = await fetch(url);
  return (jsonData = await data.json());
};

module.exports = {
  adoptSearch,
};
