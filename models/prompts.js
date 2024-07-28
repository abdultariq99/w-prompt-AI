import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt : {
        type: String,
        required: [true, "Prompt is required!"]
    },
    tag: {
        type: String,
        required: [true, "Tag is required!"]
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema) //This checks if the same prompt already exist. If it exists, it doesn't create a duplicate. If it doesn't exist, it creates a new one.

export default Prompt;