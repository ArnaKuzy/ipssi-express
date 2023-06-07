const sum = require('../functions/sum')

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('Some success additions', () => {
    expect(sum(1, 1)).toBe(2)
    expect(sum(1, 4)).toBe(5)
    expect(sum(5, 5)).toBe(10)
    expect(sum(4, 8)).toBe(11)
    expect(sum(3, 3)).toBe(6)
})