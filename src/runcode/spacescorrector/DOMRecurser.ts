export function forChainedTextParts(element: Element, correctionFunction: (correctedText: string, startingIndex: number) => void, initialIndex: number = 0) {
  const children = element.querySelectorAll("*")
  const parentHTML = element.innerHTML
  let textStart = 0
  let childStart
  Array.from(children).forEach(child => {
    childStart = parentHTML.indexOf(child.outerHTML, textStart)

    correctionFunction(parentHTML.substring(textStart, childStart), initialIndex + textStart)
    forChainedTextParts(child, correctionFunction, initialIndex + childStart)

    textStart = childStart + child.outerHTML.length
  });
  
  correctionFunction(parentHTML.substring(textStart), initialIndex + textStart)
}