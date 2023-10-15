import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'
import { userRoleArr } from '../../../shared/globalConstant'

const userSchema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: userRoleArr,
      required: true,
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
