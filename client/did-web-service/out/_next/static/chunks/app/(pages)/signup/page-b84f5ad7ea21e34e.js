(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8466],{41101:function(e,t,n){"use strict";n.d(t,{Z:function(){return useTheme}}),n(2265);var a=n(95270),l=n(53794),s=n(53469);function useTheme(){let e=(0,a.Z)(l.Z);return e[s.Z]||e}},34083:function(e,t,n){Promise.resolve().then(n.bind(n,96714))},96714:function(e,t,n){"use strict";n.r(t),n.d(t,{dynamic:function(){return c}});var a=n(57437),l=n(9254),s=n(43226),o=n(84671),r=n(11059),i=n(24033),u=n(2265);let c="force-dynamic";t.default=()=>{let[e,t]=(0,u.useState)(""),[n,c]=(0,u.useState)(""),[d,f]=(0,u.useState)(""),[m,v]=(0,u.useState)(!1),[h,x]=(0,u.useState)(!1),b=(0,i.useRouter)(),onSignUp=async()=>{x(!0);let t=await (0,r.y1)(e);if(t){let e=await t.get("security").bindPassword(n);e?b.push("/onboarding"):((0,r.w7)(),x(!1))}else x(!1)};return(0,u.useEffect)(()=>{v((null==e?void 0:e.trim())&&n&&d&&n===d)},[e,n,d]),(0,a.jsxs)("div",{className:"col-span-full xl:col-span-6",children:[(0,a.jsx)(s.Z,{variant:"h5",className:"w-full text-center font-bold mt-32 mb-24 leading-9",children:"Welcome! Create your main account"}),(0,a.jsx)(s.Z,{className:"w-full text-center font-semibold mt-32 mb-24 leading-9",children:"We only need your name and a password for now. We'll show your right after how to secure your account and your identities."}),(0,a.jsxs)("div",{className:"flex flex-col mt-4 gap-4",children:[(0,a.jsx)(o.Z,{label:"How should we call you?",onChange:e=>{var n;t(null===(n=e.currentTarget)||void 0===n?void 0:n.value)},disabled:h,variant:"outlined",size:"small",autoComplete:"off"}),(0,a.jsx)(o.Z,{label:"Password",onChange:e=>{var t;c(null===(t=e.currentTarget)||void 0===t?void 0:t.value)},disabled:h,variant:"outlined",size:"small",autoComplete:"off"}),(0,a.jsx)(o.Z,{label:"Confirm password",onChange:e=>{var t;f(null===(t=e.currentTarget)||void 0===t?void 0:t.value)},disabled:h,variant:"outlined",size:"small",autoComplete:"off"}),(0,a.jsx)(l.c,{onClick:onSignUp,busy:h,disabled:!m,children:"Create a user account"})]})]})}},9254:function(e,t,n){"use strict";n.d(t,{c:function(){return MainButton}});var a=n(57437),l=n(6882),s=n(49050),o=n(57042);let MainButton=e=>{let{leftIcon:t,size:n="medium",mode:r="default",onClick:i,children:u,busy:c=!1,disabled:d=!1,className:f}=e,m=(0,a.jsx)(l.Z,{size:16});return(0,a.jsx)("div",{className:(0,o.Z)("flex",f),children:(0,a.jsx)(s.Z,{className:"flex-1",startIcon:c?m:t,disabled:c||d,size:n,color:"default"===r?"primary":"error",variant:"contained",onClick:i,children:u})})}},24033:function(e,t,n){e.exports=n(20290)}},function(e){e.O(0,[6990,9787,9443,8218,3988,3861,6506,8644,9490,1711,1510,5951,8599,3451,1662,1869,4671,7056,2971,7864,1744],function(){return e(e.s=34083)}),_N_E=e.O()}]);