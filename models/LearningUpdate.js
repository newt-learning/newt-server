const mongoose = require("mongoose");
const { Schema } = mongoose;

const learningUpdateSchema = new Schema({
  _user: {
    type: String,
    ref: "User"
  },
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Content"
  },
  previousPagesRead: Number,
  updatedPagesRead: Number,
  contentType: {
    type: String,
    enum: ["book"]
  },
  timestamp: Date
});

// Since numPagesRead is a computed value, gonna use Mongoose virtual
// https://mongoosejs.com/docs/tutorials/virtuals.html
learningUpdateSchema.virtual("numPagesRead").get(function() {
  return updatedPagesRead - previousPagesRead;
});

mongoose.model("learning-updates", learningUpdateSchema);
