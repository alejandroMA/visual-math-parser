'use strict';

const OperatorsHandler = require('./OperatorsHandler');

function prepareQuery(query) {
    query = trimWhitSpaces(query);
    query = insertImplicitMultiplications(query);

    return query;
}


function trimWhitSpaces(string) {
    return string.replace(/\s/g, '');
}

function insertImplicitMultiplications(query) {
    let implicitMultiplicationsIndexes = [];
    let oph = OperatorsHandler(query, 0, query.length - 1);

    find();
    insert();

    return query;


    function find() {
        for (let i = 0; i < query.length; i++) {
            if (IsthereMultiplicationByOpeningBraceAt(i)) {
                implicitMultiplicationsIndexes.push(i - 1);
            }
            if (IsthereMultiplicationByClosingBraceAt(i)) {
                implicitMultiplicationsIndexes.push(i);
            }
        }
    }

    function IsthereMultiplicationByOpeningBraceAt(i) {
        if (query[i] === '(') {
            if ((i !== 0) &&
                (query[i - 1] !== '(') &&
                (query[i - 1] !== ')') &&
                (!oph.isCharAtIndexAnOperator(i - 1)))
            {
                return true;
            }
        }

        return false;
    }

    function IsthereMultiplicationByClosingBraceAt(i) {
        if (query[i] === ')') {
            if ((i !== query.length - 1) &&
                (query[i + 1] !== ')') &&
                (!oph.isCharAtIndexAnOperator(i + 1)))
            {
                return true;
            }
        }

        return false;
    }

    function insert() {
        for (let j = implicitMultiplicationsIndexes.length - 1; j >= 0; j--) {
            let index = implicitMultiplicationsIndexes[j];
            let queryBefore = query.substring(0, index + 1);
            let queryAfter = query.substring(index + 1);

            query = queryBefore + '*' + queryAfter;
        }
    }
}

module.exports = prepareQuery;
