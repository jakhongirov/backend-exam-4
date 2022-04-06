const { fetch, fetchAll } = require('../../lib/postgres')

const BUILDINGS = `
    SELECT
        *
    FROM
        buildings;
        `

const BUILDING_ID = `
    SELECT
       *
    FROM
        buildings
    WHERE
        building_id = $ 1;

`

const ADD_BUILDING = `
    INSERT INTO
        buildings (
            building_name,
            building_square_money,
            building_img
        )
    VALUES
        ($ 1, $ 2, $ 3) 
    RETURNING *;
`

const ADD_ADRESS = `
    INSERT INTO
    buildings_adresses (
        buildings_adress_name,
        building_id
    )
    VALUES
    ($ 1, $ 2,) 
    RETURNING *;
`

const ADD_ROOMS_SIX = `
    INSERT INTO
    six_rooms (
        building_square,
        building_id
    )
    VALUES
    ($ 1, $ 2,) 
    RETURNING *;
`

const ADD_ROOMS_FIVE = `
    INSERT INTO
    five_rooms (
        building_square,
        building_id
    )
    VALUES
    ($ 1, $ 2,) 
    RETURNING *;
`

const ADD_ROOMS_FOUR = `
    INSERT INTO
    four_rooms (
        building_square,
        building_id
    )
    VALUES
    ($ 1, $ 2,) 
    RETURNING *;
`

const ADD_ROOMS_THREE = `
    INSERT INTO
    three_rooms (
        building_square,
        building_id
    )
    VALUES
    ($ 1, $ 2,) 
    RETURNING *;
`

const ADD_ROOMS_TWO = `
    INSERT INTO
    two_rooms (
        building_square,
        building_id
    )
    VALUES
    ($ 1, $ 2,) 
    RETURNING *;
`

const FIND_ADRESS = `
    SELECT
        *
    FROM
        buildings_adresses
    WHERE
        building_id = $ 1;
`

const FIND_ROOMS_SIX = `
    SELECT
        *
    FROM
        six_rooms
    WHERE
        building_id = $ 1;
`

const FIND_ROOMS_FIVE = `
    SELECT
        *
    FROM
        six_rooms
    WHERE
        building_id = $ 1;
`

const FIND_ROOMS_FOUR = `
    SELECT
        *
    FROM
        six_rooms
    WHERE
        building_id = $ 1;
`

const FIND_ROOMS_THREE = `
    SELECT
        *
    FROM
        six_rooms
    WHERE
        building_id = $ 1;
`

const FIND_ROOMS_TWO = `
    SELECT
        *
    FROM
        six_rooms
    WHERE
        building_id = $ 1;
`


const getBuildings = () => fetchAll(BUILDINGS)
const newBuilding = (name, square, img) => fetch(ADD_BUILDING, name, square, img)
const newBranch = (adress, buildingID) => fetch(ADD_ADRESS, adress, buildingID)
const squareRooms = (rooms, buildingID, square) => {

    if (rooms == 6) {
        return fetch(ADD_ROOMS_SIX, rooms, buildingID, square)
    } else if (rooms == 5) {
        return fetch(ADD_ROOMS_FIVE, rooms, buildingID, square)
    } else if (rooms == 4) {
        return fetch(ADD_ROOMS_FOUR, rooms, buildingID, square)
    } else if (rooms == 3) {
        return fetch(ADD_ROOMS_THREE, rooms, buildingID, square)
    } else if (rooms == 2) {
        return fetch(ADD_ROOMS_TWO, rooms, buildingID, square)
    }
}

const getAdress = (buildingID) => fetch(FIND_ADRESS, buildingID)

const getRooms = (rooms, buildingID) => {
    if (rooms == 6) {
        return fetch(FIND_ROOMS_SIX, buildingID)
    } else if (rooms == 5) {
        return fetch(FIND_ROOMS_FIVE, buildingID)
    } else if (rooms == 4) {
        return fetch(FIND_ROOMS_FOUR, buildingID)
    } else if (rooms == 3) {
        return fetch(FIND_ROOMS_THREE, buildingID)
    } else if (rooms == 2) {
        return fetch(FIND_ROOMS_TWO, buildingID)
    }
}

const getBuildingBYid = (id) => fetchAll(BUILDING_ID, id)

module.exports = {
    getBuildings,
    newBuilding,
    newBranch,
    squareRooms,
    getAdress,
    getRooms,
    getBuildingBYid
}