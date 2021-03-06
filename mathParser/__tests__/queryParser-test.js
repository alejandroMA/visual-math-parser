'use strict';

jest.disableAutomock();
// const pretty = require('js-object-pretty-print').pretty;

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

    it('parses "-5*4-3.2^3+1.445" to tree', function() {
        query = '-5*4-3.2^3+1.445';

        expect(queryParser(query)).toEqual({
            data: '+',
            leftChild: {
                data: '-',
                leftChild: {
                    data: '*',
                    leftChild: {
                        data: -5,
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

    it('handles negative numbers "2*-3--2"', function() {
        query = '2*-3--2';

        expect(queryParser(query)).toEqual({
            data: '-',
            leftChild: {
                data: '*',
                leftChild: {
                    data: 2,
                    leftChild: undefined,
                    rightChild: undefined
                },
                rightChild: {
                    data: -3,
                    leftChild: undefined,
                    rightChild: undefined
                }
            },
            rightChild: {
                data: -2,
                leftChild: undefined,
                rightChild: undefined
            }
        });
    });

    it('handles implicit multiplications "(2) (3)5-2(8/2*2)+45"', function() {
        query = '(2) (3)5-2(8/2*2)+45';

        expect(queryParser(query)).toEqual({
            data: '+',
            leftChild: {
                data: '-',
                leftChild: {
                    data: '*',
                    leftChild: {
                        data: '*',
                        leftChild: {
                            data: 2,
                            leftChild: undefined,
                            rightChild: undefined
                        },
                        rightChild: {
                            data: 3,
                            leftChild: undefined,
                            rightChild: undefined
                        }
                    },
                    rightChild: {
                        data: 5,
                        leftChild: undefined,
                        rightChild: undefined
                    }
                },
                rightChild: {
                    data: '*',
                    leftChild: {
                        data: 2,
                        leftChild: undefined,
                        rightChild: undefined
                    },
                    rightChild: {
                        data: '*',
                        leftChild: {
                            data: '/',
                            leftChild: {
                                data: 8,
                                leftChild: undefined,
                                rightChild: undefined
                            },
                            rightChild: {
                                data: 2,
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
                }
            },
            rightChild: {
                data: 45,
                leftChild: undefined,
                rightChild: undefined
            }
        });
    });
});
