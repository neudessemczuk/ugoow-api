import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    name: {
      type: String,
    },
    amount: {
      type: Number,
    },
    price: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
