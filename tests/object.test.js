const getObjectName = require("../object");

test('prints the object name', () => {
    const testObject = {
        name: 'Diana'
    }
    expect(getObjectName(testObject)).toBe('Diana');
});