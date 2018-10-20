"use strict";

const test = require("tape");
const request = require("supertest");
const app = require("../server/index");

test("Noop Test", function(t) {
  t.end();
});

test("Correct users returned", function(t) {
  request(app)
    .get("/api/users")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function(err, res) {
      var expectedUsers = ["John", "Betty", "Hal"];

      t.error(err, "No error");
      t.same(res.body, expectedUsers, "Users as expected");
      t.end();
    });
});
