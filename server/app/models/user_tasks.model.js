module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      description: String,
      state: { type: String, enum: ["To do", "Done"], required: true},
      user_id: { type: mongoose.Types.ObjectId, ref: "users"},
    },
    { timestamps: true }
  );

  
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const UserTasks = mongoose.model("usertasks", schema);
  return UserTasks;
};