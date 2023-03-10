import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { User } from 'src/app/types/user.type';


@Injectable({ providedIn: 'root' })
export class UserService extends EntityCollectionServiceBase<User> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('User', serviceElementsFactory);
    }
}
