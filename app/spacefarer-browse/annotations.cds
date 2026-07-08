using GalacticService as service from '../../srv/service';
annotate service.Spacefarers with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'firstName',
            Value : firstName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'lastName',
            Value : lastName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'email',
            Value : email,
        },
        {
            $Type : 'UI.DataField',
            Label : 'originPlanet',
            Value : originPlanet,
        },
        {
            $Type : 'UI.DataField',
            Label : 'spacesuitColor',
            Value : spacesuitColor,
        },
    ]
);

