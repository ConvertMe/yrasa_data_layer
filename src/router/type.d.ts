import { FiltersType } from "../service/types";

export type RequestFiltersType = {
    byArgument?: [index: FiltersType, o: string][]
    byMinMax?: [index: FiltersType, o: number, t: number][]
}