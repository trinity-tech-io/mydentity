(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4843],{77957:function(e,t,n){Promise.resolve().then(n.bind(n,32365))},32365:function(e,t,n){"use strict";n.r(t);var s=n(57437),r=n(38587),i=n(42937),a=n(24033);t.default=()=>{let{mounted:e}=(0,i.s)(),t=(0,a.useRouter)(),n=()=>{t.replace("/profile")};return e?(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(r.K,{onIdentityCreated:()=>{n()}})}):null}},38587:function(e,t,n){"use strict";n.d(t,{K:function(){return h}});var s=n(57437),r=n(12131),i=n(451),a=n(42937),u=n(67212),l=n(96556),c=n(51639),o=n(69990),d=n(24033),f=n(2265);let h=e=>{let{suggestedName:t="",onIdentityCreating:n,onIdentityCreated:h}=e,v=(0,f.useRef)(null),[p]=(0,i.V)((0,o.jU)()),{mounted:b}=(0,a.s)(),{showSuccessToast:y}=(0,l.p)();(0,d.useRouter)();let[w,m]=(0,f.useState)(!1),[x,g]=(0,f.useState)(!1),[j,N]=(0,f.useState)(!1),[C,S]=(0,f.useState)(!1),k=async e=>{null==e||e.preventDefault();let t=v.current.value;m(!0),null==n||n(),g(!0);let s=await p.get("identity").createIdentity(t);g(!1),s&&(c.D.setActiveIdentity(s),N(!0),await s.get("publication").awaitIdentityPublished(),N(!1),S(!0),await s.get("hive").awaitHiveVaultReady(),S(!1),y("Your new identity was created!"),h(s))};return b?(0,s.jsxs)("div",{className:"col-span-full",children:[(0,s.jsx)("form",{className:"border-b border-slate-200 dark:border-slate-700",onSubmit:k,children:(0,s.jsx)("div",{className:"pt-2 pb-2",children:(0,s.jsx)(u.Z,{className:"w-full",label:"Identity name",inputRef:v,autoFocus:!0,defaultValue:t,variant:"outlined",size:"small"})})}),(0,s.jsx)(r.c,{onClick:k,busy:w,children:"Create this identity"}),(0,s.jsxs)("div",{className:"flex flex-col",children:[x&&"Creating the secure identity",j&&"Registering identity",C&&"Creating storage"]})]}):null}},42937:function(e,t,n){"use strict";n.d(t,{s:function(){return r}});var s=n(2265);let r=()=>{let[e,t]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{t(!0)},[]),{mounted:e}}},96556:function(e,t,n){"use strict";n.d(t,{p:function(){return r}});var s=n(36953);function r(){let{enqueueSnackbar:e}=(0,s.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},24033:function(e,t,n){e.exports=n(68165)}},function(e){e.O(0,[6990,9787,9443,8218,6110,2361,8920,7679,3412,6953,6432,1305,2971,596,1744],function(){return e(e.s=77957)}),_N_E=e.O()}]);