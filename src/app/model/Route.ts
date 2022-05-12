import { CollectionPoint } from './CollectionPoint';
import { Recycler } from 'src/app/model/Recycler';
import { User } from './User';

export class Route{
    id : number;
    startDate : Date;
    endDate : Date;
    recycler : number;
    listaRecycler : User;
    collectionPoints : CollectionPoint[];
    user : User;
}