import { Change } from "../documentaccess/Change"
import * as settingsAccess from "../settings/settingsAccess"
import * as regularExpressions from "../regularexpressions/regularExpressionsPicker"

const NBSPNotation = settingsAccess.loadNBSPNotation()

export const exportedForTesting = {
    createCorrectionFromMatch: getChangedTextPart
}

export function createSpaceUnifications(correctedText: string): Change[] {
    const changes: Change[] = []
    const spaceEntities = /(?: |&nbsp;?|(?:&#160|&#xA0);)/g
    changes.push(...createRegexpChanges(spaceEntities, correctedText, () => " "))
    return changes
}

export function createAllCorrections(textToCorrect: string): Change[] {
    const corrections: Change[] = []
    const regexps = regularExpressions.loadRegexps()
    const replacementGetter = (replaced: string) => replaced.replace(/ /g, NBSPNotation)
    regexps.forEach(regexp => {
        corrections.push(...createRegexpChanges(regexp, textToCorrect, replacementGetter))
    })
    return corrections.sort((change1, change2) => change1[1] - change2[1])
}

function createRegexpChanges(regexp: RegExp, textToCorrect: string, replacementGetter: (replaced: string) => string): Change[] {
    const changes: Change[] = []
    let match
    while ((match = regexp.exec(textToCorrect)) !== null) {
        const unchange = getChangedTextPart(match, regexp)
        changes.push([replacementGetter(unchange[0]), unchange[1], unchange[2]])
        regexp.lastIndex = match.index + 1
    }
    return changes
}

function getChangedTextPart(match: RegExpExecArray, regexp: RegExp): Change {
    const startIndex: number = match.index
    const endIndex: number = regexp.lastIndex
    const replaced: string = match.input.substring(startIndex, endIndex)
    return [replaced, startIndex, endIndex]
}