(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{96507:function(e,t,i){"use strict";i.d(t,{Z:function(){return p}});var a=i(13428),r=i(20791),l=i(2265),n=i(57042),s=i(69613),o=i(87947),c=i(43381),d=i(95270),h=i(57437);let v=["className","component"];var u=i(25097),f=i(78157),x=i(53469);let m=(0,f.Z)(),g=function(e={}){let{themeId:t,defaultTheme:i,defaultClassName:u="MuiBox-root",generateClassName:f}=e,x=(0,s.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(o.Z),m=l.forwardRef(function(e,l){let s=(0,d.Z)(i),o=(0,c.Z)(e),{className:m,component:g="div"}=o,p=(0,r.Z)(o,v);return(0,h.jsx)(x,(0,a.Z)({as:g,ref:l,className:(0,n.Z)(m,f?f(u):u),theme:t&&s[t]||s},p))});return m}({themeId:x.Z,defaultTheme:m,defaultClassName:"MuiBox-root",generateClassName:u.Z.generate});var p=g},54986:function(e,t,i){"use strict";var a=i(20791),r=i(13428),l=i(2265),n=i(57042),s=i(95600),o=i(89975),c=i(35843),d=i(87927),h=i(55563),v=i(57437);let u=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],useUtilityClasses=e=>{let{absolute:t,children:i,classes:a,flexItem:r,light:l,orientation:n,textAlign:o,variant:c}=e;return(0,s.Z)({root:["root",t&&"absolute",c,l&&"light","vertical"===n&&"vertical",r&&"flexItem",i&&"withChildren",i&&"vertical"===n&&"withChildrenVertical","right"===o&&"vertical"!==n&&"textAlignRight","left"===o&&"vertical"!==n&&"textAlignLeft"],wrapper:["wrapper","vertical"===n&&"wrapperVertical"]},h.V,a)},f=(0,c.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.root,i.absolute&&t.absolute,t[i.variant],i.light&&t.light,"vertical"===i.orientation&&t.vertical,i.flexItem&&t.flexItem,i.children&&t.withChildren,i.children&&"vertical"===i.orientation&&t.withChildrenVertical,"right"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignRight,"left"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignLeft]}})(({theme:e,ownerState:t})=>(0,r.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin"},t.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},t.light&&{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:(0,o.Fq)(e.palette.divider,.08)},"inset"===t.variant&&{marginLeft:72},"middle"===t.variant&&"horizontal"===t.orientation&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},"middle"===t.variant&&"vertical"===t.orientation&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"vertical"===t.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},t.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:e})=>(0,r.Z)({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:e,ownerState:t})=>(0,r.Z)({},t.children&&"vertical"!==t.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`}}),({theme:e,ownerState:t})=>(0,r.Z)({},t.children&&"vertical"===t.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`}}),({ownerState:e})=>(0,r.Z)({},"right"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),x=(0,c.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.wrapper,"vertical"===i.orientation&&t.wrapperVertical]}})(({theme:e,ownerState:t})=>(0,r.Z)({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`},"vertical"===t.orientation&&{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`})),m=l.forwardRef(function(e,t){let i=(0,d.Z)({props:e,name:"MuiDivider"}),{absolute:l=!1,children:s,className:o,component:c=s?"div":"hr",flexItem:h=!1,light:m=!1,orientation:g="horizontal",role:p="hr"!==c?"separator":void 0,textAlign:Z="center",variant:b="fullWidth"}=i,j=(0,a.Z)(i,u),w=(0,r.Z)({},i,{absolute:l,component:c,flexItem:h,light:m,orientation:g,role:p,textAlign:Z,variant:b}),N=useUtilityClasses(w);return(0,v.jsx)(f,(0,r.Z)({as:c,className:(0,n.Z)(N.root,o),role:p,ref:t,ownerState:w},j,{children:s?(0,v.jsx)(x,{className:N.wrapper,ownerState:w,children:s}):null}))});m.muiSkipListHighlight=!0,t.Z=m},55563:function(e,t,i){"use strict";i.d(t,{V:function(){return getDividerUtilityClass}});var a=i(26520),r=i(25702);function getDividerUtilityClass(e){return(0,r.Z)("MuiDivider",e)}let l=(0,a.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);t.Z=l},29872:function(e,t,i){"use strict";i.d(t,{Z:function(){return g}});var a=i(20791),r=i(13428),l=i(2265),n=i(57042),s=i(95600),o=i(89975),c=i(35843),styles_getOverlayAlpha=e=>((e<1?5.11916*e**2:4.5*Math.log(e+1)+2)/100).toFixed(2),d=i(87927),h=i(26520),v=i(25702);function getPaperUtilityClass(e){return(0,v.Z)("MuiPaper",e)}(0,h.Z)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var u=i(57437);let f=["className","component","elevation","square","variant"],useUtilityClasses=e=>{let{square:t,elevation:i,variant:a,classes:r}=e,l={root:["root",a,!t&&"rounded","elevation"===a&&`elevation${i}`]};return(0,s.Z)(l,getPaperUtilityClass,r)},x=(0,c.ZP)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.root,t[i.variant],!i.square&&t.rounded,"elevation"===i.variant&&t[`elevation${i.elevation}`]]}})(({theme:e,ownerState:t})=>{var i;return(0,r.Z)({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},"outlined"===t.variant&&{border:`1px solid ${(e.vars||e).palette.divider}`},"elevation"===t.variant&&(0,r.Z)({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&"dark"===e.palette.mode&&{backgroundImage:`linear-gradient(${(0,o.Fq)("#fff",styles_getOverlayAlpha(t.elevation))}, ${(0,o.Fq)("#fff",styles_getOverlayAlpha(t.elevation))})`},e.vars&&{backgroundImage:null==(i=e.vars.overlays)?void 0:i[t.elevation]}))}),m=l.forwardRef(function(e,t){let i=(0,d.Z)({props:e,name:"MuiPaper"}),{className:l,component:s="div",elevation:o=1,square:c=!1,variant:h="elevation"}=i,v=(0,a.Z)(i,f),m=(0,r.Z)({},i,{component:s,elevation:o,square:c,variant:h}),g=useUtilityClasses(m);return(0,u.jsx)(x,(0,r.Z)({as:s,ownerState:m,className:(0,n.Z)(g.root,l),ref:t},v))});var g=m},41101:function(e,t,i){"use strict";i.d(t,{Z:function(){return useTheme}}),i(2265);var a=i(95270),r=i(53794),l=i(53469);function useTheme(){let e=(0,a.Z)(r.Z);return e[l.Z]||e}},58070:function(e,t,i){"use strict";var a,r,l=i(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e}).apply(this,arguments)}t.Z=function(e){return l.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:86,height:30,fill:"none"},e),a||(a=l.createElement("path",{fill:"#fff",d:"M43.624 2.239v9.663h-1.948V2.239h-3.722V.405h9.42v1.834h-3.75ZM52.322 5.879a4.637 4.637 0 0 0-.62-.043c-1.457 0-2.12.837-2.12 2.325v3.77h-1.876V4h1.832v1.271c.375-.866 1.24-1.357 2.28-1.357.23 0 .418.028.504.043v1.92ZM54.818 0c.678 0 1.226.549 1.226 1.228 0 .679-.548 1.213-1.226 1.213a1.21 1.21 0 0 1-1.212-1.213c0-.68.549-1.228 1.212-1.228Zm-.923 11.902V4h1.86v7.9h-1.86ZM60.07 11.902h-1.876v-7.9h1.817v1.054c.52-.91 1.457-1.286 2.337-1.286 1.933 0 2.857 1.401 2.857 3.134v4.998h-1.876V7.237c0-.968-.432-1.748-1.615-1.748-1.068 0-1.63.823-1.63 1.863v4.55h-.015ZM68.407 0c.678 0 1.227.549 1.227 1.228 0 .679-.549 1.213-1.227 1.213a1.21 1.21 0 0 1-1.211-1.213c0-.68.548-1.228 1.211-1.228Zm-.923 11.902V4h1.861v7.9h-1.86ZM74.163 4h1.63v1.676h-1.63v3.669c0 .693.303.997 1.01.997.26 0 .563-.044.65-.058v1.56c-.116.043-.477.173-1.155.173-1.457 0-2.366-.881-2.366-2.354V5.676h-1.471V4.001h.404c.836 0 1.212-.535 1.212-1.228V1.589h1.702V4h.014ZM78.231 15.108l1.89-4.13-3.376-6.963h2.12l2.266 4.998 2.12-4.998h1.99l-5.02 11.093h-1.99ZM43.624 20.077v9.663h-1.948v-9.663h-3.722v-1.834h9.42v1.834h-3.75ZM54.24 27.487c-.418 1.372-1.673 2.499-3.562 2.499-2.135 0-4.04-1.56-4.04-4.232 0-2.5 1.847-4.16 3.838-4.16 2.423 0 3.851 1.603 3.851 4.102 0 .303-.029.563-.043.606h-5.77c.043 1.2.995 2.066 2.15 2.066 1.139 0 1.716-.607 1.976-1.372l1.6.49Zm-1.802-2.557c-.03-.924-.65-1.747-1.948-1.747-1.183 0-1.86.91-1.933 1.747h3.88ZM57.386 25.782c0 1.59 1.024 2.485 2.207 2.485 1.226 0 1.803-.867 1.977-1.46l1.659.608C62.853 28.642 61.67 30 59.593 30c-2.322 0-4.082-1.805-4.082-4.203 0-2.427 1.76-4.189 4.039-4.189 2.12 0 3.29 1.329 3.606 2.6l-1.687.621c-.174-.693-.707-1.473-1.919-1.473-1.14-.015-2.164.838-2.164 2.426ZM66.763 29.74h-1.876V17.997h1.876v4.608c.533-.694 1.428-.997 2.25-.997 1.947 0 2.885 1.401 2.885 3.134v4.998h-1.875v-4.665c0-.968-.433-1.748-1.616-1.748-1.038 0-1.601.78-1.63 1.79v4.623h-.014ZM8.526 9.1V7.583l-.606-.347-3.982-2.31 4.588-2.644V.766L8.05.49 7.328.072 7.213 0l-.115.072-.679.39L0 4.174v17.203l.678.39.433.26.202.115.115-.072.952-.549.246-.144V7.207l3.851 2.225.62.36.116.073.952-.549.36-.216ZM29.183 3.842l-.447-.274-.158-.087-.375-.217-4.79-2.773-.736-.419L22.562 0l-.115.072-.736.42-.462.274v1.516l4.588 2.643-3.953 2.297-.635.361V9.1l1.082.635.217.13h.014l.202-.115.635-.376 3.75-2.167v14.17l.592.347.606.346.115.072.044-.029.706-.404.563-.332V4.174l-.591-.332ZM8.987 23.544l-.029.014-.634.361-.65.376v1.516l5.006 2.904 1.948 1.126.245.145h.014l.116-.073.086-.043 2.424-1.401-3.938-2.268-4.588-2.657Z"})),r||(r=l.createElement("path",{fill:"#fff",d:"m21.494 23.948-.52-.303-.187-.101L16.2 26.2V12.017l-.289-.158-.908-.535-.116-.058-.115.058-1.097.636-.1.057v14.184l1.312.751 2.626 1.517.534-.303L22.1 25.81v-1.516l-.606-.347Z"})))}},12059:function(e,t,i){Promise.resolve().then(i.bind(i,1295))},4185:function(e,t,i){"use strict";var a=i(57437),r=i(35843),l=i(65790),n=i.n(l),s=i(57042);let o=(0,r.ZP)("h5")(e=>{let{theme:t}=e;return{textAlign:"justify","&:after":{content:"''",width:"100%",display:"inline-block"}}});t.Z=e=>{let{value:t,text:i,height:r=35,outerClassName:l="",textClassName:c=""}=e;return(0,a.jsxs)("div",{className:(0,s.Z)("inline-flex flex-col",l),children:[(0,a.jsx)(n(),{value:t,displayValue:!1,margin:0,background:"#ffffffff00",lineColor:"#ffffff",height:35,width:1.3,height:r}),(0,a.jsx)(o,{className:(0,s.Z)("text-white h5",c),children:i})]})}},40542:function(e,t,i){"use strict";i.d(t,{V:function(){return useBehaviorSubject}});var a=i(2265);let useBehaviorSubject=e=>{let[t,i]=(0,a.useState)(null==e?void 0:e.getValue()),[r,l]=(0,a.useState)();return(0,a.useEffect)(()=>{if(!e){i(null);return}let t=e.subscribe({next:e=>{i(e)},error:l});return()=>t.unsubscribe()},[e]),[t]}},1295:function(e,t,i){"use strict";i.r(t);var a=i(57437),r=i(2265),l=i(22135),n=i(41101),s=i(92e3),o=i(39513),c=i(4185),d=i(23785),h=i(58070),v=i(14776),u=i(40542);let WelcomeCard=()=>(0,a.jsx)(o.Gt,{className:"max-xl:w-11/12 lg:w-[450px] sm:w-8/12 bg-black",children:(0,a.jsxs)("div",{children:[(0,a.jsx)(c.Z,{value:"Welcome to future",text:"Welcome to the future",textClassName:"text-sm tracking-[7px]",height:22}),(0,a.jsx)("br",{}),(0,a.jsx)(c.Z,{value:"identity",text:"of identity",textClassName:"text-sm tracking-[9px]",height:22})]})});t.default=()=>{let e=(0,s.useRouter)(),t=(0,n.Z)(),i=(0,l.Z)(t.breakpoints.down("md")),[o]=(0,u.V)(v.jU),f=(0,v.M6)(),x=(0,r.useCallback)(()=>{e.push(f?"dashboard":"entry")},[o]);return i?(0,a.jsxs)("main",{className:"flex min-h-screen flex-col",children:[(0,a.jsxs)("div",{className:"flex flex-1 flex-col landing-bg",children:[(0,a.jsxs)("div",{className:"p-8",children:[(0,a.jsxs)("h1",{className:"text-white h1",children:["Take back",(0,a.jsx)("br",{}),"control of your"]}),(0,a.jsx)(c.Z,{value:"identity",text:"i d e n t i t y",outerClassName:"pt-2",textClassName:"text-lg"}),(0,a.jsx)("p",{className:"text-gray-300 md:text-xl",children:"In an era of increasing data breaches, decentralized credentials offer a robust solution for safeguarding personal information."})]}),(0,a.jsx)("div",{className:"flex items-center justify-center",children:(0,a.jsx)(WelcomeCard,{})}),(0,a.jsx)("div",{className:"text-center p-7",children:(0,a.jsx)(d.hO,{variant:"contained",onClick:x,children:"LAUNCH APP"})})]}),(0,a.jsxs)("div",{className:"bg-black p-6",children:[(0,a.jsx)(c.Z,{value:"Decentralized Srv",text:"Decentralized Identity Web Service",textClassName:"text-xs tracking-[2px]",height:15}),(0,a.jsx)("br",{}),(0,a.jsx)(c.Z,{value:"Elastos",text:"Powered by Elastos",outerClassName:"pt-2",textClassName:"text-xs tracking-[1.5px]",height:15}),(0,a.jsx)("div",{className:"relative",children:(0,a.jsx)(h.Z,{className:"absolute bottom-0 right-0"})})]})]}):(0,a.jsxs)("main",{className:"flex min-h-screen",children:[(0,a.jsx)("div",{className:"w-full md:w-2/5 bg-black pt-12 md:pt-24 px-8 flex justify-center",children:(0,a.jsxs)("div",{className:"max-w-md flex flex-col",children:[(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("h1",{className:"text-white h1",children:"Take back control of your"}),(0,a.jsx)(c.Z,{value:"identity",text:"i d e n t i t y",outerClassName:"pt-2",textClassName:"text-lg"}),(0,a.jsx)("p",{className:"text-gray-300 md:text-xl",children:"In an era of increasing data breaches, decentralized credentials offer a robust solution for safeguarding personal information."})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(c.Z,{value:"Decentralized Srv",text:"Decentralized Identity Web Service",outerClassName:"pt-2",textClassName:"text-xs tracking-[2px]",height:15}),(0,a.jsx)("br",{}),(0,a.jsx)(c.Z,{value:"Elastos",text:"Powered by Elastos",outerClassName:"pt-2",textClassName:"text-xs tracking-[1.5px]",height:15})]})]})}),(0,a.jsxs)("div",{className:"flex flex-1 flex-col landing-bg",children:[(0,a.jsx)("div",{className:"text-right p-7",children:(0,a.jsx)(d.hO,{id:"launch-app",className:"flex-1",variant:"contained",onClick:x,children:"LAUNCH APP"})}),(0,a.jsx)("div",{className:"flex flex-1",children:(0,a.jsx)("div",{className:"flex items-center justify-center w-full",children:(0,a.jsx)(WelcomeCard,{})})}),(0,a.jsx)("div",{className:"flex justify-end p-7",children:(0,a.jsx)(h.Z,{})})]})]})}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,9152,5295,1510,1396,6953,2e3,182,6501,3262,9513,2971,7864,1744],function(){return e(e.s=12059)}),_N_E=e.O()}]);