import { Change } from "./Change"
import * as settingsAccess from "../settings/settingsAccess"
import * as regularExpressions from "../regularexpressions/regularExpressionsPicker"

export const exportedForTesting = {
    createCorrectionFromMatch
}

export function createAllCorrections(correctedText: string): Change[] {
    const changes: Change[] = []
    const regexps = regularExpressions.loadRegexps()
    regexps.forEach(regexp => changes.push(...createRegexpCorrections(regexp, correctedText)))
    return changes
}

function createRegexpCorrections(regexp: RegExp, correctedText: string): Change[] {
    const changes: Change[] = []
    let match
    while ((match = regexp.exec(correctedText)) !== null) {
        changes.push(createCorrectionFromMatch(match, regexp))
    }
    return changes
}

const NBSPNotation = settingsAccess.loadNBSPNotation()

function createCorrectionFromMatch(match: RegExpExecArray, regexp: RegExp): Change {
    const startIndex: number = match.index
    const endIndex: number = regexp.lastIndex
    const replaced: string = match.input.substring(startIndex, endIndex)
    const replacement: string = replaced.replace(/ /g, NBSPNotation)
    regexp.lastIndex = startIndex + 1
    return [replacement, startIndex, endIndex];
}