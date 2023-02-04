const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    bio: {
      type: String,
      default: 'Insert your bio here!'
    },
    profileImage: {
      type: String,
      default: "https://res.cloudinary.com/dqax39nha/image/upload/v1675468564/bwy3xkgvnkc9rmumy1j8.png"
    },
    trips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Trip'
      }
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ]
  },
  // Set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password when signing up or modifying existing password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Number of user's trips
userSchema.virtual('tripCount').get(function () {
  return this.trips.length;
});

// Number of user's posts
userSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

// Number of user's followers
userSchema.virtual('followerCount').get(function () {
  return this.followers.length;
});

const User = model('User', userSchema);

module.exports = User;
