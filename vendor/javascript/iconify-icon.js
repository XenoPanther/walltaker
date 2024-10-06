/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 2.1.0
*/
const e=Object.freeze({left:0,top:0,width:16,height:16});const t=Object.freeze({rotate:0,vFlip:false,hFlip:false});const n=Object.freeze({...e,...t});const o=Object.freeze({...n,body:"",hidden:false});const r=Object.freeze({width:null,height:null});const i=Object.freeze({...r,...t});function rotateFromString(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function cleanup(e){while(e<0)e+=4;return e%4}if(n===""){const t=parseInt(e);return isNaN(t)?0:cleanup(t)}if(n!==e){let t=0;switch(n){case"%":t=25;break;case"deg":t=90}if(t){let o=parseFloat(e.slice(0,e.length-n.length));if(isNaN(o))return 0;o/=t;return o%1===0?cleanup(o):0}}return t}const s=/[\s,]+/;function flipFromString(e,t){t.split(s).forEach((t=>{const n=t.trim();switch(n){case"horizontal":e.hFlip=true;break;case"vertical":e.vFlip=true;break}}))}const c={...i,preserveAspectRatio:""};function getCustomisations(e){const t={...c};const attr=(t,n)=>e.getAttribute(t)||n;t.width=attr("width",null);t.height=attr("height",null);t.rotate=rotateFromString(attr("rotate",""));flipFromString(t,attr("flip",""));t.preserveAspectRatio=attr("preserveAspectRatio",attr("preserveaspectratio",""));return t}function haveCustomisationsChanged(e,t){for(const n in c)if(e[n]!==t[n])return true;return false}const a=/^[a-z0-9]+(-[a-z0-9]+)*$/;const stringToIcon=(e,t,n,o="")=>{const r=e.split(":");if(e.slice(0,1)==="@"){if(r.length<2||r.length>3)return null;o=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const e=r.pop();const n=r.pop();const i={provider:r.length>0?r[0]:o,prefix:n,name:e};return t&&!validateIconName(i)?null:i}const i=r[0];const s=i.split("-");if(s.length>1){const e={provider:o,prefix:s.shift(),name:s.join("-")};return t&&!validateIconName(e)?null:e}if(n&&o===""){const e={provider:o,prefix:"",name:i};return t&&!validateIconName(e,n)?null:e}return null};const validateIconName=(e,t)=>!!e&&!!((e.provider===""||e.provider.match(a))&&(t&&e.prefix===""||e.prefix.match(a))&&e.name.match(a));function mergeIconTransformations(e,t){const n={};!e.hFlip!==!t.hFlip&&(n.hFlip=true);!e.vFlip!==!t.vFlip&&(n.vFlip=true);const o=((e.rotate||0)+(t.rotate||0))%4;o&&(n.rotate=o);return n}function mergeIconData(e,n){const r=mergeIconTransformations(e,n);for(const i in o)i in t?i in e&&!(i in r)&&(r[i]=t[i]):i in n?r[i]=n[i]:i in e&&(r[i]=e[i]);return r}function getIconsTree(e,t){const n=e.icons;const o=e.aliases||Object.create(null);const r=Object.create(null);function resolve(e){if(n[e])return r[e]=[];if(!(e in r)){r[e]=null;const t=o[e]&&o[e].parent;const n=t&&resolve(t);n&&(r[e]=[t].concat(n))}return r[e]}(t||Object.keys(n).concat(Object.keys(o))).forEach(resolve);return r}function internalGetIconData(e,t,n){const o=e.icons;const r=e.aliases||Object.create(null);let i={};function parse(e){i=mergeIconData(o[e]||r[e],i)}parse(t);n.forEach(parse);return mergeIconData(e,i)}function parseIconSet(e,t){const n=[];if(typeof e!=="object"||typeof e.icons!=="object")return n;e.not_found instanceof Array&&e.not_found.forEach((e=>{t(e,null);n.push(e)}));const o=getIconsTree(e);for(const r in o){const i=o[r];if(i){t(r,internalGetIconData(e,r,i));n.push(r)}}return n}const l={provider:"",aliases:{},not_found:{},...e};function checkOptionalProps(e,t){for(const n in t)if(n in e&&typeof e[n]!==typeof t[n])return false;return true}function quicklyValidateIconSet(e){if(typeof e!=="object"||e===null)return null;const t=e;if(typeof t.prefix!=="string"||!e.icons||typeof e.icons!=="object")return null;if(!checkOptionalProps(e,l))return null;const n=t.icons;for(const e in n){const t=n[e];if(!e.match(a)||typeof t.body!=="string"||!checkOptionalProps(t,o))return null}const r=t.aliases||Object.create(null);for(const e in r){const t=r[e];const i=t.parent;if(!e.match(a)||typeof i!=="string"||!n[i]&&!r[i]||!checkOptionalProps(t,o))return null}return t}const u=Object.create(null);function newStorage(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function getStorage(e,t){const n=u[e]||(u[e]=Object.create(null));return n[t]||(n[t]=newStorage(e,t))}function addIconSet(e,t){return quicklyValidateIconSet(t)?parseIconSet(t,((t,n)=>{n?e.icons[t]=n:e.missing.add(t)})):[]}function addIconToStorage(e,t,n){try{if(typeof n.body==="string"){e.icons[t]={...n};return true}}catch(e){}return false}function listIcons$1(e,t){let n=[];const o=typeof e==="string"?[e]:Object.keys(u);o.forEach((e=>{const o=typeof e==="string"&&typeof t==="string"?[t]:Object.keys(u[e]||{});o.forEach((t=>{const o=getStorage(e,t);n=n.concat(Object.keys(o.icons).map((n=>(e!==""?"@"+e+":":"")+t+":"+n)))}))}));return n}let f=false;function allowSimpleNames(e){typeof e==="boolean"&&(f=e);return f}function getIconData(e){const t=typeof e==="string"?stringToIcon(e,true,f):e;if(t){const e=getStorage(t.provider,t.prefix);const n=t.name;return e.icons[n]||(e.missing.has(n)?null:void 0)}}function addIcon$1(e,t){const n=stringToIcon(e,true,f);if(!n)return false;const o=getStorage(n.provider,n.prefix);return addIconToStorage(o,n.name,t)}function addCollection$1(e,t){if(typeof e!=="object")return false;typeof t!=="string"&&(t=e.provider||"");if(f&&!t&&!e.prefix){let t=false;if(quicklyValidateIconSet(e)){e.prefix="";parseIconSet(e,((e,n)=>{n&&addIcon$1(e,n)&&(t=true)}))}return t}const n=e.prefix;if(!validateIconName({provider:t,prefix:n,name:"a"}))return false;const o=getStorage(t,n);return!!addIconSet(o,e)}function iconLoaded$1(e){return!!getIconData(e)}function getIcon$1(e){const t=getIconData(e);return t?{...n,...t}:null}function sortIcons(e){const t={loaded:[],missing:[],pending:[]};const n=Object.create(null);e.sort(((e,t)=>e.provider!==t.provider?e.provider.localeCompare(t.provider):e.prefix!==t.prefix?e.prefix.localeCompare(t.prefix):e.name.localeCompare(t.name)));let o={provider:"",prefix:"",name:""};e.forEach((e=>{if(o.name===e.name&&o.prefix===e.prefix&&o.provider===e.provider)return;o=e;const r=e.provider;const i=e.prefix;const s=e.name;const c=n[r]||(n[r]=Object.create(null));const a=c[i]||(c[i]=getStorage(r,i));let l;l=s in a.icons?t.loaded:i===""||a.missing.has(s)?t.missing:t.pending;const u={provider:r,prefix:i,name:s};l.push(u)}));return t}function removeCallback(e,t){e.forEach((e=>{const n=e.loaderCallbacks;n&&(e.loaderCallbacks=n.filter((e=>e.id!==t)))}))}function updateCallbacks(e){if(!e.pendingCallbacksFlag){e.pendingCallbacksFlag=true;setTimeout((()=>{e.pendingCallbacksFlag=false;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=false;const o=e.provider;const r=e.prefix;t.forEach((t=>{const i=t.icons;const s=i.pending.length;i.pending=i.pending.filter((t=>{if(t.prefix!==r)return true;const s=t.name;if(e.icons[s])i.loaded.push({provider:o,prefix:r,name:s});else{if(!e.missing.has(s)){n=true;return true}i.missing.push({provider:o,prefix:r,name:s})}return false}));if(i.pending.length!==s){n||removeCallback([e],t.id);t.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),t.abort)}}))}))}}let d=0;function storeCallback(e,t,n){const o=d++;const r=removeCallback.bind(null,n,o);if(!t.pending.length)return r;const i={id:o,icons:t,callback:e,abort:r};n.forEach((e=>{(e.loaderCallbacks||(e.loaderCallbacks=[])).push(i)}));return r}const h=Object.create(null);function setAPIModule(e,t){h[e]=t}function getAPIModule(e){return h[e]||h[""]}function listToIcons(e,t=true,n=false){const o=[];e.forEach((e=>{const r=typeof e==="string"?stringToIcon(e,t,n):e;r&&o.push(r)}));return o}var p={resources:[],index:0,timeout:2e3,rotate:750,random:false,dataAfterTimeout:false};function sendQuery(e,t,n,o){const r=e.resources.length;const i=e.random?Math.floor(Math.random()*r):e.index;let s;if(e.random){let t=e.resources.slice(0);s=[];while(t.length>1){const e=Math.floor(Math.random()*t.length);s.push(t[e]);t=t.slice(0,e).concat(t.slice(e+1))}s=s.concat(t)}else s=e.resources.slice(i).concat(e.resources.slice(0,i));const c=Date.now();let a="pending";let l=0;let u;let f=null;let d=[];let h=[];typeof o==="function"&&h.push(o);function resetTimer(){if(f){clearTimeout(f);f=null}}function abort(){a==="pending"&&(a="aborted");resetTimer();d.forEach((e=>{e.status==="pending"&&(e.status="aborted")}));d=[]}function subscribe(e,t){t&&(h=[]);typeof e==="function"&&h.push(e)}function getQueryStatus(){return{startTime:c,payload:t,status:a,queriesSent:l,queriesPending:d.length,subscribe:subscribe,abort:abort}}function failQuery(){a="failed";h.forEach((e=>{e(void 0,u)}))}function clearQueue(){d.forEach((e=>{e.status==="pending"&&(e.status="aborted")}));d=[]}function moduleResponse(t,n,o){const r=n!=="success";d=d.filter((e=>e!==t));switch(a){case"pending":break;case"failed":if(r||!e.dataAfterTimeout)return;break;default:return}if(n!=="abort")if(r){u=o;d.length||(s.length?execNext():failQuery())}else{resetTimer();clearQueue();if(!e.random){const n=e.resources.indexOf(t.resource);n!==-1&&n!==e.index&&(e.index=n)}a="completed";h.forEach((e=>{e(o)}))}else{u=o;failQuery()}}function execNext(){if(a!=="pending")return;resetTimer();const o=s.shift();if(o===void 0){if(d.length){f=setTimeout((()=>{resetTimer();if(a==="pending"){clearQueue();failQuery()}}),e.timeout);return}failQuery();return}const r={status:"pending",resource:o,callback:(e,t)=>{moduleResponse(r,e,t)}};d.push(r);l++;f=setTimeout(execNext,e.rotate);n(o,t,r.callback)}setTimeout(execNext);return getQueryStatus}function initRedundancy(e){const t={...p,...e};let n=[];function cleanup(){n=n.filter((e=>e().status==="pending"))}function query(e,o,r){const i=sendQuery(t,e,o,((e,t)=>{cleanup();r&&r(e,t)}));n.push(i);return i}function find(e){return n.find((t=>e(t)))||null}const o={query:query,find:find,setIndex:e=>{t.index=e},getIndex:()=>t.index,cleanup:cleanup};return o}function createAPIConfig(e){let t;if(typeof e.resources==="string")t=[e.resources];else{t=e.resources;if(!(t instanceof Array)||!t.length)return null}const n={resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===true,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==false};return n}const g=Object.create(null);const m=["https://api.simplesvg.com","https://api.unisvg.com"];const b=[];while(m.length>0)m.length===1||Math.random()>.5?b.push(m.shift()):b.push(m.pop());g[""]=createAPIConfig({resources:["https://api.iconify.design"].concat(b)});function addAPIProvider$1(e,t){const n=createAPIConfig(t);if(n===null)return false;g[e]=n;return true}function getAPIConfig(e){return g[e]}function listAPIProviders(){return Object.keys(g)}function emptyCallback$1(){}const y=Object.create(null);function getRedundancyCache(e){if(!y[e]){const t=getAPIConfig(e);if(!t)return;const n=initRedundancy(t);const o={config:t,redundancy:n};y[e]=o}return y[e]}function sendAPIQuery(e,t,n){let o;let r;if(typeof e==="string"){const t=getAPIModule(e);if(!t){n(void 0,424);return emptyCallback$1}r=t.send;const i=getRedundancyCache(e);i&&(o=i.redundancy)}else{const t=createAPIConfig(e);if(t){o=initRedundancy(t);const n=e.resources?e.resources[0]:"";const i=getAPIModule(n);i&&(r=i.send)}}if(!o||!r){n(void 0,424);return emptyCallback$1}return o.query(t,r,n)().abort}const v="iconify2";const I="iconify";const S=I+"-count";const w=I+"-version";const x=36e5;const C=168;const k=50;function getStoredItem(e,t){try{return e.getItem(t)}catch(e){}}function setStoredItem(e,t,n){try{e.setItem(t,n);return true}catch(e){}}function removeStoredItem(e,t){try{e.removeItem(t)}catch(e){}}function setBrowserStorageItemsCount(e,t){return setStoredItem(e,S,t.toString())}function getBrowserStorageItemsCount(e){return parseInt(getStoredItem(e,S))||0}const A={local:true,session:true};const _={local:new Set,session:new Set};let T=false;function setBrowserStorageStatus(e){T=e}let P=typeof window==="undefined"?{}:window;function getBrowserStorage(e){const t=e+"Storage";try{if(P&&P[t]&&typeof P[t].length==="number")return P[t]}catch(e){}A[e]=false}function iterateBrowserStorage(e,t){const n=getBrowserStorage(e);if(!n)return;const o=getStoredItem(n,w);if(o!==v){if(o){const e=getBrowserStorageItemsCount(n);for(let t=0;t<e;t++)removeStoredItem(n,I+t.toString())}setStoredItem(n,w,v);setBrowserStorageItemsCount(n,0);return}const r=Math.floor(Date.now()/x)-C;const parseItem=e=>{const o=I+e.toString();const i=getStoredItem(n,o);if(typeof i==="string"){try{const n=JSON.parse(i);if(typeof n==="object"&&typeof n.cached==="number"&&n.cached>r&&typeof n.provider==="string"&&typeof n.data==="object"&&typeof n.data.prefix==="string"&&t(n,e))return true}catch(e){}removeStoredItem(n,o)}};let i=getBrowserStorageItemsCount(n);for(let t=i-1;t>=0;t--)if(!parseItem(t))if(t===i-1){i--;setBrowserStorageItemsCount(n,i)}else _[e].add(t)}function initBrowserStorage(){if(!T){setBrowserStorageStatus(true);for(const e in A)iterateBrowserStorage(e,(e=>{const t=e.data;const n=e.provider;const o=t.prefix;const r=getStorage(n,o);if(!addIconSet(r,t).length)return false;const i=t.lastModified||-1;r.lastModifiedCached=r.lastModifiedCached?Math.min(r.lastModifiedCached,i):i;return true}))}}function updateLastModified(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;e.lastModifiedCached=t;if(n)for(const n in A)iterateBrowserStorage(n,(n=>{const o=n.data;return n.provider!==e.provider||o.prefix!==e.prefix||o.lastModified===t}));return true}function storeInBrowserStorage(e,t){T||initBrowserStorage();function store(n){let o;if(!A[n]||!(o=getBrowserStorage(n)))return;const r=_[n];let i;if(r.size)r.delete(i=Array.from(r).shift());else{i=getBrowserStorageItemsCount(o);if(i>=k||!setBrowserStorageItemsCount(o,i+1))return}const s={cached:Math.floor(Date.now()/x),provider:e.provider,data:t};return setStoredItem(o,I+i.toString(),JSON.stringify(s))}if((!t.lastModified||updateLastModified(e,t.lastModified))&&Object.keys(t.icons).length){if(t.not_found){t=Object.assign({},t);delete t.not_found}store("local")||store("session")}}function emptyCallback(){}function loadedNewIcons(e){if(!e.iconsLoaderFlag){e.iconsLoaderFlag=true;setTimeout((()=>{e.iconsLoaderFlag=false;updateCallbacks(e)}))}}function loadNewIcons(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t;if(!e.iconsQueueFlag){e.iconsQueueFlag=true;setTimeout((()=>{e.iconsQueueFlag=false;const{provider:t,prefix:n}=e;const o=e.iconsToLoad;delete e.iconsToLoad;let r;if(!o||!(r=getAPIModule(t)))return;const i=r.prepare(t,n,o);i.forEach((n=>{sendAPIQuery(t,n,(t=>{if(typeof t!=="object")n.icons.forEach((t=>{e.missing.add(t)}));else try{const n=addIconSet(e,t);if(!n.length)return;const o=e.pendingIcons;o&&n.forEach((e=>{o.delete(e)}));storeInBrowserStorage(e,t)}catch(e){console.error(e)}loadedNewIcons(e)}))}))}))}}const loadIcons$1=(e,t)=>{const n=listToIcons(e,true,allowSimpleNames());const o=sortIcons(n);if(!o.pending.length){let e=true;t&&setTimeout((()=>{e&&t(o.loaded,o.missing,o.pending,emptyCallback)}));return()=>{e=false}}const r=Object.create(null);const i=[];let s,c;o.pending.forEach((e=>{const{provider:t,prefix:n}=e;if(n===c&&t===s)return;s=t;c=n;i.push(getStorage(t,n));const o=r[t]||(r[t]=Object.create(null));o[n]||(o[n]=[])}));o.pending.forEach((e=>{const{provider:t,prefix:n,name:o}=e;const i=getStorage(t,n);const s=i.pendingIcons||(i.pendingIcons=new Set);if(!s.has(o)){s.add(o);r[t][n].push(o)}}));i.forEach((e=>{const{provider:t,prefix:n}=e;r[t][n].length&&loadNewIcons(e,r[t][n])}));return t?storeCallback(t,o,i):emptyCallback};const loadIcon$1=e=>new Promise(((t,o)=>{const r=typeof e==="string"?stringToIcon(e,true):e;r?loadIcons$1([r||e],(i=>{if(i.length&&r){const e=getIconData(r);if(e){t({...n,...e});return}}o(e)})):o(e)}));function testIconObject(e){try{const t=typeof e==="string"?JSON.parse(e):e;if(typeof t.body==="string")return{...t}}catch(e){}}function parseIconValue(e,t){const n=typeof e==="string"?stringToIcon(e,true,true):null;if(!n){const t=testIconObject(e);return{value:e,data:t}}const o=getIconData(n);if(o!==void 0||!n.prefix)return{value:e,name:n,data:o};const r=loadIcons$1([n],(()=>t(e,n,getIconData(n))));return{value:e,name:n,loading:r}}let O=false;try{O=navigator.vendor.indexOf("Apple")===0}catch(e){}function getRenderMode(e,t){switch(t){case"svg":case"bg":case"mask":return t}return t==="style"||!O&&e.indexOf("<a")!==-1?e.indexOf("currentColor")===-1?"bg":"mask":"svg"}const j=/(-?[0-9.]*[0-9]+[0-9.]*)/g;const M=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function calculateSize$1(e,t,n){if(t===1)return e;n=n||100;if(typeof e==="number")return Math.ceil(e*t*n)/n;if(typeof e!=="string")return e;const o=e.split(j);if(o===null||!o.length)return e;const r=[];let i=o.shift();let s=M.test(i);while(true){if(s){const e=parseFloat(i);isNaN(e)?r.push(i):r.push(Math.ceil(e*t*n)/n)}else r.push(i);i=o.shift();if(i===void 0)return r.join("");s=!s}}function splitSVGDefs(e,t="defs"){let n="";const o=e.indexOf("<"+t);while(o>=0){const r=e.indexOf(">",o);const i=e.indexOf("</"+t);if(r===-1||i===-1)break;const s=e.indexOf(">",i);if(s===-1)break;n+=e.slice(r+1,i).trim();e=e.slice(0,o).trim()+e.slice(s+1)}return{defs:n,content:e}}function mergeDefsAndContent(e,t){return e?"<defs>"+e+"</defs>"+t:t}function wrapSVGContent(e,t,n){const o=splitSVGDefs(e);return mergeDefsAndContent(o.defs,t+o.content+n)}const isUnsetKeyword=e=>e==="unset"||e==="undefined"||e==="none";function iconToSVG(e,t){const o={...n,...e};const r={...i,...t};const s={left:o.left,top:o.top,width:o.width,height:o.height};let c=o.body;[o,r].forEach((e=>{const t=[];const n=e.hFlip;const o=e.vFlip;let r=e.rotate;if(n)if(o)r+=2;else{t.push("translate("+(s.width+s.left).toString()+" "+(0-s.top).toString()+")");t.push("scale(-1 1)");s.top=s.left=0}else if(o){t.push("translate("+(0-s.left).toString()+" "+(s.height+s.top).toString()+")");t.push("scale(1 -1)");s.top=s.left=0}let i;r<0&&(r-=Math.floor(r/4)*4);r%=4;switch(r){case 1:i=s.height/2+s.top;t.unshift("rotate(90 "+i.toString()+" "+i.toString()+")");break;case 2:t.unshift("rotate(180 "+(s.width/2+s.left).toString()+" "+(s.height/2+s.top).toString()+")");break;case 3:i=s.width/2+s.left;t.unshift("rotate(-90 "+i.toString()+" "+i.toString()+")");break}if(r%2===1){if(s.left!==s.top){i=s.left;s.left=s.top;s.top=i}if(s.width!==s.height){i=s.width;s.width=s.height;s.height=i}}t.length&&(c=wrapSVGContent(c,'<g transform="'+t.join(" ")+'">',"</g>"))}));const a=r.width;const l=r.height;const u=s.width;const f=s.height;let d;let h;if(a===null){h=l===null?"1em":l==="auto"?f:l;d=calculateSize$1(h,u/f)}else{d=a==="auto"?u:a;h=l===null?calculateSize$1(d,f/u):l==="auto"?f:l}const p={};const setAttr=(e,t)=>{isUnsetKeyword(t)||(p[e]=t.toString())};setAttr("width",d);setAttr("height",h);const g=[s.left,s.top,u,f];p.viewBox=g.join(" ");return{attributes:p,viewBox:g,body:c}}function iconToHTML$1(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const e in t)n+=" "+e+'="'+t[e]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function encodeSVGforURL(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function svgToData(e){return"data:image/svg+xml,"+encodeSVGforURL(e)}function svgToURL$1(e){return'url("'+svgToData(e)+'")'}const detectFetch=()=>{let e;try{e=fetch;if(typeof e==="function")return e}catch(e){}};let L=detectFetch();function setFetch(e){L=e}function getFetch(){return L}function calculateMaxLength(e,t){const n=getAPIConfig(e);if(!n)return 0;let o;if(n.maxURL){let e=0;n.resources.forEach((t=>{const n=t;e=Math.max(e,n.length)}));const r=t+".json?icons=";o=n.maxURL-e-n.path.length-r.length}else o=0;return o}function shouldAbort(e){return e===404}const prepare=(e,t,n)=>{const o=[];const r=calculateMaxLength(e,t);const i="icons";let s={type:i,provider:e,prefix:t,icons:[]};let c=0;n.forEach(((n,a)=>{c+=n.length+1;if(c>=r&&a>0){o.push(s);s={type:i,provider:e,prefix:t,icons:[]};c=n.length}s.icons.push(n)}));o.push(s);return o};function getPath(e){if(typeof e==="string"){const t=getAPIConfig(e);if(t)return t.path}return"/"}const send=(e,t,n)=>{if(!L){n("abort",424);return}let o=getPath(t.provider);switch(t.type){case"icons":{const e=t.prefix;const n=t.icons;const r=n.join(",");const i=new URLSearchParams({icons:r});o+=e+".json?"+i.toString();break}case"custom":{const e=t.uri;o+=e.slice(0,1)==="/"?e.slice(1):e;break}default:n("abort",400);return}let r=503;L(e+o).then((e=>{const t=e.status;if(t===200){r=501;return e.json()}setTimeout((()=>{n(shouldAbort(t)?"abort":"next",t)}))})).then((e=>{typeof e==="object"&&e!==null?setTimeout((()=>{n("success",e)})):setTimeout((()=>{e===404?n("abort",e):n("next",r)}))})).catch((()=>{n("next",r)}))};const R={prepare:prepare,send:send};function toggleBrowserCache(e,t){switch(e){case"local":case"session":A[e]=t;break;case"all":for(const e in A)A[e]=t;break}}const E="data-style";let F="";function appendCustomStyle(e){F=e}function updateStyle(e,t){let n=Array.from(e.childNodes).find((e=>e.hasAttribute&&e.hasAttribute(E)));if(!n){n=document.createElement("style");n.setAttribute(E,E);e.appendChild(n)}n.textContent=":host{display:inline-block;vertical-align:"+(t?"-0.125em":"0")+"}span,svg{display:block}"+F}function exportFunctions(){setAPIModule("",R);allowSimpleNames(true);let e;try{e=window}catch(e){}if(e){initBrowserStorage();if(e.IconifyPreload!==void 0){const t=e.IconifyPreload;const n="Invalid IconifyPreload syntax.";typeof t==="object"&&t!==null&&(t instanceof Array?t:[t]).forEach((e=>{try{(typeof e!=="object"||e===null||e instanceof Array||typeof e.icons!=="object"||typeof e.prefix!=="string"||!addCollection$1(e))&&console.error(n)}catch(e){console.error(n)}}))}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t==="object"&&t!==null)for(const e in t){const n="IconifyProviders["+e+"] is invalid.";try{const o=t[e];if(typeof o!=="object"||!o||o.resources===void 0)continue;addAPIProvider$1(e,o)||console.error(n)}catch(e){console.error(n)}}}}const t={getAPIConfig:getAPIConfig,setAPIModule:setAPIModule,sendAPIQuery:sendAPIQuery,setFetch:setFetch,getFetch:getFetch,listAPIProviders:listAPIProviders};return{enableCache:e=>toggleBrowserCache(e,true),disableCache:e=>toggleBrowserCache(e,false),iconLoaded:iconLoaded$1,iconExists:iconLoaded$1,getIcon:getIcon$1,listIcons:listIcons$1,addIcon:addIcon$1,addCollection:addCollection$1,calculateSize:calculateSize$1,buildIcon:iconToSVG,iconToHTML:iconToHTML$1,svgToURL:svgToURL$1,loadIcons:loadIcons$1,loadIcon:loadIcon$1,addAPIProvider:addAPIProvider$1,appendCustomStyle:appendCustomStyle,_api:t}}const N={"background-color":"currentColor"};const $={"background-color":"transparent"};const B={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"};const Q={"-webkit-mask":N,mask:N,background:$};for(const e in Q){const t=Q[e];for(const n in B)t[e+"-"+n]=B[n]}function fixSize(e){return e?e+(e.match(/^[-0-9.]+$/)?"px":""):"inherit"}function renderSPAN(e,t,n){const o=document.createElement("span");let r=e.body;r.indexOf("<a")!==-1&&(r+="\x3c!-- "+Date.now()+" --\x3e");const i=e.attributes;const s=iconToHTML$1(r,{...i,width:t.width+"",height:t.height+""});const c=svgToURL$1(s);const a=o.style;const l={"--svg":c,width:fixSize(i.width),height:fixSize(i.height),...n?N:$};for(const e in l)a.setProperty(e,l[e]);return o}let D;function createPolicy(){try{D=window.trustedTypes.createPolicy("iconify",{createHTML:e=>e})}catch(e){D=null}}function cleanUpInnerHTML(e){D===void 0&&createPolicy();return D?D.createHTML(e):e}function renderSVG(e){const t=document.createElement("span");const n=e.attributes;let o="";n.width||(o="width: inherit;");n.height||(o+="height: inherit;");o&&(n.style=o);const r=iconToHTML$1(e.body,n);t.innerHTML=cleanUpInnerHTML(r);return t.firstChild}function findIconElement(e){return Array.from(e.childNodes).find((e=>{const t=e.tagName&&e.tagName.toUpperCase();return t==="SPAN"||t==="SVG"}))}function renderIcon(e,t){const o=t.icon.data;const r=t.customisations;const i=iconToSVG(o,r);r.preserveAspectRatio&&(i.attributes.preserveAspectRatio=r.preserveAspectRatio);const s=t.renderedMode;let c;switch(s){case"svg":c=renderSVG(i);break;default:c=renderSPAN(i,{...n,...o},s==="mask")}const a=findIconElement(e);a?c.tagName==="SPAN"&&a.tagName===c.tagName?a.setAttribute("style",c.getAttribute("style")):e.replaceChild(c,a):e.appendChild(c)}function setPendingState(e,t,n){const o=n&&(n.rendered?n:n.lastRender);return{rendered:false,inline:t,icon:e,lastRender:o}}function defineIconifyIcon(e="iconify-icon"){let t;let n;try{t=window.customElements;n=window.HTMLElement}catch(e){return}if(!t||!n)return;const o=t.get(e);if(o)return o;const r=["icon","mode","inline","noobserver","width","height","rotate","flip"];const i=class extends n{_shadowRoot;_initialised=false;_state;_checkQueued=false;_connected=false;_observer=null;_visible=true;constructor(){super();const e=this._shadowRoot=this.attachShadow({mode:"open"});const t=this.hasAttribute("inline");updateStyle(e,t);this._state=setPendingState({value:""},t);this._queueCheck()}connectedCallback(){this._connected=true;this.startObserver()}disconnectedCallback(){this._connected=false;this.stopObserver()}static get observedAttributes(){return r.slice(0)}attributeChangedCallback(e){switch(e){case"inline":{const e=this.hasAttribute("inline");const t=this._state;if(e!==t.inline){t.inline=e;updateStyle(this._shadowRoot,e)}break}case"noobserver":{const e=this.hasAttribute("noobserver");e?this.startObserver():this.stopObserver();break}default:this._queueCheck()}}get icon(){const e=this.getAttribute("icon");if(e&&e.slice(0,1)==="{")try{return JSON.parse(e)}catch(e){}return e}set icon(e){typeof e==="object"&&(e=JSON.stringify(e));this.setAttribute("icon",e)}get inline(){return this.hasAttribute("inline")}set inline(e){e?this.setAttribute("inline","true"):this.removeAttribute("inline")}get observer(){return this.hasAttribute("observer")}set observer(e){e?this.setAttribute("observer","true"):this.removeAttribute("observer")}restartAnimation(){const e=this._state;if(e.rendered){const t=this._shadowRoot;if(e.renderedMode==="svg")try{t.lastChild.setCurrentTime(0);return}catch(e){}renderIcon(t,e)}}get status(){const e=this._state;return e.rendered?"rendered":e.icon.data===null?"failed":"loading"}_queueCheck(){if(!this._checkQueued){this._checkQueued=true;setTimeout((()=>{this._check()}))}}_check(){if(!this._checkQueued)return;this._checkQueued=false;const e=this._state;const t=this.getAttribute("icon");if(t!==e.icon.value){this._iconChanged(t);return}if(!e.rendered||!this._visible)return;const n=this.getAttribute("mode");const o=getCustomisations(this);e.attrMode===n&&!haveCustomisationsChanged(e.customisations,o)&&findIconElement(this._shadowRoot)||this._renderIcon(e.icon,o,n)}_iconChanged(e){const t=parseIconValue(e,((e,t,n)=>{const o=this._state;if(o.rendered||this.getAttribute("icon")!==e)return;const r={value:e,name:t,data:n};r.data?this._gotIconData(r):o.icon=r}));t.data?this._gotIconData(t):this._state=setPendingState(t,this._state.inline,this._state)}_forceRender(){if(this._visible)this._queueCheck();else{const e=findIconElement(this._shadowRoot);e&&this._shadowRoot.removeChild(e)}}_gotIconData(e){this._checkQueued=false;this._renderIcon(e,getCustomisations(this),this.getAttribute("mode"))}_renderIcon(e,t,n){const o=getRenderMode(e.data.body,n);const r=this._state.inline;renderIcon(this._shadowRoot,this._state={rendered:true,icon:e,inline:r,customisations:t,attrMode:n,renderedMode:o})}startObserver(){if(!this._observer&&!this.hasAttribute("noobserver"))try{this._observer=new IntersectionObserver((e=>{const t=e.some((e=>e.isIntersecting));if(t!==this._visible){this._visible=t;this._forceRender()}}));this._observer.observe(this)}catch(e){if(this._observer){try{this._observer.disconnect()}catch(e){}this._observer=null}}}stopObserver(){if(this._observer){this._observer.disconnect();this._observer=null;this._visible=true;this._connected&&this._forceRender()}}};r.forEach((e=>{e in i.prototype||Object.defineProperty(i.prototype,e,{get:function(){return this.getAttribute(e)},set:function(t){t!==null?this.setAttribute(e,t):this.removeAttribute(e)}})}));const s=exportFunctions();for(const e in s)i[e]=i.prototype[e]=s[e];t.define(e,i);return i}const z=defineIconifyIcon()||exportFunctions();const{enableCache:V,disableCache:U,iconLoaded:G,iconExists:q,getIcon:H,listIcons:J,addIcon:K,addCollection:W,calculateSize:X,buildIcon:Y,iconToHTML:Z,svgToURL:ee,loadIcons:te,loadIcon:ne,addAPIProvider:oe,_api:re}=z;export{z as IconifyIconComponent,re as _api,oe as addAPIProvider,W as addCollection,K as addIcon,appendCustomStyle,Y as buildIcon,X as calculateSize,U as disableCache,V as enableCache,H as getIcon,q as iconExists,G as iconLoaded,Z as iconToHTML,J as listIcons,ne as loadIcon,te as loadIcons,ee as svgToURL};
