const express = require("express");
const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require("./data/helpers/projectModel.js");

const router = express.Router();

// //import and add a path for actions router here later**************************
// const actionRouter = require('./actionRouter.js');
// router.use('/:id/actions', IdPasser, actionRouter);
//CRUD STUFF
//GET

router.get("/", (req, res) => {
  get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: `Something went wrong with getting these... ${err}` });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const { id } = req.params;
  getProjectActions(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: `Something went wrong with getting this... ${err}` });
    });
});

//POST

router.post('/', validateProject, (req, res) => {
    insert(req.body)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong with posting this... ${err}`})
    })
})

//DELETE

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    remove(id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong with deleting this... ${err}`})
    })
})

//PUT

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    update(id, req.body)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong with updating this... ${err}`})
    })
})

//MIDDLEWARE

function validateProjectId(req, res, next) {
  const { id } = req.params;
  get(id)
    .then((post) => {
      if (post) {
        req.project = post;
        next();
      } else {
        res
          .status(404)
          .json({ message: "A project with that id does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving project" });
    });
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "You need to include a project name and description" });
  } else {
    next();
  }
}

// function IdPasser(req, res, next) {
//     const { id } = req.params;
//     req.userId = id;
  
//     next();
//   }

module.exports = router;
