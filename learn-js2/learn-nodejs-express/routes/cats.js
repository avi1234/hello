const express = require('express')
const {getCats} = require('../controllers/cats')

const router = express.Router()

router.get('/',getCats) // alternative way - router.route('/').get(getCats)

module.exports = router