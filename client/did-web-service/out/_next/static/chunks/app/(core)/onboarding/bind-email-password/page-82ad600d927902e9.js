(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2281],{43374:function(e,s,t){Promise.resolve().then(t.bind(t,27017))},27017:function(e,s,t){"use strict";t.r(s);var r=t(57437),n=t(19976),a=t(451),o=t(42937),i=t(43226),u=t(96556),l=t(69990),c=t(24033);s.default=()=>{let{mounted:e}=(0,o.s)(),[s]=(0,a.V)((0,l.jU)()),t=null==s?void 0:s.get("security"),{showSuccessToast:d}=(0,u.p)(),h=(0,c.useRouter)(),f=async e=>{let s=await t.bindPassword(e);s&&(d("Master password successfully created"),setTimeout(()=>{h.replace("/dashboard")},2e3))};return(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)(i.Z,{variant:"h4",children:"Your master password"}),(0,r.jsxs)("p",{children:["You're almost there. You now need a master password that will be used to lock your identities content. ",(0,r.jsx)("br",{}),"Quick takeaways:"]}),(0,r.jsxs)("ul",{className:"mt-6",children:[(0,r.jsxs)("li",{children:[(0,r.jsx)("b",{children:"Our service doesn't store your password"})," in clear, and cannot do anything over your data without your consent."]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("b",{children:"Don't loose your password"}),", there is no way to recover it."]})]}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),e&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Z,{variant:"h5",children:"Bind a master password"}),(0,r.jsx)(n.n,{onValidConfirmation:f,title:"Create master password"})]})]})}},19976:function(e,s,t){"use strict";t.d(s,{n:function(){return d}});var r=t(57437),n=t(12131),a=t(451),o=t(20879),i=t(96556),u=t(69990),l=t(24033),c=t(2265);let d=e=>{let{onValidConfirmation:s,title:t}=e,[d]=(0,a.V)((0,u.jU)());null==d||d.get("security");let[h,f]=(0,c.useState)(!1),[p,w]=(0,c.useState)(!1),{showSuccessToast:x}=(0,i.p)();(0,l.useRouter)();let j=(0,c.createRef)(),v=(0,c.createRef)(),m=async()=>{let e=j.current.value;w(!0),await s(e),w(!1)},b=()=>{let e=j.current.value,s=v.current.value;f(e.length>0&&e===s)};return(0,r.jsxs)("div",{className:"flex flex-row mt-4 gap-2",children:[(0,r.jsx)(o.Z,{label:"New password",inputRef:j,variant:"outlined",size:"small",onChangeCapture:b}),(0,r.jsx)(o.Z,{label:"Confirm password",inputRef:v,variant:"outlined",size:"small",onChangeCapture:b}),(0,r.jsx)(n.c,{onClick:m,busy:p,disabled:!h,children:t})]})}},42937:function(e,s,t){"use strict";t.d(s,{s:function(){return n}});var r=t(2265);let n=()=>{let[e,s]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{s(!0)},[]),{mounted:e}}},96556:function(e,s,t){"use strict";t.d(s,{p:function(){return n}});var r=t(36953);function n(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:s=>{e(s,{variant:"success"})},showErrorToast:s=>{e(s,{variant:"error"})}}}},24033:function(e,s,t){e.exports=t(68165)}},function(e){e.O(0,[6990,9787,9443,8218,1004,2361,3509,8077,9954,6953,1375,2971,596,1744],function(){return e(e.s=43374)}),_N_E=e.O()}]);