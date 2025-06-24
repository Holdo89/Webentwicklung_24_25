import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: String,
  time: String,
  title: { type: String, default: "Geburtstagsfeier" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  guest_title: String,
  guest_name: String,
  guest_lastname: String,
  guest_email: String,
  guest_group_size: { type: Number, default: 1 },
});

export default mongoose.model("Booking", bookingSchema);
