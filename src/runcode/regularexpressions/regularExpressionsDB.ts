import { SearchExp } from '../regularexpressions/SearchExp'

// clear and always on
export const NUMBER_SEGMENTS: SearchExp[] = [[/\b\d{1,3}(?:\s\d{2,3})+\b/g]]
export const RATIOS: SearchExp[] = [[/\d\s*:\s*\d/g]]
export const ANGLES_FT_IN: SearchExp[] = [
    [/\d*°(?:\s\d*')?(?:\s\d*")?/g],
    [/\d*'(?:\s\d*")?/g]]
export const AMPERSAND: SearchExp[] = [[/&\s/g]]
export const ASTERISK_CROSS: SearchExp[] = [
    [/\*†]\s[1-9]\d?\.\s?[1-9]\d?\./g],/*(?:\s\d+)?/g],*/       // poslední mezera by neměla být nezlomitelná.
    [/\*†]\s[1-9]\d?\.\s(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)/g/*(?:\s\d+)?/g*/]]      // díky přítomnosti hvězdičky/křížku není považováno za nutné data validovat
export const MIXED_NUMBERS: SearchExp[] = [[/\d+\s\d+\/\d+?/g]]

// rough and allways on
export const PREPOSITIONS_CONJUNCTIONS: SearchExp[] = [
    [/[kKsSzZoOuUaAvi]\s[\wA-ZĚŠČŘŽÝÁÍÉÚŮa-zěščřžýáíéúů\d]+/g],
    [/.\s[VI]\s[\wá-žÁ-Ž\d"'\[({.]/g, 1]]

// rough and switchable
export const NBSP_AFTER_MATH: SearchExp[] = [[/\d\s[=<>≤≥+±×x·:÷]/g]]
export const NBSP_BEFORE_MATH: SearchExp[] = [[/[=<>≤≥+±×x·:÷]\s\d/g]]
export const NBSP_BEFORE_DASHES: SearchExp[] = [[/-\s\d/g]]
export const NBSP_BEFORE_SLASHES: SearchExp[] = [[/\/\s\d/g]]

export const IV_NOT_NUMERALS: SearchExp[] = [[/[IV]\s[\wA-ZĚŠČŘŽÝÁÍÉÚŮa-zěščřžýáíéúů\d]+/g]]
export const VALIDATED_CALENDAR_DATES: SearchExp[] = [
    [/(?:[1-9]|[12][0-9]|3[01])\.\s?(?:[1-9]|1[0-2])(?:\s\d+)?/g],
    [/(?:[1-9]|[12][0-9]|3[01])\.\s?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)(?:\s\d+)?/g]]
export const ALL_CALENDAR_DATES: SearchExp[] = [
    [/\d+\.\s?\d+\./g/*(?:\s\d+)?/g*/],
    [/\d+\.\s?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)/g/*(?:\s\d+)?/g*/]]
export const DEGREES: SearchExp[] = [[/(?:(?:Bc\.|Mgr\.|Ing\.|Ph\.D\.|RNDr\.|CSc\.|DrSc\.|MUDr\.|PharmDr\.|JUDr\.|MVDr\.|Th\.D\.|MSc\.|doc\.|prof\.|gen\.|plk\.|mjr\.|kpt\.|por\.|pplk\.|ppor\.|nadpor\.|mjr\.|nadplk\.|gen\.por\.|brig\.|genmjr\.|genplk\.|genpor\.|gen\.|dipl\.|PhDr\.|ThLic\.|PaedDr\.|ThDr\.|PhMr\.|Phed\.|PaedIAG\.|ThMgr\.|RSDr\.|CSsR\.|ICB\.|OCSO\.|P\.Th\.|oec\.|Ing\.|Dr\.|ThLic\.|PharmDr\.|JUDr\.|MVDr\.|Th\.D\.|Ph\.D\.|MSc\.|doc\.|prof\.)\s(?:(?:et|&)\s)?)+[A-ZĚŠČŘŽÝÁÉÍÚŮ]/g]]
export const MATH_PARENTHESES: SearchExp[] = [[/\([+-±×x·:÷\/\s\d,abcklmnxyz]+\)/g]]