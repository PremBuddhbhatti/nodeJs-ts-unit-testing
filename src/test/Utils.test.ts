import { StringUtils, getStringInfo, toUpperCase } from '../app/Utils'

describe('Utils test suit', () => {

  // oops test
  describe('StringUtils tests', () => {

    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      console.log('Setup');

    })

    afterEach(() => {
      console.log('Teardown');
    })

    it('should return upperCase', () => {
      const actual = sut.toUpperCase('abc');
      expect(actual).toBe('ABC');
      console.log('Actual test');

    });

    it('should through error invalid args - functions ', () => {

      function expectError() {
        const actual = sut.toUpperCase('');

      }
      expect(expectError).toThrow();
      expect(expectError).toThrowError('Invalid arguments');


    });


    it('should through error invalid args - arrow functions ', () => {

      expect(() => {
        sut.toUpperCase('')
      }).toThrowError('Invalid arguments');


    });

    it('should through error invalid args - try catch ', (done) => {

      try {
        sut.toUpperCase('');
        done('GetStringInfo should throw error for invalid arg'); // it will fail test if error is not thrown 
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid arguments');
        done()
      }


    });

  })


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
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
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