!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).extension={})}(this,(function(e){"use strict";let r,t;const a=["dist/chrome-browser-polyfill.js","dist/single-file.js"],s=["dist/chrome-browser-polyfill.js","dist/single-file-frames.js"];async function n(e,n){let o;if(await async function(e){const n=e.extensionScriptFiles||[];r||t||([r,t]=await Promise.all([i(a.concat(n)),i(s)]))}(n),!n.removeFrames)try{await browser.tabs.executeScript(e,{code:t,allFrames:!0,matchAboutBlank:!0,runAt:"document_start"})}catch(e){}try{await browser.tabs.executeScript(e,{code:r,allFrames:!1,runAt:"document_idle"}),o=!0}catch(e){}return o&&n.frameId&&await browser.tabs.executeScript(e,{code:"document.documentElement.dataset.requestedFrameId = true",frameId:n.frameId,matchAboutBlank:!0,runAt:"document_start"}),o}async function i(e){const r=e.map((async e=>{if("function"==typeof e)return"("+e.toString()+")();";{const r=await fetch(browser.runtime.getURL("../../../"+e));return(new TextDecoder).decode(await r.arrayBuffer())}}));let t="";for(const e of r)t+=await e;return t}const o="single-filez-response-fetch",c=(e,r)=>window.fetch(e,r);let d=0,u=new Map;async function f(e,r={}){try{let t=await c(e,{cache:"force-cache",headers:r.headers});return 401!=t.status&&403!=t.status&&404!=t.status||(t=await w(e)),t}catch(t){d++;const a=new Promise(((e,r)=>u.set(d,{resolve:e,reject:r})));return await h({method:"singlefile.fetch",url:e,requestId:d,referrer:r.referrer,headers:r.headers}),a}}async function l(e,r){const t=await h({method:"singlefile.fetchFrame",url:e,frameId:r.frameId,referrer:r.referrer,headers:r.headers});return{status:t.status,headers:new Map(t.headers),arrayBuffer:async()=>new Uint8Array(t.array).buffer}}async function h(e){const r=await browser.runtime.sendMessage(e);if(!r||r.error)throw new Error(r&&r.error&&r.error.toString());return r}function w(e){return new Promise(((r,t)=>{var a,s,n,i;a=new CustomEvent("single-filez-request-fetch",{detail:e}),window.dispatchEvent(a),s=o,n=function a(s){var n,i,c;s.detail?s.detail.url==e&&(n=o,i=a,c=!1,window.removeEventListener(n,i,c),s.detail.response?r({status:s.detail.status,headers:new Map(s.detail.headers),arrayBuffer:async()=>s.detail.response}):t(s.detail.error)):t()},i=!1,window.addEventListener(s,n,i)}))}browser.runtime.onMessage.addListener((e=>"singlefile.fetchFrame"==e.method&&window.frameId&&window.frameId==e.frameId?async function(e){try{let r=await c(e.url,{cache:"force-cache",headers:e.headers});return 401!=r.status&&403!=r.status&&404!=r.status||(r=await Promise.race([w(e.url),new Promise(((e,r)=>setTimeout((()=>r()),5e3)))])),{status:r.status,headers:[...r.headers],array:Array.from(new Uint8Array(await r.arrayBuffer()))}}catch(e){return{error:e&&e.toString()}}}(e):"singlefile.fetchResponse"==e.method?async function(e){const r=u.get(e.requestId);r&&(e.error?(r.reject(new Error(e.error)),u.delete(e.requestId)):(e.truncated&&(r.array?r.array=r.array.concat(e.array):(r.array=e.array,u.set(e.requestId,r)),e.finished&&(e.array=r.array)),e.truncated&&!e.finished||(r.resolve({status:e.status,headers:{get:r=>e.headers&&e.headers[r]},arrayBuffer:async()=>new Uint8Array(e.array).buffer}),u.delete(e.requestId))));return{}}(e):void 0)),e.getPageData=function(e,r,t,a={fetch:f,frameFetch:l}){return globalThis.singlefile.getPageData(e,a,r,t)},e.injectScript=function(e,r){return n(e,r)},Object.defineProperty(e,"__esModule",{value:!0})}));
