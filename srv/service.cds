using { galactic.spacefarer.Spacefarers as DbSpacefarers } from '../db/spacefarer.schema';
using { galactic.spacefarer.Departments as DbDepartments } from '../db/department.schema';
using { galactic.spacefarer.Positions as DbPositions } from '../db/position.schema';

@requires: 'authenticated-user'
service GalacticService {
    @odata.draft.enabled
    entity Spacefarers as projection on DbSpacefarers {
        ID,
        createdAt,
        createdBy,
        modifiedAt,
        modifiedBy,
        firstName,
        lastName,
        email,
        originPlanet,
        spacesuitColor,
        stardustCollection,
        wormholeNavigationSkill,
        position
    };

    entity Departments as projection on DbDepartments;
    entity Positions as projection on DbPositions;
}