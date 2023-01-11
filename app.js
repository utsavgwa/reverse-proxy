const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.get(":endpoint([\\/\\w\\.-]*)", (req, res) => {
  let endpoint = process.env.API_BASE_URL + req.params.endpoint;

  // passing api parameters
  let params = {};

  // if there is an api key
  if (!!process.env.API_KEY_PARAM_NAME && !!process.env.API_KEY) {
    params[process.env.API_KEY_PARAM_NAME] = process.env.API_KEY;
  }

  for (const [field, value] of Object.entries(req.query)) {
    params[field] = value;
  }
  // working via axios http library
  axios
    .get(endpoint, {
      params: params,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(3000);
