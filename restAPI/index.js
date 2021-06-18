import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./init/index.js";
import { logErrors, errorHandler } from "./middleware/index.js";
import path from "path";
import {
  authController,
  usersDataController,
  ordersController,
  menuController,
} from "./controllers/index.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 5000;

const app = express();

app.use("/public", express.static(path.resolve(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client-app/build")));
}

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authController);
app.use("/api/user-data", usersDataController);
app.use("/api/orders", ordersController);
app.use("/api/menu", menuController);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client-app/build", "index.html"));
  });
}

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
