import { JSDOM } from 'jsdom';

// REF: npm install -D @types/jsdom 해줘야 에러 안뜸  // js 기반 라이브러리라서 타입스크립트 에러 뜨면 types/{lirbrary-name} 이거 찾아보고 설치하면 대부분 됨

export function createTeaser(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
}

export function extractTextFromHtml(htmlString: string) {
  const dom = new JSDOM(htmlString);
  const extractedText = dom.window.document.body.textContent || '';
  return extractedText;
}