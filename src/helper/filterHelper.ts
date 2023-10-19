import { Request } from "express";
import { IPartialSearchableFields } from "../shared/globalInterfaces";
import { pic } from "./paginationHelper";

const filterHelper = (
  req: Request,
  keys: string[],
  partialSearching: IPartialSearchableFields
): { [key: string]: object } => {
  const filter = pic(req.query, keys);
  const { search, ...filterData } = filter;
  const andCondition = [];

  // partial searching
  if (search && partialSearching.length > 0) {
    andCondition.push({
      OR: partialSearching.map((field) => ({
        [field]: {
          contains: search,
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.entries(filterData).map(([key, value]) => {
        if (key === "category") {
          return { categoryId: value };
        } else if (key === "minPrice") {
          return { price: { gte: Number(value) } };
        } else if (key === "maxPrice") {
          return { price: { lte: Number(value) } };
        } else {
          return { [key]: value };
        }
      }),
    });
  }

  return andCondition.length > 0 ? { AND: andCondition } : {};
};

export default filterHelper;
