const multer = require('multer')
const pubsub = require('../../pubsub')
const model = require("./model")
const BANKS = 'BANKS'

module.exports = {
    Query: {
        banks: async (_, { sum, years }) => {

            const findBank = await model.getBanks(sum, years)
            return findBank
        }
    },

    
    Mutation: {
        newbank: async (_, { name, percent, money, img, service, years }) => {

            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, '../../../upload');
                },
                filename: function (req, file, cb) {
                    cb(null, file.originalname);
                }
            });

            const img1 = `http://localhost:9000/upload/${img}`

            const upload = multer({ storage: storage })

            const newBank = await model.newBnk(name, percent, money, img1, service, years)
            pubsub.publish(BANKS)
            return newBank
        },

    },

    Subscription: {
        banks: {
            resolve: async () => {
                return await model.getBanks()
            },
            subscribe: () => pubsub.asyncIterator([BANKS])
        }
    },

    Banks: {
        id: global => global.bank_id,
        name: global => global.bank_name,
        percent: global => global.bank_percent,
        money: global => global.bank_money,
        img: global => global.bank_img,
        service: global => global.bank_service,
        years: global => global.bank_years
    }
}