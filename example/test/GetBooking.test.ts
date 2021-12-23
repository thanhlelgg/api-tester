import { Booking } from "../model/Booking";
import { assert, expect, use, should } from "chai";
import { test, suite } from "@testdeck/mocha";
import { AbstractListener } from "../base/AbstractListener";
import ChaiJsonSchema = require("chai-json-schema");
use(ChaiJsonSchema);

@suite("Get Booking Tests")
class GetBookingTest extends AbstractListener {
  incorrectBookingId: String = "-1";
  existingBookingId: String;

  @test("Verify Get Booking Successfully")
  async verifyGetBookingSuccessfully(): Promise<void> {
    const getBookingId = await Booking.getInstance().getBookingIds();
    this.existingBookingId =
      getBookingId[Math.floor(Math.random() * getBookingId.length)].bookingid;
    const booking = await Booking.getInstance().getBookingById(
      this.existingBookingId
    );
    assert.jsonSchema(booking, Booking.getBookingBodySchema);
  }

  @test("Verify Get Booking with incorrect id")
  async verifyGetBookingWithIncorrectId(): Promise<void> {
    const booking = await Booking.getInstance().getBookingById(
      this.incorrectBookingId
    );
    assert.equal(booking.status, "404");
    assert.equal(booking.data, "Not Found");
  }
}
