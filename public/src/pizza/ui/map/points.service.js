angular
.module(
    'pizza.ui.map.points.service',
    [
        'lodash.js',
        'pizza-lib.util.filters.price'
    ]
)
.service(
    'MapPoints',
    [
        '$log',
        'lodash',
        'priceFilter',
        function ($log, _, priceFilter) {
            'use strict';
            var service = {};

            service.getPointsFromEvents = function (events) {
                return _.map(events, function (ev) {
                    return {
                        center: {
                            latitude: ev.Property.Latitude,
                            longitude: ev.Property.Longitude
                        },
                        label: (ev.SalePrice) ? priceFilter(ev.SalePrice) : ev.Property.PropertyName
                    };
                });
            };

            return service;
        }
    ]
);
