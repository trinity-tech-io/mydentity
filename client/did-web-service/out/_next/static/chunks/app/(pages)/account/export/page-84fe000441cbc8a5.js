(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7659],{48727:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),o=n(57437),s=(0,r.default)((0,o.jsx)("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess");t.Z=s},81344:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),o=n(57437),s=(0,r.default)((0,o.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");t.Z=s},49605:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),o=n(57437),s=(0,r.default)((0,o.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.Z=s},4193:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),o=n(57437),s=(0,r.default)((0,o.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.Z=s},84081:function(e,t,n){"use strict";n.d(t,{Z:function(){return Z}});var i=n(20791),r=n(13428),o=n(2265),s=n(57042),l=n(95600),a=n(87927),u=n(35843),d=n(5454),c=n(28702),m=n(10673),h=n(2592),f=n(26520),p=n(25702);function getFormControlUtilityClasses(e){return(0,p.Z)("MuiFormControl",e)}(0,f.Z)("MuiFormControl",["root","marginNone","marginNormal","marginDense","fullWidth","disabled"]);var g=n(57437);let x=["children","className","color","component","disabled","error","focused","fullWidth","hiddenLabel","margin","required","size","variant"],useUtilityClasses=e=>{let{classes:t,margin:n,fullWidth:i}=e,r={root:["root","none"!==n&&`margin${(0,c.Z)(n)}`,i&&"fullWidth"]};return(0,l.Z)(r,getFormControlUtilityClasses,t)},v=(0,u.ZP)("div",{name:"MuiFormControl",slot:"Root",overridesResolver:({ownerState:e},t)=>(0,r.Z)({},t.root,t[`margin${(0,c.Z)(e.margin)}`],e.fullWidth&&t.fullWidth)})(({ownerState:e})=>(0,r.Z)({display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},"normal"===e.margin&&{marginTop:16,marginBottom:8},"dense"===e.margin&&{marginTop:8,marginBottom:4},e.fullWidth&&{width:"100%"})),y=o.forwardRef(function(e,t){let n;let l=(0,a.Z)({props:e,name:"MuiFormControl"}),{children:u,className:c,color:f="primary",component:p="div",disabled:y=!1,error:Z=!1,focused:b,fullWidth:F=!1,hiddenLabel:C=!1,margin:E="none",required:j=!1,size:S="medium",variant:T="outlined"}=l,M=(0,i.Z)(l,x),R=(0,r.Z)({},l,{color:f,component:p,disabled:y,error:Z,fullWidth:F,hiddenLabel:C,margin:E,required:j,size:S,variant:T}),P=useUtilityClasses(R),[z,I]=o.useState(()=>{let e=!1;return u&&o.Children.forEach(u,t=>{if(!(0,m.Z)(t,["Input","Select"]))return;let n=(0,m.Z)(t,["Select"])?t.props.input:t;n&&(0,d.B7)(n.props)&&(e=!0)}),e}),[k,w]=o.useState(()=>{let e=!1;return u&&o.Children.forEach(u,t=>{(0,m.Z)(t,["Input","Select"])&&((0,d.vd)(t.props,!0)||(0,d.vd)(t.props.inputProps,!0))&&(e=!0)}),e}),[A,B]=o.useState(!1);y&&A&&B(!1);let N=void 0===b||y?A:b,O=o.useMemo(()=>({adornedStart:z,setAdornedStart:I,color:f,disabled:y,error:Z,filled:k,focused:N,fullWidth:F,hiddenLabel:C,size:S,onBlur:()=>{B(!1)},onEmpty:()=>{w(!1)},onFilled:()=>{w(!0)},onFocus:()=>{B(!0)},registerEffect:n,required:j,variant:T}),[z,f,y,Z,k,N,F,C,n,j,S,T]);return(0,g.jsx)(h.Z.Provider,{value:O,children:(0,g.jsx)(v,(0,r.Z)({as:p,ownerState:R,className:(0,s.Z)(P.root,c),ref:t},M,{children:u}))})});var Z=y},33948:function(e,t,n){"use strict";n.d(t,{Z:function(){return styles_ThemeProvider_ThemeProvider}});var i=n(13428),r=n(20791),o=n(2265);let s=o.createContext(null);function useTheme(){let e=o.useContext(s);return e}let l="function"==typeof Symbol&&Symbol.for;var a=l?Symbol.for("mui.nested"):"__THEME_NESTED__",u=n(57437),ThemeProvider_ThemeProvider=function(e){let{children:t,theme:n}=e,r=useTheme(),l=o.useMemo(()=>{let e=null===r?n:function(e,t){if("function"==typeof t){let n=t(e);return n}return(0,i.Z)({},e,t)}(r,n);return null!=e&&(e[a]=null!==r),e},[n,r]);return(0,u.jsx)(s.Provider,{value:l,children:t})},d=n(86375),c=n(44809);let m={};function useThemeScoping(e,t,n,r=!1){return o.useMemo(()=>{let o=e&&t[e]||t;if("function"==typeof n){let s=n(o),l=e?(0,i.Z)({},t,{[e]:s}):s;return r?()=>l:l}return e?(0,i.Z)({},t,{[e]:n}):(0,i.Z)({},t,n)},[e,t,n,r])}var esm_ThemeProvider_ThemeProvider=function(e){let{children:t,theme:n,themeId:i}=e,r=(0,c.Z)(m),o=useTheme()||m,s=useThemeScoping(i,r,n),l=useThemeScoping(i,o,n,!0);return(0,u.jsx)(ThemeProvider_ThemeProvider,{theme:l,children:(0,u.jsx)(d.T.Provider,{value:s,children:t})})},h=n(53469);let f=["theme"];function styles_ThemeProvider_ThemeProvider(e){let{theme:t}=e,n=(0,r.Z)(e,f),o=t[h.Z];return(0,u.jsx)(esm_ThemeProvider_ThemeProvider,(0,i.Z)({},n,{themeId:o?h.Z:void 0,theme:o||t}))}},80494:function(e,t,n){"use strict";var i=n(78078);t.Z=i.Z},10673:function(e,t,n){"use strict";n.d(t,{Z:function(){return utils_isMuiElement}});var i=n(2265),utils_isMuiElement=function(e,t){var n,r;return i.isValidElement(e)&&-1!==t.indexOf(null!=(n=e.type.muiName)?n:null==(r=e.type)||null==(r=r._payload)||null==(r=r.value)?void 0:r.muiName)}},53931:function(e,t,n){"use strict";var i=n(96278);t.Z=i.Z},26649:function(e,t,n){"use strict";var i=n(88221);t.Z=i.Z},73292:function(e,t,n){"use strict";var i=n(34625);t.Z=i.Z},62940:function(e,t,n){"use strict";function createChainedFunction(...e){return e.reduce((e,t)=>null==t?e:function(...n){e.apply(this,n),t.apply(this,n)},()=>{})}n.d(t,{Z:function(){return createChainedFunction}})},34625:function(e,t,n){"use strict";n.d(t,{Z:function(){return useControlled}});var i=n(2265);function useControlled({controlled:e,default:t,name:n,state:r="value"}){let{current:o}=i.useRef(void 0!==e),[s,l]=i.useState(t),a=o?e:s,u=i.useCallback(e=>{o||l(e)},[]);return[a,u]}},49990:function(e,t,n){Promise.resolve().then(n.bind(n,69319))},67650:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return o}});let i=n(21024),r=i._(n(2265)),o=r.default.createContext(null)},69319:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var i=n(57437),r=n(2265),o=n(39830),s=n(28874),l=n(13457),a=n(40542),u=n(97716),d=n(14776),c=n(96507),m=n(43226),h=n(69991),f=n(81344),p=n(48727),g=n(62167),x=n(97870);let DislayName=e=>{let{identity:t}=e,[n,o]=(0,r.useState)(void 0);return(0,r.useEffect)(()=>{let e=t.profile().name$.subscribe(e=>{o(e)});return()=>{e.unsubscribe()}},[t]),(0,i.jsx)(i.Fragment,{children:n})};var v=n(79673),y=n(23785);let IdentityRootDids=e=>{let{identities:t,disableCopyDID:n=!1}=e,[o,s]=(0,r.useState)(!0),handleExpanding=()=>{s(!o)};return(0,i.jsx)(g.M,{initial:!1,children:t.map((e,r)=>!o&&r>0?null:(0,i.jsx)(x.E.section,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{opacity:1,height:"auto"},collapsed:{opacity:0,height:0}},transition:{duration:.3,ease:[.04,.62,.23,.98]},children:(0,i.jsxs)(c.Z,{className:"relative z-10 flex flex-col",children:[(0,i.jsxs)(l.Z,{direction:"row",spacing:1.5,pb:1,alignItems:"center",children:[(0,i.jsx)(h.i,{identity:e,width:32,height:32}),(0,i.jsxs)(l.Z,{flexGrow:1,children:[(0,i.jsx)(m.Z,{variant:"body2",fontWeight:600,children:(0,i.jsx)(DislayName,{identity:e})}),(0,i.jsxs)(m.Z,{variant:"caption",fontStyle:"italic",fontSize:10,children:["Created : ",null==e?void 0:e.createdAt.toLocaleString()]})]}),0===r&&t.length>1&&(0,i.jsx)("div",{children:(0,i.jsxs)(y.UO,{size:"small",endIcon:o?(0,i.jsx)(p.Z,{}):(0,i.jsx)(f.Z,{}),onClick:handleExpanding,children:["Show ",o?"less":"more"]})})]}),(0,i.jsx)(v.Z,{value:e.did,outerProps:{readOnly:!0},inputProps:{className:"opacity-80",style:{fontSize:12}},disableCopy:n})]})},r))})};var Z=n(15707),b=n(50480),F=n(33948),C=n(15133),E=n(52653),j=n(49605),S=n(4193),T=n(96241),components_MnemonicBox=e=>{let{mnemonic:t}=e,[n,o]=(0,r.useState)(!1),s=(0,T.I)("light");return(0,i.jsx)(F.Z,{theme:s,children:(0,i.jsx)(C.Z,{variant:"outlined",sx:{borderRadius:2},children:(0,i.jsxs)(c.Z,{className:"p-4 pb-2",children:[(0,i.jsxs)(l.Z,{spacing:1,children:[(0,i.jsxs)(l.Z,{direction:"row",alignItems:"center",children:[(0,i.jsx)(m.Z,{variant:"subtitle1",children:"MNEMONICS"}),(0,i.jsxs)("div",{className:"inline-flex gap-1 ml-auto",children:[(0,i.jsx)(E.Z,{size:"small","aria-label":"toggle key visibility",onClick:()=>o(e=>!e),color:"primary",children:n?(0,i.jsx)(S.Z,{sx:{fontSize:18}}):(0,i.jsx)(j.Z,{sx:{fontSize:18}})}),(0,i.jsx)(y.qi,{text:t,iconWidth:18})]})]}),(0,i.jsx)("div",{className:"rounded-md bg-[#8888884a] p-2",children:(0,i.jsx)(m.Z,{variant:"body2",color:"text.primary",textAlign:"center",fontFamily:!n&&"Redacted Script",children:t})})]}),(0,i.jsx)(m.Z,{variant:"caption",color:"error",children:"Reminder: Please store the mnemonics in a secure place"})]})})})},page=()=>{let{mounted:e}=(0,u.s)(),[t]=(0,a.V)(d.jU),[n,c]=(0,r.useState)({}),[m,h]=(0,r.useState)({}),[f]=(0,a.V)(null==t?void 0:t.get("identity").regularIdentities$),[p,g]=(0,r.useState)(null),[x,v]=(0,r.useState)(!1);(0,r.useEffect)(()=>{if(t&&!x){let fetchIdentityRoots=async()=>{let e=await t.get("identity").fetchIdentityRoots();g(e||null)};fetchIdentityRoots(),v(!0)}},[t,x]);let handleExportMnemonic=async e=>{c(t=>({...t,[e.id]:!0}));let n=e.id,i=await t.get("identity").exportMnemonic(n);h(t=>({...t,[e.id]:i})),c(t=>({...t,[e.id]:!1}))};if(!e)return null;let getRegularIdentitiesById=(e,t)=>{let n=e.filter(e=>e.identityRootId===t);return n},groupIdentityName=e=>{let t="";for(let n of e.Identity)if("REGULAR"===n.type){t=null!==n.creatingAppIdentity?"Claimed Identity":"Main Identity group";break}return t||""};return(0,i.jsxs)("div",{children:[(0,i.jsx)(Z.Z,{title:"Export Mnemonics",description:"Easily organize and export your identities by grouping them as needed. To ensure their safety, it's essential to securely store the mnemonics in a designated and protected location.",showBg:!0}),(0,i.jsx)(s.ZP,{container:!0,spacing:3,children:null==p?void 0:p.map((e,t)=>{let r=getRegularIdentitiesById(f,e.id),a=groupIdentityName(e);return(0,i.jsx)(s.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(b.Z,{className:"h-full",icon:(0,i.jsx)(o.JO,{icon:"ic:round-credit-card"}),title:a,statusTitle:"EXPORT CREDENTIALS NOT SUPPORTED YET. COMING SOON",isSet:!1,actionTitle:"EXPORT MNEMONICS",disabledAction:!!m[e.id],actionInProgress:n[e.id]||!1,handleAction:()=>{handleExportMnemonic(e)},children:(0,i.jsxs)(l.Z,{spacing:2,sx:{mt:1},children:[!!m[e.id]&&(0,i.jsx)(components_MnemonicBox,{mnemonic:m[e.id]}),(0,i.jsx)(l.Z,{spacing:2,children:(0,i.jsx)(IdentityRootDids,{identities:r,disableCopyDID:!!m[e.id]})})]})})},t)})})]})}},79673:function(e,t,n){"use strict";var i=n(57437);n(2265);var r=n(35843),o=n(90923),s=n(84081),l=n(81679),a=n(23785);let u=(0,r.ZP)(o.Z)(e=>{let{theme:t}=e;return{input:{color:"white"}}}),d=(0,r.ZP)(s.Z)(e=>{let{theme:t}=e;return{".MuiInputBase-root":{paddingRight:8},".MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error)":{fieldset:{opacity:.4}},".MuiInputBase-root.Mui-focused":{fieldset:{opacity:.6,borderColor:"white"}}}});t.Z=e=>{let{value:t,outerProps:n={},inputProps:r={},disableCopy:o=!1}=e;return(0,i.jsx)(d,{children:(0,i.jsx)(u,{...n,value:t,size:"small",type:"input",inputProps:{...r},endAdornment:!o&&(0,i.jsx)(l.Z,{position:"end",children:(0,i.jsx)(a.qi,{text:t,iconWidth:18})})})})}},69991:function(e,t,n){"use strict";n.d(t,{i:function(){return IdentityAvatar}});var i=n(57437),r=n(7045);let LettersAvatar=e=>{let{text:t,width:n=40,height:r=40}=e;return(0,i.jsx)("div",{className:"bg-indigo-400 p-2 rounded-sm overflow-hidden",style:{width:"".concat(n,"px"),height:"".concat(r,"px"),borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontSize:"16px",lineHeight:1},children:t})};var o=n(40542),s=n(3283),l=n(53386),a=n(16691),u=n.n(a);let IdentityAvatar=e=>{let{identity:t,width:n=60,height:a=60}=e,[d]=(0,o.V)(null==t?void 0:t.profile().name$),[c]=(0,o.V)(null==t?void 0:t.profile().icon$);return(0,i.jsx)(i.Fragment,{children:c?(0,i.jsx)(s.Z,{sx:{width:n,height:a},children:c&&(0,i.jsx)(u(),{src:c,alt:"",width:n,height:a})}):(0,i.jsxs)(i.Fragment,{children:[!d&&(0,i.jsx)(r.Z,{width:n,height:a}),d&&(0,i.jsx)(LettersAvatar,{width:n,height:a,text:(0,l.OX)(d)})]})})}},15707:function(e,t,n){"use strict";var i=n(57437),r=n(35843),o=n(43226);let s=(0,r.ZP)("div")(e=>{let{showBg:t}=e;return{marginBottom:"1.5rem",background:t?"url('/headline-banner.png') no-repeat center center / cover":"none"}});t.Z=e=>{let{title:t,description:n,showBg:r=!1}=e;return(0,i.jsxs)(s,{showBg:r,className:r?"p-4 sm:p-6 rounded-lg":"",children:[(0,i.jsx)(o.Z,{className:"w-full pb-3 sm:pb-4 sm:pb-8",variant:"h3",color:"text.primary",children:t}),(0,i.jsx)(o.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:n})]})}},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var i=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,i.useState)(null==e?void 0:e.getValue()),[r,o]=(0,i.useState)();return(0,i.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:o});return()=>t.unsubscribe()},[e]),[t]}},96241:function(e,t,n){"use strict";n.d(t,{I:function(){return generateTheme}});var i=n(30606),r=n(89975);let o={0:"#FFFFFF",100:"#F9FAFB",200:"#F4F6F8",300:"#DFE3E8",400:"#C4CDD5",500:"#919EAB",600:"#84888d",700:"#454F5B",800:"#202020",900:"#121212",5008:(0,r.Fq)("#919EAB",.08),50012:(0,r.Fq)("#919EAB",.12),50016:(0,r.Fq)("#919EAB",.16),50024:(0,r.Fq)("#919EAB",.24),50032:(0,r.Fq)("#919EAB",.32),50048:(0,r.Fq)("#919EAB",.48),50056:(0,r.Fq)("#919EAB",.56),50080:(0,r.Fq)("#919EAB",.8)},s={lighter:"#E9FCD4",light:"#AAF27F",main:"#54D62C",dark:"#229A16",darker:"#08660D",contrastText:o[800]},l={lighter:"#FFF7CD",light:"#FFE16A",main:"#FFC107",dark:"#B78103",darker:"#7A4F01",contrastText:o[800]},a={common:{black:"#000",white:"#fff"},info:{lighter:"#D0F2FF",light:"#74CAFF",main:"#1890FF",dark:"#0C53B7",darker:"#04297A",contrastText:"#fff"},success:{...s},warning:{...l},error:{lighter:"#FFE7D9",light:"#FFA48D",main:"#FF4842",dark:"#B72136",darker:"#7A0C2E",contrastText:"#fff"},action:{hover:o[5008],selected:o[50016],disabled:o[50080],disabledBackground:o[50024],focus:o[50024],hoverOpacity:.08,disabledOpacity:.48}},u={light:{...a,primary:{light:"#DDD",main:"#121212",dark:"#777",contrastText:"#fff"},text:{primary:o[800],secondary:o[600],disabled:o[500]},background:{paper:"#fff",default:"#fff"},action:{active:o[600],...a.action}},dark:{...a,primary:{main:"#FFF",dark:"#DDD",contrastText:"#000"},text:{primary:"#fff",secondary:o[500],disabled:o[600]},background:{paper:o[800],default:o[900]},action:{active:o[500],...a.action}}};function pxToRem(e){return"".concat(e/16,"rem")}function responsiveFontSizes(e){let{sm:t,md:n,lg:i}=e;return{"@media (min-width:640px)":{fontSize:pxToRem(t)},"@media (min-width:768px)":{fontSize:pxToRem(n)},"@media (min-width:1024px)":{fontSize:pxToRem(i)}}}let generateTheme=e=>(0,i.Z)({breakpoints:{values:{xs:0,sm:640,md:768,lg:1024,xl:1280}},components:{MuiButton:{styleOverrides:{root:{textTransform:"inherit"}}},MuiBackdrop:{styleOverrides:{root:{backgroundColor:"dark"===e?"rgba(32, 32, 32, 0.5)":"rgba(224, 224, 224, 0.5)",backdropFilter:"blur(7px) saturate(0.2)","&.MuiBackdrop-invisible":{backgroundColor:"transparent",backdropFilter:"blur(7px) saturate(0.2)"}}}},MuiAvatar:{styleOverrides:{root:{color:"inherit"},fallback:{width:"100%",height:"100%"}}},MuiAccordion:{styleOverrides:{root:{backgroundImage:"unset"}}}},typography:{h1:{fontWeight:700,lineHeight:1.25,fontSize:pxToRem(40),...responsiveFontSizes({sm:52,md:58,lg:64})},h2:{fontWeight:700,lineHeight:64/48,fontSize:pxToRem(32),...responsiveFontSizes({sm:40,md:44,lg:48})},h3:{fontWeight:700,lineHeight:1.5,fontSize:pxToRem(26),...responsiveFontSizes({sm:26,md:30,lg:36})},h4:{fontWeight:600,lineHeight:1.4,fontSize:pxToRem(22),...responsiveFontSizes({sm:23,md:26,lg:26})},h5:{fontWeight:600,lineHeight:1.4,fontSize:pxToRem(18),...responsiveFontSizes({sm:19,md:20,lg:20})},h6:{fontWeight:600,lineHeight:24/18,fontSize:pxToRem(16),...responsiveFontSizes({sm:18,md:18,lg:18})},subtitle1:{fontWeight:600,lineHeight:1.4,fontSize:pxToRem(16)},subtitle2:{fontWeight:600,lineHeight:18/14,fontSize:pxToRem(14)},body1:{fontSize:pxToRem(14),...responsiveFontSizes({sm:16,md:16,lg:16})},body2:{fontSize:pxToRem(13),...responsiveFontSizes({sm:14,md:14,lg:14})},caption:{fontSize:pxToRem(11),...responsiveFontSizes({sm:12,md:12,lg:12})}},palette:{mode:e,...u[e]}})},62167:function(e,t,n){"use strict";n.d(t,{M:function(){return AnimatePresence}});var i=n(2265),r=n(538);function useIsMounted(){let e=(0,i.useRef)(!1);return(0,r.L)(()=>(e.current=!0,()=>{e.current=!1}),[]),e}var o=n(72363),s=n(38243),l=n(10961);let PopChildMeasure=class PopChildMeasure extends i.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}};function PopChild({children:e,isPresent:t}){let n=(0,i.useId)(),r=(0,i.useRef)(null),o=(0,i.useRef)({width:0,height:0,top:0,left:0});return(0,i.useInsertionEffect)(()=>{let{width:e,height:i,top:s,left:l}=o.current;if(t||!r.current||!e||!i)return;r.current.dataset.motionPopId=n;let a=document.createElement("style");return document.head.appendChild(a),a.sheet&&a.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${i}px !important;
            top: ${s}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(a)}},[t]),i.createElement(PopChildMeasure,{isPresent:t,childRef:r,sizeRef:o},i.cloneElement(e,{ref:r}))}let PresenceChild=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:o,presenceAffectsLayout:a,mode:u})=>{let d=(0,l.h)(newChildrenMap),c=(0,i.useId)(),m=(0,i.useMemo)(()=>({id:c,initial:t,isPresent:n,custom:o,onExitComplete:e=>{for(let t of(d.set(e,!0),d.values()))if(!t)return;r&&r()},register:e=>(d.set(e,!1),()=>d.delete(e))}),a?void 0:[n]);return(0,i.useMemo)(()=>{d.forEach((e,t)=>d.set(t,!1))},[n]),i.useEffect(()=>{n||d.size||!r||r()},[n]),"popLayout"===u&&(e=i.createElement(PopChild,{isPresent:n},e)),i.createElement(s.O.Provider,{value:m},e)};function newChildrenMap(){return new Map}var a=n(781),u=n(19430);let getChildKey=e=>e.key||"",AnimatePresence=({children:e,custom:t,initial:n=!0,onExitComplete:s,exitBeforeEnter:l,presenceAffectsLayout:d=!0,mode:c="sync"})=>{var m;(0,u.k)(!l,"Replace exitBeforeEnter with mode='wait'");let h=(0,i.useContext)(a.p).forceRender||function(){let e=useIsMounted(),[t,n]=(0,i.useState)(0),r=(0,i.useCallback)(()=>{e.current&&n(t+1)},[t]),s=(0,i.useCallback)(()=>o.Wi.postRender(r),[r]);return[s,t]}()[0],f=useIsMounted(),p=function(e){let t=[];return i.Children.forEach(e,e=>{(0,i.isValidElement)(e)&&t.push(e)}),t}(e),g=p,x=(0,i.useRef)(new Map).current,v=(0,i.useRef)(g),y=(0,i.useRef)(new Map).current,Z=(0,i.useRef)(!0);if((0,r.L)(()=>{Z.current=!1,function(e,t){e.forEach(e=>{let n=getChildKey(e);t.set(n,e)})}(p,y),v.current=g}),m=()=>{Z.current=!0,y.clear(),x.clear()},(0,i.useEffect)(()=>()=>m(),[]),Z.current)return i.createElement(i.Fragment,null,g.map(e=>i.createElement(PresenceChild,{key:getChildKey(e),isPresent:!0,initial:!!n&&void 0,presenceAffectsLayout:d,mode:c},e)));g=[...g];let b=v.current.map(getChildKey),F=p.map(getChildKey),C=b.length;for(let e=0;e<C;e++){let t=b[e];-1!==F.indexOf(t)||x.has(t)||x.set(t,void 0)}return"wait"===c&&x.size&&(g=[]),x.forEach((e,n)=>{if(-1!==F.indexOf(n))return;let r=y.get(n);if(!r)return;let o=b.indexOf(n),l=e;l||(l=i.createElement(PresenceChild,{key:getChildKey(r),isPresent:!1,onExitComplete:()=>{y.delete(n),x.delete(n);let e=v.current.findIndex(e=>e.key===n);if(v.current.splice(e,1),!x.size){if(v.current=p,!1===f.current)return;h(),s&&s()}},custom:t,presenceAffectsLayout:d,mode:c},r),x.set(n,l)),g.splice(o,0,l)}),g=g.map(e=>{let t=e.key;return x.has(t)?e:i.createElement(PresenceChild,{key:getChildKey(e),isPresent:!0,presenceAffectsLayout:d,mode:c},e)}),i.createElement(i.Fragment,null,x.size?g:g.map(e=>(0,i.cloneElement)(e)))}}},function(e){e.O(0,[6990,9787,9443,8218,3988,3861,6506,8644,9490,9830,1711,1510,6953,378,5951,8599,3474,8874,6691,2602,4184,7056,9267,567,2971,7864,1744],function(){return e(e.s=49990)}),_N_E=e.O()}]);