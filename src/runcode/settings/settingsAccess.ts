import * as vscode from 'vscode';
import { SearchExp } from '../regularexpressions/SearchExp'

export function loadNBSPNotation(): string {
    return configuration.get('zápisNezlomitelnýchMezer') ?? DEFAULT_NOTATION
}

export function loadRegexpsConfiguration(): {
    rewrite: boolean,
    aroundMath: string,
    dashes: boolean,
    slashes: boolean,
    roman: boolean,
    datesValidation: boolean,
    degrees: boolean,
    mathParentheses: boolean,
    custom: SearchExp[]
} {
    return {
        rewrite: configuration.get('přepisPůvodníchNezlomitelnýchMezer') ?? DEFAULT_REWRITE,
        aroundMath: configuration.get('pokročilé.kolemMatematickýchOperátorů') ?? DEFAULT_AROUND_MATH,
        dashes: configuration.get('pokročilé.předPomlčkamiAZnakyMinus') ?? DEFAULT_DASHES,
        slashes: configuration.get('pokročilé.předLomítky') ?? DEFAULT_SLASHES,
        roman: configuration.get('pokročilé.zaŘímskýmiČísly') ?? DEFAULT_ROMAN,
        datesValidation: configuration.get('pokročilé.validaceKalendářníchDat') ?? DEFAULT_DATES_VALIDATION,
        degrees: configuration.get('pokročilé.titulyAHodnosti') ?? DEFAULT_DEGREES,
        mathParentheses: configuration.get('pokročilé.matematickéZávorky') ?? DEFAULT_MATH_PARENTHESES,
        custom: configuration.get('pokročilé.vlastníRegulárníVýrazy') ?? DEFAULT_CUSTOM
    }
}

const configuration = vscode.workspace.getConfiguration("nbspcorrector")
const DEFAULT_NOTATION: string = "&nbsp;"

const DEFAULT_REWRITE: boolean = true
const DEFAULT_AROUND_MATH: string = "před"
const DEFAULT_DASHES: boolean = true
const DEFAULT_SLASHES: boolean = true
const DEFAULT_ROMAN: boolean = false
const DEFAULT_DATES_VALIDATION: boolean = true
const DEFAULT_DEGREES: boolean = true
const DEFAULT_MATH_PARENTHESES: boolean = true
const DEFAULT_CUSTOM: SearchExp[] = []