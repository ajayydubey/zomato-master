import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    images: [
        {
            location: { type: String, required: true },
        }

    ],

},
    {
        timestamps: true, //createdAs updatedAs
    }
);

export const ImageModel = mongoose.model("Images", ImageSchema);
