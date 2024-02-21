import express from "express";
import authentication from "../Controllers/authenticationController";
import verifyToken from "../Middlewares/middlewares";


const router = express.Router();


// Create a new Authentication
router.post('/', authentication.create);


// Login route
router.post('/login', authentication.login);


router.use(verifyToken); // Protected routes - Require authentication

// Retrieve all published Authentication
router.get('/published', authentication.findAllPublished);

// Retrieve a single Authentication with id
router.get('/:id', authentication.findOne);

// Update a Authentication with id
router.put('/:id', authentication.update);

// Delete a Authentication with id
router.delete('/:id', authentication.delete);

// Delete all Authentication
router.delete('/', authentication.deleteAll);

export default (app: express.Application): void => {
    app.use("/api/authentication", router);
  };
