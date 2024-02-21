import { Request, Response } from "express";
import db from "../Models";
import util from "../Utils/utils";

const Authentication = db.entities.authentication;



  const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
  
    const user: any = await Authentication.findOne({
      where: { username: username },
    });
  
    if (!user) {
      res.status(404).send({ message: "User not found." });
      return;
    }
  
    const passwordIsValid = await util.comparePasswords(password, user.password);
  
    if (!passwordIsValid) {
      res.status(401).send({ message: "Invalid password." });
      return;
    }
  
    if (typeof user.id === "number" && typeof user.username === "string") {
      const token = util.generateToken({ id: user.id, username: user.username });
  
      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token,
      });
    } else {
      res.status(500).send({ message: "Server error." });
    }
  };


// Create and Save a new Authentication
const create = async (req: Request, res: Response): Promise<void> => {
  
  // Create a Authentication
  const authentication = {
    
      username:(req.body.username),
    
      password: await util.hashPassword(req.body.password)
    
  };

  // Save Authentication in the database
  try {
    const data = await Authentication.create(authentication);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while creating the Authentication.",
    });
  }
};


// Find a single Authentication with an id
const findOne = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const data = await Authentication.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Authentication with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Authentication with id=" + id,
    });
  }
};

// Update a Authentication by the id in the request
const update = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const num = await Authentication.update(req.body, {
    where: { id: id }
  });
    
  if (num[0] === 1) {
    res.send({
      message: "Authentication was updated successfully.",
    });
  } else {
    res.send({
      message: `Cannot update Authentication with id=${id}. Maybe Authentication was not found or req.body is empty!`,
    });
  }
} catch (err) {
  res.status(500).send({
    message: "Error updating Authentication with id=" + id,
  });
}
};

// Delete a Authentication with the specified id in the request
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const num = await Authentication.destroy({
    where: { id: id }
  });

  if (num === 1) {
    res.send({
      message: "Authentication was deleted successfully!",
    });
  } else {
    res.send({
      message: `Cannot delete Authentication with id=${id}. Maybe Authentication was not found!`,
    });
  }
} catch (err) {
  res.status(500).send({
    message: "Could not delete Authentication with id=" + id,
  });
}
};

// Delete all Authentication from the database.
const deleteAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const nums = await Authentication.destroy({
    where: {},
    truncate: false
  });
    
  res.send({ message: `${nums} Authentication were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while removing all Authentication.",
    });
  }
};

// find all  Authentication
const findAllPublished = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Authentication.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while retrieving Authentication.",
    });
  }
};

export default {
  create,
  findOne,
  update,
  deleteProduct,
  deleteAll,
  findAllPublished,
};