const mongoose = require('mongoose')

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vgCrUIWASpZJSSHl:vgCrUIWASpZJSSHl@cluster0.wa3cn.mongodb.net/shopee?retryWrites=true&w=majority&appName=Cluster0')
        console.log('MongoDB connected')
    } catch (error) {
        console.log('MongoDB connect failed: ' + error)
    }
}

module.exports = connectMongoDB