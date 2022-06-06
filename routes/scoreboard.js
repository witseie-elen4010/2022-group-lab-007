// /////////////////////////////////////////////
// Library imports and instances
// /////////////////////////////////////////////
const express = require('express')
const router = express.Router()
const session = require('express-session');
const database = require('../serverConfig.js')

// define scoreboard
const scoreboard = {
    name : 'scoreboard',
    stats: []
}

// /////////////////////////////////////////////
// Retrieve score table from server and display
// /////////////////////////////////////////////
router.get('/', (req, res) => {
    if (!req.session.ID) {
        res.redirect('/login')
        } else {

    // Pool request of database
    database.pools
    // Run SQL query of server table
        .then((pool) => {
            return pool.request()
            // Select scoreboard and order by wins
            .query('SELECT * FROM dbo.scoreboard ORDER BY score DESC;')
        })
            .then(result => {
                // arrange retrieved data as columns/rows for display
                let columns = ['userID','username', 'games', 'wins','score']
                // define table size
                let cols = columns.length
                let rows = result.recordset.length
                // assign array data to the table
                if (rows > 0) {
                    const scoreTable = Array.from(Array(rows), () => new Array(cols));
                    for (let row = 0; row < rows; row++) {
                        for (let col = 0; col < cols; col++) {
                            let x = result.recordsets[0][row][columns[col]]
                            scoreTable [row] [col] = x
                        }
                    }
                    scoreboard.stats = scoreTable
                }
                res.render('users/scoreboard', {data: scoreboard})
            })
        // Return an error if a problem with the query
        .catch(err => {
            res.send({ Error: err })
        })
    }
})

module.exports = router