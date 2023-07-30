import { Reservation } from '../../../app/server_app/model/ReservationModel'

expect.extend({
  toBeValidReservation(reservation: Reservation) {

    const validId = (reservation.id.length > 5) ? true : false;

    const validUser = (reservation.user.length > 5) ? true : false;

    return {
      pass: validId && validUser,
      message: () => 'expect reservation to have valise id and user',
    }
  },

  toHaveUser(reservation: Reservation, user: string) {
    const hasRightUser = user == reservation.user

    return {
      pass: hasRightUser,
      message: () => `expected reservation to have user ${user},received ${reservation.user}`
    }
  }
})

interface CustomMatchers<R> {
  toBeValidReservation(): R,
  toHaveUser(user: string)
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> { }
  }
}

const someReservation: Reservation = {
  id: '123456',
  endDate: 'endDate',
  startDate: 'startDate',
  room: 'someRoom',
  user: 'someUser'
}


describe('custom matcher test', () => {
  it('check for valid reservation', () => {
    expect(someReservation).toBeValidReservation();
    expect(someReservation).toHaveUser('someOtherUser')
  })
})