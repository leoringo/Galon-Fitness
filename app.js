if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3000 
const app = express()
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(require('./routers'))
app.use(errorHandler)


app.listen(PORT, () =>  {
    console.log(`Nyonya manis bagi ${PORT} dong`) 
})