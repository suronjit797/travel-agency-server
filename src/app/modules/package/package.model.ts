import { Schema, model } from 'mongoose'
import { IPackage, IPackageModel } from './package.interface'

const packageSchema = new Schema<IPackage>(
  {
    title: { type: String, required: true },
    country: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['luxury', 'budget'] },
    lastBookingDate: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const PackageModel = model<IPackage, IPackageModel>('Package', packageSchema)

export default PackageModel
