const http = require('http')
const express = require('express')
const app = express()
const { ApolloServer } = require('apollo-server-express')
const modules = require('./src/modules')
const { PORT } = require('./src/config')
const path = require('path')
const multer = require('multer')

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'upload')))
app.use(express.urlencoded({ extended: true }))


//Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })


const server = new ApolloServer({
    modules,
    context: ({ req, connection }) => {
        if (connection) {
            return {
                token: connection.context.token
            }
        } else {
            return {
                token: req.headers.token
            }
        }
    },

    onConnect: (connectionParams, socket) => {
        console.log(connectionParams, socket);
    },

    onDisconnect: () => { console.log('Disconnected') }
})

server.applyMiddleware({ app })
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
    console.log('http://localhost:' + PORT + server.graphqlPath)
    console.log('ws://localhost:' + PORT + server.subscriptionsPath)
})
