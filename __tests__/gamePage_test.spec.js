/* eslint-env jest */


const res = require("express/lib/response");
const request = require("supertest")
//const router = require("../routes/SinglePlayer")
const express = require('express');

test('should validate score', () => {
    const text = 10
    expect(text).toBe(10)
  })
  /*
describe("Test gamePage root path",() =>{
    test("SinglePlayer route should work",()=>{
        
    expect(router).toMatch('users/gamePage.ejs');
  });
  
});
*/