/* eslint-env jest */


const request = require("supertest")
const app = require("../routes/SinglePlayer")
    
describe("Test gamePage root path", () =>{
    test("SinglePlayer route should work",()=>{
        return request(app)
        .get("/")
        .then(response =>{
            expect(response.statusCode).toBe(200);
        })
    })
})
    
    