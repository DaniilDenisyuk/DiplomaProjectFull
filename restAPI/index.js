import express from "express";
import cors from "cors";
import { logErrors, errorHandler, authorize } from "./middleware/index.js";
import role from "./common/roles.js";
import {
  //adminController,
  authController,
  // moviesController,
  //profilesController,
  // usersController,
} from "./controllers/index.js";

const port = process.env.PORT || 3005;

const app = express();

//app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use("/api/movies", moviesController);
//app.use("/api/users", usersController);
//app.use("/api/profiles", profilesController);
app.use("/auth", authController);
//app.use("/api/admin", authorize(ROLES.Admin), adminController);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
