const app = require("./app");
const request = require("supertest");

describe("GET /students/:id", () => {
  it("should return 404 if student ID does not exist", async () => {
    const response = await request(app).get("/students/999"); // Assuming student with ID 999 doesn't exist
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Student not found" });
  });

  it("should return the correct student if student ID exists", async () => {
    const response = await request(app).get("/students/1"); // Assuming student with ID 1 exists
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      first_name: "Carmina",
      last_name: "De Lacey",
    });
  });
});

describe("POST /students", () => {
  it("should return 400 if first name is missing", async () => {
    const response = await request(app)
      .post("/students")
      .send({ last_name: "Smith" }); // Missing first_name
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ errors: ["First name is required"] });
  });

  it("should return 400 if last name is missing", async () => {
    const response = await request(app)
      .post("/students")
      .send({ first_name: "Adam" }); // Missing last_name
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ errors: ["Last name is required"] });
  });

  it("should add new student to json data if request is valid", async () => {
    const postResponse = await request(app)
      .post("/students")
      .send({ first_name: "Adam", last_name: "Smith" }); // Missing last_name
    expect(postResponse.status).toBe(200);
    expect(postResponse.body).toEqual({
      id: 11,
      first_name: "Adam",
      last_name: "Smith",
    });

    const getResponse = await request(app).get("/students/11");
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual({
      id: 11,
      first_name: "Adam",
      last_name: "Smith",
    });
  });
});

describe("DELETE /students/:id", () => {
  it("should return 404 if student ID does not exist", async () => {
    const response = await request(app).delete("/students/999"); // Assuming student with ID 999 doesn't exist
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Student not found" });
  });

  it("should delete the correct student if student ID exists", async () => {
    const deleteResponse = await request(app).delete("/students/1"); // Assuming student with ID 1 exists
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({
      id: 1,
      first_name: "Carmina",
      last_name: "De Lacey",
    });

    const getResponse = await request(app).get("/students/1");
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toEqual({
      message: "Student not found",
    });
  });
});
