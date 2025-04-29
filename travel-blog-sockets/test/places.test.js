const expect = require("chai").expect;
const request = require("request");

describe("Travel Blog API", function () {
  const baseUrl = "http://localhost:3000";

  it("should return status 200 for GET /api/places", function (done) {
    request.get(`${baseUrl}/api/places`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should return JSON with data array", function (done) {
    request.get(`${baseUrl}/api/places`, function (error, response, body) {
      const resBody = JSON.parse(body);
      expect(resBody).to.have.property("data").that.is.an("array");
      done();
    });
  });

  it("should return error for wrong endpoint", function (done) {
    request.get(`${baseUrl}/api/placez`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should have at least one place in the data array", function (done) {
    request.get(`${baseUrl}/api/places`, function (error, response, body) {
      const resBody = JSON.parse(body);
      expect(resBody).to.have.property("data").that.is.an("array");
      expect(resBody.data.length).to.be.greaterThan(0);
      done();
    });
  });

  it("each place should have location, description, and image properties", function (done) {
    request.get(`${baseUrl}/api/places`, function (error, response, body) {
      const resBody = JSON.parse(body);
      const firstPlace = resBody.data[0];
      expect(firstPlace).to.have.property("location");
      expect(firstPlace).to.have.property("description");
      expect(firstPlace).to.have.property("image");
      done();
    });
  });
  

  it("should return Content-Type as application/json", function (done) {
    request.get(`${baseUrl}/api/places`, function (error, response, body) {
      expect(response.headers["content-type"]).to.include("application/json");
      done();
    });
  });

});
