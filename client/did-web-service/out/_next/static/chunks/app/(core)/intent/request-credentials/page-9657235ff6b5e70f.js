(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7524],{40471:function(r,e,t){"use strict";t.d(e,{Z:function(){return _}});var n=t(20791),a=t(13428),i=t(2265),o=t(57042),s=t(95600),l=t(99538),u=t(89975),c=t(28702),f=t(41101),d=t(35843),b=t(87927),m=t(26520),p=t(25702);function v(r){return(0,p.Z)("MuiLinearProgress",r)}(0,m.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var h=t(57437);let g=["className","color","value","valueBuffer","variant"],y=r=>r,x,w,Z,P,k,C,j=(0,l.F4)(x||(x=y`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),$=(0,l.F4)(w||(w=y`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),S=(0,l.F4)(Z||(Z=y`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),q=r=>{let{classes:e,variant:t,color:n}=r,a={root:["root",`color${(0,c.Z)(n)}`,t],dashed:["dashed",`dashedColor${(0,c.Z)(n)}`],bar1:["bar",`barColor${(0,c.Z)(n)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,c.Z)(n)}`,"buffer"===t&&`color${(0,c.Z)(n)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,s.Z)(a,v,e)},I=(r,e)=>"inherit"===e?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:"light"===r.palette.mode?(0,u.$n)(r.palette[e].main,.62):(0,u._j)(r.palette[e].main,.5),N=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.root,e[`color${(0,c.Z)(t.color)}`],e[t.variant]]}})(({ownerState:r,theme:e})=>(0,a.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:I(e,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"})),B=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.dashed,e[`dashedColor${(0,c.Z)(t.color)}`]]}})(({ownerState:r,theme:e})=>{let t=I(e,r.color);return(0,a.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},(0,l.iv)(P||(P=y`
    animation: ${0} 3s infinite linear;
  `),S)),L=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,c.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})(({ownerState:r,theme:e})=>(0,a.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(k||(k=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),j)),R=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,c.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})(({ownerState:r,theme:e})=>(0,a.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:I(e,r.color),transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(C||(C=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),$)),M=i.forwardRef(function(r,e){let t=(0,b.Z)({props:r,name:"MuiLinearProgress"}),{className:i,color:s="primary",value:l,valueBuffer:u,variant:c="indeterminate"}=t,d=(0,n.Z)(t,g),m=(0,a.Z)({},t,{color:s,variant:c}),p=q(m),v=(0,f.Z)(),y={},x={bar1:{},bar2:{}};if(("determinate"===c||"buffer"===c)&&void 0!==l){y["aria-valuenow"]=Math.round(l),y["aria-valuemin"]=0,y["aria-valuemax"]=100;let r=l-100;"rtl"===v.direction&&(r=-r),x.bar1.transform=`translateX(${r}%)`}if("buffer"===c&&void 0!==u){let r=(u||0)-100;"rtl"===v.direction&&(r=-r),x.bar2.transform=`translateX(${r}%)`}return(0,h.jsxs)(N,(0,a.Z)({className:(0,o.Z)(p.root,i),ownerState:m,role:"progressbar"},y,{ref:e},d,{children:["buffer"===c?(0,h.jsx)(B,{className:p.dashed,ownerState:m}):null,(0,h.jsx)(L,{className:p.bar1,ownerState:m,style:x.bar1}),"determinate"===c?null:(0,h.jsx)(R,{className:p.bar2,ownerState:m,style:x.bar2})]}))});var _=M},88798:function(r,e,t){Promise.resolve().then(t.bind(t,72030))},48750:function(r,e,t){"use strict";t.d(e,{O:function(){return o}});var n=t(57437),a=t(40471),i=t(57042);let o=r=>{let{className:e}=r;return(0,n.jsxs)("div",{className:(0,i.Z)("flex flex-col w-full",e),children:[(0,n.jsx)("div",{className:"italic",children:"Preparing request, hold on..."}),(0,n.jsx)(a.Z,{})]})}},72030:function(r,e,t){"use strict";t.r(e);var n=t(57437),a=t(12131),i=t(451),o=t(53932),s=t(85688),l=t(53445),u=t(2265),c=t(48750),f=t(24033);let d=r=>{let{intent:e}=r,[t]=(0,i.V)(o.B),[c,f]=(0,u.useState)(!1),d=e.requestPayload;console.log("payload",d);let b=async()=>{f(!0);let r=await t.createVerifiablePresentation([],d.realm,d.nonce),n=r.toString(!0),a=await (0,s.h)(e.id,n);if(a){let r=(0,l.Q)(e.redirectUrl,"rid",e.id);window.location.href=r}};return(0,n.jsxs)(n.Fragment,{children:["This app XXX is requesting information from you:",(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),"Intent: ",e.id,(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),"List of credentials",(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),t&&(0,n.jsx)(a.c,{onClick:b,busy:c,children:"Approve"}),!t&&"Make an identity active to continue"]})};e.default=()=>{let r=(0,f.useSearchParams)(),e=r.get("rid"),[t,a]=(0,u.useState)(!0),[i,o]=(0,u.useState)(null);return(0,u.useEffect)(()=>{e&&(0,s.S)(e).then(r=>{a(!1),o(r),console.log("intent result",r)})},[]),(0,n.jsxs)("div",{className:"col-span-full",children:[t&&(0,n.jsx)(c.O,{className:"mb-6"}),!t&&i&&(0,n.jsx)(d,{intent:i}),!t&&!i&&(0,n.jsx)("div",{children:"No matching request"})]})}},85688:function(r,e,t){"use strict";t.d(e,{S:function(){return f},h:function(){return d}});var n=t(60230),a=t(23965);class i{static async fromJson(r){let e=new i;return Object.assign(e,r),e.createdAt=new Date(r.createdAt),e}}var o=t(51385),s=t(76506),l=t(3883);function u(){let r=(0,n._)(["\n      query GetIntentRequest($intentId: String!) {\n        intent (id: $intentId) {\n          ","\n        }\n      }\n    "]);return u=function(){return r},r}function c(){let r=(0,n._)(["\n      mutation FulfilIntentRequest($input: FulfilIntentInput!) {\n        fulfilIntent (input: $input)\n      }\n    "]);return c=function(){return r},r}async function f(r){let{data:e}=await (0,o.Pt)(async()=>(await (0,s.W)()).query({query:(0,a.Ps)(u(),"\n  id\n  createdAt\n  type\n  redirectUrl\n  requestPayload\n  responsePayload\n"),variables:{intentId:r}}));if(e&&e.intent){let r=await i.fromJson(e.intent);return l.k.log("intents","Fetched intent:",r),r}return l.k.warn("intents","No intent found for id ".concat(r)),null}async function d(r,e){let{data:t}=await (0,o.Pt)(async()=>(await (0,s.W)()).mutate({mutation:(0,a.Ps)(c()),variables:{input:{intentId:r,payload:e}}}));return t&&t.fulfilIntent?(l.k.log("intents","Successfully fulfilled intent id ".concat(r)),!0):(l.k.warn("intents","Failed to fulfil intent id ".concat(r)),!1)}},53445:function(r,e,t){"use strict";function n(r,e,t){let n=new URL(r),a=new URLSearchParams(n.search);return a.set(e,t),n.search=a.toString(),n.toString()}t.d(e,{Q:function(){return n}})},24033:function(r,e,t){r.exports=t(68165)}},function(r){r.O(0,[6990,9787,9443,8218,6110,2361,8920,7679,3412,6432,1305,2971,596,1744],function(){return r(r.s=88798)}),_N_E=r.O()}]);