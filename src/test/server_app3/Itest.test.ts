import * as generatedId from '../../app/server_app/data/IdGenerator';
import { Account } from '../../app/server_app/model/AuthModel';
import { Reservation } from '../../app/server_app/model/ReservationModel';
import { HTTP_CODES, HTTP_METHODS } from '../../app/server_app/model/ServerModel';
import { Server } from '../../app/server_app/server/Server';
import { getRequestBody } from '../../app/server_app/utils/Utils';
import { makeAwesomeRequest } from "./utils/http-client";
import axios from 'axios';

xdescribe('server app Integration test', () => {
  let server: Server;

  beforeAll(() => {
    server = new Server();
    server.startServer();
  })

  afterAll(() => {
    server.stopServer();
  })

  const someUser: Account = {
    id: '',
    userName: 'someUser',
    password: 'somePass'
  }

  const someReservation: Reservation = {
    id: '',
    endDate: 'someEndDate',
    startDate: 'someDate',
    user: 'someUser',
    room: 'someRoom'
  }
  it('should register new user', async () => {
    const result = await axios.post('http://localhost:8080/register', JSON.stringify(someUser))

    const resultBody = result;

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.data.userId).toBeDefined();
    console.log(`connecting to: ${process.env.HOST}`);

  })

  it('should register new user with awesomeRequest', async () => {
    const result = await makeAwesomeRequest({
      host: 'localhost',
      port: 8080,
      method: HTTP_METHODS.POST,
      path: '/register'
    }, someUser)

    expect(result.statusCode).toBe(HTTP_CODES.CREATED);
    expect(result.body.userId).toBeDefined();
  });

  let token: string;
  it('should login a registered user', async () => {
    const result = await axios.post('http://localhost:8080/login', JSON.stringify(someUser))

    const resultBody = result;

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.data.token).toBeDefined();
    token = resultBody.data.token
  })

  let reservationId: string;
  it('should create reservation for loged in user', async () => {
    const result = await axios.post('http://localhost:8080/reservation', JSON.stringify(someReservation), { headers: { Authorization: token } })

    const resultBody = result;

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.data.reservationId).toBeDefined();
    reservationId = resultBody.data.reservationId
  })

  it('should get reservation for loged in user', async () => {
    const result = await axios.get(`http://localhost:8080/reservation/${reservationId}`, { headers: { Authorization: token } })

    const resultBody = result;

    const expectedReservation = someReservation;
    expectedReservation.id = reservationId;

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resultBody.data).toEqual(expectedReservation);
  })

  it('should create and retrieve multiple reservation for loged in user', async () => {
    await axios.post('http://localhost:8080/reservation', JSON.stringify(someReservation), { headers: { Authorization: token } })

    await axios.post('http://localhost:8080/reservation', JSON.stringify(someReservation), { headers: { Authorization: token } })

    await axios.post('http://localhost:8080/reservation', JSON.stringify(someReservation), { headers: { Authorization: token } })

    const getAllResult = await axios.get(`http://localhost:8080/reservation/all`, { headers: { Authorization: token } })


    expect(getAllResult.status).toBe(HTTP_CODES.OK);
    expect(getAllResult.data).toHaveLength(4)
  })

  it('should update reservation for loged in user', async () => {
    const updateResult = await axios.put(`http://localhost:8080/reservation/${reservationId}`, JSON.stringify({ startDate: 'otherStartDate' }), { headers: { Authorization: token } })


    expect(updateResult.status).toBe(HTTP_CODES.OK);

    const getResult = await axios.get(`http://localhost:8080/reservation/${reservationId}`, { headers: { Authorization: token } })

    const getResultBody: Reservation = getResult.data;
    expect(getResultBody.startDate).toBe('otherStartDate')
  })

  it('should delete reservation for loged in user', async () => {
    const updateResult = await axios.delete(`http://localhost:8080/reservation/${reservationId}`, { headers: { Authorization: token } })


    expect(updateResult.status).toBe(HTTP_CODES.OK);

    const getResult = await axios.get(`http://localhost:8080/reservation/${reservationId}`, { headers: { Authorization: token } }).catch(error => {
      if (error.response.status == 404) {
        return error.response
      }
    });

    expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND)
  })

  it('snapshot demo', async () => {

    jest.spyOn(generatedId, 'generateRandomId').mockReturnValueOnce('12334')


    await axios.post('http://localhost:8080/reservation', JSON.stringify(someReservation), { headers: { Authorization: token } })

    const result = await axios.get(`http://localhost:8080/reservation/1234`, { headers: { Authorization: token } })

    const resultBody: Reservation = result.data;

    expect(resultBody).toMatchSnapshot();
  })
})