import axios from "axios";
require("dotenv").config();

port = "9000";
export default axios.create({
    baseURL:  `http://localhost:${port}`,
});