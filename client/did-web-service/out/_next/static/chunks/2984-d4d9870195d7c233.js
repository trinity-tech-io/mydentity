(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2984],{13362:function(e,t,n){"use strict";var r=n(26314);t.Z=void 0;var o=r(n(80984)),i=n(57437),u=(0,o.default)((0,i.jsx)("path",{d:"M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"}),"KeyboardArrowRight");t.Z=u},80984:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=n(43135)},13457:function(e,t,n){"use strict";n.d(t,{Z:function(){return C}});var r=n(20791),o=n(13428),i=n(2265),u=n(57042),l=n(15959),c=n(95600),s=n(25702),a=n(39190),d=n(48153),f=n(43381),p=n(84775),m=n(65425),v=n(47508),Z=n(57437);let h=["component","direction","spacing","divider","children","className","useFlexGap"],y=(0,p.Z)(),g=(0,a.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function useThemePropsDefault(e){return(0,d.Z)({props:e,name:"MuiStack",defaultTheme:y})}let getSideFromDirection=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],style=({ownerState:e,theme:t})=>{let n=(0,o.Z)({display:"flex",flexDirection:"column"},(0,m.k9)({theme:t},(0,m.P$)({values:e.direction,breakpoints:t.breakpoints.values}),e=>({flexDirection:e})));if(e.spacing){let r=(0,v.hB)(t),o=Object.keys(t.breakpoints.values).reduce((t,n)=>(("object"==typeof e.spacing&&null!=e.spacing[n]||"object"==typeof e.direction&&null!=e.direction[n])&&(t[n]=!0),t),{}),i=(0,m.P$)({values:e.direction,base:o}),u=(0,m.P$)({values:e.spacing,base:o});"object"==typeof i&&Object.keys(i).forEach((e,t,n)=>{let r=i[e];if(!r){let r=t>0?i[n[t-1]]:"column";i[e]=r}}),n=(0,l.Z)(n,(0,m.k9)({theme:t},u,(t,n)=>e.useFlexGap?{gap:(0,v.NA)(r,t)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${getSideFromDirection(n?i[n]:e.direction)}`]:(0,v.NA)(r,t)}}))}return(0,m.dt)(t.breakpoints,n)};var S=n(35843),b=n(87927);let w=function(e={}){let{createStyledComponent:t=g,useThemeProps:n=useThemePropsDefault,componentName:l="MuiStack"}=e,useUtilityClasses=()=>(0,c.Z)({root:["root"]},e=>(0,s.Z)(l,e),{}),a=t(style),d=i.forwardRef(function(e,t){let l=n(e),c=(0,f.Z)(l),{component:s="div",direction:d="column",spacing:p=0,divider:m,children:v,className:y,useFlexGap:g=!1}=c,S=(0,r.Z)(c,h),b=useUtilityClasses();return(0,Z.jsx)(a,(0,o.Z)({as:s,ownerState:{direction:d,spacing:p,useFlexGap:g},ref:t,className:(0,u.Z)(b.root,y)},S,{children:m?function(e,t){let n=i.Children.toArray(e).filter(Boolean);return n.reduce((e,r,o)=>(e.push(r),o<n.length-1&&e.push(i.cloneElement(t,{key:`separator-${o}`})),e),[])}(v,m):v}))});return d}({createStyledComponent:(0,S.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,b.Z)({props:e,name:"MuiStack"})});var C=w},59782:function(e,t,n){"use strict";n.d(t,{Z:function(){return createSvgIcon}});var r=n(13428),o=n(2265),i=n(20791),u=n(57042),l=n(95600),c=n(28702),s=n(87927),a=n(35843),d=n(26520),f=n(25702);function getSvgIconUtilityClass(e){return(0,f.Z)("MuiSvgIcon",e)}(0,d.Z)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var p=n(57437);let m=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],useUtilityClasses=e=>{let{color:t,fontSize:n,classes:r}=e,o={root:["root","inherit"!==t&&`color${(0,c.Z)(t)}`,`fontSize${(0,c.Z)(n)}`]};return(0,l.Z)(o,getSvgIconUtilityClass,r)},v=(0,a.ZP)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,"inherit"!==n.color&&t[`color${(0,c.Z)(n.color)}`],t[`fontSize${(0,c.Z)(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,u,l,c,s,a,d,f,p,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(n=e.transitions)||null==(r=n.create)?void 0:r.call(n,"fill",{duration:null==(o=e.transitions)||null==(o=o.duration)?void 0:o.shorter}),fontSize:({inherit:"inherit",small:(null==(i=e.typography)||null==(u=i.pxToRem)?void 0:u.call(i,20))||"1.25rem",medium:(null==(l=e.typography)||null==(c=l.pxToRem)?void 0:c.call(l,24))||"1.5rem",large:(null==(s=e.typography)||null==(a=s.pxToRem)?void 0:a.call(s,35))||"2.1875rem"})[t.fontSize],color:null!=(d=null==(f=(e.vars||e).palette)||null==(f=f[t.color])?void 0:f.main)?d:({action:null==(p=(e.vars||e).palette)||null==(p=p.action)?void 0:p.active,disabled:null==(m=(e.vars||e).palette)||null==(m=m.action)?void 0:m.disabled,inherit:void 0})[t.color]}}),Z=o.forwardRef(function(e,t){let n=(0,s.Z)({props:e,name:"MuiSvgIcon"}),{children:l,className:c,color:a="inherit",component:d="svg",fontSize:f="medium",htmlColor:Z,inheritViewBox:h=!1,titleAccess:y,viewBox:g="0 0 24 24"}=n,S=(0,i.Z)(n,m),b=o.isValidElement(l)&&"svg"===l.type,w=(0,r.Z)({},n,{color:a,component:d,fontSize:f,instanceFontSize:e.fontSize,inheritViewBox:h,viewBox:g,hasSvgAsChild:b}),C={};h||(C.viewBox=g);let k=useUtilityClasses(w);return(0,p.jsxs)(v,(0,r.Z)({as:d,className:(0,u.Z)(k.root,c),focusable:"false",color:Z,"aria-hidden":!y||void 0,role:y?"img":void 0,ref:t},C,S,b&&l.props,{ownerState:w,children:[b?l.props.children:l,y?(0,p.jsx)("title",{children:y}):null]}))});function createSvgIcon(e,t){function Component(n,o){return(0,p.jsx)(Z,(0,r.Z)({"data-testid":`${t}Icon`,ref:o},n,{children:e}))}return Component.muiName=Z.muiName,o.memo(o.forwardRef(Component))}Z.muiName="SvgIcon"},80494:function(e,t,n){"use strict";var r=n(78078);t.Z=r.Z},43135:function(e,t,n){"use strict";n.r(t),n.d(t,{capitalize:function(){return o.Z},createChainedFunction:function(){return i},createSvgIcon:function(){return u.Z},debounce:function(){return l.Z},deprecatedPropType:function(){return utils_deprecatedPropType},isMuiElement:function(){return c.Z},ownerDocument:function(){return s.Z},ownerWindow:function(){return a.Z},requirePropFactory:function(){return utils_requirePropFactory},setRef:function(){return d},unstable_ClassNameGenerator:function(){return y},unstable_useEnhancedEffect:function(){return f.Z},unstable_useId:function(){return p.Z},unsupportedProp:function(){return utils_unsupportedProp},useControlled:function(){return m.Z},useEventCallback:function(){return v.Z},useForkRef:function(){return Z.Z},useIsFocusVisible:function(){return h.Z}});var r=n(25097),o=n(28702),i=n(62940).Z,u=n(59782),l=n(80494),utils_deprecatedPropType=function(e,t){return()=>null},c=n(10673),s=n(53931),a=n(26649);n(13428);var utils_requirePropFactory=function(e,t){return()=>null},d=n(13840).Z,f=n(88519),p=n(62916),utils_unsupportedProp=function(e,t,n,r,o){return null},m=n(73292),v=n(96),Z=n(37663),h=n(53308);let y={configure:e=>{r.Z.configure(e)}}},10673:function(e,t,n){"use strict";n.d(t,{Z:function(){return utils_isMuiElement}});var r=n(2265),utils_isMuiElement=function(e,t){return r.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}},53931:function(e,t,n){"use strict";var r=n(96278);t.Z=r.Z},26649:function(e,t,n){"use strict";var r=n(88221);t.Z=r.Z},73292:function(e,t,n){"use strict";var r=n(34625);t.Z=r.Z},39190:function(e,t,n){"use strict";var r=n(61047);let o=(0,r.ZP)();t.Z=o},62940:function(e,t,n){"use strict";function createChainedFunction(...e){return e.reduce((e,t)=>null==t?e:function(...n){e.apply(this,n),t.apply(this,n)},()=>{})}n.d(t,{Z:function(){return createChainedFunction}})},78078:function(e,t,n){"use strict";function debounce(e,t=166){let n;function debounced(...r){clearTimeout(n),n=setTimeout(()=>{e.apply(this,r)},t)}return debounced.clear=()=>{clearTimeout(n)},debounced}n.d(t,{Z:function(){return debounce}})},96278:function(e,t,n){"use strict";function ownerDocument(e){return e&&e.ownerDocument||document}n.d(t,{Z:function(){return ownerDocument}})},88221:function(e,t,n){"use strict";n.d(t,{Z:function(){return ownerWindow}});var r=n(96278);function ownerWindow(e){let t=(0,r.Z)(e);return t.defaultView||window}},34625:function(e,t,n){"use strict";n.d(t,{Z:function(){return useControlled}});var r=n(2265);function useControlled({controlled:e,default:t,name:n,state:o="value"}){let{current:i}=r.useRef(void 0!==e),[u,l]=r.useState(t),c=i?e:u,s=r.useCallback(e=>{i||l(e)},[]);return[c,s]}},26314:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}}]);