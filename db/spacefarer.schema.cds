namespace galactic.spacefarer;

using { cuid, managed } from '@sap/cds/common';
using { galactic.spacefarer.Positions } from './position.schema';

entity Spacefarers : cuid, managed {

    firstName                : String(100) @mandatory;
    lastName                 : String(100) @mandatory;
    email                    : String(255) @mandatory;
    originPlanet             : String(100) @mandatory;
    spacesuitColor           : String(50);
    stardustCollection       : Decimal(15,2) default 0;
    wormholeNavigationSkill  : Integer default 0;
    position : Association to Positions @mandatory;
}