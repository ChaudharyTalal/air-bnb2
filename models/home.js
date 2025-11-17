const path = require('path')
const fs = require('fs')
const rootDir = require('../utils/pathUtil')

const registerHomes = [];


module.exports = class Home {

    constructor(houseName, location, price, url, rating,id) {
        this.houseName = houseName
        this.location = location
        this.price = price
        this.url = url
        this.rating = rating
    }
    save() {
        this.id=Math.random().toString()
        Home.fetchAll(registerHomes => {
            registerHomes.push(this)
            const filePath = path.join(rootDir, 'data', 'homes.json')
            fs.writeFile(filePath, JSON.stringify(registerHomes), (err) => {
                console.log(err)
            })

        })
    }
    static fetchAll(cb) {
        const homeDataPath = path.join(rootDir, 'data', 'homes.json')
        fs.readFile(homeDataPath, (err, data) => {

            if (err) {
                return []
            }
            else {
                try {
                    cb(JSON.parse(data))

                } catch (e) {
                    return cb([])
                }
            }


        })
    }
}