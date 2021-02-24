const express = require('express');
const axios = require('axios');
const app = express();
const ExpressError = require('./expressError')
app.use(express.json());
app.post('/', async function (req, res, next) {
    // for each developer, try to retrieve the data. if found, return response object with name and bio.
    // if not found, send express error to next with status code 404
    let results = req.body.developers.map(d => {
        return axios.get(`https://api.github.com/users/${d}`)
            .then(resp => ({ name: resp.data.name, bio: resp.data.bio }))
            .catch(err => {
                const notFoundError = new ExpressError(`Could not find developer: ${d}`, 404);
                next(notFoundError);
            })
    });
    // wait for all results.
    results = await Promise.all(results);
    // return results if no errrors.
    return res.json(results);
});

// 404 Page not found 
app.use(function (req, res, next) {
    const pageNotFoundError = new ExpressError(`Page not found`, 404);
    next(pageNotFoundError);
})

// Express Error Handler
app.use(function (err, req, res, next) {
    const message = err.message;
    const status = err.status;

    res.status(status).json({ error: { message, status } })
})

app.listen(3000);