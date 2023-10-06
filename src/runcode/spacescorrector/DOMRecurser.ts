export function forChainedTextParts(
  element: Element,
  correctionFunction: (correctedText: string, startingIndex: number) => void,
  initialIndex: number = 0
) {
  //console.log(`info: forChainedTextParts called with ${element.tagName}, outerHTML begins at ${initialIndex}`)
  
  if (element.tagName === "HEAD") return

  const children = element.querySelectorAll(":scope > *")
  let nonChildTexts: [string, number][] = getNonChildParts(element.innerHTML, children)
  const childParts: [Element, number][] = getChildParts(element.innerHTML, children)
  processTextParts(nonChildTexts, childParts, correctionFunction, initialIndex)
}

function getNonChildParts(innerHTML: string, children: NodeListOf<Element>): [string, number][] {
  let nonChildParts: [string, number][] = []

  let partStart = 0
  Array.from(children).forEach(child => {
    const partEnd = innerHTML.indexOf(child.outerHTML, partStart)

    nonChildParts.push([innerHTML.substring(partStart, partEnd), partStart])
    partStart = partEnd + child.outerHTML.length
  });
  nonChildParts.push([innerHTML.substring(partStart), partStart])

  return nonChildParts
}

function getChildParts(innerHTML: string, children: NodeListOf<Element>): [Element, number][] {
  let childParts: [Element, number][] = []

  let precedingChildEnd = 0
  Array.from(children).forEach(child => {
    const childStart = innerHTML.indexOf(child.outerHTML, precedingChildEnd)
    const childInnerStart = childStart + child.outerHTML.indexOf(child.innerHTML)
    childParts.push([child, childInnerStart])

    precedingChildEnd = childStart + child.outerHTML.length
  });

  return childParts
}

function processTextParts(
  nonChildTexts: [string, number][],
  childParts: [Element, number][],
  correctionFunction: (correctedText: string, startingIndex: number) => void,
  parentPosition: number
) {
  for (let childI = 0; childI < childParts.length; childI++) {
    const textPrecedingChild: string = nonChildTexts[childI][0]
    const precedingTextPosition: number = nonChildTexts[childI][1]
    //console.log(`nonChildText "${textPrecedingChild}" starts at ${parentPosition + precedingTextPosition} and is ${textPrecedingChild.length} chars long.\n`)
    const child: Element = childParts[childI][0]
    const childInnerPosition: number = childParts[childI][1]
    //console.log(`childouterHTML of ${child.tagName}, "${child.outerHTML}", may start at ${parentPosition + childInnerPosition - (child.outerHTML.length - child.innerHTML.length) / 2 + 0.5} and is ${child.outerHTML.length} chars long.\n`)
    //console.log(`childinnerHTML of ${child.tagName}, "${child.innerHTML}", starts at ${parentPosition + childInnerPosition} and is ${child.innerHTML.length} chars long.\n`)

    forChainedTextParts(child, correctionFunction, parentPosition + childInnerPosition)
    correctionFunction(textPrecedingChild, parentPosition + precedingTextPosition)
  }
  
  const textPrecedingChild: string = nonChildTexts[nonChildTexts.length - 1][0]
  const precedingTextPosition: number = nonChildTexts[nonChildTexts.length - 1][1]
  //console.log(`nonChildText "${textPrecedingChild}" starts at ${parentPosition + precedingTextPosition} and is ${textPrecedingChild.length} chars long.\n`)
  correctionFunction(textPrecedingChild, parentPosition + precedingTextPosition)
}