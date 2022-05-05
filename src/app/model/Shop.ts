import { User } from './User';
import { Address } from './Address';
import { Order } from './Order';
export class Shop {
    id : number;
    name : string;
    documentType : string;
    document : string;
    phone : string;
    image : any;
    user : User;
    address : Address;
    orderList : Order[];
}