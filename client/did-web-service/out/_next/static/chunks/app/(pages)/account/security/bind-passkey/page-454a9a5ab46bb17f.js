(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3655],{14218:function(e,t,n){"use strict";var r,o=n(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}t.Z=function(e){return o.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 150 150"},e),r||(r=o.createElement("path",{fill:"currentColor",d:"M75 0c6.885 0 13.525.879 19.922 2.637 6.396 1.758 12.378 4.272 17.944 7.544a75.304 75.304 0 0 1 15.161 11.718 74.421 74.421 0 0 1 11.719 15.235 75.516 75.516 0 0 1 7.544 17.944c1.758 6.348 2.661 12.988 2.71 19.922 0 6.885-.879 13.525-2.637 19.922-1.758 6.396-4.272 12.378-7.544 17.944a75.286 75.286 0 0 1-11.718 15.161 74.43 74.43 0 0 1-15.235 11.719 75.502 75.502 0 0 1-17.944 7.544C88.574 149.048 81.934 149.951 75 150c-6.885 0-13.525-.879-19.922-2.637-6.396-1.758-12.378-4.272-17.944-7.544a75.304 75.304 0 0 1-15.161-11.718 74.444 74.444 0 0 1-11.72-15.235 75.847 75.847 0 0 1-7.543-17.87C.952 88.695.049 82.03 0 75c0-6.885.879-13.525 2.637-19.922C4.395 48.682 6.909 42.7 10.18 37.134a75.322 75.322 0 0 1 11.718-15.161 74.434 74.434 0 0 1 15.235-11.72 75.854 75.854 0 0 1 17.87-7.543C61.305.952 67.97.049 75 0Zm0 140.625c6.006 0 11.792-.781 17.358-2.344 5.567-1.562 10.791-3.76 15.674-6.592a63.318 63.318 0 0 0 13.33-10.327c4.004-4.052 7.422-8.471 10.254-13.257 2.832-4.785 5.054-10.01 6.665-15.673A61.505 61.505 0 0 0 140.625 75c0-6.006-.781-11.792-2.344-17.358-1.562-5.567-3.76-10.791-6.592-15.674a63.321 63.321 0 0 0-10.327-13.33c-4.052-4.004-8.471-7.422-13.257-10.254-4.785-2.832-10.01-5.054-15.673-6.665A61.532 61.532 0 0 0 75 9.375c-6.006 0-11.792.781-17.358 2.344-5.567 1.562-10.791 3.76-15.674 6.592a63.335 63.335 0 0 0-13.33 10.327c-4.004 4.052-7.422 8.471-10.254 13.256-2.832 4.786-5.054 10.01-6.665 15.674A61.532 61.532 0 0 0 9.375 75c0 6.006.781 11.792 2.344 17.358 1.562 5.567 3.76 10.791 6.592 15.674a63.332 63.332 0 0 0 10.327 13.33c4.052 4.004 8.471 7.422 13.256 10.254 4.786 2.832 10.01 5.054 15.674 6.665A61.505 61.505 0 0 0 75 140.625Zm43.726-64.453 3.515-10.547h5.493l-6.225 18.75h-5.493L112.5 73.828l-3.516 10.547h-5.493l-6.225-18.75h5.493l3.515 10.547 3.516-10.547h5.42l3.516 10.547ZM84.741 65.625h5.493l-6.225 18.75h-5.493L75 73.828l-3.516 10.547h-5.493l-6.225-18.75h5.493l3.515 10.547 3.516-10.547h5.42l3.516 10.547 3.515-10.547Zm-37.5 0h5.493l-6.225 18.75h-5.493L37.5 73.828l-3.516 10.547h-5.493l-6.225-18.75h5.493l3.515 10.547 3.516-10.547h5.42l3.516 10.547 3.515-10.547Z"})))}},2391:function(e,t,n){Promise.resolve().then(n.bind(n,59456))},59456:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var r=n(57437),o=n(64101),i=n(35843),a=n(15133),s=n(24033),l=n(39830),c=n(23785),d=n(40542),u=n(96507),p=n(25210),m=n(19739),h=n(63491),g=n(14776),components_PasskeyBind=()=>{let e=(0,s.useRouter)(),[t]=(0,d.V)(g.jU),n=null==t?void 0:t.get("security"),{showSuccessToast:o}=(0,m.p)(),bindPasskeyConfirmation=async()=>{if(await n.ensureMasterKeyUnlocked()){let t=await n.bindPasskey();t&&(o("Browser bound successfully"),setTimeout(()=>{let t=(0,h.Kt)();t===h.cX.OnBoardingBrowserBinding?e.push("/onboarding"):e.push("/account/security")},200))}};return(0,r.jsxs)(u.Z,{className:"inline-flex flex-col justify-center items-center",children:[(0,r.jsx)("div",{className:"w-full pb-6",children:(0,r.jsx)(c.Kz,{id:"bind-ms",className:"w-full",startIcon:(0,r.jsx)(l.JO,{icon:"material-symbols:passkey"}),onClick:bindPasskeyConfirmation,children:"Create passkey"})}),(0,r.jsxs)("span",{className:"text-[11px] font-extralight text-center opacity-50",children:["Binding an account means you agree to the",(0,r.jsx)("br",{}),(0,r.jsx)(p.Z,{href:"#",color:"inherit",children:(0,r.jsx)("span",{className:"font-medium",children:"Privacy Policy"})})," ","and"," ",(0,r.jsx)(p.Z,{href:"#",color:"inherit",children:(0,r.jsx)("span",{className:"font-medium",children:"Terms of Service"})}),"."]})]})},f=n(15707),b=n(24850),x=n(14218),v=n(66267),w=n(97179);let j=(0,i.ZP)(a.Z)(e=>{let{theme:t}=e;return{maxWidth:300,minWidth:180,backgroundColor:"#1E1E1F",borderRadius:"0.8rem","&:after":{paddingTop:"130%",display:"block",content:"''"},".body":{position:"absolute",top:0,bottom:0,right:0,left:0,padding:"4%",".camera":{height:"calc(4%*10/13)",div:{background:"#444445","&:after":{paddingTop:"100%",display:"block",content:"''"}}},".screen":{borderRadius:"0.4rem",background:"url('../../device-bg.png') repeat center center / cover"}}}}),y=(0,i.ZP)(a.Z)(e=>{let{theme:t}=e;return{maxWidth:300,minWidth:200,backgroundColor:"#1E1E1F",borderRadius:"0.2rem","&:after":{paddingTop:"68%",display:"block",content:"''"},".body":{position:"absolute",top:0,bottom:0,right:0,left:0,paddingTop:"4%",".topbar":{paddingLeft:"3%",height:"calc(4%*10/6.8)",div:{"&:after":{paddingTop:"100%",display:"block",content:"''"}}},".screen":{background:"url('../../device-bg.png') repeat center center / cover"}}}}),k=(0,i.ZP)(a.Z)(e=>{let{theme:t}=e;return{maxWidth:100,minWidth:60,backgroundColor:"#1E1E1F",borderRadius:"0.6rem","&:after":{paddingTop:"217%",display:"block",content:"''"},".body":{position:"absolute",top:0,bottom:0,right:0,left:0,padding:"3%",".camera":{div:{background:"#1E1E1F","&:after":{paddingTop:"100%",display:"block",content:"''"}}},".screen":{borderRadius:"0.5rem",background:"url('../../device-bg.png') repeat center center / cover"}}}});var page=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(f.Z,{title:"Bind your account with current browser",description:(0,r.jsxs)(r.Fragment,{children:["Bind your current browser. This doesn't require to provide any email or password,"," ",(0,r.jsx)("span",{className:"text-red-600",children:"but access to your identity will be lost if you don't bind multiple devices as recovery."})]})}),(0,r.jsxs)("div",{className:"w-full flex flex-col items-center justify-center py-[6%]",children:[(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("div",{className:"px-[8%]",children:(0,r.jsx)(j,{className:"inline-block rounded-3xl relative",children:(0,r.jsxs)("div",{className:"body",children:[(0,r.jsx)("div",{className:"camera w-full absolute right-0 top-0 flex items-center justify-center",children:(0,r.jsx)("div",{className:"w-[1.7%] rounded-full"})}),(0,r.jsx)("div",{className:"screen h-full"})]})})}),(0,r.jsxs)("div",{className:"relative flex items-center max-w-2xl",children:[(0,r.jsx)(v.Z,{icon:(0,r.jsx)(o.Z,{fontSize:"small"}),title:"ENHANCE YOUR SECURITY",description:"Increase your chances of recovery in case one of your devices is compromised by binding additional devices like your mobile phone, tablet, and laptop."}),(0,r.jsx)(w.Z,{className:"absolute w-2/3 top-[-2rem] left-1/2 translate-x-[-50%] translate-y-[-100%]"}),(0,r.jsx)(w.Z,{className:"absolute w-2/3 bottom-[-5rem] right-[-10rem] translate-y-full",svgClassName:"rotate-[160deg]"}),(0,r.jsx)(w.Z,{className:"absolute w-2/3 bottom-[-5rem] left-[-10rem] translate-y-full",svgClassName:"rotate-[200deg]"})]}),(0,r.jsx)("div",{className:"px-[8%] flex items-center",children:(0,r.jsx)(y,{className:"inline-block rounded-3xl relative",children:(0,r.jsxs)("div",{className:"body",children:[(0,r.jsxs)("div",{className:"topbar w-full absolute right-0 top-0 flex items-center gap-0.5",children:[(0,r.jsx)("div",{className:"w-[1.7%] bg-[#F3605C] rounded-full"}),(0,r.jsx)("div",{className:"w-[1.7%] bg-[#F8BE39] rounded-full"}),(0,r.jsx)("div",{className:"w-[1.7%] bg-[#50C845] rounded-full"})]}),(0,r.jsx)("div",{className:"screen h-full"})]})})})]}),(0,r.jsx)("div",{className:"flex items-center my-[5%]",children:(0,r.jsx)(k,{className:"inline-block rounded-3xl relative",children:(0,r.jsxs)("div",{className:"body",children:[(0,r.jsx)("div",{className:"relative",children:(0,r.jsx)("div",{className:"camera w-full absolute right-0 top-1 flex items-center justify-center",children:(0,r.jsx)("div",{className:"w-[5%] rounded-full"})})}),(0,r.jsx)("div",{className:"screen h-full"})]})})}),(0,r.jsx)(components_PasskeyBind,{})]}),(0,r.jsxs)("div",{className:"absolute w-full md:w-2/3 h-[65%] bottom-0 right-0 overflow-hidden z-[-1]",children:[(0,r.jsx)(b.Z,{className:"opacity-[0.15] h-full"}),(0,r.jsx)("div",{className:"absolute w-1/3 right-[-7%] bottom-[-7%] opacity-30",children:(0,r.jsx)(x.Z,{})})]})]})},23785:function(e,t,n){"use strict";n.d(t,{Yd:function(){return v},hO:function(){return a},qi:function(){return button_CopyButton},Kz:function(){return l},UO:function(){return f}});var r=n(35843),o=n(44551);let i=(0,r.ZP)(o.Z)(e=>{let{theme:t}=e;return{background:"#000 !important",borderRadius:4,color:"white","&:disabled":{opacity:"0.7 !important",backgroundColor:"#343434 !important",color:"#fff !important"},"&:hover":{background:"#222 !important"},[t.breakpoints.down("md")]:{fontSize:12,padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var a=i;let s=(0,r.ZP)(o.Z)(e=>{let{theme:t,className:n}=e;return{background:"#323B45 !important",borderRadius:(null==n?void 0:n.includes("rounded"))?8:4,color:"white",textTransform:"uppercase",paddingLeft:12,paddingRight:12,"&:disabled":{opacity:"0.7 !important",backgroundColor:"#555 !important",color:"#fff !important"},"&:hover":{background:"#666e76 !important"},[t.breakpoints.down("md")]:{padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var l=s,c=n(57437);n(2265);var d=n(86781),u=n(39830),p=n(52653),m=n(19739),button_CopyButton=e=>{let{text:t,iconWidth:n="17px"}=e,{showSuccessToast:r}=(0,m.p)();return(0,c.jsx)(d.CopyToClipboard,{text:t,onCopy:()=>{r("Copied to clipboard")},children:(0,c.jsx)(p.Z,{type:"button",sx:{p:"5px"},"aria-label":"link",onClick:e=>{e.preventDefault(),e.stopPropagation()},color:"primary",children:(0,c.jsx)(u.JO,{icon:"material-symbols:content-copy-rounded",width:n})})})},h=n(49050);let g=(0,r.ZP)(h.Z)(e=>{let{theme:t}=e;return{color:"dark"===t.palette.mode?"white":"black"}});var f=g,b=n(45295);let x=(0,r.ZP)(b.Z)(e=>{let{theme:t}=e;return{borderRadius:"4px",overflow:"hidden","&:after":{background:"#fff",content:"''",height:155,left:-75,opacity:.2,position:"absolute",top:-50,width:50,WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",WebkitTransform:"rotate(35deg)",MsTransform:"rotate(35deg)",transform:"rotate(35deg)",zIndex:-10},"&:hover":{boxShadow:"0px 0px 7px #999999","&:after":{left:"120%",WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)"}}}});var v=x},66267:function(e,t,n){"use strict";n.d(t,{C:function(){return s}});var r=n(57437),o=n(3283),i=n(43226),a=n(35843);let s=(0,a.ZP)(o.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#9D3E3E",color:"white",width:36,height:36,padding:8}});t.Z=e=>{let{icon:t,title:n,description:o,className:a=""}=e;return(0,r.jsxs)("div",{className:"text-[#DDD] ".concat(a),children:[(0,r.jsx)("div",{className:"inline-flex pb-1",children:(0,r.jsx)(s,{children:t})}),(0,r.jsx)(i.Z,{variant:"body1",className:"underline underline-offset-2",children:n}),(0,r.jsx)(i.Z,{variant:"body2",children:o})]})}},97179:function(e,t,n){"use strict";var r=n(57437),o=n(35843);let i=(0,o.ZP)("div")(e=>{let{theme:t}=e;return{color:"white",".path":{strokeWidth:6,fill:"none",strokeDasharray:1e3,strokeDashoffset:1e3,animation:"drawArrow 1500ms ease-in-out forwards"},".arrowhead":{animationDelay:".5s"},"@keyframes drawArrow":{"0%":{strokeDashoffset:1e3},"100%":{strokeDashoffset:0}}}});t.Z=e=>{let{className:t="",svgClassName:n="",rotateX:o=!1}=e;return(0,r.jsx)(i,{className:t,children:(0,r.jsxs)("svg",{className:n,width:"100%",height:"100%",viewBox:"30 178 340 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:o?{transform:"rotateX(180deg)"}:{},children:[(0,r.jsx)("clipPath",{id:"clipPath1",children:(0,r.jsx)("path",{d:"M28 220C200 170 330 187.285 400 220",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,r.jsx)("clipPath",{id:"clipPath2",children:(0,r.jsx)("path",{d:"M330 182C400 210 388 280 361 218C382 222 347 226 318 219",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,r.jsx)("path",{className:"path",clipPath:"url(#clipPath1)",d:"M35 215C180.529 180.938 320.006 187.285 361 215.530",stroke:"currentColor",strokeOpacity:"0.9",strokeLinecap:"round",strokeLinejoin:"round"}),(0,r.jsx)("path",{className:"path arrowhead",clipPath:"url(#clipPath2)",d:"M335 182C362 200 368 214 361 218C361 218 347 224 320 222",stroke:"currentColor",strokeOpacity:"0.9",strokeLinecap:"round",strokeLinejoin:"round"})]})})}},24850:function(e,t,n){"use strict";var r=n(35843);let o=(0,r.ZP)("div")(e=>{let{theme:t}=e;return{bottom:0,right:0,height:"100%",background:"linear-gradient(to bottom, rgba(255, 211, 187, 100%), rgba(255, 211, 187, 20%), transparent)",borderTopLeftRadius:"100%"}});t.Z=o},15707:function(e,t,n){"use strict";var r=n(57437),o=n(35843),i=n(43226);let a=(0,o.ZP)("div")(e=>{let{showBg:t}=e;return{marginBottom:"1.5rem",background:t?"url('/headline-banner.png') no-repeat center center / cover":"none"}});t.Z=e=>{let{title:t,description:n,showBg:o=!1}=e;return(0,r.jsxs)(a,{showBg:o,className:o?"p-4 sm:p-6 rounded-lg":"",children:[(0,r.jsx)(i.Z,{className:"w-full pb-3 sm:pb-4 sm:pb-8",variant:"h3",color:"text.primary",children:t}),(0,r.jsx)(i.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:n})]})}},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var r=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,r.useState)(null==e?void 0:e.getValue()),[o,i]=(0,r.useState)();return(0,r.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:i});return()=>t.unsubscribe()},[e]),[t]}},19739:function(e,t,n){"use strict";n.d(t,{p:function(){return useToast}});var r=n(36953);function useToast(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},63491:function(e,t,n){"use strict";n.d(t,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return o},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var r,o,i=n(92e3),a=n(36079);(r=o||(o={}))[r.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",r[r.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",r[r.EmailSignIn=2]="EmailSignIn";let s="ongoingflowoperation",l="postsigninurl";function getOnGoingFlowOperation(){return o[localStorage.getItem(s)]}function setOnGoingFlowOperation(e){localStorage.setItem(s,o[e])}function clearOnGoingFlowOperation(){localStorage.removeItem(s)}function setPostSignInUrl(e){a.k.log("flow","Setting post sign in url to:",e),localStorage.setItem(l,e)}function clearPostSignInUrl(){a.k.log("flow","Clearing post sign in url"),localStorage.removeItem(l)}function usePostSignInFlow(){let e=(0,i.useRouter)();return{navigateToPostSignInLandingPage(t){let n=localStorage.getItem(l);if(n)a.k.log("flow","Navigating to post sign in landing page:",n),e.replace(n),clearPostSignInUrl();else{let n=t||"/dashboard";a.k.log("flow","Navigating to post sign in landing page ".concat(n)),e.push(n)}}}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,3861,6506,8644,9490,9830,1711,1510,6953,378,5951,1396,2e3,1170,7056,2971,7864,1744],function(){return e(e.s=2391)}),_N_E=e.O()}]);