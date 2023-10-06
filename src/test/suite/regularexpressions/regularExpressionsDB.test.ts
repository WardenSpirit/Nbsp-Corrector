import * as assert from 'assert';
import * as vscode from 'vscode';
import * as regexpDB from '../../../runcode/regularexpressions/regularExpressionsDB';

const TEST_STRINGS: Record<string, [string, RegExp[], boolean]> = {
    // clear and always on
    NUMBER_SEGMENTS: ['54 321', regexpDB.NUMBER_SEGMENTS, true],
    RATIOS: ['25 : 12', regexpDB.RATIOS, true],
    ANGLES: ['17° 15\'', regexpDB.ANGLES_FT_IN, true],
    FT_IN: ['12\' 3\"', regexpDB.ANGLES_FT_IN, true],
    AMPERSAND: ['Otec & syn', regexpDB.AMPERSAND, true],
    ASTERISK: ['* 7. března 1850', regexpDB.ASTERISK_CROSS, true],
    CROSS: ['† 14. 9. 1937', regexpDB.ASTERISK_CROSS, true],
    MIXED_NUMBERS: ['2 1/2', regexpDB.MIXED_NUMBERS, true],

    // rough and allways on
    PREPOSITION_K: ['K domu', regexpDB.PREPOSITIONS_CONJUNCTIONS, true],
    PREPOSITION_K_NEGATIVE: ['Pytlák zde přichystal past.', regexpDB.PREPOSITIONS_CONJUNCTIONS, false],
    PREPOSITION_S: ['S bratrem', regexpDB.PREPOSITIONS_CONJUNCTIONS, true],
    PREPOSITION_V: ['První už byl v cíli.', regexpDB.PREPOSITIONS_CONJUNCTIONS, true],
    PREPOSITION_Z: ['z Prahy', regexpDB.PREPOSITIONS_CONJUNCTIONS, true],
    PREPOSITION_Z_NEGATIVE: ['řez ', regexpDB.PREPOSITIONS_CONJUNCTIONS, false],
    PREPOSITION_O: ['Byl připraven již o půl sedmé.', regexpDB.PREPOSITIONS_CONJUNCTIONS, true],
    PREPOSITION_U: ['Hráli si u rybníka.', regexpDB.PREPOSITIONS_CONJUNCTIONS, true],
    CONJUNCTION_A: ['Harry, Hermiona a Ron', regexpDB.PREPOSITIONS_CONJUNCTIONS, true],
    CONJUNCTION_A_NEGATIVE: ['Auto alfa Romeo', regexpDB.PREPOSITIONS_CONJUNCTIONS, false],
    CONJUNCTION_I: ['bratr i sestra', regexpDB.PREPOSITIONS_CONJUNCTIONS, true],

    // rough and switchable
    NBSP_AFTER_MATH: ['7 + 1 je 8', regexpDB.NBSP_AFTER_MATH, true],
    NBSP_BEFORE_MATH: ['7 = 3 + 4', regexpDB.NBSP_BEFORE_MATH, true],
    NBSP_BEFORE_MATH_NEGATIVE: ['7=3+4', regexpDB.NBSP_BEFORE_MATH, false],
    NBSP_BEFORE_MINUSES: ['trať Praha - Karlštejn', regexpDB.NBSP_BEFORE_MINUSES, true],
    NBSP_BEFORE_SLASHES: ['vyplňte / nechte prázdné', regexpDB.NBSP_BEFORE_SLASHES, true],

    IV_NOT_NUMERALS: ['V cíli se už mohl radovat.', regexpDB.IV_NOT_NUMERALS, true],

    VALIDATED_SEPARATED_CALENDAR_DATES: ['17. 11.', regexpDB.VALIDATED_SEPARATED_CALENDAR_DATES, true],
    VALIDATED_JOINED_CALENDAR_DATES: ['8. května 1945', regexpDB.VALIDATED_JOINED_CALENDAR_DATES, true],
    ALL_SEPARATED_CALENDAR_DATES: ['29. února', regexpDB.ALL_SEPARATED_CALENDAR_DATES, true],
    ALL_JOINED_CALENDAR_DATES: ['32. 12. 2023', regexpDB.ALL_JOINED_CALENDAR_DATES, true],

    DEGREES: ['gen. PhDr. Milan Rastislav Štefánik', regexpDB.DEGREES, true],
    DEGREES_NEGATIVE: ['gen nese genetickou informaci', regexpDB.DEGREES, false],
    MATH_PARENTHESES: ['(ax + by - 1)^2 = 0', regexpDB.MATH_PARENTHESES, true]
}

suite('RegexpsDB test suite', () => {
    for (const key in TEST_STRINGS) {
        test(key + ' test', () => {

            const tested: string = TEST_STRINGS[key][0]
            const testedRegexps: RegExp[] = TEST_STRINGS[key][1]
            const shouldFind: boolean = TEST_STRINGS[key][2]

            var didFind = false
            for (const regexp of testedRegexps) {
                const contained = regexp.exec(tested)
                if (contained) {
                    regexp.lastIndex = 0
                    didFind = true
                    break
                }
            }

            assert(didFind == shouldFind)
        })
    }
})