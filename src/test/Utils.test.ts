import { getStringInfo, toUpperCase } from '../app/Utils'

describe('Utils test suit', () => {
  it('should return uppercase', () => {

    //arrange 
    const sut = toUpperCase;
    const expected = 'ABC'

    //act
    const actual = sut('abc');

    //assert
    expect(actual).toBe(expected);
  });

  // test for multiple test params 
  describe('ToUpperCase Example', () => {
    it.each([
      { input: 'abc', expected: 'ABC' },
      { input: 'cba', expected: 'CBA' },
      { input: 'xYZ', expected: 'XYZ' },
    ])('$input toUpperCase should be $expected', ({input,expected}) => { 
      const actual = toUpperCase(input);
      expect(actual).toBe(expected)
    });
  })

  // proper structure for test 
  describe("getStringInfo for arg My-String", () => {
    test('return right length', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters.length).toBe(9);
    });

    test('return right lower-case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.lowerCase).toBe('my-string');
    });
    test('return right upper-case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.upperCase).toBe('MY-STRING');
    });
    test('return right characters', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters.length).toBe(9);
      expect(actual.characters).toContain<string>('M');
    });
    test('return right extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).not.toBe(undefined);
      expect(actual.extraInfo).not.toBeUndefined();
      expect(actual.extraInfo).toBeDefined();
      expect(actual.extraInfo).toBeTruthy();
    });
  })

})