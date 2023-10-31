(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{29872:function(e,t,a){"use strict";a.d(t,{Z:function(){return p}});var l=a(20791),s=a(13428),n=a(2265),r=a(57042),i=a(95600),o=a(89975),c=a(35843),styles_getOverlayAlpha=e=>((e<1?5.11916*e**2:4.5*Math.log(e+1)+2)/100).toFixed(2),u=a(87927),d=a(26520),v=a(25702);function getPaperUtilityClass(e){return(0,v.Z)("MuiPaper",e)}(0,d.Z)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var x=a(57437);let h=["className","component","elevation","square","variant"],useUtilityClasses=e=>{let{square:t,elevation:a,variant:l,classes:s}=e,n={root:["root",l,!t&&"rounded","elevation"===l&&`elevation${a}`]};return(0,i.Z)(n,getPaperUtilityClass,s)},f=(0,c.ZP)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,t[a.variant],!a.square&&t.rounded,"elevation"===a.variant&&t[`elevation${a.elevation}`]]}})(({theme:e,ownerState:t})=>{var a;return(0,s.Z)({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},"outlined"===t.variant&&{border:`1px solid ${(e.vars||e).palette.divider}`},"elevation"===t.variant&&(0,s.Z)({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&"dark"===e.palette.mode&&{backgroundImage:`linear-gradient(${(0,o.Fq)("#fff",styles_getOverlayAlpha(t.elevation))}, ${(0,o.Fq)("#fff",styles_getOverlayAlpha(t.elevation))})`},e.vars&&{backgroundImage:null==(a=e.vars.overlays)?void 0:a[t.elevation]}))}),m=n.forwardRef(function(e,t){let a=(0,u.Z)({props:e,name:"MuiPaper"}),{className:n,component:i="div",elevation:o=1,square:c=!1,variant:d="elevation"}=a,v=(0,l.Z)(a,h),m=(0,s.Z)({},a,{component:i,elevation:o,square:c,variant:d}),p=useUtilityClasses(m);return(0,x.jsx)(f,(0,s.Z)({as:i,ownerState:m,className:(0,r.Z)(p.root,n),ref:t},v))});var p=m},41101:function(e,t,a){"use strict";a.d(t,{Z:function(){return useTheme}}),a(2265);var l=a(95270),s=a(53794),n=a(53469);function useTheme(){let e=(0,l.Z)(s.Z);return e[n.Z]||e}},88519:function(e,t,a){"use strict";var l=a(1091);t.Z=l.Z},43381:function(e,t,a){"use strict";a.d(t,{Z:function(){return extendSxProp}});var l=a(13428),s=a(20791),n=a(15959),r=a(58122);let i=["sx"],splitProps=e=>{var t,a;let l={systemProps:{},otherProps:{}},s=null!=(t=null==e||null==(a=e.theme)?void 0:a.unstable_sxConfig)?t:r.Z;return Object.keys(e).forEach(t=>{s[t]?l.systemProps[t]=e[t]:l.otherProps[t]=e[t]}),l};function extendSxProp(e){let t;let{sx:a}=e,r=(0,s.Z)(e,i),{systemProps:o,otherProps:c}=splitProps(r);return t=Array.isArray(a)?[o,...a]:"function"==typeof a?(...e)=>{let t=a(...e);return(0,n.P)(t)?(0,l.Z)({},o,t):o}:(0,l.Z)({},o,a),(0,l.Z)({},c,{sx:t})}},33449:function(e,t,a){"use strict";a.d(t,{Z:function(){return useId}});var l,s=a(2265);let n=0,r=(l||(l=a.t(s,2)))["useId".toString()];function useId(e){if(void 0!==r){let t=r();return null!=e?e:t}return function(e){let[t,a]=s.useState(e),l=e||t;return s.useEffect(()=>{null==t&&(n+=1,a(`mui-${n}`))},[t]),l}(e)}},58070:function(e,t,a){"use strict";var l,s,n=a(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e}).apply(this,arguments)}t.Z=function(e){return n.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:86,height:30,fill:"none"},e),l||(l=n.createElement("path",{fill:"#fff",d:"M43.624 2.239v9.663h-1.948V2.239h-3.722V.405h9.42v1.834h-3.75ZM52.322 5.879a4.637 4.637 0 0 0-.62-.043c-1.457 0-2.12.837-2.12 2.325v3.77h-1.876V4h1.832v1.271c.375-.866 1.24-1.357 2.28-1.357.23 0 .418.028.504.043v1.92ZM54.818 0c.678 0 1.226.549 1.226 1.228 0 .679-.548 1.213-1.226 1.213a1.21 1.21 0 0 1-1.212-1.213c0-.68.549-1.228 1.212-1.228Zm-.923 11.902V4h1.86v7.9h-1.86ZM60.07 11.902h-1.876v-7.9h1.817v1.054c.52-.91 1.457-1.286 2.337-1.286 1.933 0 2.857 1.401 2.857 3.134v4.998h-1.876V7.237c0-.968-.432-1.748-1.615-1.748-1.068 0-1.63.823-1.63 1.863v4.55h-.015ZM68.407 0c.678 0 1.227.549 1.227 1.228 0 .679-.549 1.213-1.227 1.213a1.21 1.21 0 0 1-1.211-1.213c0-.68.548-1.228 1.211-1.228Zm-.923 11.902V4h1.861v7.9h-1.86ZM74.163 4h1.63v1.676h-1.63v3.669c0 .693.303.997 1.01.997.26 0 .563-.044.65-.058v1.56c-.116.043-.477.173-1.155.173-1.457 0-2.366-.881-2.366-2.354V5.676h-1.471V4.001h.404c.836 0 1.212-.535 1.212-1.228V1.589h1.702V4h.014ZM78.231 15.108l1.89-4.13-3.376-6.963h2.12l2.266 4.998 2.12-4.998h1.99l-5.02 11.093h-1.99ZM43.624 20.077v9.663h-1.948v-9.663h-3.722v-1.834h9.42v1.834h-3.75ZM54.24 27.487c-.418 1.372-1.673 2.499-3.562 2.499-2.135 0-4.04-1.56-4.04-4.232 0-2.5 1.847-4.16 3.838-4.16 2.423 0 3.851 1.603 3.851 4.102 0 .303-.029.563-.043.606h-5.77c.043 1.2.995 2.066 2.15 2.066 1.139 0 1.716-.607 1.976-1.372l1.6.49Zm-1.802-2.557c-.03-.924-.65-1.747-1.948-1.747-1.183 0-1.86.91-1.933 1.747h3.88ZM57.386 25.782c0 1.59 1.024 2.485 2.207 2.485 1.226 0 1.803-.867 1.977-1.46l1.659.608C62.853 28.642 61.67 30 59.593 30c-2.322 0-4.082-1.805-4.082-4.203 0-2.427 1.76-4.189 4.039-4.189 2.12 0 3.29 1.329 3.606 2.6l-1.687.621c-.174-.693-.707-1.473-1.919-1.473-1.14-.015-2.164.838-2.164 2.426ZM66.763 29.74h-1.876V17.997h1.876v4.608c.533-.694 1.428-.997 2.25-.997 1.947 0 2.885 1.401 2.885 3.134v4.998h-1.875v-4.665c0-.968-.433-1.748-1.616-1.748-1.038 0-1.601.78-1.63 1.79v4.623h-.014ZM8.526 9.1V7.583l-.606-.347-3.982-2.31 4.588-2.644V.766L8.05.49 7.328.072 7.213 0l-.115.072-.679.39L0 4.174v17.203l.678.39.433.26.202.115.115-.072.952-.549.246-.144V7.207l3.851 2.225.62.36.116.073.952-.549.36-.216ZM29.183 3.842l-.447-.274-.158-.087-.375-.217-4.79-2.773-.736-.419L22.562 0l-.115.072-.736.42-.462.274v1.516l4.588 2.643-3.953 2.297-.635.361V9.1l1.082.635.217.13h.014l.202-.115.635-.376 3.75-2.167v14.17l.592.347.606.346.115.072.044-.029.706-.404.563-.332V4.174l-.591-.332ZM8.987 23.544l-.029.014-.634.361-.65.376v1.516l5.006 2.904 1.948 1.126.245.145h.014l.116-.073.086-.043 2.424-1.401-3.938-2.268-4.588-2.657Z"})),s||(s=n.createElement("path",{fill:"#fff",d:"m21.494 23.948-.52-.303-.187-.101L16.2 26.2V12.017l-.289-.158-.908-.535-.116-.058-.115.058-1.097.636-.1.057v14.184l1.312.751 2.626 1.517.534-.303L22.1 25.81v-1.516l-.606-.347Z"})))}},74372:function(e,t,a){Promise.resolve().then(a.bind(a,1295))},4185:function(e,t,a){"use strict";var l=a(57437),s=a(35843),n=a(65790),r=a.n(n),i=a(57042);let o=(0,s.ZP)("h5")(e=>{let{theme:t}=e;return{textAlign:"justify","&:after":{content:"''",width:"100%",display:"inline-block"}}});t.Z=e=>{let{value:t,text:a,height:s=35,outerClassName:n="",textClassName:c=""}=e;return(0,l.jsxs)("div",{className:(0,i.Z)("inline-flex flex-col",n),children:[(0,l.jsx)(r(),{value:t,displayValue:!1,margin:0,background:"#ffffffff00",lineColor:"#ffffff",height:35,width:1.3,height:s}),(0,l.jsx)(o,{className:(0,i.Z)("text-white h5",c),children:a})]})}},40542:function(e,t,a){"use strict";a.d(t,{V:function(){return useBehaviorSubject}});var l=a(2265);let useBehaviorSubject=e=>{let[t,a]=(0,l.useState)(null==e?void 0:e.getValue()),[s,n]=(0,l.useState)();return(0,l.useEffect)(()=>{if(!e){a(null);return}let t=e.subscribe({next:e=>{a(e)},error:n});return()=>t.unsubscribe()},[e]),[t]}},1295:function(e,t,a){"use strict";a.r(t);var l=a(57437),s=a(2265),n=a(22135),r=a(41101),i=a(92e3),o=a(39513),c=a(4185),u=a(23785),d=a(58070),v=a(14776),x=a(40542);let WelcomeCard=()=>(0,l.jsx)(o.Gt,{className:"max-xl:w-11/12 lg:w-[450px] sm:w-8/12 bg-black",children:(0,l.jsxs)("div",{children:[(0,l.jsx)(c.Z,{value:"Welcome to future",text:"Welcome to the future",textClassName:"text-sm tracking-[7px]",height:22}),(0,l.jsx)("br",{}),(0,l.jsx)(c.Z,{value:"identity",text:"of identity",textClassName:"text-sm tracking-[9px]",height:22})]})});t.default=()=>{let e=(0,i.useRouter)(),t=(0,r.Z)(),a=(0,n.Z)(t.breakpoints.down("md")),[o]=(0,x.V)(v.jU),h=(0,v.M6)(),f=(0,s.useCallback)(()=>{e.push(h?"dashboard":"entry")},[o]);return a?(0,l.jsxs)("main",{className:"flex min-h-screen flex-col",children:[(0,l.jsxs)("div",{className:"flex flex-1 flex-col landing-bg",children:[(0,l.jsxs)("div",{className:"p-8",children:[(0,l.jsxs)("h1",{className:"text-white h1",children:["Take back",(0,l.jsx)("br",{}),"control of your"]}),(0,l.jsx)(c.Z,{value:"identity",text:"i d e n t i t y",outerClassName:"pt-2",textClassName:"text-lg"}),(0,l.jsx)("p",{className:"text-gray-300 md:text-xl",children:"In an era of increasing data breaches, decentralized credentials offer a robust solution for safeguarding personal information."})]}),(0,l.jsx)("div",{className:"flex items-center justify-center",children:(0,l.jsx)(WelcomeCard,{})}),(0,l.jsx)("div",{className:"text-center p-7",children:(0,l.jsx)(u.hO,{variant:"contained",onClick:f,children:"LAUNCH APP"})})]}),(0,l.jsxs)("div",{className:"bg-black p-6",children:[(0,l.jsx)(c.Z,{value:"Decentralized Srv",text:"Decentralized Identity Web Service",textClassName:"text-xs tracking-[2px]",height:15}),(0,l.jsx)("br",{}),(0,l.jsx)(c.Z,{value:"Elastos",text:"Powered by Elastos",outerClassName:"pt-2",textClassName:"text-xs tracking-[1.5px]",height:15}),(0,l.jsx)("div",{className:"relative",children:(0,l.jsx)(d.Z,{className:"absolute bottom-0 right-0"})})]})]}):(0,l.jsxs)("main",{className:"flex min-h-screen",children:[(0,l.jsx)("div",{className:"w-full md:w-2/5 bg-black pt-12 md:pt-24 px-8 flex justify-center",children:(0,l.jsxs)("div",{className:"max-w-md flex flex-col",children:[(0,l.jsxs)("div",{className:"flex-1",children:[(0,l.jsx)("h1",{className:"text-white h1",children:"Take back control of your"}),(0,l.jsx)(c.Z,{value:"identity",text:"i d e n t i t y",outerClassName:"pt-2",textClassName:"text-lg"}),(0,l.jsx)("p",{className:"text-gray-300 md:text-xl",children:"In an era of increasing data breaches, decentralized credentials offer a robust solution for safeguarding personal information."})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(c.Z,{value:"Decentralized Srv",text:"Decentralized Identity Web Service",outerClassName:"pt-2",textClassName:"text-xs tracking-[2px]",height:15}),(0,l.jsx)("br",{}),(0,l.jsx)(c.Z,{value:"Elastos",text:"Powered by Elastos",outerClassName:"pt-2",textClassName:"text-xs tracking-[1.5px]",height:15})]})]})}),(0,l.jsxs)("div",{className:"flex flex-1 flex-col landing-bg",children:[(0,l.jsx)("div",{className:"text-right p-7",children:(0,l.jsx)(u.hO,{id:"launch-app",className:"flex-1",variant:"contained",onClick:f,children:"LAUNCH APP"})}),(0,l.jsx)("div",{className:"flex flex-1",children:(0,l.jsx)("div",{className:"flex items-center justify-center w-full",children:(0,l.jsx)(WelcomeCard,{})})}),(0,l.jsx)("div",{className:"flex justify-end p-7",children:(0,l.jsx)(d.Z,{})})]})]})}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,6506,3824,1228,1711,5295,1510,6953,1396,2e3,894,7091,7056,9513,2971,7864,1744],function(){return e(e.s=74372)}),_N_E=e.O()}]);