(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1962],{94087:function(e,t,n){Promise.resolve().then(n.bind(n,54776))},54776:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return ep}});var s,r,l,i,a,c=n(57437),o=n(2265);let d=(0,o.createContext)({currentTheme:"light",changeCurrentTheme:e=>{}});function h(e){let[t,n]=(0,o.useState)("light");return(0,o.useEffect)(()=>{let e=localStorage.getItem("theme");n(e||"light")},[]),(0,o.useEffect)(()=>{document.documentElement.classList.add("[&_*]:!transition-none"),"light"===t?(document.documentElement.classList.remove("dark"),document.documentElement.style.colorScheme="light"):(document.documentElement.classList.add("dark"),document.documentElement.style.colorScheme="dark");let e=setTimeout(()=>{document.documentElement.classList.remove("[&_*]:!transition-none")},1);return()=>clearTimeout(e)},[t]),(0,c.jsx)(d.Provider,{value:{currentTheme:t,changeCurrentTheme:e=>{n(e),localStorage.setItem("theme",e)}},children:e.children})}let u=()=>(0,o.useContext)(d);var x=n(57135),m=n(51385),p=n(96556),v=n(37410),f=n(21417);class g{async getDisplayName(){return"DID Web service internal connector"}generateAppIdCredential(e){return null}getWeb3Provider(){throw Error("Method not implemented.")}pay(e){throw Error("Method not implemented.")}voteForDPoS(){throw Error("Method not implemented.")}voteForCRCouncil(){throw Error("Method not implemented.")}voteForCRProposal(){throw Error("Method not implemented.")}sendSmartContractTransaction(e){throw Error("Method not implemented.")}constructor(){this.name="did-web-internal"}}var j=n(12540),y=n(3883);async function b(){let e=new g;v.logger.setLoggerLayer(new y.m),v.connectivity.getAvailableConnectors().length>0&&await v.connectivity.unregisterConnector(e.name),await v.connectivity.registerConnector(e),await v.connectivity.setActiveConnector(e.name),v.connectivity.setApplicationDID("did:elastos:iddh53iyg3Eyrq4AFiA8tCULpEqUyu49td")}var w=n(52856),k=n(36953),N=n(70163),E=n(12131),C=n(7045),Z=n(451),L=n(42937),M=n(3283),S=n(8140),A=n(53932),O=n(51639),T=n(48176),I=n(69990),R=n(9177),F=n(24033),z=n(19523),D=n(80704);let V=o.createContext({parent:null}),B=e=>{let{show:t,enter:n="",enterStart:s="",enterEnd:r="",leave:l="",leaveStart:i="",leaveEnd:a="",appear:d,unmountOnExit:h,tag:u="div",children:x,...m}=e,p=n.split(" ").filter(e=>e.length),v=s.split(" ").filter(e=>e.length),f=r.split(" ").filter(e=>e.length),g=l.split(" ").filter(e=>e.length),j=i.split(" ").filter(e=>e.length),y=a.split(" ").filter(e=>e.length);function b(e,t){t.length&&e.classList.add(...t)}function w(e,t){t.length&&e.classList.remove(...t)}let k=o.useRef(null);return(0,c.jsx)(D.Z,{appear:d,nodeRef:k,unmountOnExit:h,in:t,addEndListener:e=>{k.current.addEventListener("transitionend",e,!1)},onEnter:()=>{h||(k.current.style.display=null),b(k.current,[...p,...v])},onEntering:()=>{w(k.current,v),b(k.current,f)},onEntered:()=>{w(k.current,[...f,...p])},onExit:()=>{b(k.current,[...g,...j])},onExiting:()=>{w(k.current,j),b(k.current,y)},onExited:()=>{w(k.current,[...y,...g]),h||(k.current.style.display="none")},children:(0,c.jsx)(u,{ref:k,...m,style:{display:h?null:"none"},children:x})})};var H=e=>{let{show:t,appear:n,...s}=e,{parent:r}=(0,o.useContext)(V),l=function(){let e=(0,o.useRef)(!0);return(0,o.useEffect)(()=>{e.current=!1},[]),e.current}();return void 0===t?(0,c.jsx)(B,{appear:r.appear||!r.isInitialRender,show:r.show,...s}):(0,c.jsx)(V.Provider,{value:{parent:{show:t,isInitialRender:l,appear:n}},children:(0,c.jsx)(B,{appear:n,show:t,...s})})};let P=(0,S.Z)(e=>({avatarContainer:{display:"flex",alignItems:"center",justifyContent:"flex-start"},textContainer:{marginLeft:e.spacing(2),marginRight:e.spacing(2),display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}));var _=e=>{let{identities:t,setCurrentIdentity:n,setDropdownOpen:s}=e,r=P();return(0,c.jsx)("div",{children:t.map(e=>(0,c.jsx)("div",{children:(0,c.jsx)("div",{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-3 px-3",onClick:()=>{n(e),s(!1)},children:(0,c.jsx)("div",{className:r.avatarContainer,children:(0,c.jsxs)("div",{className:r.textContainer,children:[(0,c.jsx)("span",{className:"truncate text-sm font-bold dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200",children:e.get("profile").name$.value}),(0,c.jsx)("span",{className:"text-left cursor-pointer",children:(0,T.L)(e.did)})]})})})},e.did))})};let U=(0,S.Z)(e=>({button:{display:"inline-flex",justifyContent:"center",alignItems:"center"},avatarContainer:{display:"flex",alignItems:"center",justifyContent:"flex-start"},textContainer:{marginLeft:e.spacing(2),marginRight:e.spacing(2),display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"},blackText:{color:"black"}})),q=e=>{let{align:t="left"}=e,n=U(),[s,r]=(0,o.useState)(!1),{mounted:l}=(0,L.s)(),i=(0,F.useRouter)(),a=(0,o.useRef)(null),d=(0,o.useRef)(null),[h]=(0,Z.V)((0,I.jU)()),[u]=(0,Z.V)(null==h?void 0:h.get("identity").identities$),[x]=(0,Z.V)(A.B),[m]=(0,Z.V)(null==x?void 0:x.get("profile").name$),[p,v]=(0,o.useState)("No active identity"),f=()=>{r(!1)};return((0,o.useEffect)(()=>{x?v((0,T.L)(x.did)):v("No active identity")},[x]),(0,o.useEffect)(()=>{let e=e=>{let{target:t}=e;d.current&&(!s||d.current.contains(t)||a.current.contains(t)||r(!1))};return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}),(0,o.useEffect)(()=>{let e=e=>{let{keyCode:t}=e;s&&27===t&&r(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),l)?(0,c.jsxs)("div",{className:"relative inline-flex",children:[(0,c.jsxs)("button",{ref:a,className:n.button,"aria-haspopup":"true",onClick:()=>r(!s),"aria-expanded":s,children:[m&&null!==m?(0,c.jsx)(z.Z,{text:(0,R.OX)(m)}):(0,c.jsx)(M.Z,{sx:{ml:0,width:40,height:40},children:(0,c.jsx)(C.Z,{width:20})}),(0,c.jsxs)("div",{className:n.avatarContainer,children:[(0,c.jsxs)("div",{className:n.textContainer,children:[(0,c.jsx)("div",{className:"truncate text-sm font-bold dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 ".concat(x?n.blackText:""),children:m}),(0,c.jsx)("div",{className:"truncate leading-3 mb-1 text-sm font-medium ".concat(x?n.blackText:""),children:p})]}),(0,c.jsx)("div",{className:"ml-auto",children:(0,c.jsx)("svg",{className:"w-3 h-3 shrink-0 ml-1 fill-current text-slate-400",viewBox:"0 0 12 12",children:(0,c.jsx)("path",{d:"M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"})})})]})]}),(0,c.jsx)(H,{className:"origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ".concat("right"===t?"right-0":"left-0"),show:s,enter:"transition ease-out  transform",enterStart:"opacity-0 -translate-y-2",enterEnd:"opacity-100 translate-y-0",leave:"transition ease-out ",leaveStart:"opacity-100",leaveEnd:"opacity-0",children:(0,c.jsxs)("div",{className:"p-4",ref:d,onFocus:()=>r(!0),onBlur:()=>r(!1),children:[u&&u.length>0&&(0,c.jsx)("div",{className:"border-b border-slate-200 dark:border-slate-700 ",children:(0,c.jsx)(_,{identities:u,setCurrentIdentity:e=>{O.D.setActiveIdentity(e)},setDropdownOpen:r})}),(0,c.jsx)(E.c,{className:"min-w-max",onClick:()=>{f(),i.push("/new-identity")},children:"Create a new identity"})]})})]}):(0,c.jsx)(c.Fragment,{})};var $=n(16421),G=n(61396),W=n.n(G);let X=e=>{let{align:t}=e,n=(0,F.useRouter)(),[s,r]=(0,o.useState)(!1),[l]=(0,Z.V)((0,I.jU)()),i=!!l,[a]=(0,Z.V)(null==l?void 0:l.name$),[d]=(0,Z.V)(null==l?void 0:l.nameInitials$),[h,u]=(0,o.useState)("UNKNOWN"),x=(0,F.useSearchParams)(),m=x.get("accessToken"),p=x.get("refreshToken"),v=(0,o.useRef)(null),f=(0,o.useRef)(null);(0,o.useEffect)(()=>{let e=(0,I.M6)();e&&("MICROSOFT"===e.type?u("Microsoft"):"EMAIL"===e.type&&u("Email"));let t=e=>{let{target:t}=e;f.current&&(!s||f.current.contains(t)||v.current.contains(t)||r(!1))};return document.addEventListener("click",t),()=>document.removeEventListener("click",t)},[m,s,p]);let g=()=>{i?r(!s):window.location.href="/signin"},j=()=>{(0,$.w7)(),n.replace("/dashboard")};return(0,o.useEffect)(()=>{let e=e=>{let{keyCode:t}=e;s&&27===t&&r(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),(0,c.jsxs)("div",{className:"relative inline-flex",children:[(0,c.jsxs)("button",{ref:v,className:"inline-flex justify-center items-center group","aria-haspopup":"true",onClick:()=>g(),"aria-expanded":s,children:[i?(0,c.jsx)(z.Z,{text:d}):(0,c.jsx)(M.Z,{sx:{ml:0,width:40,height:40},children:(0,c.jsx)(C.Z,{width:20})}),i&&(0,c.jsxs)("div",{className:"flex items-center truncate",children:[(0,c.jsxs)("span",{className:"truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200",children:["Hey ",(0,c.jsx)("b",{children:a})]}),(0,c.jsx)("svg",{className:"w-3 h-3 shrink-0 ml-2 fill-current text-slate-400",viewBox:"0 0 12 12",children:(0,c.jsx)("path",{d:"M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"})})]})]}),i&&(0,c.jsx)(H,{className:"origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ".concat("right"===t?"right-0":"left-0"),show:s,enter:"transition ease-out duration-200 transform",enterStart:"opacity-0 -translate-y-2",enterEnd:"opacity-100 translate-y-0",leave:"transition ease-out duration-200",leaveStart:"opacity-100",leaveEnd:"opacity-0",children:(0,c.jsxs)("div",{ref:f,onFocus:()=>r(!0),onBlur:()=>r(!1),children:[(0,c.jsxs)("div",{className:"pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700",children:[(0,c.jsx)("div",{className:"font-medium text-slate-800 dark:text-slate-100",children:"Signed In"}),(0,c.jsxs)("div",{className:"text-xs text-slate-500 dark:text-slate-400 italic",children:[h," user"]})]}),(0,c.jsxs)("ul",{children:[(0,c.jsx)("li",{children:(0,c.jsx)(W(),{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3",href:"/account/profile",onClick:()=>r(!s),children:"Account profile"})}),(0,c.jsx)("li",{children:(0,c.jsx)(W(),{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3",href:"/account/security",onClick:()=>r(!s),children:"Security center"})}),(0,c.jsx)("li",{children:(0,c.jsx)(W(),{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3",href:"/account/export",onClick:()=>r(!s),children:"Export"})}),(0,c.jsx)("li",{children:(0,c.jsx)(W(),{className:"font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3",href:"/dashboard",onClick:()=>j(),children:"Sign Out"})})]})]})})]})},K=e=>{let{sidebarOpen:t,setSidebarOpen:n}=e,{mounted:s}=(0,L.s)(),[r]=(0,Z.V)((0,I.jU)()),l=(0,F.useRouter)();return(0,c.jsx)("header",{className:"sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30",children:(0,c.jsx)("div",{className:"px-4 sm:px-6 lg:px-8",children:(0,c.jsxs)("div",{className:"flex items-center justify-between h-16 -mb-px",children:[(0,c.jsx)("div",{className:"flex",children:(0,c.jsxs)("button",{className:"text-slate-500 hover:text-slate-600 lg:hidden","aria-controls":"sidebar","aria-expanded":t,onClick:e=>{e.stopPropagation(),n(!t)},children:[(0,c.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,c.jsxs)("svg",{className:"w-6 h-6 fill-current",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[(0,c.jsx)("rect",{x:"4",y:"5",width:"16",height:"2"}),(0,c.jsx)("rect",{x:"4",y:"11",width:"16",height:"2"}),(0,c.jsx)("rect",{x:"4",y:"17",width:"16",height:"2"})]})]})}),(0,c.jsxs)("div",{className:"flex items-center space-x-3",children:[s&&!r&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(E.c,{onClick:()=>{l.push("/signup")},children:"Sign up"}),(0,c.jsx)(E.c,{onClick:()=>{l.push("/signin")},children:"Sign in"})]}),s&&r&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(q,{align:"right"}),(0,c.jsx)("hr",{className:"w-px h-6 bg-slate-200 dark:bg-slate-700 border-none"}),(0,c.jsx)(X,{align:"right"})]})]})]})})})};function Q(){return(Q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e}).apply(this,arguments)}function Y(){return(Y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e}).apply(this,arguments)}function J(){return(J=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e}).apply(this,arguments)}var ee=n(57042);function et(){let{currentTheme:e,changeCurrentTheme:t}=u();return(0,c.jsxs)("div",{children:[(0,c.jsx)("input",{type:"checkbox",name:"light-switch",id:"light-switch",className:"light-switch sr-only",checked:"light"===e,onChange:()=>t("light"===e?"dark":"light")}),(0,c.jsxs)("label",{className:"flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full",htmlFor:"light-switch",children:[(0,c.jsxs)("svg",{className:"w-4 h-4 dark:hidden",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg",children:[(0,c.jsx)("path",{className:"fill-current text-slate-400",d:"M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z"}),(0,c.jsx)("path",{className:"fill-current text-slate-500",d:"M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"})]}),(0,c.jsxs)("svg",{className:"w-4 h-4 hidden dark:block",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg",children:[(0,c.jsx)("path",{className:"fill-current text-slate-400",d:"M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z"}),(0,c.jsx)("path",{className:"fill-current text-slate-500",d:"M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z"})]}),(0,c.jsx)("span",{className:"sr-only",children:"Switch to light / dark version"})]})]})}let en=[{icon:(0,c.jsx)(function(e){return o.createElement("svg",Q({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 -0.5 25 25"},e),s||(s=o.createElement("path",{fill:"#fff",d:"M9.5 5.75a.75.75 0 0 0 0-1.5v1.5ZM4.75 11a.75.75 0 0 0 1.5 0h-1.5ZM9.5 4.25a.75.75 0 0 0 0 1.5v-1.5ZM18.75 11a.75.75 0 0 0 1.5 0h-1.5Zm-8.5-6a.75.75 0 0 0-1.5 0h1.5Zm-1.5 6a.75.75 0 0 0 1.5 0h-1.5Zm.75.75a.75.75 0 0 0 0-1.5v1.5Zm-4-1.5a.75.75 0 0 0 0 1.5v-1.5Zm4 0a.75.75 0 0 0 0 1.5v-1.5Zm10 1.5a.75.75 0 0 0 0-1.5v1.5ZM6.25 11a.75.75 0 0 0-1.5 0h1.5Zm14 0a.75.75 0 0 0-1.5 0h1.5ZM9.5 4.25A4.75 4.75 0 0 0 4.75 9h1.5A3.25 3.25 0 0 1 9.5 5.75v-1.5ZM4.75 9v2h1.5V9h-1.5ZM9.5 5.75h6v-1.5h-6v1.5Zm6 0A3.25 3.25 0 0 1 18.75 9h1.5a4.75 4.75 0 0 0-4.75-4.75v1.5ZM18.75 9v2h1.5V9h-1.5Zm-10-4v6h1.5V5h-1.5Zm.75 5.25h-4v1.5h4v-1.5Zm0 1.5h10v-1.5h-10v1.5ZM4.75 11v4h1.5v-4h-1.5Zm0 4a4.75 4.75 0 0 0 4.75 4.75v-1.5A3.25 3.25 0 0 1 6.25 15h-1.5Zm4.75 4.75h6v-1.5h-6v1.5Zm6 0A4.75 4.75 0 0 0 20.25 15h-1.5a3.25 3.25 0 0 1-3.25 3.25v1.5ZM20.25 15v-4h-1.5v4h1.5Z"})))},{}),title:"Dashboard",url:"/dashboard"},{icon:(0,c.jsx)(C.Z,{}),title:"Active identity",links:[{title:"My profile",url:"/profile"},{title:"All credentials",url:"/credentials/list"},{title:"Storage",url:"/storage"},{title:"Delete identity",url:"/delete-identity"}],requiresAuth:!0},{icon:(0,c.jsx)(function(e){return o.createElement("svg",Y({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},e),r||(r=o.createElement("path",{fill:"#fff",fillRule:"evenodd",d:"M16.982 8.998c.558-1.255-.725-2.538-1.98-1.98l-5 2.222a1.5 1.5 0 0 0-.762.762l-2.222 5c-.558 1.255.725 2.538 1.98 1.98l5-2.222a1.5 1.5 0 0 0 .762-.762l2.222-5ZM10.99 10.99l3.636-1.616-1.616 3.636-3.636 1.616 1.616-3.636Z",clipRule:"evenodd"})),l||(l=o.createElement("path",{fill:"#fff",fillRule:"evenodd",d:"M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-2.013a8.987 8.987 0 1 1 0-17.974 8.987 8.987 0 0 1 0 17.974Z",clipRule:"evenodd"})))},{}),title:"Discover",links:[{title:"Essentials identity wallet",url:"/discover/essentials"},{title:"Elastos Web3 Tech",url:"/discover/elastos"},{title:"Trinity Tech",url:"/discover/trinity-tech"}]},{icon:(0,c.jsx)(function(e){return o.createElement("svg",J({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},e),i||(i=o.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})),a||(a=o.createElement("path",{fill:"#fff",d:"M12 2a8 8 0 0 0-8 8v1.9A2.92 2.92 0 0 0 3 14a2.88 2.88 0 0 0 1.94 2.61C6.24 19.72 8.85 22 12 22h3v-2h-3c-2.26 0-4.31-1.7-5.34-4.39l-.21-.55-.59-.06A1 1 0 0 1 5 14a1 1 0 0 1 .5-.86l.5-.29V11a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5h-4.09a1.5 1.5 0 1 0-1.52 2H20a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2v-2a8 8 0 0 0-8-8Z"})))},{}),title:"Support",links:[{title:"FAQ",url:"/support/faq"},{title:"Contact us",url:"/support/contact"}]}],es=e=>{let{link:t,sidebarExpanded:n}=e,s=(0,F.usePathname)(),r=t.url===s;return(0,c.jsx)("li",{className:"mb-1 last:mb-0",children:(0,c.jsx)(W(),{href:t.url,className:(0,ee.Z)("block transition duration-150 truncate",r?"text-indigo-500":"text-slate-400 hover:text-slate-200"),children:(0,c.jsx)("span",{className:(0,ee.Z)("text-sm font-medium lg:opacity-0 2xl:opacity-100 duration-200",n&&"lg:opacity-100"),children:t.title})})})},er=e=>{var t;let{group:n,sidebarExpanded:s,onGroupHeaderClicked:r}=e,{icon:l,title:i,links:a,requiresAuth:d=!1}=n,h=(0,F.usePathname)(),u=n.url===h||(null===(t=n.links)||void 0===t?void 0:t.some(e=>e.url===h)),[x,m]=(0,o.useState)(!0),[p]=(0,Z.V)((0,I.jU)()),{mounted:v}=(0,L.s)();return!d||p&&v?(0,c.jsx)("div",{children:(0,c.jsx)("ul",{className:"",children:(0,c.jsxs)("li",{className:"px-3 py-2 rounded-sm mb-0.5 last:mb-0 ".concat(u&&"bg-slate-900"),children:[(0,c.jsx)(W(),{href:n.url||"",className:"block text-slate-200 truncate transition duration-150 ".concat(u?"hover:text-slate-200":"hover:text-white"),onClick:e=>{n.url||e.preventDefault(),m(!x),r()},children:(0,c.jsxs)("div",{className:"flex items-center justify-between",children:[(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)("div",{className:"shrink-0 h-6 w-6",children:l}),(0,c.jsx)("span",{className:(0,ee.Z)("text-sm font-medium ml-3 lg:opacity-0 2xl:opacity-100 duration-200",s&&"lg:!opacity-100"),children:i})]}),a&&(0,c.jsx)("div",{className:"flex shrink-0 ml-2",children:(0,c.jsx)("svg",{className:"w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ".concat(x&&"rotate-180"),viewBox:"0 0 12 12",children:(0,c.jsx)("path",{d:"M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"})})})]})}),a&&(0,c.jsx)("div",{className:(0,ee.Z)("lg:hidden 2xl:block",s&&"lg:!block"),children:(0,c.jsx)("ul",{className:"pl-9 mt-1 ".concat(!x&&"hidden"),children:a.map(e=>(0,c.jsx)(es,{link:e,sidebarExpanded:s},e.title))})})]})})}):null};var el=e=>{let{sidebarOpen:t,setSidebarOpen:n}=e,s=(0,o.useRef)(null),r=(0,o.useRef)(null),[l,i]=(0,o.useState)(!0),[a]=(0,Z.V)(A.B);return(0,o.useEffect)(()=>{let e=e=>{r.current&&s.current&&(!t||r.current.contains(e.target)||s.current.contains(e.target)||n(!1))};return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}),(0,o.useEffect)(()=>{let e=e=>{t&&27===e.keyCode&&n(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ".concat(t?"opacity-100":"opacity-0 pointer-events-none"),"aria-hidden":"true"}),(0,c.jsxs)("div",{id:"sidebar",ref:r,className:(0,ee.Z)("flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out",t?"translate-x-0":"-translate-x-64",l&&"lg:!w-64"),children:[(0,c.jsxs)("div",{className:"flex justify-between mb-10 pr-3 sm:px-2",children:[(0,c.jsxs)("button",{ref:s,className:"lg:hidden text-slate-500 hover:text-slate-400",onClick:()=>n(!t),"aria-controls":"sidebar","aria-expanded":t,children:[(0,c.jsx)("span",{className:"sr-only",children:"Close sidebar"}),(0,c.jsx)("svg",{className:"w-6 h-6 fill-current",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"})})]}),(0,c.jsx)(W(),{href:"/",className:"block",children:(0,c.jsxs)("svg",{width:"32",height:"32",viewBox:"0 0 32 32",children:[(0,c.jsxs)("defs",{children:[(0,c.jsxs)("linearGradient",{x1:"28.538%",y1:"20.229%",x2:"100%",y2:"108.156%",id:"logo-a",children:[(0,c.jsx)("stop",{stopColor:"#A5B4FC",stopOpacity:"0",offset:"0%"}),(0,c.jsx)("stop",{stopColor:"#A5B4FC",offset:"100%"})]}),(0,c.jsxs)("linearGradient",{x1:"88.638%",y1:"29.267%",x2:"22.42%",y2:"100%",id:"logo-b",children:[(0,c.jsx)("stop",{stopColor:"#38BDF8",stopOpacity:"0",offset:"0%"}),(0,c.jsx)("stop",{stopColor:"#38BDF8",offset:"100%"})]})]}),(0,c.jsx)("rect",{fill:"#6366F1",width:"32",height:"32",rx:"16"}),(0,c.jsx)("path",{d:"M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z",fill:"#4F46E5"}),(0,c.jsx)("path",{d:"M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z",fill:"url(#logo-a)"}),(0,c.jsx)("path",{d:"M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z",fill:"url(#logo-b)"})]})})]}),a&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("h3",{className:"text-xs uppercase text-slate-500 font-semibold pl-3",children:[(0,c.jsx)("span",{className:(0,ee.Z)("hidden lg:block 2xl:hidden text-center w-6",l&&"lg:hidden"),"aria-hidden":"true",children:"•••"}),(0,c.jsx)("span",{className:(0,ee.Z)("lg:hidden 2xl:block",l&&"lg:!block"),children:"ACTIVE IDENTITY"})]}),(0,c.jsx)("span",{className:(0,ee.Z)("lg:hidden 2xl:block text-slate-200 mx-3 mb-6",l&&"lg:!block"),style:{fontSize:11},children:(0,T.L)(a.did)})]}),(0,c.jsx)("div",{children:en.map(e=>(0,c.jsx)(er,{group:e,sidebarExpanded:l,onGroupHeaderClicked:()=>{l||i(!0)}},e.title))}),(0,c.jsx)("div",{className:"pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto",children:(0,c.jsx)("div",{className:"px-3 py-2",children:(0,c.jsxs)("button",{onClick:()=>i(!l),children:[(0,c.jsx)("span",{className:"sr-only",children:"Expand / collapse sidebar"}),(0,c.jsxs)("svg",{className:(0,ee.Z)("w-6 h-6 fill-current",l&&"rotate-180"),viewBox:"0 0 24 24",children:[(0,c.jsx)("path",{className:"text-slate-400",d:"M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"}),(0,c.jsx)("path",{className:"text-slate-600",d:"M3 23H1V1h2z"})]})]})})}),(0,c.jsx)("div",{className:"px-3 py-2",children:(0,c.jsx)(et,{})})]})]})},ei=n(3857),ea=n(61060),ec=n(56335),eo=n(86375);function ed(e){let{options:t,CacheProvider:n=eo.C,children:s}=e,[r]=o.useState(()=>{let e=(0,ec.Z)(t);e.compat=!0;let n=e.insert,s=[];return e.insert=function(){for(var t=arguments.length,r=Array(t),l=0;l<t;l++)r[l]=arguments[l];let[i,a]=r;return void 0===e.inserted[a.name]&&s.push({name:a.name,isGlobal:!i}),n(...r)},{cache:e,flush:()=>{let e=s;return s=[],e}}});return(0,F.useServerInsertedHTML)(()=>{let e=r.flush();if(0===e.length)return null;let t="",n=r.cache.key,s=[];return e.forEach(e=>{let{name:l,isGlobal:i}=e,a=r.cache.inserted[l];"boolean"!=typeof a&&(i?s.push({name:l,style:a}):(t+=a,n+=" ".concat(l)))}),(0,c.jsxs)(c.Fragment,{children:[s.map(e=>{let{name:t,style:n}=e;return(0,c.jsx)("style",{"data-emotion":"".concat(r.cache.key,"-global ").concat(t),dangerouslySetInnerHTML:{__html:n}},t)}),t&&(0,c.jsx)("style",{"data-emotion":n,dangerouslySetInnerHTML:{__html:t}})]})}),(0,c.jsx)(n,{value:r.cache,children:s})}var eh=n(78157);let eu=(0,eh.Z)({palette:{primary:{500:"rgb(99,102,241)"}}});function ex(e){return(0,c.jsx)(ed,{options:{key:"mui"},children:(0,c.jsxs)(ea.Z,{theme:eu,children:[(0,c.jsx)(ei.ZP,{}),e.children]})})}y.k.init(console),f.l.init({frontendUrl:"https://didweb.trinity-tech.io",backendUrl:"https://didweb-service.trinity-tech.io",appDid:"did:elastos:iddh53iyg3Eyrq4AFiA8tCULpEqUyu49td"}),b(),(0,j.AX)();let em=e=>{let{children:t}=e,[n,s]=(0,o.useState)(!1),{showErrorToast:r}=(0,p.p)();return(0,o.useEffect)(()=>{let e=m.rs.pipe((0,N.h)(e=>!!e)).subscribe(e=>{(0,w.z)(e)||r(e.appExceptionCode+" - "+e.message)});return()=>{e.unsubscribe()}}),(0,c.jsxs)("div",{className:"flex h-screen overflow-hidden",children:[(0,c.jsx)(el,{sidebarOpen:n,setSidebarOpen:s}),(0,c.jsxs)("div",{className:"relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-700",children:[(0,c.jsx)(K,{sidebarOpen:n,setSidebarOpen:s}),(0,c.jsx)("main",{children:(0,c.jsx)("div",{className:"px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ",children:(0,c.jsx)("div",{className:"grid grid-cols-12 gap-6",children:t})})})]})]})};function ep(e){let{children:t}=e;return(0,c.jsx)(ex,{children:(0,c.jsx)(h,{children:(0,c.jsx)(k.wT,{children:(0,c.jsx)(x.au,{children:(0,c.jsx)(em,{children:t})})})})})}},19523:function(e,t,n){"use strict";var s=n(57437);t.Z=e=>{let{text:t}=e;return(0,s.jsx)("div",{className:"bg-indigo-400 p-2 rounded-sm overflow-hidden",style:{width:"39px",height:"39px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontSize:"16px"},children:t})}},42937:function(e,t,n){"use strict";n.d(t,{s:function(){return r}});var s=n(2265);let r=()=>{let[e,t]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{t(!0)},[]),{mounted:e}}},96556:function(e,t,n){"use strict";n.d(t,{p:function(){return r}});var s=n(36953);function r(){let{enqueueSnackbar:e}=(0,s.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},48176:function(e,t,n){"use strict";function s(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,n=e.split(":");if(n.length<3)return e;let s=n[2];if(s.length<=2*t)return e;let r="".concat(s.substr(0,t),"...").concat(s.substr(-t));return"".concat(n[0],":").concat(n[1],":").concat(r)}n.d(t,{L:function(){return s}})}},function(e){e.O(0,[6990,9787,9443,8218,6110,2361,8920,7679,3412,6953,6685,2177,7410,6977,6432,9855,2971,596,1744],function(){return e(e.s=94087)}),_N_E=e.O()}]);