import ShuntingYardParsingService from "../../../../main/org/ivan/slavka/ShuntingYardParsingService";

let sut = new ShuntingYardParsingService();

// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sut.parse(1, 2)).toBe(3);
// });

beforeEach(() => {
  sut = new ShuntingYardParsingService();
});

test('parsing expression with single number returns single output', () => {
  expect(sut.parse(['23'])).toStrictEqual(['23']);
});

test('parsing 2 + 3 returns [2,3,+]', () => {
  expect(sut.parse(['2', '+', '3'])).toStrictEqual(['2', '3', '+']);
});

test('parsing 2 + 3 * 4 returns [2,3,4,*,+]', () => {
  expect(sut.parse(['2', '+', '3', '*', '4'])).toStrictEqual(['2', '3', '4', '*', '+']);
});

test('parsing 3 + 4 × 2 / ( 1 − 5 ) returns [3,4,2,*,1,5,-,/,+]', () => {
  expect(sut.parse(['3', '+', '4', '*', '2', '/', '(', '1', '-', '5', ')'])).toStrictEqual(['3', '4', '2', '*', '1', '5', '-', '/', '+']);
});

test('parsing 3 + 4 × 2 / ( 1 − 5 ) ^ 2 ^ 3 returns [3,4,2,*,1,5,-,2,3,^,^,/,+]', () => {
  expect(sut.parse(['3', '+', '4', '*', '2', '/', '(', '1', '-', '5', ')', '^', '2', '^', '3']))
  .toStrictEqual(['3', '4', '2', '*', '1', '5', '-', '2', '3', '^', '^', '/', '+']);
});