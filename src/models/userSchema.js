import mongoose from "mongoose";

const { Schema } = mongoose;



const userSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User ||
    mongoose.model("User", userSchema);
