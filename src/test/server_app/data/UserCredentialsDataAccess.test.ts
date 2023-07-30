import { DataBase } from '../../../app/server_app/data/DataBase';
import { UserCredentialsDataAccess } from '../../../app/server_app/data/UserCredentialsDataAccess'
import { Account } from '../../../app/server_app/model/AuthModel';

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      }
    })
  }
})
describe('UserCredentialsDataAccess test suit', () => {
  let sut: UserCredentialsDataAccess;

  const someAccount: Account = {
    id: '',
    password: 'pass',
    userName: 'user'
  }

  const someId = '12345';

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();

    expect(DataBase).toHaveBeenCalledTimes(1);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should add user ', async () => {
    insertMock.mockResolvedValueOnce(someId);

    const actualId = await sut.addUser(someAccount);
    expect(actualId).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someAccount)
  })


  it('should get user by Id', async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualUser = await sut.getUserById(someId);

    expect(actualUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith('id', someId)
  })

  it('should get user by username', async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualUser = await sut.getUserByUserName(someAccount.userName);

    expect(actualUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName)
  })
})