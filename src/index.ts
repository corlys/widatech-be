import type { Request, Response } from "express";
import express from "express";

// Boot express
const app = express();
const port = process.env.PORT;

app.use(express.json());

// Application routing
app.use("/", (req: Request, res: Response) => {
  res.status(200).send({ data: "Hello from Ornio AS" });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
