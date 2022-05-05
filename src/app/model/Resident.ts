import { Address } from './Address';
import { User } from './User';
export class Resident {
    id : number;
    name : string;
    lastName : string;
    phone : string;
    user : User;
    addressList : Address[];
}