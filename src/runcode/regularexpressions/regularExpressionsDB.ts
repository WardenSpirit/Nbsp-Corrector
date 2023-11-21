// clear and always on
export const NUMBER_SEGMENTS: RegExp[] = [/(?<=\b\d+) (?=\d+\b)/g]
export const RATIOS: RegExp[] = [/(?<=\d) *: *(?=\d)/g]
export const ANGLES_FT_IN: RegExp[] = [
    /\d*°(?: \d*')?(?: \d*")?/g,
    /\d*'(?: \d*")?/g]
export const AMPERSAND: RegExp[] = [/& /g]
export const ASTERISK_CROSS: RegExp[] = [
    /[\*†] [1-9]\d?\. ?[1-9]\d?\.(?= ?\d+\b)/g,
    /[\*†] [1-9]\d?\. (?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)(?= ?\d+\b)/g]      // díky přítomnosti hvězdičky/křížku není považováno za nutné data validovat
export const MIXED_NUMBERS: RegExp[] = [/\d+ \d+\/\d+?/g]

// rough and allways on
export const PREPOSITIONS_CONJUNCTIONS: RegExp[] = [
    /(?<=^| )[kKsSzZoOuUaAvi] \b/g,
    /(?<=\. )[VI] [\b"'\.]/g]

// rough and switchable
export const NBSP_AFTER_MATH: RegExp[] = [/\d [=<>≤≥+±×x·÷]/g]
export const NBSP_BEFORE_MATH: RegExp[] = [/[=<>≤≥+±×x·÷] \d/g]
export const NBSP_BEFORE_MINUSES: RegExp[] = [
    /[-] [^\d]/g,
    /[–] [^\d]/g]
export const NBSP_BEFORE_SLASHES: RegExp[] = [/\/ \b/g]

export const IV_NOT_NUMERALS: RegExp[] = [/[IV] [\wA-ZĚŠČŘŽÝÁÍÉÚŮa-zěščřžýáíéúů\d]+/g]

export const VALIDATED_SEPARATED_CALENDAR_DATES: RegExp[] = [
    /(?<=^| )(?:[1-9]|[12][0-9]|3[01])\. ?(?:[1-9]|1[0-2])/g,
/(?<=^| )(?:[1-9]|[12][0-9]|3[01])\. ?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)/g]
export const VALIDATED_JOINED_CALENDAR_DATES: RegExp[] = [
    /(?<=^| )(?:[1-9]|[12][0-9]|3[01])\. ?(?:[1-9]|1[0-2]) \d+/g,
/(?<=^| )(?:[1-9]|[12][0-9]|3[01])\. ?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)(?: ?\d+\b)?/g]
export const ALL_SEPARATED_CALENDAR_DATES: RegExp[] = [
    /(?<=^| )\d+\. ?\d+\./g,
/(?<=^| )\d+\. ?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)/g]
export const ALL_JOINED_CALENDAR_DATES: RegExp[] = [
    /(?<=^| )\d+\. ?\d+\. \d+/g,
/(?<=^| )\d+\. ?(?:ledna|února|března|dubna|května|máje|června|července|srpna|září|října|listopadu|prosince)(?: ?\d+\b)?/g]

export const DEGREES: RegExp[] = [/(?:(?:Bc|BcA|Ing|ing|Ing\. arch|ing\. arch|MUDr|NDDr|MSDr|MVDr|MgA|Mgr|JUDr|RNDr|PharmDr|ThDr|ThLic|ThMgr|PhDr|PaedDr|RSDr|RCDr|RTDr|dr|ak\. arch|akad\. arch|ak\. mal|akad\. mal|ak\. soch|akad\. soch|akad|doc|prof|doc|prof|brig\. gen|genmjr|genpor|arm\. gen|mjr|pplk|plk|ppor|por|npor|kpt|rtm|nrtm|šrtm|pprap|prap|nprap|št\. prap|šprap|des|čet|rtn|voj|sv|svob|stržm|nstržm)\. (?:(?:et|&) )?)+[A-ZĚŠČŘŽÝÁÉÍÚŮ]/g]
export const MATH_PARENTHESES: RegExp[] = [/\([+-±×x·:÷\/ \d,abcklmnxyz]+?\)/g]