import { errorTypes } from "../common/errorTypes.js";

export const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case errorTypes.Forbidden:
      return res.status(403).json({ message: err.message });
    case errorTypes.NotFound:
      return res.status(404).json({ message: err.message });
    case errorTypes.Validation:
      return res.status(400).json({ message: err.message });
    case errorTypes.Unathorized:
      return res.status(401).json({ message: err.message });
    default:
      return res.status(500).json({ message: "Internal server error" });
  }
};
