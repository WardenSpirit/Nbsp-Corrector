import { loadNBSPNotation, loadRegexpsConfiguration } from "../settings/settingsAccess"
import { SearchExp } from '../regularexpressions/SearchExp'

export function loadRegexps(): SearchExp[] {
    const regexps: SearchExp[] = []

    addAlwaysOnRegexps(regexps)
    const regexpsConfiguration = loadRegexpsConfiguration()
    if (regexpsConfiguration.aroundMath === "před") {       //zalamuje se před MO, NM vkládána za MO
        regexps.push(...NBSP_AFTER_MATH)
        if (!regexpsConfiguration.dashes) regexps.push(...NBSP_BEFORE_DASHES)
        if (!regexpsConfiguration.slashes) regexps.push(...NBSP_BEFORE_SLASHES)
    }
    else {      //zalamuje se za MO, NM vkládána před MO
        regexps.push(...NBSP_BEFORE_MATH)
        regexps.push(...NBSP_BEFORE_DASHES)
        regexps.push(...NBSP_BEFORE_SLASHES)
    }
    if (regexpsConfiguration.roman) regexps.push(...IV_NOT_NUMERALS)
    if (regexpsConfiguration.datesValidation) regexps.push(...VALIDATED_CALENDAR_DATES)
    else regexps.push(...ALL_CALENDAR_DATES)
    if (regexpsConfiguration.degrees) regexps.push(...DEGREES)
    if (regexpsConfiguration.mathParentheses) regexps.push(...MATH_PARENTHESES)
    regexps.push(...(regexpsConfiguration.custom))

    return regexps
}

function addAlwaysOnRegexps(regexps: SearchExp[]) {
    regexps.push(...NUMBER_SEGMENTS)
    regexps.push(...RATIOS)
    regexps.push(...ANGLES_FT_IN)
    regexps.push(...AMPERSAND)
    regexps.push(...ASTERISK_CROSS)
    regexps.push(...MIXED_NUMBERS)
    regexps.push(...PREPOSITIONS_CONJUNCTIONS)
}

// clear and always on
const NUMBER_SEGMENTS: SearchExp[] = [[/\s\d{1,3}(?:\s\d{2,3})+/g]]
const RATIOS: SearchExp[] = [[/\d\s*:\s*\d/g]]
const ANGLES_FT_IN: SearchExp[] = [
    [/\d*°(?:\s\d*')?(?:\s\d*")?/g],
    [/\d*'(?:\s\d*")?/g]]
const AMPERSAND: SearchExp[] = [[/&\s/g]]
const ASTERISK_CROSS: SearchExp[] = [
    [/\*†]\s[1-9]\d?\.\s?[1-9]\d?\./g],/*(?:\s\d+)?/g],*/       // poslední mezera by neměla být nezlomitelná.
    [/\*†]\s[1-9]\d?\.\s(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)/g/*(?:\s\d+)?/g*/]]      // díky přítomnosti hvězdičky/křížku není považováno za nutné data validovat
const MIXED_NUMBERS: SearchExp[] = [[/\d+\s\d+\/\d+?/g]]

// rough and allways on
const PREPOSITIONS_CONJUNCTIONS: SearchExp[] = [
    [/[kKsSzZoOuUaAvi]\s[\wA-ZĚŠČŘŽÝÁÍÉÚŮa-zěščřžýáíéúů\d]+/g],
    [/.\s[VI]\s[\wá-žÁ-Ž\d"'\[({.]/g, 1]]

// rough and switchable
const NBSP_AFTER_MATH: SearchExp[] = [[/\d\s[=<>≤≥+±×x·:÷]/g]]
const NBSP_BEFORE_MATH: SearchExp[] = [[/[=<>≤≥+±×x·:÷]\s\d/g]]
const NBSP_BEFORE_DASHES: SearchExp[] = [[/-\s\d/g]]
const NBSP_BEFORE_SLASHES: SearchExp[] = [[/\/\s\d/g]]

const IV_NOT_NUMERALS: SearchExp[] = [[/[IV]\s[\wA-ZĚŠČŘŽÝÁÍÉÚŮa-zěščřžýáíéúů\d]+/g]]
const VALIDATED_CALENDAR_DATES: SearchExp[] = [
    [/(?:[1-9]|[12][0-9]|3[01])\.\s?(?:[1-9]|1[0-2])(?:\s\d+)?/g],
    [/(?:[1-9]|[12][0-9]|3[01])\.\s?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)(?:\s\d+)?/g]]
const ALL_CALENDAR_DATES: SearchExp[] = [
    [/\d+\.\s?\d+\./g/*(?:\s\d+)?/g*/],
    [/\d+\.\s?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)/g/*(?:\s\d+)?/g*/]]
const DEGREES: SearchExp[] = [[/(?:(?:Bc\.|Mgr\.|Ing\.|Ph\.D\.|RNDr\.|CSc\.|DrSc\.|MUDr\.|PharmDr\.|JUDr\.|MVDr\.|Th\.D\.|MSc\.|doc\.|prof\.|gen\.|plk\.|mjr\.|kpt\.|por\.|pplk\.|ppor\.|nadpor\.|mjr\.|nadplk\.|gen\.por\.|brig\.|genmjr\.|genplk\.|genpor\.|gen\.|dipl\.|PhDr\.|ThLic\.|PaedDr\.|ThDr\.|PhMr\.|Phed\.|PaedIAG\.|ThMgr\.|RSDr\.|CSsR\.|ICB\.|OCSO\.|P\.Th\.|oec\.|Ing\.|Dr\.|ThLic\.|PharmDr\.|JUDr\.|MVDr\.|Th\.D\.|Ph\.D\.|MSc\.|doc\.|prof\.)\s(?:(?:et|&)\s)?)+[A-ZĚŠČŘŽÝÁÉÍÚŮ]/g]]
const MATH_PARENTHESES: SearchExp[] = [[/\([+-±×x·:÷\/\s\d,abcklmnxyz]+\)/g]]