import { Change } from "./Change"
import * as settingsAccess from "../settings/settingsAccess"
import * as regularExpressions from "../regularexpressions/regularExpressionsPicker"

export function generateCorrections(correctedText: string): Change[] {
    const changes: Change[] = []
    const regexps = regularExpressions.loadRegexps()
    regexps.forEach(regexp => applyRegexp(regexp, correctedText, changes))
    return changes
}

const NBSPNotation = settingsAccess.loadNBSPNotation()

function applyRegexp(searchexp: RegExp, correctedText: string, changes: Change[]) {
    findRegexpPositionsInText(searchexp, correctedText).forEach(index => {
        changes.push([index, NBSPNotation])
    })
}

function findRegexpPositionsInText(regexp: RegExp, correctedText: string): number[] {
    const patternIndices: number[] = [];
    let match
    //todo
    /*while ((match = regexp.exec(correctedText)) !== null) {
        patternIndices.push(match.index);
        regexp.lastIndex = match.index + 1
    }*/
    
    return patternIndices;
}