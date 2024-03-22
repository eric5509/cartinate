import mongoose from 'mongoose'

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log('Connected to Database')
    } catch (error) {
        console.log("Couldn't connect to Database")
    }
}