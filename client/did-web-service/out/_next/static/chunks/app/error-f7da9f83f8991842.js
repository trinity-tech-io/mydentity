(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7601],{94971:function(r,o,e){Promise.resolve().then(e.bind(e,19438))},19438:function(r,o,e){"use strict";e.r(o);var n=e(57437),t=e(36079),i=e(2265);o.default=r=>{let{error:o,reset:e}=r;return(0,i.useEffect)(()=>{try{t.k.error("Global",o)}catch(r){console.warn(r)}},[o]),(0,n.jsx)("div",{children:(0,n.jsx)("h2",{children:"Something went wrong! "})})}},36079:function(r,o,e){"use strict";e.d(o,{k:function(){return l},m:function(){return DIDWebConnectivityLogger}});var n=e(62067),t=e.n(n);let i={default:"#008730",hive:"#5226af",did:"#06c4ce",identity:"#40C770","custodial-provider":"#40C770",connectivity:"#444444",security:"#bc3bef"};function getBackgroundColor(r){return i[r]||i.default}let l=new class{init(r){this.originalConsole=r,this.originalDebugLog=this.originalConsole.log,this.originalDebugWarn=this.originalConsole.warn,this.originalDebugErr=this.originalConsole.error}log(r){for(var o,e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];let l=getBackgroundColor(r);null===(o=this.originalDebugLog)||void 0===o||o.apply(this.originalConsole,["%c"+t()(new Date().getTime()).format("HH:mm:ss.SSS")+" "+r.toUpperCase()+"*","background: ".concat(l,"; color: #FFF; font-weight:bold; padding:5px;"),...n])}warn(r){for(var o,e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];let l=getBackgroundColor(r);null===(o=this.originalDebugWarn)||void 0===o||o.apply(this.originalConsole,["%c"+t()(new Date().getTime()).format("HH:mm:ss.SSS")+" "+r.toUpperCase()+"*","background: ".concat(l,"; color: #FFF; font-weight:bold; padding:5px;"),...n])}error(r){for(var o,e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];let l=getBackgroundColor(r);null===(o=this.originalDebugErr)||void 0===o||o.apply(this.originalConsole,["%c"+t()(new Date().getTime()).format("HH:mm:ss.SSS")+" "+r.toUpperCase()+"*","background: ".concat(l,"; color: #FFF; font-weight:bold; padding:5px;"),...n])}test(r){for(var o,e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];let l=getBackgroundColor(r);null===(o=this.originalDebugLog)||void 0===o||o.apply(this.originalConsole,["%c"+t()(new Date().getTime()).format("HH:mm:ss.SSS")+" "+r.toUpperCase()+"* TEST","background: ".concat(l,"; color: #FFF; font-weight:bold; padding:5px;"),...n])}constructor(){this.originalConsole=null}};let DIDWebConnectivityLogger=class DIDWebConnectivityLogger{log(){for(var r=arguments.length,o=Array(r),e=0;e<r;e++)o[e]=arguments[e];l.log.apply(l,["connectivity",...o])}warn(){for(var r=arguments.length,o=Array(r),e=0;e<r;e++)o[e]=arguments[e];l.warn.apply(l,["connectivity",...o])}error(){for(var r=arguments.length,o=Array(r),e=0;e<r;e++)o[e]=arguments[e];l.error.apply(l,["connectivity",...o])}}},30622:function(r,o,e){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=e(2265),t=Symbol.for("react.element"),i=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,a=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function q(r,o,e){var n,i={},s=null,g=null;for(n in void 0!==e&&(s=""+e),void 0!==o.key&&(s=""+o.key),void 0!==o.ref&&(g=o.ref),o)l.call(o,n)&&!c.hasOwnProperty(n)&&(i[n]=o[n]);if(r&&r.defaultProps)for(n in o=r.defaultProps)void 0===i[n]&&(i[n]=o[n]);return{$$typeof:t,type:r,key:s,ref:g,props:i,_owner:a.current}}o.Fragment=i,o.jsx=q,o.jsxs=q},57437:function(r,o,e){"use strict";r.exports=e(30622)}},function(r){r.O(0,[6990,2971,7864,1744],function(){return r(r.s=94971)}),_N_E=r.O()}]);