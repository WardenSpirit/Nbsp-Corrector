import { Change } from "../documentaccess/Change"
import * as settingsAccess from "../settings/settingsAccess"
import * as regularExpressions from "../regularexpressions/regularExpressionsPicker"

export const exportedForTesting = {
    createCorrectionFromMatch: createChangesFromMatch
}

export function createSpaceUnifications(correctedText: string): Change[] {
    const changes: Change[] = []
    const spaceEntities = /(?: |&nbsp;?|(?:&#160|&#xA0);)/g
    changes.push(...createRegexpChanges(spaceEntities, correctedText, () => " "))
    return changes
}

export function createAllCorrections(correctedText: string): Change[] {
    const changes: Change[] = []
    const regexps = regularExpressions.loadRegexps()
    regexps.forEach(regexp => changes.push(...createRegexpChanges(regexp, correctedText, (replaced: string) => replaced.replace(/ /g, NBSPNotation))))
    return changes.sort((change1, change2) => change1[1] - change2[1])
}

const NBSPNotation = settingsAccess.loadNBSPNotation()

function createRegexpChanges(regexp: RegExp, correctedText: string, replacementGetter: (replaced: string) => string): Change[] {
    const changes: Change[] = []
    let match
    while ((match = regexp.exec(correctedText)) !== null) {
        changes.push(createChangesFromMatch(match, regexp, replacementGetter))
        regexp.lastIndex = match.index + 1
    }
    return changes
}

function createChangesFromMatch(match: RegExpExecArray, regexp: RegExp, replacementGetter: (replaced: string) => string): Change {
    const startIndex: number = match.index
    const endIndex: number = regexp.lastIndex
    const replaced: string = match.input.substring(startIndex, endIndex)
    const replacement: string = replacementGetter(replaced)
    return [replacement, startIndex, endIndex]
}