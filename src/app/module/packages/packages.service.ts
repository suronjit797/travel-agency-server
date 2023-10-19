import { Package } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPagination } from "../../../shared/globalInterfaces";

export const createPackageService = async (data: Package): Promise<Partial<Package> | null> => {
  const newPackage = await prisma.package.create({ data });
  const result: Partial<Package> = { ...newPackage };
  return result;
};

export const getAllPackageService = async (
  filter: Object,
  pagination: IPagination
): Promise<Partial<Package>[]> => {
  const { size, skip, sortCondition } = pagination;

  const result = await prisma.package.findMany({
    where: filter,
    take: size,
    skip,
    orderBy: sortCondition,
  });
  return result;
};

export const getSinglePackageService = async (id: string): Promise<Partial<Package> | null> => {
  const result = await prisma.package.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const updatePackageService = async (
  id: string,
  data: Partial<Package>
): Promise<Partial<Package> | null> => {
  const result = await prisma.package.update({
    where: { id },
    data,
  });
  return result;
};

export const removePackageService = async (id: string): Promise<void> => {
  await prisma.package.delete({
    where: { id },
  });
};
