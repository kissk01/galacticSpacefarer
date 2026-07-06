namespace galactic.spacefarer;

using { cuid, managed } from '@sap/cds/common';
using { galactic.spacefarer.Departments } from './department.schema';
using { galactic.spacefarer.Spacefarers } from './spacefarer.schema';

entity Positions : cuid, managed {

    title       : String(100) @mandatory;
    level       : Integer default 1;
    description : String(255);

    department  : Association to Departments @mandatory;
    spacefarers : Association to many Spacefarers
                    on spacefarers.position = $self;
}