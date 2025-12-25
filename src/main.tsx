import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/* 본 페이지(snupia.kr)에서 SNUPia utils 페이지를 iframe으로 삽입하기 위한 event listener 등록 */
/* 이 페이지의 scrollHeight를 상위 페이지인 snupia.kr의 페이지 스크립트에 전달해 iframe의 올바른 높이 설정을 가능하게 함*/
window.addEventListener('resize', function() {
  let message = {height: document.body.scrollHeight};	
  window.top?.postMessage(message, "*");
});
window.addEventListener('load', function() {
  let message = {height: document.body.scrollHeight};	
  window.top?.postMessage(message, "*");
});