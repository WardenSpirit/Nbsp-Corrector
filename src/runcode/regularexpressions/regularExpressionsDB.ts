// clear and always on
export const NUMBER_SEGMENTS: RegExp[] = [/\b\d{1,3}(?:\s\d{2,3})+\b/g]
export const RATIOS: RegExp[] = [/\d\s*:\s*\d/g]
export const ANGLES_FT_IN: RegExp[] = [
    /\d*°(?:\s\d*')?(?:\s\d*")?/g,
    /\d*'(?:\s\d*")?/g]
export const AMPERSAND: RegExp[] = [/&\s/g]
export const ASTERISK_CROSS: RegExp[] = [
    /\*†]\s[1-9]\d?\.\s?[1-9]\d?\.(?=\s?\d+\b)/g,
    /\*†]\s[1-9]\d?\.\s(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)(?=\s?\d+\b)/g]      // díky přítomnosti hvězdičky/křížku není považováno za nutné data validovat
export const MIXED_NUMBERS: RegExp[] = [/\d+\s\d+\/\d+?/g]

// rough and allways on
export const PREPOSITIONS_CONJUNCTIONS: RegExp[] = [
    /[kKsSzZoOuUaAvi]\s[\wĚŠČŘŽÝÁÍÉÚŮěščřžýáíéúů]+/g,
    /(?<=\.\s)[VI]\s[\wĚŠČŘŽÝÁÍÉÚŮěščřžýáíéúů"'\[({.]/g]

// rough and switchable
export const NBSP_AFTER_MATH: RegExp[] = [/\d\s[=<>≤≥+±×x·:÷]/g]
export const NBSP_BEFORE_MATH: RegExp[] = [/[=<>≤≥+±×x·:÷]\s\d/g]
export const NBSP_BEFORE_DASHES: RegExp[] = [/-\s\d/g]
export const NBSP_BEFORE_SLASHES: RegExp[] = [/\/\s\d/g]

export const IV_NOT_NUMERALS: RegExp[] = [/[IV]\s[\wA-ZĚŠČŘŽÝÁÍÉÚŮa-zěščřžýáíéúů\d]+/g]

export const VALIDATED_SEPARATED_CALENDAR_DATES: RegExp[] = [
    /(?:[1-9]|[12][0-9]|3[01])\.\s?(?:[1-9]|1[0-2])/g,
    /(?:[1-9]|[12][0-9]|3[01])\.\s?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)/g]
export const VALIDATED_JOINED_CALENDAR_DATES: RegExp[] = [
    /(?:[1-9]|[12][0-9]|3[01])\.\s?(?:[1-9]|1[0-2])(?:\s\d+)?/g,
    /(?:[1-9]|[12][0-9]|3[01])\.\s?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)(?:\s\d+)?/g]
export const ALL_SEPARATED_CALENDAR_DATES: RegExp[] = [
    /\d+\.\s?\d+\./g,
    /\d+\.\s?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)/g]
export const ALL_JOINED_CALENDAR_DATES: RegExp[] = [
    /\d+\.\s?\d+\.(?:\s\d+)?/g,
    /\d+\.\s?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)(?:\s\d+)?/g]

export const DEGREES: RegExp[] = [/(?:(?:Bc|BcA|Ing|ing|Ing\.\sarch|ing\.\sarch|MUDr|NDDr|MSDr|MVDr|MgA|Mgr|JUDr|RNDr|PharmDr|ThDr|ThLic|ThMgr|PhDr|PaedDr|RSDr|RCDr|RTDr|dr|ak\.\sarch|akad\.\sarch|ak\.\smal|akad\.\smal|ak.\ssoch|akad\.\ssoch|akad|doc|prof|doc|prof|brig\.\sgen|genmjr|genpor|arm\.\sgen|mjr|pplk|plk|ppor|por|npor|kpt|rtm|nrtm|šrtm|pprap|prap|nprap|št\.\sprap|šprap|des|čet|rtn|voj|sv|svob|stržm|nstržm)\.\s(?:(?:et|&)\s)?)+[A-ZĚŠČŘŽÝÁÉÍÚŮ]/g]
export const MATH_PARENTHESES: RegExp[] = [/\([+-±×x·:÷\/\s\d,abcklmnxyz]+?\)/g]