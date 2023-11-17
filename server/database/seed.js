require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Controller = require("../modules/users/controller");

mongoose.connect(process.env.DB_URL);

var setup = {
  initialize: async () => {
    try {
      await mongoose.connection.dropDatabase();
      console.log("DB reset");

      console.log("Creating Admin user");
      const saltRounds = parseInt(process.env.SALT_ROUND);
      if (isNaN(saltRounds)) {
        throw new Error("Invalid SALT_ROUND value");
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync("12345", salt);

      const payload = {
        name: "Asim Admin",
        email: "asimneupane11@gmail.com",
        password: hashedPassword,
        isEmailVerified: true,
        isActive: true,
        roles: ["admin"],
      };
      await Controller.create(payload);

      console.log("Creating Normal user");
      const userPayload = {
        name: "Asim User",
        email: "asim11@gmail.com",
        password: bcrypt.hashSync("12345", saltRounds),
        isEmailVerified: true,
        isActive: true,
      };
      await Controller.create(userPayload);

      // Repeat the process for other users...

      console.log("---------DONE----------");
    } catch (error) {
      console.error("Error during setup:", error);
    } finally {
      mongoose.disconnect(); // Close the database connection when done
    }
  },
};

setup.initialize();
