var _ = require('lodash');

exports.dailies = function (req, res, next) {
    var results = require('../../test/mock/multifamily.response.json');
    _.delay(function () {
        res.json(results);
    }, 1000);
};

exports.property = function (req, res, next) {
    var results = require('../../test/mock/properties.response.json');
    res.json(results);
};

exports.companies = function (req, res, next) {
    var results = require('../../test/mock/companies.response.json');
    res.json(results);
};

exports.note = function (req, res, next) {
    res.json(
        [
            {
                user: {
                    userId: 'a07842ff-e4d0-4bf3-a614-9bd9ba8b19fd',
                    firstName: 'Randall',
                    lastName: 'Shimkus'
                },
                noteId: 1,
                noteDate: '/Date(1402987475227+0000)/',
                noteBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tortor mauris, porta sed leo eu, vehicula dapibus mauris. Fusce convallis lacus sed augue posuere tincidunt.'
            },
            {
                user: {
                    userId: 'a07842ff-e4d0-4bf3-a614-9bd9ba8b19fd',
                    firstName: 'Randall',
                    lastName: 'Shimkus'
                },
                noteId: 2,
                noteDate: '/Date(1402987475227+0000)/',
                noteBody: 'Nunc quis lorem facilisis, gravida felis rhoncus, sollicitudin magna. Praesent convallis leo sollicitudin, hendrerit ex in, efficitur metus. Nam auctor quam vitae ipsum sodales scelerisque. Suspendisse cursus lectus non magna accumsan volutpat.'
            },
            {
                user: {
                    userId: 'a07842ff-e4d0-4bf3-a614-12345',
                    firstName: 'Foo',
                    lastName: 'Bar'
                },
                noteId: 3,
                noteDate: '/Date(1402987475227+0000)/',
                noteBody: 'Fusce quis ullamcorper ipsum. Duis faucibus, orci vel fermentum hendrerit, mauris nisl vestibulum mauris, nec tincidunt felis dolor id magna. Duis rhoncus dolor magna, in lacinia elit consequat eu.'
            },
            {
                user: {
                    userId: 'a07842ff-e4d0-4bf3-a614-12345',
                    firstName: 'Foo',
                    lastName: 'Bar'
                },
                noteId: 4,
                noteDate: '/Date(1402987475227+0000)/',
                noteBody: 'Praesent convallis leo sollicitudin, hendrerit ex in, efficitur metus. Nam auctor quam vitae ipsum sodales scelerisque. Suspendisse cursus lectus non magna accumsan volutpat.'
            }
        ]
    );
};

exports.tag = function (req, res, next) {
    res.json(
        [
            {
                tagId: 1,
                tagName: 'escrow'
            },
            {
                tagId: 2,
                tagName: 'hot'
            },
            {
                tagId: 3,
                tagName: 'prospect'
            },
            {
                tagId: 4,
                tagName: 'closed'
            },
            {
                tagId: 5,
                tagName: 'foo'
            },
            {
                tagId: 6,
                tagName: 'bar'
            },
            {
                tagId: 7,
                tagName: 'baz'
            },
            {
                tagId: 8,
                tagName: 'cool'
            },
            {
                tagId: 9,
                tagName: 'neat'
            },
            {
                tagId: 10,
                tagName: 'spiffy'
            }
        ]
    );
};
