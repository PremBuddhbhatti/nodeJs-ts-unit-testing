jest.mock('../../app/doubles/OtherUtils', () => ({
  ...jest.requireActual('../../app/doubles/OtherUtils'),
  calculationComplexity: () => { return 10 }
}));

// mocking node modules
jest.mock('uuid', () => ({
  v4: () => '123'
}))
import * as OtherUtils from '../../app/doubles/OtherUtils'

describe('module test', () => {
  test('calculate complexity', () => {
    const result = OtherUtils.calculationComplexity({} as any);
    expect(result).toBe(10)

  })

  test('keep other functionalities', () => {
    const result = OtherUtils.toUpperCase('abc');
    expect(result).toBe('ABC');
  })

  test('string with id', () => {
    const result = OtherUtils.toLowerCaseWithId('ABC');
    expect(result).toBe('abc123');
  })
})


