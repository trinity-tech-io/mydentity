(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8466],{88519:function(e,t,n){"use strict";var r=n(1091);t.Z=r.Z},43381:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(13428),l=n(20791),a=n(15959),s=n(58122);let o=["sx"],u=e=>{var t,n;let r={systemProps:{},otherProps:{}},l=null!=(t=null==e||null==(n=e.theme)?void 0:n.unstable_sxConfig)?t:s.Z;return Object.keys(e).forEach(t=>{l[t]?r.systemProps[t]=e[t]:r.otherProps[t]=e[t]}),r};function i(e){let t;let{sx:n}=e,s=(0,l.Z)(e,o),{systemProps:i,otherProps:c}=u(s);return t=Array.isArray(n)?[i,...n]:"function"==typeof n?(...e)=>{let t=n(...e);return(0,a.P)(t)?(0,r.Z)({},i,t):i}:(0,r.Z)({},i,n),(0,r.Z)({},c,{sx:t})}},33449:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r,l=n(2265);let a=0,s=(r||(r=n.t(l,2)))["useId".toString()];function o(e){if(void 0!==s){let t=s();return null!=e?e:t}return function(e){let[t,n]=l.useState(e),r=e||t;return l.useEffect(()=>{null==t&&n(`mui-${a+=1}`)},[t]),r}(e)}},89915:function(e,t,n){Promise.resolve().then(n.bind(n,96714))},96714:function(e,t,n){"use strict";n.r(t),n.d(t,{dynamic:function(){return c}});var r=n(57437),l=n(9254),a=n(43226),s=n(67248),o=n(11059),u=n(24033),i=n(2265);let c="force-dynamic";t.default=()=>{let[e,t]=(0,i.useState)(""),[n,c]=(0,i.useState)(""),[d,f]=(0,i.useState)(""),[m,v]=(0,i.useState)(!1),[h,x]=(0,i.useState)(!1),b=(0,u.useRouter)(),y=async()=>{x(!0);let t=await (0,o.y1)(e);if(t){let e=await t.get("security").bindPassword(n);e?b.push("/onboarding"):((0,o.w7)(),x(!1))}else x(!1)};return(0,i.useEffect)(()=>{v((null==e?void 0:e.trim())&&n&&d&&n===d)},[e,n,d]),(0,r.jsxs)("div",{className:"col-span-full xl:col-span-6",children:[(0,r.jsx)(a.Z,{variant:"h5",className:"w-full text-center font-bold mt-32 mb-24 leading-9",children:"Welcome! Create your main account"}),(0,r.jsx)(a.Z,{className:"w-full text-center font-semibold mt-32 mb-24 leading-9",children:"We only need your name and a password for now. We'll show your right after how to secure your account and your identities."}),(0,r.jsxs)("div",{className:"flex flex-col mt-4 gap-4",children:[(0,r.jsx)(s.Z,{label:"How should we call you?",onChange:e=>{var n;t(null===(n=e.currentTarget)||void 0===n?void 0:n.value)},disabled:h,variant:"outlined",size:"small",autoComplete:"off"}),(0,r.jsx)(s.Z,{label:"Password",onChange:e=>{var t;c(null===(t=e.currentTarget)||void 0===t?void 0:t.value)},disabled:h,variant:"outlined",size:"small",autoComplete:"off"}),(0,r.jsx)(s.Z,{label:"Confirm password",onChange:e=>{var t;f(null===(t=e.currentTarget)||void 0===t?void 0:t.value)},disabled:h,variant:"outlined",size:"small",autoComplete:"off"}),(0,r.jsx)(l.c,{onClick:y,busy:h,disabled:!m,children:"Create a user account"})]})]})}},9254:function(e,t,n){"use strict";n.d(t,{c:function(){return o}});var r=n(57437),l=n(6882),a=n(49050),s=n(57042);let o=e=>{let{leftIcon:t,size:n="medium",mode:o="default",onClick:u,children:i,busy:c=!1,disabled:d=!1,className:f}=e,m=(0,r.jsx)(l.Z,{size:16});return(0,r.jsx)("div",{className:(0,s.Z)("flex",f),children:(0,r.jsx)(a.Z,{className:"flex-1",startIcon:c?m:t,disabled:c||d,size:n,color:"default"===o?"primary":"error",variant:"contained",onClick:u,children:i})})}},24033:function(e,t,n){e.exports=n(20290)}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,9152,5295,1510,7995,2699,5792,6931,1067,7248,3262,2971,7864,1744],function(){return e(e.s=89915)}),_N_E=e.O()}]);