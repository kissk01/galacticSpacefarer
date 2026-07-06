namespace galactic.spacefarer;

using { cuid, managed } from '@sap/cds/common';
using { galactic.spacefarer.Positions } from './position.schema';

entity Departments : cuid, managed {

    name        : String(100) @mandatory;
    description : String(255);
    positions : Association to many Positions
                  on positions.department = $self;
}