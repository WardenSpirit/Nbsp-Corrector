import jsdom = require("jsdom")
const { JSDOM } = jsdom
const DOMParser = new JSDOM().window.DOMParser


export function extractTexts(HTMLText: string): [textPart: string, offset: number][] {

  const [noNewLinesText, newLinesIndeces] = extractNewLines(HTMLText)
  const document: Document = new DOMParser().parseFromString(noNewLinesText, 'text/html')
  const body = document.body

  const offset = getOffsetOfBody(noNewLinesText)
  const textParts: [textPart: string, offset: number][] = getTextParts(body, offset)
  offsetWithNewLines(textParts, newLinesIndeces)
  return textParts
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

function getTextParts(
  element: Element,
  offset: number
): [textPart: string, offset: number][] {
  const textParts: [textPart: string, offset: number][] = []

  const children = element.children

  let nonChildTexts: [string, number][] = getNonChildParts(element.innerHTML, children, offset)
  const childOffsets: number[] = getChildParts(element.innerHTML, children, offset)

  for (let childI = 0; childI < children.length; childI++) {
    const beforeChild: [string, number] = nonChildTexts[childI]
    const child = children[childI]
    const childPartOffset = childOffsets[childI]

    textParts.push(beforeChild)
    textParts.push(...getTextParts(child, childPartOffset))
  }

  textParts.push(nonChildTexts.at(-1)!)

  return textParts
}


function getNonChildParts(parentInnerHTML: string, children: HTMLCollection, offset: number): [textPart: string, offset: number][] {
  let nonChildParts: [textPart: string, offset: number][] = []

  let partStart = 0
  Array.from(children).forEach(child => {
    const partEnd = parentInnerHTML.indexOf(child.outerHTML, partStart)

    nonChildParts.push([parentInnerHTML.substring(partStart, partEnd), offset + partStart])
    partStart = partEnd + child.outerHTML.length
  })
  nonChildParts.push([parentInnerHTML.substring(partStart), offset + partStart])

  return nonChildParts
}


function getChildParts(parentInnerHTML: string, children: HTMLCollection, offset: number): number[] {
  let childParts: number[] = []

  let precedingChildEnd = 0
  Array.from(children).forEach(child => {
    const childStart = parentInnerHTML.indexOf(child.outerHTML, precedingChildEnd)
    const childInnerStart = childStart + child.outerHTML.indexOf(child.innerHTML)
    childParts.push(offset + childInnerStart)

    precedingChildEnd = childStart + child.outerHTML.length
  })

  return childParts
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