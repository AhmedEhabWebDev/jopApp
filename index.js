import express from "express";

import userRouter from "./src/modules/User/user.routes.js";
import companyRouter from './src/modules/Company/company.routes.js'
import jobRouter from './src/modules/Job/job.routes.js'
import { connection_db } from "./DB/connection.js";
import { config } from "dotenv";

config()

let port = process.env.PORT

const app = express();


app.use(express.json());

app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);

connection_db();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
