/* eslint-env jest */

const request = require("supertest")

const express = require('express');
const checkDictionary = require("../public/gamePage");
const checkLength = require("../public/gamePage");
const checkLetter = require("../public/gamePage");

describe("Test functions for validity of word attempt", () => {
  test('Return true if Word exists', () => {
    const attempt = 'brave'
    expect(checkDictionary(attempt)).toBe(true)
  })
  test('Return false if Word does not exist', ()=> {
    const attempt = 'wjabe'
    expect(checkDictionary(attempt)).toBe(false)
  })
  test('Word is not long enough', () => {
    const attempt = 'beep'
    expect(checkLength(attempt)).toBe(false)
  })
  test('Word is correct ', () => {
    const attempt = 'beeps'
    expect(checkLength(attempt)).toBe(true)
  })
})

describe("Tests functions for letter positions in the given word", () => 
{
  const attempt = 'arise'  
  const answer = 'alter'
  test('One letter in the attempt word is in correct position of answer', () =>
  {
    const letter = 'a'
    expect(checkLetter(attempt, answer, letter)).toBe(true);
  });

})
 