import * as assert from 'assert';
import { Change } from "../../../runcode/documentaccess/Change"
import * as settingsAccess from "../../../runcode/settings/settingsAccess"
import { createAllCorrections, exportedForTesting } from "../../../runcode/spacescorrector/correctionPerformer"
const { createCorrectionFromMatch } = exportedForTesting

suite('CorrectionExecution test suite', () => {
    const nbspNotation = settingsAccess.loadNBSPNotation()

    test('createRegexpCorrections test 1', () => {
        const correctedString: string = "O výši pokuty se právě jedná."
        const regexp: RegExp = /(?<=^| )[O] \b/g
        const createdCorrection = createCorrectionFromMatch(regexp.exec(correctedString)!, regexp)
        assert.equal(createdCorrection[0], "O" + nbspNotation)
        assert.equal(createdCorrection[1], 0)
        assert.equal(createdCorrection[2], 2)
    })

    test('createRegexpCorrections test 2', () => {
        const correctedString: string = "Přestože o výši pokuty se právě jedná."
        const regexp: RegExp = /(?<=^| )[o] \b/g
        const createdCorrection = createCorrectionFromMatch(regexp.exec(correctedString)!, regexp)
        assert.equal(createdCorrection[0], "o" + nbspNotation)
        assert.equal(createdCorrection[1], 9)
        assert.equal(createdCorrection[2], 11)
    })

    test('createRegexpCorrections test 3', () => {
        const correctedString: string = "Výše pokuty může dosáhnout až 1 000 Kč."
        const regexp: RegExp = /\b\d{1,3}(?: \d{2,3})+\b/g
        const createdCorrection = createCorrectionFromMatch(regexp.exec(correctedString)!, regexp)
        assert.equal(createdCorrection[0], `1${nbspNotation}000`)
        assert.equal(createdCorrection[1], 30)
        assert.equal(createdCorrection[2], 35)
    })

    test('createRegexpCorrections test 4', () => {
        const correctedString: string = "Splatnost pokuty je 9. září."
        const regexp: RegExp = /\d+\. ?září/g
        const createdCorrection = createCorrectionFromMatch(regexp.exec(correctedString)!, regexp)
        assert.equal(createdCorrection[0], `9.${nbspNotation}září`)
        assert.equal(createdCorrection[1], 20)
        assert.equal(createdCorrection[2], 27)
    })

    test('createAllCorrections test 1', () => {
        const correctedString: string = "Ukrajinský prezident Volodymyr Zelenskyj oznámil založení mezinárodní aliance zbrojařského průmyslu. Jejím účelem má být mimo jiné posílení obranného potenciálu Ukrajiny."
        const createdCorrections = createAllCorrections(correctedString)
        assert.equal(createdCorrections.length, 0)
    })
    test('createAllCorrections test 2', () => {
        const corrections: Change[] = [["a" + nbspNotation, 62, 64], ["v" + nbspNotation, 75, 77]]
        const correctedString: string = "Od modelu si slibuje, že bude nepřítelem hůře zpozorovatelný, a to zejména v závěrečné fázi útoku."
        const createdCorrections = createAllCorrections(correctedString)
        assert.equal(createdCorrections.length, corrections.length)
        assert.deepStrictEqual(createdCorrections, corrections)
    })
    test('createAllCorrections test 3', () => {
        const corrections: Change[] = [[`28.${nbspNotation}září`, 4, 12]]
        const correctedString: string = "Dne 28. září slavíme Den české státnosti. Během 8 státních svátků jsou větší obchody zavřené, naopak během 5 otevřené."
        const createdCorrections = createAllCorrections(correctedString)
        for (let correctionI = 0; correctionI < createdCorrections.length; correctionI++) {
            console.log(createdCorrections[correctionI])
        }
        assert.equal(createdCorrections.length, corrections.length)
        assert.deepStrictEqual(createdCorrections, corrections)
    })
})