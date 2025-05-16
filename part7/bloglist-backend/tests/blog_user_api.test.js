const { test, after, beforeEach, describe } = require("node:test");

const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("./test_helper");
const User = require("../models/user");

const bcrypt = require("bcrypt");

describe("user creation", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    console.log("Database cleared");
    const usersAtStart = await helper.userInDb();
    console.log("users", usersAtStart);

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({
      username: "root1",
      name: "roshan",
      passwordHash,
    });

    await user.save();
  });

  test("creating a new user", async () => {
    const usersAtStart = await helper.userInDb();

    const newUser = {
      username: "roshan",
      name: "Roshan Chand",
      password: "something",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.userInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
  });

  test("user creation invalid if username length less than 3", async () => {
    const usersAtStart = await helper.userInDb();

    const newUser = {
      username: "ro",
      name: "Roshan Chand",
      password: "something",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.userInDb();

    assert(result.body.error.includes("username is too short"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("user creation invalid if password length is less than 3", async () => {
    const usersAtStart = await helper.userInDb();

    const newUser = {
      username: "roshan",
      name: "rosh",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.userInDb();
    assert(
      result.body.error.includes("password must be at least 3 characters long"),
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  mongoose.connection.close();
});
