import * as vscode from 'vscode';

export function loadNBSPNotation(): string {
    return configuration.get('zápisNezlomitelnýchMezer') ?? DEFAULT_NOTATION
}

export type ConfigData = {
    rewrite: boolean,
    wrapAroundMath: string,
    dashes: boolean,
    slashes: boolean,
    romanCaution: boolean,
    datesValidation: boolean,
    monthYearSeparation: boolean,
    wrapAfterDegrees: boolean,
    wrapInMathParentheses: boolean,
    custom: RegExp[]}

export function loadRegexpsConfiguration(): ConfigData {
    return {
        rewrite: configuration.get('přepisPůvodníchNezlomitelnýchMezer') ?? DEFAULT_REWRITE,
        wrapAroundMath: configuration.get('pokročilé.zalamováníKolemMatematickýchOperátorů') ?? DEFAULT_WRAP_AROUND_MATH,
        dashes: configuration.get('pokročilé.zalamováníPředPomlčkamiAZnakyMinus') ?? DEFAULT_DASHES,
        slashes: configuration.get('pokročilé.zalamováníPředLomítky') ?? DEFAULT_SLASHES,
        romanCaution: configuration.get('pokročilé.opatrnostZaMožnýmiŘímskýmiČísly') ?? DEFAULT_ROMAN_CAUTION,
        datesValidation: configuration.get('pokročilé.validaceKalendářníchDat') ?? DEFAULT_DATES_VALIDATION,
        monthYearSeparation: configuration.get('pokročilé.zalamováníMeziMěsícemARokem') ?? DEFAULT_MONTH_YEAR_SEPARATION,
        wrapAfterDegrees: configuration.get('pokročilé.zalamováníZaTitulyAHodnostmi') ?? DEFAULT_WRAP_AFTER_DEGREES,
        wrapInMathParentheses: configuration.get('pokročilé.zalamováníVMatematickýchZávorkách') ?? DEFAULT_WRAP_IN_MATH_PARENTHESES,
        custom: configuration.get('pokročilé.vlastníRegulárníVýrazy') ?? DEFAULT_CUSTOM
    }
}

const configuration = vscode.workspace.getConfiguration("nbspcorrector")
const DEFAULT_NOTATION: string = "&nbsp;"

const DEFAULT_REWRITE: boolean = true
const DEFAULT_WRAP_AROUND_MATH: string = "před"
const DEFAULT_DASHES: boolean = true
const DEFAULT_SLASHES: boolean = true
const DEFAULT_ROMAN_CAUTION: boolean = false
const DEFAULT_DATES_VALIDATION: boolean = true
const DEFAULT_MONTH_YEAR_SEPARATION: boolean = false
const DEFAULT_WRAP_AFTER_DEGREES: boolean = false
const DEFAULT_WRAP_IN_MATH_PARENTHESES: boolean = false
const DEFAULT_CUSTOM: RegExp[] = []