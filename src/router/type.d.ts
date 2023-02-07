import { FiltersType } from "../service/types";

export type RequestFiltersType = {
    byArgument?: [index: FiltersType, o: string][]
    minMax?: [index: FiltersType, o: number, t: number][]
}