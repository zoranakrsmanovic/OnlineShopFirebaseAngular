import { Item } from "./item";

export interface Orders{
    id:number;
    items: Array<Item>;
    user: string
}