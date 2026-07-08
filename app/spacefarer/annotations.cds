using GalacticService as service from '../../srv/service';

annotate service.Spacefarers with @(
    UI.FieldGroup #General : {
        $Type : 'UI.FieldGroupType',
        Data : [
            { $Type : 'UI.DataField', Label : 'First Name', Value : firstName },
            { $Type : 'UI.DataField', Label : 'Last Name', Value : lastName },
            { $Type : 'UI.DataField', Label : 'Email', Value : email },
            { $Type : 'UI.DataField', Label : 'Origin Planet', Value : originPlanet },
            { $Type : 'UI.DataField', Label : 'Spacesuit Color', Value : spacesuitColor },
            { $Type : 'UI.DataField', Label : 'Stardust Collection', Value : stardustCollection },
            { $Type : 'UI.DataField', Label : 'Wormhole Navigation Skill', Value : wormholeNavigationSkill },
            { $Type : 'UI.DataField', Label : 'Position', Value : position_ID },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneralInformation',
            Label : 'General Information',
            Target : '@UI.FieldGroup#General',
        },
    ],
);

annotate service.Spacefarers with {
    position_ID @(
        Common.Label : 'Position',
        Common.Text : position.title,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Positions',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : position_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'title',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'level',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'description',
                },
            ],
        }
    );
};

annotate service.Positions with {
    ID @UI.Hidden;
};