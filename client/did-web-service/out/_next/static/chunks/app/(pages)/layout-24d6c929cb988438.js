(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1962],{39249:function(e,t,n){Promise.resolve().then(n.bind(n,54776))},54776:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return ev}});var r,s,i,l,a,c=n(57437),o=n(2265);let d=(0,o.createContext)({currentTheme:"light",changeCurrentTheme:e=>{}});function h(e){let[t,n]=(0,o.useState)("light");return(0,o.useEffect)(()=>{let e=localStorage.getItem("theme");n(e||"light")},[]),(0,o.useEffect)(()=>{document.documentElement.classList.add("[&_*]:!transition-none"),"light"===t?(document.documentElement.classList.remove("dark"),document.documentElement.style.colorScheme="light"):(document.documentElement.classList.add("dark"),document.documentElement.style.colorScheme="dark");let e=setTimeout(()=>{document.documentElement.classList.remove("[&_*]:!transition-none")},1);return()=>clearTimeout(e)},[t]),(0,c.jsx)(d.Provider,{value:{currentTheme:t,changeCurrentTheme:e=>{n(e),localStorage.setItem("theme",e)}},children:e.children})}let u=()=>(0,o.useContext)(d);var x=n(57135),m=n(51385),p=n(96556),v=n(11920),f=n(21417);class g{async getDisplayName(){return"DID Web service internal connector"}generateAppIdCredential(e){return null}getWeb3Provider(){throw Error("Method not implemented.")}pay(e){throw Error("Method not implemented.")}voteForDPoS(){throw Error("Method not implemented.")}voteForCRCouncil(){throw Error("Method not implemented.")}voteForCRProposal(){throw Error("Method not implemented.")}sendSmartContractTransaction(e){throw Error("Method not implemented.")}constructor(){this.name="did-web-internal"}}var j=n(12540),y=n(3883);async function w(){let e=new g;v.logger.setLoggerLayer(new y.m),v.connectivity.getAvailableConnectors().length>0&&await v.connectivity.unregisterConnector(e.name),await v.connectivity.registerConnector(e),await v.connectivity.setActiveConnector(e.name),v.connectivity.setApplicationDID("did:elastos:iddh53iyg3Eyrq4AFiA8tCULpEqUyu49td")}var b=n(52856),k=n(36953),N=n(70163),E=n(12131),C=n(38262),Z=n(451),L=n(42937),M=n(8140),S=n(53932),A=n(77358),O=n(48176),R=n(69990),T=n(24033),F=n(80704);let I=o.createContext({parent:null}),V=e=>{let{show:t,enter:n="",enterStart:r="",enterEnd:s="",leave:i="",leaveStart:l="",leaveEnd:a="",appear:d,unmountOnExit:h,tag:u="div",children:x,...m}=e,p=n.split(" ").filter(e=>e.length),v=r.split(" ").filter(e=>e.length),f=s.split(" ").filter(e=>e.length),g=i.split(" ").filter(e=>e.length),j=l.split(" ").filter(e=>e.length),y=a.split(" ").filter(e=>e.length);function w(e,t){t.length&&e.classList.add(...t)}function b(e,t){t.length&&e.classList.remove(...t)}let k=o.useRef(null);return(0,c.jsx)(F.Z,{appear:d,nodeRef:k,unmountOnExit:h,in:t,addEndListener:e=>{k.current.addEventListener("transitionend",e,!1)},onEnter:()=>{h||(k.current.style.display=null),w(k.current,[...p,...v])},onEntering:()=>{b(k.current,v),w(k.current,f)},onEntered:()=>{b(k.current,[...f,...p])},onExit:()=>{w(k.current,[...g,...j])},onExiting:()=>{b(k.current,j),w(k.current,y)},onExited:()=>{b(k.current,[...y,...g]),h||(k.current.style.display="none")},children:(0,c.jsx)(u,{ref:k,...m,style:{display:h?null:"none"},children:x})})};var B=e=>{let{show:t,appear:n,...r}=e,{parent:s}=(0,o.useContext)(I),i=function(){let e=(0,o.useRef)(!0);return(0,o.useEffect)(()=>{e.current=!1},[]),e.current}();return void 0===t?(0,c.jsx)(V,{appear:s.appear||!s.isInitialRender,show:s.show,...r}):(0,c.jsx)(I.Provider,{value:{parent:{show:t,isInitialRender:i,appear:n}},children:(0,c.jsx)(V,{appear:n,show:t,...r})})};let D=(0,M.Z)(e=>({avatarContainer:{display:"flex",alignItems:"center",justifyContent:"flex-start"},textContainer:{marginLeft:e.spacing(2),marginRight:e.spacing(0),display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}));var z=e=>{let{identities:t,setCurrentIdentity:n,setDropdownOpen:r}=e,s=D(),[i]=(0,Z.V)(S.B);return(0,c.jsx)("div",{children:t.map(e=>(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"font-medium text-sm hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-0 cursor-pointer ".concat(e===i?"text-indigo-600 dark:text-indigo-400":""),onClick:()=>{n(e),r(!1)},children:[(0,c.jsx)(C.i,{identity:e,width:40,height:40}),(0,c.jsx)("div",{className:s.avatarContainer,children:(0,c.jsxs)("div",{className:s.textContainer,children:[(0,c.jsx)("span",{className:"truncate text-sm font-bold dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200",children:e.get("profile").name$.value}),(0,c.jsx)("span",{className:"text-left cursor-pointer",children:(0,O.L)(e.did)})]})})]})},e.did))})};let H=(0,M.Z)(e=>({button:{display:"inline-flex",justifyContent:"center",alignItems:"center"},avatarContainer:{display:"flex",alignItems:"center",justifyContent:"flex-start"},textContainer:{marginLeft:e.spacing(2),marginRight:e.spacing(2),display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"},blackText:{color:"black"}})),P=e=>{let{align:t="left"}=e,n=H(),[r,s]=(0,o.useState)(!1),{mounted:i}=(0,L.s)(),l=(0,T.useRouter)(),a=(0,o.useRef)(null),d=(0,o.useRef)(null),[h]=(0,Z.V)(R.jU),[u]=(0,Z.V)(null==h?void 0:h.get("identity").identities$),[x]=(0,Z.V)(S.B),[m]=(0,Z.V)(null==x?void 0:x.get("profile").name$),[p,v]=(0,o.useState)("No active identity"),f=()=>{s(!1)};return((0,o.useEffect)(()=>{x?v((0,O.L)(x.did)):v("No active identity")},[x]),(0,o.useEffect)(()=>{let e=e=>{let{target:t}=e;d.current&&(!r||d.current.contains(t)||a.current.contains(t)||s(!1))};return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}),(0,o.useEffect)(()=>{let e=e=>{let{keyCode:t}=e;r&&27===t&&s(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),i)?(0,c.jsxs)("div",{className:"relative inline-flex",children:[(0,c.jsxs)("button",{ref:a,className:n.button,"aria-haspopup":"true",onClick:()=>s(!r),"aria-expanded":r,children:[(0,c.jsx)(C.i,{identity:x,width:40,height:40}),(0,c.jsxs)("div",{className:n.avatarContainer,children:[(0,c.jsxs)("div",{className:n.textContainer,children:[(0,c.jsx)("div",{className:"truncate text-sm font-bold dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 ".concat(x?n.blackText:""),children:m}),(0,c.jsx)("div",{className:"truncate leading-3 mb-1 text-sm font-medium ".concat(x?n.blackText:""),children:p})]}),(0,c.jsx)("div",{className:"ml-auto",children:(0,c.jsx)("svg",{className:"w-3 h-3 shrink-0 ml-1 fill-current text-slate-400",viewBox:"0 0 12 12",children:(0,c.jsx)("path",{d:"M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"})})})]})]}),(0,c.jsx)(B,{className:"origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ".concat("right"===t?"right-0":"left-0"),show:r,enter:"transition ease-out  transform",enterStart:"opacity-0 -translate-y-2",enterEnd:"opacity-100 translate-y-0",leave:"transition ease-out ",leaveStart:"opacity-100",leaveEnd:"opacity-0",children:(0,c.jsxs)("div",{className:"p-4",ref:d,onFocus:()=>s(!0),onBlur:()=>s(!1),children:[u&&u.length>0&&(0,c.jsx)("div",{className:"border-b border-slate-200 dark:border-slate-700 ",children:(0,c.jsx)(z,{identities:u,setCurrentIdentity:e=>{A.D.setActiveIdentity(e)},setDropdownOpen:s})}),(0,c.jsx)("div",{style:{marginTop:"10px"},children:(0,c.jsx)(E.c,{className:"min-w-max",onClick:()=>{f(),l.push("/new-identity")},children:"Create a new identity"})})]})})]}):(0,c.jsx)(c.Fragment,{})};var U=n(7045),_=n(61948),q=n(3283),$=n(16421),G=n(61396),W=n.n(G);let X=e=>{let{align:t}=e,n=(0,T.useRouter)(),[r,s]=(0,o.useState)(!1),[i]=(0,Z.V)(R.jU),l=!!i,[a]=(0,Z.V)(null==i?void 0:i.name$),[d]=(0,Z.V)(null==i?void 0:i.nameInitials$),[h,u]=(0,o.useState)("UNKNOWN"),x=(0,T.useSearchParams)(),m=x.get("accessToken"),p=x.get("refreshToken"),v=(0,o.useRef)(null),f=(0,o.useRef)(null);(0,o.useEffect)(()=>{let e=(0,R.M6)();e&&("MICROSOFT"===e.type?u("Microsoft"):"EMAIL"===e.type&&u("Email"));let t=e=>{let{target:t}=e;f.current&&(!r||f.current.contains(t)||v.current.contains(t)||s(!1))};return document.addEventListener("click",t),()=>document.removeEventListener("click",t)},[m,r,p]);let g=()=>{l?s(!r):window.location.href="/signin"},j=()=>{(0,$.w7)(),n.replace("/dashboard")};return(0,o.useEffect)(()=>{let e=e=>{let{keyCode:t}=e;r&&27===t&&s(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),(0,c.jsxs)("div",{className:"relative inline-flex",children:[(0,c.jsxs)("button",{ref:v,className:"inline-flex justify-center items-center group","aria-haspopup":"true",onClick:()=>g(),"aria-expanded":r,children:[l?(0,c.jsx)(_.U,{text:d}):(0,c.jsx)(q.Z,{sx:{ml:0,width:40,height:40},children:(0,c.jsx)(U.Z,{width:20})}),l&&(0,c.jsxs)("div",{className:"flex items-center truncate",children:[(0,c.jsxs)("span",{className:"truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200",children:["Hey ",(0,c.jsx)("b",{children:a})]}),(0,c.jsx)("svg",{className:"w-3 h-3 shrink-0 ml-2 fill-current text-slate-400",viewBox:"0 0 12 12",children:(0,c.jsx)("path",{d:"M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"})})]})]}),l&&(0,c.jsx)(B,{className:"origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ".concat("right"===t?"right-0":"left-0"),show:r,enter:"transition ease-out duration-200 transform",enterStart:"opacity-0 -translate-y-2",enterEnd:"opacity-100 translate-y-0",leave:"transition ease-out duration-200",leaveStart:"opacity-100",leaveEnd:"opacity-0",children:(0,c.jsxs)("div",{ref:f,onFocus:()=>s(!0),onBlur:()=>s(!1),children:[(0,c.jsxs)("div",{className:"pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700",children:[(0,c.jsx)("div",{className:"font-medium text-slate-800 dark:text-slate-100",children:"Signed In"}),(0,c.jsxs)("div",{className:"text-xs text-slate-500 dark:text-slate-400 italic",children:[h," user"]})]}),(0,c.jsxs)("ul",{children:[(0,c.jsx)("li",{children:(0,c.jsx)(W(),{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3",href:"/account/profile",onClick:()=>s(!r),children:"Account profile"})}),(0,c.jsx)("li",{children:(0,c.jsx)(W(),{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3",href:"/account/security",onClick:()=>s(!r),children:"Security center"})}),(0,c.jsx)("li",{children:(0,c.jsx)(W(),{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3",href:"/account/export",onClick:()=>s(!r),children:"Export"})}),(0,c.jsx)("li",{children:(0,c.jsx)(W(),{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3",href:"/dashboard",onClick:()=>j(),children:"Sign Out"})})]})]})})]})},K=e=>{let{sidebarOpen:t,setSidebarOpen:n}=e,{mounted:r}=(0,L.s)(),[s]=(0,Z.V)(R.jU),i=(0,T.useRouter)();return(0,c.jsx)("header",{className:"sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30",children:(0,c.jsx)("div",{className:"px-4 sm:px-6 lg:px-8",children:(0,c.jsxs)("div",{className:"flex items-center justify-between h-16 -mb-px",children:[(0,c.jsx)("div",{className:"flex",children:(0,c.jsxs)("button",{className:"text-slate-500 hover:text-slate-600 lg:hidden","aria-controls":"sidebar","aria-expanded":t,onClick:e=>{e.stopPropagation(),n(!t)},children:[(0,c.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,c.jsxs)("svg",{className:"w-6 h-6 fill-current",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[(0,c.jsx)("rect",{x:"4",y:"5",width:"16",height:"2"}),(0,c.jsx)("rect",{x:"4",y:"11",width:"16",height:"2"}),(0,c.jsx)("rect",{x:"4",y:"17",width:"16",height:"2"})]})]})}),(0,c.jsxs)("div",{className:"flex items-center space-x-3",children:[r&&!s&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(E.c,{onClick:()=>{i.push("/signup")},children:"Sign up"}),(0,c.jsx)(E.c,{onClick:()=>{i.push("/signin")},children:"Sign in"})]}),r&&s&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(P,{align:"right"}),(0,c.jsx)("hr",{className:"w-px h-6 bg-slate-200 dark:bg-slate-700 border-none"}),(0,c.jsx)(X,{align:"right"})]})]})]})})})};function Q(){return(Q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var J=function(e){return o.createElement("svg",Q({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 -0.5 25 25"},e),r||(r=o.createElement("path",{fill:"#fff",d:"M9.5 5.75a.75.75 0 0 0 0-1.5v1.5ZM4.75 11a.75.75 0 0 0 1.5 0h-1.5ZM9.5 4.25a.75.75 0 0 0 0 1.5v-1.5ZM18.75 11a.75.75 0 0 0 1.5 0h-1.5Zm-8.5-6a.75.75 0 0 0-1.5 0h1.5Zm-1.5 6a.75.75 0 0 0 1.5 0h-1.5Zm.75.75a.75.75 0 0 0 0-1.5v1.5Zm-4-1.5a.75.75 0 0 0 0 1.5v-1.5Zm4 0a.75.75 0 0 0 0 1.5v-1.5Zm10 1.5a.75.75 0 0 0 0-1.5v1.5ZM6.25 11a.75.75 0 0 0-1.5 0h1.5Zm14 0a.75.75 0 0 0-1.5 0h1.5ZM9.5 4.25A4.75 4.75 0 0 0 4.75 9h1.5A3.25 3.25 0 0 1 9.5 5.75v-1.5ZM4.75 9v2h1.5V9h-1.5ZM9.5 5.75h6v-1.5h-6v1.5Zm6 0A3.25 3.25 0 0 1 18.75 9h1.5a4.75 4.75 0 0 0-4.75-4.75v1.5ZM18.75 9v2h1.5V9h-1.5Zm-10-4v6h1.5V5h-1.5Zm.75 5.25h-4v1.5h4v-1.5Zm0 1.5h10v-1.5h-10v1.5ZM4.75 11v4h1.5v-4h-1.5Zm0 4a4.75 4.75 0 0 0 4.75 4.75v-1.5A3.25 3.25 0 0 1 6.25 15h-1.5Zm4.75 4.75h6v-1.5h-6v1.5Zm6 0A4.75 4.75 0 0 0 20.25 15h-1.5a3.25 3.25 0 0 1-3.25 3.25v1.5ZM20.25 15v-4h-1.5v4h1.5Z"})))};function Y(){return(Y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function ee(){return(ee=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var et=n(57042),en=()=>{let{currentTheme:e,changeCurrentTheme:t}=u();return(0,c.jsxs)("div",{children:[(0,c.jsx)("input",{type:"checkbox",name:"light-switch",id:"light-switch",className:"light-switch sr-only",checked:"light"===e,onChange:()=>t("light"===e?"dark":"light")}),(0,c.jsxs)("label",{className:"flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full",htmlFor:"light-switch",children:[(0,c.jsxs)("svg",{className:"w-4 h-4 dark:hidden",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg",children:[(0,c.jsx)("path",{className:"fill-current text-slate-400",d:"M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z"}),(0,c.jsx)("path",{className:"fill-current text-slate-500",d:"M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"})]}),(0,c.jsxs)("svg",{className:"w-4 h-4 hidden dark:block",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg",children:[(0,c.jsx)("path",{className:"fill-current text-slate-400",d:"M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z"}),(0,c.jsx)("path",{className:"fill-current text-slate-500",d:"M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z"})]}),(0,c.jsx)("span",{className:"sr-only",children:"Switch to light / dark version"})]})]})};let er=[{icon:(0,c.jsx)(J,{}),title:"Dashboard",url:"/dashboard"},{icon:(0,c.jsx)(U.Z,{}),title:"All identities",url:"/identities",requiresAuth:!0},{icon:(0,c.jsx)(U.Z,{}),title:"Active identity",links:[{title:"My profile",url:"/profile"},{title:"All credentials",url:"/credentials/list"},{title:"Storage",url:"/storage"},{title:"Applications",url:"/applications"},{title:"Delete identity",url:"/delete-identity"}],requiresAuth:!0,requiresActiveIdentity:!0,openByDefault:!0},{icon:(0,c.jsx)(J,{}),title:"Recent activity",url:"/recent-activity",requiresAuth:!0},{icon:(0,c.jsx)(function(e){return o.createElement("svg",Y({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},e),s||(s=o.createElement("path",{fill:"#fff",fillRule:"evenodd",d:"M16.982 8.998c.558-1.255-.725-2.538-1.98-1.98l-5 2.222a1.5 1.5 0 0 0-.762.762l-2.222 5c-.558 1.255.725 2.538 1.98 1.98l5-2.222a1.5 1.5 0 0 0 .762-.762l2.222-5ZM10.99 10.99l3.636-1.616-1.616 3.636-3.636 1.616 1.616-3.636Z",clipRule:"evenodd"})),i||(i=o.createElement("path",{fill:"#fff",fillRule:"evenodd",d:"M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-2.013a8.987 8.987 0 1 1 0-17.974 8.987 8.987 0 0 1 0 17.974Z",clipRule:"evenodd"})))},{}),title:"Discover",links:[{title:"Essentials identity wallet",url:"/discover/essentials"},{title:"Elastos Web3 Tech",url:"/discover/elastos"},{title:"Trinity Tech",url:"/discover/trinity-tech"}]},{icon:(0,c.jsx)(function(e){return o.createElement("svg",ee({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},e),l||(l=o.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})),a||(a=o.createElement("path",{fill:"#fff",d:"M12 2a8 8 0 0 0-8 8v1.9A2.92 2.92 0 0 0 3 14a2.88 2.88 0 0 0 1.94 2.61C6.24 19.72 8.85 22 12 22h3v-2h-3c-2.26 0-4.31-1.7-5.34-4.39l-.21-.55-.59-.06A1 1 0 0 1 5 14a1 1 0 0 1 .5-.86l.5-.29V11a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5h-4.09a1.5 1.5 0 1 0-1.52 2H20a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2v-2a8 8 0 0 0-8-8Z"})))},{}),title:"Support",links:[{title:"FAQ",url:"/support/faq"},{title:"Contact us",url:"/support/contact"}]}],es=e=>{let{link:t,sidebarExpanded:n}=e,r=(0,T.usePathname)(),s=t.url===r;return(0,c.jsx)("li",{className:"mb-1 last:mb-0",children:(0,c.jsx)(W(),{href:t.url,className:(0,et.Z)("block transition duration-150 truncate",s?"text-indigo-500":"text-slate-400 hover:text-slate-200"),children:(0,c.jsx)("span",{className:(0,et.Z)("text-sm font-medium lg:opacity-0 2xl:opacity-100 duration-200",n&&"lg:opacity-100"),children:t.title})})})},ei=e=>{var t;let{group:n,sidebarExpanded:r,onGroupHeaderClicked:s}=e,{icon:i,title:l,links:a,requiresAuth:d=!1,requiresActiveIdentity:h=!1,openByDefault:u=!1}=n,x=(0,T.usePathname)(),[m]=(0,Z.V)(S.B),p=n.url===x||(null===(t=n.links)||void 0===t?void 0:t.some(e=>e.url===x)),[v,f]=(0,o.useState)(u),[g]=(0,Z.V)(R.jU),{mounted:j}=(0,L.s)();return(!d||g&&j)&&(!h||m&&j)?(0,c.jsx)("div",{children:(0,c.jsx)("ul",{className:"",children:(0,c.jsxs)("li",{className:"px-3 py-2 rounded-sm mb-0.5 last:mb-0 ".concat(p&&"bg-slate-900"),children:[(0,c.jsx)(W(),{href:n.url||"",className:"block text-slate-200 truncate transition duration-150 ".concat(p?"hover:text-slate-200":"hover:text-white"),onClick:e=>{n.url||e.preventDefault(),f(!v),s()},children:(0,c.jsxs)("div",{className:"flex items-center justify-between",children:[(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)("div",{className:"shrink-0 h-6 w-6",children:i}),(0,c.jsx)("span",{className:(0,et.Z)("text-sm font-medium ml-3 lg:opacity-0 2xl:opacity-100 duration-200",r&&"lg:!opacity-100"),children:l})]}),a&&(0,c.jsx)("div",{className:"flex shrink-0 ml-2",children:(0,c.jsx)("svg",{className:"w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ".concat(v&&"rotate-180"),viewBox:"0 0 12 12",children:(0,c.jsx)("path",{d:"M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"})})})]})}),a&&(0,c.jsx)("div",{className:(0,et.Z)("lg:hidden 2xl:block",r&&"lg:!block"),children:(0,c.jsx)("ul",{className:"pl-9 mt-1 ".concat(!v&&"hidden"),children:a.map(e=>(0,c.jsx)(es,{link:e,sidebarExpanded:r},e.title))})})]})})}):null};var el=e=>{let{sidebarOpen:t,setSidebarOpen:n}=e,r=(0,o.useRef)(null),s=(0,o.useRef)(null),[i,l]=(0,o.useState)(!0),[a]=(0,Z.V)(S.B);return(0,o.useEffect)(()=>{let e=e=>{s.current&&r.current&&(!t||s.current.contains(e.target)||r.current.contains(e.target)||n(!1))};return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}),(0,o.useEffect)(()=>{let e=e=>{t&&27===e.keyCode&&n(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ".concat(t?"opacity-100":"opacity-0 pointer-events-none"),"aria-hidden":"true"}),(0,c.jsxs)("div",{id:"sidebar",ref:s,className:(0,et.Z)("flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out",t?"translate-x-0":"-translate-x-64",i&&"lg:!w-64"),children:[(0,c.jsxs)("div",{className:"flex justify-between mb-10 pr-3 sm:px-2",children:[(0,c.jsxs)("button",{ref:r,className:"lg:hidden text-slate-500 hover:text-slate-400",onClick:()=>n(!t),"aria-controls":"sidebar","aria-expanded":t,children:[(0,c.jsx)("span",{className:"sr-only",children:"Close sidebar"}),(0,c.jsx)("svg",{className:"w-6 h-6 fill-current",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"})})]}),(0,c.jsx)(W(),{href:"/",className:"block",children:(0,c.jsxs)("svg",{width:"32",height:"32",viewBox:"0 0 32 32",children:[(0,c.jsxs)("defs",{children:[(0,c.jsxs)("linearGradient",{x1:"28.538%",y1:"20.229%",x2:"100%",y2:"108.156%",id:"logo-a",children:[(0,c.jsx)("stop",{stopColor:"#A5B4FC",stopOpacity:"0",offset:"0%"}),(0,c.jsx)("stop",{stopColor:"#A5B4FC",offset:"100%"})]}),(0,c.jsxs)("linearGradient",{x1:"88.638%",y1:"29.267%",x2:"22.42%",y2:"100%",id:"logo-b",children:[(0,c.jsx)("stop",{stopColor:"#38BDF8",stopOpacity:"0",offset:"0%"}),(0,c.jsx)("stop",{stopColor:"#38BDF8",offset:"100%"})]})]}),(0,c.jsx)("rect",{fill:"#6366F1",width:"32",height:"32",rx:"16"}),(0,c.jsx)("path",{d:"M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z",fill:"#4F46E5"}),(0,c.jsx)("path",{d:"M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z",fill:"url(#logo-a)"}),(0,c.jsx)("path",{d:"M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z",fill:"url(#logo-b)"})]})})]}),(0,c.jsx)("div",{children:er.map(e=>(0,c.jsx)(ei,{group:e,sidebarExpanded:i,onGroupHeaderClicked:()=>{i||l(!0)}},e.title))}),(0,c.jsx)("div",{className:"pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto",children:(0,c.jsx)("div",{className:"px-3 py-2",children:(0,c.jsxs)("button",{onClick:()=>l(!i),children:[(0,c.jsx)("span",{className:"sr-only",children:"Expand / collapse sidebar"}),(0,c.jsxs)("svg",{className:(0,et.Z)("w-6 h-6 fill-current",i&&"rotate-180"),viewBox:"0 0 24 24",children:[(0,c.jsx)("path",{className:"text-slate-400",d:"M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"}),(0,c.jsx)("path",{className:"text-slate-600",d:"M3 23H1V1h2z"})]})]})})}),(0,c.jsx)("div",{className:"px-3 py-2",children:(0,c.jsx)(en,{})})]})]})},ea=n(3857),ec=n(61060),eo=n(56335),ed=n(86375);function eh(e){let{options:t,CacheProvider:n=ed.C,children:r}=e,[s]=o.useState(()=>{let e=(0,eo.Z)(t);e.compat=!0;let n=e.insert,r=[];return e.insert=function(){for(var t=arguments.length,s=Array(t),i=0;i<t;i++)s[i]=arguments[i];let[l,a]=s;return void 0===e.inserted[a.name]&&r.push({name:a.name,isGlobal:!l}),n(...s)},{cache:e,flush:()=>{let e=r;return r=[],e}}});return(0,T.useServerInsertedHTML)(()=>{let e=s.flush();if(0===e.length)return null;let t="",n=s.cache.key,r=[];return e.forEach(e=>{let{name:i,isGlobal:l}=e,a=s.cache.inserted[i];"boolean"!=typeof a&&(l?r.push({name:i,style:a}):(t+=a,n+=" ".concat(i)))}),(0,c.jsxs)(c.Fragment,{children:[r.map(e=>{let{name:t,style:n}=e;return(0,c.jsx)("style",{"data-emotion":"".concat(s.cache.key,"-global ").concat(t),dangerouslySetInnerHTML:{__html:n}},t)}),t&&(0,c.jsx)("style",{"data-emotion":n,dangerouslySetInnerHTML:{__html:t}})]})}),(0,c.jsx)(n,{value:s.cache,children:r})}var eu=n(78157);let ex=(0,eu.Z)({palette:{primary:{500:"rgb(99,102,241)"}}});function em(e){return(0,c.jsx)(eh,{options:{key:"mui"},children:(0,c.jsxs)(ec.Z,{theme:ex,children:[(0,c.jsx)(ea.ZP,{}),e.children]})})}y.k.init(console),f.l.init({frontendUrl:"https://didweb.trinity-tech.io",backendUrl:"https://didweb-service.trinity-tech.io",appDid:"did:elastos:iddh53iyg3Eyrq4AFiA8tCULpEqUyu49td"}),w(),(0,j.AX)();let ep=e=>{let{children:t}=e,[n,r]=(0,o.useState)(!1),{showErrorToast:s}=(0,p.p)();return(0,o.useEffect)(()=>{let e=m.rs.pipe((0,N.h)(e=>!!e)).subscribe(e=>{(0,b.z)(e)||s(e.appExceptionCode+" - "+e.message)});return()=>{e.unsubscribe()}}),(0,c.jsxs)("div",{className:"flex h-screen overflow-hidden",children:[(0,c.jsx)(el,{sidebarOpen:n,setSidebarOpen:r}),(0,c.jsxs)("div",{className:"relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-700",children:[(0,c.jsx)(K,{sidebarOpen:n,setSidebarOpen:r}),(0,c.jsx)("main",{children:(0,c.jsx)("div",{className:"px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ",children:(0,c.jsx)("div",{className:"grid grid-cols-12 gap-6",children:t})})})]})]})};function ev(e){let{children:t}=e;return(0,c.jsx)(em,{children:(0,c.jsx)(h,{children:(0,c.jsx)(k.wT,{children:(0,c.jsx)(x.au,{children:(0,c.jsx)(ep,{children:t})})})})})}},61948:function(e,t,n){"use strict";n.d(t,{U:function(){return s}});var r=n(57437);let s=e=>{let{text:t,width:n=40,height:s=40}=e;return(0,r.jsx)("div",{className:"bg-indigo-400 p-2 rounded-sm overflow-hidden",style:{width:"".concat(n,"px"),height:"".concat(s,"px"),borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontSize:"16px"},children:t})}},38262:function(e,t,n){"use strict";n.d(t,{i:function(){return h}});var r=n(57437),s=n(7045),i=n(61948),l=n(451),a=n(3283),c=n(9177),o=n(16691),d=n.n(o);let h=e=>{let{identity:t,width:n=60,height:o=60}=e,[h]=(0,l.V)(null==t?void 0:t.get("profile").name$),[u]=(0,l.V)(null==t?void 0:t.get("profile").icon$);return(0,r.jsx)(r.Fragment,{children:u?(0,r.jsx)(a.Z,{sx:{width:n,height:o},children:u&&(0,r.jsx)(d(),{src:u,alt:"",width:n,height:o})}):(0,r.jsxs)(r.Fragment,{children:[!h&&(0,r.jsx)(s.Z,{width:n,height:o}),h&&(0,r.jsx)(i.U,{text:(0,c.OX)(h)})]})})}},42937:function(e,t,n){"use strict";n.d(t,{s:function(){return s}});var r=n(2265);let s=()=>{let[e,t]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{t(!0)},[]),{mounted:e}}},96556:function(e,t,n){"use strict";n.d(t,{p:function(){return s}});var r=n(36953);function s(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},48176:function(e,t,n){"use strict";function r(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,n=e.split(":");if(n.length<3)return e;let r=n[2];if(r.length<=2*t)return e;let s="".concat(r.substr(0,t),"...").concat(r.substr(-t));return"".concat(n[0],":").concat(n[1],":").concat(s)}n.d(t,{L:function(){return r}})}},function(e){e.O(0,[6990,3988,395,5295,1510,4440,6171,8098,6953,1396,7998,2177,6754,1385,2971,596,1744],function(){return e(e.s=39249)}),_N_E=e.O()}]);