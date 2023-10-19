(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1571],{88519:function(e,t,n){"use strict";var i=n(1091);t.Z=i.Z},43381:function(e,t,n){"use strict";n.d(t,{Z:function(){return extendSxProp}});var i=n(13428),r=n(20791),s=n(15959),u=n(58122);let a=["sx"],splitProps=e=>{var t,n;let i={systemProps:{},otherProps:{}},r=null!=(t=null==e||null==(n=e.theme)?void 0:n.unstable_sxConfig)?t:u.Z;return Object.keys(e).forEach(t=>{r[t]?i.systemProps[t]=e[t]:i.otherProps[t]=e[t]}),i};function extendSxProp(e){let t;let{sx:n}=e,u=(0,r.Z)(e,a),{systemProps:l,otherProps:o}=splitProps(u);return t=Array.isArray(n)?[l,...n]:"function"==typeof n?(...e)=>{let t=n(...e);return(0,s.P)(t)?(0,i.Z)({},l,t):l}:(0,i.Z)({},l,n),(0,i.Z)({},o,{sx:t})}},33449:function(e,t,n){"use strict";n.d(t,{Z:function(){return useId}});var i,r=n(2265);let s=0,u=(i||(i=n.t(r,2)))["useId".toString()];function useId(e){if(void 0!==u){let t=u();return null!=e?e:t}return function(e){let[t,n]=r.useState(e),i=e||t;return r.useEffect(()=>{null==t&&(s+=1,n(`mui-${s}`))},[t]),i}(e)}},40934:function(e,t,n){Promise.resolve().then(n.bind(n,78886))},78886:function(e,t,n){"use strict";n.r(t);var i=n(57437),r=n(9254),s=n(51894),u=n(40542),a=n(97716),l=n(43226),o=n(67248),c=n(19739),d=n(14776),f=n(24033),p=n(2265);t.default=()=>{let e=(0,p.useRef)(null),[t]=(0,u.V)(d.jU),n=(0,f.useRouter)(),{mounted:h}=(0,a.s)(),{showSuccessToast:v}=(0,c.p)(),[y,b]=(0,p.useState)(!1),[x,m]=(0,p.useState)(!1),[j,w]=(0,p.useState)(!1),createIdentity=async i=>{null==i||i.preventDefault();let r=e.current.value;b(!0),m(!0);let u=await (0,s.H)(async()=>await t.get("identity").createApplicationIdentity(r));m(!1),u&&(w(!0),await u.publication().awaitIdentityPublished(),w(!1),u.update(r,""),m(!1),v("The application identity was created"),n.push("/developers/application?did="+u.did))};return h?(0,i.jsxs)("div",{className:"col-span-full",children:[(0,i.jsx)(l.Z,{variant:"h6",children:"New application"}),(0,i.jsx)(l.Z,{children:'You are about to create a new DID to represent your application. This DID will be used in various locations to identify your application. For instance, when you create and sign credentials from your app using this identity, users will see your application logo and icon as the "issuer".'}),(0,i.jsx)("form",{className:"border-b border-slate-200 dark:border-slate-700 mt-4",onSubmit:createIdentity,children:(0,i.jsx)("div",{className:"pt-2 pb-2",children:(0,i.jsx)(o.Z,{className:"w-full",label:"Application name",inputRef:e,autoFocus:!0,variant:"outlined",size:"small",autoComplete:"off"})})}),(0,i.jsx)(r.c,{onClick:createIdentity,busy:y,children:"Create this application identity"}),(0,i.jsxs)("div",{className:"flex flex-col",children:[x&&"Creating the application identity",j&&"Publishing the application identity on the identity chain"]})]}):null}},9254:function(e,t,n){"use strict";n.d(t,{c:function(){return MainButton}});var i=n(57437),r=n(6882),s=n(49050),u=n(57042);let MainButton=e=>{let{leftIcon:t,size:n="medium",mode:a="default",onClick:l,children:o,busy:c=!1,disabled:d=!1,className:f}=e,p=(0,i.jsx)(r.Z,{size:16});return(0,i.jsx)("div",{className:(0,u.Z)("flex",f),children:(0,i.jsx)(s.Z,{className:"flex-1",startIcon:c?p:t,disabled:c||d,size:n,color:"default"===a?"primary":"error",variant:"contained",onClick:l,children:o})})}},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var i=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,i.useState)(null==e?void 0:e.getValue()),[r,s]=(0,i.useState)();return(0,i.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:s});return()=>t.unsubscribe()},[e]),[t]}},97716:function(e,t,n){"use strict";n.d(t,{s:function(){return useMounted}});var i=n(2265);let useMounted=()=>{let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{t(!0)},[]),{mounted:e}}},19739:function(e,t,n){"use strict";n.d(t,{p:function(){return useToast}});var i=n(36953);function useToast(){let{enqueueSnackbar:e}=(0,i.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},24033:function(e,t,n){e.exports=n(20290)}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,9152,5295,1510,6953,2884,2699,1869,1096,7248,3262,2971,7864,1744],function(){return e(e.s=40934)}),_N_E=e.O()}]);