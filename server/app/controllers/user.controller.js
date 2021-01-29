const db = require("../models")
const User = db.users
const mongoos = require('mongoose')

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" })
    return
  }

  const user = new User({
    name: req.body.name,
    description: req.body.description || "",
    price: req.body.price || 0,
    inventory_id: req.body.inventory_id,
    catalog_type_id: req.body.catalog_type_id,
  })

  user
    .save(user)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user.",
      })
    })
}

exports.findAll = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Catalog.",
      })
    })
}

exports.findAllTask = (req, res) => {
  const id = req.params.id
    User.aggregate([
      { "$match": { "_id": mongoos.Types.ObjectId(id)  } },
      {
        $lookup: {
          from: "usertasks",
          localField: "_id",
          foreignField: "user_id",
          as: "user_tasks",
        },
      },
      {$limit:1}

    ])
      .then((dataList) => {
        const transformedData = dataList.map((data) => ({
          id: data._id,
          name: data.name,
          tasks: data.user_tasks,
        }))
        res.send(transformedData[0])
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Catalog.",
        })
      })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id })
    })
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    })
  }

  const id = req.params.id

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        })
      } else res.send({ message: "User was updated successfully." })
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        })
      } else {
        res.send({
          message: "User was deleted successfully!",
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      })
    })
}
