(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{23832:function(e,t,s){Promise.resolve().then(s.bind(s,47595))},47595:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return T}});var l=s(57437),n=s(65673),r=s(2265);let a=()=>{let[e,t]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{t(!0)},[]),{mounted:e}};var i=s(80704);let d=r.createContext({parent:null}),c=e=>{let{show:t,enter:s="",enterStart:n="",enterEnd:a="",leave:d="",leaveStart:c="",leaveEnd:o="",appear:h,unmountOnExit:u,tag:x="div",children:m,...p}=e,g=s.split(" ").filter(e=>e.length),v=n.split(" ").filter(e=>e.length),f=a.split(" ").filter(e=>e.length),j=d.split(" ").filter(e=>e.length),b=c.split(" ").filter(e=>e.length),w=o.split(" ").filter(e=>e.length);function N(e,t){t.length&&e.classList.add(...t)}function y(e,t){t.length&&e.classList.remove(...t)}let k=r.useRef(null);return(0,l.jsx)(i.Z,{appear:h,nodeRef:k,unmountOnExit:u,in:t,addEndListener:e=>{k.current.addEventListener("transitionend",e,!1)},onEnter:()=>{u||(k.current.style.display=null),N(k.current,[...g,...v])},onEntering:()=>{y(k.current,v),N(k.current,f)},onEntered:()=>{y(k.current,[...f,...g])},onExit:()=>{N(k.current,[...j,...b])},onExiting:()=>{y(k.current,b),N(k.current,w)},onExited:()=>{y(k.current,[...w,...j]),u||(k.current.style.display="none")},children:(0,l.jsx)(x,{ref:k,...p,style:{display:u?null:"none"},children:m})})};var o=e=>{let{show:t,appear:s,...n}=e,{parent:a}=(0,r.useContext)(d),i=function(){let e=(0,r.useRef)(!0);return(0,r.useEffect)(()=>{e.current=!1},[]),e.current}();return void 0===t?(0,l.jsx)(c,{appear:a.appear||!a.isInitialRender,show:a.show,...n}):(0,l.jsx)(d.Provider,{value:{parent:{show:t,isInitialRender:i,appear:s}},children:(0,l.jsx)(c,{appear:s,show:t,...n})})},h={src:"/_next/static/media/user-avatar-32.355e011d.png",height:64,width:64,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAb1BMVEWNmvSIlPd7hPFwdedwe8BteMVjbcFYXbNTX5pSXZo+S289S2Q6R2Q5RmM2Q1o1Q1o0Qlo0Qlk0QlczQF4zQVczQVYzQVUyQFQyQFMxP1IxP1ExP04wP1AvPkwuPEwqOT0pOT0pOTgmNy8lNTYgMioSxHEwAAAAR0lEQVR42hXLRwKAIBAEwTFnBZRZxRz+/0bh1ocuCOfBCAmheY+eAn2VWfNtFtNeR0hbFyJOim6BPqt8fJwN870qCjxXVsgfrq4E3m+qSTIAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},u=s(16691),x=s.n(u),m=function(e){let{align:t}=e,[s,n]=(0,r.useState)(!1),a="Test user",i=(0,r.useRef)(null),d=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=e=>{let{target:t}=e;d.current&&(!s||d.current.contains(t)||i.current.contains(t)||n(!1))};return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}),(0,r.useEffect)(()=>{let e=e=>{let{keyCode:t}=e;s&&27===t&&n(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),(0,l.jsxs)("div",{className:"relative inline-flex",children:[(0,l.jsxs)("button",{ref:i,className:"inline-flex justify-center items-center group","aria-haspopup":"true",onClick:()=>n(!s),"aria-expanded":s,children:[(0,l.jsx)(x(),{className:"w-8 h-8 rounded-full",src:h,width:"32",height:"32",alt:"User"}),(0,l.jsxs)("div",{className:"flex items-center truncate",children:[(0,l.jsx)("span",{className:"truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200",children:a}),(0,l.jsx)("svg",{className:"w-3 h-3 shrink-0 ml-1 fill-current text-slate-400",viewBox:"0 0 12 12",children:(0,l.jsx)("path",{d:"M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"})})]})]}),(0,l.jsx)(o,{className:"origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ".concat("right"===t?"right-0":"left-0"),show:s,enter:"transition ease-out duration-200 transform",enterStart:"opacity-0 -translate-y-2",enterEnd:"opacity-100 translate-y-0",leave:"transition ease-out duration-200",leaveStart:"opacity-100",leaveEnd:"opacity-0",children:(0,l.jsx)("div",{ref:d,onFocus:()=>n(!0),onBlur:()=>n(!1),children:(0,l.jsxs)("div",{className:"pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700",children:[(0,l.jsx)("div",{className:"font-medium text-slate-800 dark:text-slate-100",children:a}),(0,l.jsx)("div",{className:"text-xs text-slate-500 dark:text-slate-400 italic",children:"Welcome"})]})})})]})};let p=(0,r.createContext)({currentTheme:"light",changeCurrentTheme:e=>{}});function g(e){let{children:t}=e,s="undefined"==typeof localStorage?null:localStorage,n=null==s?void 0:s.getItem("theme"),[a,i]=(0,r.useState)(n||"light");return(0,r.useEffect)(()=>{document.documentElement.classList.add("[&_*]:!transition-none"),"light"===a?(document.documentElement.classList.remove("dark"),document.documentElement.style.colorScheme="light"):(document.documentElement.classList.add("dark"),document.documentElement.style.colorScheme="dark");let e=setTimeout(()=>{document.documentElement.classList.remove("[&_*]:!transition-none")},1);return()=>clearTimeout(e)},[a]),(0,l.jsx)(p.Provider,{value:{currentTheme:a,changeCurrentTheme:e=>{i(e),s.setItem("theme",e)}},children:t})}let v=()=>(0,r.useContext)(p);function f(){let{currentTheme:e,changeCurrentTheme:t}=v();return(0,l.jsxs)("div",{children:[(0,l.jsx)("input",{type:"checkbox",name:"light-switch",id:"light-switch",className:"light-switch sr-only",checked:"light"===e,onChange:()=>t("light"===e?"dark":"light")}),(0,l.jsxs)("label",{className:"flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full",htmlFor:"light-switch",children:[(0,l.jsxs)("svg",{className:"w-4 h-4 dark:hidden",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{className:"fill-current text-slate-400",d:"M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z"}),(0,l.jsx)("path",{className:"fill-current text-slate-500",d:"M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"})]}),(0,l.jsxs)("svg",{className:"w-4 h-4 hidden dark:block",width:"16",height:"16",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{className:"fill-current text-slate-400",d:"M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z"}),(0,l.jsx)("path",{className:"fill-current text-slate-500",d:"M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z"})]}),(0,l.jsx)("span",{className:"sr-only",children:"Switch to light / dark version"})]})]})}let j=e=>{let{sidebarOpen:t,setSidebarOpen:s}=e,[n,a]=(0,r.useState)(!1);return(0,l.jsx)("header",{className:"sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30",children:(0,l.jsx)("div",{className:"px-4 sm:px-6 lg:px-8",children:(0,l.jsxs)("div",{className:"flex items-center justify-between h-16 -mb-px",children:[(0,l.jsx)("div",{className:"flex",children:(0,l.jsxs)("button",{className:"text-slate-500 hover:text-slate-600 lg:hidden","aria-controls":"sidebar","aria-expanded":t,onClick:e=>{e.stopPropagation(),s(!t)},children:[(0,l.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,l.jsxs)("svg",{className:"w-6 h-6 fill-current",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("rect",{x:"4",y:"5",width:"16",height:"2"}),(0,l.jsx)("rect",{x:"4",y:"11",width:"16",height:"2"}),(0,l.jsx)("rect",{x:"4",y:"17",width:"16",height:"2"})]})]})}),(0,l.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,l.jsx)(f,{}),(0,l.jsx)("hr",{className:"w-px h-6 bg-slate-200 dark:bg-slate-700 border-none"}),(0,l.jsx)(m,{align:"right"})]})]})})})};var b={src:"/_next/static/media/account.1a8711dc.svg",height:100,width:100,blurWidth:0,blurHeight:0},w=s(57042),N=s(61396),y=s.n(N),k=s(24033);let E=[{icon:b,title:"DID Web service",links:[{title:"DID auth",url:"/didweb/auth"},{title:"Donation demo",url:"/didweb/donation-demo"}]},{icon:b,title:"Essentials",links:[{title:"DID auth",url:"/essentials/auth"}]}],A=e=>{let{link:t}=e,s=(0,k.usePathname)(),n=t.url===s;return(0,l.jsx)("li",{className:"mb-1 last:mb-0",children:(0,l.jsx)(y(),{href:t.url,className:(0,w.Z)("block transition duration-150 truncate",n?"text-indigo-500":"text-slate-400 hover:text-slate-200"),children:(0,l.jsx)("span",{className:"text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200",children:t.title})})})},L=e=>{var t;let{group:s,onGroupHeaderClicked:n}=e,{icon:a,title:i,links:d}=s,c=(0,k.usePathname)(),o=s.url===c||(null===(t=s.links)||void 0===t?void 0:t.some(e=>e.url===c)),[h,u]=(0,r.useState)(o);return(0,l.jsx)("div",{children:(0,l.jsx)("ul",{className:"",children:(0,l.jsxs)("li",{className:"px-3 py-2 rounded-sm mb-0.5 last:mb-0 ".concat(o&&"bg-slate-900"),children:[(0,l.jsx)(y(),{href:s.url||"",className:"block text-slate-200 truncate transition duration-150 ".concat(o?"hover:text-slate-200":"hover:text-white"),onClick:e=>{s.url||e.preventDefault(),u(!h),n()},children:(0,l.jsxs)("div",{className:"flex items-center justify-between",children:[(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)(x(),{src:a,alt:"",className:"shrink-0 h-6 w-6"}),(0,l.jsx)("span",{className:"text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200",children:i})]}),d&&(0,l.jsx)("div",{className:"flex shrink-0 ml-2",children:(0,l.jsx)("svg",{className:"w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ".concat(h&&"rotate-180"),viewBox:"0 0 12 12",children:(0,l.jsx)("path",{d:"M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"})})})]})}),d&&(0,l.jsx)("div",{className:"lg:hidden lg:sidebar-expanded:block 2xl:block",children:(0,l.jsx)("ul",{className:"pl-9 mt-1 ".concat(!h&&"hidden"),children:d.map(e=>(0,l.jsx)(A,{link:e},e.title))})})]})})})};var S=e=>{let{sidebarOpen:t,setSidebarOpen:s}=e,n=(0,r.useRef)(null),a=(0,r.useRef)(null),[i,d]=(0,r.useState)(!0);return(0,r.useEffect)(()=>{let e=e=>{a.current&&n.current&&(!t||a.current.contains(e.target)||n.current.contains(e.target)||s(!1))};return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}),(0,r.useEffect)(()=>{let e=e=>{t&&27===e.keyCode&&s(!1)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),(0,r.useEffect)(()=>{var e,t;i?null===(e=document.querySelector("body"))||void 0===e||e.classList.add("sidebar-expanded"):null===(t=document.querySelector("body"))||void 0===t||t.classList.remove("sidebar-expanded")},[i]),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ".concat(t?"opacity-100":"opacity-0 pointer-events-none"),"aria-hidden":"true"}),(0,l.jsxs)("div",{id:"sidebar",ref:a,className:"flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ".concat(t?"translate-x-0":"-translate-x-64"),children:[(0,l.jsx)("div",{className:"flex justify-between mb-10 pr-3 sm:px-2",children:(0,l.jsxs)("button",{ref:n,className:"lg:hidden text-slate-500 hover:text-slate-400",onClick:()=>s(!t),"aria-controls":"sidebar","aria-expanded":t,children:[(0,l.jsx)("span",{className:"sr-only",children:"Close sidebar"}),(0,l.jsx)("svg",{className:"w-6 h-6 fill-current",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("path",{d:"M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"})})]})}),(0,l.jsxs)("h3",{className:"text-xs uppercase text-slate-500 font-semibold pl-3",children:[(0,l.jsx)("span",{className:"hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6","aria-hidden":"true",children:"•••"}),(0,l.jsx)("span",{className:"lg:hidden lg:sidebar-expanded:block 2xl:block",children:"TESTS LIST"})]}),(0,l.jsx)("div",{children:E.map(e=>(0,l.jsx)(L,{group:e,onGroupHeaderClicked:()=>{i||d(!0)}},e.title))}),(0,l.jsx)("div",{className:"pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto",children:(0,l.jsx)("div",{className:"px-3 py-2",children:(0,l.jsxs)("button",{onClick:()=>d(!i),children:[(0,l.jsx)("span",{className:"sr-only",children:"Expand / collapse sidebar"}),(0,l.jsxs)("svg",{className:"w-6 h-6 fill-current sidebar-expanded:rotate-180",viewBox:"0 0 24 24",children:[(0,l.jsx)("path",{className:"text-slate-400",d:"M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"}),(0,l.jsx)("path",{className:"text-slate-600",d:"M3 23H1V1h2z"})]})]})})})]})]})};s(62471);var C=s(98595);let R=(0,C.Z)({palette:{primary:{500:"rgb(99,102,241)"}}}),M=e=>{let{children:t}=e,[s,i]=(0,r.useState)(!1),{mounted:d}=a();return d?(0,l.jsx)(n.a,{theme:R,children:(0,l.jsx)(g,{children:(0,l.jsxs)("div",{className:"flex h-screen overflow-hidden",children:[(0,l.jsx)(S,{sidebarOpen:s,setSidebarOpen:i}),(0,l.jsxs)("div",{className:"relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-700",children:[(0,l.jsx)(j,{sidebarOpen:s,setSidebarOpen:i}),(0,l.jsx)("main",{children:(0,l.jsx)("div",{className:"px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ",children:(0,l.jsx)("div",{className:"grid grid-cols-12 gap-6",children:t})})})]})]})})}):null};function T(e){let{children:t}=e;return(0,l.jsx)("html",{lang:"en",children:(0,l.jsx)("body",{suppressHydrationWarning:!0,children:(0,l.jsx)(M,{children:t})})})}},62471:function(){}},function(e){e.O(0,[310,913,971,596,744],function(){return e(e.s=23832)}),_N_E=e.O()}]);