import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    }
});

uploadSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Upload = mongoose.model("upload", uploadSchema);
export default Upload
