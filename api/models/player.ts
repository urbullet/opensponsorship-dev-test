import mongoose from "mongoose";
const SPORTS = [
    "Golf",
    "Tennis",
    "Cricket",
    "Basketball",
    "Baseball",
    "American Football",
    "Aquatics",
    "Archery",
    "Automobile Racing",
    "Badminton",
    "Beach Volleyball",
    "Bobsleigh",
    "Body Building",
    "Boxing",
    "Cross Country Running",
    "Cross Country Skiing",
    "Curling",
    "Cycling",
    "Darts",
    "Decathlon",
    "Down Hill Skiing",
    "Equestrianism",
    "eSports",
    "Fencing",
    "Field Hockey",
    "Figure Skating",
    "Gymnastics",
    "Ice Hockey",
    "Martial Arts",
    "Mixed Martial Arts",
    "Modern Pentathlon",
    "Motorcycle Racing",
    "Netball",
    "Polo",
    "Racquetball",
    "Rowing",
    "Rugby",
    "Sailing",
    "Softball",
    "Shooting",
    "Skateboarding",
    "Skeet Shooting",
    "Skeleton",
    "Snow Boarding",
    "Soccer (Football)",
    "Squash",
    "Surfing",
    "Swimming",
    "Track and Field",
]
const playerSchema = new mongoose.Schema({
    name: {
        trim: true,
        required: true,
        type: String
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    location: {
        trim: true,
        required: true,
        type: String
    },
    team: {
        trim: true,
        required: true,
        type: String
    },
    gender: {
        trim: true,
        required: true,
        type: String,
        enum: ['male', 'female', 'other'],
        lowercase: true
    },
    sports: {
        trim: true,
        required: true,
        type: [String],
        enum: SPORTS
    },
    about: {
        trim: true,
        required: true,
        type: String
    },
    interests: {
        trim: true,
        required: true,
        type: [String]
    },
    profilePicture: {
        trim: true,
        required: true,
        type: String
    },
})

playerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Player = mongoose.model('Player', playerSchema);

export default Player;
