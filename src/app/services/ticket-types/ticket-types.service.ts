import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { TicketType } from 'src/app/types/ticket-type';


@Injectable({ providedIn: 'root' })
export class TicketTypesService extends EntityCollectionServiceBase<TicketType> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('TicketTypes', serviceElementsFactory);
    }
}
