import { expect } from "chai";

describe("Testing basic database functionality", () => {
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
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ task: newTask })
    })
    const data = await response.json();
    expect(response.status).to.equal(201);
       expect(data).to.include.all.keys(["id", "description"]);
    expect(data.description).to.equal(newTask.description);
    });
    it("should delete task", async () => {
        const response = await fetch("http://localhost:3001/delete/22", {
            method: "DELETE"
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
        expect(response.status).to.equal(400);
        expect(data).to.include.keys("error");
    });
  });
