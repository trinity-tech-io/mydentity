(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4593],{3597:function(e,t,r){Promise.resolve().then(r.bind(r,57361))},57361:function(e,t,r){"use strict";r.r(t);var n=r(57437),s=r(23322),a=r(19976),i=r(451),l=r(42937),o=r(6882),c=r(43226),u=r(96556),d=r(69990),p=r(24033),f=r(29281),h=r(47101);t.default=()=>{let{mounted:e}=(0,l.s)(),[t]=(0,i.V)(d.jU),r=null==t?void 0:t.get("security"),[y]=(0,i.V)(null==r?void 0:r.shadowKeys$),w=null==r?void 0:r.isPasswordBound(),{showSuccessToast:m}=(0,u.p)(),v=(0,p.useRouter)(),x=async e=>{if(await r.ensureMasterKeyUnlocked()){let t=await r.bindPassword(e);t&&(w&&await h.L.createActivity({type:f.T.PASSWORD_CHANGED}),m("Master password set successfully"),setTimeout(()=>{v.push("/account/security")},500))}};return e&&t&&y?(0,n.jsxs)("div",{className:"col-span-full",children:[(0,n.jsx)(s.O,{entries:["security-center","bind-password"]}),!w&&(0,n.jsx)(c.Z,{variant:"h4",children:"Master password creation"}),w&&(0,n.jsx)(c.Z,{variant:"h4",children:"Master password update"}),!w&&(0,n.jsx)("p",{children:"In order to encrypt all your identities information, you need to define a master password."}),w&&(0,n.jsx)("p",{children:"Please set a new master password below. Reminder: you cannot recover this password later."}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),e&&(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(a.n,{onValidConfirmation:x,title:w?"Update master password":"Create master password"})})]}):(0,n.jsx)(o.Z,{})}},23322:function(e,t,r){"use strict";r.d(t,{O:function(){return y}});var n,s,a=r(57437),i=r(61396),l=r.n(i),o=r(2265);function c(){return(c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}let d=[{key:"dashboard",icon:(0,a.jsx)(function(e){return o.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},e),n||(n=o.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6.5 20v-9H3l9-6 9 6h-3.5v9h-3v-3.5A1.5 1.5 0 0 0 13 15h-2a1.5 1.5 0 0 0-1.5 1.5V20h-3Z"})))},{}),title:"Dashboard",path:"/dashboard"},{key:"profile",title:"Profile",path:"/profile"},{key:"account-profile",title:"Account profile",path:"/account/profile"},{key:"security-center",icon:(0,a.jsx)(function(e){return o.createElement("svg",u({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48"},e),s||(s=o.createElement("g",{"data-name":"Layer 2"},o.createElement("path",{fill:"none",d:"M0 0h48v48H0z","data-name":"invisible box"}),o.createElement("path",{fill:"currentColor",d:"M24 2S6 7.1 6 8v18.2c0 9.2 13.3 17.3 17 19.5a1.8 1.8 0 0 0 2 0c3.8-2.1 17-10.3 17-19.5V8c0-.9-18-6-18-6Zm9.4 16.4-11 11a1.9 1.9 0 0 1-2.8 0l-4.9-4.9a2.2 2.2 0 0 1-.4-2.7 2 2 0 0 1 3.1-.2l3.6 3.6 9.6-9.6a2 2 0 0 1 2.8 2.8Z","data-name":"icons Q2"}))))},{}),title:"Security center",path:"/account/security"},{key:"bind-browser",title:"Bind browser",path:"/account/security/bind-passkey"},{key:"bind-email",title:"Bind email",path:"/account/security/bind-email"},{key:"bind-password",title:"Bind password",path:"/account/security/bind-password"},{key:"credentials-list",title:"All credentials",path:"/account/credentials/list"},{key:"delete-identity",title:"Identity deletion",path:"/delete-identity"},{key:"storage",title:"Storage",path:"/storage"},{key:"applications",title:"Applications",path:"/applications"}];function p(e){let t=d.find(t=>t.key===e);if(!t)throw Error("Unknown breadcrumbs item ".concat(e));return t}let f=e=>{let{item:t}=e,{icon:r,title:n,path:s}=t;return(0,a.jsxs)("div",{className:"flex flex-row items-center justify-center",children:[r&&(0,a.jsx)("div",{className:"mr-1",style:{width:18,height:18,color:"var(--primary-color)"},children:r}),(0,a.jsx)(l(),{href:s,className:" bg-gray-200 px-3 py-1 rounded-lg",style:{fontSize:14},children:n})]})},h=()=>(0,a.jsx)("div",{className:"mx-2",children:"/"}),y=e=>{let{entries:t}=e,r=p("dashboard"),n=[r,...t.map(e=>p(e))];return(0,a.jsx)("div",{className:"flex flex-row items-center w-full justify-center",children:n.map((e,t)=>(0,a.jsxs)("div",{className:"flex flex-row items-center",children:[(0,a.jsx)(f,{item:e}),t<n.length-1&&(0,a.jsx)(h,{})]},t))})}},19976:function(e,t,r){"use strict";r.d(t,{n:function(){return d}});var n=r(57437),s=r(12131),a=r(451),i=r(67212),l=r(96556),o=r(69990),c=r(24033),u=r(2265);let d=e=>{let{onValidConfirmation:t,title:r}=e,[d]=(0,a.V)(o.jU);null==d||d.get("security");let[p,f]=(0,u.useState)(!1),[h,y]=(0,u.useState)(!1),{showSuccessToast:w}=(0,l.p)();(0,c.useRouter)();let m=(0,u.createRef)(),v=(0,u.createRef)(),x=async()=>{let e=m.current.value;y(!0),await t(e),y(!1)},b=()=>{let e=m.current.value,t=v.current.value;f(e.length>0&&e===t)};return(0,n.jsxs)("div",{className:"flex flex-row mt-4 gap-2",children:[(0,n.jsx)(i.Z,{label:"New password",inputRef:m,variant:"outlined",size:"small",onChangeCapture:b}),(0,n.jsx)(i.Z,{label:"Confirm password",inputRef:v,variant:"outlined",size:"small",onChangeCapture:b}),(0,n.jsx)(s.c,{onClick:x,busy:h,disabled:!p,children:r})]})}},42937:function(e,t,r){"use strict";r.d(t,{s:function(){return s}});var n=r(2265);let s=()=>{let[e,t]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{t(!0)},[]),{mounted:e}}},96556:function(e,t,r){"use strict";r.d(t,{p:function(){return s}});var n=r(36953);function s(){let{enqueueSnackbar:e}=(0,n.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},24033:function(e,t,r){e.exports=r(68165)}},function(e){e.O(0,[6990,3988,395,5295,1510,4440,6171,8098,6953,1396,1385,2971,596,1744],function(){return e(e.s=3597)}),_N_E=e.O()}]);