angular
.module(
    'pizza.util.type.filter',
    [
        'pizza.util.list.filter',
        'lodash.js'
    ]
)
.filter(
    'type',
    [
        'lodash',
        'listFilter',
        function (_, listFilter) {
            'use strict';

            var lists = {
                    property: {
                        '1': 'Multi Family',
                        '2': 'Hospitality',
                        '3': 'Senior Facility',
                        '4': 'Hospital',
                        '5': 'Mobile',
                        '6': 'Storage',
                        '7': 'Retail',
                        '8': 'Office',
                        '9': 'Industrial',
                        '12': 'Lots',
                        '13': 'Golf',
                        '14': 'Land',
                        '15': 'Church/School'
                    },
                    event: {
                        '1': 'Debt',
                        '2': 'Notice of Trustee Sale',
                        '3': 'Planning And Zoning',
                        '4': 'Sales',
                        '5': 'Trustee Deed',
                        '6': 'Unverified'
                    }
                };

            return function(input, type) {
                var list = lists[type];

                if (angular.isArray(input)) {
                    return listFilter(_.values(_.pick(list, input)));
                }

                return list[input];
            };
        }
    ]
);
