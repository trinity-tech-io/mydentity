(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5916,9267,567],{60289:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),a=n(57437),s=(0,r.default)((0,a.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"}),"Error");t.Z=s},14819:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),a=n(57437),s=(0,r.default)((0,a.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}),"Info");t.Z=s},2899:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),a=n(57437),s=(0,r.default)((0,a.jsx)("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext");t.Z=s},49605:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),a=n(57437),s=(0,r.default)((0,a.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.Z=s},4193:function(e,t,n){"use strict";var i=n(26314);t.Z=void 0;var r=i(n(80984)),a=n(57437),s=(0,r.default)((0,a.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.Z=s},80984:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i.createSvgIcon}});var i=n(43135)},45550:function(e,t,n){"use strict";n.d(t,{Z:function(){return Z}});var i,r=n(20791),a=n(13428),s=n(2265),l=n(57042),o=n(95600),c=n(54379),d=n(59592),u=n(35843),p=n(28702),h=n(26520),f=n(25702);function getFormHelperTextUtilityClasses(e){return(0,f.Z)("MuiFormHelperText",e)}let m=(0,h.Z)("MuiFormHelperText",["root","error","disabled","sizeSmall","sizeMedium","contained","focused","filled","required"]);var x=n(87927),g=n(57437);let v=["children","className","component","disabled","error","filled","focused","margin","required","variant"],useUtilityClasses=e=>{let{classes:t,contained:n,size:i,disabled:r,error:a,filled:s,focused:l,required:c}=e,d={root:["root",r&&"disabled",a&&"error",i&&`size${(0,p.Z)(i)}`,n&&"contained",l&&"focused",s&&"filled",c&&"required"]};return(0,o.Z)(d,getFormHelperTextUtilityClasses,t)},b=(0,u.ZP)("p",{name:"MuiFormHelperText",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.size&&t[`size${(0,p.Z)(n.size)}`],n.contained&&t.contained,n.filled&&t.filled]}})(({theme:e,ownerState:t})=>(0,a.Z)({color:(e.vars||e).palette.text.secondary},e.typography.caption,{textAlign:"left",marginTop:3,marginRight:0,marginBottom:0,marginLeft:0,[`&.${m.disabled}`]:{color:(e.vars||e).palette.text.disabled},[`&.${m.error}`]:{color:(e.vars||e).palette.error.main}},"small"===t.size&&{marginTop:4},t.contained&&{marginLeft:14,marginRight:14})),j=s.forwardRef(function(e,t){let n=(0,x.Z)({props:e,name:"MuiFormHelperText"}),{children:s,className:o,component:u="p"}=n,p=(0,r.Z)(n,v),h=(0,d.Z)(),f=(0,c.Z)({props:n,muiFormControl:h,states:["variant","size","disabled","error","filled","focused","required"]}),m=(0,a.Z)({},n,{component:u,contained:"filled"===f.variant||"outlined"===f.variant,variant:f.variant,size:f.size,disabled:f.disabled,error:f.error,filled:f.filled,focused:f.focused,required:f.required}),j=useUtilityClasses(m);return(0,g.jsx)(b,(0,a.Z)({as:u,ownerState:m,className:(0,l.Z)(j.root,o),ref:t},p,{children:" "===s?i||(i=(0,g.jsx)("span",{className:"notranslate",children:"​"})):s}))});var Z=j},22135:function(e,t,n){"use strict";n.d(t,{Z:function(){return useMediaQuery}});var i,r=n(2265),a=n(44809),s=n(51529),l=n(88519);let o=(i||(i=n.t(r,2))).useSyncExternalStore;function useMediaQuery(e,t={}){let n=(0,a.Z)(),i="undefined"!=typeof window&&void 0!==window.matchMedia,{defaultMatches:c=!1,matchMedia:d=i?window.matchMedia:null,ssrMatchMedia:u=null,noSsr:p=!1}=(0,s.Z)({name:"MuiUseMediaQuery",props:t,theme:n}),h="function"==typeof e?e(n):e;h=h.replace(/^@media( ?)/m,"");let f=(void 0!==o?function(e,t,n,i,a){let s=r.useCallback(()=>t,[t]),l=r.useMemo(()=>{if(a&&n)return()=>n(e).matches;if(null!==i){let{matches:t}=i(e);return()=>t}return s},[s,e,i,a,n]),[c,d]=r.useMemo(()=>{if(null===n)return[s,()=>()=>{}];let t=n(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]},[s,n,e]),u=o(d,c,l);return u}:function(e,t,n,i,a){let[s,o]=r.useState(()=>a&&n?n(e).matches:i?i(e).matches:t);return(0,l.Z)(()=>{let t=!0;if(!n)return;let i=n(e),updateMatch=()=>{t&&o(i.matches)};return updateMatch(),i.addListener(updateMatch),()=>{t=!1,i.removeListener(updateMatch)}},[e,n]),s})(h,c,d,u,p);return f}},43135:function(e,t,n){"use strict";n.r(t),n.d(t,{capitalize:function(){return r.Z},createChainedFunction:function(){return a},createSvgIcon:function(){return s.Z},debounce:function(){return l.Z},deprecatedPropType:function(){return utils_deprecatedPropType},isMuiElement:function(){return o.Z},ownerDocument:function(){return c.Z},ownerWindow:function(){return d.Z},requirePropFactory:function(){return utils_requirePropFactory},setRef:function(){return u},unstable_ClassNameGenerator:function(){return v},unstable_useEnhancedEffect:function(){return p.Z},unstable_useId:function(){return h.Z},unsupportedProp:function(){return utils_unsupportedProp},useControlled:function(){return f.Z},useEventCallback:function(){return m.Z},useForkRef:function(){return x.Z},useIsFocusVisible:function(){return g.Z}});var i=n(25097),r=n(28702),a=n(62940).Z,s=n(59782),l=n(80494),utils_deprecatedPropType=function(e,t){return()=>null},o=n(10673),c=n(53931),d=n(26649);n(13428);var utils_requirePropFactory=function(e,t){return()=>null},u=n(13840).Z,p=n(88519),h=n(62916),utils_unsupportedProp=function(e,t,n,i,r){return null},f=n(73292),m=n(96),x=n(37663),g=n(53308);let v={configure:e=>{i.Z.configure(e)}}},10673:function(e,t,n){"use strict";n.d(t,{Z:function(){return utils_isMuiElement}});var i=n(2265),utils_isMuiElement=function(e,t){var n,r;return i.isValidElement(e)&&-1!==t.indexOf(null!=(n=e.type.muiName)?n:null==(r=e.type)||null==(r=r._payload)||null==(r=r.value)?void 0:r.muiName)}},53931:function(e,t,n){"use strict";var i=n(96278);t.Z=i.Z},16290:function(e,t,n){"use strict";var i,r=n(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}t.Z=function(e){return r.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:50,height:38,fill:"none"},e),i||(i=r.createElement("g",{stroke:"#fff",strokeWidth:1.4,opacity:.7},r.createElement("rect",{width:48.144,height:36.348,x:.7,y:.7,fill:"#fff",fillOpacity:.26,rx:6.55}),r.createElement("path",{d:"M.774 11.612h12.632a3.625 3.625 0 0 1 3.625 3.625v5.471m0 16.296v-7.2m0 0v-9.096m0 9.096H.774m16.257-9.096H.774M48.77 11.612H33.288m0 0v9.096m0-9.096V.774m0 36.23v-7.2m0 0v-9.096m0 9.096H48.77m-15.482-9.096H48.77"}))))}},13240:function(e,t,n){Promise.resolve().then(n.bind(n,55477))},50480:function(e,t,n){"use strict";n.d(t,{m:function(){return h}});var i=n(57437),r=n(35843),a=n(15133),s=n(96507),l=n(43226),o=n(23785),c=n(66267),d=n(43753),u=n(29166),p=n(97716);let h=(0,r.ZP)(a.Z)(e=>{let{theme:t}=e;return{border:"1px solid #FFFFFF55",borderRadius:"0.5rem",position:"relative"}});t.Z=e=>{let{title:t,icon:n,children:r,className:a="",isSet:f=null,statusTitle:m,actionTitle:x,handleAction:g=()=>{},actionInProgress:v=!1,disabledAction:b=!1,disabledSkel:j=!1,loaded:Z=null}=e,{mounted:y}=(0,p.s)(),w=null!==Z?Z:y;return(0,i.jsx)(h,{className:a,elevation:0,children:(0,i.jsxs)(s.Z,{className:"relative z-10 flex flex-col h-full",sx:{px:{xs:1.5,sm:3},pt:{xs:1,sm:1.5},pb:1.5},children:[(0,i.jsxs)(s.Z,{className:"pb-4 pt-2 flex items-center",children:[(0,i.jsx)(c.C,{children:n}),(0,i.jsx)(l.Z,{className:"flex-1",variant:"h6",fontWeight:600,sx:{ml:1},children:t}),y&&null!==f&&(0,i.jsx)(d.Z,{isPassed:f,title:m,size:d.V.SMALL})]}),j?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"flex-1 pb-[5%]",children:r}),(0,i.jsx)(o.Kz,{onClick:g,loading:!w||v,disabled:b,children:w?x:"LOADING ..."})]}):(0,i.jsx)(i.Fragment,{children:w?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"flex-1 pb-[5%]",children:r}),(0,i.jsx)(o.Kz,{onClick:g,loading:v,disabled:b,children:x})]}):(0,i.jsx)(u.g4,{})})]})})}},5796:function(e,t,n){"use strict";n.d(t,{S:function(){return SecurityStatus},X:function(){return r}});var i,r,a=n(57437),s=n(60289),l=n(14819),o=n(39830);(i=r||(r={}))[i.Unknown=0]="Unknown",i[i.Good=1]="Good",i[i.Average=2]="Average",i[i.Bad=3]="Bad";let c={0:"#3A3A3A",1:"#34A853",2:"#ED6C02",3:"#EA4335"},d={0:(0,a.jsx)(o.JO,{icon:"fluent-mdl2:unknown-solid",fontSize:24}),1:(0,a.jsx)(o.JO,{icon:"carbon:checkmark-filled",fontSize:24}),2:(0,a.jsx)(l.Z,{}),3:(0,a.jsx)(s.Z,{})},SecurityStatus=e=>{let{state:t,advice:n}=e;return(0,a.jsxs)("div",{className:"flex rounded-lg px-2 py-2 sm:py-4 flex gap-2",style:{background:c[t]},children:[(0,a.jsx)("span",{className:"text-white",children:d[t]}),(0,a.jsx)("span",{className:"text-white text-[10.5px] sm:text-[12px] leading-[1.4] font-semibold",children:n})]})}},79673:function(e,t,n){"use strict";var i=n(57437);n(2265);var r=n(35843),a=n(90923),s=n(84081),l=n(81679),o=n(23785);let c=(0,r.ZP)(a.Z)(e=>{let{theme:t}=e;return{input:{color:"white"}}}),d=(0,r.ZP)(s.Z)(e=>{let{theme:t}=e;return{".MuiInputBase-root":{paddingRight:8},".MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error)":{fieldset:{opacity:.4}},".MuiInputBase-root.Mui-focused":{fieldset:{opacity:.6,borderColor:"white"}}}});t.Z=e=>{let{value:t,outerProps:n={},inputProps:r={},disableCopy:a=!1}=e;return(0,i.jsx)(d,{children:(0,i.jsx)(c,{...n,value:t,size:"small",type:"input",inputProps:{...r},endAdornment:!a&&(0,i.jsx)(l.Z,{position:"end",children:(0,i.jsx)(o.qi,{text:t,iconWidth:18})})})})}},55477:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var i=n(57437),r=n(28874),a=n(2265),s=n(39830),l=n(40542),o=n(97716),c=n(13457),d=n(43226),u=n(19739),p=n(14776),h=n(50480),f=n(5796),m=n(35843),x=n(90923),g=n(52653),v=n(84081),b=n(81679),j=n(49605),Z=n(4193),y=n(57042),w=n(23785);let k=(0,m.ZP)(x.Z)(e=>{let{theme:t}=e;return{input:{color:"white"}}}),N=(0,m.ZP)(g.Z)(e=>{let{theme:t}=e;return{color:"white"}}),_=(0,m.ZP)(v.Z)(e=>{let{theme:t}=e;return{".MuiInputBase-root":{paddingRight:8},".MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error)":{fieldset:{opacity:.4}},".MuiInputBase-root.Mui-focused":{fieldset:{opacity:.6,borderColor:"white"}},".key-input.redacted":{fontFamily:"Redacted Script"}}});var components_KeyTextfield=e=>{let{value:t,outerProps:n={},inputProps:r={}}=e,[s,l]=a.useState(!1);return(0,i.jsx)(_,{children:(0,i.jsx)(k,{...n,value:t,size:"small",type:"input",className:(0,y.Z)("key-input",!s&&"redacted"),inputProps:{...r},endAdornment:(0,i.jsx)(b.Z,{position:"end",children:(0,i.jsxs)("div",{className:"flex gap-1",children:[(0,i.jsx)(w.qi,{text:t,iconWidth:18}),(0,i.jsx)(N,{size:"small","aria-label":"toggle key visibility",onClick:()=>l(e=>!e),onMouseDown:e=>{e.preventDefault()},children:s?(0,i.jsx)(Z.Z,{sx:{fontSize:18}}):(0,i.jsx)(j.Z,{sx:{fontSize:18}})})]})})})})};let AccessKeys=()=>{let[e]=(0,l.V)(p.jU),t=null==e?void 0:e.get("development"),[n]=(0,l.V)(null==t?void 0:t.accessKeys$),r=(0,o.s)(),[m,x]=(0,a.useState)(!1),[g,v]=(0,a.useState)(null),{showSuccessToast:b}=(0,u.p)(),newAccessKey=async()=>{x(!0);let e=await t.createAccessKey();v(e),x(!1),e&&b("Access key successfully created")};return(0,i.jsx)(h.Z,{className:"h-full",icon:(0,i.jsx)(s.JO,{icon:"ic:baseline-key"}),title:"Access Keys",statusTitle:"".concat((null==n?void 0:n.length)>0?"":"NOT ","GENERATED"),isSet:n&&(null==n?void 0:n.length)>0,actionTitle:"GENERATE ACCESS KEYS",actionInProgress:m,handleAction:newAccessKey,disabledSkel:!0,loaded:r&&!!n,children:g?(0,i.jsxs)(c.Z,{spacing:2,children:[(0,i.jsx)(d.Z,{variant:"body2",children:"Please use the access key below in your application"}),(0,i.jsx)(components_KeyTextfield,{value:g.clearKey,outerProps:{readOnly:!0},inputProps:{className:"opacity-80",style:{fontSize:12}}}),(0,i.jsx)(f.S,{state:f.X.Good,advice:"Your access key has been generated. Kindly save it for future use."})]}):(0,i.jsxs)(c.Z,{className:"h-full",spacing:2,children:[(0,i.jsx)(d.Z,{variant:"body2",className:"flex-1",children:"Developers can create access keys for remote interactions with this service, facilitating seamless integration and functionality for their applications."}),(null==n?void 0:n.length)>0&&(0,i.jsxs)(d.Z,{variant:"caption",fontStyle:"italic",children:["Last generated : ",n[n.length-1].createdAt.toLocaleString()]})]})})};var C=n(96283),M=n(49017),A=n(51894),S=n(2899),E=n(71711),I=n(45550),P=n(92e3),T=n(79673);let ApplicationBox=e=>{let{appIdentity:t}=e,[n]=(0,l.V)(null==t?void 0:t.credentials().credentials$),[r,s]=(0,a.useState)(null),o=(0,P.useRouter)();return(0,a.useEffect)(()=>{s(null==t?void 0:t.credentials().getCredentialByType("ApplicationCredential"))},[t,n]),(0,i.jsxs)(c.Z,{spacing:1,children:[(0,i.jsxs)(c.Z,{direction:"row",alignItems:"center",spacing:1.5,children:[(0,i.jsx)(C.J,{credential:r,width:32,height:32}),(0,i.jsxs)(c.Z,{flexGrow:1,children:[(0,i.jsx)(d.Z,{variant:"body2",fontWeight:600,fontSize:15,lineHeight:1.3,children:null==r?void 0:r.getSubject().getProperty("name")}),(0,i.jsx)(d.Z,{variant:"caption",fontStyle:"italic",fontSize:10,lineHeight:1.3,children:null==r?void 0:r.createdAt.toLocaleString()})]}),(0,i.jsx)(w.UO,{size:"small",endIcon:(0,i.jsx)(S.Z,{}),onClick:()=>{o.push("/developers/applications")},children:"Show all"})]}),(0,i.jsx)(T.Z,{value:t.did,outerProps:{readOnly:!0},inputProps:{className:"opacity-80",style:{fontSize:12}}})]})},z=["Creating the application identity","Publishing the application identity on the identity chain"],AppsList=()=>{let[e,t]=(0,a.useState)(""),[n,r]=(0,a.useState)(!1),[c,f]=(0,a.useState)(0),[m,x]=(0,a.useState)(!1),[g]=(0,l.V)(p.jU),v=null==g?void 0:g.get("identity"),[b]=(0,l.V)(null==v?void 0:v.applicationIdentities$),j=(0,a.useRef)(),Z=(0,o.s)(),y=(0,P.useRouter)(),{showSuccessToast:w}=(0,u.p)(),onCreateApp=async t=>{null==t||t.preventDefault(),r(!0);try{let t=await (0,A.H)(async()=>await g.get("identity").createApplicationIdentity(e));t&&(f(1),t.update(e,""),w("The application identity was created"),y.push("/developers/application?did="+t.did)),r(!1)}catch(e){w("Failed to create new application"),r(!1)}};return(0,i.jsxs)(h.Z,{className:"h-full",icon:(0,i.jsx)(s.JO,{icon:"material-symbols:apps"}),title:"Applications",statusTitle:"".concat((null==b?void 0:b.length)>0?"CREATED":"NO APPS AVAILABLE"),isSet:b&&(null==b?void 0:b.length)>0,actionTitle:m?"GENERATE APPLICATION IDENTITY":"CREATE APPLICATION",actionInProgress:n,disabledAction:m&&!e.trim().length,handleAction:m?onCreateApp:()=>{x(!0)},disabledSkel:!0,loaded:Z&&!!b,children:[(0,i.jsx)(d.Z,{variant:"body2",children:"You can create a new application identity called a DID, which will identify your app in various contexts. For instance, when your app issues credentials, users will see your app's logo and icon as the 'issuer'."}),m?(0,i.jsx)("form",{className:"mt-8",onSubmit:onCreateApp,children:(0,i.jsxs)(M.Z,{fullWidth:!0,children:[(0,i.jsx)(d.Z,{variant:"caption",component:"label",htmlFor:"app-name",fontSize:10,fontWeight:600,autoFocus:!0,children:"APPLICATION NAME"}),(0,i.jsx)(E.Z,{id:"app-name",autoFocus:!0,inputProps:{maxLength:30,ref:j},onChange:e=>{t(e.target.value.trim())}}),n&&(0,i.jsxs)(I.Z,{className:"visible",children:[z[c]," ..."]})]})}):(0,i.jsx)(i.Fragment,{children:(null==b?void 0:b.length)>0&&(0,i.jsx)("div",{className:"mt-4",children:(0,i.jsx)(ApplicationBox,{appIdentity:b[b.length-1]})})})]})};var O=n(15707),page=()=>(0,i.jsxs)("div",{className:"col-span-full",children:[(0,i.jsx)(O.Z,{title:"Developer Zone",description:"This section is dedicated to application and service developers. As a Web3 identity developer, you have the capability to configure application DIDs and obtain access keys, enabling remote interaction with this service.",showBg:!0}),(0,i.jsxs)(r.ZP,{container:!0,spacing:3,children:[(0,i.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(AccessKeys,{})}),(0,i.jsx)(r.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(AppsList,{})})]})]})},23785:function(e,t,n){"use strict";n.d(t,{Yd:function(){return b},hO:function(){return s},qi:function(){return button_CopyButton},Kz:function(){return o},UO:function(){return x}});var i=n(35843),r=n(44551);let a=(0,i.ZP)(r.Z)(e=>{let{theme:t}=e;return{background:"#000 !important",borderRadius:4,color:"white","&:disabled":{opacity:"0.7 !important",backgroundColor:"#343434 !important",color:"#fff !important"},"&:hover":{background:"#222 !important"},[t.breakpoints.down("md")]:{fontSize:12,padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var s=a;let l=(0,i.ZP)(r.Z)(e=>{let{theme:t,className:n}=e;return{background:"#323B45 !important",borderRadius:(null==n?void 0:n.includes("rounded"))?8:4,color:"white",textTransform:"uppercase",paddingLeft:12,paddingRight:12,"&:disabled":{opacity:"0.7 !important",backgroundColor:"#555 !important",color:"#fff !important"},"&:hover":{background:"#666e76 !important"},[t.breakpoints.down("md")]:{padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var o=l,c=n(57437);n(2265);var d=n(86781),u=n(39830),p=n(52653),h=n(19739),button_CopyButton=e=>{let{text:t,iconWidth:n="17px"}=e,{showSuccessToast:i}=(0,h.p)();return(0,c.jsx)(d.CopyToClipboard,{text:t,onCopy:()=>{i("Copied to clipboard")},children:(0,c.jsx)(p.Z,{type:"button",sx:{p:"5px"},"aria-label":"link",onClick:e=>{e.preventDefault(),e.stopPropagation()},color:"primary",children:(0,c.jsx)(u.JO,{icon:"material-symbols:content-copy-rounded",width:n})})})},f=n(49050);let m=(0,i.ZP)(f.Z)(e=>{let{theme:t}=e;return{color:"dark"===t.palette.mode?"white":"black"}});var x=m,g=n(45295);let v=(0,i.ZP)(g.Z)(e=>{let{theme:t}=e;return{borderRadius:"4px",overflow:"hidden","&:after":{background:"#fff",content:"''",height:155,left:-75,opacity:.2,position:"absolute",top:-50,width:50,WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",WebkitTransform:"rotate(35deg)",MsTransform:"rotate(35deg)",transform:"rotate(35deg)",zIndex:-10},"&:hover":{boxShadow:"0px 0px 7px #999999","&:after":{left:"120%",WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)"}}}});var b=v},99267:function(e,t,n){"use strict";n.d(t,{CA:function(){return b},SN:function(){return v},Gt:function(){return card_LandingCard},TJ:function(){return card_PortraitCard}});var i,r,a,s,l=n(57437),o=n(96507),c=n(54986),d=n(35843),u=n(57042),p=n(16290),h=n(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var wave_logo=function(e){return h.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",width:32,height:40,fill:"none"},e),i||(i=h.createElement("path",{fill:"url(#wave-logo_svg__a)",fillRule:"evenodd",d:"m2.317 26.858-.007.009-.006.008c-.343.486-1.11.628-1.711.204-.481-.34-.626-1.096-.216-1.694.61-.778 1.054-1.689 1.346-2.579.303-.926.444-1.979.439-3.011-.006-1.033-.158-2.084-.471-3.007-.301-.887-.755-1.792-1.374-2.564-.415-.594-.279-1.352.198-1.697.596-.43 1.366-.296 1.714.186l.006.009.006.008c.771 1.016 1.403 2.145 1.78 3.253.398 1.303.651 2.563.658 3.798.007 1.3-.117 2.53-.594 3.742-.52 1.32-1.023 2.33-1.768 3.335Zm5.571 2.413.015-.021.014-.022a17.795 17.795 0 0 0-.1-18.925c-.376-.596-.207-1.302.427-1.76.426-.308 1.226-.199 1.7.437 1.96 3.11 3.144 6.87 3.165 10.756.021 4.02-1.122 7.658-3.05 10.79-.446.614-1.13.786-1.718.438-.639-.467-.756-1.264-.453-1.693Zm9.998-24.379.016.034.02.031c2.656 4.33 4.132 9.325 4.16 14.732.03 5.404-1.392 10.412-4 14.768-.4.643-1.074.824-1.758.506-.623-.406-.79-1.078-.465-1.758 2.217-3.938 3.596-8.578 3.57-13.502-.026-4.902-1.308-9.535-3.718-13.474-.327-.672-.165-1.342.45-1.752.743-.355 1.466-.095 1.724.415ZM25.75.772l.011.022.013.022c3.219 5.564 5.11 11.924 5.146 18.826.037 6.894-1.782 13.268-4.936 18.862-.4.635-1.072.813-1.753.496-.62-.405-.789-1.074-.467-1.751 3.037-5.185 4.673-11.19 4.639-17.594-.034-6.42-1.878-12.403-4.823-17.536-.369-.75-.109-1.483.406-1.744.756-.383 1.5-.123 1.764.397Z",clipRule:"evenodd"})),r||(r=h.createElement("defs",null,h.createElement("linearGradient",{id:"wave-logo_svg__a",x1:15.408,x2:15.616,y1:.242,y2:39.203,gradientUnits:"userSpaceOnUse"},h.createElement("stop",{stopColor:"#fff",stopOpacity:.73}),h.createElement("stop",{offset:1,stopColor:"#fff"})))))};function circle_extends(){return(circle_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var circle=function(e){return h.createElement("svg",circle_extends({xmlns:"http://www.w3.org/2000/svg",width:349,height:354,fill:"none"},e),a||(a=h.createElement("path",{fill:"url(#circle_svg__a)",fillOpacity:.2,d:"M38.09 18.611C-74.07 67.46-125.398 197.992-76.55 310.152c48.848 112.159 179.382 163.487 291.541 114.639 112.159-48.848 163.488-179.381 114.64-291.54-48.848-112.16-179.382-163.488-291.54-114.64Zm144.437 331.64A140.216 140.216 0 0 1-2.009 277.687a140.212 140.212 0 1 1 184.536 72.564Z"})),s||(s=h.createElement("defs",null,h.createElement("linearGradient",{id:"circle_svg__a",x1:38.09,x2:214.991,y1:18.611,y2:424.791,gradientUnits:"userSpaceOnUse"},h.createElement("stop",{stopColor:"#fff"}),h.createElement("stop",{offset:.421,stopColor:"#fff",stopOpacity:0}),h.createElement("stop",{offset:1,stopColor:"#fff",stopOpacity:0})))))},f=n(23785);let m=(0,d.ZP)(o.Z)(e=>{let{theme:t}=e;return{borderRadius:"6.329% / 10%",boxShadow:"inset 0 0 0 1.5px #FFFFFF4C",overflow:"hidden","&:after":{paddingTop:"63.29%",display:"block",content:"''",background:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",opacity:.15,zIndex:-1,position:"relative"},".body":{position:"absolute",top:0,bottom:0,right:0,left:0},".noise-bg":{background:"url('/noise1.png') repeat center center"},".circle-bottom-box":{left:"37%",top:"62%",transform:"rotate(335deg)"},hr:{borderColor:"rgb(250 250 250 / 0.2)"}}});var card_LandingCard=e=>{let{className:t="",waveIconVisible:n=!0,position:i="relative",dividerVisible:r=!0,topRightSection:a=null,chipClickable:s=!1,handleClickChip:o=e=>{},children:d,footer:h}=e;return(0,l.jsx)(m,{className:(0,u.Z)("inline-block drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]",t,i),children:(0,l.jsxs)("div",{className:"body px-[5%] py-[5%]",children:[(0,l.jsx)("div",{className:"absolute w-4/6 top-[1.5px] left-[1.5px]",children:(0,l.jsx)(circle,{width:"100%",height:"100%",viewBox:"0 0 349 354"})}),(0,l.jsx)("div",{className:"absolute w-full circle-bottom-box",children:(0,l.jsx)(circle,{width:"100%",height:"100%",viewBox:"0 0 349 354"})}),(0,l.jsxs)("div",{className:"flex flex-col h-full",children:[(0,l.jsxs)("div",{className:"flex mb-4 sm:mb-6",children:[(0,l.jsx)("div",{className:"w-[10%]",children:s?(0,l.jsx)(f.Yd,{className:"chip-item",onClick:o,children:(0,l.jsx)(p.Z,{width:"100%",height:"100%",viewBox:"0 0 50 38"})}):(0,l.jsx)("div",{className:"chip-item",children:(0,l.jsx)(p.Z,{width:"100%",height:"100%",viewBox:"0 0 50 38"})})}),(0,l.jsx)("div",{className:"flex-1"}),n?(0,l.jsx)("div",{className:"w-[7%]",children:(0,l.jsx)(wave_logo,{width:"100%",height:"100%",viewBox:"0 0 32 40"})}):a]}),(0,l.jsx)("div",{className:"flex flex-1 items-end",children:d}),r&&(0,l.jsx)(c.Z,{}),(0,l.jsx)("div",{className:"h-[15%] flex items-end",children:h})]})]})})},x=n(15133);let g=(0,d.ZP)(x.Z)(e=>{let{theme:t}=e;return{maxWidth:300,minWidth:180,backgroundColor:"black",borderRadius:"1.5rem","&:after":{paddingTop:"158%",display:"block",content:"''"},".noise-bg":{background:"url('./noise2.png') repeat center center"},".body":{position:"absolute",top:0,bottom:0,right:0,left:0,"&:before, &:after":{opacity:.2,content:"''",position:"absolute",width:"70%",height:"100%",background:"linear-gradient(to bottom, rgba(255, 255, 255, 100%), rgba(255, 255, 255, 25%), transparent)",transform:"rotate(-50deg)",zIndex:-1},"&:before":{top:"-40%",left:0},"&:after":{top:"-20%",left:"-10%",transform:"rotate(-47deg)"},".ellipse":{bottom:"20%",width:"100%",height:"42%",background:"linear-gradient(to bottom, rgba(255, 211, 187, 100%), rgba(255, 211, 187, 40%), transparent)",borderTopLeftRadius:"100%"}}}});var card_PortraitCard=e=>{let{content:t,footer:n,logo:i}=e;return(0,l.jsx)(g,{className:"inline-block w-[45%] xl:w-[40%] md:w-[25%] h-full border-white border-opacity-30 border-2 rounded-3xl relative drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]",children:(0,l.jsxs)("div",{className:"body noise-bg",children:[(0,l.jsx)("div",{className:"absolute opacity-20 ellipse"}),(0,l.jsxs)("div",{className:"px-4 py-6 md:px-6 md:py-8 h-full flex flex-col",children:[(0,l.jsxs)("div",{className:"flex pb-4 md:pb-7",children:[(0,l.jsx)("div",{className:"flex-1 relative",children:i}),(0,l.jsx)("div",{className:"h-6 md:h-9",children:(0,l.jsx)(p.Z,{width:"100%",height:"100%",viewBox:"0 0 50 38"})})]}),(0,l.jsx)("div",{className:"flex flex-1",children:(0,l.jsx)("div",{className:"text-left",children:t})}),(0,l.jsx)("div",{className:"flex justify-center",children:n})]})]})})};let v=(0,d.ZP)(o.Z)(e=>{let{theme:t}=e;return{minWidth:180,perspective:600,borderRadius:"1.5rem","&:after":{paddingTop:"73%",display:"block",content:"''"},".card":{position:"relative",width:"100%",height:"100%",cursor:"pointer",transformStyle:"preserve-3d",transformOrigin:"center right",transition:"transform 0.5s",".card-face":{position:"absolute",width:"100%",height:"100%",backfaceVisibility:"hidden"},".back":{transform:"rotateY(180deg)"}},".card.is-flipped":{transform:"translateX(-100%) rotateY(-180deg)"}}}),b=(0,d.ZP)(x.Z)(e=>{let{theme:t}=e;return{minWidth:180,cursor:"initial",backgroundImage:"url('/dark-leather.png')",backgroundColor:"black",borderRadius:"1.5rem",overflow:"visible","&:after":{paddingTop:"73%",display:"block",content:"''"},".dashed-body":{border:"2px dashed rgb(50 38 38)",[t.breakpoints.down("sm")]:{borderWidth:1}},".compartment, .compartment-top":{backgroundImage:"url('/dark-leather.png')",backgroundColor:"black",width:"100%"},".compartment-top":{height:"18%","--mask1":"radial-gradient(circle at 50% -20%, transparent 25%, black 25.5%)",WebkitMaskImage:"var(--mask1)",maskImage:"var(--mask1)"},"@keyframes fadeOut":{"0%":{visibility:"visible"},"55%":{visibility:"visible"},"56%, 100%":{visibility:"hidden"}},".fade-out":{animation:"fadeOut 1s ".concat(t.transitions.easing.easeInOut," forwards"),MsAnimation:"fadeOut 1s ".concat(t.transitions.easing.easeInOut," forwards"),WebkitAnimation:"fadeOut 1s ".concat(t.transitions.easing.easeInOut," forwards"),MozAnimation:"fadeOut 1s ".concat(t.transitions.easing.easeInOut," forwards")}}})},96283:function(e,t,n){"use strict";n.d(t,{J:function(){return CredentialAvatar}});var i=n(57437),r=n(57042),a=n(16691),s=n.n(a),l=n(22135),o=n(3283),c=n(41101),d=n(40542);let CredentialAvatar=e=>{let{credential:t,width:n=60,height:a=60,className:u}=e,[p]=(0,d.V)(null==t?void 0:t.representativeIcon$),h=(0,c.Z)(),f=(0,l.Z)(h.breakpoints.between("sm","md")),m=(0,l.Z)(h.breakpoints.down("sm")),x=m&&.75||f&&.9||1;return(0,i.jsx)(o.Z,{sx:{width:n*x,height:a*x,padding:"string"==typeof p?0:"".concat(.125*Math.floor(n*x/8),"rem"),backgroundColor:"#7575754d"},className:(0,r.Z)(u),children:"string"==typeof p?(0,i.jsx)(s(),{src:p,alt:"",width:n*x,height:a*x}):p})}},66267:function(e,t,n){"use strict";n.d(t,{C:function(){return l}});var i=n(57437),r=n(3283),a=n(43226),s=n(35843);let l=(0,s.ZP)(r.Z)(e=>{let{theme:t}=e;return{backgroundColor:"#9D3E3E",color:"white",width:36,height:36,padding:8}});t.Z=e=>{let{icon:t,title:n,description:r,className:s=""}=e;return(0,i.jsxs)("div",{className:"text-[#DDD] ".concat(s),children:[(0,i.jsx)("div",{className:"inline-flex pb-1",children:(0,i.jsx)(l,{children:t})}),(0,i.jsx)(a.Z,{variant:"body1",className:"underline underline-offset-2",children:n}),(0,i.jsx)(a.Z,{variant:"body2",children:r})]})}},49017:function(e,t,n){"use strict";var i=n(35843),r=n(84081);let a=(0,i.ZP)(r.Z)(e=>{let{theme:t}=e;return{".MuiInput-root":{marginTop:0,"&:before, &:after":{opacity:.18,borderColor:"dark"==t.palette.mode?"white":t.palette.primary.main}},".MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error)":{"&:before, &:after":{opacity:.18,borderColor:"dark"==t.palette.mode?"white":t.palette.primary.main}},".MuiInput-root.Mui-focused":{"&:before, &:after":{opacity:.3}},".MuiInputLabel-root, .MuiInputLabel-root.Mui-focused:not(.Mui-error)":{color:"white",fontSize:"10px",transform:"unset",WebkitTransform:"unset"},"#holder-name":{fontWeight:600,fontSize:"15pt",textAlign:"center",caretColor:"white",color:"rgb(255 255 255 / 65%)"},".password-input.redacted":{fontFamily:"Redacted Script"},".MuiFormHelperText-root":{marginLeft:0,display:"none"},".MuiFormHelperText-root.Mui-error, .MuiFormHelperText-root.visible":{display:"block"}}});t.Z=a},43753:function(e,t,n){"use strict";n.d(t,{V:function(){return r}});var i,r,a=n(57437),s=n(57042),l=n(96507);(i=r||(r={}))[i.SMALL=7]="SMALL",i[i.MEDIUM=8]="MEDIUM",i[i.LARGE=9]="LARGE",t.Z=e=>{let{isPassed:t,title:n,size:i=8}=e;return(0,a.jsx)(l.Z,{className:(0,s.Z)("rounded-md text-[".concat(i,"pt] px-3 py-0.5 inline-block text-white max-w-[40%] md:max-w-[50%]"),t?"bg-[#34A853]":"bg-[#EA4335]"),children:n})}},15707:function(e,t,n){"use strict";var i=n(57437),r=n(35843),a=n(43226);let s=(0,r.ZP)("div")(e=>{let{showBg:t}=e;return{marginBottom:"1.5rem",background:t?"url('/headline-banner.png') no-repeat center center / cover":"none"}});t.Z=e=>{let{title:t,description:n,showBg:r=!1}=e;return(0,i.jsxs)(s,{showBg:r,className:r?"p-4 sm:p-6 rounded-lg":"",children:[(0,i.jsx)(a.Z,{className:"w-full pb-3 sm:pb-4 sm:pb-8",variant:"h3",color:"text.primary",children:t}),(0,i.jsx)(a.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:n})]})}},23446:function(e,t,n){"use strict";var i=n(57437),r=n(50724),a=n(41101),s=n(75973);t.Z=e=>{let{children:t}=e,n=(0,a.Z)(),l="dark"===n.palette.mode?s.j:{};return(0,i.jsx)(r.y,{...l,children:t})}},29166:function(e,t,n){"use strict";n.d(t,{V$:function(){return loading_skeleton_AccountName},kY:function(){return loading_skeleton_ApplicationItem},GE:function(){return loading_skeleton_ApplicationCard},xG:function(){return loading_skeleton_ApplicationProfile},Wo:function(){return loading_skeleton_Card},RZ:function(){return loading_skeleton_CredentialItem},D4:function(){return loading_skeleton_OneLineText},_H:function(){return loading_skeleton_ProfileInfo},g4:function(){return loading_skeleton_SecurityContent},IT:function(){return loading_skeleton_TableAvatarRow}});var i=n(57437),r=n(41101),a=n(98489),s=n(30666),l=n(50724);n(3436);var o=n(75973),loading_skeleton_TableAvatarRow=e=>{let{colSpan:t=2}=e,n=(0,r.Z)(),c="dark"===n.palette.mode?o.j:{};return(0,i.jsx)(l.y,{...c,children:(0,i.jsxs)(a.Z,{className:"h-[3.5rem]",children:[(0,i.jsx)(s.Z,{children:(0,i.jsx)(l.Z,{width:36,height:36,circle:!0})}),(0,i.jsx)(s.Z,{colSpan:t,children:(0,i.jsx)("h5",{style:{flexGrow:1},children:(0,i.jsx)(l.Z,{count:1})})})]})})},c=n(13457),loading_skeleton_ProfileInfo=()=>{let e=(0,r.Z)(),t="dark"===e.palette.mode?o.j:{};return(0,i.jsx)(l.y,{...t,children:(0,i.jsxs)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:[(0,i.jsx)(l.Z,{width:80,height:80,circle:!0,containerClassName:"leading-none"}),(0,i.jsxs)("h5",{className:"flex-1",children:[(0,i.jsx)(l.Z,{count:1,height:25,style:{lineHeight:3}}),(0,i.jsx)(l.Z,{count:1,height:12,containerClassName:"leading-none"})]})]})})},d=n(23446),loading_skeleton_SecurityContent=()=>(0,i.jsx)(d.Z,{children:(0,i.jsx)(c.Z,{direction:"row",spacing:2,className:"w-full",alignItems:"center",children:(0,i.jsx)("h5",{className:"flex-1",children:(0,i.jsx)(l.Z,{count:3})})})}),u=n(99267),loading_skeleton_Card=()=>(0,i.jsx)(d.Z,{children:(0,i.jsx)(u.Gt,{className:"w-full h-auto bg-neutral-950",waveIconVisible:!1,topRightSection:(0,i.jsx)("h5",{className:"w-[30%]",children:(0,i.jsx)(l.Z,{count:1,height:24})}),footer:(0,i.jsx)("h5",{className:"w-full",children:(0,i.jsx)(l.Z,{count:1})}),children:(0,i.jsxs)("div",{className:"flex flex-col mb-[5%]",children:[(0,i.jsx)("label",{htmlFor:"holder-name",className:"text-white text-[10px]",children:"IDENTITY NAME"}),(0,i.jsx)("h4",{children:(0,i.jsx)(l.Z,{count:1,height:28})})]})})}),loading_skeleton_ApplicationCard=()=>(0,i.jsx)(d.Z,{children:(0,i.jsx)(u.Gt,{className:"w-full h-auto bg-neutral-950",waveIconVisible:!1,footer:(0,i.jsx)("h5",{className:"w-full",children:(0,i.jsx)(l.Z,{count:1})}),children:(0,i.jsx)("div",{className:"w-full mb-[5%]",children:(0,i.jsx)("h4",{children:(0,i.jsx)(l.Z,{count:1,height:28})})})})}),p=n(50480),loading_skeleton_CredentialItem=()=>(0,i.jsx)(d.Z,{children:(0,i.jsx)("div",{className:"relative h-full cursor-pointer",children:(0,i.jsx)(p.m,{className:"h-full",elevation:0,sx:{px:"12px",py:"10px",display:"grid",verticalAlign:"middle"},children:(0,i.jsxs)(c.Z,{direction:"row",spacing:1,alignItems:"center",overflow:"hidden",sx:{height:42},children:[(0,i.jsx)(l.Z,{width:32,height:32,circle:!0,containerClassName:"leading-none"}),(0,i.jsx)("h4",{className:"w-full",children:(0,i.jsx)(l.Z,{containerClassName:"leading-tight block",count:2,height:12})})]})})})}),loading_skeleton_AccountName=()=>(0,i.jsx)(d.Z,{children:(0,i.jsx)("h5",{children:(0,i.jsx)(l.Z,{count:1,height:28})})}),loading_skeleton_ApplicationItem=()=>(0,i.jsx)(d.Z,{children:(0,i.jsx)("div",{className:"relative h-full cursor-pointer",children:(0,i.jsxs)(p.m,{className:"h-full",elevation:0,sx:{px:"12px",py:"10px",display:"grid",verticalAlign:"middle"},children:[(0,i.jsxs)(c.Z,{direction:"row",spacing:1,alignItems:"center",overflow:"hidden",children:[(0,i.jsx)(l.Z,{width:32,height:32,circle:!0,containerClassName:"leading-none"}),(0,i.jsx)("h4",{className:"w-full",children:(0,i.jsx)(l.Z,{containerClassName:"leading-tight block",count:2,height:12})})]}),(0,i.jsx)("h4",{className:"w-full mt-2",children:(0,i.jsx)(l.Z,{containerClassName:"leading-tight block",height:20})})]})})}),loading_skeleton_ApplicationProfile=()=>(0,i.jsx)(d.Z,{children:(0,i.jsxs)(c.Z,{spacing:2,className:"w-full",alignItems:"center",children:[(0,i.jsx)(l.Z,{width:88,height:88,circle:!0,containerClassName:"leading-none"}),(0,i.jsx)("h5",{className:"w-full max-w-sm",children:(0,i.jsx)(l.Z,{count:1,height:25,style:{lineHeight:3}})})]})}),loading_skeleton_OneLineText=e=>{let{height:t=14}=e;return(0,i.jsx)(d.Z,{children:(0,i.jsx)("h5",{children:(0,i.jsx)(l.Z,{count:1,height:t})})})}},75973:function(e,t,n){"use strict";n.d(t,{j:function(){return i}});let i={baseColor:"#333",highlightColor:"#4a4a4a"}},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var i=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,i.useState)(null==e?void 0:e.getValue()),[r,a]=(0,i.useState)();return(0,i.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:a});return()=>t.unsubscribe()},[e]),[t]}},97716:function(e,t,n){"use strict";n.d(t,{s:function(){return useMounted}});var i=n(2265);let useMounted=()=>{let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{t(!0)},[]),{mounted:e}}},19739:function(e,t,n){"use strict";n.d(t,{p:function(){return useToast}});var i=n(36953);function useToast(){let{enqueueSnackbar:e}=(0,i.Ds)();return{showSuccessToast:t=>{e(t,{variant:"success"})},showErrorToast:t=>{e(t,{variant:"error"})}}}},26314:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},function(e){e.O(0,[6990,9787,9443,8218,3988,3861,6506,8644,9490,9830,1711,1510,6953,378,5951,1396,2e3,8599,3474,1662,8874,6691,2602,7056,2971,7864,1744],function(){return e(e.s=13240)}),_N_E=e.O()}]);