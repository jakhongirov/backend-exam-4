const multer = require('multer')
const pubsub = require('../../pubsub')
const model = require("./model")
const BUILDINGS = 'BUILDINGS'

module.exports = {
    Query: {
        buildings: async (_, { id }) => {
            if (id > 0) {

                return await model.getBuildingBYid(id)
            }

            return await model.getBuildings()
        },

        getadress: async (_, { buildingID }) => {
            const findAdress = await model.getAdress(buildingID)
            return findAdress
        },

        getroom: async (_, { rooms, buildingID }) => {
            const findRoom = await model.getRooms(rooms, buildingID)
            return findRoom
        }
    },

    Mutation: {
        newbuilding: async (_, { name, square, img }) => {

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

            const newBuilding = await model.newBuilding(name, square, img1)
            pubsub.publish(BUILDINGS)
            return newBuilding
        },

        newbranch: async (_, { adress, buildingID }) => {
            const newBranch = await model.newBranch(adress, buildingID)
            return 'Created adress'
        },

        squarerooms: async (_, { rooms, buildingID, square }) => {
            const squarerooms = model.squareRooms(rooms, buildingID, square)
            return 'Created Rooms square'
        },
    },

    Subscription: {
        buildings: {
            resolve: async () => {
                return await model.getBuildings()
            },
            subscribe: () => pubsub.asyncIterator([BUILDINGS])
        }
    },

    Buildings: {
        id: global => global.building_id,
        name: global => global.building_name,
        square_money: global => global.building_square_money,
        img: global => global.building_img
    },

    Building_room: {
        id: global => global.id,
        square: global => global.building_square,
        building_id: global => global.building_id,
    },

    Building_adress: {
        id: global => global.buildings_adress_id,
        adress: global => global.buildings_adress_name,
        building_id: global => global.building_id,
    }
}