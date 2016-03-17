'use strict';

describe('Api Service', function() {

    var Api, $httpBackend;

    beforeEach(module('vizzda-lib.http.api.service'));

    beforeEach(module(['vzdApiProvider', function (ApiProvider) {
        ApiProvider.setApiPath('/foo/bar');
    }]));

    beforeEach(inject(['vzdApi', '$httpBackend', function (_Api_, _$httpBackend_) {
        Api = _Api_;
        $httpBackend = _$httpBackend_;
    }]));

    it('should prepend the url of a GET $http request with the supplied prefix', function (done) {
        $httpBackend.whenGET('/foo/bar/baz').respond('success');
        Api.get('/baz').then(function (response) {
            expect(response.data).to.equal('success');
            done();
        });
        $httpBackend.flush();
    });

    it('should prepend the url of a POST $http request with the supplied prefix', function (done) {
        $httpBackend.whenPOST('/foo/bar/baz').respond('success');
        Api.post('/baz').then(function (response) {
            expect(response.data).to.equal('success');
            done();
        });
        $httpBackend.flush();
    });

    it('should prepend the url of a PUT $http request with the supplied prefix', function (done) {
        $httpBackend.whenPUT('/foo/bar/baz').respond('success');
        Api.put('/baz').then(function (response) {
            expect(response.data).to.equal('success');
            done();
        });
        $httpBackend.flush();
    });

    it('should prepend the url of a DELETE $http request with the supplied prefix', function (done) {
        $httpBackend.whenDELETE('/foo/bar/baz').respond('success');
        Api.delete('/baz').then(function (response) {
            expect(response.data).to.equal('success');
            done();
        });
        $httpBackend.flush();
    });

    it('should prepend the url of a HEAD $http request with the supplied prefix', function (done) {
        $httpBackend.whenHEAD('/foo/bar/baz').respond('success');
        Api.head('/baz').then(function (response) {
            expect(response.data).to.equal('success');
            done();
        });
        $httpBackend.flush();
    });

    it('should prepend the url of a PATCH $http request with the supplied prefix', function (done) {
        $httpBackend.whenPATCH('/foo/bar/baz').respond('success');
        Api.patch('/baz').then(function (response) {
            expect(response.data).to.equal('success');
            done();
        });
        $httpBackend.flush();
    });

    it('should prepend the url of a JSONP $http request with the supplied prefix', function (done) {
        $httpBackend.whenJSONP('/foo/bar/baz').respond('success');
        Api.jsonp('/baz').then(function (response) {
            expect(response.data).to.equal('success');
            done();
        });
        $httpBackend.flush();
    });
});
