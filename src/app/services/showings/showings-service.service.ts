import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Showing } from 'src/app/types/showing.type';


@Injectable({ providedIn: 'root' })
export class ShowingsService extends EntityCollectionServiceBase<Showing> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Showings', serviceElementsFactory);
    }
}