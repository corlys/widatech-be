import express from "express";
import cors from "cors";
import "dotenv/config";
import {invoiceRouter, revenueRouter} from "./router"

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/invoice", invoiceRouter);
app.use("/revenue", revenueRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
