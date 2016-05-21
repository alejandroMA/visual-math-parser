'use strict';

jest.unmock('../queryParser');
jest.unmock('../../structures/Node');
jest.unmock('../../structures/Stack');

describe('queryParser', function() {
    const queryParser = require('../queryParser');
    let query;

    beforeEach(function() {
        query = '';
    });

    it('parses "50+34-4.2+63" to tree', function() {
        query = '50+34-4.2+63';

        expect(queryParser(query)).toEqual({
            data: '+',
            leftChild: {
                data: '-',
                leftChild: {
                    data: '+',
                    leftChild: {
                        data: 50,
                        leftChild: undefined,
                        rightChild: undefined
                    },
                    rightChild: {
                        data: 34,
                        leftChild: undefined,
                        rightChild: undefined
                    }
                },
                rightChild: {
                    data: 4.2,
                    leftChild: undefined,
                    rightChild: undefined
                }
            },
            rightChild: {
                data: 63,
                leftChild: undefined,
                rightChild: undefined
            }
        });
    });

    it('parses "(  ((50+34 ) * (4+63)  ))" to tree', function() {
        query = '(  ((50+34 ) * (4+63)  ))';

        expect(queryParser(query)).toEqual({
            data: '*',
            leftChild: {
                data: '+',
                leftChild: {
                    data: 50,
                    leftChild: undefined,
                    rightChild: undefined
                },
                rightChild: {
                    data: 34,
                    leftChild: undefined,
                    rightChild: undefined
                }
            },
            rightChild: {
                data: '+',
                leftChild: {
                    data: 4,
                    leftChild: undefined,
                    rightChild: undefined
                },
                rightChild: {
                    data: 63,
                    leftChild: undefined,
                    rightChild: undefined
                }
            }
        });
    });

    it('parses "15 + 3 * 4 / 2" to tree', function() {
        query = '15 + 3 * 4 / 2';

        expect(queryParser(query)).toEqual({
            data: '+',
            leftChild: {
                data: 15,
                leftChild: undefined,
                rightChild: undefined
            },
            rightChild: {
                data: '/',
                leftChild: {
                    data: '*',
                    leftChild: {
                        data: 3,
                        leftChild: undefined,
                        rightChild: undefined
                    },
                    rightChild: {
                        data: 4,
                        leftChild: undefined,
                        rightChild: undefined
                    }
                },
                rightChild: {
                    data: 2,
                    leftChild: undefined,
                    rightChild: undefined
                }
            }
        });
    });

    it('parses "5*4-3.2^3+1.445" to tree', function() {
        query = '-5*4-3.2^3+1.445';

        expect(queryParser(query)).toEqual({
            data: '+',
            leftChild: {
                data: '-',
                leftChild: {
                    data: '-',
                    leftChild: {
                        data: 0,
                        leftChild: undefined,
                        rightChild: undefined
                    },
                    rightChild: {
                        data: '*',
                        leftChild: {
                            data: 5,
                            leftChild: undefined,
                            rightChild: undefined
                        },
                        rightChild: {
                            data: 4,
                            leftChild: undefined,
                            rightChild: undefined
                        }
                    }
                },
                rightChild: {
                    data: '^',
                    leftChild: {
                        data: 3.2,
                        leftChild: undefined,
                        rightChild: undefined
                    },
                    rightChild: {
                        data: 3,
                        leftChild: undefined,
                        rightChild: undefined
                    }
                }
            },
            rightChild: {
                data: 1.445,
                leftChild: undefined,
                rightChild: undefined
            }
        });
    });
});
