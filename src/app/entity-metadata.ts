import { EntityMetadataMap } from '@ngrx/data';
import { User } from './types/user.type';

const entityMetadata: EntityMetadataMap = {
  User: {
    selectId: (user: User) => user.userID,
  },
  Movie: {
    selectId: () => Math.random(),
  },
};

const pluralNames = { User: 'Users', Movie: 'Movies' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
