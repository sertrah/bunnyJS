const db = require("../models")
const UserTask = db.userTasks

exports.create = (req, res) => {
  if (!req.body.user_id) {
    res.status(400).send({ message: "user_id can not be empty!" })
    return
  }
  const userTask = new UserTask({
    description: req.body.description,
    user_id: req.body.user_id,
    state: req.body.state || "To do",
  })

  userTask
    .save(userTask)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving the user task.",
      })
    })
}

exports.findAll = (req, res) => {

    UserTask.aggregate([
      {
        $lookup: {
          from: "user",
          localField: "user_id",
          foreignField: "_id",
          as: "user_data",
        },
      },
    ])
      .then((dataList) => {
        const transformedData = dataList.map((data) => ({
          id: data._id,
          description: data.description,
          state: data.state,
          user: data.user_data,
        }))
        res.send(transformedData)
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Catalog.",
        })
      })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  UserTask.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Sale with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Sale with id=" + id })
    })
}


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    })
  }

  const id = req.params.id

  UserTask.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sale with id=${id}. Maybe Sale was not found!`,
        })
      } else res.send({ message: "Sale was updated successfully." })
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Sale with id=" + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  UserTask.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete UserTask with id=${id}. Maybe UserTask was not found!`,
        })
      } else {
        res.send({
          message: "UserTask was deleted successfully!",
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete UserTask with id=" + id,
      })
    })
}
