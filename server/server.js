const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Organization = require('./models/organizationModel')
const app = express()

dotenv.config();
const mongoUri = process.env.MONGO_URI

app.use(express.json())
//console.log('Mongo URI:', process.env.MONGO_URI);
//routes
app.get('/', (req, res) => {
  res.send('Hello Node API')
})

app.post('/organization', async(req, res) => {
  try {
      const org = await Organization.create(req.body)
      res.status(200).json(org);
      
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
  }
})

app.listen(3000, ()=>{
  console.log("Connected to backend")
})

mongoose.connect(mongoUri)
.then(() => {
  console.log('Connected to MongoDB')
  app.listen(3001, ()=> {
      console.log(`Node API app is running on port 3001`)
  });
}).catch((error) => {
  console.log(error)
})