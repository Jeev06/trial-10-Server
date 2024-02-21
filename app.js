import cors from "cors";
import express, { Request, Response } from "express";
import db from "./Models";

import AuthenticationRoute from "./Routes/AuthenticationRoute";

const app = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err: Error) => {
    console.error("Failed to sync database:", err.message);
  });

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the application." });
  });

  AuthenticationRoute(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
