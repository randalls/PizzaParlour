describe('Syntax parser', function () {

    var optionParser, scope, filterFilter;

    beforeEach(module('vizzda-lib.parse.option-parser.service'));
    beforeEach(inject(['$rootScope', 'filterFilter', 'vzdOptionParser', function (_$rootScope_, _filterFilter_, _optionParser_) {
        optionParser = _optionParser_;
        scope = _$rootScope_;
        filterFilter = _filterFilter_;
    }]));

    it('should parse the simplest array-based syntax', function () {
        scope.states = ['Alabama', 'California', 'Delaware'];
        var result = optionParser.parse('state for state in states | filter:$viewValue');

        var itemName = result.itemName;
        var locals = {$viewValue:'al'};
        expect(result.source(scope, locals)).to.eql(['Alabama', 'California']);

        locals[itemName] = 'Alabama';
        expect(result.viewMapper(scope, locals)).to.eql('Alabama');
        expect(result.modelMapper(scope, locals)).to.eql('Alabama');
    });

    it('should parse the simplest function-based syntax', function () {
        scope.getStates = function ($viewValue) {
          return filterFilter(['Alabama', 'California', 'Delaware'], $viewValue);
        };
        var result = optionParser.parse('state for state in getStates($viewValue)');

        var itemName = result.itemName;
        var locals = {$viewValue:'al'};
        expect(result.source(scope, locals)).to.eql(['Alabama', 'California']);

        locals[itemName] = 'Alabama';
        expect(result.viewMapper(scope, locals)).to.eql('Alabama');
        expect(result.modelMapper(scope, locals)).to.eql('Alabama');
    });

    it('should allow to specify custom model mapping that is used as a label as well', function () {

        scope.states = [
          {code:'AL', name:'Alabama'},
          {code:'CA', name:'California'},
          {code:'DE', name:'Delaware'}
        ];
        var result = optionParser.parse('state.name for state in states | filter:$viewValue | orderBy:"name":true');

        var itemName = result.itemName;
        expect(itemName).to.eql('state');
        expect(result.source(scope, {$viewValue:'al'})).to.eql([
          {code:'CA', name:'California'},
          {code:'AL', name:'Alabama'}
        ]);

        var locals = {$viewValue:'al'};
        locals[itemName] = {code:'AL', name:'Alabama'};
        expect(result.viewMapper(scope, locals)).to.eql('Alabama');
        expect(result.modelMapper(scope, locals)).to.eql('Alabama');
    });

    it('should allow to specify custom view and model mappers', function () {

        scope.states = [
          {code:'AL', name:'Alabama'},
          {code:'CA', name:'California'},
          {code:'DE', name:'Delaware'}
        ];
        var result = optionParser.parse('state.code as state.name + " ("+state.code+")" for state in states | filter:$viewValue | orderBy:"name":true');

        var itemName = result.itemName;
        expect(result.source(scope, {$viewValue:'al'})).to.eql([
            {code:'CA', name:'California'},
            {code:'AL', name:'Alabama'}
        ]);

        var locals = {$viewValue:'al'};
        locals[itemName] = {code:'AL', name:'Alabama'};
        expect(result.viewMapper(scope, locals)).to.eql('Alabama (AL)');
        expect(result.modelMapper(scope, locals)).to.eql('AL');
    });
});
