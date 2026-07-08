using { galactic.spacefarer as db } from '../db/department.schema';

@requires: 'authenticated-user'
service GalacticService {

    entity Spacefarers as projection on db.Spacefarers;

    entity Departments as projection on db.Departments;

    entity Positions as projection on db.Positions;
}