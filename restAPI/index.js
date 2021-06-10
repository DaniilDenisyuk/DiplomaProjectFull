import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./common/init.js";
import { logErrors, errorHandler } from "./middleware/index.js";
import path from "path";
import {
  //adminController,
  authController,
  usersDataController,
  ordersController,
  menuController,
} from "./controllers/index.js";

const port = process.env.PORT || 3005;

const app = express();

app.use(express.static(path.join("static")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authController);
app.use("/api/user-data", usersDataController);
app.use("/api/orders", ordersController);
app.use("/api/menu", menuController);
//app.use("/api/admin", adminController);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
