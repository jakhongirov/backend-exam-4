const { fetch, fetchAll } = require('../../lib/postgres')

const FIND_BANK = `
    SELECT
        *,
        MIN (bank_money)
    FROM
        banks
    WHERE
        bank_money >= $ 1 and bank_yaers = $ 2;

`

const NEW_BANK = `
    INSERT INTO
        banks (
            bank_name,
            bank_percent,
            bank_img,
            bank_service,
            bank_years
        )
    VALUES
        ($ 1, $ 2, $ 3, $ 4, $ 5, $ 6)
    RETURNING *
`

const getBanks = (sum, years) => fetch(FIND_BANK, sum, years)
const newBnk = (name, percent, money, img1, service, years) => fetch(NEW_BANK, name, percent, money, img1, service, years)

module.exports = {
    getBanks,
    newBnk
}