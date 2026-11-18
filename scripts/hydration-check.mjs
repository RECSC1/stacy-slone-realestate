import fs from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const route=process.argv[2] || '/';
const html=fs.readFileSync(`dist/public/${route==='/'?'index.html':route.slice(1)+'/index.html'}`,'utf8');
const dom=new JSDOM(html,{url:'https://stacyslonerealty.com'+route,pretendToBeVisual:true});
const {window}=dom;
for(const key of ['window','document','location','history','navigator','HTMLElement','DocumentFragment','Element','Node','HTMLInputElement','HTMLTextAreaElement','HTMLSelectElement','FormData','MutationObserver','getComputedStyle','Event','CustomEvent','MouseEvent']) Object.defineProperty(globalThis,key,{value:key==='window'?window:window[key],configurable:true});
globalThis.addEventListener=window.addEventListener.bind(window);
globalThis.removeEventListener=window.removeEventListener.bind(window);
globalThis.dispatchEvent=window.dispatchEvent.bind(window);
globalThis.requestAnimationFrame=window.requestAnimationFrame.bind(window);
globalThis.cancelAnimationFrame=window.cancelAnimationFrame.bind(window);
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
window.scrollTo=()=>{};
window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
globalThis.ResizeObserver=class {observe(){} disconnect(){} unobserve(){}};
const requests=[];
let formResponse = "error";
globalThis.fetch=async(input,init)=>{
 requests.push({url:String(input),init});
 if(String(input)==="/__forms.html") return new Response(formResponse==="shell"?'<div id="root"></div>':"Thank you!",{status:formResponse==="error"?503:200});
 return new Response(JSON.stringify([{result:{data:{json:init?.method==='POST'?{success:true,reply:'Test response'}:[]}}}]),{headers:{'content-type':'application/json'}});
};
const {act}=await import('react');
const {hydrateRoot}=await import('react-dom/client');
const {application}=await import('../.ssg/entry-server.js');
const {element,queryClient}=application();
const errors=[];const messages=[];const originalError=console.error;
console.error=(...args)=>{messages.push(args.map(String).join(' '));};
let root;
await act(async()=>{root=hydrateRoot(document.getElementById('root'),element,{onRecoverableError:error=>errors.push(error.message)});await new Promise(resolve=>setTimeout(resolve,20));});
assert.equal(errors.length,0,route+' hydration errors: '+errors.join('\n'));
assert.equal(messages.filter(x=>/hydration|didn't match|does not match/i.test(x)).length,0,route+' '+messages.join('\n'));
if (!document.querySelector('h1')) { originalError(messages.join('\n')); originalError(document.body.textContent.slice(0,1600)); }
assert.equal(document.querySelectorAll('h1').length,1);
async function change(input,value){await act(async()=>{Object.getOwnPropertyDescriptor(input.tagName==='SELECT'?window.HTMLSelectElement.prototype:input.tagName==='TEXTAREA'?window.HTMLTextAreaElement.prototype:window.HTMLInputElement.prototype,'value').set.call(input,value);input.dispatchEvent(new window.Event(input.tagName==='SELECT'?'change':'input',{bubbles:true}));});}
if(route==='/mortgage-calculator'){
 const input=document.querySelector('input[type="number"]'); const before=document.querySelector('main').textContent;
 await change(input,'550000');
 assert.notEqual(document.querySelector('main').textContent,before,'Mortgage payment must respond to price change');
 console.log('PASS mortgage payment updates after hydration');
}
if(route==='/virtual-staging'){
 await change(document.querySelector('input[type="range"]'),'75');
 assert.ok(document.querySelector('[style*="clip-path"]').style.clipPath.includes('25%'));
 console.log('PASS virtual staging slider updates after hydration');
}
const formNames={'/contact':'stacy-contact','/buy':'stacy-buyer-inquiry','/buyer-inquiry':'stacy-buyer-inquiry','/seller-inquiry':'stacy-seller-inquiry','/home-valuation':'stacy-home-valuation','/property-alerts':'stacy-property-alerts','/relocation-guide':'stacy-relocation-inquiry','/land-investment':'stacy-land-investment-inquiry'};
if(formNames[route]) {
 const form=document.querySelector('main form');
 assert.equal(form.name,formNames[route]);
 const expected={};
 for(const input of form.querySelectorAll('input:not([type="hidden"]):not([name="bot-field"]),textarea,select')) {
  if(!input.name) continue;
  const value=input.tagName==='SELECT'?[...input.options].find(o=>o.value)?.value ?? '':input.type==='email'?'local-test@example.invalid':input.name==='phone'?'9195550100':'Local test & details = correct';
  expected[input.name]=value; await change(input,value);
 }
 async function send(){await act(async()=>{form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));await new Promise(resolve=>setTimeout(resolve,30));});}
 await send();
 assert.ok(document.querySelector('[role="alert"]'),'Failed requests show an error');
 assert.ok(document.querySelector('main form'),'Failed requests keep the form');
 assert.equal(form.querySelector('[name="email"]').value,expected.email,'Failed requests preserve the email');
 formResponse='shell';await send();
 assert.ok(document.querySelector('[role="alert"]'),'An app shell is not a submission receipt');
 formResponse='success';
 const before=requests.filter(r=>r.url==='/__forms.html').length;
 await act(async()=>{form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));await new Promise(resolve=>setTimeout(resolve,30));});
 assert.equal(requests.filter(r=>r.url==='/__forms.html').length,before+1,'Double clicks send only one request');
 assert.equal(document.querySelector('main form'),null,'Accepted requests show confirmation');
 const req=requests.filter(r=>r.url==='/__forms.html').at(-1);
 const payload=new URLSearchParams(req.init.body);
 assert.equal(payload.get('form-name'),formNames[route]);
 for(const [key,value] of Object.entries(expected)) assert.equal(payload.get(key),value,route+' field '+key);
 assert.equal(payload.get('bot-field'),'');
 assert.ok(payload.get('page-url').endsWith(route));
 assert.ok(payload.get('submission-id'));
 assert.equal(requests.filter(r=>r.url.includes('/api/trpc/leads')).length,0);
 console.log('PASS form '+route+': fields, URL encoding, failures, retry, confirmation and double-click guard (mocked only)');
}
if(route==='/'){
 await act(async()=>document.querySelector('[aria-label="Toggle navigation menu"]').click());
 assert.ok(document.querySelector('#mobile-navigation'));
 await act(async()=>document.querySelector('[aria-label="Open AI Concierge chat"]').click());
 assert.ok(document.body.textContent.includes('Ask about buying or selling'));
 console.log('PASS mobile navigation and AI chat launcher open');
 const link=document.querySelector('a[href="/about"]');
 await act(async()=>{link.dispatchEvent(new window.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await new Promise(resolve=>setTimeout(resolve,10));});
 assert.equal(document.querySelector('link[rel="canonical"]').href,'https://stacyslonerealty.com/about');
 assert.ok(document.title.startsWith('About Stacy'));
 console.log('PASS navigation updates title, canonical and schema');
}
await act(async()=>root.unmount());queryClient.clear();dom.window.close();console.error=originalError;
console.log(`PASS hydration ${route}, zero hydration mismatches`);
process.exit(0);
