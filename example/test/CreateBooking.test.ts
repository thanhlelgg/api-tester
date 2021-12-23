import { Booking } from "../model/Booking";
import { assert } from "chai";
import { test, suite } from "@testdeck/mocha";
import { AbstractListener } from "../base/AbstractListener";

@suite("Create Booking Tests")
class BookingTest extends AbstractListener {
  private bookingId: String;

  bookingBody: any = {
    firstname: "Thanh",
    lastname: "Le",
    totalprice: 123,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  bookingBodyMissingName: any = {
    totalprice: 123,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  @test("Verify Create Booking Successfully")
  async verifyCreateBookingSuccessfully(): Promise<void> {
    const json = await Booking.getInstance().createBooking(this.bookingBody);
    assert.deepEqual(json.booking, this.bookingBody);
  }

  @test("Verify Create Booking without Client name")
  async verifyCreateBookingWithoutClientName(): Promise<void> {
    const response = await Booking.getInstance().createBooking(
      this.bookingBodyMissingName
    );
    assert.equal(response.status, "500");
  }
}
