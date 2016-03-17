angular
.module(
    'pizza.util.replace.filter',
    []
)
.filter(
    'replace',
    [
        function() {
            'use strict';

            return function(str, pattern, replacement, glob) {
                glob = (typeof glob === 'undefined' ? true : glob);
                try {
                    str = str ? (typeof glob === 'string' ? str : str.toString()) : '';
                    return str.replace(
                        new RegExp(pattern, glob ? 'g' : ''),
                        function() {
                            return replacement;
                        }
                    );
                } catch (e) {
                    console.error('error in string.replace', e);
                    return (str || '');
                }
            };
        }
    ]
);
