import { OtherStringUtils, calculationComplexity, toUpperCaseWithCb } from '../../app/doubles/OtherUtils'

describe.skip('OtherUtils test suit', () => {

  // strips are used to track the calling of methods 
  describe('OtherStringUtils test with spices',()=>{
    let sut: OtherStringUtils;
    beforeEach(()=>{
      sut = new OtherStringUtils();
    })

    test('use a spy to track calls',()=>{
      const toUpperCaseSpy = jest.spyOn(sut,'toUpperCase')
      sut.toUpperCase('ase');
      expect(toUpperCaseSpy).toBeCalledWith('ase')
    })

    test('use a spy to track calls to other module', () => {
      const consoleLogSpy = jest.spyOn(sut, 'logString')
      sut.logString('ase');
      expect(consoleLogSpy).toBeCalledWith('ase')
    })

    test('use a spy to replace implementation of method', () => {
      jest.spyOn(sut as any,'callExternalService').mockImplementation(()=>{
        console.log('calling mock implementation');
      });

        (sut as any).callExternalService()
    })
  })

  //using Jest mocks 
  describe('Tracking callbacks with Jest mocks',()=>{
    const callBackMock = jest.fn();

    afterEach(()=>{
      jest.clearAllMocks();
    });

    it('calls callback for invalid arg- track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock)
      expect(actual).toBeUndefined()
      expect(callBackMock).toBeCalledWith('Invalid arg')
      expect(callBackMock).toBeCalledTimes(1)
    })

    it('calls callback for valid arg- track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock)
      expect(actual).toBe('ABC')
      expect(callBackMock).toBeCalledWith('called function with abc')
      expect(callBackMock).toBeCalledTimes(1)
    })  
  })

  // using manual mocks 
  describe('Tracking callbacks', () => {

    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++
    }

    afterEach(() => {
      cbArgs = [];
      timesCalled = 0
    })

    it('calls callback for invalid arg- track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock)
      expect(actual).toBeUndefined()
      expect(cbArgs).toContain('Invalid arg')
      expect(timesCalled).toBe(1)
    })

    it('calls callback for invalid arg- track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock)
      expect(actual).toBe('ABC')
      expect(cbArgs).toContain('called function with abc')
      expect(timesCalled).toBe(1)
    })
  })
  it('ToUpperCase - calls callback for invalid arg', () => {
    const actual = toUpperCaseWithCb('', () => { })
    expect(actual).toBeUndefined()
  })

  it('ToUpperCase - calls callback for valid arg', () => {
    const actual = toUpperCaseWithCb('abc', () => { })
    expect(actual).toBe('ABC')
  })


  it('Calculates complexity', () => {

    // Stubs are incomplete Objects which are used for mocking 
    const someInfo = {
      length: 5,
      extraInfo: {
        filed1: 'someInfo',
        field2: 'someInfo2'
      },
    }

    const actual = calculationComplexity(someInfo as any);
    expect(actual).toBe(10);
  })
})