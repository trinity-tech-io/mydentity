(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3922],{60289:function(e,t,n){"use strict";var r=n(26314);t.Z=void 0;var i=r(n(80984)),u=n(57437),o=(0,i.default)((0,u.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"}),"Error");t.Z=o},14819:function(e,t,n){"use strict";var r=n(26314);t.Z=void 0;var i=r(n(80984)),u=n(57437),o=(0,i.default)((0,u.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}),"Info");t.Z=o},80984:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=n(43135)},80494:function(e,t,n){"use strict";var r=n(78078);t.Z=r.Z},43135:function(e,t,n){"use strict";n.r(t),n.d(t,{capitalize:function(){return i.Z},createChainedFunction:function(){return u},createSvgIcon:function(){return o.Z},debounce:function(){return s.Z},deprecatedPropType:function(){return utils_deprecatedPropType},isMuiElement:function(){return c.Z},ownerDocument:function(){return a.Z},ownerWindow:function(){return l.Z},requirePropFactory:function(){return utils_requirePropFactory},setRef:function(){return d},unstable_ClassNameGenerator:function(){return Z},unstable_useEnhancedEffect:function(){return f.Z},unstable_useId:function(){return p.Z},unsupportedProp:function(){return utils_unsupportedProp},useControlled:function(){return m.Z},useEventCallback:function(){return h.Z},useForkRef:function(){return x.Z},useIsFocusVisible:function(){return v.Z}});var r=n(25097),i=n(28702),u=n(62940).Z,o=n(59782),s=n(80494),utils_deprecatedPropType=function(e,t){return()=>null},c=n(10673),a=n(53931),l=n(26649);n(13428);var utils_requirePropFactory=function(e,t){return()=>null},d=n(13840).Z,f=n(88519),p=n(62916),utils_unsupportedProp=function(e,t,n,r,i){return null},m=n(73292),h=n(96),x=n(37663),v=n(53308);let Z={configure:e=>{r.Z.configure(e)}}},10673:function(e,t,n){"use strict";n.d(t,{Z:function(){return utils_isMuiElement}});var r=n(2265),utils_isMuiElement=function(e,t){var n,i;return r.isValidElement(e)&&-1!==t.indexOf(null!=(n=e.type.muiName)?n:null==(i=e.type)||null==(i=i._payload)||null==(i=i.value)?void 0:i.muiName)}},53931:function(e,t,n){"use strict";var r=n(96278);t.Z=r.Z},26649:function(e,t,n){"use strict";var r=n(88221);t.Z=r.Z},73292:function(e,t,n){"use strict";var r=n(34625);t.Z=r.Z},88519:function(e,t,n){"use strict";var r=n(1091);t.Z=r.Z},62940:function(e,t,n){"use strict";function createChainedFunction(...e){return e.reduce((e,t)=>null==t?e:function(...n){e.apply(this,n),t.apply(this,n)},()=>{})}n.d(t,{Z:function(){return createChainedFunction}})},78078:function(e,t,n){"use strict";function debounce(e,t=166){let n;function debounced(...r){clearTimeout(n),n=setTimeout(()=>{e.apply(this,r)},t)}return debounced.clear=()=>{clearTimeout(n)},debounced}n.d(t,{Z:function(){return debounce}})},96278:function(e,t,n){"use strict";function ownerDocument(e){return e&&e.ownerDocument||document}n.d(t,{Z:function(){return ownerDocument}})},88221:function(e,t,n){"use strict";n.d(t,{Z:function(){return ownerWindow}});var r=n(96278);function ownerWindow(e){let t=(0,r.Z)(e);return t.defaultView||window}},34625:function(e,t,n){"use strict";n.d(t,{Z:function(){return useControlled}});var r=n(2265);function useControlled({controlled:e,default:t,name:n,state:i="value"}){let{current:u}=r.useRef(void 0!==e),[o,s]=r.useState(t),c=u?e:o,a=r.useCallback(e=>{u||s(e)},[]);return[c,a]}},2236:function(e,t,n){"use strict";var r,i=n(90952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}t.Z=function(e){return i.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 16"},e),r||(r=i.createElement("path",{fill:"currentColor",d:"M2 16c-.55 0-1.021-.196-1.413-.588A1.922 1.922 0 0 1 0 14V2C0 1.45.196.979.588.587A1.922 1.922 0 0 1 2 0h16c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v12c0 .55-.196 1.021-.588 1.413A1.922 1.922 0 0 1 18 16H2Zm0-8h16V4H2v4Z"})))}},9950:function(e,t,n){Promise.resolve().then(n.bind(n,22217))},5796:function(e,t,n){"use strict";n.d(t,{S:function(){return SecurityStatus},X:function(){return i}});var r,i,u=n(57437),o=n(60289),s=n(14819),c=n(39830);(r=i||(i={}))[r.Unknown=0]="Unknown",r[r.Good=1]="Good",r[r.Average=2]="Average",r[r.Bad=3]="Bad";let a={0:"#3A3A3A",1:"#34A853",2:"#ED6C02",3:"#EA4335"},l={0:(0,u.jsx)(c.JO,{icon:"fluent-mdl2:unknown-solid",fontSize:24}),1:(0,u.jsx)(c.JO,{icon:"carbon:checkmark-filled",fontSize:24}),2:(0,u.jsx)(s.Z,{}),3:(0,u.jsx)(o.Z,{})},SecurityStatus=e=>{let{state:t,advice:n}=e;return(0,u.jsxs)("div",{className:"flex rounded-lg px-2 py-2 sm:py-4 flex gap-2",style:{background:a[t]},children:[(0,u.jsx)("span",{className:"text-white",children:l[t]}),(0,u.jsx)("span",{className:"text-white text-[10.5px] sm:text-[12px] leading-[1.4] font-semibold",children:n})]})}},22217:function(e,t,n){"use strict";n.r(t);var r=n(57437),i=n(2265),u=n(24033),o=n(43226),s=n(13457),c=n(96507),a=n(2236),l=n(66267),d=n(9254),f=n(15707),p=n(40542),m=n(97716),h=n(57958),x=n(63429),v=n(14776),Z=n(99267),b=n(5796),j=n(98006),y=n(29166);t.default=()=>{let{mounted:e}=(0,m.s)(),t=(0,u.useRouter)(),[n]=(0,p.V)(v.jU),[g]=(0,p.V)(h.Bx),[w]=(0,p.V)(null==g?void 0:g.profile().name$),[N]=(0,p.V)(null==g?void 0:g.lastUsedAt$),[_,k]=(0,i.useState)(!1),deleteIdentity=async()=>{let e=g.did;k(!0),x.D.setActiveIdentity(null),t.replace("/dashboard"),await n.get("identity").deleteIdentity(e)};return(0,r.jsxs)("div",{children:[(0,r.jsx)(f.Z,{title:"Delete Identity",description:"You have the option to permanently delete your identity, along with all the associated credentials. It's crucial to note that once deleted, this identity cannot be retrieved or restored.",showBg:!0}),(0,r.jsxs)("div",{className:"inline-flex items-center",children:[(0,r.jsx)(l.C,{children:(0,r.jsx)("div",{className:"w-4 h-4 flex justify-center",children:(0,r.jsx)(a.Z,{})})}),(0,r.jsx)(o.Z,{variant:"subtitle1",className:"pl-2",children:"Active Identity"})]}),(0,r.jsx)("div",{className:"max-w-md w-full m-auto pt-4",children:g?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(Z.Gt,{className:"w-full h-auto bg-neutral-950",waveIconVisible:!1,topRightSection:(0,r.jsxs)(s.Z,{alignItems:"end",spacing:.5,children:[(0,r.jsx)(c.Z,{className:"rounded-md bg-[#9291A5] text-[7pt] px-3 py-0.5 inline-block",children:"ACTIVE IDENTITY"}),N&&(0,r.jsxs)(o.Z,{variant:"caption",fontStyle:"italic",children:["Last used : ",N.toLocaleString()]})]}),footer:(0,r.jsx)(o.Z,{variant:"caption",children:g.did}),children:(0,r.jsxs)(s.Z,{spacing:2,sx:{mb:{xs:"3%",sm:"5%"},mt:-12},children:[(0,r.jsx)(b.S,{state:b.X.Bad,advice:"You are about to delete the active identity and all the associated information (credentials)."}),(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("label",{htmlFor:"holder-name",className:"text-white text-[10px]",children:"IDENTITY NAME"}),(0,r.jsx)(j.Z,{variant:"h4",fontWeight:600,children:w||"Unnamed application"})]})]})}),(0,r.jsx)("div",{className:"mt-4 px-4",children:(0,r.jsx)(d.c,{onClick:deleteIdentity,busy:_,mode:"danger",className:"mt-4",children:"Delete this identity"})})]}):(0,r.jsx)(y.Wo,{})})]})}},9254:function(e,t,n){"use strict";n.d(t,{c:function(){return MainButton}});var r=n(57437),i=n(6882),u=n(49050),o=n(57042);let MainButton=e=>{let{leftIcon:t,size:n="medium",mode:s="default",onClick:c,children:a,busy:l=!1,disabled:d=!1,className:f}=e,p=(0,r.jsx)(i.Z,{size:16});return(0,r.jsx)("div",{className:(0,o.Z)("flex",f),children:(0,r.jsx)(u.Z,{className:"flex-1",startIcon:l?p:t,disabled:l||d,size:n,color:"default"===s?"primary":"error",variant:"contained",onClick:c,children:a})})}},15707:function(e,t,n){"use strict";var r=n(57437),i=n(35843),u=n(43226);let o=(0,i.ZP)("div")(e=>{let{showBg:t}=e;return{marginBottom:"1.5rem",background:t?"url('/headline-banner.png') no-repeat center center / cover":"none"}});t.Z=e=>{let{title:t,description:n,showBg:i=!1}=e;return(0,r.jsxs)(o,{showBg:i,className:i?"p-4 sm:p-6 rounded-lg":"",children:[(0,r.jsx)(u.Z,{className:"w-full pb-3 sm:pb-4 sm:pb-8",variant:"h3",color:"text.primary",children:t}),(0,r.jsx)(u.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:n})]})}},98006:function(e,t,n){"use strict";var r=n(43226),i=n(35843);let u=(0,i.ZP)(r.Z)({backgroundImage:"linear-gradient(180deg, #FFFFFFAE, #FFFFFF)",backgroundSize:"100%",backgroundRepeat:"repeat",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",MozBackgroundClip:"text",MozTextFillColor:"transparent",display:"inline"});t.Z=u},40542:function(e,t,n){"use strict";n.d(t,{V:function(){return useBehaviorSubject}});var r=n(2265);let useBehaviorSubject=e=>{let[t,n]=(0,r.useState)(null==e?void 0:e.getValue()),[i,u]=(0,r.useState)();return(0,r.useEffect)(()=>{if(!e){n(null);return}let t=e.subscribe({next:e=>{n(e)},error:u});return()=>t.unsubscribe()},[e]),[t]}},24033:function(e,t,n){e.exports=n(20290)},26314:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},function(e){e.O(0,[6990,9787,9443,8218,3988,3861,6506,8644,9490,9830,1711,1510,6953,378,5951,3474,7056,9267,567,2971,7864,1744],function(){return e(e.s=9950)}),_N_E=e.O()}]);