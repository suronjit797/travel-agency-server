import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
      default: 0,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const UserModel = model<IUser, IUserModel>('User', userSchema)

export default UserModel
