(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7083],{11369:function(e,n,t){Promise.resolve().then(t.bind(t,42581))},42581:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return page}});var r=t(57437),o=t(2265),i=t(24033),a=t(82583),l=t(96507),s=t(13457),c=t(43226),u=t(35843),d=t(15707),g=t(40542),p=t(95815),f=t(94025),m=t(63491),h=t(14776),b=t(11059),x=t(55630),v=t(67133).Buffer,w=void 0!==v?e=>v.from(e,"base64"):e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)),k=t(23785),S=t(19739);let I=(0,u.ZP)(l.Z)(e=>{let{theme:n}=e;return{".pin-field":{backgroundColor:"dark"==n.palette.mode?"#1D1D1D":"white",border:"1px solid #99999990",borderRadius:4,fontSize:"2rem",margin:"0.25rem",height:"3.5rem",outline:"none",textAlign:"center",transitionDuration:"100ms",transitionProperty:"background, color, border, box-shadow, transform",width:"3rem","&:focus":{borderColor:"rgb(0, 123, 255)",outline:"none",transform:"scale(1.05)"},"&:invalid":{animation:"shake 3 linear 75ms",borderColor:"rgb(220, 53, 69)",boxShadow:"0 0 0.25rem rgba(220, 53, 69, 0.5)"},"&:disabled":{cursor:"not-allowed",opacity:.5}},"@keyframes shake":{from:{transform:"scale(1.05) translateY(-5%)"},to:{transform:"scale(1.05) translateY(5%)"}}}});var page=()=>{var e;let n=(0,i.useSearchParams)(),t=n.get("key"),l=t?(e=t.replace(/-/g,"+").replace(/_/g,"/")+"==",(0,x.Z)(w(e))):null,[u,v]=(0,o.useState)(!1),[P,C]=(0,o.useState)(""),[y,B]=(0,o.useState)(!1),O=(0,i.useRouter)(),[Z]=(0,g.V)(h.jU),{navigateToPostSignInLandingPage:j}=(0,m.vX)(),{showErrorToast:N}=(0,S.p)(),handleCheckException=e=>{if(v(!1),e instanceof p._)switch(e.appExceptionCode){case f.Wg.InvalidPINCode:N("Invalid PIN code");return;case f.Wg.InexistingAuthKey:N("This link is inexisting or expired");return}N("Unexpected error")},checkPin=e=>{v(!0),Z?(B(!0),Z.get("email").checkRawEmailBind(l,e).then(e=>{e?O.push("/account/security"):(N("Unexpected error"),v(!1))}).catch(e=>{handleCheckException(e)})):(0,b.K4)(l,e).then(e=>{e?j():(N("Unexpected error"),v(!1))}).catch(e=>{handleCheckException(e)})};return(0,r.jsxs)("div",{children:[(0,r.jsx)(d.Z,{title:"Sign in from another browser",description:"Kindly enter the 6-digit PIN that was provided when generating a sign-in link for another browser",showBg:!0}),(0,r.jsxs)(s.Z,{alignItems:"center",className:"max-w-sm m-auto",sx:{pt:{xs:2,sm:4}},children:[(0,r.jsx)(c.Z,{variant:"subtitle1",children:"Enter PIN Code"}),(0,r.jsx)(I,{children:(0,r.jsx)(a.ZP,{autoFocus:!0,length:6,className:"pin-field",onChange:e=>{C(e),6!=e.length||u||checkPin(e)},disabled:u||void 0,validate:/\d/})}),(0,r.jsx)("div",{className:"px-2 sm:px-12 w-full mt-8",children:(0,r.jsx)(k.Kz,{loading:u,disabled:P.length<6,className:"w-full",onClick:()=>{6==P.length&&checkPin(P)},children:"CONFIRM"})})]})]})}},23785:function(e,n,t){"use strict";t.d(n,{Yd:function(){return v},hO:function(){return a},qi:function(){return button_CopyButton},Kz:function(){return s},UO:function(){return h}});var r=t(35843),o=t(44551);let i=(0,r.ZP)(o.Z)(e=>{let{theme:n}=e;return{background:"#000 !important",borderRadius:4,color:"white","&:disabled":{opacity:"0.7 !important",backgroundColor:"#343434 !important",color:"#fff !important"},"&:hover":{background:"#222 !important"},[n.breakpoints.down("md")]:{fontSize:12,padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var a=i;let l=(0,r.ZP)(o.Z)(e=>{let{theme:n,className:t}=e;return{background:"#323B45 !important",borderRadius:(null==t?void 0:t.includes("rounded"))?8:4,color:"white",textTransform:"uppercase",paddingLeft:12,paddingRight:12,"&:disabled":{opacity:"0.7 !important",backgroundColor:"#555 !important",color:"#fff !important"},"&:hover":{background:"#666e76 !important"},[n.breakpoints.down("md")]:{padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var s=l,c=t(57437);t(2265);var u=t(86781),d=t(39830),g=t(52653),p=t(19739),button_CopyButton=e=>{let{text:n,iconWidth:t="17px"}=e,{showSuccessToast:r}=(0,p.p)();return(0,c.jsx)(u.CopyToClipboard,{text:n,onCopy:()=>{r("Copied to clipboard")},children:(0,c.jsx)(g.Z,{type:"button",sx:{p:"5px"},"aria-label":"link",onClick:e=>{e.preventDefault(),e.stopPropagation()},color:"primary",children:(0,c.jsx)(d.JO,{icon:"material-symbols:content-copy-rounded",width:t})})})},f=t(49050);let m=(0,r.ZP)(f.Z)(e=>{let{theme:n}=e;return{color:"dark"===n.palette.mode?"white":"black"}});var h=m,b=t(45295);let x=(0,r.ZP)(b.Z)(e=>{let{theme:n}=e;return{borderRadius:"4px",overflow:"hidden","&:after":{background:"#fff",content:"''",height:155,left:-75,opacity:.2,position:"absolute",top:-50,width:50,WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",WebkitTransform:"rotate(35deg)",MsTransform:"rotate(35deg)",transform:"rotate(35deg)",zIndex:-10},"&:hover":{boxShadow:"0px 0px 7px #999999","&:after":{left:"120%",WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)"}}}});var v=x},15707:function(e,n,t){"use strict";var r=t(57437),o=t(35843),i=t(43226);let a=(0,o.ZP)("div")(e=>{let{showBg:n}=e;return{marginBottom:"1.5rem",background:n?"url('/headline-banner.png') no-repeat center center / cover":"none"}});n.Z=e=>{let{title:n,description:t,showBg:o=!1}=e;return(0,r.jsxs)(a,{showBg:o,className:o?"p-4 sm:p-6 rounded-lg":"",children:[(0,r.jsx)(i.Z,{className:"w-full pb-3 sm:pb-4 sm:pb-8",variant:"h3",color:"text.primary",children:n}),(0,r.jsx)(i.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:t})]})}},40542:function(e,n,t){"use strict";t.d(n,{V:function(){return useBehaviorSubject}});var r=t(2265);let useBehaviorSubject=e=>{let[n,t]=(0,r.useState)(null==e?void 0:e.getValue()),[o,i]=(0,r.useState)();return(0,r.useEffect)(()=>{if(!e){t(null);return}let n=e.subscribe({next:e=>{t(e)},error:i});return()=>n.unsubscribe()},[e]),[n]}},19739:function(e,n,t){"use strict";t.d(n,{p:function(){return useToast}});var r=t(36953);function useToast(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:n=>{e(n,{variant:"success"})},showErrorToast:n=>{e(n,{variant:"error"})}}}},63491:function(e,n,t){"use strict";t.d(n,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return o},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var r,o,i=t(92e3),a=t(36079);(r=o||(o={}))[r.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",r[r.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",r[r.EmailSignIn=2]="EmailSignIn";let l="ongoingflowoperation",s="postsigninurl";function getOnGoingFlowOperation(){return o[localStorage.getItem(l)]}function setOnGoingFlowOperation(e){localStorage.setItem(l,o[e])}function clearOnGoingFlowOperation(){localStorage.removeItem(l)}function setPostSignInUrl(e){a.k.log("flow","Setting post sign in url to:",e),localStorage.setItem(s,e)}function clearPostSignInUrl(){a.k.log("flow","Clearing post sign in url"),localStorage.removeItem(s)}function usePostSignInFlow(){let e=(0,i.useRouter)();return{navigateToPostSignInLandingPage(n){let t=localStorage.getItem(s);if(t)a.k.log("flow","Navigating to post sign in landing page:",t),e.replace(t),clearPostSignInUrl();else{let t=n||"/dashboard";a.k.log("flow","Navigating to post sign in landing page ".concat(t)),e.push(t)}}}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,3861,6506,8644,9490,9830,1711,1510,6953,378,1396,2e3,860,7056,2971,7864,1744],function(){return e(e.s=11369)}),_N_E=e.O()}]);