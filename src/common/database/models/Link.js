'use strict';
const { Schema, model } = require('mongoose');

const LinkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    routine: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    sharedWith: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Link', LinkSchema);
