(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1112],{41101:function(e,n,t){"use strict";t.d(n,{Z:function(){return useTheme}}),t(2265);var r=t(95270),s=t(53794),o=t(53469);function useTheme(){let e=(0,r.Z)(s.Z);return e[o.Z]||e}},28041:function(e,n,t){Promise.resolve().then(t.bind(t,45843))},45843:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return page}});var r=t(57437),s=t(9254),o=t(40542),i=t(84671),a=t(19739),l=t(14776),u=t(24033),c=t(2265);let MasterPasswordInput=e=>{let{onValidConfirmation:n,title:t}=e,[d]=(0,o.V)(l.jU);null==d||d.get("security");let[g,f]=(0,c.useState)(!1),[w,p]=(0,c.useState)(!1),{showSuccessToast:h}=(0,a.p)();(0,u.useRouter)();let m=(0,c.createRef)(),v=(0,c.createRef)(),bindPassword=async()=>{let e=m.current.value;p(!0),await n(e),p(!1)},refreshPasswordValidity=()=>{let e=m.current.value,n=v.current.value;f(e.length>0&&e===n)};return(0,r.jsxs)("div",{className:"flex flex-row mt-4 gap-2",children:[(0,r.jsx)(i.Z,{label:"New password",inputRef:m,variant:"outlined",size:"small",onChangeCapture:refreshPasswordValidity}),(0,r.jsx)(i.Z,{label:"Confirm password",inputRef:v,variant:"outlined",size:"small",onChangeCapture:refreshPasswordValidity}),(0,r.jsx)(s.c,{onClick:bindPassword,busy:w,disabled:!g,children:t})]})};var d=t(97716),g=t(43226),f=t(63491),page=()=>{let{mounted:e}=(0,d.s)(),[n]=(0,o.V)(l.jU),t=null==n?void 0:n.get("security"),{showSuccessToast:s}=(0,a.p)();(0,u.useRouter)();let{navigateToPostSignInLandingPage:i}=(0,f.vX)(),bindPassword=async e=>{let n=await t.bindPassword(e);n&&(s("Master password successfully created"),setTimeout(()=>{i()},2e3))};return(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)(g.Z,{variant:"h4",children:"Your master password"}),(0,r.jsxs)("p",{children:["You're almost there. You now need a master password that will be used to lock your identities content. ",(0,r.jsx)("br",{}),"Quick takeaways:"]}),(0,r.jsxs)("ul",{className:"mt-6",children:[(0,r.jsxs)("li",{children:[(0,r.jsx)("b",{children:"Our service doesn't store your password"})," in clear, and cannot do anything over your data without your consent."]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("b",{children:"Don't loose your password"}),", there is no way to recover it."]})]}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),e&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g.Z,{variant:"h5",children:"Bind a master password"}),(0,r.jsx)(MasterPasswordInput,{onValidConfirmation:bindPassword,title:"Create master password"})]})]})}},9254:function(e,n,t){"use strict";t.d(n,{c:function(){return MainButton}});var r=t(57437),s=t(6882),o=t(49050),i=t(57042);let MainButton=e=>{let{leftIcon:n,size:t="medium",mode:a="default",onClick:l,children:u,busy:c=!1,disabled:d=!1,className:g}=e,f=(0,r.jsx)(s.Z,{size:16});return(0,r.jsx)("div",{className:(0,i.Z)("flex",g),children:(0,r.jsx)(o.Z,{className:"flex-1",startIcon:c?f:n,disabled:c||d,size:t,color:"default"===a?"primary":"error",variant:"contained",onClick:l,children:u})})}},40542:function(e,n,t){"use strict";t.d(n,{V:function(){return useBehaviorSubject}});var r=t(2265);let useBehaviorSubject=e=>{let[n,t]=(0,r.useState)(null==e?void 0:e.getValue()),[s,o]=(0,r.useState)();return(0,r.useEffect)(()=>{if(!e){t(null);return}let n=e.subscribe({next:e=>{t(e)},error:o});return()=>n.unsubscribe()},[e]),[n]}},97716:function(e,n,t){"use strict";t.d(n,{s:function(){return useMounted}});var r=t(2265);let useMounted=()=>{let[e,n]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{n(!0)},[]),{mounted:e}}},19739:function(e,n,t){"use strict";t.d(n,{p:function(){return useToast}});var r=t(36953);function useToast(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:n=>{e(n,{variant:"success"})},showErrorToast:n=>{e(n,{variant:"error"})}}}},63491:function(e,n,t){"use strict";t.d(n,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return s},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var r,s,o=t(92e3),i=t(36079);(r=s||(s={}))[r.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",r[r.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",r[r.EmailSignIn=2]="EmailSignIn";let a="ongoingflowoperation",l="postsigninurl";function getOnGoingFlowOperation(){return s[localStorage.getItem(a)]}function setOnGoingFlowOperation(e){localStorage.setItem(a,s[e])}function clearOnGoingFlowOperation(){localStorage.removeItem(a)}function setPostSignInUrl(e){i.k.log("flow","Setting post sign in url to:",e),localStorage.setItem(l,e)}function clearPostSignInUrl(){i.k.log("flow","Clearing post sign in url"),localStorage.removeItem(l)}function usePostSignInFlow(){let e=(0,o.useRouter)();return{navigateToPostSignInLandingPage(n){let t=localStorage.getItem(l);if(t)i.k.log("flow","Navigating to post sign in landing page:",t),e.replace(t),clearPostSignInUrl();else{let t=n||"/dashboard";i.k.log("flow","Navigating to post sign in landing page ".concat(t)),e.push(t)}}}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,3861,6506,8644,9490,1711,1510,6953,5951,1396,2e3,8599,3451,1662,1869,4671,7056,2971,7864,1744],function(){return e(e.s=28041)}),_N_E=e.O()}]);