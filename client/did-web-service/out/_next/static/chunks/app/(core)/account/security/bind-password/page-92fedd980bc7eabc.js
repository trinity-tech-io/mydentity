(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4495],{1874:function(e,s,t){Promise.resolve().then(t.bind(t,33445))},33445:function(e,s,t){"use strict";t.r(s);var r=t(57437),n=t(19976),a=t(451),u=t(42937),i=t(6882),o=t(43226),l=t(96556),c=t(52856),d=t(69990),f=t(24033);s.default=()=>{let{mounted:e}=(0,u.s)(),[s]=(0,a.V)((0,d.jU)()),t=null==s?void 0:s.get("security"),[p]=(0,a.V)(null==t?void 0:t.shadowKeys$),h=null==t?void 0:t.isPasswordBound(),{showSuccessToast:w}=(0,l.p)(),v=(0,f.useRouter)(),{callWithUnlock:x}=(0,c.h)(),j=async e=>{let s=await x(()=>t.bindPassword(e));s&&(w("Master password set successfully"),setTimeout(()=>{v.push("/account/security")},500))};return e&&s&&p?(0,r.jsxs)("div",{className:"col-span-full",children:[!h&&(0,r.jsx)(o.Z,{variant:"h4",children:"Master password creation"}),h&&(0,r.jsx)(o.Z,{variant:"h4",children:"Master password update"}),!h&&(0,r.jsx)("p",{children:"In order to encrypt all your identities information, you need to define a master password."}),h&&(0,r.jsx)("p",{children:"Please set a new master password below. Reminder: you cannot recover this password later."}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),e&&(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.n,{onValidConfirmation:j,title:h?"Update master password":"Create master password"})})]}):(0,r.jsx)(i.Z,{})}},19976:function(e,s,t){"use strict";t.d(s,{n:function(){return d}});var r=t(57437),n=t(12131),a=t(451),u=t(20879),i=t(96556),o=t(69990),l=t(24033),c=t(2265);let d=e=>{let{onValidConfirmation:s,title:t}=e,[d]=(0,a.V)((0,o.jU)());null==d||d.get("security");let[f,p]=(0,c.useState)(!1),[h,w]=(0,c.useState)(!1),{showSuccessToast:v}=(0,i.p)();(0,l.useRouter)();let x=(0,c.createRef)(),j=(0,c.createRef)(),m=async()=>{let e=x.current.value;w(!0),await s(e),w(!1)},y=()=>{let e=x.current.value,s=j.current.value;p(e.length>0&&e===s)};return(0,r.jsxs)("div",{className:"flex flex-row mt-4 gap-2",children:[(0,r.jsx)(u.Z,{label:"New password",inputRef:x,variant:"outlined",size:"small",onChangeCapture:y}),(0,r.jsx)(u.Z,{label:"Confirm password",inputRef:j,variant:"outlined",size:"small",onChangeCapture:y}),(0,r.jsx)(n.c,{onClick:m,busy:h,disabled:!f,children:t})]})}},42937:function(e,s,t){"use strict";t.d(s,{s:function(){return n}});var r=t(2265);let n=()=>{let[e,s]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{s(!0)},[]),{mounted:e}}},96556:function(e,s,t){"use strict";t.d(s,{p:function(){return n}});var r=t(36953);function n(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:s=>{e(s,{variant:"success"})},showErrorToast:s=>{e(s,{variant:"error"})}}}},24033:function(e,s,t){e.exports=t(68165)}},function(e){e.O(0,[6990,9787,9443,8218,1004,2361,3509,8077,9954,6953,1375,2971,596,1744],function(){return e(e.s=1874)}),_N_E=e.O()}]);