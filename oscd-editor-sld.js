/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4=window,e$b=t$4.ShadowRoot&&(void 0===t$4.ShadyCSS||t$4.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$6=Symbol(),n$9=new WeakMap;let o$a = class o{constructor(t,e,n){if(this._$cssResult$=true,n!==s$6)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$b&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$9.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$9.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new o$a("string"==typeof t?t:t+"",void 0,s$6),i$6=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$a(n,t,s$6)},S$2=(s,n)=>{e$b?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$4.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$3=e$b?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$5;const e$a=window,r$3=e$a.trustedTypes,h$4=r$3?r$3.emptyScript:"",o$9=e$a.reactiveElementPolyfillSupport,n$8={toAttribute(t,i){switch(i){case Boolean:t=t?h$4:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$3=(t,i)=>i!==t&&(i==i||t==t),l$7={attribute:true,type:String,converter:n$8,reflect:false,hasChanged:a$3},d$2="finalized";let u$2 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=false,this.hasUpdated=false,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$7){if(i.state&&(i.attribute=false),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$7}static finalize(){if(this.hasOwnProperty(d$2))return  false;this[d$2]=true;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),true}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$3(i));}else void 0!==i&&s.push(c$3(i));return s}static _$Ep(t,i){const s=i.attribute;return  false===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(true),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$7){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&true===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$8).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$8;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=true;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$3)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),true===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=false),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=true;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=false;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=false,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return  true}update(t){ void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$2[d$2]=true,u$2.elementProperties=new Map,u$2.elementStyles=[],u$2.shadowRootOptions={mode:"open"},null==o$9||o$9({ReactiveElement:u$2}),(null!==(s$5=e$a.reactiveElementVersions)&&void 0!==s$5?s$5:e$a.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$3;const i$5=window,s$4=i$5.trustedTypes,e$9=s$4?s$4.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$8="$lit$",n$7=`lit$${(Math.random()+"").slice(9)}$`,l$6="?"+n$7,h$3=`<${l$6}>`,r$2=document,u$1=()=>r$2.createComment(""),d$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$2=Array.isArray,v$1=t=>c$2(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$2="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_$1=/-->/g,m$1=/>/g,p$1=RegExp(`>|${a$2}(?:([^\\s"'>=/]+)(${a$2}*=${a$2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g$1=/'/g,$$1=/"/g,y$1=/^(?:script|style|textarea|title)$/i,T$1=Symbol.for("lit-noChange"),A$1=Symbol.for("lit-nothing"),E$1=new WeakMap,C$1=r$2.createTreeWalker(r$2,129,null,false);function P$1(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$9?e$9.createHTML(i):i}const V$1=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$1?"!--"===c[1]?u=_$1:void 0!==c[1]?u=m$1:void 0!==c[2]?(y$1.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p$1):void 0!==c[3]&&(u=p$1):u===p$1?">"===c[0]?(u=null!=l?l:f$1,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p$1:'"'===c[3]?$$1:g$1):u===$$1||u===g$1?u=p$1:u===_$1||u===m$1?u=f$1:(u=p$1,l=void 0);const w=u===p$1&&t[i+1].startsWith("/>")?" ":"";r+=u===f$1?s+h$3:v>=0?(e.push(d),s.slice(0,v)+o$8+s.slice(v)+n$7+w):s+n$7+(-2===v?(e.push(void 0),i):w);}return [P$1(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};let N$1 = class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V$1(t,i);if(this.el=N.createElement(a,e),C$1.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C$1.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$8)||i.startsWith(n$7)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$8).split(n$7),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H$1:"?"===i[1]?L$1:"@"===i[1]?z$1:k$1});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y$1.test(h.tagName)){const t=h.textContent.split(n$7),i=t.length-1;if(i>0){h.textContent=s$4?s$4.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u$1()),C$1.nextNode(),v.push({type:2,index:++r});h.append(t[i],u$1());}}}else if(8===h.nodeType)if(h.data===l$6)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$7,t+1));)v.push({type:7,index:r}),t+=n$7.length-1;}r++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}};function S$1(t,i,s=t,e){var o,n,l,h;if(i===T$1)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d$1(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,false),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S$1(t,r._$AS(t,i.values),r,e)),i}let M$1 = class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$2).importNode(s,true);C$1.currentNode=o;let n=C$1.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R$1(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z$1(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C$1.nextNode(),l++);}return C$1.currentNode=r$2,o}v(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}};let R$1 = class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S$1(this,t,i),d$1(t)?t===A$1||null==t||""===t?(this._$AH!==A$1&&this._$AR(),this._$AH=A$1):t!==this._$AH&&t!==T$1&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v$1(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A$1&&d$1(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$2.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N$1.createElement(P$1(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M$1(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E$1.get(t.strings);return void 0===i&&E$1.set(t.strings,i=new N$1(t)),i}T(t){c$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u$1()),this.k(u$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}};let k$1 = class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A$1;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=false;if(void 0===o)t=S$1(this,t,i,0),n=!d$1(t)||t!==this._$AH&&t!==T$1,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S$1(this,e[s+l],i,l),h===T$1&&(h=this._$AH[l]),n||(n=!d$1(h)||h!==this._$AH[l]),h===A$1?t=A$1:t!==A$1&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}};let H$1 = class H extends k$1{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A$1?void 0:t;}};const I$1=s$4?s$4.emptyScript:"";let L$1 = class L extends k$1{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A$1?this.element.setAttribute(this.name,I$1):this.element.removeAttribute(this.name);}};let z$1 = class z extends k$1{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A$1)===T$1)return;const e=this._$AH,o=t===A$1&&e!==A$1||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A$1&&(e===A$1||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}};let Z$1 = class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S$1(this,t);}};const B$1=i$5.litHtmlPolyfillSupport;null==B$1||B$1(N$1,R$1),(null!==(t$3=i$5.litHtmlVersions)&&void 0!==t$3?t$3:i$5.litHtmlVersions=[]).push("2.8.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$4=window,s$3=i$4.trustedTypes,e$8=s$3?s$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$7="$lit$",n$6=`lit$${(Math.random()+"").slice(9)}$`,l$5="?"+n$6,h$2=`<${l$5}>`,r$1=document,u=()=>r$1.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$1=Array.isArray,v=t=>c$1(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$1="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),b=w(2),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r$1.createTreeWalker(r$1,129,null,false);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$8?e$8.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h$2:v>=0?(e.push(d),s.slice(0,v)+o$7+s.slice(v)+n$6+w):s+n$6+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$7)||i.startsWith(n$6)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$7).split(n$6),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$6),i=t.length-1;if(i>0){h.textContent=s$3?s$3.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$5)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$6,t+1));)v.push({type:7,index:r}),t+=n$6.length-1;}r++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,false),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$1).importNode(s,true);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r$1,o}v(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$1.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=false;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$3?s$3.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$4.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$2=i$4.litHtmlVersions)&&void 0!==t$2?t$2:i$4.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$4,o$6;let s$2 = class s extends u$2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(true);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(false);}render(){return T}};s$2.finalized=true,s$2._$litElement$=true,null===(l$4=globalThis.litElementHydrateSupport)||void 0===l$4||l$4.call(globalThis,{LitElement:s$2});const n$5=globalThis.litElementPolyfillSupport;null==n$5||n$5({LitElement:s$2});(null!==(o$6=globalThis.litElementVersions)&&void 0!==o$6?o$6:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$7=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$3=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e$6=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$4(n){return (t,o)=>void 0!==o?e$6(n,t,o):i$3(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$1(t){return n$4({...t,state:true})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$5=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e$5(e){return o$5({finisher:(r,t)=>{Object.assign(r.prototype[t],e);}})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i$2(i,n){return o$5({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:true,configurable:true};return t}})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$4(e){return o$5({descriptor:r=>({async get(){var r;return await this.updateComplete,null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e)},enumerable:true,configurable:true})})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$3;const e$3=null!=(null===(n$3=window.HTMLSlotElement)||void 0===n$3?void 0:n$3.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));function l$3(n){const{slot:l,selector:t}=null!=n?n:{};return o$5({descriptor:o=>({get(){var o;const r="slot"+(l?`[name=${l}]`:":not([name])"),i=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(r),s=null!=i?e$3(i,n):[];return t?s.filter((o=>o.matches(t))):s},enumerable:true,configurable:true})})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function o$4(o,n,r){let l,s=o;return l={flatten:n},r?l$3({slot:s,flatten:n,selector:r}):o$5({descriptor:e=>({get(){var e,t;const o="slot"+(":not([name])"),n=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(o);return null!==(t=null==n?void 0:n.assignedNodes(l))&&void 0!==t?t:[]},enumerable:true,configurable:true})})}

function newEditEventV2(edit, options) {
    return new CustomEvent('oscd-edit-v2', {
        composed: true,
        bubbles: true,
        detail: { ...options, edit },
    });
}

const tAbstractConductingEquipment = [
    'TransformerWinding',
    'ConductingEquipment',
];
const tEquipment = [
    'GeneralEquipment',
    'PowerTransformer',
    ...tAbstractConductingEquipment,
];
const tEquipmentContainer = ['Substation', 'VoltageLevel', 'Bay'];
const tGeneralEquipmentContainer = ['Process', 'Line'];
const tAbstractEqFuncSubFunc = ['EqSubFunction', 'EqFunction'];
const tPowerSystemResource = [
    'SubFunction',
    'Function',
    'TapChanger',
    'SubEquipment',
    ...tEquipment,
    ...tEquipmentContainer,
    ...tGeneralEquipmentContainer,
    ...tAbstractEqFuncSubFunc,
];
const tLNodeContainer = ['ConnectivityNode', ...tPowerSystemResource];
const tCertificate = ['GOOSESecurity', 'SMVSecurity'];
const tNaming = ['SubNetwork', ...tCertificate, ...tLNodeContainer];
const tAbstractDataAttribute = ['BDA', 'DA'];
const tControlWithIEDName = ['SampledValueControl', 'GSEControl'];
const tControlWithTriggerOpt = ['LogControl', 'ReportControl'];
const tControl = [...tControlWithIEDName, ...tControlWithTriggerOpt];
const tControlBlock = ['GSE', 'SMV'];
const tUnNaming = [
    'ConnectedAP',
    'PhysConn',
    'SDO',
    'DO',
    'DAI',
    'SDI',
    'DOI',
    'Inputs',
    'RptEnabled',
    'Server',
    'ServerAt',
    'SettingControl',
    'Communication',
    'Log',
    'LDevice',
    'DataSet',
    'AccessPoint',
    'IED',
    'NeutralPoint',
    ...tControl,
    ...tControlBlock,
    ...tAbstractDataAttribute,
];
const tAnyLN = ['LN0', 'LN'];
const tAnyContentFromOtherNamespace = [
    'Text',
    'Private',
    'Hitem',
    'AccessControl',
];
const tCert = ['Subject', 'IssuerName'];
const tDurationInMilliSec = ['MinTime', 'MaxTime'];
const tIDNaming = ['LNodeType', 'DOType', 'DAType', 'EnumType'];
const tServiceYesNo = [
    'FileHandling',
    'TimeSyncProt',
    'CommProt',
    'SGEdit',
    'ConfSG',
    'GetDirectory',
    'GetDataObjectDefinition',
    'DataObjectDirectory',
    'GetDataSetValue',
    'SetDataSetValue',
    'DataSetDirectory',
    'ReadWrite',
    'TimerActivatedControl',
    'GetCBValues',
    'GSEDir',
    'ConfLdName',
];
const tServiceWithMaxAndMaxAttributes = ['DynDataSet', 'ConfDataSet'];
const tServiceWithMax = [
    'GSSE',
    'GOOSE',
    'ConfReportControl',
    'SMVsc',
    ...tServiceWithMaxAndMaxAttributes,
];
const tServiceWithMaxNonZero = ['ConfLogControl', 'ConfSigRef'];
const tServiceSettings = [
    'ReportSettings',
    'LogSettings',
    'GSESettings',
    'SMVSettings',
];
const tBaseElement = ['SCL', ...tNaming, ...tUnNaming, ...tIDNaming];
const sCLTags = [
    ...tBaseElement,
    ...tAnyContentFromOtherNamespace,
    'Header',
    'LNode',
    'Val',
    'Voltage',
    'Services',
    ...tCert,
    ...tDurationInMilliSec,
    'Association',
    'FCDA',
    'ClientLN',
    'IEDName',
    'ExtRef',
    'Protocol',
    ...tAnyLN,
    ...tServiceYesNo,
    'DynAssociation',
    'SettingGroups',
    ...tServiceWithMax,
    ...tServiceWithMaxNonZero,
    ...tServiceSettings,
    'ConfLNs',
    'ClientServices',
    'SupSubscription',
    'ValueHandling',
    'RedProt',
    'McSecurity',
    'KDC',
    'Address',
    'P',
    'ProtNs',
    'EnumVal',
    'Terminal',
    'BitRate',
    'Authentication',
    'DataTypeTemplates',
    'History',
    'OptFields',
    'SmvOpts',
    'TrgOps',
    'SamplesPerSec',
    'SmpRate',
    'SecPerSamples',
];
const tBaseNameSequence = ['Text', 'Private'];
const tNamingSequence = [...tBaseNameSequence];
const tUnNamingSequence = [...tBaseNameSequence];
const tIDNamingSequence = [...tBaseNameSequence];
const tAbstractDataAttributeSequence = [...tUnNamingSequence, 'Val'];
const tLNodeContainerSequence = [...tNamingSequence, 'LNode'];
const tPowerSystemResourceSequence = [...tLNodeContainerSequence];
const tEquipmentSequence = [...tPowerSystemResourceSequence];
const tEquipmentContainerSequence = [
    ...tPowerSystemResourceSequence,
    'PowerTransformer',
    'GeneralEquipment',
];
const tAbstractConductingEquipmentSequence = [
    ...tEquipmentSequence,
    'Terminal',
];
const tControlBlockSequence = [...tUnNamingSequence, 'Address'];
const tControlSequence = [...tNamingSequence];
const tControlWithIEDNameSequence = [...tControlSequence, 'IEDName'];
const tAnyLNSequence = [
    ...tUnNamingSequence,
    'DataSet',
    'ReportControl',
    'LogControl',
    'DOI',
    'Inputs',
    'Log',
];
const tGeneralEquipmentContainerSequence = [
    ...tPowerSystemResourceSequence,
    'GeneralEquipment',
    'Function',
];
const tControlWithTriggerOptSequence = [...tControlSequence, 'TrgOps'];
const tAbstractEqFuncSubFuncSequence = [
    ...tPowerSystemResourceSequence,
    'GeneralEquipment',
    'EqSubFunction',
];
const tags$1 = {
    AccessControl: {
        parents: ['LDevice'],
        children: [],
    },
    AccessPoint: {
        parents: ['IED'],
        children: [
            ...tNamingSequence,
            'Server',
            'LN',
            'ServerAt',
            'Services',
            'GOOSESecurity',
            'SMVSecurity',
        ],
    },
    Address: {
        parents: ['ConnectedAP', 'GSE', 'SMV'],
        children: ['P'],
    },
    Association: {
        parents: ['Server'],
        children: [],
    },
    Authentication: {
        parents: ['Server'],
        children: [],
    },
    BDA: {
        parents: ['DAType'],
        children: [...tAbstractDataAttributeSequence],
    },
    BitRate: {
        parents: ['SubNetwork'],
        children: [],
    },
    Bay: {
        parents: ['VoltageLevel'],
        children: [
            ...tEquipmentContainerSequence,
            'ConductingEquipment',
            'ConnectivityNode',
            'Function',
        ],
    },
    ClientLN: {
        parents: ['RptEnabled'],
        children: [],
    },
    ClientServices: {
        parents: ['Services'],
        children: ['TimeSyncProt', 'McSecurity'],
    },
    CommProt: {
        parents: ['Services'],
        children: [],
    },
    Communication: {
        parents: ['SCL'],
        children: [...tUnNamingSequence, 'SubNetwork'],
    },
    ConductingEquipment: {
        parents: ['Process', 'Line', 'SubFunction', 'Function', 'Bay'],
        children: [
            ...tAbstractConductingEquipmentSequence,
            'EqFunction',
            'SubEquipment',
        ],
    },
    ConfDataSet: {
        parents: ['Services'],
        children: [],
    },
    ConfLdName: {
        parents: ['Services'],
        children: [],
    },
    ConfLNs: {
        parents: ['Services'],
        children: [],
    },
    ConfLogControl: {
        parents: ['Services'],
        children: [],
    },
    ConfReportControl: {
        parents: ['Services'],
        children: [],
    },
    ConfSG: {
        parents: ['SettingGroups'],
        children: [],
    },
    ConfSigRef: {
        parents: ['Services'],
        children: [],
    },
    ConnectedAP: {
        parents: ['SubNetwork'],
        children: [...tUnNamingSequence, 'Address', 'GSE', 'SMV', 'PhysConn'],
    },
    ConnectivityNode: {
        parents: ['Bay', 'Line'],
        children: [...tLNodeContainerSequence],
    },
    DA: {
        parents: ['DOType'],
        children: [...tAbstractDataAttributeSequence],
    },
    DAI: {
        parents: ['DOI', 'SDI'],
        children: [...tUnNamingSequence, 'Val'],
    },
    DAType: {
        parents: ['DataTypeTemplates'],
        children: [...tIDNamingSequence, 'BDA', 'ProtNs'],
    },
    DO: {
        parents: ['LNodeType'],
        children: [...tUnNamingSequence],
    },
    DOI: {
        parents: [...tAnyLN],
        children: [...tUnNamingSequence, 'SDI', 'DAI'],
    },
    DOType: {
        parents: ['DataTypeTemplates'],
        children: [...tIDNamingSequence, 'SDO', 'DA'],
    },
    DataObjectDirectory: {
        parents: ['Services'],
        children: [],
    },
    DataSet: {
        parents: [...tAnyLN],
        children: [...tNamingSequence, 'FCDA'],
    },
    DataSetDirectory: {
        parents: ['Services'],
        children: [],
    },
    DataTypeTemplates: {
        parents: ['SCL'],
        children: ['LNodeType', 'DOType', 'DAType', 'EnumType'],
    },
    DynAssociation: {
        parents: ['Services'],
        children: [],
    },
    DynDataSet: {
        parents: ['Services'],
        children: [],
    },
    EnumType: {
        parents: ['DataTypeTemplates'],
        children: [...tIDNamingSequence, 'EnumVal'],
    },
    EnumVal: {
        parents: ['EnumType'],
        children: [],
    },
    EqFunction: {
        parents: [
            'GeneralEquipment',
            'TapChanger',
            'TransformerWinding',
            'PowerTransformer',
            'SubEquipment',
            'ConductingEquipment',
        ],
        children: [...tAbstractEqFuncSubFuncSequence],
    },
    EqSubFunction: {
        parents: ['EqSubFunction', 'EqFunction'],
        children: [...tAbstractEqFuncSubFuncSequence],
    },
    ExtRef: {
        parents: ['Inputs'],
        children: [],
    },
    FCDA: {
        parents: ['DataSet'],
        children: [],
    },
    FileHandling: {
        parents: ['Services'],
        children: [],
    },
    Function: {
        parents: ['Bay', 'VoltageLevel', 'Substation', 'Process', 'Line'],
        children: [
            ...tPowerSystemResourceSequence,
            'SubFunction',
            'GeneralEquipment',
            'ConductingEquipment',
        ],
    },
    GeneralEquipment: {
        parents: [
            'SubFunction',
            'Function',
            ...tGeneralEquipmentContainer,
            ...tAbstractEqFuncSubFunc,
            ...tEquipmentContainer,
        ],
        children: [...tEquipmentSequence, 'EqFunction'],
    },
    GetCBValues: {
        parents: ['Services'],
        children: [],
    },
    GetDataObjectDefinition: {
        parents: ['Services'],
        children: [],
    },
    GetDataSetValue: {
        parents: ['Services'],
        children: [],
    },
    GetDirectory: {
        parents: ['Services'],
        children: [],
    },
    GOOSE: {
        parents: ['Services'],
        children: [],
    },
    GOOSESecurity: {
        parents: ['AccessPoint'],
        children: [...tNamingSequence, 'Subject', 'IssuerName'],
    },
    GSE: {
        parents: ['ConnectedAP'],
        children: [...tControlBlockSequence, 'MinTime', 'MaxTime'],
    },
    GSEDir: {
        parents: ['Services'],
        children: [],
    },
    GSEControl: {
        parents: ['LN0'],
        children: [...tControlWithIEDNameSequence, 'Protocol'],
    },
    GSESettings: {
        parents: ['Services'],
        children: [],
    },
    GSSE: {
        parents: ['Services'],
        children: [],
    },
    Header: {
        parents: ['SCL'],
        children: ['Text', 'History'],
    },
    History: {
        parents: ['Header'],
        children: ['Hitem'],
    },
    Hitem: {
        parents: ['History'],
        children: [],
    },
    IED: {
        parents: ['SCL'],
        children: [...tUnNamingSequence, 'Services', 'AccessPoint', 'KDC'],
    },
    IEDName: {
        parents: ['GSEControl', 'SampledValueControl'],
        children: [],
    },
    Inputs: {
        parents: [...tAnyLN],
        children: [...tUnNamingSequence, 'ExtRef'],
    },
    IssuerName: {
        parents: ['GOOSESecurity', 'SMVSecurity'],
        children: [],
    },
    KDC: {
        parents: ['IED'],
        children: [],
    },
    LDevice: {
        parents: ['Server'],
        children: [...tUnNamingSequence, 'LN0', 'LN', 'AccessControl'],
    },
    LN: {
        parents: ['AccessPoint', 'LDevice'],
        children: [...tAnyLNSequence],
    },
    LN0: {
        parents: ['LDevice'],
        children: [
            ...tAnyLNSequence,
            'GSEControl',
            'SampledValueControl',
            'SettingControl',
        ],
    },
    LNode: {
        parents: [...tLNodeContainer],
        children: [...tUnNamingSequence],
    },
    LNodeType: {
        parents: ['DataTypeTemplates'],
        children: [...tIDNamingSequence, 'DO'],
    },
    Line: {
        parents: ['Process', 'SCL'],
        children: [
            ...tGeneralEquipmentContainerSequence,
            'Voltage',
            'ConductingEquipment',
        ],
    },
    Log: {
        parents: [...tAnyLN],
        children: [...tUnNamingSequence],
    },
    LogControl: {
        parents: [...tAnyLN],
        children: [...tControlWithTriggerOptSequence],
    },
    LogSettings: {
        parents: ['Services'],
        children: [],
    },
    MaxTime: {
        parents: ['GSE'],
        children: [],
    },
    McSecurity: {
        parents: ['GSESettings', 'SMVSettings', 'ClientServices'],
        children: [],
    },
    MinTime: {
        parents: ['GSE'],
        children: [],
    },
    NeutralPoint: {
        parents: ['TransformerWinding'],
        children: [...tUnNamingSequence],
    },
    OptFields: {
        parents: ['ReportControl'],
        children: [],
    },
    P: {
        parents: ['Address', 'PhysConn'],
        children: [],
    },
    PhysConn: {
        parents: ['ConnectedAP'],
        children: [...tUnNamingSequence, 'P'],
    },
    PowerTransformer: {
        parents: [...tEquipmentContainer],
        children: [
            ...tEquipmentSequence,
            'TransformerWinding',
            'SubEquipment',
            'EqFunction',
        ],
    },
    Private: {
        parents: [],
        children: [],
    },
    Process: {
        parents: ['Process', 'SCL'],
        children: [
            ...tGeneralEquipmentContainerSequence,
            'ConductingEquipment',
            'Substation',
            'Line',
            'Process',
        ],
    },
    ProtNs: {
        parents: ['DAType', 'DA'],
        children: [],
    },
    Protocol: {
        parents: ['GSEControl', 'SampledValueControl'],
        children: [],
    },
    ReadWrite: {
        parents: ['Services'],
        children: [],
    },
    RedProt: {
        parents: ['Services'],
        children: [],
    },
    ReportControl: {
        parents: [...tAnyLN],
        children: [...tControlWithTriggerOptSequence, 'OptFields', 'RptEnabled'],
    },
    ReportSettings: {
        parents: ['Services'],
        children: [],
    },
    RptEnabled: {
        parents: ['ReportControl'],
        children: [...tUnNamingSequence, 'ClientLN'],
    },
    SamplesPerSec: {
        parents: ['SMVSettings'],
        children: [],
    },
    SampledValueControl: {
        parents: ['LN0'],
        children: [...tControlWithIEDNameSequence, 'SmvOpts'],
    },
    SecPerSamples: {
        parents: ['SMVSettings'],
        children: [],
    },
    SCL: {
        parents: [],
        children: [
            ...tBaseNameSequence,
            'Header',
            'Substation',
            'Communication',
            'IED',
            'DataTypeTemplates',
            'Line',
            'Process',
        ],
    },
    SDI: {
        parents: ['DOI', 'SDI'],
        children: [...tUnNamingSequence, 'SDI', 'DAI'],
    },
    SDO: {
        parents: ['DOType'],
        children: [...tNamingSequence],
    },
    Server: {
        parents: ['AccessPoint'],
        children: [
            ...tUnNamingSequence,
            'Authentication',
            'LDevice',
            'Association',
        ],
    },
    ServerAt: {
        parents: ['AccessPoint'],
        children: [...tUnNamingSequence],
    },
    Services: {
        parents: ['IED', 'AccessPoint'],
        children: [
            'DynAssociation',
            'SettingGroups',
            'GetDirectory',
            'GetDataObjectDefinition',
            'DataObjectDirectory',
            'GetDataSetValue',
            'SetDataSetValue',
            'DataSetDirectory',
            'ConfDataSet',
            'DynDataSet',
            'ReadWrite',
            'TimerActivatedControl',
            'ConfReportControl',
            'GetCBValues',
            'ConfLogControl',
            'ReportSettings',
            'LogSettings',
            'GSESettings',
            'SMVSettings',
            'GSEDir',
            'GOOSE',
            'GSSE',
            'SMVsc',
            'FileHandling',
            'ConfLNs',
            'ClientServices',
            'ConfLdName',
            'SupSubscription',
            'ConfSigRef',
            'ValueHandling',
            'RedProt',
            'TimeSyncProt',
            'CommProt',
        ],
    },
    SetDataSetValue: {
        parents: ['Services'],
        children: [],
    },
    SettingControl: {
        parents: ['LN0'],
        children: [...tUnNamingSequence],
    },
    SettingGroups: {
        parents: ['Services'],
        children: ['SGEdit', 'ConfSG'],
    },
    SGEdit: {
        parents: ['SettingGroups'],
        children: [],
    },
    SmpRate: {
        parents: ['SMVSettings'],
        children: [],
    },
    SMV: {
        parents: ['ConnectedAP'],
        children: [...tControlBlockSequence],
    },
    SmvOpts: {
        parents: ['SampledValueControl'],
        children: [],
    },
    SMVsc: {
        parents: ['Services'],
        children: [],
    },
    SMVSecurity: {
        parents: ['AccessPoint'],
        children: [...tNamingSequence, 'Subject', 'IssuerName'],
    },
    SMVSettings: {
        parents: ['Services'],
        children: ['SmpRate', 'SamplesPerSec', 'SecPerSamples', 'McSecurity'],
    },
    SubEquipment: {
        parents: [
            'TapChanger',
            'PowerTransformer',
            'ConductingEquipment',
            'TransformerWinding',
            ...tAbstractConductingEquipment,
        ],
        children: [...tPowerSystemResourceSequence, 'EqFunction'],
    },
    SubFunction: {
        parents: ['SubFunction', 'Function'],
        children: [
            ...tPowerSystemResourceSequence,
            'GeneralEquipment',
            'ConductingEquipment',
            'SubFunction',
        ],
    },
    SubNetwork: {
        parents: ['Communication'],
        children: [...tNamingSequence, 'BitRate', 'ConnectedAP'],
    },
    Subject: {
        parents: ['GOOSESecurity', 'SMVSecurity'],
        children: [],
    },
    Substation: {
        parents: ['SCL'],
        children: [...tEquipmentContainerSequence, 'VoltageLevel', 'Function'],
    },
    SupSubscription: {
        parents: ['Services'],
        children: [],
    },
    TapChanger: {
        parents: ['TransformerWinding'],
        children: [...tPowerSystemResourceSequence, 'SubEquipment', 'EqFunction'],
    },
    Terminal: {
        parents: [...tEquipment],
        children: [...tUnNamingSequence],
    },
    Text: {
        parents: sCLTags.filter(tag => tag !== 'Text' && tag !== 'Private'),
        children: [],
    },
    TimerActivatedControl: {
        parents: ['Services'],
        children: [],
    },
    TimeSyncProt: {
        parents: ['Services', 'ClientServices'],
        children: [],
    },
    TransformerWinding: {
        parents: ['PowerTransformer'],
        children: [
            ...tAbstractConductingEquipmentSequence,
            'TapChanger',
            'NeutralPoint',
            'EqFunction',
            'SubEquipment',
        ],
    },
    TrgOps: {
        parents: ['ReportControl'],
        children: [],
    },
    Val: {
        parents: ['DAI', 'DA', 'BDA'],
        children: [],
    },
    ValueHandling: {
        parents: ['Services'],
        children: [],
    },
    Voltage: {
        parents: ['VoltageLevel'],
        children: [],
    },
    VoltageLevel: {
        parents: ['Substation'],
        children: [...tEquipmentContainerSequence, 'Voltage', 'Bay', 'Function'],
    },
};
const tagSet = new Set(sCLTags);
function isSCLTag(tag) {
    return tagSet.has(tag);
}
/** @returns parent `tagName` s for SCL (2007B4) element tag  */
/** export function parentTags(tagName: string): string[] {
  if (!isSCLTag(tagName)) return [];

  return tags[tagName].parents;
} */
/** @returns child `tagName`s for SCL (2007B4) element tag */
/** export function childTags(tagName: string): string[] {
  if (!isSCLTag(tagName)) return [];

  return tags[tagName].children;
} */
/** @returns Reference for new [[`tag`]] child within [[`parent`]]  or `null` */
function getReference(parent, tag) {
    if (!isSCLTag(tag))
        return null;
    const parentTag = parent.tagName;
    const children = Array.from(parent.children);
    if (parentTag === 'Services' ||
        parentTag === 'SettingGroups' ||
        !isSCLTag(parentTag))
        return children.find(child => child.tagName === tag) ?? null;
    const sequence = tags$1[parentTag].children;
    let index = sequence.findIndex(element => element === tag);
    if (index < 0)
        return null;
    let nextSibling;
    while (index < sequence.length && !nextSibling) {
        // eslint-disable-next-line no-loop-func
        nextSibling = children.find(child => child.tagName === sequence[index]);
        index += 1;
    }
    return nextSibling ?? null;
}

/* eslint-disable no-use-before-define */
function hitemIdentity(e) {
    return `${e.getAttribute('version')}\t${e.getAttribute('revision')}`;
}
function terminalIdentity(e) {
    return `${identity(e.parentElement)}>${e.getAttribute('connectivityNode')}`;
}
function lNodeIdentity(e) {
    const [iedName, ldInst, prefix, lnClass, lnInst, lnType] = [
        'iedName',
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'lnType',
    ].map(name => e.getAttribute(name));
    if (iedName === 'None')
        return `${identity(e.parentElement)}>(${lnClass} ${lnType})`;
    return `${iedName} ${ldInst || '(Client)'}/${prefix ?? ''} ${lnClass} ${lnInst ?? ''}`;
}
function kDCIdentity(e) {
    return `${identity(e.parentElement)}>${e.getAttribute('iedName')} ${e.getAttribute('apName')}`;
}
function associationIdentity(e) {
    const [iedName, ldInst, prefix, lnClass, lnInst] = [
        'iedName',
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'lnType',
    ].map(name => e.getAttribute(name));
    return `${identity(e.parentElement)}>${iedName} ${ldInst}/${prefix ?? ''} ${lnClass} ${lnInst ?? ''}`;
}
function lDeviceIdentity(e) {
    return `${identity(e.closest('IED'))}>>${e.getAttribute('inst')}`;
}
function iEDNameIdentity(e) {
    const iedName = e.textContent;
    const [apRef, ldInst, prefix, lnClass, lnInst] = [
        'apRef',
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
    ].map(name => e.getAttribute(name));
    return `${identity(e.parentElement)}>${iedName} ${apRef || ''} ${ldInst || ''}/${prefix ?? ''} ${lnClass ?? ''} ${lnInst ?? ''}`;
}
function fCDAIdentity(e) {
    const [ldInst, prefix, lnClass, lnInst, doName, daName, fc, ix] = [
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'doName',
        'daName',
        'fc',
        'ix',
    ].map(name => e.getAttribute(name));
    const dataPath = `${ldInst}/${prefix ?? ''} ${lnClass} ${lnInst ?? ''}.${doName} ${daName || ''}`;
    return `${identity(e.parentElement)}>${dataPath} (${fc}${ix ? ` [${ix}]` : ''})`;
}
function extRefIdentity(e) {
    if (!e.parentElement)
        return NaN;
    const parentIdentity = identity(e.parentElement);
    const iedName = e.getAttribute('iedName');
    const intAddr = e.getAttribute('intAddr');
    const intAddrIndex = Array.from(e.parentElement.querySelectorAll(`ExtRef[intAddr="${intAddr}"]`)).indexOf(e);
    if (!iedName)
        return `${parentIdentity}>${intAddr}[${intAddrIndex}]`;
    const [ldInst, prefix, lnClass, lnInst, doName, daName, serviceType, srcLDInst, srcPrefix, srcLNClass, srcLNInst, srcCBName,] = [
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'doName',
        'daName',
        'serviceType',
        'srcLDInst',
        'srcPrefix',
        'srcLNClass',
        'srcLNInst',
        'srcCBName',
    ].map(name => e.getAttribute(name));
    const cbPath = srcCBName
        ? `${serviceType}:${srcCBName} ${srcLDInst ?? ''}/${srcPrefix ?? ''} ${srcLNClass ?? ''} ${srcLNInst ?? ''}`
        : '';
    const dataPath = `${iedName} ${ldInst}/${prefix ?? ''} ${lnClass} ${lnInst ?? ''} ${doName} ${daName || ''}`;
    return `${parentIdentity}>${cbPath ? `${cbPath} ` : ''}${dataPath}${
    // eslint-disable-next-line no-useless-concat
    intAddr ? '@' + `${intAddr}` : ''}`;
}
function lNIdentity(e) {
    const [prefix, lnClass, inst] = ['prefix', 'lnClass', 'inst'].map(name => e.getAttribute(name));
    return `${identity(e.parentElement)}>${prefix ?? ''} ${lnClass} ${inst}`;
}
function clientLNIdentity(e) {
    const [apRef, iedName, ldInst, prefix, lnClass, lnInst] = [
        'apRef',
        'iedName',
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
    ].map(name => e.getAttribute(name));
    return `${identity(e.parentElement)}>${iedName} ${apRef || ''} ${ldInst}/${prefix ?? ''} ${lnClass} ${lnInst}`;
}
function ixNamingIdentity(e) {
    const [name, ix] = ['name', 'ix'].map(naming => e.getAttribute(naming));
    return `${identity(e.parentElement)}>${name}${ix ? `[${ix}]` : ''}`;
}
function valIdentity(e) {
    if (!e.parentElement)
        return NaN;
    const sGroup = e.getAttribute('sGroup');
    const index = Array.from(e.parentElement.children)
        .filter(child => child.getAttribute('sGroup') === sGroup)
        .findIndex(child => child.isSameNode(e));
    return `${identity(e.parentElement)}>${sGroup ? `${sGroup}.` : ''} ${index}`;
}
function connectedAPIdentity(e) {
    const [iedName, apName] = ['iedName', 'apName'].map(name => e.getAttribute(name));
    return `${iedName} ${apName}`;
}
function controlBlockIdentity(e) {
    const [ldInst, cbName] = ['ldInst', 'cbName'].map(name => e.getAttribute(name));
    return `${ldInst} ${cbName}`;
}
function physConnIdentity(e) {
    if (!e.parentElement)
        return NaN;
    if (!e.parentElement.querySelector('PhysConn[type="RedConn"]'))
        return NaN;
    const pcType = e.getAttribute('type');
    if (e.parentElement.children.length > 1 &&
        pcType !== 'Connection' &&
        pcType !== 'RedConn')
        return NaN;
    return `${identity(e.parentElement)}>${pcType}`;
}
function pIdentity(e) {
    if (!e.parentElement)
        return NaN;
    const eParent = e.parentElement;
    const eType = e.getAttribute('type');
    if (eParent.tagName === 'PhysConn')
        return `${identity(e.parentElement)}>${eType}`;
    const index = Array.from(e.parentElement.children)
        .filter(child => child.getAttribute('type') === eType)
        .findIndex(child => child.isSameNode(e));
    return `${identity(e.parentElement)}>${eType} [${index}]`;
}
function enumValIdentity(e) {
    return `${identity(e.parentElement)}>${e.getAttribute('ord')}`;
}
function protNsIdentity(e) {
    return `${identity(e.parentElement)}>${e.getAttribute('type') || '8-MMS'}\t${e.textContent}`;
}
function sCLIdentity() {
    return '';
}
function namingIdentity(e) {
    return e.parentElement.tagName === 'SCL'
        ? e.getAttribute('name')
        : `${identity(e.parentElement)}>${e.getAttribute('name')}`;
}
function singletonIdentity(e) {
    return identity(e.parentElement).toString();
}
function idNamingIdentity(e) {
    return `#${e.id}`;
}
const tags = {
    AccessControl: {
        identity: singletonIdentity,
    },
    AccessPoint: {
        identity: namingIdentity,
    },
    Address: {
        identity: singletonIdentity,
    },
    Association: {
        identity: associationIdentity,
    },
    Authentication: {
        identity: singletonIdentity,
    },
    BDA: {
        identity: namingIdentity,
    },
    BitRate: {
        identity: singletonIdentity,
    },
    Bay: {
        identity: namingIdentity,
    },
    ClientLN: {
        identity: clientLNIdentity,
    },
    ClientServices: {
        identity: singletonIdentity,
    },
    CommProt: {
        identity: singletonIdentity,
    },
    Communication: {
        identity: singletonIdentity,
    },
    ConductingEquipment: {
        identity: namingIdentity,
    },
    ConfDataSet: {
        identity: singletonIdentity,
    },
    ConfLdName: {
        identity: singletonIdentity,
    },
    ConfLNs: {
        identity: singletonIdentity,
    },
    ConfLogControl: {
        identity: singletonIdentity,
    },
    ConfReportControl: {
        identity: singletonIdentity,
    },
    ConfSG: {
        identity: singletonIdentity,
    },
    ConfSigRef: {
        identity: singletonIdentity,
    },
    ConnectedAP: {
        identity: connectedAPIdentity,
    },
    ConnectivityNode: {
        identity: namingIdentity,
    },
    DA: {
        identity: namingIdentity,
    },
    DAI: {
        identity: ixNamingIdentity,
    },
    DAType: {
        identity: idNamingIdentity,
    },
    DO: {
        identity: namingIdentity,
    },
    DOI: {
        identity: namingIdentity,
    },
    DOType: {
        identity: idNamingIdentity,
    },
    DataObjectDirectory: {
        identity: singletonIdentity,
    },
    DataSet: {
        identity: namingIdentity,
    },
    DataSetDirectory: {
        identity: singletonIdentity,
    },
    DataTypeTemplates: {
        identity: singletonIdentity,
    },
    DynAssociation: {
        identity: singletonIdentity,
    },
    DynDataSet: {
        identity: singletonIdentity,
    },
    EnumType: {
        identity: idNamingIdentity,
    },
    EnumVal: {
        identity: enumValIdentity,
    },
    EqFunction: {
        identity: namingIdentity,
    },
    EqSubFunction: {
        identity: namingIdentity,
    },
    ExtRef: {
        identity: extRefIdentity,
    },
    FCDA: {
        identity: fCDAIdentity,
    },
    FileHandling: {
        identity: singletonIdentity,
    },
    Function: {
        identity: namingIdentity,
    },
    GeneralEquipment: {
        identity: namingIdentity,
    },
    GetCBValues: {
        identity: singletonIdentity,
    },
    GetDataObjectDefinition: {
        identity: singletonIdentity,
    },
    GetDataSetValue: {
        identity: singletonIdentity,
    },
    GetDirectory: {
        identity: singletonIdentity,
    },
    GOOSE: {
        identity: singletonIdentity,
    },
    GOOSESecurity: {
        identity: namingIdentity,
    },
    GSE: {
        identity: controlBlockIdentity,
    },
    GSEDir: {
        identity: singletonIdentity,
    },
    GSEControl: {
        identity: namingIdentity,
    },
    GSESettings: {
        identity: singletonIdentity,
    },
    GSSE: {
        identity: singletonIdentity,
    },
    Header: {
        identity: singletonIdentity,
    },
    History: {
        identity: singletonIdentity,
    },
    Hitem: {
        identity: hitemIdentity,
    },
    IED: {
        identity: namingIdentity,
    },
    IEDName: {
        identity: iEDNameIdentity,
    },
    Inputs: {
        identity: singletonIdentity,
    },
    IssuerName: {
        identity: singletonIdentity,
    },
    KDC: {
        identity: kDCIdentity,
    },
    LDevice: {
        identity: lDeviceIdentity,
    },
    LN: {
        identity: lNIdentity,
    },
    LN0: {
        identity: singletonIdentity,
    },
    LNode: {
        identity: lNodeIdentity,
    },
    LNodeType: {
        identity: idNamingIdentity,
    },
    Line: {
        identity: namingIdentity,
    },
    Log: {
        identity: namingIdentity,
    },
    LogControl: {
        identity: namingIdentity,
    },
    LogSettings: {
        identity: singletonIdentity,
    },
    MaxTime: {
        identity: singletonIdentity,
    },
    McSecurity: {
        identity: singletonIdentity,
    },
    MinTime: {
        identity: singletonIdentity,
    },
    NeutralPoint: {
        identity: terminalIdentity,
    },
    OptFields: {
        identity: singletonIdentity,
    },
    P: {
        identity: pIdentity,
    },
    PhysConn: {
        identity: physConnIdentity,
    },
    PowerTransformer: {
        identity: namingIdentity,
    },
    Private: {
        identity: () => NaN,
    },
    Process: {
        identity: namingIdentity,
    },
    ProtNs: {
        identity: protNsIdentity,
    },
    Protocol: {
        identity: singletonIdentity,
    },
    ReadWrite: {
        identity: singletonIdentity,
    },
    RedProt: {
        identity: singletonIdentity,
    },
    ReportControl: {
        identity: namingIdentity,
    },
    ReportSettings: {
        identity: singletonIdentity,
    },
    RptEnabled: {
        identity: singletonIdentity,
    },
    SamplesPerSec: {
        identity: singletonIdentity,
    },
    SampledValueControl: {
        identity: namingIdentity,
    },
    SecPerSamples: {
        identity: singletonIdentity,
    },
    SCL: {
        identity: sCLIdentity,
    },
    SDI: {
        identity: ixNamingIdentity,
    },
    SDO: {
        identity: namingIdentity,
    },
    Server: {
        identity: singletonIdentity,
    },
    ServerAt: {
        identity: singletonIdentity,
    },
    Services: {
        identity: singletonIdentity,
    },
    SetDataSetValue: {
        identity: singletonIdentity,
    },
    SettingControl: {
        identity: singletonIdentity,
    },
    SettingGroups: {
        identity: singletonIdentity,
    },
    SGEdit: {
        identity: singletonIdentity,
    },
    SmpRate: {
        identity: singletonIdentity,
    },
    SMV: {
        identity: controlBlockIdentity,
    },
    SmvOpts: {
        identity: singletonIdentity,
    },
    SMVsc: {
        identity: singletonIdentity,
    },
    SMVSecurity: {
        identity: namingIdentity,
    },
    SMVSettings: {
        identity: singletonIdentity,
    },
    SubEquipment: {
        identity: namingIdentity,
    },
    SubFunction: {
        identity: namingIdentity,
    },
    SubNetwork: {
        identity: namingIdentity,
    },
    Subject: {
        identity: singletonIdentity,
    },
    Substation: {
        identity: namingIdentity,
    },
    SupSubscription: {
        identity: singletonIdentity,
    },
    TapChanger: {
        identity: namingIdentity,
    },
    Terminal: {
        identity: terminalIdentity,
    },
    Text: {
        identity: singletonIdentity,
    },
    TimerActivatedControl: {
        identity: singletonIdentity,
    },
    TimeSyncProt: {
        identity: singletonIdentity,
    },
    TransformerWinding: {
        identity: namingIdentity,
    },
    TrgOps: {
        identity: singletonIdentity,
    },
    Val: {
        identity: valIdentity,
    },
    ValueHandling: {
        identity: singletonIdentity,
    },
    Voltage: {
        identity: singletonIdentity,
    },
    VoltageLevel: {
        identity: namingIdentity,
    },
};
/** @returns Identity string for a valid SCL element or NaN */
function identity(e) {
    if (e === null)
        return NaN;
    if (e.closest('Private'))
        return NaN;
    const tag = e.tagName;
    if (isSCLTag(tag))
        return tags[tag].identity(e);
    return NaN;
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$9 = i$6 `:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
let Icon = class Icon extends s$2 {
    /** @soyTemplate */
    render() {
        return x `<span><slot></slot></span>`;
    }
};
Icon.styles = [styles$9];
Icon = __decorate([
    e$7('mwc-icon')
], Icon);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
    if (element.closest) {
        return element.closest(selector);
    }
    var el = element;
    while (el) {
        if (matches(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
function matches(element, selector) {
    var nativeMatches = element.matches
        || element.webkitMatchesSelector
        || element.msMatchesSelector;
    return nativeMatches.call(element, selector);
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore
/**
 * Determines whether a node is an element.
 *
 * @param node Node to check
 */
const isNodeElement = (node) => {
    return node.nodeType === Node.ELEMENT_NODE;
};
function addHasRemoveClass(element) {
    return {
        addClass: (className) => {
            element.classList.add(className);
        },
        removeClass: (className) => {
            element.classList.remove(className);
        },
        hasClass: (className) => element.classList.contains(className),
    };
}
const fn = () => { };
const optionsBlock = {
    get passive() {
        return false;
    }
};
document.addEventListener('x', fn, optionsBlock);
document.removeEventListener('x', fn);
const deepActiveElementPath = (doc = window.document) => {
    let activeElement = doc.activeElement;
    const path = [];
    if (!activeElement) {
        return path;
    }
    while (activeElement) {
        path.push(activeElement);
        if (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
        }
        else {
            break;
        }
    }
    return path;
};
const doesElementContainFocus = (element) => {
    const activePath = deepActiveElementPath();
    if (!activePath.length) {
        return false;
    }
    const deepActiveElement = activePath[activePath.length - 1];
    const focusEv = new Event('check-if-focused', { bubbles: true, composed: true });
    let composedPath = [];
    const listener = (ev) => {
        composedPath = ev.composedPath();
    };
    document.body.addEventListener('check-if-focused', listener);
    deepActiveElement.dispatchEvent(focusEv);
    document.body.removeEventListener('check-if-focused', listener);
    return composedPath.indexOf(element) !== -1;
};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class BaseElement extends s$2 {
    click() {
        if (this.mdcRoot) {
            this.mdcRoot.focus();
            this.mdcRoot.click();
            return;
        }
        super.click();
    }
    /**
     * Create and attach the MDC Foundation to the instance
     */
    createFoundation() {
        if (this.mdcFoundation !== undefined) {
            this.mdcFoundation.destroy();
        }
        if (this.mdcFoundationClass) {
            this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
            this.mdcFoundation.init();
        }
    }
    firstUpdated() {
        this.createFoundation();
    }
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation = /** @class */ (function () {
    function MDCFoundation(adapter) {
        if (adapter === void 0) { adapter = {}; }
        this.adapter = adapter;
    }
    Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports every
            // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "strings", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "numbers", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function () {
            // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
            // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
            // validation.
            return {};
        },
        enumerable: false,
        configurable: true
    });
    MDCFoundation.prototype.init = function () {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
    };
    MDCFoundation.prototype.destroy = function () {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    };
    return MDCFoundation;
}());

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$6 = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
};
var strings$4 = {
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
};
var numbers$4 = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300, // Delay between touch and simulated mouse events on touch devices
};

/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
    if (!evt) {
        return { x: 0, y: 0 };
    }
    var x = pageOffset.x, y = pageOffset.y;
    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;
    var normalizedX;
    var normalizedY;
    // Determine touch point relative to the ripple container.
    if (evt.type === 'touchstart') {
        var touchEvent = evt;
        normalizedX = touchEvent.changedTouches[0].pageX - documentX;
        normalizedY = touchEvent.changedTouches[0].pageY - documentY;
    }
    else {
        var mouseEvent = evt;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
    }
    return { x: normalizedX, y: normalizedY };
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = [
    'touchstart', 'pointerdown', 'mousedown', 'keydown',
];
// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = [
    'touchend', 'pointerup', 'mouseup', 'contextmenu',
];
// simultaneous nested activations
var activatedTargets = [];
var MDCRippleFoundation = /** @class */ (function (_super) {
    __extends(MDCRippleFoundation, _super);
    function MDCRippleFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation.defaultAdapter), adapter)) || this;
        _this.activationAnimationHasEnded = false;
        _this.activationTimer = 0;
        _this.fgDeactivationRemovalTimer = 0;
        _this.fgScale = '0';
        _this.frame = { width: 0, height: 0 };
        _this.initialSize = 0;
        _this.layoutFrame = 0;
        _this.maxRadius = 0;
        _this.unboundedCoords = { left: 0, top: 0 };
        _this.activationState = _this.defaultActivationState();
        _this.activationTimerCallback = function () {
            _this.activationAnimationHasEnded = true;
            _this.runDeactivationUXLogicIfReady();
        };
        _this.activateHandler = function (e) {
            _this.activateImpl(e);
        };
        _this.deactivateHandler = function () {
            _this.deactivateImpl();
        };
        _this.focusHandler = function () {
            _this.handleFocus();
        };
        _this.blurHandler = function () {
            _this.handleBlur();
        };
        _this.resizeHandler = function () {
            _this.layout();
        };
        return _this;
    }
    Object.defineProperty(MDCRippleFoundation, "cssClasses", {
        get: function () {
            return cssClasses$6;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "strings", {
        get: function () {
            return strings$4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "numbers", {
        get: function () {
            return numbers$4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
        get: function () {
            return {
                addClass: function () { return undefined; },
                browserSupportsCssVars: function () { return true; },
                computeBoundingRect: function () {
                    return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 });
                },
                containsEventTarget: function () { return true; },
                deregisterDocumentInteractionHandler: function () { return undefined; },
                deregisterInteractionHandler: function () { return undefined; },
                deregisterResizeHandler: function () { return undefined; },
                getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                isSurfaceActive: function () { return true; },
                isSurfaceDisabled: function () { return true; },
                isUnbounded: function () { return true; },
                registerDocumentInteractionHandler: function () { return undefined; },
                registerInteractionHandler: function () { return undefined; },
                registerResizeHandler: function () { return undefined; },
                removeClass: function () { return undefined; },
                updateCssVariable: function () { return undefined; },
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCRippleFoundation.prototype.init = function () {
        var _this = this;
        var supportsPressRipple = this.supportsPressRipple();
        this.registerRootHandlers(supportsPressRipple);
        if (supportsPressRipple) {
            var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
            requestAnimationFrame(function () {
                _this.adapter.addClass(ROOT_1);
                if (_this.adapter.isUnbounded()) {
                    _this.adapter.addClass(UNBOUNDED_1);
                    // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                    _this.layoutInternal();
                }
            });
        }
    };
    MDCRippleFoundation.prototype.destroy = function () {
        var _this = this;
        if (this.supportsPressRipple()) {
            if (this.activationTimer) {
                clearTimeout(this.activationTimer);
                this.activationTimer = 0;
                this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
            }
            if (this.fgDeactivationRemovalTimer) {
                clearTimeout(this.fgDeactivationRemovalTimer);
                this.fgDeactivationRemovalTimer = 0;
                this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
            }
            var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
            requestAnimationFrame(function () {
                _this.adapter.removeClass(ROOT_2);
                _this.adapter.removeClass(UNBOUNDED_2);
                _this.removeCssVars();
            });
        }
        this.deregisterRootHandlers();
        this.deregisterDeactivationHandlers();
    };
    /**
     * @param evt Optional event containing position information.
     */
    MDCRippleFoundation.prototype.activate = function (evt) {
        this.activateImpl(evt);
    };
    MDCRippleFoundation.prototype.deactivate = function () {
        this.deactivateImpl();
    };
    MDCRippleFoundation.prototype.layout = function () {
        var _this = this;
        if (this.layoutFrame) {
            cancelAnimationFrame(this.layoutFrame);
        }
        this.layoutFrame = requestAnimationFrame(function () {
            _this.layoutInternal();
            _this.layoutFrame = 0;
        });
    };
    MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
        if (unbounded) {
            this.adapter.addClass(UNBOUNDED);
        }
        else {
            this.adapter.removeClass(UNBOUNDED);
        }
    };
    MDCRippleFoundation.prototype.handleFocus = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
    };
    MDCRippleFoundation.prototype.handleBlur = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
    };
    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     */
    MDCRippleFoundation.prototype.supportsPressRipple = function () {
        return this.adapter.browserSupportsCssVars();
    };
    MDCRippleFoundation.prototype.defaultActivationState = function () {
        return {
            activationEvent: undefined,
            hasDeactivationUXRun: false,
            isActivated: false,
            isProgrammatic: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false,
        };
    };
    /**
     * supportsPressRipple Passed from init to save a redundant function call
     */
    MDCRippleFoundation.prototype.registerRootHandlers = function (supportsPressRipple) {
        var e_1, _a;
        if (supportsPressRipple) {
            try {
                for (var ACTIVATION_EVENT_TYPES_1 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()) {
                    var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
                    this.adapter.registerInteractionHandler(evtType, this.activateHandler);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a = ACTIVATION_EVENT_TYPES_1.return)) _a.call(ACTIVATION_EVENT_TYPES_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (this.adapter.isUnbounded()) {
                this.adapter.registerResizeHandler(this.resizeHandler);
            }
        }
        this.adapter.registerInteractionHandler('focus', this.focusHandler);
        this.adapter.registerInteractionHandler('blur', this.blurHandler);
    };
    MDCRippleFoundation.prototype.registerDeactivationHandlers = function (evt) {
        var e_2, _a;
        if (evt.type === 'keydown') {
            this.adapter.registerInteractionHandler('keyup', this.deactivateHandler);
        }
        else {
            try {
                for (var POINTER_DEACTIVATION_EVENT_TYPES_1 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()) {
                    var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
                    this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_1.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    MDCRippleFoundation.prototype.deregisterRootHandlers = function () {
        var e_3, _a;
        try {
            for (var ACTIVATION_EVENT_TYPES_2 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()) {
                var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
                this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a = ACTIVATION_EVENT_TYPES_2.return)) _a.call(ACTIVATION_EVENT_TYPES_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.adapter.deregisterInteractionHandler('focus', this.focusHandler);
        this.adapter.deregisterInteractionHandler('blur', this.blurHandler);
        if (this.adapter.isUnbounded()) {
            this.adapter.deregisterResizeHandler(this.resizeHandler);
        }
    };
    MDCRippleFoundation.prototype.deregisterDeactivationHandlers = function () {
        var e_4, _a;
        this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler);
        try {
            for (var POINTER_DEACTIVATION_EVENT_TYPES_2 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()) {
                var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
                this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_2.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    MDCRippleFoundation.prototype.removeCssVars = function () {
        var _this = this;
        var rippleStrings = MDCRippleFoundation.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function (key) {
            if (key.indexOf('VAR_') === 0) {
                _this.adapter.updateCssVariable(rippleStrings[key], null);
            }
        });
    };
    MDCRippleFoundation.prototype.activateImpl = function (evt) {
        var _this = this;
        if (this.adapter.isSurfaceDisabled()) {
            return;
        }
        var activationState = this.activationState;
        if (activationState.isActivated) {
            return;
        }
        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent;
        var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
        if (isSameInteraction) {
            return;
        }
        activationState.isActivated = true;
        activationState.isProgrammatic = evt === undefined;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
        var hasActivatedChild = evt !== undefined &&
            activatedTargets.length > 0 &&
            activatedTargets.some(function (target) { return _this.adapter.containsEventTarget(target); });
        if (hasActivatedChild) {
            // Immediately reset activation state, while preserving logic that prevents touch follow-on events
            this.resetActivationState();
            return;
        }
        if (evt !== undefined) {
            activatedTargets.push(evt.target);
            this.registerDeactivationHandlers(evt);
        }
        activationState.wasElementMadeActive = this.checkElementMadeActive(evt);
        if (activationState.wasElementMadeActive) {
            this.animateActivation();
        }
        requestAnimationFrame(function () {
            // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
            activatedTargets = [];
            if (!activationState.wasElementMadeActive
                && evt !== undefined
                && (evt.key === ' ' || evt.keyCode === 32)) {
                // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                // active states inconsistently when they're called within event handling code:
                // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                // variable is set within a rAF callback for a submit button interaction (#2241).
                activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);
                if (activationState.wasElementMadeActive) {
                    _this.animateActivation();
                }
            }
            if (!activationState.wasElementMadeActive) {
                // Reset activation state immediately if element was not made active.
                _this.activationState = _this.defaultActivationState();
            }
        });
    };
    MDCRippleFoundation.prototype.checkElementMadeActive = function (evt) {
        return (evt !== undefined && evt.type === 'keydown') ?
            this.adapter.isSurfaceActive() :
            true;
    };
    MDCRippleFoundation.prototype.animateActivation = function () {
        var _this = this;
        var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
        var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal();
        var translateStart = '';
        var translateEnd = '';
        if (!this.adapter.isUnbounded()) {
            var _c = this.getFgTranslationCoordinates(), startPoint = _c.startPoint, endPoint = _c.endPoint;
            translateStart = startPoint.x + "px, " + startPoint.y + "px";
            translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer);
        clearTimeout(this.fgDeactivationRemovalTimer);
        this.rmBoundedActivationClasses();
        this.adapter.removeClass(FG_DEACTIVATION);
        // Force layout in order to re-trigger the animation.
        this.adapter.computeBoundingRect();
        this.adapter.addClass(FG_ACTIVATION);
        this.activationTimer = setTimeout(function () {
            _this.activationTimerCallback();
        }, DEACTIVATION_TIMEOUT_MS);
    };
    MDCRippleFoundation.prototype.getFgTranslationCoordinates = function () {
        var _a = this.activationState, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
        var startPoint;
        if (wasActivatedByPointer) {
            startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
        }
        else {
            startPoint = {
                x: this.frame.width / 2,
                y: this.frame.height / 2,
            };
        }
        // Center the element around the start point.
        startPoint = {
            x: startPoint.x - (this.initialSize / 2),
            y: startPoint.y - (this.initialSize / 2),
        };
        var endPoint = {
            x: (this.frame.width / 2) - (this.initialSize / 2),
            y: (this.frame.height / 2) - (this.initialSize / 2),
        };
        return { startPoint: startPoint, endPoint: endPoint };
    };
    MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady = function () {
        var _this = this;
        // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _a = this.activationState, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded) {
            this.rmBoundedActivationClasses();
            this.adapter.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer = setTimeout(function () {
                _this.adapter.removeClass(FG_DEACTIVATION);
            }, numbers$4.FG_DEACTIVATION_MS);
        }
    };
    MDCRippleFoundation.prototype.rmBoundedActivationClasses = function () {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
        this.adapter.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded = false;
        this.adapter.computeBoundingRect();
    };
    MDCRippleFoundation.prototype.resetActivationState = function () {
        var _this = this;
        this.previousActivationEvent = this.activationState.activationEvent;
        this.activationState = this.defaultActivationState();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () { return _this.previousActivationEvent = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
    };
    MDCRippleFoundation.prototype.deactivateImpl = function () {
        var _this = this;
        var activationState = this.activationState;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
            return;
        }
        var state = __assign({}, activationState);
        if (activationState.isProgrammatic) {
            requestAnimationFrame(function () {
                _this.animateDeactivation(state);
            });
            this.resetActivationState();
        }
        else {
            this.deregisterDeactivationHandlers();
            requestAnimationFrame(function () {
                _this.activationState.hasDeactivationUXRun = true;
                _this.animateDeactivation(state);
                _this.resetActivationState();
            });
        }
    };
    MDCRippleFoundation.prototype.animateDeactivation = function (_a) {
        var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
        if (wasActivatedByPointer || wasElementMadeActive) {
            this.runDeactivationUXLogicIfReady();
        }
    };
    MDCRippleFoundation.prototype.layoutInternal = function () {
        var _this = this;
        this.frame = this.adapter.computeBoundingRect();
        var maxDim = Math.max(this.frame.height, this.frame.width);
        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function () {
            var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
            return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };
        this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        // Unbounded ripple size should always be even number to equally center align.
        if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
            this.initialSize = initialSize - 1;
        }
        else {
            this.initialSize = initialSize;
        }
        this.fgScale = "" + this.maxRadius / this.initialSize;
        this.updateLayoutCssVars();
    };
    MDCRippleFoundation.prototype.updateLayoutCssVars = function () {
        var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
        this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
        this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);
        if (this.adapter.isUnbounded()) {
            this.unboundedCoords = {
                left: Math.round((this.frame.width / 2) - (this.initialSize / 2)),
                top: Math.round((this.frame.height / 2) - (this.initialSize / 2)),
            };
            this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
            this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
        }
    };
    return MDCRippleFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},e$2=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$3=e$2(class extends i$1{constructor(t$1){var i;if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||(null===(i=t$1.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.it){this.it=new Set,void 0!==i.strings&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.nt)||void 0===r?void 0:r.has(t))&&this.it.add(t);return this.render(s)}const e=i.element.classList;this.it.forEach((t=>{t in s||(e.remove(t),this.it.delete(t));}));for(const t in s){const i=!!s[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.it.add(t)):(e.remove(t),this.it.delete(t)));}return T$1}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i="important",n$2=" !"+i,o$2=e$2(class extends i$1{constructor(t$1){var e;if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||(null===(e=t$1.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ht){this.ht=new Set;for(const t in r)this.ht.add(t);return this.render(r)}this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];if(null!=e){this.ht.add(t);const r="string"==typeof e&&e.endsWith(n$2);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?i:""):s[t]=e;}}return T$1}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class RippleBase extends BaseElement {
    constructor() {
        super(...arguments);
        this.primary = false;
        this.accent = false;
        this.unbounded = false;
        this.disabled = false;
        this.activated = false;
        this.selected = false;
        this.internalUseStateLayerCustomProperties = false;
        this.hovering = false;
        this.bgFocused = false;
        this.fgActivation = false;
        this.fgDeactivation = false;
        this.fgScale = '';
        this.fgSize = '';
        this.translateStart = '';
        this.translateEnd = '';
        this.leftPos = '';
        this.topPos = '';
        this.mdcFoundationClass = MDCRippleFoundation;
    }
    get isActive() {
        return matches(this.parentElement || this, ':active');
    }
    createAdapter() {
        return {
            browserSupportsCssVars: () => true,
            isUnbounded: () => this.unbounded,
            isSurfaceActive: () => this.isActive,
            isSurfaceDisabled: () => this.disabled,
            addClass: (className) => {
                switch (className) {
                    case 'mdc-ripple-upgraded--background-focused':
                        this.bgFocused = true;
                        break;
                    case 'mdc-ripple-upgraded--foreground-activation':
                        this.fgActivation = true;
                        break;
                    case 'mdc-ripple-upgraded--foreground-deactivation':
                        this.fgDeactivation = true;
                        break;
                }
            },
            removeClass: (className) => {
                switch (className) {
                    case 'mdc-ripple-upgraded--background-focused':
                        this.bgFocused = false;
                        break;
                    case 'mdc-ripple-upgraded--foreground-activation':
                        this.fgActivation = false;
                        break;
                    case 'mdc-ripple-upgraded--foreground-deactivation':
                        this.fgDeactivation = false;
                        break;
                }
            },
            containsEventTarget: () => true,
            registerInteractionHandler: () => undefined,
            deregisterInteractionHandler: () => undefined,
            registerDocumentInteractionHandler: () => undefined,
            deregisterDocumentInteractionHandler: () => undefined,
            registerResizeHandler: () => undefined,
            deregisterResizeHandler: () => undefined,
            updateCssVariable: (varName, value) => {
                switch (varName) {
                    case '--mdc-ripple-fg-scale':
                        this.fgScale = value;
                        break;
                    case '--mdc-ripple-fg-size':
                        this.fgSize = value;
                        break;
                    case '--mdc-ripple-fg-translate-end':
                        this.translateEnd = value;
                        break;
                    case '--mdc-ripple-fg-translate-start':
                        this.translateStart = value;
                        break;
                    case '--mdc-ripple-left':
                        this.leftPos = value;
                        break;
                    case '--mdc-ripple-top':
                        this.topPos = value;
                        break;
                }
            },
            computeBoundingRect: () => (this.parentElement || this).getBoundingClientRect(),
            getWindowPageOffset: () => ({ x: window.pageXOffset, y: window.pageYOffset }),
        };
    }
    startPress(ev) {
        this.waitForFoundation(() => {
            this.mdcFoundation.activate(ev);
        });
    }
    endPress() {
        this.waitForFoundation(() => {
            this.mdcFoundation.deactivate();
        });
    }
    startFocus() {
        this.waitForFoundation(() => {
            this.mdcFoundation.handleFocus();
        });
    }
    endFocus() {
        this.waitForFoundation(() => {
            this.mdcFoundation.handleBlur();
        });
    }
    startHover() {
        this.hovering = true;
    }
    endHover() {
        this.hovering = false;
    }
    /**
     * Wait for the MDCFoundation to be created by `firstUpdated`
     */
    waitForFoundation(fn) {
        if (this.mdcFoundation) {
            fn();
        }
        else {
            this.updateComplete.then(fn);
        }
    }
    update(changedProperties) {
        if (changedProperties.has('disabled')) {
            // stop hovering when ripple is disabled to prevent a stuck "hover" state
            // When re-enabled, the outer component will get a `mouseenter` event on
            // the first movement, which will call `startHover()`
            if (this.disabled) {
                this.endHover();
            }
        }
        super.update(changedProperties);
    }
    /** @soyTemplate */
    render() {
        const shouldActivateInPrimary = this.activated && (this.primary || !this.accent);
        const shouldSelectInPrimary = this.selected && (this.primary || !this.accent);
        /** @classMap */
        const classes = {
            'mdc-ripple-surface--accent': this.accent,
            'mdc-ripple-surface--primary--activated': shouldActivateInPrimary,
            'mdc-ripple-surface--accent--activated': this.accent && this.activated,
            'mdc-ripple-surface--primary--selected': shouldSelectInPrimary,
            'mdc-ripple-surface--accent--selected': this.accent && this.selected,
            'mdc-ripple-surface--disabled': this.disabled,
            'mdc-ripple-surface--hover': this.hovering,
            'mdc-ripple-surface--primary': this.primary,
            'mdc-ripple-surface--selected': this.selected,
            'mdc-ripple-upgraded--background-focused': this.bgFocused,
            'mdc-ripple-upgraded--foreground-activation': this.fgActivation,
            'mdc-ripple-upgraded--foreground-deactivation': this.fgDeactivation,
            'mdc-ripple-upgraded--unbounded': this.unbounded,
            'mdc-ripple-surface--internal-use-state-layer-custom-properties': this.internalUseStateLayerCustomProperties,
        };
        return x `
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${o$3(classes)}"
          style="${o$2({
            '--mdc-ripple-fg-scale': this.fgScale,
            '--mdc-ripple-fg-size': this.fgSize,
            '--mdc-ripple-fg-translate-end': this.translateEnd,
            '--mdc-ripple-fg-translate-start': this.translateStart,
            '--mdc-ripple-left': this.leftPos,
            '--mdc-ripple-top': this.topPos,
        })}"></div>`;
    }
}
__decorate([
    i$2('.mdc-ripple-surface')
], RippleBase.prototype, "mdcRoot", void 0);
__decorate([
    n$4({ type: Boolean })
], RippleBase.prototype, "primary", void 0);
__decorate([
    n$4({ type: Boolean })
], RippleBase.prototype, "accent", void 0);
__decorate([
    n$4({ type: Boolean })
], RippleBase.prototype, "unbounded", void 0);
__decorate([
    n$4({ type: Boolean })
], RippleBase.prototype, "disabled", void 0);
__decorate([
    n$4({ type: Boolean })
], RippleBase.prototype, "activated", void 0);
__decorate([
    n$4({ type: Boolean })
], RippleBase.prototype, "selected", void 0);
__decorate([
    n$4({ type: Boolean })
], RippleBase.prototype, "internalUseStateLayerCustomProperties", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "hovering", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "bgFocused", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "fgActivation", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "fgDeactivation", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "fgScale", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "fgSize", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "translateStart", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "translateEnd", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "leftPos", void 0);
__decorate([
    t$1()
], RippleBase.prototype, "topPos", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$8 = i$6 `.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}.mdc-ripple-surface--internal-use-state-layer-custom-properties::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties::after{background-color:#000;background-color:var(--mdc-ripple-hover-state-layer-color, #000)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-state-layer-opacity, 0.04)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
let Ripple = class Ripple extends RippleBase {
};
Ripple.styles = [styles$8];
Ripple = __decorate([
    e$7('mwc-ripple')
], Ripple);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TypeScript version of the decorator
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators
 */
function tsDecorator(prototype, name, descriptor) {
    const constructor = prototype.constructor;
    if (!descriptor) {
        /**
         * lit uses internal properties with two leading underscores to
         * provide storage for accessors
         */
        const litInternalPropertyKey = `__${name}`;
        descriptor =
            constructor.getPropertyDescriptor(name, litInternalPropertyKey);
        if (!descriptor) {
            throw new Error('@ariaProperty must be used after a @property decorator');
        }
    }
    // descriptor must exist at this point, reassign so typescript understands
    const propDescriptor = descriptor;
    let attribute = '';
    if (!propDescriptor.set) {
        throw new Error(`@ariaProperty requires a setter for ${name}`);
    }
    // TODO(b/202853219): Remove this check when internal tooling is
    // compatible
    // tslint:disable-next-line:no-any bail if applied to internal generated class
    if (prototype.dispatchWizEvent) {
        return descriptor;
    }
    const wrappedDescriptor = {
        configurable: true,
        enumerable: true,
        set(value) {
            if (attribute === '') {
                const options = constructor.getPropertyOptions(name);
                // if attribute is not a string, use `name` instead
                attribute =
                    typeof options.attribute === 'string' ? options.attribute : name;
            }
            if (this.hasAttribute(attribute)) {
                this.removeAttribute(attribute);
            }
            propDescriptor.set.call(this, value);
        }
    };
    if (propDescriptor.get) {
        wrappedDescriptor.get = function () {
            return propDescriptor.get.call(this);
        };
    }
    return wrappedDescriptor;
}
/**
 * A property decorator proxies an aria attribute to an internal node
 *
 * This decorator is only intended for use with ARIA attributes, such as `role`
 * and `aria-label` due to screenreader needs.
 *
 * Upon first render, `@ariaProperty` will remove the attribute from the host
 * element to prevent screenreaders from reading the host instead of the
 * internal node.
 *
 * This decorator should only be used for non-Symbol public fields decorated
 * with `@property`, or on a setter with an optional getter.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @ariaProperty
 *   @property({ type: String, attribute: 'aria-label' })
 *   ariaLabel!: string;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function ariaProperty(protoOrDescriptor, name, 
// tslint:disable-next-line:no-any any is required as a return type from decorators
descriptor) {
    if (name !== undefined) {
        return tsDecorator(protoOrDescriptor, name, descriptor);
    }
    else {
        throw new Error('@ariaProperty only supports TypeScript Decorators');
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Class that encapsulates the events handlers for `mwc-ripple`
 *
 *
 * Example:
 * ```
 * class XFoo extends LitElement {
 *   async getRipple() {
 *     this.renderRipple = true;
 *     await this.updateComplete;
 *     return this.renderRoot.querySelector('mwc-ripple');
 *   }
 *   rippleHandlers = new RippleHandlers(() => this.getRipple());
 *
 *   render() {
 *     return html`
 *       <div @mousedown=${this.rippleHandlers.startPress}></div>
 *       ${this.renderRipple ? html`<mwc-ripple></mwc-ripple>` : ''}
 *     `;
 *   }
 * }
 * ```
 */
class RippleHandlers {
    constructor(
    /** Function that returns a `mwc-ripple` */
    rippleFn) {
        this.startPress = (ev) => {
            rippleFn().then((r) => {
                r && r.startPress(ev);
            });
        };
        this.endPress = () => {
            rippleFn().then((r) => {
                r && r.endPress();
            });
        };
        this.startFocus = () => {
            rippleFn().then((r) => {
                r && r.startFocus();
            });
        };
        this.endFocus = () => {
            rippleFn().then((r) => {
                r && r.endFocus();
            });
        };
        this.startHover = () => {
            rippleFn().then((r) => {
                r && r.startHover();
            });
        };
        this.endHover = () => {
            rippleFn().then((r) => {
                r && r.endHover();
            });
        };
    }
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$2=l=>null!=l?l:A$1;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class ButtonBase extends s$2 {
    constructor() {
        super(...arguments);
        this.raised = false;
        this.unelevated = false;
        this.outlined = false;
        this.dense = false;
        this.disabled = false;
        this.trailingIcon = false;
        this.fullwidth = false;
        this.icon = '';
        this.label = '';
        this.expandContent = false;
        this.shouldRenderRipple = false;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            return this.ripple;
        });
    }
    /** @soyTemplate */
    renderOverlay() {
        return x ``;
    }
    /** @soyTemplate */
    renderRipple() {
        const filled = this.raised || this.unelevated;
        return this.shouldRenderRipple ?
            x `<mwc-ripple class="ripple" .primary="${!filled}" .disabled="${this.disabled}"></mwc-ripple>` :
            '';
    }
    focus() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.startFocus();
            buttonElement.focus();
        }
    }
    blur() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.endFocus();
            buttonElement.blur();
        }
    }
    /** @soyTemplate */
    getRenderClasses() {
        return {
            'mdc-button--raised': this.raised,
            'mdc-button--unelevated': this.unelevated,
            'mdc-button--outlined': this.outlined,
            'mdc-button--dense': this.dense,
        };
    }
    /**
     * @soyTemplate
     * @soyAttributes buttonAttributes: #button
     * @soyClasses buttonClasses: #button
     */
    render() {
        return x `
      <button
          id="button"
          class="mdc-button ${o$3(this.getRenderClasses())}"
          ?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}"
          aria-haspopup="${l$2(this.ariaHasPopup)}"
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleActivate}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleActivate}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}">
        ${this.renderOverlay()}
        ${this.renderRipple()}
        <span class="leading-icon">
          <slot name="icon">
            ${this.icon && !this.trailingIcon ? this.renderIcon() : ''}
          </slot>
        </span>
        <span class="mdc-button__label">${this.label}</span>
        <span class="slot-container ${o$3({
            flex: this.expandContent
        })}">
          <slot></slot>
        </span>
        <span class="trailing-icon">
          <slot name="trailingIcon">
            ${this.icon && this.trailingIcon ? this.renderIcon() : ''}
          </slot>
        </span>
      </button>`;
    }
    /** @soyTemplate */
    renderIcon() {
        return x `
    <mwc-icon class="mdc-button__icon">
      ${this.icon}
    </mwc-icon>`;
    }
    handleRippleActivate(evt) {
        const onUp = () => {
            window.removeEventListener('mouseup', onUp);
            this.handleRippleDeactivate();
        };
        window.addEventListener('mouseup', onUp);
        this.rippleHandlers.startPress(evt);
    }
    handleRippleDeactivate() {
        this.rippleHandlers.endPress();
    }
    handleRippleMouseEnter() {
        this.rippleHandlers.startHover();
    }
    handleRippleMouseLeave() {
        this.rippleHandlers.endHover();
    }
    handleRippleFocus() {
        this.rippleHandlers.startFocus();
    }
    handleRippleBlur() {
        this.rippleHandlers.endFocus();
    }
}
ButtonBase.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    ariaProperty,
    n$4({ type: String, attribute: 'aria-haspopup' })
], ButtonBase.prototype, "ariaHasPopup", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], ButtonBase.prototype, "raised", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], ButtonBase.prototype, "unelevated", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], ButtonBase.prototype, "outlined", void 0);
__decorate([
    n$4({ type: Boolean })
], ButtonBase.prototype, "dense", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], ButtonBase.prototype, "disabled", void 0);
__decorate([
    n$4({ type: Boolean, attribute: 'trailingicon' })
], ButtonBase.prototype, "trailingIcon", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], ButtonBase.prototype, "fullwidth", void 0);
__decorate([
    n$4({ type: String })
], ButtonBase.prototype, "icon", void 0);
__decorate([
    n$4({ type: String })
], ButtonBase.prototype, "label", void 0);
__decorate([
    n$4({ type: Boolean })
], ButtonBase.prototype, "expandContent", void 0);
__decorate([
    i$2('#button')
], ButtonBase.prototype, "buttonElement", void 0);
__decorate([
    e$4('mwc-ripple')
], ButtonBase.prototype, "ripple", void 0);
__decorate([
    t$1()
], ButtonBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    e$5({ passive: true })
], ButtonBase.prototype, "handleRippleActivate", null);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$7 = i$6 `.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase)}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:transparent}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{display:none}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc( 100% + 4px );width:calc( 100% + 4px );display:block}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring::after,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring::after,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring::after{border-color:CanvasText}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:transparent}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised,.mdc-button--unelevated{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--raised .mdc-button__ripple,.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button--outlined:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--outlined .mdc-button__icon{font-size:1.125rem;width:1.125rem;height:1.125rem}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined:disabled{border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined.mdc-button--icon-trailing{padding:0 11px 0 15px}.mdc-button--outlined.mdc-button--icon-leading{padding:0 15px 0 11px}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:1px}.mdc-button--outlined .mdc-button__touch{left:calc(-1 * 1px);width:calc(100% + 2 * 1px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent;vertical-align:top}:host([fullwidth]){width:100%}:host([raised]),:host([unelevated]){--mdc-ripple-color:#fff;--mdc-ripple-focus-opacity:0.24;--mdc-ripple-hover-opacity:0.08;--mdc-ripple-press-opacity:0.24}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,[dir=rtl] .leading-icon ::slotted(*),[dir=rtl] .leading-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl],.leading-icon ::slotted(*[dir=rtl]),.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon ::slotted(*[dir=rtl]),.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.slot-container{display:inline-flex;align-items:center;justify-content:center}.slot-container.flex{flex:auto}.mdc-button{flex:auto;overflow:hidden;padding-left:8px;padding-left:var(--mdc-button-horizontal-padding, 8px);padding-right:8px;padding-right:var(--mdc-button-horizontal-padding, 8px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-focus, var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)))}.mdc-button--raised:hover{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised,.mdc-button--unelevated{padding-left:16px;padding-left:var(--mdc-button-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mdc-button-horizontal-padding, 16px)}.mdc-button--outlined{border-width:1px;border-width:var(--mdc-button-outline-width, 1px);padding-left:calc(16px - 1px);padding-left:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));padding-right:calc(16px - 1px);padding-right:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px))}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12))}.mdc-button--outlined .ripple{top:calc(-1 * 1px);top:calc(-1 * var(--mdc-button-outline-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mdc-button-outline-width, 1px));right:initial;right:initial;border-width:1px;border-width:var(--mdc-button-outline-width, 1px);border-style:solid;border-color:transparent}[dir=rtl] .mdc-button--outlined .ripple,.mdc-button--outlined .ripple[dir=rtl]{left:initial;left:initial;right:calc(-1 * 1px);right:calc(-1 * var(--mdc-button-outline-width, 1px))}.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button--dense .mdc-button__touch{height:100%}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-button{color:rgba(0, 0, 0, 0.38);color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button--raised,:host([disabled]) .mdc-button--unelevated{background-color:rgba(0, 0, 0, 0.12);background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12))}:host([disabled]) .mdc-button--outlined{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
let Button = class Button extends ButtonBase {
};
Button.styles = [styles$7];
Button = __decorate([
    e$7('mwc-button')
], Button);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Fab Base class logic and template definition
 * @soyCompatible
 */
class FabBase extends s$2 {
    constructor() {
        super(...arguments);
        this.mini = false;
        this.exited = false;
        this.disabled = false;
        this.extended = false;
        this.showIconAtEnd = false;
        this.reducedTouchTarget = false;
        this.icon = '';
        this.label = '';
        this.shouldRenderRipple = false;
        this.useStateLayerCustomProperties = false;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            return this.ripple;
        });
    }
    /**
     * @soyTemplate
     * @soyClasses fabClasses: .mdc-fab
     */
    render() {
        const hasTouchTarget = this.mini && !this.reducedTouchTarget;
        /** @classMap */
        const classes = {
            'mdc-fab--mini': this.mini,
            'mdc-fab--touch': hasTouchTarget,
            'mdc-fab--exited': this.exited,
            'mdc-fab--extended': this.extended,
            'icon-end': this.showIconAtEnd,
        };
        const ariaLabel = this.label ? this.label : this.icon;
        /*
         * Some internal styling is sensitive to whitespace in this template, take
         * care when modifying it.
         */
        return x `<button
          class="mdc-fab ${o$3(classes)}"
          ?disabled="${this.disabled}"
          aria-label="${ariaLabel}"
          @mouseenter=${this.handleRippleMouseEnter}
          @mouseleave=${this.handleRippleMouseLeave}
          @focus=${this.handleRippleFocus}
          @blur=${this.handleRippleBlur}
          @mousedown=${this.handleRippleActivate}
          @touchstart=${this.handleRippleStartPress}
          @touchend=${this.handleRippleDeactivate}
          @touchcancel=${this.handleRippleDeactivate}><!--
        -->${this.renderBeforeRipple()}<!--
        -->${this.renderRipple()}<!--
        -->${this.showIconAtEnd ? this.renderLabel() : ''}<!--
        --><span class="material-icons mdc-fab__icon"><!--
          --><slot name="icon">${this.icon}</slot><!--
       --></span><!--
        -->${!this.showIconAtEnd ? this.renderLabel() : ''}<!--
        -->${this.renderTouchTarget()}<!--
      --></button>`;
    }
    /** @soyTemplate */
    renderIcon() {
        // TODO(b/191914389): reimplement once Wit issue is resolved
        return x ``;
    }
    /** @soyTemplate */
    renderTouchTarget() {
        const hasTouchTarget = this.mini && !this.reducedTouchTarget;
        return x `${hasTouchTarget ? x `<div class="mdc-fab__touch"></div>` : ''}`;
    }
    /** @soyTemplate */
    renderLabel() {
        const showLabel = this.label !== '' && this.extended;
        return x `${showLabel ? x `<span class="mdc-fab__label">${this.label}</span>` :
            ''}`;
    }
    /** @soyTemplate */
    renderBeforeRipple() {
        return x ``;
    }
    /** @soyTemplate */
    renderRipple() {
        return this.shouldRenderRipple ? x `<mwc-ripple class="ripple"
        .internalUseStateLayerCustomProperties="${this.useStateLayerCustomProperties}"
         ></mwc-ripple>` :
            '';
    }
    handleRippleActivate(event) {
        const onUp = () => {
            window.removeEventListener('mouseup', onUp);
            this.handleRippleDeactivate();
        };
        window.addEventListener('mouseup', onUp);
        this.handleRippleStartPress(event);
    }
    handleRippleStartPress(event) {
        this.rippleHandlers.startPress(event);
    }
    handleRippleDeactivate() {
        this.rippleHandlers.endPress();
    }
    handleRippleMouseEnter() {
        this.rippleHandlers.startHover();
    }
    handleRippleMouseLeave() {
        this.rippleHandlers.endHover();
    }
    handleRippleFocus() {
        this.rippleHandlers.startFocus();
    }
    handleRippleBlur() {
        this.rippleHandlers.endFocus();
    }
}
FabBase.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    e$4('mwc-ripple')
], FabBase.prototype, "ripple", void 0);
__decorate([
    n$4({ type: Boolean })
], FabBase.prototype, "mini", void 0);
__decorate([
    n$4({ type: Boolean })
], FabBase.prototype, "exited", void 0);
__decorate([
    n$4({ type: Boolean })
], FabBase.prototype, "disabled", void 0);
__decorate([
    n$4({ type: Boolean })
], FabBase.prototype, "extended", void 0);
__decorate([
    n$4({ type: Boolean })
], FabBase.prototype, "showIconAtEnd", void 0);
__decorate([
    n$4({ type: Boolean })
], FabBase.prototype, "reducedTouchTarget", void 0);
__decorate([
    n$4()
], FabBase.prototype, "icon", void 0);
__decorate([
    n$4()
], FabBase.prototype, "label", void 0);
__decorate([
    t$1()
], FabBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    t$1()
], FabBase.prototype, "useStateLayerCustomProperties", void 0);
__decorate([
    e$5({ passive: true })
], FabBase.prototype, "handleRippleStartPress", null);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$6 = i$6 `:host .mdc-fab .material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{outline:none;--mdc-ripple-color: currentcolor;user-select:none;-webkit-tap-highlight-color:transparent;display:inline-flex;-webkit-tap-highlight-color:transparent;display:inline-flex;outline:none;user-select:none}:host .mdc-touch-target-wrapper{display:inline}:host .mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}:host .mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}:host .mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}:host .mdc-fab::-moz-focus-inner{padding:0;border:0}:host .mdc-fab:hover{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}:host .mdc-fab.mdc-ripple-upgraded--background-focused,:host .mdc-fab:not(.mdc-ripple-upgraded):focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}:host .mdc-fab .mdc-fab__focus-ring{position:absolute}:host .mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,:host .mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc( 100% + 4px );width:calc( 100% + 4px )}@media screen and (forced-colors: active){:host .mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,:host .mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{border-color:CanvasText}}:host .mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,:host .mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){:host .mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,:host .mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{border-color:CanvasText}}:host .mdc-fab:active,:host .mdc-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12)}:host .mdc-fab:active,:host .mdc-fab:focus{outline:none}:host .mdc-fab:hover{cursor:pointer}:host .mdc-fab>svg{width:100%}:host .mdc-fab--mini{width:40px;height:40px}:host .mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}:host .mdc-fab--extended .mdc-fab__ripple{border-radius:24px}:host .mdc-fab--extended .mdc-fab__icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] :host .mdc-fab--extended .mdc-fab__icon,:host .mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}:host .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] :host .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,:host .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}:host .mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}:host .mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host .mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){:host .mdc-fab::before{border-color:CanvasText}}:host .mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}:host .mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}:host .mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}:host .mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}:host .mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}:host .mdc-fab{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12)}:host .mdc-fab .mdc-fab__icon{width:24px;height:24px;font-size:24px}:host .mdc-fab,:host .mdc-fab:not(:disabled) .mdc-fab__icon,:host .mdc-fab:not(:disabled) .mdc-fab__label,:host .mdc-fab:disabled .mdc-fab__icon,:host .mdc-fab:disabled .mdc-fab__label{color:#fff;color:var(--mdc-theme-on-secondary, #fff)}:host .mdc-fab:not(.mdc-fab--extended){border-radius:50%}:host .mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:50%}:host .mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}:host .mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}:host .mdc-fab::-moz-focus-inner{padding:0;border:0}:host .mdc-fab:hover{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}:host .mdc-fab.mdc-ripple-upgraded--background-focused,:host .mdc-fab:not(.mdc-ripple-upgraded):focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}:host .mdc-fab .mdc-fab__focus-ring{position:absolute}:host .mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,:host .mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc( 100% + 4px );width:calc( 100% + 4px )}@media screen and (forced-colors: active){:host .mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,:host .mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{border-color:CanvasText}}:host .mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,:host .mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){:host .mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,:host .mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{border-color:CanvasText}}:host .mdc-fab:active,:host .mdc-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12)}:host .mdc-fab:active,:host .mdc-fab:focus{outline:none}:host .mdc-fab:hover{cursor:pointer}:host .mdc-fab>svg{width:100%}:host .mdc-fab--mini{width:40px;height:40px}:host .mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}:host .mdc-fab--extended .mdc-fab__ripple{border-radius:24px}:host .mdc-fab--extended .mdc-fab__icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] :host .mdc-fab--extended .mdc-fab__icon,:host .mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}:host .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] :host .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,:host .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}:host .mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}:host .mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host .mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){:host .mdc-fab::before{border-color:CanvasText}}:host .mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}:host .mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}:host .mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}:host .mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}:host .mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}:host .mdc-fab .ripple{overflow:hidden}:host .mdc-fab:not(.mdc-fab--extended) .ripple{border-radius:50%}:host .mdc-fab.mdc-fab--extended .ripple{border-radius:24px}:host .mdc-fab .mdc-fab__label{z-index:0}:host .mdc-fab .mdc-fab__icon ::slotted(*){width:inherit;height:inherit;font-size:inherit}:host .mdc-fab--extended.mdc-fab--exited .mdc-fab__icon ::slotted(*){transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}:host .mdc-fab{padding-top:0px;padding-top:max(0px, var(--mdc-fab-focus-outline-width, 0px));padding-right:0px;padding-right:max(0px, var(--mdc-fab-focus-outline-width, 0px));padding-bottom:0px;padding-bottom:max(0px, var(--mdc-fab-focus-outline-width, 0px));padding-left:0px;padding-left:max(0px, var(--mdc-fab-focus-outline-width, 0px));box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-fab-box-shadow, 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12))}:host .mdc-fab:not(:disabled).mdc-ripple-upgraded--background-focused,:host .mdc-fab:not(:disabled):not(.mdc-ripple-upgraded):focus{border-color:initial;border-color:var(--mdc-fab-focus-outline-color, initial)}:host .mdc-fab:not(:disabled).mdc-ripple-upgraded--background-focused,:host .mdc-fab:not(:disabled):not(.mdc-ripple-upgraded):focus{border-style:solid;border-width:var(--mdc-fab-focus-outline-width, 0px);padding-top:0px;padding-top:max(calc(0px - var(--mdc-fab-focus-outline-width, 0px)), calc(calc(0px - var(--mdc-fab-focus-outline-width, 0px)) * -1));padding-right:0px;padding-right:max(calc(0px - var(--mdc-fab-focus-outline-width, 0px)), calc(calc(0px - var(--mdc-fab-focus-outline-width, 0px)) * -1));padding-bottom:0px;padding-bottom:max(calc(0px - var(--mdc-fab-focus-outline-width, 0px)), calc(calc(0px - var(--mdc-fab-focus-outline-width, 0px)) * -1));padding-left:0px;padding-left:max(calc(0px - var(--mdc-fab-focus-outline-width, 0px)), calc(calc(0px - var(--mdc-fab-focus-outline-width, 0px)) * -1))}:host .mdc-fab:hover,:host .mdc-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-fab-box-shadow, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}:host .mdc-fab:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-fab-box-shadow, 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12))}:host .mdc-fab .ripple{overflow:hidden}:host .mdc-fab .mdc-fab__label{z-index:0}:host .mdc-fab:not(.mdc-fab--extended) .ripple{border-radius:50%}:host .mdc-fab.mdc-fab--extended .ripple{border-radius:24px}:host .mdc-fab .mdc-fab__icon{width:24px;width:var(--mdc-icon-size, 24px);height:24px;height:var(--mdc-icon-size, 24px);font-size:24px;font-size:var(--mdc-icon-size, 24px);transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform;display:inline-flex;align-items:center;justify-content:center}:host .mdc-fab.mdc-fab--extended{padding-top:0px;padding-top:max(0px, var(--mdc-fab-focus-outline-width, 0px));padding-right:20px;padding-right:max(var(--mdc-fab-extended-label-padding, 20px), var(--mdc-fab-focus-outline-width, 0px));padding-bottom:0px;padding-bottom:max(0px, var(--mdc-fab-focus-outline-width, 0px));padding-left:20px;padding-left:max(var(--mdc-fab-extended-label-padding, 20px), var(--mdc-fab-focus-outline-width, 0px))}:host .mdc-fab.mdc-fab--extended:not(:disabled).mdc-ripple-upgraded--background-focused,:host .mdc-fab.mdc-fab--extended:not(:disabled):not(.mdc-ripple-upgraded):focus{border-style:solid;border-width:var(--mdc-fab-focus-outline-width, 0px);padding-top:0px;padding-top:max(calc(0px - var(--mdc-fab-focus-outline-width, 0px)), calc(calc(0px - var(--mdc-fab-focus-outline-width, 0px)) * -1));padding-right:20px;padding-right:max(calc(var(--mdc-fab-extended-label-padding, 20px) - var(--mdc-fab-focus-outline-width, 0px)), calc(calc(var(--mdc-fab-extended-label-padding, 20px) - var(--mdc-fab-focus-outline-width, 0px)) * -1));padding-bottom:0px;padding-bottom:max(calc(0px - var(--mdc-fab-focus-outline-width, 0px)), calc(calc(0px - var(--mdc-fab-focus-outline-width, 0px)) * -1));padding-left:20px;padding-left:max(calc(var(--mdc-fab-extended-label-padding, 20px) - var(--mdc-fab-focus-outline-width, 0px)), calc(calc(var(--mdc-fab-extended-label-padding, 20px) - var(--mdc-fab-focus-outline-width, 0px)) * -1))}:host .mdc-fab.mdc-fab--extended.icon-end .mdc-fab__icon{margin-left:12px;margin-left:var(--mdc-fab-extended-icon-padding, 12px);margin-right:calc(12px - 20px);margin-right:calc(var(--mdc-fab-extended-icon-padding, 12px) - var(--mdc-fab-extended-label-padding, 20px))}[dir=rtl] :host .mdc-fab.mdc-fab--extended.icon-end .mdc-fab__icon,:host .mdc-fab.mdc-fab--extended.icon-end .mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-left:calc(var(--mdc-fab-extended-icon-padding, 12px) - var(--mdc-fab-extended-label-padding, 20px));margin-right:12px;margin-right:var(--mdc-fab-extended-icon-padding, 12px)}`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
let Fab = class Fab extends FabBase {
};
Fab.styles = [styles$6];
Fab = __decorate([
    e$7('mwc-fab')
], Fab);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class IconButtonBase extends s$2 {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.icon = '';
        this.shouldRenderRipple = false;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            return this.ripple;
        });
    }
    /** @soyTemplate */
    renderRipple() {
        return this.shouldRenderRipple ? x `
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>` :
            '';
    }
    focus() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.startFocus();
            buttonElement.focus();
        }
    }
    blur() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.endFocus();
            buttonElement.blur();
        }
    }
    /** @soyTemplate */
    render() {
        return x `<button
        class="mdc-icon-button mdc-icon-button--display-flex"
        aria-label="${this.ariaLabel || this.icon}"
        aria-haspopup="${l$2(this.ariaHasPopup)}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
    >${this.renderRipple()}
    ${this.icon ? x `<i class="material-icons">${this.icon}</i>` : ''}
    <span
      ><slot></slot
    ></span>
  </button>`;
    }
    handleRippleMouseDown(event) {
        const onUp = () => {
            window.removeEventListener('mouseup', onUp);
            this.handleRippleDeactivate();
        };
        window.addEventListener('mouseup', onUp);
        this.rippleHandlers.startPress(event);
    }
    handleRippleTouchStart(event) {
        this.rippleHandlers.startPress(event);
    }
    handleRippleDeactivate() {
        this.rippleHandlers.endPress();
    }
    handleRippleMouseEnter() {
        this.rippleHandlers.startHover();
    }
    handleRippleMouseLeave() {
        this.rippleHandlers.endHover();
    }
    handleRippleFocus() {
        this.rippleHandlers.startFocus();
    }
    handleRippleBlur() {
        this.rippleHandlers.endFocus();
    }
}
__decorate([
    n$4({ type: Boolean, reflect: true })
], IconButtonBase.prototype, "disabled", void 0);
__decorate([
    n$4({ type: String })
], IconButtonBase.prototype, "icon", void 0);
__decorate([
    ariaProperty,
    n$4({ type: String, attribute: 'aria-label' })
], IconButtonBase.prototype, "ariaLabel", void 0);
__decorate([
    ariaProperty,
    n$4({ type: String, attribute: 'aria-haspopup' })
], IconButtonBase.prototype, "ariaHasPopup", void 0);
__decorate([
    i$2('button')
], IconButtonBase.prototype, "buttonElement", void 0);
__decorate([
    e$4('mwc-ripple')
], IconButtonBase.prototype, "ripple", void 0);
__decorate([
    t$1()
], IconButtonBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    e$5({ passive: true })
], IconButtonBase.prototype, "handleRippleMouseDown", null);
__decorate([
    e$5({ passive: true })
], IconButtonBase.prototype, "handleRippleTouchStart", null);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$5 = i$6 `.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button .mdc-icon-button__focus-ring{display:none}.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{display:block;max-height:48px;max-width:48px}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{content:"";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{border-color:CanvasText}}.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:40px;height:40px;margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-icon-button.mdc-icon-button--reduced-size.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button.mdc-icon-button--reduced-size:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{max-height:40px;max-width:40px}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}:host{display:inline-block;outline:none}:host([disabled]){pointer-events:none}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block}:host{--mdc-ripple-color: currentcolor;-webkit-tap-highlight-color:transparent}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc( (var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2 )}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
let IconButton = class IconButton extends IconButtonBase {
};
IconButton.styles = [styles$5];
IconButton = __decorate([
    e$7('mwc-icon-button')
], IconButton);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$1=o=>void 0===o.strings,s$1={},a=(o,l=s$1)=>o._$AH=l;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=(i,t)=>{var e,o;const r=i._$AN;if(void 0===r)return  false;for(const i of r)null===(o=(e=i)._$AO)||void 0===o||o.call(e,t,false),s(i,t);return  true},o$1=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===(null==e?void 0:e.size))},r=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),l$1(t);}};function n$1(i){ void 0!==this._$AN?(o$1(this),this._$AM=i,r(this)):this._$AM=i;}function h$1(i,t=false,e=0){const r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)s(r[i],false),o$1(r[i]);else null!=r&&(s(r,false),o$1(r));else s(this,i);}const l$1=i=>{var t$1,s,o,r;i.type==t.CHILD&&(null!==(t$1=(o=i)._$AP)&&void 0!==t$1||(o._$AP=h$1),null!==(s=(r=i)._$AQ)&&void 0!==s||(r._$AQ=n$1));};class c extends i$1{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),r(this),this.isConnected=i._$AU;}_$AO(i,t=true){var e,r;i!==this.isConnected&&(this.isConnected=i,i?null===(e=this.reconnected)||void 0===e||e.call(this):null===(r=this.disconnected)||void 0===r||r.call(this)),t&&(s(this,i),o$1(this));}setValue(t){if(e$1(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=()=>new o;class o{}const h=new WeakMap,n=e$2(class extends c{render(t){return A$1}update(t,[s]){var e;const o=s!==this.G;return o&&void 0!==this.G&&this.ot(void 0),(o||this.rt!==this.lt)&&(this.G=s,this.dt=null===(e=t.options)||void 0===e?void 0:e.host,this.ot(this.lt=t.element)),A$1}ot(i){var t;if("function"==typeof this.G){const s=null!==(t=this.dt)&&void 0!==t?t:globalThis;let e=h.get(s);void 0===e&&(e=new WeakMap,h.set(s,e)),void 0!==e.get(this.G)&&this.G.call(this.dt,void 0),e.set(this.G,i),void 0!==i&&this.G.call(this.dt,i);}else this.G.value=i;}get rt(){var i,t,s;return "function"==typeof this.G?null===(t=h.get(null!==(i=this.dt)&&void 0!==i?i:globalThis))||void 0===t?void 0:t.get(this.G):null===(s=this.G)||void 0===s?void 0:s.value}disconnected(){this.rt===this.lt&&this.ot(void 0);}reconnected(){this.ot(this.lt);}});

/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(() => {
    var _a, _b, _c;
    /* Symbols for private properties */
    const _blockingElements = Symbol();
    const _alreadyInertElements = Symbol();
    const _topElParents = Symbol();
    const _siblingsToRestore = Symbol();
    const _parentMO = Symbol();
    /* Symbols for private static methods */
    const _topChanged = Symbol();
    const _swapInertedSibling = Symbol();
    const _inertSiblings = Symbol();
    const _restoreInertedSiblings = Symbol();
    const _getParents = Symbol();
    const _getDistributedChildren = Symbol();
    const _isInertable = Symbol();
    const _handleMutations = Symbol();
    class BlockingElementsImpl {
        constructor() {
            /**
             * The blocking elements.
             */
            this[_a] = [];
            /**
             * Used to keep track of the parents of the top element, from the element
             * itself up to body. When top changes, the old top might have been removed
             * from the document, so we need to memoize the inerted parents' siblings
             * in order to restore their inerteness when top changes.
             */
            this[_b] = [];
            /**
             * Elements that are already inert before the first blocking element is
             * pushed.
             */
            this[_c] = new Set();
        }
        destructor() {
            // Restore original inertness.
            this[_restoreInertedSiblings](this[_topElParents]);
            // Note we don't want to make these properties nullable on the class,
            // since then we'd need non-null casts in many places. Calling a method on
            // a BlockingElements instance after calling destructor will result in an
            // exception.
            const nullable = this;
            nullable[_blockingElements] = null;
            nullable[_topElParents] = null;
            nullable[_alreadyInertElements] = null;
        }
        get top() {
            const elems = this[_blockingElements];
            return elems[elems.length - 1] || null;
        }
        push(element) {
            if (!element || element === this.top) {
                return;
            }
            // Remove it from the stack, we'll bring it to the top.
            this.remove(element);
            this[_topChanged](element);
            this[_blockingElements].push(element);
        }
        remove(element) {
            const i = this[_blockingElements].indexOf(element);
            if (i === -1) {
                return false;
            }
            this[_blockingElements].splice(i, 1);
            // Top changed only if the removed element was the top element.
            if (i === this[_blockingElements].length) {
                this[_topChanged](this.top);
            }
            return true;
        }
        pop() {
            const top = this.top;
            top && this.remove(top);
            return top;
        }
        has(element) {
            return this[_blockingElements].indexOf(element) !== -1;
        }
        /**
         * Sets `inert` to all document elements except the new top element, its
         * parents, and its distributed content.
         */
        [(_a = _blockingElements, _b = _topElParents, _c = _alreadyInertElements, _topChanged)](newTop) {
            const toKeepInert = this[_alreadyInertElements];
            const oldParents = this[_topElParents];
            // No new top, reset old top if any.
            if (!newTop) {
                this[_restoreInertedSiblings](oldParents);
                toKeepInert.clear();
                this[_topElParents] = [];
                return;
            }
            const newParents = this[_getParents](newTop);
            // New top is not contained in the main document!
            if (newParents[newParents.length - 1].parentNode !== document.body) {
                throw Error('Non-connected element cannot be a blocking element');
            }
            // Cast here because we know we'll call _inertSiblings on newParents
            // below.
            this[_topElParents] = newParents;
            const toSkip = this[_getDistributedChildren](newTop);
            // No previous top element.
            if (!oldParents.length) {
                this[_inertSiblings](newParents, toSkip, toKeepInert);
                return;
            }
            let i = oldParents.length - 1;
            let j = newParents.length - 1;
            // Find common parent. Index 0 is the element itself (so stop before it).
            while (i > 0 && j > 0 && oldParents[i] === newParents[j]) {
                i--;
                j--;
            }
            // If up the parents tree there are 2 elements that are siblings, swap
            // the inerted sibling.
            if (oldParents[i] !== newParents[j]) {
                this[_swapInertedSibling](oldParents[i], newParents[j]);
            }
            // Restore old parents siblings inertness.
            i > 0 && this[_restoreInertedSiblings](oldParents.slice(0, i));
            // Make new parents siblings inert.
            j > 0 && this[_inertSiblings](newParents.slice(0, j), toSkip, null);
        }
        /**
         * Swaps inertness between two sibling elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */
        [_swapInertedSibling](oldInert, newInert) {
            const siblingsToRestore = oldInert[_siblingsToRestore];
            // oldInert is not contained in siblings to restore, so we have to check
            // if it's inertable and if already inert.
            if (this[_isInertable](oldInert) && !oldInert.inert) {
                oldInert.inert = true;
                siblingsToRestore.add(oldInert);
            }
            // If newInert was already between the siblings to restore, it means it is
            // inertable and must be restored.
            if (siblingsToRestore.has(newInert)) {
                newInert.inert = false;
                siblingsToRestore.delete(newInert);
            }
            newInert[_parentMO] = oldInert[_parentMO];
            newInert[_siblingsToRestore] = siblingsToRestore;
            oldInert[_parentMO] = undefined;
            oldInert[_siblingsToRestore] = undefined;
        }
        /**
         * Restores original inertness to the siblings of the elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */
        [_restoreInertedSiblings](elements) {
            for (const element of elements) {
                const mo = element[_parentMO];
                mo.disconnect();
                element[_parentMO] = undefined;
                const siblings = element[_siblingsToRestore];
                for (const sibling of siblings) {
                    sibling.inert = false;
                }
                element[_siblingsToRestore] = undefined;
            }
        }
        /**
         * Inerts the siblings of the elements except the elements to skip. Stores
         * the inerted siblings into the element's symbol `_siblingsToRestore`.
         * Pass `toKeepInert` to collect the already inert elements.
         * Sets the property `inert` over the attribute since the inert spec
         * doesn't specify if it should be reflected.
         * https://html.spec.whatwg.org/multipage/interaction.html#inert
         */
        [_inertSiblings](elements, toSkip, toKeepInert) {
            for (const element of elements) {
                // Assume element is not a Document, so it must have a parentNode.
                const parent = element.parentNode;
                const children = parent.children;
                const inertedSiblings = new Set();
                for (let j = 0; j < children.length; j++) {
                    const sibling = children[j];
                    // Skip the input element, if not inertable or to be skipped.
                    if (sibling === element || !this[_isInertable](sibling) ||
                        (toSkip && toSkip.has(sibling))) {
                        continue;
                    }
                    // Should be collected since already inerted.
                    if (toKeepInert && sibling.inert) {
                        toKeepInert.add(sibling);
                    }
                    else {
                        sibling.inert = true;
                        inertedSiblings.add(sibling);
                    }
                }
                // Store the siblings that were inerted.
                element[_siblingsToRestore] = inertedSiblings;
                // Observe only immediate children mutations on the parent.
                const mo = new MutationObserver(this[_handleMutations].bind(this));
                element[_parentMO] = mo;
                let parentToObserve = parent;
                // If we're using the ShadyDOM polyfill, then our parent could be a
                // shady root, which is an object that acts like a ShadowRoot, but isn't
                // actually a node in the real DOM. Observe the real DOM parent instead.
                const maybeShadyRoot = parentToObserve;
                if (maybeShadyRoot.__shady && maybeShadyRoot.host) {
                    parentToObserve = maybeShadyRoot.host;
                }
                mo.observe(parentToObserve, {
                    childList: true,
                });
            }
        }
        /**
         * Handles newly added/removed nodes by toggling their inertness.
         * It also checks if the current top Blocking Element has been removed,
         * notifying and removing it.
         */
        [_handleMutations](mutations) {
            const parents = this[_topElParents];
            const toKeepInert = this[_alreadyInertElements];
            for (const mutation of mutations) {
                // If the target is a shadowRoot, get its host as we skip shadowRoots when
                // computing _topElParents.
                const target = mutation.target.host || mutation.target;
                const idx = target === document.body ?
                    parents.length :
                    parents.indexOf(target);
                const inertedChild = parents[idx - 1];
                const inertedSiblings = inertedChild[_siblingsToRestore];
                // To restore.
                for (let i = 0; i < mutation.removedNodes.length; i++) {
                    const sibling = mutation.removedNodes[i];
                    if (sibling === inertedChild) {
                        console.info('Detected removal of the top Blocking Element.');
                        this.pop();
                        return;
                    }
                    if (inertedSiblings.has(sibling)) {
                        sibling.inert = false;
                        inertedSiblings.delete(sibling);
                    }
                }
                // To inert.
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const sibling = mutation.addedNodes[i];
                    if (!this[_isInertable](sibling)) {
                        continue;
                    }
                    if (toKeepInert && sibling.inert) {
                        toKeepInert.add(sibling);
                    }
                    else {
                        sibling.inert = true;
                        inertedSiblings.add(sibling);
                    }
                }
            }
        }
        /**
         * Returns if the element is inertable.
         */
        [_isInertable](element) {
            return false === /^(style|template|script)$/.test(element.localName);
        }
        /**
         * Returns the list of newParents of an element, starting from element
         * (included) up to `document.body` (excluded).
         */
        [_getParents](element) {
            const parents = [];
            let current = element;
            // Stop to body.
            while (current && current !== document.body) {
                // Skip shadow roots.
                if (current.nodeType === Node.ELEMENT_NODE) {
                    parents.push(current);
                }
                // ShadowDom v1
                if (current.assignedSlot) {
                    // Collect slots from deepest slot to top.
                    while (current = current.assignedSlot) {
                        parents.push(current);
                    }
                    // Continue the search on the top slot.
                    current = parents.pop();
                    continue;
                }
                current = current.parentNode ||
                    current.host;
            }
            return parents;
        }
        /**
         * Returns the distributed children of the element's shadow root.
         * Returns null if the element doesn't have a shadow root.
         */
        [_getDistributedChildren](element) {
            const shadowRoot = element.shadowRoot;
            if (!shadowRoot) {
                return null;
            }
            const result = new Set();
            let i;
            let j;
            let nodes;
            const slots = shadowRoot.querySelectorAll('slot');
            if (slots.length && slots[0].assignedNodes) {
                for (i = 0; i < slots.length; i++) {
                    nodes = slots[i].assignedNodes({
                        flatten: true,
                    });
                    for (j = 0; j < nodes.length; j++) {
                        if (nodes[j].nodeType === Node.ELEMENT_NODE) {
                            result.add(nodes[j]);
                        }
                    }
                }
                // No need to search for <content>.
            }
            return result;
        }
    }
    document.$blockingElements =
        new BlockingElementsImpl();
})();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This work is licensed under the W3C Software and Document License
 * (http://www.w3.org/Consortium/Legal/2015/copyright-software-and-document).
 */

(function () {
  // Return early if we're not running inside of the browser.
  if (typeof window === 'undefined' || typeof Element === 'undefined') {
    return;
  }

  // Convenience function for converting NodeLists.
  /** @type {typeof Array.prototype.slice} */
  var slice = Array.prototype.slice;

  /**
   * IE has a non-standard name for "matches".
   * @type {typeof Element.prototype.matches}
   */
  var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;

  /** @type {string} */
  var _focusableElementsString = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'details', 'summary', 'iframe', 'object', 'embed', 'video', '[contenteditable]'].join(',');

  /**
   * `InertRoot` manages a single inert subtree, i.e. a DOM subtree whose root element has an `inert`
   * attribute.
   *
   * Its main functions are:
   *
   * - to create and maintain a set of managed `InertNode`s, including when mutations occur in the
   *   subtree. The `makeSubtreeUnfocusable()` method handles collecting `InertNode`s via registering
   *   each focusable node in the subtree with the singleton `InertManager` which manages all known
   *   focusable nodes within inert subtrees. `InertManager` ensures that a single `InertNode`
   *   instance exists for each focusable node which has at least one inert root as an ancestor.
   *
   * - to notify all managed `InertNode`s when this subtree stops being inert (i.e. when the `inert`
   *   attribute is removed from the root node). This is handled in the destructor, which calls the
   *   `deregister` method on `InertManager` for each managed inert node.
   */

  var InertRoot = function () {
    /**
     * @param {!HTMLElement} rootElement The HTMLElement at the root of the inert subtree.
     * @param {!InertManager} inertManager The global singleton InertManager object.
     */
    function InertRoot(rootElement, inertManager) {
      _classCallCheck(this, InertRoot);

      /** @type {!InertManager} */
      this._inertManager = inertManager;

      /** @type {!HTMLElement} */
      this._rootElement = rootElement;

      /**
       * @type {!Set<!InertNode>}
       * All managed focusable nodes in this InertRoot's subtree.
       */
      this._managedNodes = new Set();

      // Make the subtree hidden from assistive technology
      if (this._rootElement.hasAttribute('aria-hidden')) {
        /** @type {?string} */
        this._savedAriaHidden = this._rootElement.getAttribute('aria-hidden');
      } else {
        this._savedAriaHidden = null;
      }
      this._rootElement.setAttribute('aria-hidden', 'true');

      // Make all focusable elements in the subtree unfocusable and add them to _managedNodes
      this._makeSubtreeUnfocusable(this._rootElement);

      // Watch for:
      // - any additions in the subtree: make them unfocusable too
      // - any removals from the subtree: remove them from this inert root's managed nodes
      // - attribute changes: if `tabindex` is added, or removed from an intrinsically focusable
      //   element, make that node a managed node.
      this._observer = new MutationObserver(this._onMutation.bind(this));
      this._observer.observe(this._rootElement, { attributes: true, childList: true, subtree: true });
    }

    /**
     * Call this whenever this object is about to become obsolete.  This unwinds all of the state
     * stored in this object and updates the state of all of the managed nodes.
     */


    _createClass(InertRoot, [{
      key: 'destructor',
      value: function destructor() {
        this._observer.disconnect();

        if (this._rootElement) {
          if (this._savedAriaHidden !== null) {
            this._rootElement.setAttribute('aria-hidden', this._savedAriaHidden);
          } else {
            this._rootElement.removeAttribute('aria-hidden');
          }
        }

        this._managedNodes.forEach(function (inertNode) {
          this._unmanageNode(inertNode.node);
        }, this);

        // Note we cast the nulls to the ANY type here because:
        // 1) We want the class properties to be declared as non-null, or else we
        //    need even more casts throughout this code. All bets are off if an
        //    instance has been destroyed and a method is called.
        // 2) We don't want to cast "this", because we want type-aware optimizations
        //    to know which properties we're setting.
        this._observer = /** @type {?} */null;
        this._rootElement = /** @type {?} */null;
        this._managedNodes = /** @type {?} */null;
        this._inertManager = /** @type {?} */null;
      }

      /**
       * @return {!Set<!InertNode>} A copy of this InertRoot's managed nodes set.
       */

    }, {
      key: '_makeSubtreeUnfocusable',


      /**
       * @param {!Node} startNode
       */
      value: function _makeSubtreeUnfocusable(startNode) {
        var _this2 = this;

        composedTreeWalk(startNode, function (node) {
          return _this2._visitNode(node);
        });

        var activeElement = document.activeElement;

        if (!document.body.contains(startNode)) {
          // startNode may be in shadow DOM, so find its nearest shadowRoot to get the activeElement.
          var node = startNode;
          /** @type {!ShadowRoot|undefined} */
          var root = undefined;
          while (node) {
            if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
              root = /** @type {!ShadowRoot} */node;
              break;
            }
            node = node.parentNode;
          }
          if (root) {
            activeElement = root.activeElement;
          }
        }
        if (startNode.contains(activeElement)) {
          activeElement.blur();
          // In IE11, if an element is already focused, and then set to tabindex=-1
          // calling blur() will not actually move the focus.
          // To work around this we call focus() on the body instead.
          if (activeElement === document.activeElement) {
            document.body.focus();
          }
        }
      }

      /**
       * @param {!Node} node
       */

    }, {
      key: '_visitNode',
      value: function _visitNode(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        var element = /** @type {!HTMLElement} */node;

        // If a descendant inert root becomes un-inert, its descendants will still be inert because of
        // this inert root, so all of its managed nodes need to be adopted by this InertRoot.
        if (element !== this._rootElement && element.hasAttribute('inert')) {
          this._adoptInertRoot(element);
        }

        if (matches.call(element, _focusableElementsString) || element.hasAttribute('tabindex')) {
          this._manageNode(element);
        }
      }

      /**
       * Register the given node with this InertRoot and with InertManager.
       * @param {!Node} node
       */

    }, {
      key: '_manageNode',
      value: function _manageNode(node) {
        var inertNode = this._inertManager.register(node, this);
        this._managedNodes.add(inertNode);
      }

      /**
       * Unregister the given node with this InertRoot and with InertManager.
       * @param {!Node} node
       */

    }, {
      key: '_unmanageNode',
      value: function _unmanageNode(node) {
        var inertNode = this._inertManager.deregister(node, this);
        if (inertNode) {
          this._managedNodes['delete'](inertNode);
        }
      }

      /**
       * Unregister the entire subtree starting at `startNode`.
       * @param {!Node} startNode
       */

    }, {
      key: '_unmanageSubtree',
      value: function _unmanageSubtree(startNode) {
        var _this3 = this;

        composedTreeWalk(startNode, function (node) {
          return _this3._unmanageNode(node);
        });
      }

      /**
       * If a descendant node is found with an `inert` attribute, adopt its managed nodes.
       * @param {!HTMLElement} node
       */

    }, {
      key: '_adoptInertRoot',
      value: function _adoptInertRoot(node) {
        var inertSubroot = this._inertManager.getInertRoot(node);

        // During initialisation this inert root may not have been registered yet,
        // so register it now if need be.
        if (!inertSubroot) {
          this._inertManager.setInert(node, true);
          inertSubroot = this._inertManager.getInertRoot(node);
        }

        inertSubroot.managedNodes.forEach(function (savedInertNode) {
          this._manageNode(savedInertNode.node);
        }, this);
      }

      /**
       * Callback used when mutation observer detects subtree additions, removals, or attribute changes.
       * @param {!Array<!MutationRecord>} records
       * @param {!MutationObserver} self
       */

    }, {
      key: '_onMutation',
      value: function _onMutation(records, self) {
        records.forEach(function (record) {
          var target = /** @type {!HTMLElement} */record.target;
          if (record.type === 'childList') {
            // Manage added nodes
            slice.call(record.addedNodes).forEach(function (node) {
              this._makeSubtreeUnfocusable(node);
            }, this);

            // Un-manage removed nodes
            slice.call(record.removedNodes).forEach(function (node) {
              this._unmanageSubtree(node);
            }, this);
          } else if (record.type === 'attributes') {
            if (record.attributeName === 'tabindex') {
              // Re-initialise inert node if tabindex changes
              this._manageNode(target);
            } else if (target !== this._rootElement && record.attributeName === 'inert' && target.hasAttribute('inert')) {
              // If a new inert root is added, adopt its managed nodes and make sure it knows about the
              // already managed nodes from this inert subroot.
              this._adoptInertRoot(target);
              var inertSubroot = this._inertManager.getInertRoot(target);
              this._managedNodes.forEach(function (managedNode) {
                if (target.contains(managedNode.node)) {
                  inertSubroot._manageNode(managedNode.node);
                }
              });
            }
          }
        }, this);
      }
    }, {
      key: 'managedNodes',
      get: function get() {
        return new Set(this._managedNodes);
      }

      /** @return {boolean} */

    }, {
      key: 'hasSavedAriaHidden',
      get: function get() {
        return this._savedAriaHidden !== null;
      }

      /** @param {?string} ariaHidden */

    }, {
      key: 'savedAriaHidden',
      set: function set(ariaHidden) {
        this._savedAriaHidden = ariaHidden;
      }

      /** @return {?string} */
      ,
      get: function get() {
        return this._savedAriaHidden;
      }
    }]);

    return InertRoot;
  }();

  /**
   * `InertNode` initialises and manages a single inert node.
   * A node is inert if it is a descendant of one or more inert root elements.
   *
   * On construction, `InertNode` saves the existing `tabindex` value for the node, if any, and
   * either removes the `tabindex` attribute or sets it to `-1`, depending on whether the element
   * is intrinsically focusable or not.
   *
   * `InertNode` maintains a set of `InertRoot`s which are descendants of this `InertNode`. When an
   * `InertRoot` is destroyed, and calls `InertManager.deregister()`, the `InertManager` notifies the
   * `InertNode` via `removeInertRoot()`, which in turn destroys the `InertNode` if no `InertRoot`s
   * remain in the set. On destruction, `InertNode` reinstates the stored `tabindex` if one exists,
   * or removes the `tabindex` attribute if the element is intrinsically focusable.
   */


  var InertNode = function () {
    /**
     * @param {!Node} node A focusable element to be made inert.
     * @param {!InertRoot} inertRoot The inert root element associated with this inert node.
     */
    function InertNode(node, inertRoot) {
      _classCallCheck(this, InertNode);

      /** @type {!Node} */
      this._node = node;

      /** @type {boolean} */
      this._overrodeFocusMethod = false;

      /**
       * @type {!Set<!InertRoot>} The set of descendant inert roots.
       *    If and only if this set becomes empty, this node is no longer inert.
       */
      this._inertRoots = new Set([inertRoot]);

      /** @type {?number} */
      this._savedTabIndex = null;

      /** @type {boolean} */
      this._destroyed = false;

      // Save any prior tabindex info and make this node untabbable
      this.ensureUntabbable();
    }

    /**
     * Call this whenever this object is about to become obsolete.
     * This makes the managed node focusable again and deletes all of the previously stored state.
     */


    _createClass(InertNode, [{
      key: 'destructor',
      value: function destructor() {
        this._throwIfDestroyed();

        if (this._node && this._node.nodeType === Node.ELEMENT_NODE) {
          var element = /** @type {!HTMLElement} */this._node;
          if (this._savedTabIndex !== null) {
            element.setAttribute('tabindex', this._savedTabIndex);
          } else {
            element.removeAttribute('tabindex');
          }

          // Use `delete` to restore native focus method.
          if (this._overrodeFocusMethod) {
            delete element.focus;
          }
        }

        // See note in InertRoot.destructor for why we cast these nulls to ANY.
        this._node = /** @type {?} */null;
        this._inertRoots = /** @type {?} */null;
        this._destroyed = true;
      }

      /**
       * @type {boolean} Whether this object is obsolete because the managed node is no longer inert.
       * If the object has been destroyed, any attempt to access it will cause an exception.
       */

    }, {
      key: '_throwIfDestroyed',


      /**
       * Throw if user tries to access destroyed InertNode.
       */
      value: function _throwIfDestroyed() {
        if (this.destroyed) {
          throw new Error('Trying to access destroyed InertNode');
        }
      }

      /** @return {boolean} */

    }, {
      key: 'ensureUntabbable',


      /** Save the existing tabindex value and make the node untabbable and unfocusable */
      value: function ensureUntabbable() {
        if (this.node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        var element = /** @type {!HTMLElement} */this.node;
        if (matches.call(element, _focusableElementsString)) {
          if ( /** @type {!HTMLElement} */element.tabIndex === -1 && this.hasSavedTabIndex) {
            return;
          }

          if (element.hasAttribute('tabindex')) {
            this._savedTabIndex = /** @type {!HTMLElement} */element.tabIndex;
          }
          element.setAttribute('tabindex', '-1');
          if (element.nodeType === Node.ELEMENT_NODE) {
            element.focus = function () {};
            this._overrodeFocusMethod = true;
          }
        } else if (element.hasAttribute('tabindex')) {
          this._savedTabIndex = /** @type {!HTMLElement} */element.tabIndex;
          element.removeAttribute('tabindex');
        }
      }

      /**
       * Add another inert root to this inert node's set of managing inert roots.
       * @param {!InertRoot} inertRoot
       */

    }, {
      key: 'addInertRoot',
      value: function addInertRoot(inertRoot) {
        this._throwIfDestroyed();
        this._inertRoots.add(inertRoot);
      }

      /**
       * Remove the given inert root from this inert node's set of managing inert roots.
       * If the set of managing inert roots becomes empty, this node is no longer inert,
       * so the object should be destroyed.
       * @param {!InertRoot} inertRoot
       */

    }, {
      key: 'removeInertRoot',
      value: function removeInertRoot(inertRoot) {
        this._throwIfDestroyed();
        this._inertRoots['delete'](inertRoot);
        if (this._inertRoots.size === 0) {
          this.destructor();
        }
      }
    }, {
      key: 'destroyed',
      get: function get() {
        return (/** @type {!InertNode} */this._destroyed
        );
      }
    }, {
      key: 'hasSavedTabIndex',
      get: function get() {
        return this._savedTabIndex !== null;
      }

      /** @return {!Node} */

    }, {
      key: 'node',
      get: function get() {
        this._throwIfDestroyed();
        return this._node;
      }

      /** @param {?number} tabIndex */

    }, {
      key: 'savedTabIndex',
      set: function set(tabIndex) {
        this._throwIfDestroyed();
        this._savedTabIndex = tabIndex;
      }

      /** @return {?number} */
      ,
      get: function get() {
        this._throwIfDestroyed();
        return this._savedTabIndex;
      }
    }]);

    return InertNode;
  }();

  /**
   * InertManager is a per-document singleton object which manages all inert roots and nodes.
   *
   * When an element becomes an inert root by having an `inert` attribute set and/or its `inert`
   * property set to `true`, the `setInert` method creates an `InertRoot` object for the element.
   * The `InertRoot` in turn registers itself as managing all of the element's focusable descendant
   * nodes via the `register()` method. The `InertManager` ensures that a single `InertNode` instance
   * is created for each such node, via the `_managedNodes` map.
   */


  var InertManager = function () {
    /**
     * @param {!Document} document
     */
    function InertManager(document) {
      _classCallCheck(this, InertManager);

      if (!document) {
        throw new Error('Missing required argument; InertManager needs to wrap a document.');
      }

      /** @type {!Document} */
      this._document = document;

      /**
       * All managed nodes known to this InertManager. In a map to allow looking up by Node.
       * @type {!Map<!Node, !InertNode>}
       */
      this._managedNodes = new Map();

      /**
       * All inert roots known to this InertManager. In a map to allow looking up by Node.
       * @type {!Map<!Node, !InertRoot>}
       */
      this._inertRoots = new Map();

      /**
       * Observer for mutations on `document.body`.
       * @type {!MutationObserver}
       */
      this._observer = new MutationObserver(this._watchForInert.bind(this));

      // Add inert style.
      addInertStyle(document.head || document.body || document.documentElement);

      // Wait for document to be loaded.
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', this._onDocumentLoaded.bind(this));
      } else {
        this._onDocumentLoaded();
      }
    }

    /**
     * Set whether the given element should be an inert root or not.
     * @param {!HTMLElement} root
     * @param {boolean} inert
     */


    _createClass(InertManager, [{
      key: 'setInert',
      value: function setInert(root, inert) {
        if (inert) {
          if (this._inertRoots.has(root)) {
            // element is already inert
            return;
          }

          var inertRoot = new InertRoot(root, this);
          root.setAttribute('inert', '');
          this._inertRoots.set(root, inertRoot);
          // If not contained in the document, it must be in a shadowRoot.
          // Ensure inert styles are added there.
          if (!this._document.body.contains(root)) {
            var parent = root.parentNode;
            while (parent) {
              if (parent.nodeType === 11) {
                addInertStyle(parent);
              }
              parent = parent.parentNode;
            }
          }
        } else {
          if (!this._inertRoots.has(root)) {
            // element is already non-inert
            return;
          }

          var _inertRoot = this._inertRoots.get(root);
          _inertRoot.destructor();
          this._inertRoots['delete'](root);
          root.removeAttribute('inert');
        }
      }

      /**
       * Get the InertRoot object corresponding to the given inert root element, if any.
       * @param {!Node} element
       * @return {!InertRoot|undefined}
       */

    }, {
      key: 'getInertRoot',
      value: function getInertRoot(element) {
        return this._inertRoots.get(element);
      }

      /**
       * Register the given InertRoot as managing the given node.
       * In the case where the node has a previously existing inert root, this inert root will
       * be added to its set of inert roots.
       * @param {!Node} node
       * @param {!InertRoot} inertRoot
       * @return {!InertNode} inertNode
       */

    }, {
      key: 'register',
      value: function register(node, inertRoot) {
        var inertNode = this._managedNodes.get(node);
        if (inertNode !== undefined) {
          // node was already in an inert subtree
          inertNode.addInertRoot(inertRoot);
        } else {
          inertNode = new InertNode(node, inertRoot);
        }

        this._managedNodes.set(node, inertNode);

        return inertNode;
      }

      /**
       * De-register the given InertRoot as managing the given inert node.
       * Removes the inert root from the InertNode's set of managing inert roots, and remove the inert
       * node from the InertManager's set of managed nodes if it is destroyed.
       * If the node is not currently managed, this is essentially a no-op.
       * @param {!Node} node
       * @param {!InertRoot} inertRoot
       * @return {?InertNode} The potentially destroyed InertNode associated with this node, if any.
       */

    }, {
      key: 'deregister',
      value: function deregister(node, inertRoot) {
        var inertNode = this._managedNodes.get(node);
        if (!inertNode) {
          return null;
        }

        inertNode.removeInertRoot(inertRoot);
        if (inertNode.destroyed) {
          this._managedNodes['delete'](node);
        }

        return inertNode;
      }

      /**
       * Callback used when document has finished loading.
       */

    }, {
      key: '_onDocumentLoaded',
      value: function _onDocumentLoaded() {
        // Find all inert roots in document and make them actually inert.
        var inertElements = slice.call(this._document.querySelectorAll('[inert]'));
        inertElements.forEach(function (inertElement) {
          this.setInert(inertElement, true);
        }, this);

        // Comment this out to use programmatic API only.
        this._observer.observe(this._document.body || this._document.documentElement, { attributes: true, subtree: true, childList: true });
      }

      /**
       * Callback used when mutation observer detects attribute changes.
       * @param {!Array<!MutationRecord>} records
       * @param {!MutationObserver} self
       */

    }, {
      key: '_watchForInert',
      value: function _watchForInert(records, self) {
        var _this = this;
        records.forEach(function (record) {
          switch (record.type) {
            case 'childList':
              slice.call(record.addedNodes).forEach(function (node) {
                if (node.nodeType !== Node.ELEMENT_NODE) {
                  return;
                }
                var inertElements = slice.call(node.querySelectorAll('[inert]'));
                if (matches.call(node, '[inert]')) {
                  inertElements.unshift(node);
                }
                inertElements.forEach(function (inertElement) {
                  this.setInert(inertElement, true);
                }, _this);
              }, _this);
              break;
            case 'attributes':
              if (record.attributeName !== 'inert') {
                return;
              }
              var target = /** @type {!HTMLElement} */record.target;
              var inert = target.hasAttribute('inert');
              _this.setInert(target, inert);
              break;
          }
        }, this);
      }
    }]);

    return InertManager;
  }();

  /**
   * Recursively walk the composed tree from |node|.
   * @param {!Node} node
   * @param {(function (!HTMLElement))=} callback Callback to be called for each element traversed,
   *     before descending into child nodes.
   * @param {?ShadowRoot=} shadowRootAncestor The nearest ShadowRoot ancestor, if any.
   */


  function composedTreeWalk(node, callback, shadowRootAncestor) {
    if (node.nodeType == Node.ELEMENT_NODE) {
      var element = /** @type {!HTMLElement} */node;
      if (callback) {
        callback(element);
      }

      // Descend into node:
      // If it has a ShadowRoot, ignore all child elements - these will be picked
      // up by the <content> or <shadow> elements. Descend straight into the
      // ShadowRoot.
      var shadowRoot = /** @type {!HTMLElement} */element.shadowRoot;
      if (shadowRoot) {
        composedTreeWalk(shadowRoot, callback);
        return;
      }

      // If it is a <content> element, descend into distributed elements - these
      // are elements from outside the shadow root which are rendered inside the
      // shadow DOM.
      if (element.localName == 'content') {
        var content = /** @type {!HTMLContentElement} */element;
        // Verifies if ShadowDom v0 is supported.
        var distributedNodes = content.getDistributedNodes ? content.getDistributedNodes() : [];
        for (var i = 0; i < distributedNodes.length; i++) {
          composedTreeWalk(distributedNodes[i], callback);
        }
        return;
      }

      // If it is a <slot> element, descend into assigned nodes - these
      // are elements from outside the shadow root which are rendered inside the
      // shadow DOM.
      if (element.localName == 'slot') {
        var slot = /** @type {!HTMLSlotElement} */element;
        // Verify if ShadowDom v1 is supported.
        var _distributedNodes = slot.assignedNodes ? slot.assignedNodes({ flatten: true }) : [];
        for (var _i = 0; _i < _distributedNodes.length; _i++) {
          composedTreeWalk(_distributedNodes[_i], callback);
        }
        return;
      }
    }

    // If it is neither the parent of a ShadowRoot, a <content> element, a <slot>
    // element, nor a <shadow> element recurse normally.
    var child = node.firstChild;
    while (child != null) {
      composedTreeWalk(child, callback);
      child = child.nextSibling;
    }
  }

  /**
   * Adds a style element to the node containing the inert specific styles
   * @param {!Node} node
   */
  function addInertStyle(node) {
    if (node.querySelector('style#inert-style, link#inert-style')) {
      return;
    }
    var style = document.createElement('style');
    style.setAttribute('id', 'inert-style');
    style.textContent = '\n' + '[inert] {\n' + '  pointer-events: none;\n' + '  cursor: default;\n' + '}\n' + '\n' + '[inert], [inert] * {\n' + '  -webkit-user-select: none;\n' + '  -moz-user-select: none;\n' + '  -ms-user-select: none;\n' + '  user-select: none;\n' + '}\n';
    node.appendChild(style);
  }

  if (!HTMLElement.prototype.hasOwnProperty('inert')) {
    /** @type {!InertManager} */
    var inertManager = new InertManager(document);

    Object.defineProperty(HTMLElement.prototype, 'inert', {
      enumerable: true,
      /** @this {!HTMLElement} */
      get: function get() {
        return this.hasAttribute('inert');
      },
      /** @this {!HTMLElement} */
      set: function set(inert) {
        inertManager.setInert(this, inert);
      }
    });
  }
})();

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$5 = {
    CLOSING: 'mdc-dialog--closing',
    OPEN: 'mdc-dialog--open',
    OPENING: 'mdc-dialog--opening',
    SCROLLABLE: 'mdc-dialog--scrollable',
    SCROLL_LOCK: 'mdc-dialog-scroll-lock',
    STACKED: 'mdc-dialog--stacked',
    FULLSCREEN: 'mdc-dialog--fullscreen',
    // Class for showing a scroll divider on full-screen dialog header element.
    // Should only be displayed on scrollable content, when the dialog content is
    // scrolled "underneath" the header.
    SCROLL_DIVIDER_HEADER: 'mdc-dialog-scroll-divider-header',
    // Class for showing a scroll divider on a full-screen dialog footer element.
    // Should only be displayed on scrolalble content, when the dialog content is
    // obscured "underneath" the footer.
    SCROLL_DIVIDER_FOOTER: 'mdc-dialog-scroll-divider-footer',
    // The "surface scrim" is a scrim covering only the surface of a dialog. This
    // is used in situations where a confirmation dialog is shown over an already
    // opened full-screen dialog. On larger screen-sizes, the full-screen dialog
    // is sized as a modal and so in these situations we display a "surface scrim"
    // to prevent a "double scrim" (where the scrim from the secondary
    // confirmation dialog would overlap with the scrim from the full-screen
    // dialog).
    SURFACE_SCRIM_SHOWN: 'mdc-dialog__surface-scrim--shown',
    // "Showing" animating class for the surface-scrim.
    SURFACE_SCRIM_SHOWING: 'mdc-dialog__surface-scrim--showing',
    // "Hiding" animating class for the surface-scrim.
    SURFACE_SCRIM_HIDING: 'mdc-dialog__surface-scrim--hiding',
    // Class to hide a dialog's scrim (used in conjunction with a surface-scrim).
    // Note that we only hide the original scrim rather than removing it entirely
    // to prevent interactions with the content behind this scrim, and to capture
    // scrim clicks.
    SCRIM_HIDDEN: 'mdc-dialog__scrim--hidden',
};
var strings$3 = {
    ACTION_ATTRIBUTE: 'data-mdc-dialog-action',
    BUTTON_DEFAULT_ATTRIBUTE: 'data-mdc-dialog-button-default',
    BUTTON_SELECTOR: '.mdc-dialog__button',
    CLOSED_EVENT: 'MDCDialog:closed',
    CLOSE_ACTION: 'close',
    CLOSING_EVENT: 'MDCDialog:closing',
    CONTAINER_SELECTOR: '.mdc-dialog__container',
    CONTENT_SELECTOR: '.mdc-dialog__content',
    DESTROY_ACTION: 'destroy',
    INITIAL_FOCUS_ATTRIBUTE: 'data-mdc-dialog-initial-focus',
    OPENED_EVENT: 'MDCDialog:opened',
    OPENING_EVENT: 'MDCDialog:opening',
    SCRIM_SELECTOR: '.mdc-dialog__scrim',
    SUPPRESS_DEFAULT_PRESS_SELECTOR: [
        'textarea',
        '.mdc-menu .mdc-list-item',
        '.mdc-menu .mdc-deprecated-list-item',
    ].join(', '),
    SURFACE_SELECTOR: '.mdc-dialog__surface',
};
var numbers$3 = {
    DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
    DIALOG_ANIMATION_OPEN_TIME_MS: 150,
};

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * AnimationFrame provides a user-friendly abstraction around requesting
 * and canceling animation frames.
 */
var AnimationFrame = /** @class */ (function () {
    function AnimationFrame() {
        this.rafIDs = new Map();
    }
    /**
     * Requests an animation frame. Cancels any existing frame with the same key.
     * @param {string} key The key for this callback.
     * @param {FrameRequestCallback} callback The callback to be executed.
     */
    AnimationFrame.prototype.request = function (key, callback) {
        var _this = this;
        this.cancel(key);
        var frameID = requestAnimationFrame(function (frame) {
            _this.rafIDs.delete(key);
            // Callback must come *after* the key is deleted so that nested calls to
            // request with the same key are not deleted.
            callback(frame);
        });
        this.rafIDs.set(key, frameID);
    };
    /**
     * Cancels a queued callback with the given key.
     * @param {string} key The key for this callback.
     */
    AnimationFrame.prototype.cancel = function (key) {
        var rafID = this.rafIDs.get(key);
        if (rafID) {
            cancelAnimationFrame(rafID);
            this.rafIDs.delete(key);
        }
    };
    /**
     * Cancels all queued callback.
     */
    AnimationFrame.prototype.cancelAll = function () {
        var _this = this;
        // Need to use forEach because it's the only iteration method supported
        // by IE11. Suppress the underscore because we don't need it.
        // tslint:disable-next-line:enforce-name-casing
        this.rafIDs.forEach(function (_, key) {
            _this.cancel(key);
        });
    };
    /**
     * Returns the queue of unexecuted callback keys.
     */
    AnimationFrame.prototype.getQueue = function () {
        var queue = [];
        // Need to use forEach because it's the only iteration method supported
        // by IE11. Suppress the underscore because we don't need it.
        // tslint:disable-next-line:enforce-name-casing
        this.rafIDs.forEach(function (_, key) {
            queue.push(key);
        });
        return queue;
    };
    return AnimationFrame;
}());

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var AnimationKeys;
(function (AnimationKeys) {
    AnimationKeys["POLL_SCROLL_POS"] = "poll_scroll_position";
    AnimationKeys["POLL_LAYOUT_CHANGE"] = "poll_layout_change";
})(AnimationKeys || (AnimationKeys = {}));
var MDCDialogFoundation = /** @class */ (function (_super) {
    __extends(MDCDialogFoundation, _super);
    function MDCDialogFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCDialogFoundation.defaultAdapter), adapter)) || this;
        _this.dialogOpen = false;
        _this.isFullscreen = false;
        _this.animationFrame = 0;
        _this.animationTimer = 0;
        _this.escapeKeyAction = strings$3.CLOSE_ACTION;
        _this.scrimClickAction = strings$3.CLOSE_ACTION;
        _this.autoStackButtons = true;
        _this.areButtonsStacked = false;
        _this.suppressDefaultPressSelector = strings$3.SUPPRESS_DEFAULT_PRESS_SELECTOR;
        _this.animFrame = new AnimationFrame();
        _this.contentScrollHandler = function () {
            _this.handleScrollEvent();
        };
        _this.windowResizeHandler = function () {
            _this.layout();
        };
        _this.windowOrientationChangeHandler = function () {
            _this.layout();
        };
        return _this;
    }
    Object.defineProperty(MDCDialogFoundation, "cssClasses", {
        get: function () {
            return cssClasses$5;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCDialogFoundation, "strings", {
        get: function () {
            return strings$3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCDialogFoundation, "numbers", {
        get: function () {
            return numbers$3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCDialogFoundation, "defaultAdapter", {
        get: function () {
            return {
                addBodyClass: function () { return undefined; },
                addClass: function () { return undefined; },
                areButtonsStacked: function () { return false; },
                clickDefaultButton: function () { return undefined; },
                eventTargetMatches: function () { return false; },
                getActionFromEvent: function () { return ''; },
                getInitialFocusEl: function () { return null; },
                hasClass: function () { return false; },
                isContentScrollable: function () { return false; },
                notifyClosed: function () { return undefined; },
                notifyClosing: function () { return undefined; },
                notifyOpened: function () { return undefined; },
                notifyOpening: function () { return undefined; },
                releaseFocus: function () { return undefined; },
                removeBodyClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                reverseButtons: function () { return undefined; },
                trapFocus: function () { return undefined; },
                registerContentEventHandler: function () { return undefined; },
                deregisterContentEventHandler: function () { return undefined; },
                isScrollableContentAtTop: function () { return false; },
                isScrollableContentAtBottom: function () { return false; },
                registerWindowEventHandler: function () { return undefined; },
                deregisterWindowEventHandler: function () { return undefined; },
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCDialogFoundation.prototype.init = function () {
        if (this.adapter.hasClass(cssClasses$5.STACKED)) {
            this.setAutoStackButtons(false);
        }
        this.isFullscreen = this.adapter.hasClass(cssClasses$5.FULLSCREEN);
    };
    MDCDialogFoundation.prototype.destroy = function () {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.handleAnimationTimerEnd();
        }
        if (this.isFullscreen) {
            this.adapter.deregisterContentEventHandler('scroll', this.contentScrollHandler);
        }
        this.animFrame.cancelAll();
        this.adapter.deregisterWindowEventHandler('resize', this.windowResizeHandler);
        this.adapter.deregisterWindowEventHandler('orientationchange', this.windowOrientationChangeHandler);
    };
    MDCDialogFoundation.prototype.open = function (dialogOptions) {
        var _this = this;
        this.dialogOpen = true;
        this.adapter.notifyOpening();
        this.adapter.addClass(cssClasses$5.OPENING);
        if (this.isFullscreen) {
            // A scroll event listener is registered even if the dialog is not
            // scrollable on open, since the window resize event, or orientation
            // change may make the dialog scrollable after it is opened.
            this.adapter.registerContentEventHandler('scroll', this.contentScrollHandler);
        }
        if (dialogOptions && dialogOptions.isAboveFullscreenDialog) {
            this.adapter.addClass(cssClasses$5.SCRIM_HIDDEN);
        }
        this.adapter.registerWindowEventHandler('resize', this.windowResizeHandler);
        this.adapter.registerWindowEventHandler('orientationchange', this.windowOrientationChangeHandler);
        // Wait a frame once display is no longer "none", to establish basis for
        // animation
        this.runNextAnimationFrame(function () {
            _this.adapter.addClass(cssClasses$5.OPEN);
            _this.adapter.addBodyClass(cssClasses$5.SCROLL_LOCK);
            _this.layout();
            _this.animationTimer = setTimeout(function () {
                _this.handleAnimationTimerEnd();
                _this.adapter.trapFocus(_this.adapter.getInitialFocusEl());
                _this.adapter.notifyOpened();
            }, numbers$3.DIALOG_ANIMATION_OPEN_TIME_MS);
        });
    };
    MDCDialogFoundation.prototype.close = function (action) {
        var _this = this;
        if (action === void 0) { action = ''; }
        if (!this.dialogOpen) {
            // Avoid redundant close calls (and events), e.g. from keydown on elements
            // that inherently emit click
            return;
        }
        this.dialogOpen = false;
        this.adapter.notifyClosing(action);
        this.adapter.addClass(cssClasses$5.CLOSING);
        this.adapter.removeClass(cssClasses$5.OPEN);
        this.adapter.removeBodyClass(cssClasses$5.SCROLL_LOCK);
        if (this.isFullscreen) {
            this.adapter.deregisterContentEventHandler('scroll', this.contentScrollHandler);
        }
        this.adapter.deregisterWindowEventHandler('resize', this.windowResizeHandler);
        this.adapter.deregisterWindowEventHandler('orientationchange', this.windowOrientationChangeHandler);
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = 0;
        clearTimeout(this.animationTimer);
        this.animationTimer = setTimeout(function () {
            _this.adapter.releaseFocus();
            _this.handleAnimationTimerEnd();
            _this.adapter.notifyClosed(action);
        }, numbers$3.DIALOG_ANIMATION_CLOSE_TIME_MS);
    };
    /**
     * Used only in instances of showing a secondary dialog over a full-screen
     * dialog. Shows the "surface scrim" displayed over the full-screen dialog.
     */
    MDCDialogFoundation.prototype.showSurfaceScrim = function () {
        var _this = this;
        this.adapter.addClass(cssClasses$5.SURFACE_SCRIM_SHOWING);
        this.runNextAnimationFrame(function () {
            _this.adapter.addClass(cssClasses$5.SURFACE_SCRIM_SHOWN);
        });
    };
    /**
     * Used only in instances of showing a secondary dialog over a full-screen
     * dialog. Hides the "surface scrim" displayed over the full-screen dialog.
     */
    MDCDialogFoundation.prototype.hideSurfaceScrim = function () {
        this.adapter.removeClass(cssClasses$5.SURFACE_SCRIM_SHOWN);
        this.adapter.addClass(cssClasses$5.SURFACE_SCRIM_HIDING);
    };
    /**
     * Handles `transitionend` event triggered when surface scrim animation is
     * finished.
     */
    MDCDialogFoundation.prototype.handleSurfaceScrimTransitionEnd = function () {
        this.adapter.removeClass(cssClasses$5.SURFACE_SCRIM_HIDING);
        this.adapter.removeClass(cssClasses$5.SURFACE_SCRIM_SHOWING);
    };
    MDCDialogFoundation.prototype.isOpen = function () {
        return this.dialogOpen;
    };
    MDCDialogFoundation.prototype.getEscapeKeyAction = function () {
        return this.escapeKeyAction;
    };
    MDCDialogFoundation.prototype.setEscapeKeyAction = function (action) {
        this.escapeKeyAction = action;
    };
    MDCDialogFoundation.prototype.getScrimClickAction = function () {
        return this.scrimClickAction;
    };
    MDCDialogFoundation.prototype.setScrimClickAction = function (action) {
        this.scrimClickAction = action;
    };
    MDCDialogFoundation.prototype.getAutoStackButtons = function () {
        return this.autoStackButtons;
    };
    MDCDialogFoundation.prototype.setAutoStackButtons = function (autoStack) {
        this.autoStackButtons = autoStack;
    };
    MDCDialogFoundation.prototype.getSuppressDefaultPressSelector = function () {
        return this.suppressDefaultPressSelector;
    };
    MDCDialogFoundation.prototype.setSuppressDefaultPressSelector = function (selector) {
        this.suppressDefaultPressSelector = selector;
    };
    MDCDialogFoundation.prototype.layout = function () {
        var _this = this;
        this.animFrame.request(AnimationKeys.POLL_LAYOUT_CHANGE, function () {
            _this.layoutInternal();
        });
    };
    /** Handles click on the dialog root element. */
    MDCDialogFoundation.prototype.handleClick = function (evt) {
        var isScrim = this.adapter.eventTargetMatches(evt.target, strings$3.SCRIM_SELECTOR);
        // Check for scrim click first since it doesn't require querying ancestors.
        if (isScrim && this.scrimClickAction !== '') {
            this.close(this.scrimClickAction);
        }
        else {
            var action = this.adapter.getActionFromEvent(evt);
            if (action) {
                this.close(action);
            }
        }
    };
    /** Handles keydown on the dialog root element. */
    MDCDialogFoundation.prototype.handleKeydown = function (evt) {
        var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
        if (!isEnter) {
            return;
        }
        var action = this.adapter.getActionFromEvent(evt);
        if (action) {
            // Action button callback is handled in `handleClick`,
            // since space/enter keydowns on buttons trigger click events.
            return;
        }
        // `composedPath` is used here, when available, to account for use cases
        // where a target meant to suppress the default press behaviour
        // may exist in a shadow root.
        // For example, a textarea inside a web component:
        // <mwc-dialog>
        //   <horizontal-layout>
        //     #shadow-root (open)
        //       <mwc-textarea>
        //         #shadow-root (open)
        //           <textarea></textarea>
        //       </mwc-textarea>
        //   </horizontal-layout>
        // </mwc-dialog>
        var target = evt.composedPath ? evt.composedPath()[0] : evt.target;
        var isDefault = this.suppressDefaultPressSelector ?
            !this.adapter.eventTargetMatches(target, this.suppressDefaultPressSelector) :
            true;
        if (isEnter && isDefault) {
            this.adapter.clickDefaultButton();
        }
    };
    /** Handles keydown on the document. */
    MDCDialogFoundation.prototype.handleDocumentKeydown = function (evt) {
        var isEscape = evt.key === 'Escape' || evt.keyCode === 27;
        if (isEscape && this.escapeKeyAction !== '') {
            this.close(this.escapeKeyAction);
        }
    };
    /**
     * Handles scroll event on the dialog's content element -- showing a scroll
     * divider on the header or footer based on the scroll position. This handler
     * should only be registered on full-screen dialogs with scrollable content.
     */
    MDCDialogFoundation.prototype.handleScrollEvent = function () {
        var _this = this;
        // Since scroll events can fire at a high rate, we throttle these events by
        // using requestAnimationFrame.
        this.animFrame.request(AnimationKeys.POLL_SCROLL_POS, function () {
            _this.toggleScrollDividerHeader();
            _this.toggleScrollDividerFooter();
        });
    };
    MDCDialogFoundation.prototype.layoutInternal = function () {
        if (this.autoStackButtons) {
            this.detectStackedButtons();
        }
        this.toggleScrollableClasses();
    };
    MDCDialogFoundation.prototype.handleAnimationTimerEnd = function () {
        this.animationTimer = 0;
        this.adapter.removeClass(cssClasses$5.OPENING);
        this.adapter.removeClass(cssClasses$5.CLOSING);
    };
    /**
     * Runs the given logic on the next animation frame, using setTimeout to
     * factor in Firefox reflow behavior.
     */
    MDCDialogFoundation.prototype.runNextAnimationFrame = function (callback) {
        var _this = this;
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame(function () {
            _this.animationFrame = 0;
            clearTimeout(_this.animationTimer);
            _this.animationTimer = setTimeout(callback, 0);
        });
    };
    MDCDialogFoundation.prototype.detectStackedButtons = function () {
        // Remove the class first to let us measure the buttons' natural positions.
        this.adapter.removeClass(cssClasses$5.STACKED);
        var areButtonsStacked = this.adapter.areButtonsStacked();
        if (areButtonsStacked) {
            this.adapter.addClass(cssClasses$5.STACKED);
        }
        if (areButtonsStacked !== this.areButtonsStacked) {
            this.adapter.reverseButtons();
            this.areButtonsStacked = areButtonsStacked;
        }
    };
    MDCDialogFoundation.prototype.toggleScrollableClasses = function () {
        // Remove the class first to let us measure the natural height of the
        // content.
        this.adapter.removeClass(cssClasses$5.SCROLLABLE);
        if (this.adapter.isContentScrollable()) {
            this.adapter.addClass(cssClasses$5.SCROLLABLE);
            if (this.isFullscreen) {
                // If dialog is full-screen and scrollable, check if a scroll divider
                // should be shown.
                this.toggleScrollDividerHeader();
                this.toggleScrollDividerFooter();
            }
        }
    };
    MDCDialogFoundation.prototype.toggleScrollDividerHeader = function () {
        if (!this.adapter.isScrollableContentAtTop()) {
            this.adapter.addClass(cssClasses$5.SCROLL_DIVIDER_HEADER);
        }
        else if (this.adapter.hasClass(cssClasses$5.SCROLL_DIVIDER_HEADER)) {
            this.adapter.removeClass(cssClasses$5.SCROLL_DIVIDER_HEADER);
        }
    };
    MDCDialogFoundation.prototype.toggleScrollDividerFooter = function () {
        if (!this.adapter.isScrollableContentAtBottom()) {
            this.adapter.addClass(cssClasses$5.SCROLL_DIVIDER_FOOTER);
        }
        else if (this.adapter.hasClass(cssClasses$5.SCROLL_DIVIDER_FOOTER)) {
            this.adapter.removeClass(cssClasses$5.SCROLL_DIVIDER_FOOTER);
        }
    };
    return MDCDialogFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */
function applyPassive(globalObj) {
    if (globalObj === void 0) { globalObj = window; }
    return supportsPassiveOption(globalObj) ?
        { passive: true } :
        false;
}
function supportsPassiveOption(globalObj) {
    if (globalObj === void 0) { globalObj = window; }
    // See
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    var passiveSupported = false;
    try {
        var options = {
            // This function will be called when the browser
            // attempts to access the passive property.
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        var handler = function () { };
        globalObj.document.addEventListener('test', handler, options);
        globalObj.document.removeEventListener('test', handler, options);
    }
    catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Specifies an observer callback that is run when the decorated property
 * changes. The observer receives the current and old value as arguments.
 */
const observer = (observer) => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(proto, propName) => {
    // if we haven't wrapped `updated` in this class, do so
    if (!proto.constructor
        ._observers) {
        proto.constructor._observers = new Map();
        const userUpdated = proto.updated;
        proto.updated = function (changedProperties) {
            userUpdated.call(this, changedProperties);
            changedProperties.forEach((v, k) => {
                const observers = this.constructor
                    ._observers;
                const observer = observers.get(k);
                if (observer !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    observer.call(this, this[k], v);
                }
            });
        };
        // clone any existing observers (superclasses)
        // eslint-disable-next-line no-prototype-builtins
    }
    else if (!proto.constructor.hasOwnProperty('_observers')) {
        const observers = proto.constructor._observers;
        proto.constructor._observers = new Map();
        observers.forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (v, k) => proto.constructor._observers.set(k, v));
    }
    // set this method
    proto.constructor._observers.set(propName, observer);
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const blockingElements = document.$blockingElements;
class DialogBase extends BaseElement {
    constructor() {
        super(...arguments);
        this.hideActions = false;
        this.stacked = false;
        this.heading = '';
        this.scrimClickAction = 'close';
        this.escapeKeyAction = 'close';
        this.open = false;
        this.defaultAction = 'close';
        this.actionAttribute = 'dialogAction';
        this.initialFocusAttribute = 'dialogInitialFocus';
        this.initialSupressDefaultPressSelector = '';
        this.mdcFoundationClass = MDCDialogFoundation;
        this.boundHandleClick = null;
        this.boundHandleKeydown = null;
        this.boundHandleDocumentKeydown = null;
    }
    set suppressDefaultPressSelector(selector) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setSuppressDefaultPressSelector(selector);
        }
        else {
            this.initialSupressDefaultPressSelector = selector;
        }
    }
    /**
     * @export
     */
    get suppressDefaultPressSelector() {
        return this.mdcFoundation ?
            this.mdcFoundation.getSuppressDefaultPressSelector() :
            this.initialSupressDefaultPressSelector;
    }
    get primaryButton() {
        let assignedNodes = this.primarySlot.assignedNodes();
        assignedNodes = assignedNodes.filter((node) => node instanceof HTMLElement);
        const button = assignedNodes[0];
        return button ? button : null;
    }
    emitNotification(name, action) {
        const init = { detail: action ? { action } : {} };
        const ev = new CustomEvent(name, init);
        this.dispatchEvent(ev);
    }
    getInitialFocusEl() {
        const initFocusSelector = `[${this.initialFocusAttribute}]`;
        // only search light DOM. This typically handles all the cases
        const lightDomQs = this.querySelector(initFocusSelector);
        if (lightDomQs) {
            return lightDomQs;
        }
        // if not in light dom, search each flattened distributed node.
        const primarySlot = this.primarySlot;
        const primaryNodes = primarySlot.assignedNodes({ flatten: true });
        const primaryFocusElement = this.searchNodeTreesForAttribute(primaryNodes, this.initialFocusAttribute);
        if (primaryFocusElement) {
            return primaryFocusElement;
        }
        const secondarySlot = this.secondarySlot;
        const secondaryNodes = secondarySlot.assignedNodes({ flatten: true });
        const secondaryFocusElement = this.searchNodeTreesForAttribute(secondaryNodes, this.initialFocusAttribute);
        if (secondaryFocusElement) {
            return secondaryFocusElement;
        }
        const contentSlot = this.contentSlot;
        const contentNodes = contentSlot.assignedNodes({ flatten: true });
        const initFocusElement = this.searchNodeTreesForAttribute(contentNodes, this.initialFocusAttribute);
        return initFocusElement;
    }
    searchNodeTreesForAttribute(nodes, attribute) {
        for (const node of nodes) {
            if (!(node instanceof HTMLElement)) {
                continue;
            }
            if (node.hasAttribute(attribute)) {
                return node;
            }
            else {
                const selection = node.querySelector(`[${attribute}]`);
                if (selection) {
                    return selection;
                }
            }
        }
        return null;
    }
    createAdapter() {
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { addBodyClass: () => document.body.style.overflow = 'hidden', removeBodyClass: () => document.body.style.overflow = '', areButtonsStacked: () => this.stacked, clickDefaultButton: () => {
                const primary = this.primaryButton;
                if (primary) {
                    primary.click();
                }
            }, eventTargetMatches: (target, selector) => target ? matches(target, selector) : false, getActionFromEvent: (e) => {
                if (!e.target) {
                    return '';
                }
                const element = closest(e.target, `[${this.actionAttribute}]`);
                const action = element && element.getAttribute(this.actionAttribute);
                return action;
            }, getInitialFocusEl: () => {
                return this.getInitialFocusEl();
            }, isContentScrollable: () => {
                const el = this.contentElement;
                return el ? el.scrollHeight > el.offsetHeight : false;
            }, notifyClosed: (action) => this.emitNotification('closed', action), notifyClosing: (action) => {
                if (!this.closingDueToDisconnect) {
                    // Don't set our open state to closed just because we were
                    // disconnected. That way if we get reconnected, we'll know to
                    // re-open.
                    this.open = false;
                }
                this.emitNotification('closing', action);
            }, notifyOpened: () => this.emitNotification('opened'), notifyOpening: () => {
                this.open = true;
                this.emitNotification('opening');
            }, reverseButtons: () => { }, releaseFocus: () => {
                blockingElements.remove(this);
            }, trapFocus: (el) => {
                if (!this.isConnected) {
                    // this is the case where it is opened and closed and then removed
                    // from DOM before the animation has completed. Blocking Elements will
                    // throw if this is the case
                    return;
                }
                blockingElements.push(this);
                if (el) {
                    el.focus();
                }
            }, registerContentEventHandler: (evtType, handler) => {
                const el = this.contentElement;
                el.addEventListener(evtType, handler);
            }, deregisterContentEventHandler: (evtType, handler) => {
                const el = this.contentElement;
                el.removeEventListener(evtType, handler);
            }, isScrollableContentAtTop: () => {
                const el = this.contentElement;
                return el ? el.scrollTop === 0 : false;
            }, isScrollableContentAtBottom: () => {
                const el = this.contentElement;
                return el ?
                    Math.ceil(el.scrollHeight - el.scrollTop) === el.clientHeight :
                    false;
            }, registerWindowEventHandler: (evtType, handler) => {
                window.addEventListener(evtType, handler, applyPassive());
            }, deregisterWindowEventHandler: (evtType, handler) => {
                window.removeEventListener(evtType, handler, applyPassive());
            } });
    }
    render() {
        const classes = {
            [cssClasses$5.STACKED]: this.stacked,
        };
        let heading = x ``;
        if (this.heading) {
            heading = this.renderHeading();
        }
        const actionsClasses = {
            'mdc-dialog__actions': !this.hideActions,
        };
        return x `
    <div class="mdc-dialog ${o$3(classes)}"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="title"
        aria-describedby="content">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          ${heading}
          <div id="content" class="mdc-dialog__content">
            <slot id="contentSlot"></slot>
          </div>
          <footer
              id="actions"
              class="${o$3(actionsClasses)}">
            <span>
              <slot name="secondaryAction"></slot>
            </span>
            <span>
             <slot name="primaryAction"></slot>
            </span>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>`;
    }
    renderHeading() {
        return x `
      <h2 id="title" class="mdc-dialog__title">${this.heading}</h2>`;
    }
    firstUpdated() {
        super.firstUpdated();
        this.mdcFoundation.setAutoStackButtons(true);
        if (this.initialSupressDefaultPressSelector) {
            this.suppressDefaultPressSelector =
                this.initialSupressDefaultPressSelector;
        }
        else {
            this.suppressDefaultPressSelector = [
                this.suppressDefaultPressSelector, 'mwc-textarea',
                'mwc-menu mwc-list-item', 'mwc-select mwc-list-item'
            ].join(', ');
        }
        this.boundHandleClick = this.mdcFoundation.handleClick.bind(this.mdcFoundation);
        this.boundHandleKeydown = this.mdcFoundation.handleKeydown.bind(this.mdcFoundation);
        this.boundHandleDocumentKeydown =
            this.mdcFoundation.handleDocumentKeydown.bind(this.mdcFoundation);
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.open && this.mdcFoundation && !this.mdcFoundation.isOpen()) {
            // We probably got disconnected while we were still open. Re-open,
            // matching the behavior of native <dialog>.
            this.setEventListeners();
            this.mdcFoundation.open();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.open && this.mdcFoundation) {
            // If this dialog is opened and then disconnected, we want to close
            // the foundation, so that 1) any pending timers are cancelled
            // (in particular for trapFocus), and 2) if we reconnect, we can open
            // the foundation again to retrigger animations and focus.
            this.removeEventListeners();
            this.closingDueToDisconnect = true;
            this.mdcFoundation.close(this.currentAction || this.defaultAction);
            this.closingDueToDisconnect = false;
            this.currentAction = undefined;
            // When we close normally, the releaseFocus callback handles removing
            // ourselves from the blocking elements stack. However, that callback
            // happens on a delay, and when we are closing due to a disconnect we
            // need to remove ourselves before the blocking element polyfill's
            // mutation observer notices and logs a warning, since it's not valid to
            // be in the blocking elements stack while disconnected.
            blockingElements.remove(this);
        }
    }
    forceLayout() {
        this.mdcFoundation.layout();
    }
    focus() {
        const initialFocusEl = this.getInitialFocusEl();
        initialFocusEl && initialFocusEl.focus();
    }
    blur() {
        if (!this.shadowRoot) {
            return;
        }
        const activeEl = this.shadowRoot.activeElement;
        if (activeEl) {
            if (activeEl instanceof HTMLElement) {
                activeEl.blur();
            }
        }
        else {
            const root = this.getRootNode();
            const activeEl = root instanceof Document ? root.activeElement : null;
            if (activeEl instanceof HTMLElement) {
                activeEl.blur();
            }
        }
    }
    setEventListeners() {
        if (this.boundHandleClick) {
            this.mdcRoot.addEventListener('click', this.boundHandleClick);
        }
        if (this.boundHandleKeydown) {
            this.mdcRoot.addEventListener('keydown', this.boundHandleKeydown, applyPassive());
        }
        if (this.boundHandleDocumentKeydown) {
            document.addEventListener('keydown', this.boundHandleDocumentKeydown, applyPassive());
        }
    }
    removeEventListeners() {
        if (this.boundHandleClick) {
            this.mdcRoot.removeEventListener('click', this.boundHandleClick);
        }
        if (this.boundHandleKeydown) {
            this.mdcRoot.removeEventListener('keydown', this.boundHandleKeydown);
        }
        if (this.boundHandleDocumentKeydown) {
            document.removeEventListener('keydown', this.boundHandleDocumentKeydown);
        }
    }
    close() {
        this.open = false;
    }
    show() {
        this.open = true;
    }
}
__decorate([
    i$2('.mdc-dialog')
], DialogBase.prototype, "mdcRoot", void 0);
__decorate([
    i$2('slot[name="primaryAction"]')
], DialogBase.prototype, "primarySlot", void 0);
__decorate([
    i$2('slot[name="secondaryAction"]')
], DialogBase.prototype, "secondarySlot", void 0);
__decorate([
    i$2('#contentSlot')
], DialogBase.prototype, "contentSlot", void 0);
__decorate([
    i$2('.mdc-dialog__content')
], DialogBase.prototype, "contentElement", void 0);
__decorate([
    i$2('.mdc-container')
], DialogBase.prototype, "conatinerElement", void 0);
__decorate([
    n$4({ type: Boolean })
], DialogBase.prototype, "hideActions", void 0);
__decorate([
    n$4({ type: Boolean }),
    observer(function () {
        this.forceLayout();
    })
], DialogBase.prototype, "stacked", void 0);
__decorate([
    n$4({ type: String })
], DialogBase.prototype, "heading", void 0);
__decorate([
    n$4({ type: String }),
    observer(function (newAction) {
        this.mdcFoundation.setScrimClickAction(newAction);
    })
], DialogBase.prototype, "scrimClickAction", void 0);
__decorate([
    n$4({ type: String }),
    observer(function (newAction) {
        this.mdcFoundation.setEscapeKeyAction(newAction);
    })
], DialogBase.prototype, "escapeKeyAction", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true }),
    observer(function (isOpen) {
        // Check isConnected because we could have been disconnected before first
        // update. If we're now closed, then we shouldn't start the MDC foundation
        // opening animation. If we're now closed, then we've already closed the
        // foundation in disconnectedCallback.
        if (this.mdcFoundation && this.isConnected) {
            if (isOpen) {
                this.setEventListeners();
                this.mdcFoundation.open();
            }
            else {
                this.removeEventListeners();
                this.mdcFoundation.close(this.currentAction || this.defaultAction);
                this.currentAction = undefined;
            }
        }
    })
], DialogBase.prototype, "open", void 0);
__decorate([
    n$4()
], DialogBase.prototype, "defaultAction", void 0);
__decorate([
    n$4()
], DialogBase.prototype, "actionAttribute", void 0);
__decorate([
    n$4()
], DialogBase.prototype, "initialFocusAttribute", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$4 = i$6 `.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__surface-scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog .mdc-dialog__close{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-dialog .mdc-dialog__close .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close .mdc-icon-button__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-dialog .mdc-dialog__close:hover .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close.mdc-ripple-surface--hover .mdc-icon-button__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded--background-focused .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):focus .mdc-icon-button__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded) .mdc-icon-button__ripple::after{transition:opacity 150ms linear}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):active .mdc-icon-button__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions,.mdc-dialog.mdc-dialog--scrollable.mdc-dialog-scroll-divider-footer .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:1px solid rgba(0,0,0,.12);margin-bottom:0}.mdc-dialog.mdc-dialog-scroll-divider-header.mdc-dialog--fullscreen .mdc-dialog__header{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-dialog__surface{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12)}.mdc-dialog__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit)}.mdc-dialog__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit)}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(max-width: 600px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid transparent;border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-dialog__surface::before{border-color:CanvasText}}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid transparent;display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}@media screen and (forced-colors: active){.mdc-dialog--fullscreen .mdc-dialog__header{border-bottom-color:CanvasText}}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid transparent}@media screen and (forced-colors: active){.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}@media screen and (forced-colors: active){.mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1;z-index:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-dialog--no-content-padding .mdc-dialog__content{padding:0}.mdc-dialog--sheet .mdc-dialog__close{right:12px;top:9px;position:absolute;z-index:1}#actions:not(.mdc-dialog__actions){display:none}.mdc-dialog__surface{box-shadow:var(--mdc-dialog-box-shadow, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}@media(min-width: 560px){.mdc-dialog .mdc-dialog__surface{max-width:560px;max-width:var(--mdc-dialog-max-width, 560px)}}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0, 0, 0, 0.32);background-color:var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32))}.mdc-dialog .mdc-dialog__title{color:rgba(0, 0, 0, 0.87);color:var(--mdc-dialog-heading-ink-color, rgba(0, 0, 0, 0.87))}.mdc-dialog .mdc-dialog__content{color:rgba(0, 0, 0, 0.6);color:var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6))}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12))}.mdc-dialog .mdc-dialog__surface{min-width:280px;min-width:var(--mdc-dialog-min-width, 280px)}.mdc-dialog .mdc-dialog__surface{max-height:var(--mdc-dialog-max-height, calc(100% - 32px))}#actions ::slotted(*){margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*[dir=rtl]){margin-left:0;margin-right:8px}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*[dir=rtl]){text-align:left}.mdc-dialog--stacked #actions{flex-direction:column-reverse}.mdc-dialog--stacked #actions *:not(:last-child) ::slotted(*){flex-basis:.000000001px;margin-top:12px}`;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let Dialog = class Dialog extends DialogBase {
};
Dialog.styles = [styles$4];
Dialog = __decorate([
    e$7('mwc-dialog')
], Dialog);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fires request-selected {RequestSelectedDetail}
 * @fires list-item-rendered
 */
class ListItemBase extends s$2 {
    constructor() {
        super(...arguments);
        this.value = '';
        this.group = null;
        this.tabindex = -1;
        this.disabled = false;
        this.twoline = false;
        this.activated = false;
        this.graphic = null;
        this.multipleGraphics = false;
        this.hasMeta = false;
        this.noninteractive = false;
        this.selected = false;
        this.shouldRenderRipple = false;
        this._managingList = null;
        this.boundOnClick = this.onClick.bind(this);
        this._firstChanged = true;
        this._skipPropRequest = false;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            return this.ripple;
        });
        this.listeners = [
            {
                target: this,
                eventNames: ['click'],
                cb: () => {
                    this.onClick();
                },
            },
            {
                target: this,
                eventNames: ['mouseenter'],
                cb: this.rippleHandlers.startHover,
            },
            {
                target: this,
                eventNames: ['mouseleave'],
                cb: this.rippleHandlers.endHover,
            },
            {
                target: this,
                eventNames: ['focus'],
                cb: this.rippleHandlers.startFocus,
            },
            {
                target: this,
                eventNames: ['blur'],
                cb: this.rippleHandlers.endFocus,
            },
            {
                target: this,
                eventNames: ['mousedown', 'touchstart'],
                cb: (e) => {
                    const name = e.type;
                    this.onDown(name === 'mousedown' ? 'mouseup' : 'touchend', e);
                },
            },
        ];
    }
    get text() {
        const textContent = this.textContent;
        return textContent ? textContent.trim() : '';
    }
    render() {
        const text = this.renderText();
        const graphic = this.graphic ? this.renderGraphic() : x ``;
        const meta = this.hasMeta ? this.renderMeta() : x ``;
        return x `
      ${this.renderRipple()}
      ${graphic}
      ${text}
      ${meta}`;
    }
    renderRipple() {
        if (this.shouldRenderRipple) {
            return x `
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>`;
        }
        else if (this.activated) {
            return x `<div class="fake-activated-ripple"></div>`;
        }
        else {
            return '';
        }
    }
    renderGraphic() {
        const graphicClasses = {
            multi: this.multipleGraphics,
        };
        return x `
      <span class="mdc-deprecated-list-item__graphic material-icons ${o$3(graphicClasses)}">
        <slot name="graphic"></slot>
      </span>`;
    }
    renderMeta() {
        return x `
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`;
    }
    renderText() {
        const inner = this.twoline ? this.renderTwoline() : this.renderSingleLine();
        return x `
      <span class="mdc-deprecated-list-item__text">
        ${inner}
      </span>`;
    }
    renderSingleLine() {
        return x `<slot></slot>`;
    }
    renderTwoline() {
        return x `
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `;
    }
    onClick() {
        this.fireRequestSelected(!this.selected, 'interaction');
    }
    onDown(upName, evt) {
        const onUp = () => {
            window.removeEventListener(upName, onUp);
            this.rippleHandlers.endPress();
        };
        window.addEventListener(upName, onUp);
        this.rippleHandlers.startPress(evt);
    }
    fireRequestSelected(selected, source) {
        if (this.noninteractive) {
            return;
        }
        const customEv = new CustomEvent('request-selected', { bubbles: true, composed: true, detail: { source, selected } });
        this.dispatchEvent(customEv);
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.noninteractive) {
            this.setAttribute('mwc-list-item', '');
        }
        for (const listener of this.listeners) {
            for (const eventName of listener.eventNames) {
                listener.target.addEventListener(eventName, listener.cb, { passive: true });
            }
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        for (const listener of this.listeners) {
            for (const eventName of listener.eventNames) {
                listener.target.removeEventListener(eventName, listener.cb);
            }
        }
        if (this._managingList) {
            this._managingList.debouncedLayout ?
                this._managingList.debouncedLayout(true) :
                this._managingList.layout(true);
        }
    }
    // composed flag, event fire through shadow root and up through composed tree
    firstUpdated() {
        const ev = new Event('list-item-rendered', { bubbles: true, composed: true });
        this.dispatchEvent(ev);
    }
}
__decorate([
    i$2('slot')
], ListItemBase.prototype, "slotElement", void 0);
__decorate([
    e$4('mwc-ripple')
], ListItemBase.prototype, "ripple", void 0);
__decorate([
    n$4({ type: String })
], ListItemBase.prototype, "value", void 0);
__decorate([
    n$4({ type: String, reflect: true })
], ListItemBase.prototype, "group", void 0);
__decorate([
    n$4({ type: Number, reflect: true })
], ListItemBase.prototype, "tabindex", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true }),
    observer(function (value) {
        if (value) {
            this.setAttribute('aria-disabled', 'true');
        }
        else {
            this.setAttribute('aria-disabled', 'false');
        }
    })
], ListItemBase.prototype, "disabled", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], ListItemBase.prototype, "twoline", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], ListItemBase.prototype, "activated", void 0);
__decorate([
    n$4({ type: String, reflect: true })
], ListItemBase.prototype, "graphic", void 0);
__decorate([
    n$4({ type: Boolean })
], ListItemBase.prototype, "multipleGraphics", void 0);
__decorate([
    n$4({ type: Boolean })
], ListItemBase.prototype, "hasMeta", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true }),
    observer(function (value) {
        if (value) {
            this.removeAttribute('aria-checked');
            this.removeAttribute('mwc-list-item');
            this.selected = false;
            this.activated = false;
            this.tabIndex = -1;
        }
        else {
            this.setAttribute('mwc-list-item', '');
        }
    })
], ListItemBase.prototype, "noninteractive", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true }),
    observer(function (value) {
        const role = this.getAttribute('role');
        const isAriaSelectable = role === 'gridcell' || role === 'option' ||
            role === 'row' || role === 'tab';
        if (isAriaSelectable && value) {
            this.setAttribute('aria-selected', 'true');
        }
        else if (isAriaSelectable) {
            this.setAttribute('aria-selected', 'false');
        }
        if (this._firstChanged) {
            this._firstChanged = false;
            return;
        }
        if (this._skipPropRequest) {
            return;
        }
        this.fireRequestSelected(value, 'property');
    })
], ListItemBase.prototype, "selected", void 0);
__decorate([
    t$1()
], ListItemBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    t$1()
], ListItemBase.prototype, "_managingList", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$3 = i$6 `:host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}`;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let ListItem = class ListItem extends ListItemBase {
};
ListItem.styles = [styles$3];
ListItem = __decorate([
    e$7('mwc-list-item')
], ListItem);

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * KEY provides normalized string values for keys.
 */
var KEY = {
    UNKNOWN: 'Unknown',
    BACKSPACE: 'Backspace',
    ENTER: 'Enter',
    SPACEBAR: 'Spacebar',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
    END: 'End',
    HOME: 'Home',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    DELETE: 'Delete',
    ESCAPE: 'Escape',
    TAB: 'Tab',
};
var normalizedKeys = new Set();
// IE11 has no support for new Map with iterable so we need to initialize this
// by hand.
normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
normalizedKeys.add(KEY.TAB);
var KEY_CODE = {
    BACKSPACE: 8,
    ENTER: 13,
    SPACEBAR: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    DELETE: 46,
    ESCAPE: 27,
    TAB: 9,
};
var mappedKeyCodes = new Map();
// IE11 has no support for new Map with iterable so we need to initialize this
// by hand.
mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
var navigationKeys = new Set();
// IE11 has no support for new Set with iterable so we need to initialize this
// by hand.
navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
/**
 * normalizeKey returns the normalized string for a navigational action.
 */
function normalizeKey(evt) {
    var key = evt.key;
    // If the event already has a normalized key, return it
    if (normalizedKeys.has(key)) {
        return key;
    }
    // tslint:disable-next-line:deprecation
    var mappedKey = mappedKeyCodes.get(evt.keyCode);
    if (mappedKey) {
        return mappedKey;
    }
    return KEY.UNKNOWN;
}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var _a$1, _b$1;
var cssClasses$4 = {
    LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
    LIST_ITEM_CLASS: 'mdc-list-item',
    LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
    LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
    LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
    LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
    ROOT: 'mdc-list',
};
(_a$1 = {},
    _a$1["" + cssClasses$4.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-list-item--activated',
    _a$1["" + cssClasses$4.LIST_ITEM_CLASS] = 'mdc-list-item',
    _a$1["" + cssClasses$4.LIST_ITEM_DISABLED_CLASS] = 'mdc-list-item--disabled',
    _a$1["" + cssClasses$4.LIST_ITEM_SELECTED_CLASS] = 'mdc-list-item--selected',
    _a$1["" + cssClasses$4.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-list-item__primary-text',
    _a$1["" + cssClasses$4.ROOT] = 'mdc-list',
    _a$1);
var deprecatedClassNameMap = (_b$1 = {},
    _b$1["" + cssClasses$4.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-deprecated-list-item--activated',
    _b$1["" + cssClasses$4.LIST_ITEM_CLASS] = 'mdc-deprecated-list-item',
    _b$1["" + cssClasses$4.LIST_ITEM_DISABLED_CLASS] = 'mdc-deprecated-list-item--disabled',
    _b$1["" + cssClasses$4.LIST_ITEM_SELECTED_CLASS] = 'mdc-deprecated-list-item--selected',
    _b$1["" + cssClasses$4.LIST_ITEM_TEXT_CLASS] = 'mdc-deprecated-list-item__text',
    _b$1["" + cssClasses$4.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-deprecated-list-item__primary-text',
    _b$1["" + cssClasses$4.ROOT] = 'mdc-deprecated-list',
    _b$1);
var strings$2 = {
    ACTION_EVENT: 'MDCList:action',
    SELECTION_CHANGE_EVENT: 'MDCList:selectionChange',
    ARIA_CHECKED: 'aria-checked',
    ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
    ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
    ARIA_CURRENT: 'aria-current',
    ARIA_DISABLED: 'aria-disabled',
    ARIA_ORIENTATION: 'aria-orientation',
    ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
    ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
    ARIA_SELECTED: 'aria-selected',
    ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
    ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
    CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
    CHECKBOX_SELECTOR: 'input[type="checkbox"]',
    CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses$4.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " a\n  ",
    DEPRECATED_SELECTOR: '.mdc-deprecated-list',
    FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses$4.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " a,\n    ." + cssClasses$4.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " input[type=\"radio\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$4.LIST_ITEM_CLASS] + " input[type=\"checkbox\"]:not(:disabled)\n  ",
    RADIO_SELECTOR: 'input[type="radio"]',
    SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
};
var numbers$2 = {
    UNSET_INDEX: -1,
    TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore
const integerSort = (a, b) => {
    return a - b;
};
const findIndexDiff = (oldSet, newSet) => {
    const oldArr = Array.from(oldSet);
    const newArr = Array.from(newSet);
    const diff = { added: [], removed: [] };
    const oldSorted = oldArr.sort(integerSort);
    const newSorted = newArr.sort(integerSort);
    let i = 0;
    let j = 0;
    while (i < oldSorted.length || j < newSorted.length) {
        const oldVal = oldSorted[i];
        const newVal = newSorted[j];
        if (oldVal === newVal) {
            i++;
            j++;
            continue;
        }
        if (oldVal !== undefined && (newVal === undefined || oldVal < newVal)) {
            diff.removed.push(oldVal);
            i++;
            continue;
        }
        if (newVal !== undefined && (oldVal === undefined || newVal < oldVal)) {
            diff.added.push(newVal);
            j++;
            continue;
        }
    }
    return diff;
};
const ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
function isIndexSet(selectedIndex) {
    return selectedIndex instanceof Set;
}
const createSetFromIndex = (index) => {
    const entry = index === numbers$2.UNSET_INDEX ? new Set() : index;
    return isIndexSet(entry) ? new Set(entry) : new Set([entry]);
};
class MDCListFoundation extends MDCFoundation {
    constructor(adapter) {
        super(Object.assign(Object.assign({}, MDCListFoundation.defaultAdapter), adapter));
        this.isMulti_ = false;
        this.wrapFocus_ = false;
        this.isVertical_ = true;
        this.selectedIndex_ = numbers$2.UNSET_INDEX;
        this.focusedItemIndex_ = numbers$2.UNSET_INDEX;
        this.useActivatedClass_ = false;
        this.ariaCurrentAttrValue_ = null;
    }
    static get strings() {
        return strings$2;
    }
    static get numbers() {
        return numbers$2;
    }
    static get defaultAdapter() {
        return {
            focusItemAtIndex: () => undefined,
            getFocusedElementIndex: () => 0,
            getListItemCount: () => 0,
            isFocusInsideList: () => false,
            isRootFocused: () => false,
            notifyAction: () => undefined,
            notifySelected: () => undefined,
            getSelectedStateForElementIndex: () => false,
            setDisabledStateForElementIndex: () => undefined,
            getDisabledStateForElementIndex: () => false,
            setSelectedStateForElementIndex: () => undefined,
            setActivatedStateForElementIndex: () => undefined,
            setTabIndexForElementIndex: () => undefined,
            setAttributeForElementIndex: () => undefined,
            getAttributeForElementIndex: () => null,
        };
    }
    /**
     * Sets the private wrapFocus_ variable.
     */
    setWrapFocus(value) {
        this.wrapFocus_ = value;
    }
    /**
     * Sets the private wrapFocus_ variable.
     */
    setMulti(value) {
        this.isMulti_ = value;
        const currentIndex = this.selectedIndex_;
        if (value) {
            // number to set
            if (!isIndexSet(currentIndex)) {
                const isUnset = currentIndex === numbers$2.UNSET_INDEX;
                this.selectedIndex_ = isUnset ? new Set() : new Set([currentIndex]);
            }
        }
        else {
            // set to first sorted number in set
            if (isIndexSet(currentIndex)) {
                if (currentIndex.size) {
                    const vals = Array.from(currentIndex).sort(integerSort);
                    this.selectedIndex_ = vals[0];
                }
                else {
                    this.selectedIndex_ = numbers$2.UNSET_INDEX;
                }
            }
        }
    }
    /**
     * Sets the isVertical_ private variable.
     */
    setVerticalOrientation(value) {
        this.isVertical_ = value;
    }
    /**
     * Sets the useActivatedClass_ private variable.
     */
    setUseActivatedClass(useActivated) {
        this.useActivatedClass_ = useActivated;
    }
    getSelectedIndex() {
        return this.selectedIndex_;
    }
    setSelectedIndex(index) {
        if (!this.isIndexValid_(index)) {
            return;
        }
        if (this.isMulti_) {
            this.setMultiSelectionAtIndex_(createSetFromIndex(index));
        }
        else {
            this.setSingleSelectionAtIndex_(index);
        }
    }
    /**
     * Focus in handler for the list items.
     */
    handleFocusIn(_, listItemIndex) {
        if (listItemIndex >= 0) {
            this.adapter.setTabIndexForElementIndex(listItemIndex, 0);
        }
    }
    /**
     * Focus out handler for the list items.
     */
    handleFocusOut(_, listItemIndex) {
        if (listItemIndex >= 0) {
            this.adapter.setTabIndexForElementIndex(listItemIndex, -1);
        }
        /**
         * Between Focusout & Focusin some browsers do not have focus on any
         * element. Setting a delay to wait till the focus is moved to next element.
         */
        setTimeout(() => {
            if (!this.adapter.isFocusInsideList()) {
                this.setTabindexToFirstSelectedItem_();
            }
        }, 0);
    }
    /**
     * Key handler for the list.
     */
    handleKeydown(event, isRootListItem, listItemIndex) {
        const isArrowLeft = normalizeKey(event) === 'ArrowLeft';
        const isArrowUp = normalizeKey(event) === 'ArrowUp';
        const isArrowRight = normalizeKey(event) === 'ArrowRight';
        const isArrowDown = normalizeKey(event) === 'ArrowDown';
        const isHome = normalizeKey(event) === 'Home';
        const isEnd = normalizeKey(event) === 'End';
        const isEnter = normalizeKey(event) === 'Enter';
        const isSpace = normalizeKey(event) === 'Spacebar';
        if (this.adapter.isRootFocused()) {
            if (isArrowUp || isEnd) {
                event.preventDefault();
                this.focusLastElement();
            }
            else if (isArrowDown || isHome) {
                event.preventDefault();
                this.focusFirstElement();
            }
            return;
        }
        let currentIndex = this.adapter.getFocusedElementIndex();
        if (currentIndex === -1) {
            currentIndex = listItemIndex;
            if (currentIndex < 0) {
                // If this event doesn't have a mdc-deprecated-list-item ancestor from
                // the current list (not from a sublist), return early.
                return;
            }
        }
        let nextIndex;
        if ((this.isVertical_ && isArrowDown) ||
            (!this.isVertical_ && isArrowRight)) {
            this.preventDefaultEvent(event);
            nextIndex = this.focusNextElement(currentIndex);
        }
        else if ((this.isVertical_ && isArrowUp) || (!this.isVertical_ && isArrowLeft)) {
            this.preventDefaultEvent(event);
            nextIndex = this.focusPrevElement(currentIndex);
        }
        else if (isHome) {
            this.preventDefaultEvent(event);
            nextIndex = this.focusFirstElement();
        }
        else if (isEnd) {
            this.preventDefaultEvent(event);
            nextIndex = this.focusLastElement();
        }
        else if (isEnter || isSpace) {
            if (isRootListItem) {
                // Return early if enter key is pressed on anchor element which triggers
                // synthetic MouseEvent event.
                const target = event.target;
                if (target && target.tagName === 'A' && isEnter) {
                    return;
                }
                this.preventDefaultEvent(event);
                this.setSelectedIndexOnAction_(currentIndex, true);
            }
        }
        this.focusedItemIndex_ = currentIndex;
        if (nextIndex !== undefined) {
            this.setTabindexAtIndex_(nextIndex);
            this.focusedItemIndex_ = nextIndex;
        }
    }
    /**
     * Click handler for the list.
     */
    handleSingleSelection(index, isInteraction, force) {
        if (index === numbers$2.UNSET_INDEX) {
            return;
        }
        this.setSelectedIndexOnAction_(index, isInteraction, force);
        this.setTabindexAtIndex_(index);
        this.focusedItemIndex_ = index;
    }
    /**
     * Focuses the next element on the list.
     */
    focusNextElement(index) {
        const count = this.adapter.getListItemCount();
        let nextIndex = index + 1;
        if (nextIndex >= count) {
            if (this.wrapFocus_) {
                nextIndex = 0;
            }
            else {
                // Return early because last item is already focused.
                return index;
            }
        }
        this.adapter.focusItemAtIndex(nextIndex);
        return nextIndex;
    }
    /**
     * Focuses the previous element on the list.
     */
    focusPrevElement(index) {
        let prevIndex = index - 1;
        if (prevIndex < 0) {
            if (this.wrapFocus_) {
                prevIndex = this.adapter.getListItemCount() - 1;
            }
            else {
                // Return early because first item is already focused.
                return index;
            }
        }
        this.adapter.focusItemAtIndex(prevIndex);
        return prevIndex;
    }
    focusFirstElement() {
        this.adapter.focusItemAtIndex(0);
        return 0;
    }
    focusLastElement() {
        const lastIndex = this.adapter.getListItemCount() - 1;
        this.adapter.focusItemAtIndex(lastIndex);
        return lastIndex;
    }
    /**
     * @param itemIndex Index of the list item
     * @param isEnabled Sets the list item to enabled or disabled.
     */
    setEnabled(itemIndex, isEnabled) {
        if (!this.isIndexValid_(itemIndex)) {
            return;
        }
        this.adapter.setDisabledStateForElementIndex(itemIndex, !isEnabled);
    }
    /**
     * Ensures that preventDefault is only called if the containing element
     * doesn't consume the event, and it will cause an unintended scroll.
     */
    preventDefaultEvent(evt) {
        const target = evt.target;
        const tagName = `${target.tagName}`.toLowerCase();
        if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
            evt.preventDefault();
        }
    }
    setSingleSelectionAtIndex_(index, isInteraction = true) {
        if (this.selectedIndex_ === index) {
            return;
        }
        // unset previous
        if (this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
            this.adapter.setSelectedStateForElementIndex(this.selectedIndex_, false);
            if (this.useActivatedClass_) {
                this.adapter.setActivatedStateForElementIndex(this.selectedIndex_, false);
            }
        }
        // set new
        if (isInteraction) {
            this.adapter.setSelectedStateForElementIndex(index, true);
        }
        if (this.useActivatedClass_) {
            this.adapter.setActivatedStateForElementIndex(index, true);
        }
        this.setAriaForSingleSelectionAtIndex_(index);
        this.selectedIndex_ = index;
        this.adapter.notifySelected(index);
    }
    setMultiSelectionAtIndex_(newIndex, isInteraction = true) {
        const oldIndex = createSetFromIndex(this.selectedIndex_);
        const diff = findIndexDiff(oldIndex, newIndex);
        if (!diff.removed.length && !diff.added.length) {
            return;
        }
        for (const removed of diff.removed) {
            if (isInteraction) {
                this.adapter.setSelectedStateForElementIndex(removed, false);
            }
            if (this.useActivatedClass_) {
                this.adapter.setActivatedStateForElementIndex(removed, false);
            }
        }
        for (const added of diff.added) {
            if (isInteraction) {
                this.adapter.setSelectedStateForElementIndex(added, true);
            }
            if (this.useActivatedClass_) {
                this.adapter.setActivatedStateForElementIndex(added, true);
            }
        }
        this.selectedIndex_ = newIndex;
        this.adapter.notifySelected(newIndex, diff);
    }
    /**
     * Sets aria attribute for single selection at given index.
     */
    setAriaForSingleSelectionAtIndex_(index) {
        // Detect the presence of aria-current and get the value only during list
        // initialization when it is in unset state.
        if (this.selectedIndex_ === numbers$2.UNSET_INDEX) {
            this.ariaCurrentAttrValue_ =
                this.adapter.getAttributeForElementIndex(index, strings$2.ARIA_CURRENT);
        }
        const isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
        const ariaAttribute = isAriaCurrent ? strings$2.ARIA_CURRENT : strings$2.ARIA_SELECTED;
        if (this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
            this.adapter.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
        }
        const ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
        this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
    }
    setTabindexAtIndex_(index) {
        if (this.focusedItemIndex_ === numbers$2.UNSET_INDEX && index !== 0) {
            // If no list item was selected set first list item's tabindex to -1.
            // Generally, tabindex is set to 0 on first list item of list that has no
            // preselected items.
            this.adapter.setTabIndexForElementIndex(0, -1);
        }
        else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
            this.adapter.setTabIndexForElementIndex(this.focusedItemIndex_, -1);
        }
        this.adapter.setTabIndexForElementIndex(index, 0);
    }
    setTabindexToFirstSelectedItem_() {
        let targetIndex = 0;
        if (typeof this.selectedIndex_ === 'number' &&
            this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
            targetIndex = this.selectedIndex_;
        }
        else if (isIndexSet(this.selectedIndex_) && this.selectedIndex_.size > 0) {
            targetIndex = Math.min(...this.selectedIndex_);
        }
        this.setTabindexAtIndex_(targetIndex);
    }
    isIndexValid_(index) {
        if (index instanceof Set) {
            if (!this.isMulti_) {
                throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
            }
            if (index.size === 0) {
                return true;
            }
            else {
                let isOneInRange = false;
                for (const entry of index) {
                    isOneInRange = this.isIndexInRange_(entry);
                    if (isOneInRange) {
                        break;
                    }
                }
                return isOneInRange;
            }
        }
        else if (typeof index === 'number') {
            if (this.isMulti_) {
                throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' +
                    index);
            }
            return index === numbers$2.UNSET_INDEX || this.isIndexInRange_(index);
        }
        else {
            return false;
        }
    }
    isIndexInRange_(index) {
        const listSize = this.adapter.getListItemCount();
        return index >= 0 && index < listSize;
    }
    /**
     * Sets selected index on user action, toggles checkbox / radio based on
     * toggleCheckbox value. User interaction should not toggle list item(s) when
     * disabled.
     */
    setSelectedIndexOnAction_(index, isInteraction, force) {
        if (this.adapter.getDisabledStateForElementIndex(index)) {
            return;
        }
        let checkedIndex = index;
        if (this.isMulti_) {
            checkedIndex = new Set([index]);
        }
        if (!this.isIndexValid_(checkedIndex)) {
            return;
        }
        if (this.isMulti_) {
            this.toggleMultiAtIndex(index, force, isInteraction);
        }
        else {
            if (isInteraction || force) {
                this.setSingleSelectionAtIndex_(index, isInteraction);
            }
            else {
                const isDeselection = this.selectedIndex_ === index;
                if (isDeselection) {
                    this.setSingleSelectionAtIndex_(numbers$2.UNSET_INDEX);
                }
            }
        }
        if (isInteraction) {
            this.adapter.notifyAction(index);
        }
    }
    toggleMultiAtIndex(index, force, isInteraction = true) {
        let newSelectionValue = false;
        if (force === undefined) {
            newSelectionValue = !this.adapter.getSelectedStateForElementIndex(index);
        }
        else {
            newSelectionValue = force;
        }
        const newSet = createSetFromIndex(this.selectedIndex_);
        if (newSelectionValue) {
            newSet.add(index);
        }
        else {
            newSet.delete(index);
        }
        this.setMultiSelectionAtIndex_(newSet, isInteraction);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function debounceLayout(callback, waitInMS = 50) {
    let timeoutId;
    // tslint:disable-next-line
    return function (updateItems = true) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(updateItems);
        }, waitInMS);
    };
}
const isListItem = (element) => {
    return element.hasAttribute('mwc-list-item');
};
function clearAndCreateItemsReadyPromise() {
    const oldResolver = this.itemsReadyResolver;
    this.itemsReady = new Promise((res) => {
        // TODO(b/175626389): Type '(value: never[] | PromiseLike<never[]>) => void'
        // is not assignable to type '(value?: never[] | PromiseLike<never[]> |
        // undefined) => void'.
        return this.itemsReadyResolver = res;
    });
    oldResolver();
}
/**
 * @fires selected {SelectedDetail}
 * @fires action {ActionDetail}
 * @fires items-updated
 */
class ListBase extends BaseElement {
    constructor() {
        super();
        this.mdcAdapter = null;
        this.mdcFoundationClass = MDCListFoundation;
        this.activatable = false;
        this.multi = false;
        this.wrapFocus = false;
        this.itemRoles = null;
        this.innerRole = null;
        this.innerAriaLabel = null;
        this.rootTabbable = false;
        this.previousTabindex = null;
        this.noninteractive = false;
        this.itemsReadyResolver = (() => {
            //
        });
        this.itemsReady = Promise.resolve([]);
        // tslint:enable:ban-ts-ignore
        this.items_ = [];
        const debouncedFunction = debounceLayout(this.layout.bind(this));
        this.debouncedLayout = (updateItems = true) => {
            clearAndCreateItemsReadyPromise.call(this);
            debouncedFunction(updateItems);
        };
    }
    // tslint:disable:ban-ts-ignore
    async getUpdateComplete() {
        // @ts-ignore
        const result = await super.getUpdateComplete();
        await this.itemsReady;
        return result;
    }
    get items() {
        return this.items_;
    }
    updateItems() {
        var _a;
        const nodes = (_a = this.assignedElements) !== null && _a !== void 0 ? _a : [];
        const listItems = [];
        for (const node of nodes) {
            if (isListItem(node)) {
                listItems.push(node);
                node._managingList = this;
            }
            if (node.hasAttribute('divider') && !node.hasAttribute('role')) {
                node.setAttribute('role', 'separator');
            }
        }
        this.items_ = listItems;
        const selectedIndices = new Set();
        this.items_.forEach((item, index) => {
            if (this.itemRoles) {
                item.setAttribute('role', this.itemRoles);
            }
            else {
                item.removeAttribute('role');
            }
            if (item.selected) {
                selectedIndices.add(index);
            }
        });
        if (this.multi) {
            this.select(selectedIndices);
        }
        else {
            const index = selectedIndices.size ? selectedIndices.entries().next().value[1] : -1;
            this.select(index);
        }
        const itemsUpdatedEv = new Event('items-updated', { bubbles: true, composed: true });
        this.dispatchEvent(itemsUpdatedEv);
    }
    get selected() {
        const index = this.index;
        if (!isIndexSet(index)) {
            if (index === -1) {
                return null;
            }
            return this.items[index];
        }
        const selected = [];
        for (const entry of index) {
            selected.push(this.items[entry]);
        }
        return selected;
    }
    get index() {
        if (this.mdcFoundation) {
            return this.mdcFoundation.getSelectedIndex();
        }
        return -1;
    }
    render() {
        const role = this.innerRole === null ? undefined : this.innerRole;
        const ariaLabel = this.innerAriaLabel === null ? undefined : this.innerAriaLabel;
        const tabindex = this.rootTabbable ? '0' : '-1';
        return x `
      <!-- @ts-ignore -->
      <ul
          tabindex=${tabindex}
          role="${l$2(role)}"
          aria-label="${l$2(ariaLabel)}"
          class="mdc-deprecated-list"
          @keydown=${this.onKeydown}
          @focusin=${this.onFocusIn}
          @focusout=${this.onFocusOut}
          @request-selected=${this.onRequestSelected}
          @list-item-rendered=${this.onListItemConnected}>
        <slot></slot>
        ${this.renderPlaceholder()}
      </ul>
    `;
    }
    renderPlaceholder() {
        var _a;
        const nodes = (_a = this.assignedElements) !== null && _a !== void 0 ? _a : [];
        if (this.emptyMessage !== undefined && nodes.length === 0) {
            return x `
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      `;
        }
        return null;
    }
    firstUpdated() {
        super.firstUpdated();
        if (!this.items.length) {
            // required because this is called before observers
            this.mdcFoundation.setMulti(this.multi);
            // for when children upgrade before list
            this.layout();
        }
    }
    onFocusIn(evt) {
        if (this.mdcFoundation && this.mdcRoot) {
            const index = this.getIndexOfTarget(evt);
            this.mdcFoundation.handleFocusIn(evt, index);
        }
    }
    onFocusOut(evt) {
        if (this.mdcFoundation && this.mdcRoot) {
            const index = this.getIndexOfTarget(evt);
            this.mdcFoundation.handleFocusOut(evt, index);
        }
    }
    onKeydown(evt) {
        if (this.mdcFoundation && this.mdcRoot) {
            const index = this.getIndexOfTarget(evt);
            const target = evt.target;
            const isRootListItem = isListItem(target);
            this.mdcFoundation.handleKeydown(evt, isRootListItem, index);
        }
    }
    onRequestSelected(evt) {
        if (this.mdcFoundation) {
            let index = this.getIndexOfTarget(evt);
            // might happen in shady dom slowness. Recalc children
            if (index === -1) {
                this.layout();
                index = this.getIndexOfTarget(evt);
                // still not found; may not be mwc-list-item. Unsupported case.
                if (index === -1) {
                    return;
                }
            }
            const element = this.items[index];
            if (element.disabled) {
                return;
            }
            const selected = evt.detail.selected;
            const source = evt.detail.source;
            this.mdcFoundation.handleSingleSelection(index, source === 'interaction', selected);
            evt.stopPropagation();
        }
    }
    getIndexOfTarget(evt) {
        const elements = this.items;
        const path = evt.composedPath();
        for (const pathItem of path) {
            let index = -1;
            if (isNodeElement(pathItem) && isListItem(pathItem)) {
                index = elements.indexOf(pathItem);
            }
            if (index !== -1) {
                return index;
            }
        }
        return -1;
    }
    createAdapter() {
        this.mdcAdapter = {
            getListItemCount: () => {
                if (this.mdcRoot) {
                    return this.items.length;
                }
                return 0;
            },
            getFocusedElementIndex: this.getFocusedItemIndex,
            getAttributeForElementIndex: (index, attr) => {
                const listElement = this.mdcRoot;
                if (!listElement) {
                    return '';
                }
                const element = this.items[index];
                return element ? element.getAttribute(attr) : '';
            },
            setAttributeForElementIndex: (index, attr, val) => {
                if (!this.mdcRoot) {
                    return;
                }
                const element = this.items[index];
                if (element) {
                    element.setAttribute(attr, val);
                }
            },
            focusItemAtIndex: (index) => {
                const element = this.items[index];
                if (element) {
                    element.focus();
                }
            },
            setTabIndexForElementIndex: (index, value) => {
                const item = this.items[index];
                if (item) {
                    item.tabindex = value;
                }
            },
            notifyAction: (index) => {
                const init = { bubbles: true, composed: true };
                init.detail = { index };
                const ev = new CustomEvent('action', init);
                this.dispatchEvent(ev);
            },
            notifySelected: (index, diff) => {
                const init = { bubbles: true, composed: true };
                init.detail = { index, diff };
                const ev = new CustomEvent('selected', init);
                this.dispatchEvent(ev);
            },
            isFocusInsideList: () => {
                return doesElementContainFocus(this);
            },
            isRootFocused: () => {
                const mdcRoot = this.mdcRoot;
                const root = mdcRoot.getRootNode();
                return root.activeElement === mdcRoot;
            },
            setDisabledStateForElementIndex: (index, value) => {
                const item = this.items[index];
                if (!item) {
                    return;
                }
                item.disabled = value;
            },
            getDisabledStateForElementIndex: (index) => {
                const item = this.items[index];
                if (!item) {
                    return false;
                }
                return item.disabled;
            },
            setSelectedStateForElementIndex: (index, value) => {
                const item = this.items[index];
                if (!item) {
                    return;
                }
                item.selected = value;
            },
            getSelectedStateForElementIndex: (index) => {
                const item = this.items[index];
                if (!item) {
                    return false;
                }
                return item.selected;
            },
            setActivatedStateForElementIndex: (index, value) => {
                const item = this.items[index];
                if (!item) {
                    return;
                }
                item.activated = value;
            },
        };
        return this.mdcAdapter;
    }
    selectUi(index, activate = false) {
        const item = this.items[index];
        if (item) {
            item.selected = true;
            item.activated = activate;
        }
    }
    deselectUi(index) {
        const item = this.items[index];
        if (item) {
            item.selected = false;
            item.activated = false;
        }
    }
    select(index) {
        if (!this.mdcFoundation) {
            return;
        }
        this.mdcFoundation.setSelectedIndex(index);
    }
    toggle(index, force) {
        if (this.multi) {
            this.mdcFoundation.toggleMultiAtIndex(index, force);
        }
    }
    onListItemConnected(e) {
        const target = e.target;
        this.layout(this.items.indexOf(target) === -1);
    }
    layout(updateItems = true) {
        if (updateItems) {
            this.updateItems();
        }
        const first = this.items[0];
        for (const item of this.items) {
            item.tabindex = -1;
        }
        if (first) {
            if (this.noninteractive) {
                if (!this.previousTabindex) {
                    this.previousTabindex = first;
                }
            }
            else {
                first.tabindex = 0;
            }
        }
        this.itemsReadyResolver();
    }
    getFocusedItemIndex() {
        if (!this.mdcRoot) {
            return -1;
        }
        if (!this.items.length) {
            return -1;
        }
        const activeElementPath = deepActiveElementPath();
        if (!activeElementPath.length) {
            return -1;
        }
        for (let i = activeElementPath.length - 1; i >= 0; i--) {
            const activeItem = activeElementPath[i];
            if (isListItem(activeItem)) {
                return this.items.indexOf(activeItem);
            }
        }
        return -1;
    }
    focusItemAtIndex(index) {
        for (const item of this.items) {
            if (item.tabindex === 0) {
                item.tabindex = -1;
                break;
            }
        }
        this.items[index].tabindex = 0;
        this.items[index].focus();
    }
    focus() {
        const root = this.mdcRoot;
        if (root) {
            root.focus();
        }
    }
    blur() {
        const root = this.mdcRoot;
        if (root) {
            root.blur();
        }
    }
}
__decorate([
    n$4({ type: String })
], ListBase.prototype, "emptyMessage", void 0);
__decorate([
    i$2('.mdc-deprecated-list')
], ListBase.prototype, "mdcRoot", void 0);
__decorate([
    o$4('', true, '*')
], ListBase.prototype, "assignedElements", void 0);
__decorate([
    o$4('', true, '[tabindex="0"]')
], ListBase.prototype, "tabbableElements", void 0);
__decorate([
    n$4({ type: Boolean }),
    observer(function (value) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setUseActivatedClass(value);
        }
    })
], ListBase.prototype, "activatable", void 0);
__decorate([
    n$4({ type: Boolean }),
    observer(function (newValue, oldValue) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setMulti(newValue);
        }
        if (oldValue !== undefined) {
            this.layout();
        }
    })
], ListBase.prototype, "multi", void 0);
__decorate([
    n$4({ type: Boolean }),
    observer(function (value) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setWrapFocus(value);
        }
    })
], ListBase.prototype, "wrapFocus", void 0);
__decorate([
    n$4({ type: String }),
    observer(function (_newValue, oldValue) {
        if (oldValue !== undefined) {
            this.updateItems();
        }
    })
], ListBase.prototype, "itemRoles", void 0);
__decorate([
    n$4({ type: String })
], ListBase.prototype, "innerRole", void 0);
__decorate([
    n$4({ type: String })
], ListBase.prototype, "innerAriaLabel", void 0);
__decorate([
    n$4({ type: Boolean })
], ListBase.prototype, "rootTabbable", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true }),
    observer(function (value) {
        var _a, _b;
        if (value) {
            const tabbable = (_b = (_a = this.tabbableElements) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
            this.previousTabindex = tabbable;
            if (tabbable) {
                tabbable.setAttribute('tabindex', '-1');
            }
        }
        else if (!value && this.previousTabindex) {
            this.previousTabindex.setAttribute('tabindex', '0');
            this.previousTabindex = null;
        }
    })
], ListBase.prototype, "noninteractive", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$2 = i$6 `@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc( 100% - var(--mdc-list-inset-margin, 72px) )}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset][dir=rtl]){margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc( 100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px) )}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}`;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let List = class List extends ListBase {
};
List.styles = [styles$2];
List = __decorate([
    e$7('mwc-list')
], List);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$1 = {
    NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch',
};
var numbers$1 = {
    // This should stay in sync with $mdc-notched-outline-padding * 2.
    NOTCH_ELEMENT_PADDING: 8,
};
var cssClasses$3 = {
    NO_LABEL: 'mdc-notched-outline--no-label',
    OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
    OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded',
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCNotchedOutlineFoundation = /** @class */ (function (_super) {
    __extends(MDCNotchedOutlineFoundation, _super);
    function MDCNotchedOutlineFoundation(adapter) {
        return _super.call(this, __assign(__assign({}, MDCNotchedOutlineFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
        get: function () {
            return strings$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
        get: function () {
            return cssClasses$3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
        get: function () {
            return numbers$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
        /**
         * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                setNotchWidthProperty: function () { return undefined; },
                removeNotchWidthProperty: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
     */
    MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
        if (notchWidth > 0) {
            notchWidth += numbers$1.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
        }
        this.adapter.setNotchWidthProperty(notchWidth);
        this.adapter.addClass(OUTLINE_NOTCHED);
    };
    /**
     * Removes notched outline selector to close the notch in the outline.
     */
    MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
        this.adapter.removeClass(OUTLINE_NOTCHED);
        this.adapter.removeNotchWidthProperty();
    };
    return MDCNotchedOutlineFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class NotchedOutlineBase extends BaseElement {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCNotchedOutlineFoundation;
        this.width = 0;
        this.open = false;
        this.lastOpen = this.open;
    }
    createAdapter() {
        return {
            addClass: (className) => this.mdcRoot.classList.add(className),
            removeClass: (className) => this.mdcRoot.classList.remove(className),
            setNotchWidthProperty: (width) => this.notchElement.style.setProperty('width', `${width}px`),
            removeNotchWidthProperty: () => this.notchElement.style.removeProperty('width'),
        };
    }
    openOrClose(shouldOpen, width) {
        if (!this.mdcFoundation) {
            return;
        }
        if (shouldOpen && width !== undefined) {
            this.mdcFoundation.notch(width);
        }
        else {
            this.mdcFoundation.closeNotch();
        }
    }
    render() {
        this.openOrClose(this.open, this.width);
        const classes = o$3({
            'mdc-notched-outline--notched': this.open,
        });
        return x `
      <span class="mdc-notched-outline ${classes}">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <slot></slot>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>`;
    }
}
__decorate([
    i$2('.mdc-notched-outline')
], NotchedOutlineBase.prototype, "mdcRoot", void 0);
__decorate([
    n$4({ type: Number })
], NotchedOutlineBase.prototype, "width", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], NotchedOutlineBase.prototype, "open", void 0);
__decorate([
    i$2('.mdc-notched-outline__notch')
], NotchedOutlineBase.prototype, "notchElement", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$1 = i$6 `.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}:host{display:block;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] :host,:host([dir=rtl]){text-align:right}::slotted(.mdc-floating-label){display:inline-block;position:relative;top:17px;bottom:auto;max-width:100%}::slotted(.mdc-floating-label--float-above){text-overflow:clip}.mdc-notched-outline--upgraded ::slotted(.mdc-floating-label--float-above){max-width:calc(100% / 0.75)}.mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__leading,.mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-color:var(--mdc-notched-outline-border-color, var(--mdc-theme-primary, #6200ee));border-width:1px;border-width:var(--mdc-notched-outline-stroke-width, 1px)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0;padding-top:var(--mdc-notched-outline-notch-offset, 0)}`;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let NotchedOutline = class NotchedOutline extends NotchedOutlineBase {
};
NotchedOutline.styles = [styles$1];
NotchedOutline = __decorate([
    e$7('mwc-notched-outline')
], NotchedOutline);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a, _b;
// ShadyDOM should submit <input> elements in component internals
const USING_SHADY_DOM = (_b = (_a = window.ShadyDOM) === null || _a === void 0 ? void 0 : _a.inUse) !== null && _b !== void 0 ? _b : false;
/** @soyCompatible */
class FormElement extends BaseElement {
    constructor() {
        super(...arguments);
        /**
         * Disabled state for the component. When `disabled` is set to `true`, the
         * component will not be added to form submission.
         */
        this.disabled = false;
        /**
         * Form element that contains this element
         */
        this.containingForm = null;
        this.formDataListener = (ev) => {
            if (!this.disabled) {
                this.setFormData(ev.formData);
            }
        };
    }
    findFormElement() {
        // If the component internals are not in Shadow DOM, subscribing to form
        // data events could lead to duplicated data, which may not work correctly
        // on the server side.
        if (!this.shadowRoot || USING_SHADY_DOM) {
            return null;
        }
        const root = this.getRootNode();
        const forms = root.querySelectorAll('form');
        for (const form of Array.from(forms)) {
            if (form.contains(this)) {
                return form;
            }
        }
        return null;
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        this.containingForm = this.findFormElement();
        (_a = this.containingForm) === null || _a === void 0 ? void 0 : _a.addEventListener('formdata', this.formDataListener);
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this.containingForm) === null || _a === void 0 ? void 0 : _a.removeEventListener('formdata', this.formDataListener);
        this.containingForm = null;
    }
    click() {
        if (this.formElement && !this.disabled) {
            this.formElement.focus();
            this.formElement.click();
        }
    }
    firstUpdated() {
        super.firstUpdated();
        if (this.shadowRoot) {
            this.mdcRoot.addEventListener('change', (e) => {
                this.dispatchEvent(new Event('change', e));
            });
        }
    }
}
FormElement.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    n$4({ type: Boolean })
], FormElement.prototype, "disabled", void 0);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$2 = {
    LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
    LABEL_REQUIRED: 'mdc-floating-label--required',
    LABEL_SHAKE: 'mdc-floating-label--shake',
    ROOT: 'mdc-floating-label',
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFloatingLabelFoundation = /** @class */ (function (_super) {
    __extends(MDCFloatingLabelFoundation, _super);
    function MDCFloatingLabelFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCFloatingLabelFoundation.defaultAdapter), adapter)) || this;
        _this.shakeAnimationEndHandler = function () {
            _this.handleShakeAnimationEnd();
        };
        return _this;
    }
    Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
        get: function () {
            return cssClasses$2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
        /**
         * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                getWidth: function () { return 0; },
                registerInteractionHandler: function () { return undefined; },
                deregisterInteractionHandler: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCFloatingLabelFoundation.prototype.init = function () {
        this.adapter.registerInteractionHandler('animationend', this.shakeAnimationEndHandler);
    };
    MDCFloatingLabelFoundation.prototype.destroy = function () {
        this.adapter.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler);
    };
    /**
     * Returns the width of the label element.
     */
    MDCFloatingLabelFoundation.prototype.getWidth = function () {
        return this.adapter.getWidth();
    };
    /**
     * Styles the label to produce a shake animation to indicate an error.
     * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
     */
    MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
        if (shouldShake) {
            this.adapter.addClass(LABEL_SHAKE);
        }
        else {
            this.adapter.removeClass(LABEL_SHAKE);
        }
    };
    /**
     * Styles the label to float or dock.
     * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
     */
    MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
        var _a = MDCFloatingLabelFoundation.cssClasses, LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a.LABEL_SHAKE;
        if (shouldFloat) {
            this.adapter.addClass(LABEL_FLOAT_ABOVE);
        }
        else {
            this.adapter.removeClass(LABEL_FLOAT_ABOVE);
            this.adapter.removeClass(LABEL_SHAKE);
        }
    };
    /**
     * Styles the label as required.
     * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
     */
    MDCFloatingLabelFoundation.prototype.setRequired = function (isRequired) {
        var LABEL_REQUIRED = MDCFloatingLabelFoundation.cssClasses.LABEL_REQUIRED;
        if (isRequired) {
            this.adapter.addClass(LABEL_REQUIRED);
        }
        else {
            this.adapter.removeClass(LABEL_REQUIRED);
        }
    };
    MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd = function () {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
        this.adapter.removeClass(LABEL_SHAKE);
    };
    return MDCFloatingLabelFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const createAdapter$1 = (labelElement) => {
    return {
        addClass: (className) => labelElement.classList.add(className),
        removeClass: (className) => labelElement.classList.remove(className),
        getWidth: () => labelElement.scrollWidth,
        registerInteractionHandler: (evtType, handler) => {
            labelElement.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: (evtType, handler) => {
            labelElement.removeEventListener(evtType, handler);
        },
    };
};
class FloatingLabelDirective extends i$1 {
    constructor(partInfo) {
        super(partInfo);
        this.foundation = null;
        this.previousPart = null;
        switch (partInfo.type) {
            // Only allow Attribute and Part bindings
            case t.ATTRIBUTE:
            case t.PROPERTY:
                break;
            default:
                throw new Error('FloatingLabel directive only support attribute and property parts');
        }
    }
    /**
     * There is no PropertyPart in Lit 2 so far. For more info see:
     * https://github.com/lit/lit/issues/1863
     */
    update(part, [label]) {
        if (part !== this.previousPart) {
            if (this.foundation) {
                this.foundation.destroy();
            }
            this.previousPart = part;
            const labelElement = part.element;
            labelElement.classList.add('mdc-floating-label');
            const adapter = createAdapter$1(labelElement);
            this.foundation = new MDCFloatingLabelFoundation(adapter);
            this.foundation.init();
        }
        return this.render(label);
    }
    render(_label) {
        return this.foundation;
    }
}
const floatingLabel = e$2(FloatingLabelDirective);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$1 = {
    LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
    LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating',
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCLineRippleFoundation = /** @class */ (function (_super) {
    __extends(MDCLineRippleFoundation, _super);
    function MDCLineRippleFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCLineRippleFoundation.defaultAdapter), adapter)) || this;
        _this.transitionEndHandler = function (evt) {
            _this.handleTransitionEnd(evt);
        };
        return _this;
    }
    Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
        get: function () {
            return cssClasses$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
        /**
         * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                setStyle: function () { return undefined; },
                registerEventHandler: function () { return undefined; },
                deregisterEventHandler: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCLineRippleFoundation.prototype.init = function () {
        this.adapter.registerEventHandler('transitionend', this.transitionEndHandler);
    };
    MDCLineRippleFoundation.prototype.destroy = function () {
        this.adapter.deregisterEventHandler('transitionend', this.transitionEndHandler);
    };
    MDCLineRippleFoundation.prototype.activate = function () {
        this.adapter.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
        this.adapter.addClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
    };
    MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
        this.adapter.setStyle('transform-origin', xCoordinate + "px center");
    };
    MDCLineRippleFoundation.prototype.deactivate = function () {
        this.adapter.addClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
    };
    MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
        // Wait for the line ripple to be either transparent or opaque
        // before emitting the animation end event
        var isDeactivating = this.adapter.hasClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
        if (evt.propertyName === 'opacity') {
            if (isDeactivating) {
                this.adapter.removeClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
                this.adapter.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
            }
        }
    };
    return MDCLineRippleFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const createAdapter = (lineElement) => {
    return {
        addClass: (className) => lineElement.classList.add(className),
        removeClass: (className) => lineElement.classList.remove(className),
        hasClass: (className) => lineElement.classList.contains(className),
        setStyle: (propertyName, value) => lineElement.style.setProperty(propertyName, value),
        registerEventHandler: (evtType, handler) => {
            lineElement.addEventListener(evtType, handler);
        },
        deregisterEventHandler: (evtType, handler) => {
            lineElement.removeEventListener(evtType, handler);
        },
    };
};
class LineRippleDirective extends i$1 {
    constructor(partInfo) {
        super(partInfo);
        this.previousPart = null;
        this.foundation = null;
        switch (partInfo.type) {
            case t.ATTRIBUTE:
            case t.PROPERTY:
                return;
            default:
                throw new Error('LineRipple only support attribute and property parts.');
        }
    }
    /**
     * There is no PropertyPart in Lit 2 so far. For more info see:
     * https://github.com/lit/lit/issues/1863
     */
    update(part, _params) {
        if (this.previousPart !== part) {
            if (this.foundation) {
                this.foundation.destroy();
            }
            this.previousPart = part;
            const lineElement = part.element;
            lineElement.classList.add('mdc-line-ripple');
            const adapter = createAdapter(lineElement);
            this.foundation = new MDCLineRippleFoundation(adapter);
            this.foundation.init();
        }
        return this.render();
    }
    render() {
        return this.foundation;
    }
}
const lineRipple = e$2(LineRippleDirective);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
    ARIA_CONTROLS: 'aria-controls',
    ARIA_DESCRIBEDBY: 'aria-describedby',
    INPUT_SELECTOR: '.mdc-text-field__input',
    LABEL_SELECTOR: '.mdc-floating-label',
    LEADING_ICON_SELECTOR: '.mdc-text-field__icon--leading',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
    OUTLINE_SELECTOR: '.mdc-notched-outline',
    PREFIX_SELECTOR: '.mdc-text-field__affix--prefix',
    SUFFIX_SELECTOR: '.mdc-text-field__affix--suffix',
    TRAILING_ICON_SELECTOR: '.mdc-text-field__icon--trailing'
};
var cssClasses = {
    DISABLED: 'mdc-text-field--disabled',
    FOCUSED: 'mdc-text-field--focused',
    HELPER_LINE: 'mdc-text-field-helper-line',
    INVALID: 'mdc-text-field--invalid',
    LABEL_FLOATING: 'mdc-text-field--label-floating',
    NO_LABEL: 'mdc-text-field--no-label',
    OUTLINED: 'mdc-text-field--outlined',
    ROOT: 'mdc-text-field',
    TEXTAREA: 'mdc-text-field--textarea',
    WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
    WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon',
    WITH_INTERNAL_COUNTER: 'mdc-text-field--with-internal-counter',
};
var numbers = {
    LABEL_SCALE: 0.75,
};
/**
 * Whitelist based off of
 * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * under the "Validation-related attributes" section.
 */
var VALIDATION_ATTR_WHITELIST = [
    'pattern',
    'min',
    'max',
    'required',
    'step',
    'minlength',
    'maxlength',
];
/**
 * Label should always float for these types as they show some UI even if value
 * is empty.
 */
var ALWAYS_FLOAT_TYPES = [
    'color',
    'date',
    'datetime-local',
    'month',
    'range',
    'time',
    'week',
];

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var POINTERDOWN_EVENTS = ['mousedown', 'touchstart'];
var INTERACTION_EVENTS = ['click', 'keydown'];
var MDCTextFieldFoundation = /** @class */ (function (_super) {
    __extends(MDCTextFieldFoundation, _super);
    /**
     * @param adapter
     * @param foundationMap Map from subcomponent names to their subfoundations.
     */
    function MDCTextFieldFoundation(adapter, foundationMap) {
        if (foundationMap === void 0) { foundationMap = {}; }
        var _this = _super.call(this, __assign(__assign({}, MDCTextFieldFoundation.defaultAdapter), adapter)) || this;
        _this.isFocused = false;
        _this.receivedUserInput = false;
        _this.valid = true;
        _this.useNativeValidation = true;
        _this.validateOnValueChange = true;
        _this.helperText = foundationMap.helperText;
        _this.characterCounter = foundationMap.characterCounter;
        _this.leadingIcon = foundationMap.leadingIcon;
        _this.trailingIcon = foundationMap.trailingIcon;
        _this.inputFocusHandler = function () {
            _this.activateFocus();
        };
        _this.inputBlurHandler = function () {
            _this.deactivateFocus();
        };
        _this.inputInputHandler = function () {
            _this.handleInput();
        };
        _this.setPointerXOffset = function (evt) {
            _this.setTransformOrigin(evt);
        };
        _this.textFieldInteractionHandler = function () {
            _this.handleTextFieldInteraction();
        };
        _this.validationAttributeChangeHandler = function (attributesList) {
            _this.handleValidationAttributeChange(attributesList);
        };
        return _this;
    }
    Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "strings", {
        get: function () {
            return strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "numbers", {
        get: function () {
            return numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat", {
        get: function () {
            var type = this.getNativeInput().type;
            return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
        get: function () {
            return this.shouldAlwaysFloat || this.isFocused || !!this.getValue() ||
                this.isBadInput();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
        get: function () {
            return !this.isFocused && !this.isValid() && !!this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldAdapter} for typing information on parameters and
         * return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return true; },
                setInputAttr: function () { return undefined; },
                removeInputAttr: function () { return undefined; },
                registerTextFieldInteractionHandler: function () { return undefined; },
                deregisterTextFieldInteractionHandler: function () { return undefined; },
                registerInputInteractionHandler: function () { return undefined; },
                deregisterInputInteractionHandler: function () { return undefined; },
                registerValidationAttributeChangeHandler: function () {
                    return new MutationObserver(function () { return undefined; });
                },
                deregisterValidationAttributeChangeHandler: function () { return undefined; },
                getNativeInput: function () { return null; },
                isFocused: function () { return false; },
                activateLineRipple: function () { return undefined; },
                deactivateLineRipple: function () { return undefined; },
                setLineRippleTransformOrigin: function () { return undefined; },
                shakeLabel: function () { return undefined; },
                floatLabel: function () { return undefined; },
                setLabelRequired: function () { return undefined; },
                hasLabel: function () { return false; },
                getLabelWidth: function () { return 0; },
                hasOutline: function () { return false; },
                notchOutline: function () { return undefined; },
                closeOutline: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldFoundation.prototype.init = function () {
        var e_1, _a, e_2, _b;
        if (this.adapter.hasLabel() && this.getNativeInput().required) {
            this.adapter.setLabelRequired(true);
        }
        if (this.adapter.isFocused()) {
            this.inputFocusHandler();
        }
        else if (this.adapter.hasLabel() && this.shouldFloat) {
            this.notchOutline(true);
            this.adapter.floatLabel(true);
            this.styleFloating(true);
        }
        this.adapter.registerInputInteractionHandler('focus', this.inputFocusHandler);
        this.adapter.registerInputInteractionHandler('blur', this.inputBlurHandler);
        this.adapter.registerInputInteractionHandler('input', this.inputInputHandler);
        try {
            for (var POINTERDOWN_EVENTS_1 = __values(POINTERDOWN_EVENTS), POINTERDOWN_EVENTS_1_1 = POINTERDOWN_EVENTS_1.next(); !POINTERDOWN_EVENTS_1_1.done; POINTERDOWN_EVENTS_1_1 = POINTERDOWN_EVENTS_1.next()) {
                var evtType = POINTERDOWN_EVENTS_1_1.value;
                this.adapter.registerInputInteractionHandler(evtType, this.setPointerXOffset);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (POINTERDOWN_EVENTS_1_1 && !POINTERDOWN_EVENTS_1_1.done && (_a = POINTERDOWN_EVENTS_1.return)) _a.call(POINTERDOWN_EVENTS_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var INTERACTION_EVENTS_1 = __values(INTERACTION_EVENTS), INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next(); !INTERACTION_EVENTS_1_1.done; INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next()) {
                var evtType = INTERACTION_EVENTS_1_1.value;
                this.adapter.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (INTERACTION_EVENTS_1_1 && !INTERACTION_EVENTS_1_1.done && (_b = INTERACTION_EVENTS_1.return)) _b.call(INTERACTION_EVENTS_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.validationObserver =
            this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler);
        this.setcharacterCounter(this.getValue().length);
    };
    MDCTextFieldFoundation.prototype.destroy = function () {
        var e_3, _a, e_4, _b;
        this.adapter.deregisterInputInteractionHandler('focus', this.inputFocusHandler);
        this.adapter.deregisterInputInteractionHandler('blur', this.inputBlurHandler);
        this.adapter.deregisterInputInteractionHandler('input', this.inputInputHandler);
        try {
            for (var POINTERDOWN_EVENTS_2 = __values(POINTERDOWN_EVENTS), POINTERDOWN_EVENTS_2_1 = POINTERDOWN_EVENTS_2.next(); !POINTERDOWN_EVENTS_2_1.done; POINTERDOWN_EVENTS_2_1 = POINTERDOWN_EVENTS_2.next()) {
                var evtType = POINTERDOWN_EVENTS_2_1.value;
                this.adapter.deregisterInputInteractionHandler(evtType, this.setPointerXOffset);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (POINTERDOWN_EVENTS_2_1 && !POINTERDOWN_EVENTS_2_1.done && (_a = POINTERDOWN_EVENTS_2.return)) _a.call(POINTERDOWN_EVENTS_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var INTERACTION_EVENTS_2 = __values(INTERACTION_EVENTS), INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next(); !INTERACTION_EVENTS_2_1.done; INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next()) {
                var evtType = INTERACTION_EVENTS_2_1.value;
                this.adapter.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (INTERACTION_EVENTS_2_1 && !INTERACTION_EVENTS_2_1.done && (_b = INTERACTION_EVENTS_2.return)) _b.call(INTERACTION_EVENTS_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver);
    };
    /**
     * Handles user interactions with the Text Field.
     */
    MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function () {
        var nativeInput = this.adapter.getNativeInput();
        if (nativeInput && nativeInput.disabled) {
            return;
        }
        this.receivedUserInput = true;
    };
    /**
     * Handles validation attribute changes
     */
    MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function (attributesList) {
        var _this = this;
        attributesList.some(function (attributeName) {
            if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
                _this.styleValidity(true);
                _this.adapter.setLabelRequired(_this.getNativeInput().required);
                return true;
            }
            return false;
        });
        if (attributesList.indexOf('maxlength') > -1) {
            this.setcharacterCounter(this.getValue().length);
        }
    };
    /**
     * Opens/closes the notched outline.
     */
    MDCTextFieldFoundation.prototype.notchOutline = function (openNotch) {
        if (!this.adapter.hasOutline() || !this.adapter.hasLabel()) {
            return;
        }
        if (openNotch) {
            var labelWidth = this.adapter.getLabelWidth() * numbers.LABEL_SCALE;
            this.adapter.notchOutline(labelWidth);
        }
        else {
            this.adapter.closeOutline();
        }
    };
    /**
     * Activates the text field focus state.
     */
    MDCTextFieldFoundation.prototype.activateFocus = function () {
        this.isFocused = true;
        this.styleFocused(this.isFocused);
        this.adapter.activateLineRipple();
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating(this.shouldFloat);
            this.adapter.shakeLabel(this.shouldShake);
        }
        if (this.helperText &&
            (this.helperText.isPersistent() || !this.helperText.isValidation() ||
                !this.valid)) {
            this.helperText.showToScreenReader();
        }
    };
    /**
     * Sets the line ripple's transform origin, so that the line ripple activate
     * animation will animate out from the user's click location.
     */
    MDCTextFieldFoundation.prototype.setTransformOrigin = function (evt) {
        if (this.isDisabled() || this.adapter.hasOutline()) {
            return;
        }
        var touches = evt.touches;
        var targetEvent = touches ? touches[0] : evt;
        var targetClientRect = targetEvent.target.getBoundingClientRect();
        var normalizedX = targetEvent.clientX - targetClientRect.left;
        this.adapter.setLineRippleTransformOrigin(normalizedX);
    };
    /**
     * Handles input change of text input and text area.
     */
    MDCTextFieldFoundation.prototype.handleInput = function () {
        this.autoCompleteFocus();
        this.setcharacterCounter(this.getValue().length);
    };
    /**
     * Activates the Text Field's focus state in cases when the input value
     * changes without user input (e.g. programmatically).
     */
    MDCTextFieldFoundation.prototype.autoCompleteFocus = function () {
        if (!this.receivedUserInput) {
            this.activateFocus();
        }
    };
    /**
     * Deactivates the Text Field's focus state.
     */
    MDCTextFieldFoundation.prototype.deactivateFocus = function () {
        this.isFocused = false;
        this.adapter.deactivateLineRipple();
        var isValid = this.isValid();
        this.styleValidity(isValid);
        this.styleFocused(this.isFocused);
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating(this.shouldFloat);
            this.adapter.shakeLabel(this.shouldShake);
        }
        if (!this.shouldFloat) {
            this.receivedUserInput = false;
        }
    };
    MDCTextFieldFoundation.prototype.getValue = function () {
        return this.getNativeInput().value;
    };
    /**
     * @param value The value to set on the input Element.
     */
    MDCTextFieldFoundation.prototype.setValue = function (value) {
        // Prevent Safari from moving the caret to the end of the input when the
        // value has not changed.
        if (this.getValue() !== value) {
            this.getNativeInput().value = value;
        }
        this.setcharacterCounter(value.length);
        if (this.validateOnValueChange) {
            var isValid = this.isValid();
            this.styleValidity(isValid);
        }
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating(this.shouldFloat);
            if (this.validateOnValueChange) {
                this.adapter.shakeLabel(this.shouldShake);
            }
        }
    };
    /**
     * @return The custom validity state, if set; otherwise, the result of a
     *     native validity check.
     */
    MDCTextFieldFoundation.prototype.isValid = function () {
        return this.useNativeValidation ? this.isNativeInputValid() : this.valid;
    };
    /**
     * @param isValid Sets the custom validity state of the Text Field.
     */
    MDCTextFieldFoundation.prototype.setValid = function (isValid) {
        this.valid = isValid;
        this.styleValidity(isValid);
        var shouldShake = !isValid && !this.isFocused && !!this.getValue();
        if (this.adapter.hasLabel()) {
            this.adapter.shakeLabel(shouldShake);
        }
    };
    /**
     * @param shouldValidate Whether or not validity should be updated on
     *     value change.
     */
    MDCTextFieldFoundation.prototype.setValidateOnValueChange = function (shouldValidate) {
        this.validateOnValueChange = shouldValidate;
    };
    /**
     * @return Whether or not validity should be updated on value change. `true`
     *     by default.
     */
    MDCTextFieldFoundation.prototype.getValidateOnValueChange = function () {
        return this.validateOnValueChange;
    };
    /**
     * Enables or disables the use of native validation. Use this for custom
     * validation.
     * @param useNativeValidation Set this to false to ignore native input
     *     validation.
     */
    MDCTextFieldFoundation.prototype.setUseNativeValidation = function (useNativeValidation) {
        this.useNativeValidation = useNativeValidation;
    };
    MDCTextFieldFoundation.prototype.isDisabled = function () {
        return this.getNativeInput().disabled;
    };
    /**
     * @param disabled Sets the text-field disabled or enabled.
     */
    MDCTextFieldFoundation.prototype.setDisabled = function (disabled) {
        this.getNativeInput().disabled = disabled;
        this.styleDisabled(disabled);
    };
    /**
     * @param content Sets the content of the helper text.
     */
    MDCTextFieldFoundation.prototype.setHelperTextContent = function (content) {
        if (this.helperText) {
            this.helperText.setContent(content);
        }
    };
    /**
     * Sets the aria label of the leading icon.
     */
    MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function (label) {
        if (this.leadingIcon) {
            this.leadingIcon.setAriaLabel(label);
        }
    };
    /**
     * Sets the text content of the leading icon.
     */
    MDCTextFieldFoundation.prototype.setLeadingIconContent = function (content) {
        if (this.leadingIcon) {
            this.leadingIcon.setContent(content);
        }
    };
    /**
     * Sets the aria label of the trailing icon.
     */
    MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function (label) {
        if (this.trailingIcon) {
            this.trailingIcon.setAriaLabel(label);
        }
    };
    /**
     * Sets the text content of the trailing icon.
     */
    MDCTextFieldFoundation.prototype.setTrailingIconContent = function (content) {
        if (this.trailingIcon) {
            this.trailingIcon.setContent(content);
        }
    };
    /**
     * Sets character counter values that shows characters used and the total
     * character limit.
     */
    MDCTextFieldFoundation.prototype.setcharacterCounter = function (currentLength) {
        if (!this.characterCounter) {
            return;
        }
        var maxLength = this.getNativeInput().maxLength;
        if (maxLength === -1) {
            throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
        }
        this.characterCounter.setCounterValue(currentLength, maxLength);
    };
    /**
     * @return True if the Text Field input fails in converting the user-supplied
     *     value.
     */
    MDCTextFieldFoundation.prototype.isBadInput = function () {
        // The badInput property is not supported in IE 11 💩.
        return this.getNativeInput().validity.badInput || false;
    };
    /**
     * @return The result of native validity checking (ValidityState.valid).
     */
    MDCTextFieldFoundation.prototype.isNativeInputValid = function () {
        return this.getNativeInput().validity.valid;
    };
    /**
     * Styles the component based on the validity state.
     */
    MDCTextFieldFoundation.prototype.styleValidity = function (isValid) {
        var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;
        if (isValid) {
            this.adapter.removeClass(INVALID);
        }
        else {
            this.adapter.addClass(INVALID);
        }
        if (this.helperText) {
            this.helperText.setValidity(isValid);
            // We dynamically set or unset aria-describedby for validation helper text
            // only, based on whether the field is valid
            var helperTextValidation = this.helperText.isValidation();
            if (!helperTextValidation) {
                return;
            }
            var helperTextVisible = this.helperText.isVisible();
            var helperTextId = this.helperText.getId();
            if (helperTextVisible && helperTextId) {
                this.adapter.setInputAttr(strings.ARIA_DESCRIBEDBY, helperTextId);
            }
            else {
                this.adapter.removeInputAttr(strings.ARIA_DESCRIBEDBY);
            }
        }
    };
    /**
     * Styles the component based on the focused state.
     */
    MDCTextFieldFoundation.prototype.styleFocused = function (isFocused) {
        var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;
        if (isFocused) {
            this.adapter.addClass(FOCUSED);
        }
        else {
            this.adapter.removeClass(FOCUSED);
        }
    };
    /**
     * Styles the component based on the disabled state.
     */
    MDCTextFieldFoundation.prototype.styleDisabled = function (isDisabled) {
        var _a = MDCTextFieldFoundation.cssClasses, DISABLED = _a.DISABLED, INVALID = _a.INVALID;
        if (isDisabled) {
            this.adapter.addClass(DISABLED);
            this.adapter.removeClass(INVALID);
        }
        else {
            this.adapter.removeClass(DISABLED);
        }
        if (this.leadingIcon) {
            this.leadingIcon.setDisabled(isDisabled);
        }
        if (this.trailingIcon) {
            this.trailingIcon.setDisabled(isDisabled);
        }
    };
    /**
     * Styles the component based on the label floating state.
     */
    MDCTextFieldFoundation.prototype.styleFloating = function (isFloating) {
        var LABEL_FLOATING = MDCTextFieldFoundation.cssClasses.LABEL_FLOATING;
        if (isFloating) {
            this.adapter.addClass(LABEL_FLOATING);
        }
        else {
            this.adapter.removeClass(LABEL_FLOATING);
        }
    };
    /**
     * @return The native text input element from the host environment, or an
     *     object with the same shape for unit tests.
     */
    MDCTextFieldFoundation.prototype.getNativeInput = function () {
        // this.adapter may be undefined in foundation unit tests. This happens when
        // testdouble is creating a mock object and invokes the
        // shouldShake/shouldFloat getters (which in turn call getValue(), which
        // calls this method) before init() has been called from the MDCTextField
        // constructor. To work around that issue, we return a dummy object.
        var nativeInput = this.adapter ? this.adapter.getNativeInput() : null;
        return nativeInput || {
            disabled: false,
            maxLength: -1,
            required: false,
            type: 'input',
            validity: {
                badInput: false,
                valid: true,
            },
            value: '',
        };
    };
    return MDCTextFieldFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e$2(class extends i$1{constructor(r){if(super(r),r.type!==t.PROPERTY&&r.type!==t.ATTRIBUTE&&r.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!e$1(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t$1]){if(t$1===T$1||t$1===A$1)return t$1;const o=i.element,l=i.name;if(i.type===t.PROPERTY){if(t$1===o[l])return T$1}else if(i.type===t.BOOLEAN_ATTRIBUTE){if(!!t$1===o.hasAttribute(l))return T$1}else if(i.type===t.ATTRIBUTE&&o.getAttribute(l)===t$1+"")return T$1;return a(i),t$1}});

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'mousewheel'];
const createValidityObj = (customValidity = {}) => {
    /*
     * We need to make ValidityState an object because it is readonly and
     * we cannot use the spread operator. Also, we don't export
     * `CustomValidityState` because it is a leaky implementation and the user
     * already has access to `ValidityState` in lib.dom.ts. Also an interface
     * {a: Type} can be casted to {readonly a: Type} so passing any object
     * should be fine.
     */
    const objectifiedCustomValidity = {};
    // eslint-disable-next-line guard-for-in
    for (const propName in customValidity) {
        /*
         * Casting is needed because ValidityState's props are all readonly and
         * thus cannot be set on `onjectifiedCustomValidity`. In the end, the
         * interface is the same as ValidityState (but not readonly), but the
         * function signature casts the output to ValidityState (thus readonly).
         */
        objectifiedCustomValidity[propName] =
            customValidity[propName];
    }
    return Object.assign({ badInput: false, customError: false, patternMismatch: false, rangeOverflow: false, rangeUnderflow: false, stepMismatch: false, tooLong: false, tooShort: false, typeMismatch: false, valid: true, valueMissing: false }, objectifiedCustomValidity);
};
/** @soyCompatible */
class TextFieldBase extends FormElement {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCTextFieldFoundation;
        this.value = '';
        this.type = 'text';
        this.placeholder = '';
        this.label = '';
        this.icon = '';
        this.iconTrailing = '';
        this.disabled = false;
        this.required = false;
        this.minLength = -1;
        this.maxLength = -1;
        this.outlined = false;
        this.helper = '';
        this.validateOnInitialRender = false;
        this.validationMessage = '';
        this.autoValidate = false;
        this.pattern = '';
        this.min = '';
        this.max = '';
        /**
         * step can be a number or the keyword "any".
         *
         * Use `String` typing to pass down the value as a string and let the native
         * input cast internally as needed.
         */
        this.step = null;
        this.size = null;
        this.helperPersistent = false;
        this.charCounter = false;
        this.endAligned = false;
        this.prefix = '';
        this.suffix = '';
        this.name = '';
        this.readOnly = false;
        this.autocapitalize = '';
        this.outlineOpen = false;
        this.outlineWidth = 0;
        this.isUiValid = true;
        this.focused = false;
        this._validity = createValidityObj();
        this.validityTransform = null;
    }
    get validity() {
        this._checkValidity(this.value);
        return this._validity;
    }
    get willValidate() {
        return this.formElement.willValidate;
    }
    get selectionStart() {
        return this.formElement.selectionStart;
    }
    get selectionEnd() {
        return this.formElement.selectionEnd;
    }
    focus() {
        const focusEvt = new CustomEvent('focus');
        this.formElement.dispatchEvent(focusEvt);
        this.formElement.focus();
    }
    blur() {
        const blurEvt = new CustomEvent('blur');
        this.formElement.dispatchEvent(blurEvt);
        this.formElement.blur();
    }
    select() {
        this.formElement.select();
    }
    setSelectionRange(selectionStart, selectionEnd, selectionDirection) {
        this.formElement.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
    }
    update(changedProperties) {
        if (changedProperties.has('autoValidate') && this.mdcFoundation) {
            this.mdcFoundation.setValidateOnValueChange(this.autoValidate);
        }
        if (changedProperties.has('value') && typeof this.value !== 'string') {
            this.value = `${this.value}`;
        }
        super.update(changedProperties);
    }
    setFormData(formData) {
        if (this.name) {
            formData.append(this.name, this.value);
        }
    }
    /** @soyTemplate */
    render() {
        const shouldRenderCharCounter = this.charCounter && this.maxLength !== -1;
        const shouldRenderHelperText = !!this.helper || !!this.validationMessage || shouldRenderCharCounter;
        /** @classMap */
        const classes = {
            'mdc-text-field--disabled': this.disabled,
            'mdc-text-field--no-label': !this.label,
            'mdc-text-field--filled': !this.outlined,
            'mdc-text-field--outlined': this.outlined,
            'mdc-text-field--with-leading-icon': this.icon,
            'mdc-text-field--with-trailing-icon': this.iconTrailing,
            'mdc-text-field--end-aligned': this.endAligned,
        };
        return x `
      <label class="mdc-text-field ${o$3(classes)}">
        ${this.renderRipple()}
        ${this.outlined ? this.renderOutline() : this.renderLabel()}
        ${this.renderLeadingIcon()}
        ${this.renderPrefix()}
        ${this.renderInput(shouldRenderHelperText)}
        ${this.renderSuffix()}
        ${this.renderTrailingIcon()}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(shouldRenderHelperText, shouldRenderCharCounter)}
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has('value') &&
            changedProperties.get('value') !== undefined) {
            this.mdcFoundation.setValue(this.value);
            if (this.autoValidate) {
                this.reportValidity();
            }
        }
    }
    /** @soyTemplate */
    renderRipple() {
        return this.outlined ? '' : x `
      <span class="mdc-text-field__ripple"></span>
    `;
    }
    /** @soyTemplate */
    renderOutline() {
        return !this.outlined ? '' : x `
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`;
    }
    /** @soyTemplate */
    renderLabel() {
        return !this.label ?
            '' :
            x `
      <span
          .floatingLabelFoundation=${floatingLabel(this.label)}
          id="label">${this.label}</span>
    `;
    }
    /** @soyTemplate */
    renderLeadingIcon() {
        return this.icon ? this.renderIcon(this.icon) : '';
    }
    /** @soyTemplate */
    renderTrailingIcon() {
        return this.iconTrailing ? this.renderIcon(this.iconTrailing, true) : '';
    }
    /** @soyTemplate */
    renderIcon(icon, isTrailingIcon = false) {
        /** @classMap */
        const classes = {
            'mdc-text-field__icon--leading': !isTrailingIcon,
            'mdc-text-field__icon--trailing': isTrailingIcon
        };
        return x `<i class="material-icons mdc-text-field__icon ${o$3(classes)}">${icon}</i>`;
    }
    /** @soyTemplate */
    renderPrefix() {
        return this.prefix ? this.renderAffix(this.prefix) : '';
    }
    /** @soyTemplate */
    renderSuffix() {
        return this.suffix ? this.renderAffix(this.suffix, true) : '';
    }
    /** @soyTemplate */
    renderAffix(content, isSuffix = false) {
        /** @classMap */
        const classes = {
            'mdc-text-field__affix--prefix': !isSuffix,
            'mdc-text-field__affix--suffix': isSuffix
        };
        return x `<span class="mdc-text-field__affix ${o$3(classes)}">
        ${content}</span>`;
    }
    /** @soyTemplate */
    renderInput(shouldRenderHelperText) {
        const minOrUndef = this.minLength === -1 ? undefined : this.minLength;
        const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
        const autocapitalizeOrUndef = this.autocapitalize ?
            this.autocapitalize :
            undefined;
        const showValidationMessage = this.validationMessage && !this.isUiValid;
        const ariaLabelledbyOrUndef = !!this.label ? 'label' : undefined;
        const ariaControlsOrUndef = shouldRenderHelperText ? 'helper-text' : undefined;
        const ariaDescribedbyOrUndef = this.focused || this.helperPersistent || showValidationMessage ?
            'helper-text' :
            undefined;
        // TODO: live() directive needs casting for lit-analyzer
        // https://github.com/runem/lit-analyzer/pull/91/files
        // TODO: lit-analyzer labels min/max as (number|string) instead of string
        return x `
      <input
          aria-labelledby=${l$2(ariaLabelledbyOrUndef)}
          aria-controls="${l$2(ariaControlsOrUndef)}"
          aria-describedby="${l$2(ariaDescribedbyOrUndef)}"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${l(this.value)}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${l$2(minOrUndef)}"
          maxlength="${l$2(maxOrUndef)}"
          pattern="${l$2(this.pattern ? this.pattern : undefined)}"
          min="${l$2(this.min === '' ? undefined : this.min)}"
          max="${l$2(this.max === '' ? undefined : this.max)}"
          step="${l$2(this.step === null ? undefined : this.step)}"
          size="${l$2(this.size === null ? undefined : this.size)}"
          name="${l$2(this.name === '' ? undefined : this.name)}"
          inputmode="${l$2(this.inputMode)}"
          autocapitalize="${l$2(autocapitalizeOrUndef)}"
          @input="${this.handleInputChange}"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}">`;
    }
    /** @soyTemplate */
    renderLineRipple() {
        return this.outlined ?
            '' :
            x `
      <span .lineRippleFoundation=${lineRipple()}></span>
    `;
    }
    /** @soyTemplate */
    renderHelperText(shouldRenderHelperText, shouldRenderCharCounter) {
        const showValidationMessage = this.validationMessage && !this.isUiValid;
        /** @classMap */
        const classes = {
            'mdc-text-field-helper-text--persistent': this.helperPersistent,
            'mdc-text-field-helper-text--validation-msg': showValidationMessage,
        };
        const ariaHiddenOrUndef = this.focused || this.helperPersistent || showValidationMessage ?
            undefined :
            'true';
        const helperText = showValidationMessage ? this.validationMessage : this.helper;
        return !shouldRenderHelperText ? '' : x `
      <div class="mdc-text-field-helper-line">
        <div id="helper-text"
             aria-hidden="${l$2(ariaHiddenOrUndef)}"
             class="mdc-text-field-helper-text ${o$3(classes)}"
             >${helperText}</div>
        ${this.renderCharCounter(shouldRenderCharCounter)}
      </div>`;
    }
    /** @soyTemplate */
    renderCharCounter(shouldRenderCharCounter) {
        const length = Math.min(this.value.length, this.maxLength);
        return !shouldRenderCharCounter ? '' : x `
      <span class="mdc-text-field-character-counter"
            >${length} / ${this.maxLength}</span>`;
    }
    onInputFocus() {
        this.focused = true;
    }
    onInputBlur() {
        this.focused = false;
        this.reportValidity();
    }
    checkValidity() {
        const isValid = this._checkValidity(this.value);
        if (!isValid) {
            const invalidEvent = new Event('invalid', { bubbles: false, cancelable: true });
            this.dispatchEvent(invalidEvent);
        }
        return isValid;
    }
    reportValidity() {
        const isValid = this.checkValidity();
        this.mdcFoundation.setValid(isValid);
        this.isUiValid = isValid;
        return isValid;
    }
    _checkValidity(value) {
        const nativeValidity = this.formElement.validity;
        let validity = createValidityObj(nativeValidity);
        if (this.validityTransform) {
            const customValidity = this.validityTransform(value, validity);
            validity = Object.assign(Object.assign({}, validity), customValidity);
            this.mdcFoundation.setUseNativeValidation(false);
        }
        else {
            this.mdcFoundation.setUseNativeValidation(true);
        }
        this._validity = validity;
        return this._validity.valid;
    }
    setCustomValidity(message) {
        this.validationMessage = message;
        this.formElement.setCustomValidity(message);
    }
    handleInputChange() {
        this.value = this.formElement.value;
    }
    createAdapter() {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.getRootAdapterMethods()), this.getInputAdapterMethods()), this.getLabelAdapterMethods()), this.getLineRippleAdapterMethods()), this.getOutlineAdapterMethods());
    }
    getRootAdapterMethods() {
        return Object.assign({ registerTextFieldInteractionHandler: (evtType, handler) => this.addEventListener(evtType, handler), deregisterTextFieldInteractionHandler: (evtType, handler) => this.removeEventListener(evtType, handler), registerValidationAttributeChangeHandler: (handler) => {
                const getAttributesList = (mutationsList) => {
                    return mutationsList.map((mutation) => mutation.attributeName)
                        .filter((attributeName) => attributeName);
                };
                const observer = new MutationObserver((mutationsList) => {
                    handler(getAttributesList(mutationsList));
                });
                const config = { attributes: true };
                observer.observe(this.formElement, config);
                return observer;
            }, deregisterValidationAttributeChangeHandler: (observer) => observer.disconnect() }, addHasRemoveClass(this.mdcRoot));
    }
    getInputAdapterMethods() {
        return {
            getNativeInput: () => this.formElement,
            // since HelperTextFoundation is not used, aria-describedby a11y logic
            // is implemented in render method instead of these adapter methods
            setInputAttr: () => undefined,
            removeInputAttr: () => undefined,
            isFocused: () => this.shadowRoot ?
                this.shadowRoot.activeElement === this.formElement :
                false,
            registerInputInteractionHandler: (evtType, handler) => this.formElement.addEventListener(evtType, handler, { passive: evtType in passiveEvents }),
            deregisterInputInteractionHandler: (evtType, handler) => this.formElement.removeEventListener(evtType, handler),
        };
    }
    getLabelAdapterMethods() {
        return {
            floatLabel: (shouldFloat) => this.labelElement &&
                this.labelElement.floatingLabelFoundation.float(shouldFloat),
            getLabelWidth: () => {
                return this.labelElement ?
                    this.labelElement.floatingLabelFoundation.getWidth() :
                    0;
            },
            hasLabel: () => Boolean(this.labelElement),
            shakeLabel: (shouldShake) => this.labelElement &&
                this.labelElement.floatingLabelFoundation.shake(shouldShake),
            setLabelRequired: (isRequired) => {
                if (this.labelElement) {
                    this.labelElement.floatingLabelFoundation.setRequired(isRequired);
                }
            },
        };
    }
    getLineRippleAdapterMethods() {
        return {
            activateLineRipple: () => {
                if (this.lineRippleElement) {
                    this.lineRippleElement.lineRippleFoundation.activate();
                }
            },
            deactivateLineRipple: () => {
                if (this.lineRippleElement) {
                    this.lineRippleElement.lineRippleFoundation.deactivate();
                }
            },
            setLineRippleTransformOrigin: (normalizedX) => {
                if (this.lineRippleElement) {
                    this.lineRippleElement.lineRippleFoundation.setRippleCenter(normalizedX);
                }
            },
        };
    }
    // tslint:disable:ban-ts-ignore
    async getUpdateComplete() {
        var _a;
        // @ts-ignore
        const result = await super.getUpdateComplete();
        await ((_a = this.outlineElement) === null || _a === void 0 ? void 0 : _a.updateComplete);
        return result;
    }
    // tslint:enable:ban-ts-ignore
    firstUpdated() {
        var _a;
        super.firstUpdated();
        this.mdcFoundation.setValidateOnValueChange(this.autoValidate);
        if (this.validateOnInitialRender) {
            this.reportValidity();
        }
        // wait for the outline element to render to update the notch width
        (_a = this.outlineElement) === null || _a === void 0 ? void 0 : _a.updateComplete.then(() => {
            var _a;
            // `foundation.notchOutline()` assumes the label isn't floating and
            // multiplies by a constant, but the label is already is floating at this
            // stage, therefore directly set the outline width to the label width
            this.outlineWidth =
                ((_a = this.labelElement) === null || _a === void 0 ? void 0 : _a.floatingLabelFoundation.getWidth()) || 0;
        });
    }
    getOutlineAdapterMethods() {
        return {
            closeOutline: () => this.outlineElement && (this.outlineOpen = false),
            hasOutline: () => Boolean(this.outlineElement),
            notchOutline: (labelWidth) => {
                const outlineElement = this.outlineElement;
                if (outlineElement && !this.outlineOpen) {
                    this.outlineWidth = labelWidth;
                    this.outlineOpen = true;
                }
            }
        };
    }
    async layout() {
        await this.updateComplete;
        const labelElement = this.labelElement;
        if (!labelElement) {
            this.outlineOpen = false;
            return;
        }
        const shouldFloat = !!this.label && !!this.value;
        labelElement.floatingLabelFoundation.float(shouldFloat);
        if (!this.outlined) {
            return;
        }
        this.outlineOpen = shouldFloat;
        await this.updateComplete;
        /* When the textfield automatically notches due to a value and label
         * being defined, the textfield may be set to `display: none` by the user.
         * this means that the notch is of size 0px. We provide this function so
         * that the user may manually resize the notch to the floated label's
         * width.
         */
        const labelWidth = labelElement.floatingLabelFoundation.getWidth();
        if (this.outlineOpen) {
            this.outlineWidth = labelWidth;
            await this.updateComplete;
        }
    }
}
__decorate([
    i$2('.mdc-text-field')
], TextFieldBase.prototype, "mdcRoot", void 0);
__decorate([
    i$2('input')
], TextFieldBase.prototype, "formElement", void 0);
__decorate([
    i$2('.mdc-floating-label')
], TextFieldBase.prototype, "labelElement", void 0);
__decorate([
    i$2('.mdc-line-ripple')
], TextFieldBase.prototype, "lineRippleElement", void 0);
__decorate([
    i$2('mwc-notched-outline')
], TextFieldBase.prototype, "outlineElement", void 0);
__decorate([
    i$2('.mdc-notched-outline__notch')
], TextFieldBase.prototype, "notchElement", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "value", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "type", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "placeholder", void 0);
__decorate([
    n$4({ type: String }),
    observer(function (_newVal, oldVal) {
        if (oldVal !== undefined && this.label !== oldVal) {
            this.layout();
        }
    })
], TextFieldBase.prototype, "label", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "icon", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "iconTrailing", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true })
], TextFieldBase.prototype, "disabled", void 0);
__decorate([
    n$4({ type: Boolean })
], TextFieldBase.prototype, "required", void 0);
__decorate([
    n$4({ type: Number })
], TextFieldBase.prototype, "minLength", void 0);
__decorate([
    n$4({ type: Number })
], TextFieldBase.prototype, "maxLength", void 0);
__decorate([
    n$4({ type: Boolean, reflect: true }),
    observer(function (_newVal, oldVal) {
        if (oldVal !== undefined && this.outlined !== oldVal) {
            this.layout();
        }
    })
], TextFieldBase.prototype, "outlined", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "helper", void 0);
__decorate([
    n$4({ type: Boolean })
], TextFieldBase.prototype, "validateOnInitialRender", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "validationMessage", void 0);
__decorate([
    n$4({ type: Boolean })
], TextFieldBase.prototype, "autoValidate", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "pattern", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "min", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "max", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "step", void 0);
__decorate([
    n$4({ type: Number })
], TextFieldBase.prototype, "size", void 0);
__decorate([
    n$4({ type: Boolean })
], TextFieldBase.prototype, "helperPersistent", void 0);
__decorate([
    n$4({ type: Boolean })
], TextFieldBase.prototype, "charCounter", void 0);
__decorate([
    n$4({ type: Boolean })
], TextFieldBase.prototype, "endAligned", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "prefix", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "suffix", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "name", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "inputMode", void 0);
__decorate([
    n$4({ type: Boolean })
], TextFieldBase.prototype, "readOnly", void 0);
__decorate([
    n$4({ type: String })
], TextFieldBase.prototype, "autocapitalize", void 0);
__decorate([
    t$1()
], TextFieldBase.prototype, "outlineOpen", void 0);
__decorate([
    t$1()
], TextFieldBase.prototype, "outlineWidth", void 0);
__decorate([
    t$1()
], TextFieldBase.prototype, "isUiValid", void 0);
__decorate([
    t$1()
], TextFieldBase.prototype, "focused", void 0);
__decorate([
    e$5({ passive: true })
], TextFieldBase.prototype, "handleInputChange", null);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles = i$6 `.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-text-field--filled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field--filled .mdc-text-field__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-text-field--filled .mdc-text-field__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field--filled.mdc-ripple-upgraded--unbounded .mdc-text-field__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-activation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-deactivation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0, 0, 0, 0.87)}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.54)}}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.54)}}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}.mdc-text-field__affix{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-text-field--filled:hover .mdc-text-field__ripple::before,.mdc-text-field--filled.mdc-ripple-surface--hover .mdc-text-field__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:whitesmoke}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-text-field--filled:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__ripple::before,.mdc-text-field--outlined .mdc-text-field__ripple::after{background-color:transparent;background-color:var(--mdc-ripple-color, transparent)}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0;transition:none}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px;line-height:1.5rem}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0, 0, 0, 0.38)}@media all{.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.38)}}@media all{.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.38)}}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-floating-label{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--leading{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:GrayText}}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled{background-color:#fafafa}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-text-field-helper-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;opacity:0;will-change:opacity;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field__icon{align-self:center;cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field__icon svg{display:block}.mdc-text-field__icon--leading{margin-left:16px;margin-right:8px}[dir=rtl] .mdc-text-field__icon--leading,.mdc-text-field__icon--leading[dir=rtl]{margin-left:8px;margin-right:16px}.mdc-text-field__icon--trailing{padding:12px;margin-left:0px;margin-right:0px}[dir=rtl] .mdc-text-field__icon--trailing,.mdc-text-field__icon--trailing[dir=rtl]{margin-left:0px;margin-right:0px}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-flex;flex-direction:column;outline:none}.mdc-text-field{width:100%}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42))}.mdc-text-field:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-text-field-hover-line-color, rgba(0, 0, 0, 0.87))}.mdc-text-field.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06);border-bottom-color:var(--mdc-text-field-disabled-line-color, rgba(0, 0, 0, 0.06))}.mdc-text-field.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field__input{direction:inherit}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38) )}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-error-color, var(--mdc-theme-error, #b00020) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}`;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
let TextField = class TextField extends TextFieldBase {
};
TextField.styles = [styles];
TextField = __decorate([
    e$7('mwc-textfield')
], TextField);

const privType = 'Transpower-SLD-Vertices';
const sldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';
const xmlnsNs = 'http://www.w3.org/2000/xmlns/';
const svgNs = 'http://www.w3.org/2000/svg';
const xlinkNs = 'http://www.w3.org/1999/xlink';
const eqTypes = [
    'CAB',
    'CAP',
    'CBR',
    'CTR',
    'DIS',
    'GEN',
    'IFL',
    'LIN',
    'MOT',
    'REA',
    'RES',
    'SAR',
    'SMC',
    'VTR',
];
function isEqType(str) {
    return eqTypes.includes(str);
}
const ringedEqTypes = new Set(['GEN', 'MOT', 'SMC']);
function uuid() {
    const digits = new Array(36);
    for (let i = 0; i < 36; i += 1) {
        if ([8, 13, 18, 23].includes(i))
            digits[i] = '-';
        else
            digits[i] = Math.floor(Math.random() * 16);
    }
    digits[14] = 4;
    digits[19] &= -5;
    digits[19] |= 1 << 3;
    return digits.map(x => x.toString(16)).join('');
}
function xmlBoolean(value) {
    return ['true', '1'].includes(value?.trim() ?? 'false');
}
function isBusBar(element) {
    return (element.tagName === 'Bay' &&
        xmlBoolean(element.querySelector('Section[bus]')?.getAttribute('bus')));
}
function attributes(element) {
    const [x, y, w, h, rotVal, labelX, labelY] = [
        'x',
        'y',
        'w',
        'h',
        'rot',
        'lx',
        'ly',
    ].map(name => parseFloat(element.getAttributeNS(sldNs, name) ?? '0'));
    const pos = [x, y].map(d => Math.max(0, d));
    const dim = [w, h].map(d => Math.max(1, d));
    const label = [labelX, labelY].map(d => Math.max(0, d));
    const bus = xmlBoolean(element.getAttribute('bus'));
    const flip = xmlBoolean(element.getAttributeNS(sldNs, 'flip'));
    const rot = (((rotVal % 4) + 4) % 4);
    return { pos, dim, label, flip, rot, bus };
}
function pathString(...args) {
    return args.join('/');
}
function elementPath(element, ...rest) {
    const pedigree = [];
    let child = element;
    while (child.parentElement && child.hasAttribute('name')) {
        pedigree.unshift(child.getAttribute('name'));
        child = child.parentElement;
    }
    return pathString(...pedigree, ...rest);
}
function collinear(v0, v1, v2) {
    const [[x0, y0], [x1, y1], [x2, y2]] = [v0, v1, v2].map(vertex => ['x', 'y'].map(name => vertex.getAttributeNS(sldNs, name)));
    return (x0 === x1 && x1 === x2) || (y0 === y1 && y1 === y2);
}
function removeNode(node) {
    const edits = [];
    if (xmlBoolean(node.querySelector(`Section[bus]`)?.getAttribute('bus'))) {
        Array.from(node.querySelectorAll('Section:not([bus])')).forEach(section => edits.push({ node: section }));
        const sections = Array.from(node.querySelectorAll('Section[bus]'));
        const busSection = sections[0];
        Array.from(busSection.children)
            .slice(1)
            .forEach(vertex => edits.push({ node: vertex }));
        const lastVertex = sections[sections.length - 1].lastElementChild;
        if (lastVertex)
            edits.push({ parent: busSection, node: lastVertex, reference: null });
        sections.slice(1).forEach(section => edits.push({ node: section }));
    }
    else
        edits.push({ node });
    Array.from(node.ownerDocument.querySelectorAll(`Terminal[connectivityNode="${node.getAttribute('pathName')}"]`)).forEach(terminal => edits.push({ node: terminal }));
    return edits;
}
function reverseSection(section) {
    const edits = [];
    Array.from(section.children)
        .reverse()
        .forEach(vertex => edits.push({ parent: section, node: vertex, reference: null }));
    return edits;
}
function healSectionCut(cut) {
    const [x, y] = ['x', 'y'].map(name => cut.getAttributeNS(sldNs, name));
    const isCut = (vertex) => vertex !== cut &&
        vertex.getAttributeNS(sldNs, 'x') === x &&
        vertex.getAttributeNS(sldNs, 'y') === y;
    const cutVertices = Array.from(cut.closest('Private').getElementsByTagNameNS(sldNs, 'Section')).flatMap(section => Array.from(section.children).filter(isCut));
    const cutSections = cutVertices.map(v => v.parentElement);
    if (cutSections.length > 2)
        return [];
    if (cutSections.length < 2)
        return removeNode(cut.closest('ConnectivityNode'));
    const [busA, busB] = cutSections.map(section => xmlBoolean(section.getAttribute('bus')));
    if (busA !== busB)
        return [];
    const edits = [];
    const [sectionA, sectionB] = cutSections;
    if (isCut(sectionA.firstElementChild))
        edits.push(reverseSection(sectionA));
    const sectionBChildren = Array.from(sectionB.children);
    if (isCut(sectionB.lastElementChild))
        sectionBChildren.reverse();
    sectionBChildren
        .slice(1)
        .forEach(node => edits.push({ parent: sectionA, node, reference: null }));
    const cutA = Array.from(sectionA.children).find(isCut);
    const neighbourA = isCut(sectionA.firstElementChild)
        ? sectionA.children[1]
        : sectionA.children[sectionA.childElementCount - 2];
    const neighbourB = sectionBChildren[1];
    if (neighbourA &&
        cutA &&
        neighbourB &&
        collinear(neighbourA, cutA, neighbourB))
        edits.push({ node: cutA });
    edits.push({ node: sectionB });
    return edits;
}
function updateTerminals(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
parent, cNode, substationName, voltageLevelName, bayName, cNodeName, connectivityNode) {
    const updates = [];
    const oldPathName = cNode.getAttribute('pathName');
    if (!oldPathName)
        return [];
    const [oldSubstationName, oldVoltageLevelName, oldBayName, oldCNodeName] = oldPathName.split('/');
    const terminals = Array.from(cNode.getRootNode().querySelectorAll(`Terminal[substationName="${oldSubstationName}"][voltageLevelName="${oldVoltageLevelName}"][bayName="${oldBayName}"][cNodeName="${oldCNodeName}"], Terminal[connectivityNode="${oldPathName}"]`));
    terminals.forEach(terminal => {
        updates.push({
            element: terminal,
            attributes: {
                substationName,
                voltageLevelName,
                bayName,
                connectivityNode,
                cNodeName,
            },
        });
    });
    return updates;
}
function updateConnectivityNodes(element, parent, name) {
    const updates = [];
    const cNodes = Array.from(element.getElementsByTagName('ConnectivityNode'));
    if (element.tagName === 'ConnectivityNode')
        cNodes.push(element);
    const substationName = parent.closest('Substation').getAttribute('name');
    let voltageLevelName = parent.closest('VoltageLevel')?.getAttribute('name');
    if (element.tagName === 'VoltageLevel')
        voltageLevelName = name;
    cNodes.forEach(cNode => {
        let cNodeName = cNode.getAttribute('name');
        if (element === cNode)
            cNodeName = name;
        let bayName = cNode.parentElement?.getAttribute('name') ?? '';
        if (element.tagName === 'Bay')
            bayName = name;
        if (parent.tagName === 'Bay' && parent.hasAttribute('name'))
            bayName = parent.getAttribute('name');
        if (cNodeName && bayName) {
            const pathName = `${substationName}/${voltageLevelName}/${bayName}/${cNodeName}`;
            updates.push({
                element: cNode,
                attributes: {
                    pathName,
                },
            });
            if (substationName && voltageLevelName && bayName)
                updates.push(...updateTerminals(parent, cNode, substationName, voltageLevelName, bayName, cNodeName, pathName));
        }
    });
    return updates;
}
function uniqueName(element, parent) {
    const children = Array.from(parent.children);
    const oldName = element.getAttribute('name');
    if (oldName &&
        !children.find(child => child.getAttribute('name') === oldName))
        return oldName;
    const baseName = element.getAttribute('name')?.replace(/[0-9]*$/, '') ??
        element.getAttribute('type') ??
        element.tagName.charAt(0);
    let index = 1;
    function hasName(child) {
        return child.getAttribute('name') === baseName + index.toString();
    }
    while (children.find(hasName))
        index += 1;
    return baseName + index.toString();
}
function reparentElement(element, parent) {
    const edits = [];
    edits.push({
        node: element,
        parent,
        reference: getReference(parent, element.tagName),
    });
    const newName = uniqueName(element, parent);
    if (newName !== element.getAttribute('name'))
        edits.push({ element, attributes: { name: newName } });
    edits.push(...updateConnectivityNodes(element, parent, newName));
    return edits;
}
function removeTerminal(terminal) {
    const edits = [];
    edits.push({ node: terminal });
    const pathName = terminal.getAttribute('connectivityNode');
    const cNode = terminal.ownerDocument.querySelector(`ConnectivityNode[pathName="${pathName}"]`);
    const otherTerminals = Array.from(terminal.ownerDocument.querySelectorAll(`Terminal[connectivityNode="${pathName}"]`)).filter(t => t !== terminal);
    if (cNode &&
        otherTerminals.length &&
        otherTerminals.some(t => t.closest('Bay')) &&
        otherTerminals.every(t => t.closest('Bay') !== cNode.closest('Bay')) &&
        !isBusBar(cNode.closest('Bay'))) {
        const newParent = otherTerminals
            .find(t => t.closest('Bay'))
            .closest('Bay');
        if (newParent)
            edits.push(...reparentElement(cNode, newParent));
    }
    const priv = cNode?.querySelector(`Private[type="${privType}"]`);
    const vertex = priv?.querySelector(`Vertex[*|uuid="${terminal.getAttributeNS(sldNs, 'uuid')}"]`);
    const section = vertex?.parentElement;
    if (!section)
        return edits;
    edits.push({ node: section });
    const cut = vertex === section.lastElementChild
        ? section.firstElementChild
        : section.lastElementChild;
    if (cut)
        edits.push(...healSectionCut(cut));
    return edits;
}
function connectionStartPoints(equipment) {
    const { pos: [x, y], rot, } = attributes(equipment);
    const top = {
        close: [
            [x + 0.5, y],
            [x + 1, y + 0.5],
            [x + 0.5, y + 1],
            [x, y + 0.5],
        ][rot],
        far: [
            [x + 0.5, y - 0.5],
            [x + 1.5, y + 0.5],
            [x + 0.5, y + 1.5],
            [x - 0.5, y + 0.5],
        ][rot],
    };
    const bottom = {
        close: [
            [x + 0.5, y + 1],
            [x, y + 0.5],
            [x + 0.5, y],
            [x + 1, y + 0.5],
        ][rot],
        far: [
            [x + 0.5, y + 1.5],
            [x - 0.5, y + 0.5],
            [x + 0.5, y - 0.5],
            [x + 1.5, y + 0.5],
        ][rot],
    };
    return { top, bottom };
}
function newResizeEvent(detail) {
    return new CustomEvent('oscd-sld-resize', {
        bubbles: true,
        composed: true,
        detail,
    });
}
function newPlaceEvent(detail) {
    return new CustomEvent('oscd-sld-place', {
        bubbles: true,
        composed: true,
        detail,
    });
}
function newPlaceLabelEvent(detail) {
    return new CustomEvent('oscd-sld-place-label', {
        bubbles: true,
        composed: true,
        detail,
    });
}
function newConnectEvent(detail) {
    return new CustomEvent('oscd-sld-connect', {
        bubbles: true,
        composed: true,
        detail,
    });
}
function newRotateEvent(detail) {
    return new CustomEvent('oscd-sld-rotate', {
        bubbles: true,
        composed: true,
        detail,
    });
}
function newStartResizeEvent(detail) {
    return new CustomEvent('oscd-sld-start-resize', {
        bubbles: true,
        composed: true,
        detail,
    });
}
function newStartPlaceEvent(detail) {
    return new CustomEvent('oscd-sld-start-place', {
        bubbles: true,
        composed: true,
        detail,
    });
}
function newStartPlaceLabelEvent(detail) {
    return new CustomEvent('oscd-sld-start-place-label', {
        bubbles: true,
        composed: true,
        detail,
    });
}
function newStartConnectEvent(detail) {
    return new CustomEvent('oscd-sld-start-connect', {
        bubbles: true,
        composed: true,
        detail,
    });
}

const resizePath = b `<path
  d="M120 616v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-640v-80h80v80h-80Zm160 640v-80h80v80h-80Zm160 0v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160V296H600v-80h240v240h-80ZM120 936V696h80v160h160v80H120Z"
/>`;
const movePath = b `<path d="M480 976 310 806l57-57 73 73V616l-205-1 73 73-58 58L80 576l169-169 57 57-72 72h206V330l-73 73-57-57 170-170 170 170-57 57-73-73v206l205 1-73-73 58-58 170 170-170 170-57-57 73-73H520l-1 205 73-73 58 58-170 170Z"/>`;
const voltageLevelPath = b `<path
    d="M 4 4 L 12.5 21 L 21 4"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linejoin="round"
    stroke-linecap="round"
  />`;
const bayPath = b `<path
    d="M 3 2 L 22 2"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 3 5 L 22 5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 7 2 L 7 7.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 18 5 L 18 7.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 5.5 8.5 L 7 11 L 7 13 L 18 13 L 18 11 L 16.5 8.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 12.5 13 L 12.5 15"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 11 16 L 12.5 18.5 L 12.5 23"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 10.5 21 L 12.5 23 L 14.5 21"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />`;
const voltageLevelIcon = x `<svg
  id="VoltageLevel"
  viewBox="0 0 25 25"
  width="24"
  height="24"
  slot="icon"
>
  ${voltageLevelPath}
</svg>`;
const voltageLevelGraphic = x `<svg
  id="VoltageLevel"
  viewBox="0 0 25 25"
  width="24"
  height="24"
  slot="graphic"
>
  ${voltageLevelPath}
</svg>`;
const bayIcon = x `<svg
  id="Bay"
  viewBox="0 0 25 25"
  width="24"
  height="24"
  slot="icon"
>
  ${bayPath}
</svg>`;
const bayGraphic = x `<svg
  id="Bay"
  viewBox="0 0 25 25"
  width="24"
  height="24"
  slot="graphic"
>
  ${bayPath}
</svg>`;
const equipmentPaths = {
    CAB: b `
  <path
    d="M 12.5,0 V 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="M 9.4,4.2 H 15.6 L 12.5,8.3 Z"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="m 12.5,8.3 v 9"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="m 9.4,21.3 h 6.2 l -3.1,-4.1 z"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="m 12.5,21.3 v 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  `,
    CAP: b `
  <path
    d="M 6.5,10.1 H 18.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="M 12.5,0 V 10.1"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="M 6.5,14.9 H 18.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="M 12.5,14.9 V 25"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  `,
    CBR: b `
  <line
    x1="12.5"
    y1="0"
    x2="12.5"
    y2="4"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="12.5"
    y1="25"
    x2="12.5"
    y2="21"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="12.5"
    y1="21"
    x2="4"
    y2="5"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="9.5"
    y1="1"
    x2="15.5"
    y2="7"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="9.5"
    y1="7"
    x2="15.5"
    y2="1"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
    CTR: b `
  <line
    x1="12.5"
    y1="0"
    x2="12.5"
    y2="25"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <circle
    cx="12.5"
    cy="12.5"
    r="7.5"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
    DIS: b `
  <path
    d="M 12.5 0 L 12.5 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d=" M 12.5 25 L 12.5 21"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="M 12.5 21 L 4 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="M 8 4 L 17 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
    GEN: b `
  <path
    d="m 16.2,12.5 v 4.2 q -0.2,0.2 -0.6,0.6 -0.4,0.4 -1.1,0.7 -0.7,0.3 -1.8,0.3 -1.8,0 -2.9,-1.2 -1.1,-1.2 -1.1,-3.6 v -2.1 q 0,-2.4 1,-3.6 1,-1.1 2.9,-1.1 1.7,0 2.6,0.9 0.9,0.9 1,2.6 h -1.4 q -0.1,-1.1 -0.6,-1.6 -0.5,-0.6 -1.5,-0.6 -1.3,0 -1.8,0.9 -0.5,0.9 -0.5,2.6 v 2.1 q 0,1.8 0.7,2.7 0.7,0.9 1.9,0.9 1,0 1.4,-0.3 0.4,-0.3 0.6,-0.5 v -2.6 h -2.1 v -1.2 z"
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0.3"
    stroke-linecap="round"
  />
  `,
    IFL: b `
  <path
    d="M 12.5 0 L 12.5 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="M 12.5 25 L 12.5 21"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <polygon
    points="4,4 12.5,21 21,4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  `,
    LIN: b `
  <path
    d="M 12.5,0 V 25"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="m 10.3,12.5 4.3,-2.5"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="m 10.3,15 4.3,-2.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
    MOT: b `
  <path
    d="m 12.5,15.5 2.3,-7.8 h 1.4 v 9.6 h -1.1 v -3.7 l 0.1,-3.7 -2.3,7.4 h -0.9 L 9.8,9.8 9.9,13.6 v 3.7 H 8.8 V 7.7 h 1.4 z"
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0.3"
    stroke-linecap="round"
  />
  `,
    REA: b `
  <path
    d="m 4.5,12.5 h 8 V 0"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="m 4.5,12.5 a 8,8 0 0 1 8,-8 8,8 0 0 1 8,8 8,8 0 0 1 -8,8"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="M 12.5,20.5 V 25"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
    RES: b `
  <path
    d="M 12.5,0 V 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="m 12.5 25 v -4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <rect
    y="4"
    x="8.5"
    height="17"
    width="8"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
    SAR: b `
  <path
    d="M 12.5,0 V 8"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="m 12.5,21 v 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="10"
    y1="24.25"
    x2="15"
    y2="24.25"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="M 11.2,8 12.5,11 13.8,8 Z"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
  />
  <rect
    y="4"
    x="8.5"
    height="17"
    width="8"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
    SMC: b `
  <path
    d="m 16.6,12.5 c -0.7,1.4 -1.3,2.8 -2.1,2.8 -1.5,0 -2.6,-5.6 -4.1,-5.6 -0.7,0 -1.4,1.4 -2.1,2.8"
    stroke="currentColor"
    fill="none"
    stroke-width="1.2"
    stroke-linecap="round"
  />
  `,
    VTR: b `
  <line
    x1="12.5"
    y1="0"
    x2="12.5"
    y2="5"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <circle
    cx="12.5"
    cy="10"
    r="5"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <circle
    cx="12.5"
    cy="15"
    r="5"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
`,
};
const eqRingPath = b `
  <path
    d="M 12.5,0 V 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <circle
    cx="12.5"
    cy="12.5"
    r="8.5"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `;
const defaultEquipmentPath = b `
  <circle
    cx="12.5"
    cy="12.5"
    r="11"
    stroke-width="1.5"
    stroke="currentColor"
    fill="none"
  />
  <path
    d=" M 7.5 17.5
    L 12 13
    Z"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="	M 11 7
      L 10 8
      C 5 13, 11 20, 17 15
      L 18 14
      Z"
    fill="currentColor"
    stroke="currentColor"
    stroke-linejoin="round"
  />
  <path
    d=" M 13 9
    L 16 6
    Z"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d=" M 16 12
    L 19 9
    Z"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
`;
function equipmentPath(equipmentType) {
    if (equipmentType && isEqType(equipmentType))
        return equipmentPaths[equipmentType];
    return defaultEquipmentPath;
}
function equipmentGraphic(equipmentType) {
    return x `<svg
    id="${equipmentType}"
    viewBox="0 0 25 25"
    width="24"
    height="24"
    slot="graphic"
  >
    ${equipmentPath(equipmentType)}
    ${equipmentType && ringedEqTypes.has(equipmentType) ? eqRingPath : A}
  </svg>`;
}
function equipmentIcon(equipmentType) {
    return x `<svg
    id="${equipmentType}"
    viewBox="0 0 25 25"
    width="24"
    height="24"
    slot="icon"
  >
    ${equipmentPath(equipmentType)}
    ${ringedEqTypes.has(equipmentType) ? eqRingPath : A}
  </svg>`;
}
function equipmentSymbol(equipmentType) {
    return b `<symbol
    id="${equipmentType}"
    viewBox="0 0 25 25"
    width="1" height="1"
  >
    ${equipmentPath(equipmentType)}
  </symbol>`;
}
const connectivityNodeMarker = b `<marker
  markerWidth="3" markerHeight="3"
  refX="12.5" refY="12.5"
  viewBox="0 0 25 25"
  id="circle"
>
  <circle
    fill="black"
    cx="12.5"
    cy="12.5"
    r="12.5"
  />
</marker>`;
const groundedMarker = b `<marker
  markerWidth="20" markerHeight="20"
  refX="12.5" refY="12.5"
  viewBox="0 0 25 25"
  id="grounded"
  orient="auto-start-reverse"
>
  <line
    y1="17"
    y2="8"
    x1="12.5"
    x2="12.5"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width="1.5"
  />
  <line
    y1="15.5"
    y2="9.5"
    x1="14.7"
    x2="14.7"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width="1.5"
  />
  <line
    y1="14.5"
    y2="10.5"
    x1="16.8"
    x2="16.8"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width="1.5"
  />
</marker>`;
b `<symbol
  id="PTR"
  viewBox="0 0 25 25"
  width="1" height="1"
>
  <line
    x1="12.5"
    y1="2"
    x2="12.5"
    y2="5"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <circle
    cx="12.5"
    cy="10"
    r="5"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <circle
    cx="12.5"
    cy="15"
    r="5"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="12.5"
    y1="20"
    x2="12.5"
    y2="23"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
</symbol>`;
const symbols = b `
  <defs>
  <pattern id="halfgrid" patternUnits="userSpaceOnUse" width="1" height="1" viewBox="0 0 1 1">
  <circle cx="0.1" cy="0.8" r="0.035" fill="#888" opacity="0.3" />
  <circle cx="0.6" cy="0.3" r="0.035" fill="#888" opacity="0.3" />
  <circle cx="0.1" cy="0.3" r="0.035" fill="#888" opacity="0.3" />
  <circle cx="0.6" cy="0.8" r="0.035" fill="#888" opacity="0.3" />
  </pattern>
  <pattern id="grid" patternUnits="userSpaceOnUse" width="1" height="1" viewBox="0 0 1 1">
  <line x1="0" y1="0" x2="0" y2="1" stroke="#888" stroke-opacity="0.3" stroke-width="0.06" />
  <line x1="0" y1="0" x2="1" y2="0" stroke="#888" stroke-opacity="0.3" stroke-width="0.06" />
  <line x1="1" y1="0" x2="1" y2="1" stroke="#888" stroke-opacity="0.3" stroke-width="0.06" />
  <line x1="0" y1="1" x2="1" y2="1" stroke="#888" stroke-opacity="0.3" stroke-width="0.06" />
  </pattern>
  ${eqTypes.map(eqType => equipmentSymbol(eqType))}
  ${equipmentSymbol('ConductingEquipment')}
  ${connectivityNodeMarker}
  ${groundedMarker}
  </defs>
`;

const parentTags = {
    ConductingEquipment: 'Bay',
    Bay: 'VoltageLevel',
    VoltageLevel: 'Substation',
};
const singleTerminal = new Set([
    'BAT',
    'EFN',
    'FAN',
    'GEN',
    'IFL',
    'MOT',
    'PMP',
    'RRC',
    'SAR',
    'SMC',
    'VTR',
]);
function newEditWizardEvent(element) {
    return new CustomEvent('oscd-edit-wizard-request', {
        bubbles: true,
        composed: true,
        detail: { element },
    });
}
function contains([x1, y1, w1, h1], [x2, y2, w2, h2]) {
    return x1 <= x2 && y1 <= y2 && x1 + w1 >= x2 + w2 && y1 + h1 >= y2 + h2;
}
function overlaps([x1, y1, w1, h1], [x2, y2, w2, h2]) {
    if (x1 >= x2 + w2 || x2 >= x1 + w1)
        return false;
    if (y1 >= y2 + h2 || y2 >= y1 + h1)
        return false;
    return true;
}
function containsRect(element, x0, y0, w0, h0) {
    const { pos: [x, y], dim: [w, h], } = attributes(element);
    return contains([x, y, w, h], [x0, y0, w0, h0]);
}
function overlapsRect(element, x0, y0, w0, h0) {
    const { pos: [x, y], dim: [w, h], } = attributes(element);
    return overlaps([x, y, w, h], [x0, y0, w0, h0]);
}
function cleanPath(path) {
    let i = path.length - 2;
    while (i > 0) {
        const [x, y] = path[i];
        const [nx, ny] = path[i + 1];
        const [px, py] = path[i - 1];
        if ((x === nx && y === ny) ||
            (x === nx && x === px) ||
            (y === ny && y === py))
            path.splice(i, 1);
        i -= 1;
    }
}
function isBay(element) {
    return element.tagName === 'Bay' && !isBusBar(element);
}
function preventDefault(e) {
    e.preventDefault();
}
function copy(element, nsp) {
    const clone = element.cloneNode(true);
    const terminals = new Set(Array.from(element.querySelectorAll('Terminal')));
    const cNodes = new Set(Array.from(element.querySelectorAll('ConnectivityNode')));
    terminals.forEach(terminal => {
        const cNode = element.ownerDocument.querySelector(`ConnectivityNode[pathName="${terminal.getAttribute('connectivityNode')}"]`);
        if (cNode)
            cNodes.add(cNode);
    });
    const foreignCNodes = new Set();
    cNodes.forEach(cNode => {
        const foreignTerminal = Array.from(element.ownerDocument.querySelectorAll(`Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`)).find(terminal => !terminals.has(terminal));
        if (foreignTerminal ||
            (isBusBar(cNode.closest('Bay')) &&
                cNode.closest(element.tagName) !== element))
            foreignCNodes.add(cNode);
    });
    foreignCNodes.forEach(cNode => {
        if (cNode.closest(element.tagName) === element) {
            if (isBusBar(cNode.closest('Bay')))
                clone
                    .querySelector(`ConnectivityNode[pathName="${cNode.getAttribute('pathName')}"]`)
                    ?.closest('Bay')
                    ?.remove();
            else
                clone
                    .querySelector(`ConnectivityNode[pathName="${cNode.getAttribute('pathName')}"]`)
                    ?.remove();
        }
        terminals.forEach(terminal => {
            if (terminal.getAttribute('connectivityNode') ===
                cNode.getAttribute('pathName'))
                clone
                    .querySelector(`[*|uuid="${terminal.getAttributeNS(sldNs, 'uuid')}"]`)
                    ?.remove();
        });
    });
    Array.from(clone.querySelectorAll('Terminal')).forEach(terminal => {
        const oldUUID = terminal.getAttributeNS(sldNs, 'uuid');
        if (!oldUUID)
            return;
        const newUUID = uuid();
        Array.from(clone.querySelectorAll(`Vertex[*|uuid="${oldUUID}"`)).forEach(vertex => vertex.setAttributeNS(sldNs, `${nsp}:uuid`, newUUID));
        terminal.setAttributeNS(sldNs, `${nsp}:uuid`, newUUID);
    });
    return clone;
}
function renderMenuFooter(element) {
    const name = element.getAttribute('name');
    let detail = element.getAttribute('desc');
    const type = element.getAttribute('type');
    if (type) {
        if (detail)
            detail = x `${type} &mdash; ${detail}`;
        else
            detail = type;
    }
    let footerGraphic = equipmentGraphic(null);
    if (element.tagName === 'ConductingEquipment')
        footerGraphic = equipmentGraphic(element.getAttribute('type'));
    else if (element.tagName === 'Bay' && isBusBar(element))
        footerGraphic = x `<mwc-icon slot="graphic">horizontal_rule</mwc-icon>`;
    else if (element.tagName === 'Bay')
        footerGraphic = bayGraphic;
    else if (element.tagName === 'VoltageLevel')
        footerGraphic = voltageLevelGraphic;
    return x `<mwc-list-item
    ?twoline=${!!detail}
    graphic="avatar"
    noninteractive
  >
    <span>${name}</span>
    ${detail
        ? x `<span
          slot="secondary"
          style="display: inline-block; max-width: 15em; overflow: hidden; text-overflow: ellipsis;"
        >
          ${detail}
        </span>`
        : A}
    ${footerGraphic}
  </mwc-list-item>`;
}
let SLDEditor = class SLDEditor extends s$2 {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.gridSize = 32;
        this.nsp = 'esld';
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseX2 = 0;
        this.mouseY2 = 0;
        this.coordinatesRef = e();
        this.handleKeydown = ({ key }) => {
            if (key === 'Escape')
                this.menu = undefined;
        };
        this.handleClick = (e) => {
            if (this.menu &&
                !e
                    .composedPath()
                    .find(elm => 'id' in elm && elm.id === 'sld-context-menu')) {
                e.stopImmediatePropagation();
                this.menu = undefined;
            }
        };
    }
    positionCoordinates(e) {
        const coordinatesDiv = this.coordinatesRef?.value;
        if (coordinatesDiv) {
            coordinatesDiv.style.top = `${e.clientY}px`;
            coordinatesDiv.style.left = `${e.clientX + 16}px`;
        }
    }
    openMenu(element, e) {
        if (!this.placing &&
            !this.resizing &&
            !this.placingLabel &&
            !this.connecting)
            this.menu = { element, left: e.clientX, top: e.clientY };
        e.preventDefault();
    }
    svgCoordinates(clientX, clientY) {
        const p = new DOMPoint(clientX, clientY);
        const { x, y } = p.matrixTransform(this.sld.getScreenCTM().inverse());
        return [x, y].map(coord => Math.max(0, coord));
    }
    canPlaceAt(element, x, y, w, h) {
        if (element.tagName === 'Substation')
            return true;
        const overlappingSibling = Array.from(this.substation.querySelectorAll(element.tagName)).find(sibling => sibling !== element &&
            overlapsRect(sibling, x, y, w, h) &&
            !isBusBar(sibling));
        if (overlappingSibling && !isBusBar(element)) {
            return false;
        }
        const containingParent = element.tagName === 'VoltageLevel'
            ? containsRect(this.substation, x, y, w, h)
            : Array.from(this.substation.querySelectorAll(parentTags[element.tagName])).find(parent => !isBusBar(parent) && containsRect(parent, x, y, w, h));
        if (containingParent)
            return true;
        return false;
    }
    canResizeTo(element, w, h) {
        const { pos: [x, y], dim: [oldW, oldH], } = attributes(element);
        if (!this.canPlaceAt(element, x, y, w, h) &&
            this.canPlaceAt(element, x, y, oldW, oldH))
            return false;
        const lostChild = Array.from(element.children).find(child => {
            if (parentTags[child.tagName] !== element.tagName)
                return false;
            const { pos: [cx, cy], dim: [cw, ch], } = attributes(child);
            return !contains([x, y, w, h], [cx, cy, cw, ch]);
        });
        if (lostChild)
            return false;
        return true;
    }
    renderedLabelPosition(element) {
        let { label: [x, y], } = attributes(element);
        if (this.placing &&
            element.closest(this.placing.tagName) === this.placing) {
            const { pos: [parentX, parentY], } = attributes(this.placing);
            x += this.mouseX - parentX;
            y += this.mouseY - parentY;
        }
        if (this.placingLabel === element) {
            x = this.mouseX2;
            y = this.mouseY2 + 0.5;
        }
        return [x, y];
    }
    renderedPosition(element) {
        let { pos: [x, y], } = attributes(element);
        if (this.placing &&
            element.closest(this.placing.tagName) === this.placing) {
            const { pos: [parentX, parentY], } = attributes(this.placing);
            x += this.mouseX - parentX;
            y += this.mouseY - parentY;
        }
        return [x, y];
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('click', this.handleClick, true);
        window.addEventListener('click', this.positionCoordinates);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('click', this.handleClick);
        window.removeEventListener('click', this.positionCoordinates);
    }
    nearestOpenTerminal(equipment) {
        if (!equipment)
            return undefined;
        const topTerminal = equipment.querySelector('Terminal[name="T1"]');
        const bottomTerminal = equipment.querySelector('Terminal:not([name="T1"])');
        const oneSided = singleTerminal.has(equipment.getAttribute('type'));
        if (topTerminal && bottomTerminal)
            return undefined;
        if (oneSided && (topTerminal || bottomTerminal))
            return undefined;
        if (oneSided)
            return 'top';
        if (topTerminal)
            return 'bottom';
        if (bottomTerminal)
            return 'top';
        const [mX2, mY2] = [this.mouseX2, this.mouseY2].map(n => n % 1);
        const { rot } = attributes(equipment);
        if (rot === 0 && mY2 === 0.5)
            return 'bottom';
        if (rot === 1 && mX2 === 0)
            return 'bottom';
        if (rot === 2 && mY2 === 0)
            return 'bottom';
        if (rot === 3 && mX2 === 0.5)
            return 'bottom';
        return 'top';
    }
    groundTerminal(equipment, name) {
        const bay = equipment.closest('Bay');
        const edits = [];
        let grounded = bay.querySelector(':scope > ConnectivityNode[name="grounded"]');
        let pathName = grounded?.getAttribute('pathName');
        if (!pathName) {
            pathName = elementPath(equipment.closest('Bay'), 'grounded');
            grounded = this.doc.createElementNS(this.doc.documentElement.namespaceURI, 'ConnectivityNode');
            grounded.setAttribute('name', 'grounded');
            grounded.setAttribute('pathName', pathName);
            edits.push({
                parent: bay,
                node: grounded,
                reference: getReference(bay, 'ConnectivityNode'),
            });
        }
        const terminal = this.doc.createElementNS(this.doc.documentElement.namespaceURI, 'Terminal');
        terminal.setAttribute('name', name);
        terminal.setAttribute('cNodeName', 'grounded');
        const sName = equipment.closest('Substation').getAttribute('name');
        if (sName)
            terminal.setAttribute('substationName', sName);
        const vlName = equipment.closest('VoltageLevel').getAttribute('name');
        if (vlName)
            terminal.setAttribute('voltageLevelName', vlName);
        const bName = equipment.closest('Bay').getAttribute('name');
        if (bName)
            terminal.setAttribute('bayName', bName);
        terminal.setAttribute('connectivityNode', pathName);
        edits.push({
            parent: equipment,
            node: terminal,
            reference: getReference(equipment, 'Terminal'),
        });
        this.dispatchEvent(newEditEventV2(edits));
    }
    flipElement(element) {
        const { flip } = attributes(element);
        this.dispatchEvent(newEditEventV2({
            element,
            attributes: {
                [`${this.nsp}:flip`]: flip ? null : 'true',
            },
        }));
    }
    equipmentMenuItems(equipment) {
        const items = [
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Mirror</span>
          <mwc-icon slot="graphic">flip</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.flipElement(equipment),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Rotate</span>
          <mwc-icon slot="graphic">rotate_90_degrees_cw</mwc-icon>
        </mwc-list-item>`,
                handler: () => {
                    this.dispatchEvent(newRotateEvent(equipment));
                },
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Copy</span>
          <mwc-icon slot="graphic">copy_all</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartPlaceEvent(copy(equipment, this.nsp))),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Move</span>
          <svg
            xmlns="${svgNs}"
            height="24"
            width="24"
            slot="graphic"
            viewBox="0 96 960 960"
          >
            ${movePath}
          </svg>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartPlaceEvent(equipment)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Move Label</span>
          <mwc-icon slot="graphic">text_rotation_none</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartPlaceLabelEvent(equipment)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Edit</span>
          <mwc-icon slot="graphic">edit</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newEditWizardEvent(equipment)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Delete</span>
          <mwc-icon slot="graphic">delete</mwc-icon>
        </mwc-list-item>`,
                handler: () => {
                    const edits = [];
                    Array.from(equipment.querySelectorAll('Terminal')).forEach(terminal => edits.push(...removeTerminal(terminal)));
                    edits.push({ node: equipment });
                    this.dispatchEvent(newEditEventV2(edits));
                },
            },
        ];
        const { rot } = attributes(equipment);
        const icons = {
            connect: ['north', 'east', 'south', 'west'],
            ground: ['expand_less', 'chevron_right', 'expand_more', 'chevron_left'],
            disconnect: [
                'arrow_drop_up',
                'arrow_right',
                'arrow_drop_down',
                'arrow_left',
            ],
        };
        const texts = {
            connect: [
                'Connect top',
                'Connect right',
                'Connect bottom',
                'Connect left',
            ],
            ground: ['Ground top', 'Ground right', 'Ground bottom', 'Ground left'],
            disconnect: [
                'Detach top',
                'Detach right',
                'Detach bottom',
                'Detach left',
            ],
        };
        const icon = (kind, top) => icons[kind][top ? rot % 4 : (rot + 2) % 4];
        const text = (kind, top) => texts[kind][top ? rot % 4 : (rot + 2) % 4];
        const item = (kind, top) => x `<mwc-list-item graphic="icon">
        <span>${text(kind, top)}</span>
        <mwc-icon slot="graphic">${icon(kind, top)}</mwc-icon>
      </mwc-list-item>`;
        const topTerminal = equipment.querySelector('Terminal[name="T1"]');
        const bottomTerminal = equipment.querySelector('Terminal:not([name="T1"])');
        if (!singleTerminal.has(equipment.getAttribute('type'))) {
            if (bottomTerminal)
                items.unshift({
                    handler: () => this.dispatchEvent(newEditEventV2(removeTerminal(bottomTerminal))),
                    content: item('disconnect', false),
                });
            else
                items.unshift({
                    handler: () => this.dispatchEvent(newStartConnectEvent({
                        equipment,
                        terminal: 'bottom',
                    })),
                    content: item('connect', false),
                }, {
                    handler: () => this.groundTerminal(equipment, 'T2'),
                    content: item('ground', false),
                });
        }
        if (topTerminal)
            items.unshift({
                handler: () => this.dispatchEvent(newEditEventV2(removeTerminal(topTerminal))),
                content: item('disconnect', true),
            });
        else
            items.unshift({
                handler: () => this.dispatchEvent(newStartConnectEvent({ equipment, terminal: 'top' })),
                content: item('connect', true),
            }, {
                handler: () => this.groundTerminal(equipment, 'T1'),
                content: item('ground', true),
            });
        return items;
    }
    busBarMenuItems(busBar) {
        const items = [
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Resize</span>
          <svg
            xmlns="${svgNs}"
            slot="graphic"
            width="24"
            height="24"
            viewBox="0 96 960 960"
          >
            ${resizePath}
          </svg>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartResizeEvent(busBar)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Move</span>
          <svg
            xmlns="${svgNs}"
            height="24"
            width="24"
            slot="graphic"
            viewBox="0 96 960 960"
          >
            ${movePath}
          </svg>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartPlaceEvent(busBar)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Move Label</span>
          <mwc-icon slot="graphic">text_rotation_none</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartPlaceLabelEvent(busBar)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Edit</span>
          <mwc-icon slot="graphic">edit</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newEditWizardEvent(busBar)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Delete</span>
          <mwc-icon slot="graphic">delete</mwc-icon>
        </mwc-list-item>`,
                handler: () => {
                    const node = busBar.querySelector('ConnectivityNode');
                    this.dispatchEvent(newEditEventV2([...removeNode(node), { node: busBar }]));
                },
            },
        ];
        return items;
    }
    containerMenuItems(bayOrVL) {
        const items = [
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Resize</span>
          <svg
            xmlns="${svgNs}"
            slot="graphic"
            width="24"
            height="24"
            viewBox="0 96 960 960"
          >
            ${resizePath}
          </svg>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartResizeEvent(bayOrVL)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Copy</span>
          <mwc-icon slot="graphic">copy_all</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartPlaceEvent(copy(bayOrVL, this.nsp))),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Move</span>
          <svg
            xmlns="${svgNs}"
            height="24"
            width="24"
            slot="graphic"
            viewBox="0 96 960 960"
          >
            ${movePath}
          </svg>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartPlaceEvent(bayOrVL)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Move Label</span>
          <mwc-icon slot="graphic">text_rotation_none</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newStartPlaceLabelEvent(bayOrVL)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Edit</span>
          <mwc-icon slot="graphic">edit</mwc-icon>
        </mwc-list-item>`,
                handler: () => this.dispatchEvent(newEditWizardEvent(bayOrVL)),
            },
            {
                content: x `<mwc-list-item graphic="icon">
          <span>Delete</span>
          <mwc-icon slot="graphic">delete</mwc-icon>
        </mwc-list-item>`,
                handler: () => {
                    const edits = [];
                    Array.from(bayOrVL.getElementsByTagName('ConnectivityNode')).forEach(cNode => {
                        if (Array.from(this.doc.querySelectorAll(`Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`)).find(terminal => terminal.closest(bayOrVL.tagName) !== bayOrVL))
                            edits.push(...removeNode(cNode));
                    });
                    Array.from(bayOrVL.getElementsByTagName('Terminal')).forEach(terminal => {
                        const cNode = this.doc.querySelector(`ConnectivityNode[pathName="${terminal.getAttribute('connectivityNode')}"]`);
                        if (cNode && cNode.closest(bayOrVL.tagName) !== bayOrVL)
                            edits.push(...removeNode(cNode));
                    });
                    edits.push({ node: bayOrVL });
                    this.dispatchEvent(newEditEventV2(edits));
                },
            },
        ];
        return items;
    }
    renderMenu() {
        if (!this.menu)
            return x ``;
        const { element } = this.menu;
        let items = [];
        if (element.tagName === 'ConductingEquipment')
            items = this.equipmentMenuItems(element);
        else if (element.tagName === 'Bay' && isBusBar(element))
            items = this.busBarMenuItems(element);
        else if (element.tagName === 'Bay' || element.tagName === 'VoltageLevel')
            items = this.containerMenuItems(element);
        return x `
      <menu
        id="sld-context-menu"
        style="position: fixed; top: ${this.menu.top}px; left: ${this.menu
            .left}px; background: var(--oscd-base3, white); margin: 0px; padding: 0px; box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); --mdc-list-vertical-padding: 0px; overflow-y: auto;"
        ${n(async (menu) => {
            if (!(menu instanceof HTMLElement))
                return;
            const nav = this.parentElement.getRootNode().querySelector('nav');
            const navHeight = nav.offsetHeight + 8;
            await this.updateComplete;
            const { bottom, right } = menu.getBoundingClientRect();
            if (bottom > window.innerHeight - navHeight) {
                menu.style.removeProperty('top');
                menu.style.bottom = `${navHeight}px`;
                menu.style.maxHeight = `calc(100vh - ${navHeight + 68}px)`;
            }
            if (right > window.innerWidth) {
                menu.style.removeProperty('left');
                menu.style.right = '0px';
            }
        })}
      >
        <mwc-list
          @selected=${({ detail: { index } }) => {
            items[index]?.handler();
            this.menu = undefined;
        }}
        >
          ${items.map(i => i.content)}
          <li divider role="separator"></li>
          ${renderMenuFooter(element)}
        </mwc-list>
      </menu>
    `;
    }
    render() {
        const { dim: [w, h], } = attributes(this.substation);
        const placingTarget = this.placing?.tagName === 'VoltageLevel'
            ? b `<rect width="100%" height="100%" fill="url(#grid)" />`
            : A;
        const placingLabelTarget = this.placingLabel
            ? b `<rect width="100%" height="100%" fill="url(#halfgrid)"
      @click=${() => {
                const element = this.placingLabel;
                const [x, y] = this.renderedLabelPosition(element);
                this.dispatchEvent(newPlaceLabelEvent({ element, x, y }));
            }}
      />`
            : A;
        let placingElement = b ``;
        if (this.placing) {
            if (this.placing.tagName === 'VoltageLevel' || isBay(this.placing))
                placingElement = b `${this.renderContainer(this.placing, true)}`;
            else if (this.placing.tagName === 'ConductingEquipment')
                placingElement = this.renderEquipment(this.placing, { preview: true });
            else if (isBusBar(this.placing))
                placingElement = this.renderBusBar(this.placing);
        }
        let coordinates = x ``;
        let invalid = false;
        let hidden = true;
        if (this.placing) {
            const { dim: [w0, h0], } = attributes(this.placing);
            hidden = false;
            invalid = !this.canPlaceAt(this.placing, this.mouseX, this.mouseY, w0, h0);
            coordinates = x `${this.mouseX},${this.mouseY}`;
        }
        if (this.resizing && !isBusBar(this.resizing)) {
            const { pos: [x$1, y], } = attributes(this.resizing);
            const newW = Math.max(1, this.mouseX - x$1 + 1);
            const newH = Math.max(1, this.mouseY - y + 1);
            hidden = false;
            invalid = !this.canResizeTo(this.resizing, newW, newH);
            coordinates = x `${newW}&times;${newH}`;
        }
        const coordinateTooltip = x `<div
      ${n(this.coordinatesRef)}
      class="${o$3({ coordinates: true, invalid, hidden })}"
    >
      (${coordinates})
    </div>`;
        const connectionPreview = [];
        if (this.connecting?.equipment.closest('Substation') === this.substation) {
            const { equipment, path, terminal } = this.connecting;
            let i = 0;
            while (i < path.length - 2) {
                const [x1, y1] = path[i];
                const [x2, y2] = path[i + 1];
                connectionPreview.push(b `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                stroke-linecap="square" stroke="black" />`);
                i += 1;
            }
            const [[x1, y1], [oldX2, oldY2]] = path.slice(-2);
            const vertical = x1 === oldX2;
            let x3 = this.mouseX + 0.5;
            let y3 = this.mouseY + 0.5;
            let [x4, y4] = [x3, y3];
            const targetEq = Array.from(this.substation.querySelectorAll('ConductingEquipment'))
                .filter(eq => eq !== equipment)
                .find(eq => {
                const { pos: [x, y], } = attributes(eq);
                return x === this.mouseX && y === this.mouseY;
            });
            const toTerminal = this.nearestOpenTerminal(targetEq);
            if (targetEq && toTerminal) {
                const { far, close } = connectionStartPoints(targetEq)[toTerminal];
                [x3, y3] = far;
                [x4, y4] = close;
            }
            const x2 = vertical ? oldX2 : x3;
            const y2 = vertical ? y3 : oldY2;
            connectionPreview.push(b `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                stroke-linecap="square" stroke="black" />`, b `<line x1="${x2}" y1="${y2}" x2="${x3}" y2="${y3}"
                stroke-linecap="square" stroke="black" />`, b `<line x1="${x3}" y1="${y3}" x2="${x4}" y2="${y4}"
                stroke-linecap="square" stroke="black" />`);
            connectionPreview.push(b `<rect width="100%" height="100%" fill="url(#grid)"
      @click=${() => {
                path[path.length - 1] = [x2, y2];
                path.push([x3, y3]);
                path.push([x4, y4]);
                cleanPath(path);
                this.requestUpdate();
                if (targetEq && toTerminal)
                    this.dispatchEvent(newConnectEvent({
                        equipment,
                        terminal,
                        path,
                        connectTo: targetEq,
                        toTerminal,
                    }));
            }} />`);
        }
        const menu = this.renderMenu();
        return x `<section>
      <h2>
        ${this.substation.getAttribute('name')}
        <mwc-icon-button
          label="Resize Substation"
          @click=${() => this.resizeSubstationUI.show()}
        >
          <svg
            xmlns="${svgNs}"
            width="24"
            height="24"
            viewBox="0 96 960 960"
            opacity="0.83"
          >
            ${resizePath}
          </svg>
        </mwc-icon-button>
      </h2>
      <svg
        xmlns="${svgNs}"
        xmlns:xlink="${xlinkNs}"
        id="sld"
        viewBox="0 0 ${w} ${h}"
        width="${w * this.gridSize}"
        height="${h * this.gridSize}"
        stroke-width="0.06"
        fill="none"
        @mousemove=${(e) => {
            const [x, y] = this.svgCoordinates(e.clientX, e.clientY);
            this.mouseX = Math.floor(x);
            this.mouseY = Math.floor(y);
            this.mouseX2 = Math.floor(x * 2) / 2;
            this.mouseY2 = Math.floor(y * 2) / 2;
            this.positionCoordinates(e);
        }}
      >
        <style>
          .handle {
            visibility: hidden;
          }
          :focus {
            outline: none;
          }
          :focus > .handle,
          :focus-within > .handle {
            opacity: 0.2;
            visibility: visible;
          }
          .handle:hover,
          .handle:focus {
            visibility: visible;
            opacity: 1;
          }
          g.voltagelevel > rect,
          g.bay > rect {
            shape-rendering: crispEdges;
          }
          svg:not(:hover) .preview {
            visibility: hidden;
          }
          .preview {
            opacity: 0.83;
          }
        </style>
        ${symbols}
        <rect width="100%" height="100%" fill="white" />
        ${placingTarget}
        ${Array.from(this.substation.children)
            .filter(child => child.tagName === 'VoltageLevel')
            .map(vl => b `${this.renderContainer(vl)}`)}
        ${connectionPreview}
        ${this.connecting?.equipment.closest('Substation') === this.substation
            ? Array.from(this.substation.querySelectorAll('ConductingEquipment')).map(eq => this.renderEquipment(eq, { connect: true }))
            : A}
        ${Array.from(this.substation.querySelectorAll('ConnectivityNode'))
            .filter(node => node.getAttribute('name') !== 'grounded' &&
            !(this.placing &&
                node.closest(this.placing.tagName) === this.placing) &&
            !isBusBar(node.parentElement))
            .map(cNode => this.renderConnectivityNode(cNode))}
        ${Array.from(this.substation.querySelectorAll('ConnectivityNode'))
            .filter(node => node.getAttribute('name') !== 'grounded' &&
            !(this.placing &&
                node.closest(this.placing.tagName) === this.placing) &&
            isBusBar(node.parentElement))
            .map(cNode => this.renderConnectivityNode(cNode))}
        ${Array.from(this.substation.querySelectorAll('VoltageLevel, Bay, ConductingEquipment'))
            .filter(e => !this.placing || e.closest(this.placing.tagName) !== this.placing)
            .map(element => this.renderLabel(element))}
        ${placingLabelTarget} ${placingElement}
      </svg>
      ${menu} ${coordinateTooltip}
      <mwc-dialog
        id="resizeSubstationUI"
        heading="Resize ${this.substation.getAttribute('name')}"
      >
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <mwc-textfield
            id="substationWidthUI"
            type="number"
            min="1"
            step="1"
            label="Width"
            value="${w}"
            dialogInitialFocus
            autoValidate
            .validityTransform=${(value, validity) => {
            const { dim: [_w, oldH], } = attributes(this.substation);
            if (validity.valid &&
                !this.canResizeTo(this.substation, parseInt(value, 10), oldH)) {
                return { valid: false, rangeUnderflow: true };
            }
            return {};
        }}
          ></mwc-textfield>
          <mwc-textfield
            id="substationHeightUI"
            type="number"
            min="1"
            step="1"
            label="Height"
            value="${h}"
            autoValidate
            .validityTransform=${(value, validity) => {
            const { dim: [oldW, _h], } = attributes(this.substation);
            if (validity.valid &&
                !this.canResizeTo(this.substation, oldW, parseInt(value, 10))) {
                return { valid: false, rangeUnderflow: true };
            }
            return {};
        }}
          ></mwc-textfield>
        </div>
        <mwc-button
          slot="primaryAction"
          @click=${() => {
            const valid = Array.from(this.resizeSubstationUI.querySelectorAll('mwc-textfield')).every(textField => textField.checkValidity());
            if (!valid)
                return;
            const { dim: [oldW, oldH], } = attributes(this.substation);
            const [newW, newH] = [
                this.substationWidthUI,
                this.substationHeightUI,
            ].map(ui => parseInt(ui.value ?? '1', 10).toString());
            this.resizeSubstationUI.close();
            if (newW === oldW.toString() && newH === oldH.toString())
                return;
            this.dispatchEvent(newEditEventV2({
                element: this.substation,
                attributesNS: {
                    [sldNs]: {
                        [`${this.nsp}:w`]: newW,
                        [`${this.nsp}:h`]: newH,
                    },
                },
            }));
        }}
          >resize</mwc-button
        >
        <mwc-button dialogAction="close" slot="secondaryAction"
          >cancel</mwc-button
        >
      </mwc-dialog>
    </section>`;
    }
    renderLabel(element) {
        const [x, y] = this.renderedLabelPosition(element);
        const name = element.getAttribute('name');
        const fontSize = element.tagName === 'ConductingEquipment' ? 0.45 : 0.6;
        let events = 'none';
        let handleClick = A;
        if (!this.placing &&
            !this.resizing &&
            !this.connecting &&
            !this.placingLabel) {
            events = 'all';
            handleClick = () => this.dispatchEvent(newStartPlaceLabelEvent(element));
        }
        const id = element.closest('Substation') === this.substation
            ? identity(element)
            : A;
        return b `<g class="label" id="label:${id}">
        <text x="${x + 0.1}" y="${y - 0.2}"
          @mousedown=${preventDefault}
          @auxclick=${(e) => {
            if (e.button === 1) {
                // middle mouse button
                this.dispatchEvent(newEditWizardEvent(element));
                e.preventDefault();
            }
        }}
          @click=${handleClick}
          @contextmenu=${(e) => this.openMenu(element, e)}
          pointer-events="${events}" fill="#000000" fill-opacity="0.83"
          style="font: ${fontSize}px sans-serif; cursor: default;">
          ${name}
        </text>
      </g>`;
    }
    renderContainer(bayOrVL, preview = false) {
        const isVL = bayOrVL.tagName === 'VoltageLevel';
        if (this.placing === bayOrVL && !preview)
            return b ``;
        const [x, y] = this.renderedPosition(bayOrVL);
        let { dim: [w, h], } = attributes(bayOrVL);
        let handleClick;
        let invalid = false;
        if (this.resizing === bayOrVL) {
            w = Math.max(1, this.mouseX - x + 1);
            h = Math.max(1, this.mouseY - y + 1);
            if (this.canResizeTo(bayOrVL, w, h))
                handleClick = () => {
                    this.dispatchEvent(newResizeEvent({
                        w,
                        h,
                        element: bayOrVL,
                    }));
                };
            else
                invalid = true;
        }
        if (this.placing === bayOrVL) {
            let parent;
            if (isVL)
                parent = this.substation;
            else
                parent = Array.from(this.substation.querySelectorAll(':root > Substation > VoltageLevel')).find(vl => containsRect(vl, x, y, w, h));
            if (parent && this.canPlaceAt(bayOrVL, x, y, w, h))
                handleClick = () => {
                    this.dispatchEvent(newPlaceEvent({
                        x,
                        y,
                        element: bayOrVL,
                        parent: parent,
                    }));
                };
            else
                invalid = true;
        }
        let moveHandle = b ``;
        let resizeHandle = b ``;
        let placingTarget = b ``;
        let resizingTarget = b ``;
        if ((isVL && this.placing?.tagName === 'Bay') ||
            (!isVL && this.placing?.tagName === 'ConductingEquipment'))
            placingTarget = b `<rect x="${x}" y="${y}" width="${w}" height="${h}"
        @click=${handleClick || A} fill="url(#grid)" />`;
        if (this.resizing === bayOrVL ||
            (this.resizing?.parentElement === bayOrVL && isBusBar(this.resizing)))
            resizingTarget = b `<rect x="${x}" y="${y}" width="${w}" height="${h}"
        @click=${handleClick || A} fill="url(#grid)" />`;
        if (!this.placing &&
            !this.resizing &&
            !this.connecting &&
            !this.placingLabel) {
            moveHandle = b `<svg class="handle" xmlns="${svgNs}" height="1" width="1"
          fill="black" opacity="0.83" viewBox="0 96 960 960" 
          @click=${(e) => this.dispatchEvent(newStartPlaceEvent(e.shiftKey ? copy(bayOrVL, this.nsp) : bayOrVL))}
          x="${x}" y="${y}">
        <rect fill="white" x="28.8" y="124.8" width="902.4" height="902.4" />
        ${movePath}
      </svg>`;
            resizeHandle = b `<svg class="handle" xmlns="${svgNs}" height="1" width="1"
          fill="black" opacity="0.83" viewBox="0 96 960 960" 
          @click=${() => this.dispatchEvent(newStartResizeEvent(bayOrVL))}
          x="${w + x - 1}" y="${h + y - 1}">
        <rect fill="white" x="28.8" y="124.8" width="902.4" height="902.4" />
        ${resizePath}
      </svg>`;
        }
        return b `<g id="${bayOrVL.closest('Substation') === this.substation
            ? identity(bayOrVL)
            : A}" class=${o$3({
            voltagelevel: isVL,
            bay: !isVL,
            preview,
        })} tabindex="0" pointer-events="all" style="outline: none;">
      <rect x="${x}" y="${y}" width="${w}" height="${h}"
        @contextmenu=${(e) => this.openMenu(bayOrVL, e)}
        @click=${handleClick || A}
        fill="white" stroke-dasharray="${isVL ? A : '0.18'}"
        stroke="${invalid ? '#BB1326' : isVL ? '#F5E214' : '#12579B'}" />
      ${moveHandle}
      ${placingTarget}
      ${Array.from(bayOrVL.children)
            .filter(isBay)
            .map(bay => this.renderContainer(bay))}
      ${Array.from(bayOrVL.children)
            .filter(child => child.tagName === 'ConductingEquipment')
            .map(equipment => this.renderEquipment(equipment))}
      ${preview
            ? Array.from(bayOrVL.querySelectorAll('ConnectivityNode'))
                .filter(child => child.getAttribute('name') !== 'grounded')
                .map(cNode => this.renderConnectivityNode(cNode))
            : A}
      ${preview
            ? Array.from(bayOrVL.querySelectorAll('Bay, ConductingEquipment'))
                .concat(bayOrVL)
                .map(element => this.renderLabel(element))
            : A}
      ${resizeHandle}
      ${resizingTarget}
    </g>`;
    }
    renderEquipment(equipment, { preview = false, connect = false } = {}) {
        if (this.placing === equipment && !preview)
            return b ``;
        if (this.connecting?.equipment.closest('Substation') === this.substation &&
            !connect)
            return b ``;
        const [x, y] = this.renderedPosition(equipment);
        const { flip, rot } = attributes(equipment);
        const deg = 90 * rot;
        const eqType = equipment.getAttribute('type');
        const ringed = ringedEqTypes.has(eqType);
        const symbol = isEqType(eqType) ? eqType : 'ConductingEquipment';
        const icon = ringed
            ? b `<svg
    viewBox="0 0 25 25"
    width="1"
    height="1"
  >
    ${eqRingPath}
  </svg>`
            : b `<use href="#${symbol}" xlink:href="#${symbol}"
              pointer-events="none" />`;
        let handleClick = (e) => {
            let placing = equipment;
            if (e.shiftKey)
                placing = copy(equipment, this.nsp);
            this.dispatchEvent(newStartPlaceEvent(placing));
        };
        if (this.placing === equipment) {
            const parent = Array.from(this.substation.querySelectorAll(':root > Substation > VoltageLevel > Bay')).find(bay => !isBusBar(bay) && containsRect(bay, x, y, 1, 1));
            if (parent && this.canPlaceAt(equipment, x, y, 1, 1))
                handleClick = () => {
                    this.dispatchEvent(newPlaceEvent({
                        x,
                        y,
                        element: equipment,
                        parent,
                    }));
                };
        }
        const terminals = Array.from(equipment.children).filter(c => c.tagName === 'Terminal');
        const topTerminal = terminals.find(t => t.getAttribute('name') === 'T1');
        const bottomTerminal = terminals.find(t => t.getAttribute('name') !== 'T1');
        const topConnector = topTerminal || this.placing || this.resizing || this.connecting
            ? A
            : b `<circle cx="0.5" cy="0" r="0.2" opacity="0.4"
      fill="#BB1326" stroke="#F5E214"
    @click=${() => this.dispatchEvent(newStartConnectEvent({ equipment, terminal: 'top' }))}
    @contextmenu=${(e) => {
                e.preventDefault();
                this.groundTerminal(equipment, 'T1');
            }}
      />`;
        const topIndicator = !this.connecting ||
            this.connecting.equipment === equipment ||
            (this.connecting &&
                this.mouseX === x &&
                this.mouseY === y &&
                this.nearestOpenTerminal(equipment) === 'top') ||
            topTerminal
            ? A
            : b `<polygon points="0.3,0 0.7,0 0.5,0.4" 
                fill="#12579B" opacity="0.4" />`;
        const topGrounded = topTerminal?.getAttribute('cNodeName') === 'grounded'
            ? b `<line x1="0.5" y1="-0.1" x2="0.5" y2="0" stroke="black" stroke-width="0.06" marker-start="url(#grounded)" />`
            : A;
        const bottomConnector = bottomTerminal ||
            this.placing ||
            this.resizing ||
            this.connecting ||
            singleTerminal.has(eqType)
            ? A
            : b `<circle cx="0.5" cy="1" r="0.2" opacity="0.4"
      fill="#BB1326" stroke="#F5E214"
    @click=${() => this.dispatchEvent(newStartConnectEvent({ equipment, terminal: 'bottom' }))}
    @contextmenu=${(e) => {
                e.preventDefault();
                this.groundTerminal(equipment, 'T2');
            }}
      />`;
        const bottomIndicator = !this.connecting ||
            this.connecting.equipment === equipment ||
            (this.connecting &&
                this.mouseX === x &&
                this.mouseY === y &&
                this.nearestOpenTerminal(equipment) === 'bottom') ||
            bottomTerminal ||
            singleTerminal.has(eqType)
            ? A
            : b `<polygon points="0.3,1 0.7,1 0.5,0.6" 
                fill="#12579B" opacity="0.4" />`;
        const bottomGrounded = bottomTerminal?.getAttribute('cNodeName') === 'grounded'
            ? b `<line x1="0.5" y1="1.1" x2="0.5" y2="1" stroke="black"
                stroke-width="0.06" marker-start="url(#grounded)" />`
            : A;
        return b `<g class="${o$3({
            equipment: true,
            preview: this.placing === equipment,
        })}"
    id="${equipment.closest('Substation') === this.substation
            ? identity(equipment)
            : A}"
    transform="translate(${x} ${y}) rotate(${deg} 0.5 0.5)${flip ? ' scale(-1,1) translate(-1 0)' : ''}">
      <title>${equipment.getAttribute('name')}</title>
      ${icon}
      ${ringed
            ? b `<use transform="rotate(${-deg} 0.5 0.5)" pointer-events="none"
                  href="#${symbol}" xlink:href="#${symbol}" />`
            : A}
      <rect width="1" height="1" fill="none" pointer-events="${connect ? 'none' : 'all'}"
        @mousedown=${preventDefault}
        @click=${handleClick}
        @auxclick=${(e) => {
            if (e.button === 1) {
                // middle mouse button
                this.dispatchEvent(newRotateEvent(equipment));
                e.preventDefault();
            }
        }}
        @contextmenu=${(e) => this.openMenu(equipment, e)}
      />
      ${topConnector}
      ${topIndicator}
      ${topGrounded}
      ${bottomConnector}
      ${bottomIndicator}
      ${bottomGrounded}
    </g>
    <g class="preview">${preview ? this.renderLabel(equipment) : A}</g>`;
    }
    renderBusBar(busBar) {
        const [x, y] = this.renderedPosition(busBar);
        const { dim: [w, h], } = attributes(busBar);
        let placingTarget = b ``;
        placingTarget = b `<rect x="${x}" y="${y}" width="1" height="1"
          pointer-events="all" fill="none" 
          @click=${() => {
            const parent = Array.from(this.substation.querySelectorAll(':root > Substation > VoltageLevel')).find(vl => containsRect(vl, x, y, w, h));
            if (parent)
                this.dispatchEvent(newPlaceEvent({
                    x,
                    y,
                    element: busBar,
                    parent: parent,
                }));
        }}
        />`;
        return b `<g class="bus preview" id="${busBar.closest('Substation') === this.substation
            ? identity(busBar)
            : A}">
      <title>${busBar.getAttribute('name')}</title>
      ${this.renderLabel(busBar)}
      ${this.renderConnectivityNode(busBar.querySelector('ConnectivityNode'))}
      ${placingTarget}
    </g>`;
    }
    renderConnectivityNode(cNode) {
        const priv = cNode.querySelector(`Private[type="${privType}"]`);
        if (!priv)
            return A;
        const circles = [];
        const intersections = Object.entries(Array.from(priv.querySelectorAll('Vertex'))
            .map(v => this.renderedPosition(v))
            .reduce((obj, pos) => {
            const ret = obj;
            const key = JSON.stringify(pos);
            if (ret[key])
                ret[key].count += 1;
            else
                ret[key] = { val: pos, count: 1 };
            return ret;
        }, {}))
            .filter(([_, { count }]) => count > 2)
            .map(([_, { val }]) => val);
        intersections.forEach(([x, y]) => circles.push(b `<circle fill="black" cx="${x}" cy="${y}" r="0.15" />`));
        const lines = [];
        const sections = Array.from(priv.getElementsByTagNameNS(sldNs, 'Section'));
        const bay = cNode.closest('Bay');
        const targetSize = this.connecting ? 0.99 : 0.7;
        const pointerEvents = !this.resizing || isBusBar(this.resizing) ? 'all' : 'none';
        sections.forEach(section => {
            const busBar = xmlBoolean(section.getAttribute('bus'));
            const vertices = Array.from(section.getElementsByTagNameNS(sldNs, 'Vertex')).map(vertex => this.renderedPosition(vertex));
            let i = 0;
            while (i < vertices.length - 1) {
                const [x1, y1] = vertices[i];
                let [x2, y2] = vertices[i + 1];
                let handleClick = A;
                let handleAuxClick = A;
                let handleContextMenu = A;
                if (busBar && bay) {
                    handleClick = () => this.dispatchEvent(newStartPlaceEvent(bay));
                    handleAuxClick = ({ button }) => {
                        if (button === 1)
                            this.dispatchEvent(newStartResizeEvent(bay));
                    };
                    handleContextMenu = (e) => this.openMenu(bay, e);
                }
                if (busBar && this.resizing === bay) {
                    if (section !== sections.find(s => xmlBoolean(s.getAttribute('bus'))))
                        return;
                    circles.length = 0;
                    const { pos: [vX, vY], dim: [vW, vH], } = attributes(bay.parentElement);
                    const maxX = vX + vW - 0.5;
                    const maxY = vY + vH - 0.5;
                    if (i === 0) {
                        const dx = Math.max(this.mouseX - x1, 0);
                        const dy = Math.max(this.mouseY - y1, 0);
                        if (dx > dy) {
                            x2 = Math.max(x1, Math.min(maxX, this.mouseX + 0.5));
                            y2 = y1;
                        }
                        else {
                            y2 = Math.max(y1, Math.min(maxY, this.mouseY + 0.5));
                            x2 = x1;
                        }
                        if (x1 === x2 && y1 === y2)
                            if (x2 >= maxX)
                                y2 += 1;
                            else
                                x2 += 1;
                    }
                    handleClick = () => {
                        this.dispatchEvent(newPlaceEvent({
                            parent: section,
                            element: section.getElementsByTagNameNS(sldNs, 'Vertex')[vertices.length - 1],
                            x: x2,
                            y: y2,
                        }));
                    };
                    lines.push(b `<rect x="${this.mouseX}" y="${this.mouseY}"
              width="1" height="1" fill="none" pointer-events="${pointerEvents}"
              @click=${handleClick} />`);
                }
                if (this.connecting)
                    handleClick = () => {
                        const { equipment, path, terminal } = this.connecting;
                        if (equipment.querySelector(`Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`))
                            return;
                        const [[oldX1, _y], [oldX2, oldY2]] = path.slice(-2);
                        const vertical = oldX1 === oldX2;
                        const x3 = this.mouseX + 0.5;
                        const y3 = this.mouseY + 0.5;
                        const newX2 = vertical ? oldX2 : x3;
                        const newY2 = vertical ? y3 : oldY2;
                        path[path.length - 1] = [newX2, newY2];
                        path.push([x3, y3]);
                        cleanPath(path);
                        this.dispatchEvent(newConnectEvent({
                            equipment,
                            terminal,
                            path,
                            connectTo: cNode,
                        }));
                    };
                lines.push(b `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                pointer-events="${pointerEvents}"
                stroke-width="${busBar ? 0.12 : A}" stroke="black" 
                stroke-linecap="${busBar ? 'round' : 'square'}" />`);
                lines.push(b `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                pointer-events="${pointerEvents}" stroke-width="${targetSize}"
                @contextmenu=${handleContextMenu} @mousedown=${preventDefault}
                @click=${handleClick} @auxclick=${handleAuxClick} />`);
                if (busBar ||
                    (this.connecting && ![x1, y1].find(n => Number.isInteger(n))))
                    lines.push(b `<rect x="${x1 - targetSize / 2}" y="${y1 - targetSize / 2}"
                  width="${targetSize}" height="${targetSize}"
                  @click=${handleClick} @auxclick=${handleAuxClick}
                  @contextmenu=${handleContextMenu} @mousedown=${preventDefault}
                  pointer-events="${pointerEvents}" fill="none" />`);
                if (busBar ||
                    (this.connecting && ![x2, y2].find(n => Number.isInteger(n))))
                    lines.push(b `<rect x="${x2 - targetSize / 2}" y="${y2 - targetSize / 2}"
                  width="${targetSize}" height="${targetSize}"
                  @click=${handleClick} @auxclick=${handleAuxClick}
                  @contextmenu=${handleContextMenu} @mousedown=${preventDefault}
                  pointer-events="${pointerEvents}" fill="none" />`);
                i += 1;
            }
        });
        const id = cNode.closest('Substation') === this.substation
            ? identity(cNode)
            : A;
        return b `<g class="node" id="${id}" >
        <title>${cNode.getAttribute('pathName')}</title>
        ${circles}
        ${lines}
      </g>`;
    }
};
SLDEditor.styles = i$6 `
    h2 {
      font-family: Roboto;
      font-weight: 300;
      font-size: 24px;
      margin-bottom: 4px;
      --mdc-icon-button-size: 28px;
      --mdc-icon-size: 24px;
    }

    .hidden {
      display: none;
    }
    svg:not(:hover) ~ .coordinates {
      display: none;
    }
    .coordinates {
      position: fixed;
      pointer-events: none;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      padding: 8px;
      border-radius: 16px;
      background: #fffd;
      color: rgb(0, 0, 0 / 0.83);
    }
    .coordinates.invalid {
      color: #bb1326;
    }

    * {
      user-select: none;
    }
  `;
__decorate([
    n$4({ type: Object })
], SLDEditor.prototype, "doc", void 0);
__decorate([
    n$4({ type: Object })
], SLDEditor.prototype, "substation", void 0);
__decorate([
    n$4({ type: Number })
], SLDEditor.prototype, "editCount", void 0);
__decorate([
    n$4({ type: Number })
], SLDEditor.prototype, "gridSize", void 0);
__decorate([
    n$4({ type: String })
], SLDEditor.prototype, "nsp", void 0);
__decorate([
    n$4({ type: Object })
], SLDEditor.prototype, "resizing", void 0);
__decorate([
    n$4({ type: Object })
], SLDEditor.prototype, "placing", void 0);
__decorate([
    n$4({ type: Object })
], SLDEditor.prototype, "placingLabel", void 0);
__decorate([
    n$4({ type: Object })
], SLDEditor.prototype, "connecting", void 0);
__decorate([
    i$2('#resizeSubstationUI')
], SLDEditor.prototype, "resizeSubstationUI", void 0);
__decorate([
    i$2('#substationWidthUI')
], SLDEditor.prototype, "substationWidthUI", void 0);
__decorate([
    i$2('#substationHeightUI')
], SLDEditor.prototype, "substationHeightUI", void 0);
__decorate([
    i$2('svg#sld')
], SLDEditor.prototype, "sld", void 0);
__decorate([
    t$1()
], SLDEditor.prototype, "mouseX", void 0);
__decorate([
    t$1()
], SLDEditor.prototype, "mouseY", void 0);
__decorate([
    t$1()
], SLDEditor.prototype, "mouseX2", void 0);
__decorate([
    t$1()
], SLDEditor.prototype, "mouseY2", void 0);
__decorate([
    t$1()
], SLDEditor.prototype, "menu", void 0);
SLDEditor = __decorate([
    e$7('sld-editor')
], SLDEditor);

function makeBusBar(doc, nsp) {
    const busBar = doc.createElementNS(doc.documentElement.namespaceURI, 'Bay');
    busBar.setAttribute('name', 'BB1');
    busBar.setAttributeNS(sldNs, `${nsp}:w`, '2');
    const cNode = doc.createElementNS(doc.documentElement.namespaceURI, 'ConnectivityNode');
    cNode.setAttribute('name', 'L');
    const priv = doc.createElementNS(doc.documentElement.namespaceURI, 'Private');
    priv.setAttribute('type', privType);
    const section = doc.createElementNS(sldNs, `${nsp}:Section`);
    section.setAttribute('bus', 'true');
    const v1 = doc.createElementNS(sldNs, `${nsp}:Vertex`);
    v1.setAttributeNS(sldNs, `${nsp}:x`, '0.5');
    v1.setAttributeNS(sldNs, `${nsp}:y`, '0.5');
    section.appendChild(v1);
    const v2 = doc.createElementNS(sldNs, `${nsp}:Vertex`);
    v2.setAttributeNS(sldNs, `${nsp}:x`, '1.5');
    v2.setAttributeNS(sldNs, `${nsp}:y`, '0.5');
    section.appendChild(v2);
    priv.appendChild(section);
    cNode.appendChild(priv);
    busBar.appendChild(cNode);
    return busBar;
}
function cutSectionAt(section, index, [x, y], nsPrefix) {
    const parent = section.parentElement;
    const edits = [];
    const vertices = Array.from(section.getElementsByTagNameNS(sldNs, 'Vertex'));
    const vertexAtXY = vertices.find(ve => ve.getAttributeNS(sldNs, 'x') === x.toString() &&
        ve.getAttributeNS(sldNs, 'y') === y.toString());
    if (vertexAtXY === vertices[0] ||
        vertexAtXY === vertices[vertices.length - 1]) {
        return [];
    }
    const newSection = section.cloneNode(true);
    Array.from(newSection.getElementsByTagNameNS(sldNs, 'Vertex'))
        .slice(0, index + 1)
        .forEach(vertex => vertex.remove());
    const v = vertices[index].cloneNode();
    v.setAttributeNS(sldNs, `${nsPrefix}:x`, x.toString());
    v.setAttributeNS(sldNs, `${nsPrefix}:y`, y.toString());
    v.removeAttributeNS(sldNs, 'uuid');
    newSection.prepend(v);
    edits.push({
        node: newSection,
        parent,
        reference: section.nextElementSibling,
    });
    vertices.slice(index + 1).forEach(vertex => edits.push({ node: vertex }));
    if (!vertexAtXY) {
        const v2 = v.cloneNode();
        edits.push({ node: v2, parent: section, reference: null });
    }
    return edits;
}
class OscdEditorSLD extends s$2 {
    constructor() {
        super(...arguments);
        this._docVersion = -1;
        this.gridSize = 32;
        this.nsp = 'esld';
        this.templateElements = {};
        this.handleKeydown = ({ key }) => {
            if (key === 'Escape')
                this.reset();
        };
    }
    get docVersion() {
        return this._docVersion;
    }
    set docVersion(value) {
        this.connecting = undefined;
        if (!this.resizing?.parentElement)
            this.resizing = undefined;
        if (!this.placingLabel?.parentElement)
            this.placingLabel = undefined;
        this._docVersion = value;
    }
    zoomIn(step = 4) {
        this.gridSize += step;
    }
    zoomOut(step = 4) {
        this.gridSize -= step;
        if (this.gridSize < 4)
            this.gridSize = 4;
    }
    startResizing(element) {
        this.reset();
        this.resizing = element;
    }
    startPlacing(element) {
        this.reset();
        this.placing = element;
    }
    startPlacingLabel(element) {
        this.reset();
        this.placingLabel = element;
    }
    startConnecting({ equipment, terminal }) {
        this.reset();
        const { close, far } = connectionStartPoints(equipment)[terminal];
        if (equipment)
            this.connecting = {
                equipment,
                path: [close, far],
                terminal,
            };
    }
    reset() {
        this.resizing = undefined;
        this.placing = undefined;
        this.placingLabel = undefined;
        this.connecting = undefined;
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this.handleKeydown);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('keydown', this.handleKeydown);
    }
    updated(changedProperties) {
        if (!changedProperties.has('doc'))
            return;
        const sldNsPrefix = this.doc.documentElement.lookupPrefix(sldNs);
        if (sldNsPrefix) {
            this.nsp = sldNsPrefix;
        }
        else {
            this.doc.documentElement.setAttributeNS(xmlnsNs, 'xmlns:esld', sldNs);
            this.nsp = 'esld';
        }
        ['Substation', 'VoltageLevel', 'Bay', 'ConductingEquipment'].forEach(tag => {
            this.templateElements[tag] = this.doc.createElementNS(this.doc.documentElement.namespaceURI, tag);
        });
        this.templateElements.BusBar = makeBusBar(this.doc, this.nsp);
    }
    rotateElement(element) {
        const { rot } = attributes(element);
        const edits = [
            {
                element,
                attributesNS: {
                    [sldNs]: {
                        [`${this.nsp}:rot`]: ((rot + 1) % 4).toString(),
                    },
                },
            },
        ];
        if (element.tagName === 'ConductingEquipment') {
            Array.from(element.getElementsByTagName('Terminal'))
                .filter(terminal => terminal.getAttribute('cNodeName') !== 'grounded')
                .forEach(terminal => edits.push(...removeTerminal(terminal)));
        }
        this.dispatchEvent(newEditEventV2(edits));
    }
    placeLabel(element, x, y) {
        const editV2 = {
            element,
            attributesNS: {
                [sldNs]: {
                    lx: x.toString(),
                    ly: y.toString(),
                },
            },
        };
        this.dispatchEvent(newEditEventV2(editV2));
        this.reset();
    }
    placeElement(element, parent, x, y) {
        const edits = [];
        if (element.parentElement !== parent) {
            edits.push(...reparentElement(element, parent));
        }
        const { pos: [oldX, oldY], label: [oldLX, oldLY], rot, } = attributes(element);
        const dx = x - oldX;
        const dy = y - oldY;
        if (element.localName !== 'Vertex') {
            let lx = oldLX;
            let ly = oldLY;
            if (element.tagName === 'ConductingEquipment' &&
                !element.hasAttributeNS(sldNs, 'lx') &&
                rot % 2 === 0) {
                lx += 1;
                ly += 1;
            }
            edits.push({
                element,
                attributesNS: {
                    [sldNs]: {
                        x: x.toString(),
                        y: y.toString(),
                        lx: (lx + dx).toString(),
                        ly: (ly + dy).toString(),
                    },
                },
            });
        }
        Array.from(element.querySelectorAll('Bay, ConductingEquipment, Vertex')).forEach(descendant => {
            const { pos: [descX, descY], label: [descLX, descLY], } = attributes(descendant);
            const newAttributes = {
                x: (descX + dx).toString(),
                y: (descY + dy).toString(),
            };
            if (descendant.localName !== 'Vertex') {
                newAttributes.lx = (descLX + dx).toString();
                newAttributes.ly = (descLY + dy).toString();
            }
            edits.push({
                element: descendant,
                attributesNS: {
                    [sldNs]: newAttributes,
                },
            });
        });
        if (element.tagName === 'ConductingEquipment') {
            Array.from(element.getElementsByTagName('Terminal'))
                .filter(terminal => terminal.getAttribute('cNodeName') !== 'grounded')
                .forEach(terminal => edits.push(...removeTerminal(terminal)));
            const groundedTerminals = Array.from(element.getElementsByTagName('Terminal')).filter(terminal => terminal.getAttribute('cNodeName') === 'grounded');
            if (groundedTerminals.length > 0) {
                let newCNode = parent.querySelector(`ConnectivityNode[name="grounded"]`);
                if (!newCNode) {
                    newCNode = this.doc.createElementNS(this.doc.documentElement.namespaceURI, 'ConnectivityNode');
                    newCNode.setAttribute('name', 'grounded');
                    newCNode.setAttribute('pathName', elementPath(parent, 'grounded'));
                    edits.push({
                        node: newCNode,
                        parent,
                        reference: getReference(parent, 'ConnectivityNode'),
                    });
                }
                const bayName = parent.closest('Bay').getAttribute('name');
                const voltageLevelName = parent
                    .closest('VoltageLevel')
                    .getAttribute('name');
                const substationName = parent
                    .closest('Substation')
                    .getAttribute('name');
                const connectivityNode = newCNode.getAttribute('pathName');
                groundedTerminals.forEach(terminal => {
                    edits.push({
                        element: terminal,
                        attributes: {
                            connectivityNode,
                            bayName,
                            voltageLevelName,
                            substationName,
                        },
                    });
                });
            }
        }
        else if (element.getRootNode() === this.doc) {
            Array.from(element.getElementsByTagName('ConnectivityNode')).forEach(cNode => {
                if (Array.from(this.doc.querySelectorAll(`Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`)).find(terminal => terminal.closest(element.tagName) !== element))
                    edits.push(...removeNode(cNode));
            });
            Array.from(element.getElementsByTagName('Terminal')).forEach(terminal => {
                const cNode = this.doc.querySelector(`ConnectivityNode[pathName="${terminal.getAttribute('connectivityNode')}"]`);
                if (cNode && cNode.closest(element.tagName) !== element)
                    edits.push(...removeNode(cNode));
            });
        }
        if (element.localName === 'Vertex') {
            const bay = element.closest('Bay');
            const sections = Array.from(bay.querySelectorAll('Section[bus]'));
            const section = sections[0];
            const vertex = section.querySelector('Vertex');
            const lastSection = sections[sections.length - 1];
            const lastVertex = lastSection.querySelector('Vertex:last-of-type');
            const { pos: [x1, y1], } = attributes(vertex);
            const w = x - x1 + 1;
            const h = y - y1 + 1;
            if (isBusBar(bay)) {
                edits.push(...removeNode(section.closest('ConnectivityNode')));
                edits.push({
                    element: lastVertex,
                    attributesNS: {
                        [sldNs]: {
                            x: x.toString(),
                            y: y.toString(),
                        },
                    },
                });
                edits.push({
                    element: bay,
                    attributesNS: {
                        [sldNs]: {
                            w: w.toString(),
                            h: h.toString(),
                        },
                    },
                });
            }
        }
        this.dispatchEvent(newEditEventV2(edits));
        if (['Bay', 'VoltageLevel'].includes(element.tagName) &&
            (!element.hasAttributeNS(sldNs, 'w') ||
                !element.hasAttributeNS(sldNs, 'h')))
            this.startResizing(element);
        else
            this.reset();
    }
    connectEquipment({ equipment, terminal, connectTo, toTerminal, path, }) {
        const edits = [];
        let cNode;
        let connectivityNode;
        let cNodeName;
        let priv;
        if (connectTo.tagName !== 'ConnectivityNode') {
            cNode = this.doc.createElementNS(this.doc.documentElement.namespaceURI, 'ConnectivityNode');
            cNode.setAttribute('name', 'L1');
            const bay = equipment.closest('Bay');
            edits.push(...reparentElement(cNode, bay));
            connectivityNode = edits.find(e => e &&
                'attributes' in e &&
                e.attributes &&
                'pathName' in e.attributes)?.attributes?.pathName;
            cNodeName =
                edits.find(e => e && 'attributes' in e && e.attributes && 'name' in e.attributes)?.attributes.name ??
                    cNode.getAttribute('name');
            priv = this.doc.createElementNS(this.doc.documentElement.namespaceURI, 'Private');
            priv.setAttribute('type', privType);
            edits.push({
                parent: cNode,
                node: priv,
                reference: getReference(cNode, 'Private'),
            });
        }
        else {
            cNode = connectTo;
            connectivityNode = cNode.getAttribute('pathName');
            cNodeName = cNode.getAttribute('name');
            priv = cNode.querySelector(`Private[type="${privType}"]`);
        }
        const section = this.doc.createElementNS(sldNs, `${this.nsp}:Section`);
        edits.push({ parent: priv, node: section, reference: null });
        const fromTermUUID = uuid();
        const toTermUUID = uuid();
        path.forEach(([x, y], i) => {
            const vertex = this.doc.createElementNS(sldNs, `${this.nsp}:Vertex`);
            vertex.setAttributeNS(sldNs, `${this.nsp}:x`, x.toString());
            vertex.setAttributeNS(sldNs, `${this.nsp}:y`, y.toString());
            if (i === 0)
                vertex.setAttributeNS(sldNs, `${this.nsp}:uuid`, fromTermUUID);
            else if (i === path.length - 1 &&
                connectTo.tagName !== 'ConnectivityNode')
                vertex.setAttributeNS(sldNs, `${this.nsp}:uuid`, toTermUUID);
            edits.push({ parent: section, node: vertex, reference: null });
        });
        if (connectTo.tagName === 'ConnectivityNode') {
            const [x, y] = path[path.length - 1];
            Array.from(priv.getElementsByTagNameNS(sldNs, 'Section')).find(s => {
                const sectionPath = Array.from(s.getElementsByTagNameNS(sldNs, 'Vertex')).map(v => attributes(v).pos);
                for (let i = 0; i < sectionPath.length - 1; i += 1) {
                    const [x0, y0] = sectionPath[i];
                    const [x1, y1] = sectionPath[i + 1];
                    if ((y0 === y &&
                        y === y1 &&
                        ((x0 < x && x < x1) || (x1 < x && x < x0))) ||
                        (x0 === x &&
                            x === x1 &&
                            ((y0 < y && y < y1) || (y1 < y && y < y0))) ||
                        (y0 === y && x0 === x)) {
                        edits.push(cutSectionAt(s, i, [x, y], this.nsp));
                        return true;
                    }
                }
                return false;
            });
        }
        const [substationName, voltageLevelName, bayName] = connectivityNode.split('/', 3);
        const fromTermElement = this.doc.createElementNS(this.doc.documentElement.namespaceURI, 'Terminal');
        fromTermElement.setAttributeNS(sldNs, `${this.nsp}:uuid`, fromTermUUID);
        const fromTermName = terminal === 'top' ? 'T1' : 'T2';
        fromTermElement.setAttribute('name', fromTermName);
        fromTermElement.setAttribute('connectivityNode', connectivityNode);
        fromTermElement.setAttribute('substationName', substationName);
        fromTermElement.setAttribute('voltageLevelName', voltageLevelName);
        fromTermElement.setAttribute('bayName', bayName);
        fromTermElement.setAttribute('cNodeName', cNodeName);
        edits.push({
            node: fromTermElement,
            parent: equipment,
            reference: getReference(equipment, 'Terminal'),
        });
        if (connectTo.tagName === 'ConductingEquipment') {
            const toTermElement = this.doc.createElementNS(this.doc.documentElement.namespaceURI, 'Terminal');
            toTermElement.setAttributeNS(sldNs, `${this.nsp}:uuid`, toTermUUID);
            const toTermName = toTerminal === 'top' ? 'T1' : 'T2';
            toTermElement.setAttribute('name', toTermName);
            toTermElement.setAttribute('connectivityNode', connectivityNode);
            toTermElement.setAttribute('substationName', substationName);
            toTermElement.setAttribute('voltageLevelName', voltageLevelName);
            toTermElement.setAttribute('bayName', bayName);
            toTermElement.setAttribute('cNodeName', cNodeName);
            edits.push({
                node: toTermElement,
                parent: connectTo,
                reference: getReference(connectTo, 'Terminal'),
            });
        }
        this.reset();
        this.dispatchEvent(newEditEventV2(edits));
    }
    render() {
        if (!this.doc)
            return x `<p>Please open an SCL document</p>`;
        return x `<main>
      ${Array.from(this.doc.querySelectorAll(':root > Substation')).map(subs => x `<sld-editor
            .doc=${this.doc}
            .editCount=${this.docVersion}
            .substation=${subs}
            .gridSize=${this.gridSize}
            .resizing=${this.resizing}
            .placing=${this.placing}
            .placingLabel=${this.placingLabel}
            .connecting=${this.connecting}
            @oscd-sld-start-resize=${({ detail }) => {
            this.startResizing(detail);
        }}
            @oscd-sld-start-place=${({ detail }) => {
            this.startPlacing(detail);
        }}
            @oscd-sld-start-place-label=${({ detail }) => {
            this.startPlacingLabel(detail);
        }}
            @oscd-sld-start-connect=${({ detail }) => {
            this.startConnecting(detail);
        }}
            @oscd-sld-resize=${({ detail: { element, w, h } }) => {
            this.dispatchEvent(newEditEventV2({
                element,
                attributesNS: {
                    [sldNs]: {
                        w: w.toString(),
                        h: h.toString(),
                    },
                },
            }));
            this.reset();
        }}
            @oscd-sld-place=${({ detail: { element, parent, x, y }, }) => this.placeElement(element, parent, x, y)}
            @oscd-sld-place-label=${({ detail: { element, x, y }, }) => this.placeLabel(element, x, y)}
            @oscd-sld-connect=${({ detail }) => this.connectEquipment(detail)}
            @oscd-sld-rotate=${({ detail }) => this.rotateElement(detail)}
          ></sld-editor>`)}
      <nav>
        ${Array.from(this.doc.documentElement.children).find(c => c.tagName === 'Substation')
            ? x ``
            : A}${Array.from(this.doc.querySelectorAll(':root > Substation > VoltageLevel > Bay')).find(bay => !isBusBar(bay))
            ? eqTypes
                .map(eqType => x `<mwc-fab
                    mini
                    label="Add ${eqType}"
                    @click=${() => {
                const element = this.templateElements.ConductingEquipment.cloneNode();
                element.setAttribute('type', eqType);
                this.startPlacing(element);
            }}
                    style="--mdc-theme-secondary: #fff; --mdc-theme-on-secondary: rgb(0, 0, 0 / 0.83)"
                    >${equipmentIcon(eqType)}</mwc-fab
                  >`)
                .concat()
            : A}${this.doc.querySelector(':root > Substation > VoltageLevel')
            ? x `<mwc-fab
                mini
                icon="horizontal_rule"
                @click=${() => {
                const element = this.templateElements.BusBar.cloneNode(true);
                this.startPlacing(element);
            }}
                label="Add Bus Bar"
                style="--mdc-theme-secondary: #fff; --mdc-theme-on-secondary: rgb(0, 0, 0 / 0.83)"
              >
              </mwc-fab
              ><mwc-fab
                mini
                label="Add Bay"
                @click=${() => {
                const element = this.templateElements.Bay.cloneNode();
                this.startPlacing(element);
            }}
                style="--mdc-theme-secondary: #12579B;"
              >
                ${bayIcon}
              </mwc-fab>`
            : A}${Array.from(this.doc.documentElement.children).find(c => c.tagName === 'Substation')
            ? x `<mwc-fab
              mini
              label="Add VoltageLevel"
              @click=${() => {
                const element = this.templateElements.VoltageLevel.cloneNode();
                this.startPlacing(element);
            }}
              style="--mdc-theme-secondary: #F5E214; --mdc-theme-on-secondary: rgb(0, 0, 0 / 0.83);"
            >
              ${voltageLevelIcon}
            </mwc-fab>`
            : A}<mwc-fab
          mini
          icon="margin"
          @click=${() => this.insertSubstation()}
          label="Add Substation"
          style="--mdc-theme-secondary: #BB1326;"
        >
        </mwc-fab
        ><mwc-icon-button
          icon="zoom_in"
          label="Zoom In"
          @click=${() => this.zoomIn()}
        >
        </mwc-icon-button
        ><mwc-icon-button
          icon="zoom_out"
          label="Zoom Out"
          @click=${() => this.zoomOut()}
        >
        </mwc-icon-button
        >${this.placing || this.resizing || this.connecting || this.placingLabel
            ? x `<mwc-icon-button
              icon="close"
              label="Cancel action"
              @click=${() => this.reset()}
            >
            </mwc-icon-button>`
            : A}
      </nav>
    </main>`;
    }
    insertSubstation() {
        const parent = this.doc.documentElement;
        const node = this.doc.createElementNS(this.doc.documentElement.namespaceURI, 'Substation');
        const reference = getReference(parent, 'Substation');
        let index = 1;
        while (this.doc.querySelector(`:root > Substation[name="S${index}"]`))
            index += 1;
        node.setAttribute('name', `S${index}`);
        node.setAttributeNS(sldNs, `${this.nsp}:w`, '50');
        node.setAttributeNS(sldNs, `${this.nsp}:h`, '25');
        this.dispatchEvent(newEditEventV2({ parent, node, reference }));
    }
}
OscdEditorSLD.styles = i$6 `
    main {
      padding: 16px;
    }

    div {
      margin-top: 12px;
    }

    nav {
      user-select: none;
      position: fixed;
      bottom: 4px;
      left: 4px;
      background: #fffd;
      border-radius: 24px;
    }
  `;
__decorate([
    n$4({ type: Object })
], OscdEditorSLD.prototype, "doc", void 0);
__decorate([
    n$4({ type: Number })
], OscdEditorSLD.prototype, "docVersion", null);
__decorate([
    t$1()
], OscdEditorSLD.prototype, "_docVersion", void 0);
__decorate([
    t$1()
], OscdEditorSLD.prototype, "gridSize", void 0);
__decorate([
    t$1()
], OscdEditorSLD.prototype, "nsp", void 0);
__decorate([
    t$1()
], OscdEditorSLD.prototype, "templateElements", void 0);
__decorate([
    t$1()
], OscdEditorSLD.prototype, "resizing", void 0);
__decorate([
    t$1()
], OscdEditorSLD.prototype, "placing", void 0);
__decorate([
    t$1()
], OscdEditorSLD.prototype, "placingLabel", void 0);
__decorate([
    t$1()
], OscdEditorSLD.prototype, "connecting", void 0);

export { OscdEditorSLD as default };
//# sourceMappingURL=oscd-editor-sld.js.map
