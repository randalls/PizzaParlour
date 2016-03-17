'use strict';

describe('Note Service', function() {

    var apiMap = {
            get: '/UserPropertyNotes/Get',
            post: '/UserPropertyNotes/Create',
            put: '/UserPropertyNotes/Update',
            delete: '/UserPropertyNotes/Delete'
        },
        note = {
            CreatedOn: '2015-06-05T16:32:41.827',
            Note: 'test',
            NoteOwnerFirstName: 'Ryan',
            NoteOwnerLastName: 'Mathis',
            PropertyId: 6807,
            UpdatedOn: '2015-06-05T16:32:41.827',
            UserId: 2640,
            UserPropertyNoteId: 180
        },
        noteList = [angular.copy(note), angular.copy(note)];

    beforeEach(function () {
        module('vizzda.note.service', function ($provide) {
            $provide.factory('vzdApi', function($http) {
                return $http;
            });

            $provide.factory('lodash', function() {
                return _;
            });
        });
    });

    describe('get method', function () {
        it('should return a list of notes',
            inject(['$httpBackend', '$httpParamSerializer', 'Note', function ($httpBackend, $httpParamSerializer, Note) {
                var params = $httpParamSerializer({
                        propertyId: note.PropertyId,
                        userId: note.UserId
                    });
                $httpBackend.whenGET(apiMap.get + '?' + params).respond(noteList);
                expect(Note.get(note.PropertyId, note.UserId)).to.eventually.be.an('array');
                expect(Note.get(note.PropertyId, note.UserId)).to.eventually.eql(noteList);
                $httpBackend.flush();
            }])
        );
    });

    describe('create method', function () {
        it('should post a new note to the server and respond with a fully qualified note object',
            inject(['$httpBackend', '$httpParamSerializer', 'Note', function ($httpBackend, $httpParamSerializer, Note) {
                $httpBackend.whenPOST(apiMap.post).respond(note);
                expect(Note.create(note.Note, note.PropertyId, note.UserId)).to.eventually.eql(note);
                $httpBackend.flush();
            }])
        );
    });

    describe('update method', function () {
        it('should post a new note to the server and respond with a fully qualified note object',
            inject(['$httpBackend', '$httpParamSerializer', 'Note', function ($httpBackend, $httpParamSerializer, Note) {
                $httpBackend.whenPUT(apiMap.put).respond(note);
                expect(Note.update(note)).to.eventually.eql({Note: note.Note, UpdatedOn: note.UpdatedOn});
                $httpBackend.flush();
            }])
        );
    });

    describe('update method', function () {
        it('should post a new note to the server and respond with a fully qualified note object',
            inject(['$httpBackend', '$httpParamSerializer', 'Note', function ($httpBackend, $httpParamSerializer, Note) {
                $httpBackend.whenDELETE([apiMap.delete, note.UserPropertyNoteId].join('/')).respond(null);
                expect(Note.delete(note)).to.eventually.eql(null);
                $httpBackend.flush();
            }])
        );
    });
});
