(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[684],{28213:function(e,n,t){Promise.resolve().then(t.bind(t,29092))},29092:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return page}});var i=t(57437),o=t(2265),r=t(24033),s=t(23785),a=t(39830),l=t(63491),widgets_GoogleSignIn=()=>{let e=(0,r.useRouter)(),n=(0,r.useSearchParams)(),t=n.get("error"),[c,u]=(0,o.useState)(null);return(0,o.useEffect)(()=>{"oauthGoogleEmailNotExists"===t?u("This email address is unknown."):"unknownGoogle"===t&&u("Failed to sign in with Google account.")},[t]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.Kz,{id:"signin-ms",startIcon:(0,i.jsx)(a.JO,{icon:"logos:google-icon"}),onClick:()=>{(0,l.$Y)(l.cX.EmailSignIn),e.push("".concat("https://staging-api.ownmydentity.com","/google"))},className:"w-full",children:"Sign in with Google"}),c&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"text-red-600",children:c})})]})},widgets_LinkedinSignIn=()=>{let e=(0,r.useRouter)(),n=(0,r.useSearchParams)(),t=n.get("error"),[c,u]=(0,o.useState)(null);return(0,o.useEffect)(()=>{"oauthLinkedinEmailNotExists"===t?u("This email address is unknown."):"unknownLinkedin"===t&&u("Failed to sign in with Linkedin account.")},[t]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.Kz,{id:"signin-ms",startIcon:(0,i.jsx)(a.JO,{icon:"logos:linkedin-icon"}),onClick:()=>{(0,l.$Y)(l.cX.EmailSignIn),e.push("".concat("https://staging-api.ownmydentity.com","/linkedin"))},className:"w-full",children:"Sign in with Linkedin"}),c&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"text-red-600",children:c})})]})},c=t(14504),u=t(96507),d=t(88938),g=t(35843),m=t(11059),f=t(15907),p=t(43226);let SignInHeader=()=>(0,i.jsx)("div",{className:"w-full flex justify-center",children:(0,i.jsxs)("div",{className:"md:w-3/5 max-w-2xl",children:[(0,i.jsx)(p.Z,{variant:"h4",className:"w-full text-white text-center",children:"Hello, we've missed you! Welcome back."}),(0,i.jsx)(p.Z,{variant:"body1",className:"text-white text-left pt-6",children:"We're thrilled to have you return. To access your account, you have the convenience of choosing from a variety of sign-in methods available below. Your seamless experience is our priority."})]})});var widgets_MicrosoftSignIn=()=>{let e=(0,r.useRouter)(),n=(0,r.useSearchParams)(),t=n.get("error"),[c,u]=(0,o.useState)(null);return(0,o.useEffect)(()=>{"oauthEmailNotExists"===t?u("This email address is unknown."):"unknown"===t&&u("Failed to sign in with MS account.")},[t]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.Kz,{id:"signin-ms",startIcon:(0,i.jsx)(a.JO,{icon:"logos:microsoft-icon"}),onClick:()=>{(0,l.$Y)(l.cX.EmailSignIn),e.push("".concat("https://staging-api.ownmydentity.com","/microsoft"))},className:"w-full",children:"Sign in with Microsoft"}),c&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"text-red-600",children:c})})]})},h=t(51894),x=t(19739),widgets_PasskeySignIn=()=>{let{showSuccessToast:e}=(0,x.p)(),{navigateToPostSignInLandingPage:n}=(0,l.vX)(),signInWithPasskey=async()=>{let t=await (0,h.H)(()=>(0,m.bB)());t&&(e("Successful sign in"),n())};return(0,i.jsx)(s.Kz,{id:"signin-pk",className:"w-full",startIcon:(0,i.jsx)(a.JO,{icon:"material-symbols:passkey"}),onClick:signInWithPasskey,children:"Sign in with Passkey"})};let w=(0,g.ZP)(u.Z)(e=>{let{theme:n}=e;return{borderRadius:"1rem",overflow:"hidden","&:before":{opacity:.1,content:"''",position:"absolute",width:"100%",height:"200%",background:"linear-gradient(to bottom, rgba(163, 163, 163, 100%), rgba(255, 255, 255, 25%), transparent)",transform:"rotate(-20deg)",transformOrigin:"top left",top:0,right:"-40%"}}}),ContainerBox=e=>{let{children:n}=e;return(0,i.jsx)(d.Z,{className:"relative w-full flex flex-col py-4",children:n})};var page=()=>((0,o.useEffect)(()=>{(0,m.w7)()},[]),(0,i.jsx)("div",{className:"w-full",children:(0,i.jsxs)("div",{className:"flex flex-col justify-center items-center",children:[(0,i.jsx)(SignInHeader,{}),(0,i.jsx)("div",{className:"max-sm:pt-4 md:p-10 w-full flex justify-center",children:(0,i.jsx)(w,{className:"w-full md:w-1/2 max-w-xl border-2 border-white border-opacity-30 bg-[#1E1E1E] relative max-sm:p-5 md:p-10 flex flex-col justify-center items-center",children:(0,i.jsxs)("div",{className:"w-full md:w-3/4 z-10",children:[(0,i.jsx)(ContainerBox,{children:(0,i.jsx)(widgets_MicrosoftSignIn,{})}),(0,i.jsx)(ContainerBox,{children:(0,i.jsx)(widgets_GoogleSignIn,{})}),(0,i.jsx)(ContainerBox,{children:(0,i.jsx)(widgets_LinkedinSignIn,{})}),(0,i.jsx)("div",{className:"py-4",children:(0,i.jsx)(c.Z,{text:"or receive a magic link by email"})}),(0,i.jsx)(ContainerBox,{children:(0,i.jsx)(f.P5,{})}),(0,i.jsx)("div",{className:"py-4",children:(0,i.jsx)(c.Z,{text:"or sign in with your browser"})}),(0,i.jsx)(ContainerBox,{children:(0,i.jsx)(widgets_PasskeySignIn,{})})]})})})]})}))},15907:function(e,n,t){"use strict";t.d(n,{Mq:function(){return EmailFormBox},P5:function(){return EmailSignIn},bH:function(){return o}});var i,o,r=t(57437),s=t(23785),a=t(39830),l=t(73052),c=t(84081),u=t(50819),d=t(90923),g=t(35843),m=t(63491),f=t(36079),p=t(11059),h=t(2265);let x=(0,g.ZP)(c.Z)(e=>{let{theme:n}=e;return{paddingTop:"1.2rem",input:{color:"white",background:"black"},".MuiOutlinedInput-root":{fieldset:{opacity:.6,borderColor:"white"}},".MuiOutlinedInput-root.Mui-focused, .MuiOutlinedInput-root:hover:not(.Mui-disabled, .Mui-error)":{fieldset:{opacity:.8,borderColor:"white"}},".MuiOutlinedInput-root.Mui-disabled":{opacity:.5,input:{WebkitTextFillColor:"white",textFillColor:"white"},fieldset:{borderColor:"white"}},".MuiInputLabel-root, .MuiInputLabel-root.Mui-focused:not(.Mui-error)":{color:"white",fontSize:"10px",transform:"unset",WebkitTransform:"unset"},"#email-address":{fontSize:"13pt",caretColor:"white",color:"rgb(255 255 255 / 65%)"}}});(i=o||(o={}))[i.INIT=0]="INIT",i[i.SENDING=1]="SENDING",i[i.RESULT=2]="RESULT";let EmailFormBox=e=>{let{emailInputRef:n,reqState:t,doEmailAuth:i,actionName:o="Send magic link to email",errorMsg:l=null,pinCode:c}=e,g=(0,h.useRef)(null);async function onEmailSubmit(e){null==e||e.preventDefault(),n.current.blur(),await i()}return(0,r.jsxs)(r.Fragment,{children:[2!==t?(0,r.jsxs)("form",{onSubmit:onEmailSubmit,ref:g,className:"w-full my-2",children:[(0,r.jsxs)(x,{variant:"standard",className:"w-full",children:[(0,r.jsx)(u.Z,{shrink:!0,children:"Input email address"}),(0,r.jsx)(d.Z,{id:"email-address",size:"small",placeholder:"Your email address",className:"w-full",disabled:1===t,inputProps:{ref:n}})]}),(0,r.jsx)("div",{className:"py-4 mt-4 w-full",children:(0,r.jsx)(s.Kz,{id:"send-button",loading:1===t,startIcon:1!==t?(0,r.jsx)(a.JO,{icon:"material-symbols:key"}):null,onClick:i,className:"w-full mt-4",children:o})})]}):(0,r.jsxs)("div",{className:"text-sm text-center text-white",children:["Magic link sent, please check your mailbox and use the following PIN code when asked: ",c,"."]}),l&&(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"text-red-600",children:l})})]})},EmailSignIn=()=>{let e=(0,h.useRef)(null),[n,t]=(0,h.useState)(0),[i,o]=(0,h.useState)(null),[s,a]=(0,h.useState)(null),doEmailAuth=async()=>{o(""),a(null),t(0);let n=e.current.value;if(""!==n){t(1),(0,m.$Y)(m.cX.EmailSignIn);try{let e=await (0,p.X)(n);a(e.pinCode),t(2)}catch(e){e instanceof l.h?o("This email address is unknown."):(f.k.error("Authentication request error:",e),o("Unknown error, please try again.")),t(0)}}};return(0,r.jsx)(EmailFormBox,{emailInputRef:e,reqState:n,doEmailAuth,errorMsg:i,pinCode:s})}},23785:function(e,n,t){"use strict";t.d(n,{Yd:function(){return b},hO:function(){return s},qi:function(){return button_CopyButton},Kz:function(){return l},UO:function(){return h}});var i=t(35843),o=t(44551);let r=(0,i.ZP)(o.Z)(e=>{let{theme:n}=e;return{background:"#000 !important",borderRadius:4,padding:"8px 18px",color:"white","&:disabled":{opacity:"0.7 !important",backgroundColor:"#343434 !important",color:"#fff !important"},"&:hover":{background:"#222 !important"},[n.breakpoints.down("md")]:{fontSize:12,padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var s=r;let a=(0,i.ZP)(o.Z)(e=>{let{theme:n,className:t}=e;return{background:"#323B45 !important",borderRadius:(null==t?void 0:t.includes("rounded"))?8:4,padding:"8px 18px",color:"white",textTransform:"capitalize","&:disabled":{opacity:"0.7 !important",backgroundColor:"#555 !important",color:"#fff !important"},"&:hover":{background:"#666e76 !important"},[n.breakpoints.down("md")]:{fontSize:12,padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var l=a,c=t(57437);t(2265);var u=t(86781),d=t(39830),g=t(52653),m=t(19739),button_CopyButton=e=>{let{text:n,iconWidth:t="17px"}=e,{showSuccessToast:i}=(0,m.p)();return(0,c.jsx)(u.CopyToClipboard,{text:n,onCopy:()=>{i("Copied to clipboard")},children:(0,c.jsx)(g.Z,{type:"button",sx:{p:"5px"},"aria-label":"link",onClick:e=>{e.preventDefault(),e.stopPropagation()},children:(0,c.jsx)(d.JO,{icon:"material-symbols:content-copy-rounded",width:t})})})},f=t(49050);let p=(0,i.ZP)(f.Z)(e=>{let{theme:n}=e;return{color:"dark"===n.palette.mode?"white":"black"}});var h=p,x=t(45295);let w=(0,i.ZP)(x.Z)(e=>{let{theme:n}=e;return{borderRadius:"6.5px",overflow:"hidden","&:after":{background:"#fff",content:"''",height:155,left:-75,opacity:.2,position:"absolute",top:-50,width:50,WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",WebkitTransform:"rotate(35deg)",MsTransform:"rotate(35deg)",transform:"rotate(35deg)",zIndex:-10},"&:hover":{boxShadow:"0px 0px 7px #999999","&:after":{left:"120%",WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)"}}}});var b=w},14504:function(e,n,t){"use strict";var i=t(57437),o=t(57042),r=t(54986),s=t(43226),a=t(35843);let l=(0,a.ZP)(r.Z)(e=>{let{theme:n}=e;return{"&:before, &:after":{borderTopColor:"#C4C4C4"}}});n.Z=e=>{let{text:n,textClassName:t=""}=e;return(0,i.jsx)(l,{children:(0,i.jsx)(s.Z,{variant:"caption",className:(0,o.Z)("px-4 font-bold text-white",t),children:n})})}},19739:function(e,n,t){"use strict";t.d(n,{p:function(){return useToast}});var i=t(36953);function useToast(){let{enqueueSnackbar:e}=(0,i.Ds)();return{showSuccessToast:n=>{e(n,{variant:"success"})},showErrorToast:n=>{e(n,{variant:"error"})}}}},63491:function(e,n,t){"use strict";t.d(n,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return o},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var i,o,r=t(92e3),s=t(36079);(i=o||(o={}))[i.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",i[i.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",i[i.EmailSignIn=2]="EmailSignIn";let a="ongoingflowoperation",l="postsigninurl";function getOnGoingFlowOperation(){return o[localStorage.getItem(a)]}function setOnGoingFlowOperation(e){localStorage.setItem(a,o[e])}function clearOnGoingFlowOperation(){localStorage.removeItem(a)}function setPostSignInUrl(e){s.k.log("flow","Setting post sign in url to:",e),localStorage.setItem(l,e)}function clearPostSignInUrl(){s.k.log("flow","Clearing post sign in url"),localStorage.removeItem(l)}function usePostSignInFlow(){let e=(0,r.useRouter)();return{navigateToPostSignInLandingPage(n){let t=localStorage.getItem(l);if(t)s.k.log("flow","Navigating to post sign in landing page:",t),e.replace(t),clearPostSignInUrl();else{let t=n||"/dashboard";s.k.log("flow","Navigating to post sign in landing page ".concat(t)),e.push(t)}}}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,8321,3824,6642,1228,5295,1510,1396,6953,2e3,182,2884,8852,3262,2971,7864,1744],function(){return e(e.s=28213)}),_N_E=e.O()}]);