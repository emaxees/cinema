import { EntityMetadataMap } from '@ngrx/data';
import { Movie } from './types/movie.type';
import { Showing } from './types/showing.type';
import { TicketType } from './types/ticket-type';
import { User } from './types/user.type';

const entityMetadata: EntityMetadataMap = {
  User: {
    selectId: (user: User) => user.userID,
  },
  Movies: {
    selectId: (movie: Movie) => movie.id,
  },
  Showings: {
    selectId: (showing: Showing) => showing.id,
  },
  TicketTypes: {
    selectId: (ticketType: TicketType) => ticketType.id,
  },
};

const pluralNames = { User: 'Users', Movies: 'Movies', Showings: 'Showings', TicketTypes: 'TicketTypes' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
