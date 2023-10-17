import { IResponsePayload } from '../../../shared/globalInterfaces'
import { IPackage } from './package.interface'
import PackageModel from './package.model'
import httpStatus from 'http-status'

export const createService = async (payload: IPackage): Promise<IResponsePayload<IPackage>> => {
  const data = await PackageModel.create(payload)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package created successfully',
    data,
  }
}

export const getAllService = async (): Promise<IResponsePayload<IPackage[]>> => {
  const data = await PackageModel.find()

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package retrieved  successfully',
    data,
  }
}

export const getSingleService = async (id: string): Promise<IResponsePayload<IPackage>> => {
  const data = await PackageModel.findById(id)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package retrieved  successfully',
    data,
  }
}

export const updateService = async (id: string, body: Partial<IPackage>): Promise<IResponsePayload<IPackage>> => {
  const data = await PackageModel.findByIdAndUpdate(id, body, { new: true })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package updated successfully',
    data,
  }
}

export const removeService = async (id: string): Promise<IResponsePayload<IPackage>> => {
  const data = await PackageModel.findByIdAndDelete(id)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package deleted successfully',
    data,
  }
}
