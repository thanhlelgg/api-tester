import { Booking } from '../model/Booking';
import { assert } from 'chai';
import { test, suite } from '@testdeck/mocha';
import { AbstractListener } from '../base/AbstractListener';
import { CreateToken } from '../model/CreateToken';
import addContext from 'mochawesome/addContext';

@suite('Remove Booking Tests')
class RemoveBookingTest extends AbstractListener {
  existingBookingId: String;
  invalidBookingId: '-1';

  account: any = {
    username: 'admin',
    password: 'password123'
  };

  @test('Verify Delete Booking successfully')
  async verifyDeleteBookingSuccessfully(): Promise<void> {
    const auth = await CreateToken.getInstance().sendRequest(this.account);
    const getBookingId = await Booking.getInstance().getBookingIds();
    this.existingBookingId = getBookingId[Math.floor(Math.random() * getBookingId.length)].bookingid;
    await Booking.getInstance().deleteBooking(this.existingBookingId, auth.token);
    const getBooking = await Booking.getInstance().getBookingById(this.existingBookingId);
    assert.equal(getBooking.status, '404');
  }

  @test('Verify Delete Booking with invalid auth token')
  async verifyDeleteBookingWithoutAuth(): Promise<void> {
    const response = await Booking.getInstance().deleteBooking(this.invalidBookingId, 'invalidtoken');
    assert.equal(response.status, '403');
  }

  @test('Verify Delete Booking with incorrect Booking id')
  async verifyDeleteBookingWithIncorrectId(): Promise<void> {
    const auth = await CreateToken.getInstance().sendRequest(this.account);
    const response = await Booking.getInstance().deleteBooking(this.invalidBookingId, auth.token);
    assert.equal(response.status, '405');
  }
}
