import { PasswordChecker, PasswordErrors } from '../../app/pass_checker/PasswordChecker';

describe('PasswordChecker test suit', () => {
  let sut: PasswordChecker;


  beforeEach(() => {
    sut = new PasswordChecker();
  })

  it('Pass less than 8 chars is invalid', () => {
    const actual = sut.checkPassword('13564');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT)
  });

  it('Pass more than 8 chars is valid', () => {
    const actual = sut.checkPassword('13564796541');
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
  });

  it('Pass with no upper case letter is invalid', () => {
    const actual = sut.checkPassword('jhg');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE)
  });

  it('Pass with upper case letter is valid', () => {
    const actual = sut.checkPassword('kbjKK');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE)
  });


  it('Pass with no lower case letter is invalid', () => {
    const actual = sut.checkPassword('ABCD');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE)
  });

  it('Pass with lower case letter is valid', () => {
    const actual = sut.checkPassword('1abcA');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE)
  });

  it('Complex pass should pass all test', () => {
    const actual = sut.checkPassword('1abcasdASS');
    expect(actual.reasons).toHaveLength(0);
    expect(actual.valid).toBe(true)
  });

  it('Admin pass with no number is invalid', () => {
    const actual = sut.checkAdminPassword('bcasdASS');
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
    expect(actual.valid).toBe(false)
  });

  it('Admin pass with number is valid', () => {
    const actual = sut.checkAdminPassword('b1casdASS');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
})

