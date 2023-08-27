// axios - make better requests
// morgan - logger 

const express = require('express')
const { reduce } = require('lodash')
const morgan = require('morgan')
const logger = require('./logger-middleware')
const authorize = require('./authorize')
const catsRouter = require('./routes/cats')

const app = express()

app.use([morgan('tiny'), logger, authorize])

app.use(express.static('./data'))

app.use('/cats', catsRouter)

app.get('/', (req, res) =>{
    res.send('home page')
})

app.get('/about', (req, res) =>{
    res.send('about page')
})

app.get('/api/v1/products/:productId', (req,res)=> {
    const productId = Number(req.params.productId)

    res.json({id: productId, name: 'Table'})
})
 
app.all('*', (req,res) => {
    res.status(404).send("not found")
})

 app.listen(3001, () => console.log('🆗server is up')) 