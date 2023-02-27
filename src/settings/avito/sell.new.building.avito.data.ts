import { FiltersType } from "../../service/types"
import {StatusObjectType} from "./../types"

export const statusObject: StatusObjectType[] = ["Квартира", "Апартаменты"]
export const nameFiltersParams: FiltersType[] = ["byId" ,"byStatusObject" ,"byStatusPublic" ,"byRoom" ,"byComplex" ,"byAdres" ,"byWords" ,"byPrice" ,"bySquare" ,"byFloor"]
export const rooms = ["Студия", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10 и более", "Своб. планировка"]