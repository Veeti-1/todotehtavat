import { expect } from "chai";
import {initializeTestDb, getToken , insertTestUser} from "./db_helper/test.js";


describe("Testing basic database functionality", () => {

let token = null
const testUser = { email: "foo@foo.com", password: "password123" }
before(() => {
initializeTestDb()
token = getToken(testUser)
})

  it("get all tasks", async () => {
        const response = await fetch("http://localhost:3001/");
        const data = await response.json();
        expect(response.status).to.equal(200);
        expect(data).to.be.an("array").that.is.not.empty;
        expect(data[0]).to.have.all.keys(["id", "description"]);
    });
   it("should create a new task", async () => {
    const newTask = { description: "Test task" }
    const response = await fetch("http://localhost:3001/create", {
        method: "POST",
        headers: {"Content-Type": "application/json",
        Authorization: token
        },
      body: JSON.stringify({ task: newTask })
    })
    const data = await response.json();
    expect(response.status).to.equal(201);
       expect(data).to.include.all.keys(["id", "description"]);
    expect(data.description).to.equal(newTask.description);
    });
    it("should delete task", async () => {
        const response = await fetch("http://localhost:3001/delete/3", {
            method: "DELETE",
            headers: {"Content-Type": "application/json",
              Authorization: token
            },
        })
        const data = await response.json();
        expect(response.status).to.equal(200);
        expect(data).to.include.all.keys(["id"]);

    });
    it("should not create a task with empty description", async () => {
        const response = await fetch("http://localhost:3001/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ task: null })
        })
        const data = await response.json();
        expect(response.status).to.equal(401);
        expect(data).to.include.keys("error");
    });



    describe("testing user management", () => {
    const user = { email: "test@test.com", password: "pepspsps" }
before(() => {
insertTestUser(user)
})

      it("should sign up a new user", async () => {
        const newUser = { email: "test2@test.com", password: "pepspsps" };
        const response = await fetch("http://localhost:3001/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: newUser }),
        })
        const data = await response.json();
        expect(response.status).to.equal(201);
        expect(data).to.include.all.keys(["id", "email"]);
        expect(data.email).to.equal(newUser.email);
      });
      it('should log in)', async () => {
        const response = await fetch("http://localhost:3001/user/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user }),
        })
        const data = await response.json();
        expect(response.status).to.equal(200);
        expect(data).to.include.all.keys(["id", "email"]);
        expect(data.email).to.equal(user.email);
      })
    })
  })
