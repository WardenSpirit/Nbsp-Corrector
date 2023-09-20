import { Config, loadNBSPNotation, loadRegexpsConfiguration } from "../settings/settingsAccess"
import { SearchExp } from '../regularexpressions/SearchExp'
import * as regexpsDB from './regularExpressionsDB'

export function loadRegexps(): SearchExp[] {
    const regexps: SearchExp[] = []
    addAlwaysOnRegexps(regexps)
    addRegexpsAccordingToConfiguration(regexps, loadRegexpsConfiguration())
    return regexps
}

function addAlwaysOnRegexps(regexps: SearchExp[]) {
    regexps.push(...regexpsDB.NUMBER_SEGMENTS)
    regexps.push(...regexpsDB.RATIOS)
    regexps.push(...regexpsDB.ANGLES_FT_IN)
    regexps.push(...regexpsDB.AMPERSAND)
    regexps.push(...regexpsDB.ASTERISK_CROSS)
    regexps.push(...regexpsDB.MIXED_NUMBERS)
    regexps.push(...regexpsDB.PREPOSITIONS_CONJUNCTIONS)
}

function addRegexpsAccordingToConfiguration(regexps: SearchExp[], regexpsConfiguration: Config) {
    if (regexpsConfiguration.aroundMath === "před") {       //zalamuje se před MO, NM vkládána za MO
        regexps.push(...regexpsDB.NBSP_AFTER_MATH)
        if (!regexpsConfiguration.dashes) regexps.push(...regexpsDB.NBSP_BEFORE_DASHES)
        if (!regexpsConfiguration.slashes) regexps.push(...regexpsDB.NBSP_BEFORE_SLASHES)
    }
    else {      //zalamuje se za MO, NM vkládána před MO
        regexps.push(...regexpsDB.NBSP_BEFORE_MATH)
        regexps.push(...regexpsDB.NBSP_BEFORE_DASHES)
        regexps.push(...regexpsDB.NBSP_BEFORE_SLASHES)
    }
    if (regexpsConfiguration.roman) regexps.push(...regexpsDB.IV_NOT_NUMERALS)
    if (regexpsConfiguration.datesValidation) regexps.push(...regexpsDB.VALIDATED_CALENDAR_DATES)
    else regexps.push(...regexpsDB.ALL_CALENDAR_DATES)
    if (regexpsConfiguration.degrees) regexps.push(...regexpsDB.DEGREES)
    if (regexpsConfiguration.mathParentheses) regexps.push(...regexpsDB.MATH_PARENTHESES)
    regexps.push(...(regexpsConfiguration.custom))
}