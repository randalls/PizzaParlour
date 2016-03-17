angular
.module(
    'pizza.ui.static-map.google-map.dir',
    [
        'lodash.js',
        'pizza.map.geo.service'
    ]
)
.directive(
    'staticMap',
    [
        function () {
            'use strict';

            var whitelist = [
                    'scale',
                    'maptype',
                    'markers',
                    'path',
                    'size',
                    'zoom',
                    'center'
                ];

            return {
                templateUrl: '/pizza/ui/map/static.google-map.html',
                scope: {
                    map: '=params',
                    responsive: '=?'
                },
                controller: [
                    '$log',
                    '$scope',
                    '$httpParamSerializer',
                    '$interpolate',
                    'limitToFilter',
                    'lodash',
                    'Geo',
                    function ($log, $scope, $httpParamSerializer, $interpolate, limitToFilter, _, geo) {
                        var ctrl = this,
                            defaults = {
                                center: {
                                    latitude: 33.45,
                                    longitude: -112.06
                                },
                                width: 600,
                                height: 288,
                                scale: 2,
                                maptype: 'satellite',
                                zoom: 14
                            };

                        ctrl.parseMap = function (map) {
                            var paths = [],
                                points = [],
                                params = angular.copy(defaults),
                                template = $interpolate('{{ center.latitude }},{{ center.longitude }}'),
                                result;

                            map = angular.extend(params, map);

                            if (map.parcels) {
                                angular.forEach(map.parcels, function (parcel) {
                                    points = _.map(parcel.PolygonGeoJson.coordinates[0], function (list) {
                                        return {
                                            center: {
                                                latitude: list[1],
                                                longitude: list[0],
                                            }
                                        };
                                    });
                                    angular.forEach(points, function (point) {
                                        paths.push([point.center.latitude, point.center.longitude]);
                                    });
                                });

                                map.path = 'color:0xFF0000CC|weight:2|fillcolor:0xFF000080|enc:' + geo.encodePolyLines(paths);
                            }

                            if (map.points) {
                                map.markers = '';
                                angular.forEach(map.points, function (group) {
                                    if (group.list.length) {
                                        points = [];
                                        map.markers += 'color:' + group.color + '|';
                                        angular.forEach(group.list, function (point) {
                                            points.push(template(point));
                                        });
                                        map.markers += points.join('|') + '|';
                                    }
                                });
                            }

                            map.size = $interpolate('{{ width }}x{{ height }}')(ctrl.map);
                            if (map.center) {
                                map.center = template(ctrl.map);
                            }

                            result = _.pick(map, whitelist);

                            return $httpParamSerializer(result);

                        };

                        $scope.$watchCollection('ctrl.map', function (map) {
                            if (map) {
                                var m = ctrl.parseMap(map);
                                ctrl.params = m;
                            }
                        });

                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true
            };
        }
    ]
);
