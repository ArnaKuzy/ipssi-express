const request = require("supertest");
const app = require("../app");
const { faker } = require('@faker-js/faker')

describe("Test the user path", () => {
    test("It should response the GET method", done => {
        request(app)
            .get("/user")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).not.toBe('')
                done();
            });
    });

    test("Create user", done => {
        request(app)
            .post("/user")
            .send({
                login: faker.internet.userName(),
                password: faker.internet.password(),
                email: faker.internet.email()
            })
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            });
    });
});