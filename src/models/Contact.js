import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    name: { type: String, required: true },
    lastname: { type: String },
    avatar: { type: String }, // base64
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
