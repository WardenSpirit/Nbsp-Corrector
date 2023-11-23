import { Context } from "./textMeaning"

export function extractTexts(HTMLText: string): [textPart: string, offset: number][] {
  return extractTextWithoutDOMParser(HTMLText)
}

function extractTextWithoutDOMParser(HTMLText: string): [textPart: string, offset: number][] {
  const [noNewLinesText, newLinesIndeces] = extractNewLines(HTMLText)

  const offset = getOffsetOfBody(noNewLinesText)
  const textParts: [textPart: string, offset: number][] = findTextParts(noNewLinesText, offset)

  offsetWithNewLines(textParts, newLinesIndeces)
  return textParts
}

function findTextParts(HTMLText: string, offset: number): [textPart: string, offset: number][] {
  let textMeaning = new Context(offset)
  return textMeaning.generateTextParts(HTMLText)
}

function extractNewLines(HTMLText: string): [string, number[]] {
  const newLinesIndeces: number[] = []
  return [HTMLText.replace(/\r\n/g, (_match, offset) => {
    newLinesIndeces.push(offset)
    return ""
  }), newLinesIndeces]
}

function getOffsetOfBody(noNewLinesText: string): number {
  const outerBodyOffset = noNewLinesText.indexOf('<body')
  return outerBodyOffset + noNewLinesText.substring(outerBodyOffset).indexOf('>') + 1
}

function offsetWithNewLines(textParts: [textPart: string, offset: number][], newLinesIndeces: number[]) {
  for (let textPartI = 0; textPartI < textParts.length; textPartI++) {
    const oldOffset = textParts[textPartI][1]
    textParts[textPartI][1] = offsetWithNewLines(oldOffset, newLinesIndeces)
  }

  function offsetWithNewLines(offset: number, newLinesIndeces: number[]): number {
    for (const newLineIndex of newLinesIndeces) {
      if (newLineIndex <= offset) {
        offset += 2
      } else {
        break
      }
    }
    return offset
  }
}