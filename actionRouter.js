const express = require('express');
const {
    get,
    insert,
    update,
    remove,
} = require('./data/helpers/actionModel.js');

const projectHelpers = require('./data/helpers/projectModel');

const router = express.Router();





//CRUD STUFF
//GET

router.get("/", (req, res) => {
    get()
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({message: `Soemthing went wrong fetching actions... ${err}`})
    })
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
})


//POST

router.post('/', validateAction, (req, res) => {
    insert(req.body)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong posting this action... ${err}`});
    })
})



//DELETE

router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    remove(id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong deleting this action... ${err}`});
    })
})


//PUT

router.put('/:id', validateActionId, validateAction, (req, res) => {
    const { id } = req.params;
    update(id, req.body)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong updating this action... ${err}`});
    })
})



//MIDDLEWARE

function validateActionId(req, res, next) {
    const { id } = req.params;
    get(id)
    .then(post => {
        if (post) {
            req.action = post;
            next();
        } else {
            res.status(404).json({message: "an action with that ID couldn't be found"})
        }
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong... ${err}`})
    })
}

function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({message: "make sure to include the project id, description, and notes"})
    } else {
        projectHelpers.get(req.body.project_id)
        .then(post => {
            if (post) {
                console.log(post);
                next();
            } else {
                req.status(404).json({message: "Can't seem to find this project ID, double check your params for a valid ID"})
            }
        })
        .catch(err => {
            res.status(500).json({message: `Something went wrong... ${err}`})
        })
    }
}

module.exports = router;