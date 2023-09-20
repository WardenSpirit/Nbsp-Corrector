import { Change } from "./Change"
import { SearchExp } from '../regularexpressions/SearchExp'
import * as settingsAccess from "../settings/settingsAccess"
import * as regularExpressions from "../regularexpressions/regularExpressionsPicker"

export function generateCorrections(correctedText: string): Change[] {
    const changes: Change[] = []
    const regexps = regularExpressions.loadRegexps()
    regexps.forEach(regexp => applyRegexp(regexp, correctedText, changes))
    return changes
}

const NBSPNotation = settingsAccess.loadNBSPNotation()

function applyRegexp(searchexp: SearchExp, correctedText: string, changes: Change[]) {
    findRegexpPositionsInText(searchexp, correctedText).forEach(index => {
        changes.push([index, NBSPNotation])
    })
}

function findRegexpPositionsInText(regexp: SearchExp, correctedText: string): number[] {
    const patternIndices: number[] = [];
    let match
    //todo
    /*while ((match = regexp.exec(correctedText)) !== null) {
        patternIndices.push(match.index);
        regexp.lastIndex = match.index + 1
    }*/
    
    return patternIndices;
}