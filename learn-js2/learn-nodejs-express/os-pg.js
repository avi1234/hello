const os = require('os')
const path = require('path')
const {readFileSync, writeFileSync, readFile, writeFile, createWriteStream} = require('fs')
const http = require('http')
const _ = require('lodash')
const util = require('util')
const EventEmitter = require('events')


const user = os.userInfo()
console.log(user);

const filePath = path.join(__dirname,'data','data.json')

console.log(filePath)

const file1Path = path.join('data','simple.txt')

let file1 = readFileSync(file1Path,'utf8')

console.log(file1)

writeFileSync(file1Path,'🧖‍♂️',{flag: 'a'})

file1 = readFileSync(file1Path,'utf8')

console.log(file1)

readFile(file1Path, 'utf8', (err, res) => {
    err ? console.log(err) : console.log(res)
})

const server = http.createServer((req,res) => {
    switch(req.url) {
        case '/':
            res.write('home page!')
            break
        case '/about':
            // for(let i=0; i < 1000; i++)
            //     for(let j=0; j< 1000; j++)
            //         res.write(`${i+j}`)
            res.write('about page!')
            break
        default: res.write('unknown page')
    }
    res.end()
})

const server2 = http.createServer((req,res) => {
    res.writeHead(200,{'content-type':'text/html'})
    res.end('<h1>home page</h1>')

    console.log('user hit the server')
}) 

server.listen(3003);

const items = [1, 2, [3, 4]]
console.log(_.flattenDeep(items))

const readFilePromise = util.promisify(readFile)

const readFileFun = async () => {
    try {
        const content = await readFilePromise(file1Path,'utf-8')
        console.log('🙆‍♂️',content)
    } catch (error) {
        console.log('error ', error)
    }
}

readFileFun()

// events

const customEmitter = new EventEmitter()

customEmitter.on('response', () => console.log('data received'))

customEmitter.emit('response')

customEmitter.on('eventWithParams', (name, age) => console.log(`✋hi there ${name} ${age}`))

customEmitter.emit('eventWithParams','john',34)

//streams

