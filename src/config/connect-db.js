import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
      "mongodb://localhost/task-tracker"
    )
    .then(() => {
      console.log("DB connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};
