'use strict';

jest.disableAutomock();

describe('mathParser', function() {
    const mathParser = require('../mathParser');
    let query;

    beforeEach(function() {
        query = undefined;
    });

    it('resolves query from "2+4*12/3-1"', function() {
        query = '2+4*12/3-1';

        expect(mathParser(query)).toEqual(17);
    });

    it('resolves query "((3-(2/1))+((4+1)*5)+4*3-(2*5)) - 14"', function() {
        query = '((3-(2/1))+((4+1)*5)+4*3-(2*5)) - 14';

        expect(mathParser(query)).toEqual(14);
    });

});
