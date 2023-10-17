(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1112],{88519:function(e,t,n){"use strict";var r=n(1091);t.Z=r.Z},43381:function(e,t,n){"use strict";n.d(t,{Z:function(){return extendSxProp}});var r=n(13428),s=n(20791),o=n(15959),i=n(58122);let a=["sx"],splitProps=e=>{var t,n;let r={systemProps:{},otherProps:{}},s=null!=(t=null==e||null==(n=e.theme)?void 0:n.unstable_sxConfig)?t:i.Z;return Object.keys(e).forEach(t=>{s[t]?r.systemProps[t]=e[t]:r.otherProps[t]=e[t]}),r};function extendSxProp(e){let t;let{sx:n}=e,i=(0,s.Z)(e,a),{systemProps:u,otherProps:l}=splitProps(i);return t=Array.isArray(n)?[u,...n]:"function"==typeof n?(...e)=>{let t=n(...e);return(0,o.P)(t)?(0,r.Z)({},u,t):u}:(0,r.Z)({},u,n),(0,r.Z)({},l,{sx:t})}},33449:function(e,t,n){"use strict";n.d(t,{Z:function(){return useId}});var r,s=n(2265);let o=0,i=(r||(r=n.t(s,2)))["useId".toString()];function useId(e){if(void 0!==i){let t=i();return null!=e?e:t}return function(e){let[t,n]=s.useState(e),r=e||t;return s.useEffect(()=>{null==t&&(o+=1,n(`mui-${o}`))},[t]),r}(e)}},69243:function(e,t,n){Promise.resolve().then(n.bind(n,45843))},45843:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var r=n(57437),s=n(9254),o=n(40542),i=n(67248),a=n(19739),u=n(14776),l=n(24033),c=n(2265);let MasterPasswordInput=e=>{let{onValidConfirmation:t,title:n}=e,[d]=(0,o.V)(u.jU);null==d||d.get("security");let[f,g]=(0,c.useState)(!1),[p,w]=(0,c.useState)(!1),{showSuccessToast:h}=(0,a.p)();(0,l.useRouter)();let v=(0,c.createRef)(),m=(0,c.createRef)(),bindPassword=async()=>{let e=v.current.value;w(!0),await t(e),w(!1)},refreshPasswordValidity=()=>{let e=v.current.value,t=m.current.value;g(e.length>0&&e===t)};return(0,r.jsxs)("div",{className:"flex flex-row mt-4 gap-2",children:[(0,r.jsx)(i.Z,{label:"New password",inputRef:v,variant:"outlined",size:"small",onChangeCapture:refreshPasswordValidity}),(0,r.jsx)(i.Z,{label:"Confirm password",inputRef:m,variant:"outlined",size:"small",onChangeCapture:refreshPasswordValidity}),(0,r.jsx)(s.c,{onClick:bindPassword,busy:p,disabled:!f,children:n})]})};var d=n(97716),f=n(43226),g=n(63491),page=()=>{let{mounted:e}=(0,d.s)(),[t]=(0,o.V)(u.jU),n=null==t?void 0:t.get("security"),{showSuccessToast:s}=(0,a.p)();(0,l.useRouter)();let{navigateToPostSignInLandingPage:i}=(0,g.vX)(),bindPassword=async e=>{let t=await n.bindPassword(e);t&&(s("Master password successfully created"),setTimeout(()=>{i()},2e3))};return(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)(f.Z,{variant:"h4",children:"Your master password"}),(0,r.jsxs)("p",{children:["You're almost there. You now need a master password that will be used to lock your identities content. ",(0,r.jsx)("br",{}),"Quick takeaways:"]}),(0,r.jsxs)("ul",{className:"mt-6",children:[(0,r.jsxs)("li",{children:[(0,r.jsx)("b",{children:"Our service doesn't store your password"})," in clear, and cannot do anything over your data without your consent."]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("b",{children:"Don't loose your password"}),", there is no way to recover it."]})]}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),e&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(f.Z,{variant:"h5",children:"Bind a master password"}),(0,r.jsx)(MasterPasswordInput,{onValidConfirmation:bindPassword,title:"Create master password"})]})]})}},9254:function(e,t,n){"use strict";n.d(t,{c:function(){return MainButton}});var r=n(57437),s=n(6882),o=n(49050),i=n(57042);let MainButton=e=>{let{leftIcon:t,size:n="medium",mode:a="default",onClick:u,children:l,busy:c=!1,disabled:d=!1,className:f}=e,g=(0,r.jsx)(s.Z,{size:16});return(0,r.jsx)("div",{className:(0,i.Z)("flex",f),children:(0,r.jsx)(o.Z,{className:"flex-1",startIcon:c?g:t,disabled:c||d,size:n,color:"default"===a?"primary":"error",variant:"contained",onClick:u,children:l})})}},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var r=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,r.useState)(null==e?void 0:e.getValue()),[s,o]=(0,r.useState)();return(0,r.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:o});return()=>t.unsubscribe()},[e]),[t]}},97716:function(e,t,n){"use strict";n.d(t,{s:function(){return useMounted}});var r=n(2265);let useMounted=()=>{let[e,t]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{t(!0)},[]),{mounted:e}}},19739:function(e,t,n){"use strict";n.d(t,{p:function(){return useToast}});var r=n(36953);function useToast(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},63491:function(e,t,n){"use strict";n.d(t,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return s},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var r,s,o=n(92e3),i=n(36079);(r=s||(s={}))[r.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",r[r.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",r[r.EmailSignIn=2]="EmailSignIn";let a="ongoingflowoperation",u="postsigninurl";function getOnGoingFlowOperation(){return s[localStorage.getItem(a)]}function setOnGoingFlowOperation(e){localStorage.setItem(a,s[e])}function clearOnGoingFlowOperation(){localStorage.removeItem(a)}function setPostSignInUrl(e){i.k.log("flow","Setting post sign in url to:",e),localStorage.setItem(u,e)}function clearPostSignInUrl(){i.k.log("flow","Clearing post sign in url"),localStorage.removeItem(u)}function usePostSignInFlow(){let e=(0,o.useRouter)();return{navigateToPostSignInLandingPage(t){let n=localStorage.getItem(u);if(n)i.k.log("flow","Navigating to post sign in landing page:",n),e.replace(n),clearPostSignInUrl();else{let n=t||"/dashboard";i.k.log("flow","Navigating to post sign in landing page ".concat(n)),e.push(n)}}}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,9152,5295,1510,1396,6953,2e3,2884,2699,1869,1096,7248,3262,2971,7864,1744],function(){return e(e.s=69243)}),_N_E=e.O()}]);