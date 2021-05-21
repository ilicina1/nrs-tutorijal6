let server = require("../server")
let chai = require("chai")
let chaiHttp = require("chai-http")
let mocha = require("mocha")
import { startDataBase } from '../app.js';
import { closeDataBase } from '../app.js';
import { befAndAftEach } from '../app.js'

chai.should()
chai.use(chaiHttp)


describe('Api', () => {

    before(function () {
        startDb()
    });

    after(function () {
        closeDb()
    });

    beforeEach(function () {
        beforeAndAfterEachShowGradove()
    });

    afterEach(function () {
        beforeAndAfterEachShowGradove()
    });

    it("should return status code 200, json,not array and not 0 for GET /gradovi/{id}", (done) => {
        chai.request(server).get("/gradovi/2").end((err, res) => {
            res.should.have.status(200);
            res.should.to.be.json;
            res.body.should.not.be.a('array');
            res.body.length.should.not.be.eql(0);
            done()
        });
    });

    it("should return status code 200, and text that Post succeded for POST /grad", (done) => {
        chai.request(server).post("/grad").end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.equal("Successfull post");
            done()
        });
    });
})