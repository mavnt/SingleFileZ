!function(){"use strict";const e="single-filez-response-fetch";let r=new Map;function a(r){return new Promise(((a,t)=>{var s,n,i,d;s=new CustomEvent("single-filez-request-fetch",{detail:r}),window.dispatchEvent(s),n=e,i=function s(n){var i,d,o;n.detail?n.detail.url==r&&(i=e,d=s,o=!1,window.removeEventListener(i,d,o),n.detail.response?a({status:n.detail.status,headers:new Map(n.detail.headers),arrayBuffer:async()=>n.detail.response}):t(n.detail.error)):t()},d=!1,window.addEventListener(n,i,d)}))}browser.runtime.onMessage.addListener((e=>"singlefile.fetchFrame"==e.method&&window.frameId&&window.frameId==e.frameId?async function(e){try{let s=await(r=e.url,t={cache:"force-cache",headers:e.headers},window.fetch(r,t));return 401!=s.status&&403!=s.status&&404!=s.status||(s=await Promise.race([a(e.url),new Promise(((e,r)=>setTimeout((()=>r()),5e3)))])),{status:s.status,headers:[...s.headers],array:Array.from(new Uint8Array(await s.arrayBuffer()))}}catch(e){return{error:e&&e.toString()}}var r,t}(e):"singlefile.fetchResponse"==e.method?async function(e){const a=r.get(e.requestId);a&&(e.error?(a.reject(new Error(e.error)),r.delete(e.requestId)):(e.truncated&&(a.array?a.array=a.array.concat(e.array):(a.array=e.array,r.set(e.requestId,a)),e.finished&&(e.array=a.array)),e.truncated&&!e.finished||(a.resolve({status:e.status,headers:{get:r=>e.headers&&e.headers[r]},arrayBuffer:async()=>new Uint8Array(e.array).buffer}),r.delete(e.requestId))));return{}}(e):void 0))}();
