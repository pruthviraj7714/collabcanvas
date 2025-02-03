import express, { Request, Response } from "express";
import cors from 'cors';
import { config } from "dotenv";
import { userRouter } from "./routes/userRoutes";
config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response): Promise<void> => {
  res.json({
    message: "Healthy server",
  });
  return;
});

app.use('/user', userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
