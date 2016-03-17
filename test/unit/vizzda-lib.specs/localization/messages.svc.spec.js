describe('Localization: Messages-service', function() {
    var MessagesProvider,
        Messages;

    beforeEach(function() {
        module('vizzda-lib.localization.messages.service');
    });

    it('should switch the current locale on load unless preload is set', function() {
        module(['vzdMessagesProvider', function(_MessagesProvider_) {
            MessagesProvider = _MessagesProvider_;

            MessagesProvider.addCache('en', '/my/path/to/Messages_en.json', {
                code: {
                    name: 'string1'
                }
            });

            MessagesProvider.addCache('es', '/my/path/to/Messages_es.json', {
                code: {
                    name: 'el string-o'
                }
            });
        }]);

        inject(function($injector) {
            Messages = $injector.get('vzdMessages');
        });

        Messages.load('es');
        Messages.load('en', null, true);

        expect(Messages.getCurrentLocale()).to.be.equal('es');
    });

    it('should not set the locale to one that does not exist', function() {
        module(['vzdMessagesProvider', function(_MessagesProvider_) {
            MessagesProvider = _MessagesProvider_;

            MessagesProvider.addCache('en', '/my/path/to/Messages_en.json', {
                code: {
                    name: 'string1'
                }
            });
        }]);

        inject(function($injector) {
            Messages = $injector.get('vzdMessages');
        });

        Messages.load();

        var setLocaleTest = function () {
                return Messages.setCurrentLocale('es');
            };

        expect(setLocaleTest).to.throw(Error);
        expect(Messages.getCurrentLocale()).to.be.equal('en');
    });

    it('should allow consumer to set autoload', function() {
        module(['vzdMessagesProvider', function(_MessagesProvider_) {
            MessagesProvider = _MessagesProvider_;

            MessagesProvider.setAutoLoad(false);
        }]);

        inject(function($injector) {
            Messages = $injector.get('vzdMessages');
        });

        expect(Messages.autoLoad, 'Messages.autoload').to.be.false;
    });

    it('should allow users to add raw json object to the pre-load', function() {
        module(['vzdMessagesProvider', function(_MessagesProvider_) {
            MessagesProvider = _MessagesProvider_;

            MessagesProvider.addCache('en', '/my/path/to/Messages_en.json', {
                code: {
                    name: 'string1'
                }
            });
        }]);

        inject(function($injector) {
            Messages = $injector.get('vzdMessages');
        });

        expect(Messages.getMessage('code.name')).to.be.equal('string1');
    });

    it('should get message or default value', function() {
        module(['vzdMessagesProvider', function(_MessagesProvider_) {
            MessagesProvider = _MessagesProvider_;

            MessagesProvider.addCache('en', '/my/path/to/Messages_en.json', {
                code: {
                    name: 'string1 hello'
                }
            });
        }]);

        inject(function($injector) {
            Messages = $injector.get('vzdMessages');
        });

        expect(Messages.getMessageOrDefault('code.name', 'myDefaultString')).to.be.equal('string1 hello');
        expect(Messages.getMessageOrDefault('code.something', 'myDefaultString')).to.be.equal('myDefaultString');
    });

    describe('getMessage', function() {
        beforeEach(function() {
            var $httpBackend, requestHandler, esRequestHandler;

            module(['vzdMessagesProvider', function(_MessagesProvider_) {
                MessagesProvider = _MessagesProvider_;
                MessagesProvider.setAutoLoad(false);
                MessagesProvider.addLanguageFile('en', '/my/path/to/message_en.json');
                MessagesProvider.addLanguageFile('es', '/my/path/to/message_es.json');
            }]);

            inject(function($injector, _$httpBackend_) {
                Messages = $injector.get('vzdMessages');
                $httpBackend = _$httpBackend_;
                requestHandler = $httpBackend.when('GET', '/my/path/to/message_en.json');
                esRequestHandler = $httpBackend.when('GET', '/my/path/to/message_es.json');
            });

            requestHandler.respond({
                code: {
                    name: 'string1'
                }
            });

            esRequestHandler.respond({
                code: {
                    name: 'el string-o'
                }
            });

            $httpBackend.expectGET('/my/path/to/message_en.json');
            $httpBackend.expectGET('/my/path/to/message_es.json');

            Messages.load();
            Messages.load('es', null, true);

            $httpBackend.flush();
        });

        it('should load Messages file', function() {
            expect(Messages.getMessage('code.name')).to.be.equal('string1');
        });

        it('should return null if no keys are specified in code', function() {
            expect(Messages.getMessage('')).to.be.null;
        });

        it('should allow the locale to be overridden per call', function() {
            expect(Messages.getMessage('code.name', false, 'es')).to.be.equal('el string-o');
        });
    });
});
