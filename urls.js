const fs = require('fs');
const lineReader = require('line-reader');
const axios = require('axios');

async function getFiles(path) {
    const promises = [];
    lineReader.eachLine(path, async function (line) {
        promises.push(axios.get(line)
            .then(resp => {
                const hostname = new URL(line).hostname
                fs.writeFile(hostname, resp.data, 'utf8', function (err) {
                    if (err) {
                        console.log(`Couldn't write to ${hostname}`)
                    } else {
                        console.log(`Wrote to ${hostname}`)
                    }
                })
            })
            .catch(err =>
                console.log(`Error with: ${line}`))
        )
    });
    await Promise.all(promises)
}

getFiles(process.argv[2])
