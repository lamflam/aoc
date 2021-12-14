import { part1, part2 } from '.';

describe('day6', () => {
    test('part1', () => {
        expect(part1('testInput.txt')).toBe(5934);
        console.log(part1('input.txt'));
    });

    test('part2', () => {
        expect(part2('testInput.txt')).toBe(26984457539);
        console.log(part2('input.txt'));
    });
});
