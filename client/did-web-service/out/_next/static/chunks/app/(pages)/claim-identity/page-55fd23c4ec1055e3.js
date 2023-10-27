(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8541],{3283:function(e,t,n){"use strict";n.d(t,{Z:function(){return S}});var r=n(20791),i=n(13428),a=n(2265),o=n(57042),l=n(95600),s=n(35843),c=n(87927),u=n(59782),d=n(57437),g=(0,u.Z)((0,d.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),m=n(26520),p=n(25702);function getAvatarUtilityClass(e){return(0,p.Z)("MuiAvatar",e)}(0,m.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);let h=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],useUtilityClasses=e=>{let{classes:t,variant:n,colorDefault:r}=e;return(0,l.Z)({root:["root",n,r&&"colorDefault"],img:["img"],fallback:["fallback"]},getAvatarUtilityClass,t)},f=(0,s.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],n.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>(0,i.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,i.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]}))),y=(0,s.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),v=(0,s.ZP)(g,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"}),x=a.forwardRef(function(e,t){let n=(0,c.Z)({props:e,name:"MuiAvatar"}),{alt:l,children:s,className:u,component:g="div",imgProps:m,sizes:p,src:x,srcSet:S,variant:b="circular"}=n,w=(0,r.Z)(n,h),C=null,Z=function({crossOrigin:e,referrerPolicy:t,src:n,srcSet:r}){let[i,o]=a.useState(!1);return a.useEffect(()=>{if(!n&&!r)return;o(!1);let i=!0,a=new Image;return a.onload=()=>{i&&o("loaded")},a.onerror=()=>{i&&o("error")},a.crossOrigin=e,a.referrerPolicy=t,a.src=n,r&&(a.srcset=r),()=>{i=!1}},[e,t,n,r]),i}((0,i.Z)({},m,{src:x,srcSet:S})),I=x||S,j=I&&"error"!==Z,k=(0,i.Z)({},n,{colorDefault:!j,component:g,variant:b}),R=useUtilityClasses(k);return C=j?(0,d.jsx)(y,(0,i.Z)({alt:l,srcSet:S,src:x,sizes:p,ownerState:k,className:R.img},m)):null!=s?s:I&&l?l[0]:(0,d.jsx)(v,{ownerState:k,className:R.fallback}),(0,d.jsx)(f,(0,i.Z)({as:g,ownerState:k,className:(0,o.Z)(R.root,u),ref:t},w,{children:C}))});var S=x},43226:function(e,t,n){"use strict";n.d(t,{Z:function(){return S}});var r=n(20791),i=n(13428),a=n(2265),o=n(57042),l=n(43381),s=n(95600),c=n(35843),u=n(87927),d=n(28702),g=n(26520),m=n(25702);function getTypographyUtilityClass(e){return(0,m.Z)("MuiTypography",e)}(0,g.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var p=n(57437);let h=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],useUtilityClasses=e=>{let{align:t,gutterBottom:n,noWrap:r,paragraph:i,variant:a,classes:o}=e,l={root:["root",a,"inherit"!==e.align&&`align${(0,d.Z)(t)}`,n&&"gutterBottom",r&&"noWrap",i&&"paragraph"]};return(0,s.Z)(l,getTypographyUtilityClass,o)},f=(0,c.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.variant&&t[n.variant],"inherit"!==n.align&&t[`align${(0,d.Z)(n.align)}`],n.noWrap&&t.noWrap,n.gutterBottom&&t.gutterBottom,n.paragraph&&t.paragraph]}})(({theme:e,ownerState:t})=>(0,i.Z)({margin:0},"inherit"===t.variant&&{font:"inherit"},"inherit"!==t.variant&&e.typography[t.variant],"inherit"!==t.align&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16})),y={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},v={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},transformDeprecatedColors=e=>v[e]||e,x=a.forwardRef(function(e,t){let n=(0,u.Z)({props:e,name:"MuiTypography"}),a=transformDeprecatedColors(n.color),s=(0,l.Z)((0,i.Z)({},n,{color:a})),{align:c="inherit",className:d,component:g,gutterBottom:m=!1,noWrap:v=!1,paragraph:x=!1,variant:S="body1",variantMapping:b=y}=s,w=(0,r.Z)(s,h),C=(0,i.Z)({},s,{align:c,color:a,className:d,component:g,gutterBottom:m,noWrap:v,paragraph:x,variant:S,variantMapping:b}),Z=g||(x?"p":b[S]||y[S])||"span",I=useUtilityClasses(C);return(0,p.jsx)(f,(0,i.Z)({as:Z,ref:t,ownerState:C,className:(0,o.Z)(I.root,d)},w))});var S=x},59782:function(e,t,n){"use strict";n.d(t,{Z:function(){return createSvgIcon}});var r=n(13428),i=n(2265),a=n(20791),o=n(57042),l=n(95600),s=n(28702),c=n(87927),u=n(35843),d=n(26520),g=n(25702);function getSvgIconUtilityClass(e){return(0,g.Z)("MuiSvgIcon",e)}(0,d.Z)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var m=n(57437);let p=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],useUtilityClasses=e=>{let{color:t,fontSize:n,classes:r}=e,i={root:["root","inherit"!==t&&`color${(0,s.Z)(t)}`,`fontSize${(0,s.Z)(n)}`]};return(0,l.Z)(i,getSvgIconUtilityClass,r)},h=(0,u.ZP)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,"inherit"!==n.color&&t[`color${(0,s.Z)(n.color)}`],t[`fontSize${(0,s.Z)(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,i,a,o,l,s,c,u,d,g,m,p;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(n=e.transitions)||null==(r=n.create)?void 0:r.call(n,"fill",{duration:null==(i=e.transitions)||null==(i=i.duration)?void 0:i.shorter}),fontSize:({inherit:"inherit",small:(null==(a=e.typography)||null==(o=a.pxToRem)?void 0:o.call(a,20))||"1.25rem",medium:(null==(l=e.typography)||null==(s=l.pxToRem)?void 0:s.call(l,24))||"1.5rem",large:(null==(c=e.typography)||null==(u=c.pxToRem)?void 0:u.call(c,35))||"2.1875rem"})[t.fontSize],color:null!=(d=null==(g=(e.vars||e).palette)||null==(g=g[t.color])?void 0:g.main)?d:({action:null==(m=(e.vars||e).palette)||null==(m=m.action)?void 0:m.active,disabled:null==(p=(e.vars||e).palette)||null==(p=p.action)?void 0:p.disabled,inherit:void 0})[t.color]}}),f=i.forwardRef(function(e,t){let n=(0,c.Z)({props:e,name:"MuiSvgIcon"}),{children:l,className:s,color:u="inherit",component:d="svg",fontSize:g="medium",htmlColor:f,inheritViewBox:y=!1,titleAccess:v,viewBox:x="0 0 24 24"}=n,S=(0,a.Z)(n,p),b=i.isValidElement(l)&&"svg"===l.type,w=(0,r.Z)({},n,{color:u,component:d,fontSize:g,instanceFontSize:e.fontSize,inheritViewBox:y,viewBox:x,hasSvgAsChild:b}),C={};y||(C.viewBox=x);let Z=useUtilityClasses(w);return(0,m.jsxs)(h,(0,r.Z)({as:d,className:(0,o.Z)(Z.root,s),focusable:"false",color:f,"aria-hidden":!v||void 0,role:v?"img":void 0,ref:t},C,S,b&&l.props,{ownerState:w,children:[b?l.props.children:l,v?(0,m.jsx)("title",{children:v}):null]}))});function createSvgIcon(e,t){function Component(n,i){return(0,m.jsx)(f,(0,r.Z)({"data-testid":`${t}Icon`,ref:i},n,{children:e}))}return Component.muiName=f.muiName,i.memo(i.forwardRef(Component))}f.muiName="SvgIcon"},43381:function(e,t,n){"use strict";n.d(t,{Z:function(){return extendSxProp}});var r=n(13428),i=n(20791),a=n(15959),o=n(58122);let l=["sx"],splitProps=e=>{var t,n;let r={systemProps:{},otherProps:{}},i=null!=(t=null==e||null==(n=e.theme)?void 0:n.unstable_sxConfig)?t:o.Z;return Object.keys(e).forEach(t=>{i[t]?r.systemProps[t]=e[t]:r.otherProps[t]=e[t]}),r};function extendSxProp(e){let t;let{sx:n}=e,o=(0,i.Z)(e,l),{systemProps:s,otherProps:c}=splitProps(o);return t=Array.isArray(n)?[s,...n]:"function"==typeof n?(...e)=>{let t=n(...e);return(0,a.P)(t)?(0,r.Z)({},s,t):s}:(0,r.Z)({},s,n),(0,r.Z)({},c,{sx:t})}},79608:function(e,t,n){Promise.resolve().then(n.bind(n,24988))},24988:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var r=n(57437),i=n(96283),a=n(9254),o=n(57042);let VerticalStackLoadingCard_VerticalStackLoadingCard=e=>{let{className:t}=e;return(0,r.jsx)("div",{className:(0,o.Z)("vertical-stack-loading-card",t),children:(0,r.jsxs)("div",{className:"content",children:[(0,r.jsx)("p",{}),(0,r.jsx)("h2",{}),(0,r.jsx)("h2",{})]})})};var l=n(40542),s=n(97716),c=n(90726),u=n(95815),d=n(94025),g=n(43226),m=n(19739),p=n(63491),h=n(60230),f=n(23965),y=n(51894);let v="\n  id\n  identityInfo { ".concat("\n  did\n  createdAt\n  credentialsCount\n  creatingAppDid\n"," }\n  claimUrl\n  expiresAt\n  claimCompletedAt\n");let ClaimableIdentity=class ClaimableIdentity{static async fromJson(e){let t=new ClaimableIdentity;return Object.assign(t,e),t.createdAt=new Date(e.createdAt),t}};let IdentityClaimRequest=class IdentityClaimRequest{static async fromJson(e){let t=new IdentityClaimRequest;return Object.assign(t,e),t.identityInfo=await ClaimableIdentity.fromJson(e.identityInfo),e.expiresAt&&(t.expiresAt=new Date(e.expiresAt)),e.claimCompletedAt&&(t.claimCompletedAt=new Date(e.claimCompletedAt)),t}};var x=n(29748),S=n(91395);function _templateObject(){let e=(0,h._)(["\n            query IdentityClaimRequest($claimRequestId: String!, $nonce: String!) {\n              identityClaimRequest(id: $claimRequestId, nonce: $nonce) {\n                ","\n              }\n            }\n          "]);return _templateObject=function(){return e},e}async function fetchIdentityClaimRequest(e,t){return(0,y.H)(async()=>{var n,r;let i=await (0,x.Pt)(async()=>(await (0,S.W)()).query({query:(0,f.Ps)(_templateObject(),v),variables:{claimRequestId:e,nonce:t}}),null,[d._s.RequestExpired,d._s.AlreadyClaimed,d._s.InvalidNonce,d._s.RequestNotExists]);return(null==i?void 0:null===(n=i.data)||void 0===n?void 0:n.identityClaimRequest)?IdentityClaimRequest.fromJson(null==i?void 0:null===(r=i.data)||void 0===r?void 0:r.identityClaimRequest):null})}var b=n(78596),w=n(36079),C=n(14776),Z=n(24033),I=n(2265);let j="claim-identity";var page=()=>{let{mounted:e}=(0,s.s)(),t=(0,Z.useSearchParams)(),n=t.get("request"),o=t.get("nonce"),[h,f]=(0,I.useState)(!0),[y,v]=(0,I.useState)(!1),[x,S]=(0,I.useState)(null),[k,R]=(0,I.useState)(null),[A,P]=(0,I.useState)(null),[q,D]=(0,I.useState)(null),[N]=(0,l.V)(null==q?void 0:q.name$),[B,O]=(0,I.useState)(null),F=(0,Z.useRouter)(),[M]=(0,l.V)(C.DR),[_]=(0,l.V)(C.jU),E=!h&&M,{showSuccessToast:T,showErrorToast:U}=(0,m.p)();(0,I.useEffect)(()=>{n&&!x&&(w.k.log(j,"Fetching claim request details"),fetchIdentityClaimRequest(n,o).then(e=>{if(w.k.log(j,"Got claim request",e),e){var t;S(e),R(null===(t=e.identityInfo)||void 0===t?void 0:t.creatingAppDid)}else f(!1)}).catch(e=>{if(f(!1),e instanceof u._)switch(e.appExceptionCode){case d._s.AlreadyClaimed:O("This identity is already claimed");break;case d._s.InvalidNonce:O("Security code is invalie");break;case d._s.RequestExpired:O("Request expired, please try again from your original application");break;case d._s.RequestNotExists:O("This identity transfer request doesn't exist")}}))},[n,o,x]),(0,I.useEffect)(()=>{k&&!A&&(w.k.log(j,"Fetching creating app's DID document on chain"),b._.resolveDIDDocument(k).then(async e=>{if(f(!1),P(e),w.k.log(j,"Got creating app's DID document:",e),e){let t=e.getCredentialByType("ApplicationCredential");t?D(await (0,c.C)(t)):w.k.error(j,"The on chain DID document supposed to contain an app info credential doesn't have such credential")}else w.k.warn(j,"Unable to resolve DID Document of the app that created the managed identity")}))},[k,A]);let claimIdentity=async()=>{v(!0);let e=await _.get("identity").claimManagedIdentity(x,o);e?(T("Identity claimed successfully"),F.replace("/dashboard")):(U("Sorry, the identity failed to be claimed for some reason"),v(!1))};return e?(0,r.jsxs)("div",{className:"flex flex-col col-span-full",children:[(0,r.jsx)(g.Z,{variant:"h5",children:"Identity claim"}),!E&&(0,r.jsx)(VerticalStackLoadingCard_VerticalStackLoadingCard,{}),E&&!h&&(0,r.jsx)(r.Fragment,{children:!x&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g.Z,{children:"Sorry, we could not find information about this identity at the moment."}),B&&(0,r.jsx)(g.Z,{children:B})]})}),x&&(0,r.jsxs)(r.Fragment,{children:[N&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(g.Z,{children:["A new Web3 identity has been prepared for you by ",(0,r.jsx)("b",{children:N})," and is ready for you to claim."]}),(0,r.jsxs)(g.Z,{children:["Claiming means that this identity, initially created and controlled by ",N,", will now fully become yours, together with your other identities in your account."]})]}),!N&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g.Z,{children:"A new Web3 identity has been prepared for you by a third party application."}),(0,r.jsx)(g.Z,{children:"Claiming means that this identity, initially created and controlled by another application, will now fully become yours, together with your other identities in your account."})]}),q&&(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(i.J,{credential:q})}),!_&&(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"flex items-center space-x-3 mt-8",children:e&&!_&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.c,{onClick:()=>{(0,p.qC)(window.location.toString()),F.push("/register")},children:"Sign up"}),(0,r.jsx)(a.c,{onClick:()=>{(0,p.qC)(window.location.toString()),F.push("/signin")},children:"Sign in"})]})})}),_&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.c,{className:"mt-8",onClick:claimIdentity,busy:y,children:"Claim this identity"}),(0,r.jsx)(g.Z,{children:"This new identity will be transfered to your account."})]})]})]}):null}},96283:function(e,t,n){"use strict";n.d(t,{J:function(){return CredentialAvatar}});var r=n(57437),i=n(40542),a=n(3283),o=n(57042),l=n(16691),s=n.n(l);let CredentialAvatar=e=>{let{credential:t,width:n=60,height:l=60,className:c}=e,[u]=(0,i.V)(null==t?void 0:t.representativeIcon$);return(0,r.jsx)(a.Z,{sx:{width:n,height:l,padding:"string"==typeof u?0:"".concat(.125*Math.floor(n/8),"rem"),backgroundColor:"#7575754d"},className:(0,o.Z)(c),children:"string"==typeof u?(0,r.jsx)(s(),{src:u,alt:"",width:n,height:l}):u})}},9254:function(e,t,n){"use strict";n.d(t,{c:function(){return MainButton}});var r=n(57437),i=n(6882),a=n(49050),o=n(57042);let MainButton=e=>{let{leftIcon:t,size:n="medium",mode:l="default",onClick:s,children:c,busy:u=!1,disabled:d=!1,className:g}=e,m=(0,r.jsx)(i.Z,{size:16});return(0,r.jsx)("div",{className:(0,o.Z)("flex",g),children:(0,r.jsx)(a.Z,{className:"flex-1",startIcon:u?m:t,disabled:u||d,size:n,color:"default"===l?"primary":"error",variant:"contained",onClick:s,children:c})})}},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var r=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,r.useState)(null==e?void 0:e.getValue()),[i,a]=(0,r.useState)();return(0,r.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:a});return()=>t.unsubscribe()},[e]),[t]}},97716:function(e,t,n){"use strict";n.d(t,{s:function(){return useMounted}});var r=n(2265);let useMounted=()=>{let[e,t]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{t(!0)},[]),{mounted:e}}},19739:function(e,t,n){"use strict";n.d(t,{p:function(){return useToast}});var r=n(36953);function useToast(){let{enqueueSnackbar:e}=(0,r.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},63491:function(e,t,n){"use strict";n.d(t,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return i},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var r,i,a=n(92e3),o=n(36079);(r=i||(i={}))[r.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",r[r.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",r[r.EmailSignIn=2]="EmailSignIn";let l="ongoingflowoperation",s="postsigninurl";function getOnGoingFlowOperation(){return i[localStorage.getItem(l)]}function setOnGoingFlowOperation(e){localStorage.setItem(l,i[e])}function clearOnGoingFlowOperation(){localStorage.removeItem(l)}function setPostSignInUrl(e){o.k.log("flow","Setting post sign in url to:",e),localStorage.setItem(s,e)}function clearPostSignInUrl(){o.k.log("flow","Clearing post sign in url"),localStorage.removeItem(s)}function usePostSignInFlow(){let e=(0,a.useRouter)();return{navigateToPostSignInLandingPage(t){let n=localStorage.getItem(s);if(n)o.k.log("flow","Navigating to post sign in landing page:",n),e.replace(n),clearPostSignInUrl();else{let n=t||"/dashboard";o.k.log("flow","Navigating to post sign in landing page ".concat(n)),e.push(n)}}}}}},function(e){e.O(0,[6990,9787,9443,8218,3988,395,6506,3824,1228,1711,5295,1510,6953,1396,2e3,6691,7056,2971,7864,1744],function(){return e(e.s=79608)}),_N_E=e.O()}]);