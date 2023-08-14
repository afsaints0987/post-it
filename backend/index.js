const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3002
const app = express();

const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use('/users', userRoute)
app.use('/posts', postRoute)

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser :true,
    useUnifiedTopology: true
}).then(console.log('DB Successfully Connected to Host:', process.env.MONGODB))
.catch((err)=> console.error("Error connecting DB", err));


app.listen(port, () => {
    console.log(`server started on ${port}`)
})