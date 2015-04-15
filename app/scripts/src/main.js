var _ = require('underscore'),
    names = ['Bruce Wayne', 'Wally West', 'John Jones', 'Kyle Rayner', 'Arthur Curry', 'Clark Kent'],
    otherNames = ['Barry Allen', 'Hal Jordan', 'Kara Kent', 'Diana Prince', 'Ray Palmer', 'Oliver Queen'];

function findSuperman(values) {
    'use strict';
    _.find(values, function(name) {
        if (name === 'Clark Kent') {
            console.log('It\'s Superman!');
        } else {
            console.log('Nope, no Superman');
        }
    });
}

_.each([names, otherNames], function(nameGroup) {
    'use strict';
    findSuperman(nameGroup);
});
