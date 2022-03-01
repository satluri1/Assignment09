const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;
const PORT = process.env.PORT || 3000;
const app = express();
const AWSAPI =
    "https://dmm3dp3wd7.execute-api.us-east-1.amazonaws.com/prod/myhello";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.send(
        "This is Server page"
    );
});

app.get("/say", (req, res) => {
    let keyword = req.query.keyword;
    axios
        .post(AWSAPI, { keyword })
        .then((response) => {
            return res.status(response.status).json(response.data);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send("Server error");
        });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));