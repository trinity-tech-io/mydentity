(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8842],{41101:function(e,t,n){"use strict";n.d(t,{Z:function(){return useTheme}}),n(2265);var r=n(95270),o=n(53794),i=n(53469);function useTheme(){let e=(0,r.Z)(o.Z);return e[i.Z]||e}},30928:function(e,t,n){Promise.resolve().then(n.bind(n,11453))},11453:function(e,t,n){"use strict";n.r(t);var r=n(57437),o=n(22135),i=n(41101),s=n(39513),a=n(4185),l=n(23785),c=n(92e3);t.default=()=>{let e=(0,c.useRouter)(),t=(0,i.Z)(),n=(0,o.Z)(t.breakpoints.down("md")),u=n?20:25,handleButton=t=>{e.push(t.currentTarget.value)};return(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsxs)("div",{className:"inline-block text-left mb-6 md:mb-10",children:[(0,r.jsx)(a.Z,{value:n?"Yo,Ready to dive in?":"Hello! Ready to dive in? Sign in to continue",text:"Hello! Ready to dive in? Sign in to continue",height:30,textClassName:n?"tracking-[1px] text-sm":"tracking-[5px] text-xl"}),(0,r.jsx)("br",{}),(0,r.jsx)(a.Z,{value:n?"yo journey or join":"your journey or join us signing",text:"your journey or join us by signing up.",height:30,textClassName:n?"":"tracking-[3px] text-xl"})]}),(0,r.jsxs)("div",{className:"flex justify-center gap-2 md:gap-4",children:[(0,r.jsx)(s.TJ,{content:(0,r.jsxs)("div",{className:"pt-[10%]",children:[(0,r.jsx)(a.Z,{value:n?"keep":"keeping",text:"Gate keeping",textClassName:n?"text-[10pt] tracking-[1px]":"text-sm tracking-[4px]",height:u}),(0,r.jsx)("br",{}),(0,r.jsx)(a.Z,{value:n?"essent":"essentials",text:"the essentials",textClassName:n?"text-[10pt] tracking-[2px]":"text-sm tracking-[6px]",height:u})]}),footer:(0,r.jsx)(l.Kz,{id:"signin-btn",color:"primary",className:"w-4/5 md:w-3/5",value:"signin",onClick:handleButton,children:"SIGN IN"})}),(0,r.jsx)(s.TJ,{content:(0,r.jsxs)("div",{className:"pt-[10%]",children:[(0,r.jsx)(a.Z,{value:n?"Forg":"Forging",text:"Forging your",textClassName:n?"text-[10pt] tracking-[2px]":"text-sm tracking-[4px]",height:u}),(0,r.jsx)("br",{}),(0,r.jsx)(a.Z,{value:n?"identy":"idenjourney",text:"identity journey",textClassName:n?"text-[10pt] tracking-[2px]":"text-sm tracking-[6px]",height:u})]}),footer:(0,r.jsx)(l.Kz,{id:"signup-btn",color:"primary",className:"w-4/5 md:w-3/5",value:"register",onClick:handleButton,children:"SIGN UP"})})]})]})}},4185:function(e,t,n){"use strict";var r=n(57437),o=n(35843),i=n(65790),s=n.n(i),a=n(57042);let l=(0,o.ZP)("h5")(e=>{let{theme:t}=e;return{textAlign:"justify","&:after":{content:"''",width:"100%",display:"inline-block"}}});t.Z=e=>{let{value:t,text:n,height:o=35,outerClassName:i="",textClassName:c=""}=e;return(0,r.jsxs)("div",{className:(0,a.Z)("inline-flex flex-col",i),children:[(0,r.jsx)(s(),{value:t,displayValue:!1,margin:0,background:"#ffffffff00",lineColor:"#ffffff",height:35,width:1.3,height:o}),(0,r.jsx)(l,{className:(0,a.Z)("text-white h5",c),children:n})]})}},37673:function(e,t){"use strict";/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=Symbol.for("react.element"),r=(Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.memo"),Symbol.for("react.lazy"),{isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}}),o=Object.assign,i={};function E(e,t,n){this.props=e,this.context=t,this.refs=i,this.updater=n||r}function F(){}function G(e,t,n){this.props=e,this.context=t,this.refs=i,this.updater=n||r}E.prototype.isReactComponent={},E.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},E.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},F.prototype=E.prototype;var s=G.prototype=new F;s.constructor=G,o(s,E.prototype),s.isPureReactComponent=!0;var a=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};t.createElement=function(e,t,r){var o,i={},s=null,c=null;if(null!=t)for(o in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(s=""+t.key),t)a.call(t,o)&&!l.hasOwnProperty(o)&&(i[o]=t[o]);var u=arguments.length-2;if(1===u)i.children=r;else if(1<u){for(var f=Array(u),p=0;p<u;p++)f[p]=arguments[p+2];i.children=f}if(e&&e.defaultProps)for(o in u=e.defaultProps)void 0===i[o]&&(i[o]=u[o]);return{$$typeof:n,type:e,key:s,ref:c,props:i,_owner:null}}},90952:function(e,t,n){"use strict";e.exports=n(37673)}},function(e){e.O(0,[395,1228,5295,1510,1396,6953,2e3,182,3691,3202,9513,2971,7864,1744],function(){return e(e.s=30928)}),_N_E=e.O()}]);