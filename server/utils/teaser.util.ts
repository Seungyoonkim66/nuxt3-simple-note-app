export function createTeaser(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
}

// export function extractTextFromHtml(htmlString: string) {

// }