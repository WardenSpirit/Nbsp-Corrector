import { Context } from "./textMeaning"

export function extractTexts(HTMLText: string): [textPart: string, offset: number][] {

  const bodyOffset = getOffsetOfBody(HTMLText) //noCarriageReturnText)
  const textParts: [textPart: string, offset: number][] = findTextParts(HTMLText, bodyOffset)

  return textParts
}

function getOffsetOfBody(noNewLinesText: string): number {
  const outerBodyOffset = noNewLinesText.indexOf('<body')
  return outerBodyOffset + noNewLinesText.substring(outerBodyOffset).indexOf('>') + 1
}

function findTextParts(HTMLText: string, offset: number): [textPart: string, offset: number][] {
  let textMeaning = new Context(offset)
  return textMeaning.generateTextParts(HTMLText)
}