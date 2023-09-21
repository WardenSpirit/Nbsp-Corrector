import { ConfigData, loadNBSPNotation, loadRegexpsConfiguration } from "../settings/settingsAccess"
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

function addRegexpsAccordingToConfiguration(regexps: SearchExp[], regexpsConfiguration: ConfigData) {
    if (regexpsConfiguration.wrapAroundMath === "před") {       //zalamuje se před MO, NM vkládána za MO
        regexps.push(...regexpsDB.NBSP_AFTER_MATH)
        if (!regexpsConfiguration.dashes) regexps.push(...regexpsDB.NBSP_BEFORE_DASHES)
        if (!regexpsConfiguration.slashes) regexps.push(...regexpsDB.NBSP_BEFORE_SLASHES)
    }
    else {      //zalamuje se za MO, NM vkládána před MO
        regexps.push(...regexpsDB.NBSP_BEFORE_MATH)
        regexps.push(...regexpsDB.NBSP_BEFORE_DASHES)
        regexps.push(...regexpsDB.NBSP_BEFORE_SLASHES)
    }
    if (regexpsConfiguration.romanCaution) regexps.push(...regexpsDB.IV_NOT_NUMERALS)
    if (regexpsConfiguration.datesValidation) {
        if (regexpsConfiguration.monthYearSeparation) regexps.push(...regexpsDB.VALIDATED_SEPARATED_CALENDAR_DATES)
        else regexps.push(...regexpsDB.VALIDATED_JOINED_CALENDAR_DATES)
    }
    else {
        if (regexpsConfiguration.monthYearSeparation) regexps.push(...regexpsDB.ALL_SEPARATED_CALENDAR_DATES)
        else regexps.push(...regexpsDB.ALL_JOINED_CALENDAR_DATES)
    }
    if (regexpsConfiguration.wrapAfterDegrees) regexps.push(...regexpsDB.DEGREES)
    if (regexpsConfiguration.wrapInMathParentheses) regexps.push(...regexpsDB.MATH_PARENTHESES)
    regexps.push(...(regexpsConfiguration.custom))
}