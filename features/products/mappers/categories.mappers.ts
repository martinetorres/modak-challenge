import { CategoriesDTO } from "../types/categories.dto";

export const dtoToListVM = (res: CategoriesDTO) => (
    res.map(cat => ({
        slug: cat.slug,
        name: cat.name
    }))
);