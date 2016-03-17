angular
.module(
    'pizza.util.moment.filter',
    [
        'moment.js'
    ]
)
.filter(
    'moment',
    [
        'moment',
        'DEFAULT_DATE_FORMAT',
        'TIME_ZONES',
        'vzdSession',
        function(moment, DEFAULT_DATE_FORMAT, TIME_ZONES, session) {
            'use strict';

            //2015-06-11T15:58:33-07:00

            var defaultOutput = 'M/D/YYYY',
                zone = TIME_ZONES[session.get('marketId') || 1];

            return function(input, format, providedFormat, fromNow) {
                //var d = moment.utc(input, providedFormat || DEFAULT_DATE_FORMAT).tz(zone);
                var d = moment.utc(input, providedFormat || DEFAULT_DATE_FORMAT);  //NOTE - not going to factor for time zones currently because all entry is occurring in PHX
                if (fromNow) {
                    return d.calendar(moment.max(d, moment()), {
                        sameDay: '[Today]',
                        nextDay: '[Tomorrow]',
                        nextWeek: 'dddd',
                        lastDay: '[Yesterday]',
                        lastWeek: '[Last] dddd'
                    });
                }

                return d.format(fromNow ? null : (format || defaultOutput));
            };
        }
    ]
);
