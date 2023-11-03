"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8815],{96507:function(t,e,n){n.d(e,{Z:function(){return v}});var r=n(13428),o=n(20791),i=n(2265),a=n(57042),l=n(69613),s=n(87947),g=n(43381),u=n(95270),c=n(57437);let p=["className","component"];var d=n(25097),f=n(30606),h=n(53469);let m=(0,f.Z)(),y=function(t={}){let{themeId:e,defaultTheme:n,defaultClassName:d="MuiBox-root",generateClassName:f}=t,h=(0,l.ZP)("div",{shouldForwardProp:t=>"theme"!==t&&"sx"!==t&&"as"!==t})(s.Z),m=i.forwardRef(function(t,i){let l=(0,u.Z)(n),s=(0,g.Z)(t),{className:m,component:y="div"}=s,v=(0,o.Z)(s,p);return(0,c.jsx)(h,(0,r.Z)({as:y,ref:i,className:(0,a.Z)(m,f?f(d):d),theme:e&&l[e]||l},v))});return m}({themeId:h.Z,defaultTheme:m,defaultClassName:"MuiBox-root",generateClassName:d.Z.generate});var v=y},13457:function(t,e,n){n.d(e,{Z:function(){return S}});var r=n(20791),o=n(13428),i=n(2265),a=n(57042),l=n(15959),s=n(95600),g=n(25702),u=n(39190),c=n(48153),p=n(43381),d=n(84775),f=n(65425),h=n(47508),m=n(57437);let y=["component","direction","spacing","divider","children","className","useFlexGap"],v=(0,d.Z)(),b=(0,u.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,e)=>e.root});function useThemePropsDefault(t){return(0,c.Z)({props:t,name:"MuiStack",defaultTheme:v})}let getSideFromDirection=t=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[t],style=({ownerState:t,theme:e})=>{let n=(0,o.Z)({display:"flex",flexDirection:"column"},(0,f.k9)({theme:e},(0,f.P$)({values:t.direction,breakpoints:e.breakpoints.values}),t=>({flexDirection:t})));if(t.spacing){let r=(0,h.hB)(e),o=Object.keys(e.breakpoints.values).reduce((e,n)=>(("object"==typeof t.spacing&&null!=t.spacing[n]||"object"==typeof t.direction&&null!=t.direction[n])&&(e[n]=!0),e),{}),i=(0,f.P$)({values:t.direction,base:o}),a=(0,f.P$)({values:t.spacing,base:o});"object"==typeof i&&Object.keys(i).forEach((t,e,n)=>{let r=i[t];if(!r){let r=e>0?i[n[e-1]]:"column";i[t]=r}}),n=(0,l.Z)(n,(0,f.k9)({theme:e},a,(e,n)=>t.useFlexGap?{gap:(0,h.NA)(r,e)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${getSideFromDirection(n?i[n]:t.direction)}`]:(0,h.NA)(r,e)}}))}return(0,f.dt)(e.breakpoints,n)};var Z=n(35843),w=n(87927);let x=function(t={}){let{createStyledComponent:e=b,useThemeProps:n=useThemePropsDefault,componentName:l="MuiStack"}=t,useUtilityClasses=()=>(0,s.Z)({root:["root"]},t=>(0,g.Z)(l,t),{}),u=e(style),c=i.forwardRef(function(t,e){let l=n(t),s=(0,p.Z)(l),{component:g="div",direction:c="column",spacing:d=0,divider:f,children:h,className:v,useFlexGap:b=!1}=s,Z=(0,r.Z)(s,y),w=useUtilityClasses();return(0,m.jsx)(u,(0,o.Z)({as:g,ownerState:{direction:c,spacing:d,useFlexGap:b},ref:e,className:(0,a.Z)(w.root,v)},Z,{children:f?function(t,e){let n=i.Children.toArray(t).filter(Boolean);return n.reduce((t,r,o)=>(t.push(r),o<n.length-1&&t.push(i.cloneElement(e,{key:`separator-${o}`})),t),[])}(h,f):h}))});return c}({createStyledComponent:(0,Z.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,e)=>e.root}),useThemeProps:t=>(0,w.Z)({props:t,name:"MuiStack"})});var S=x},43226:function(t,e,n){n.d(e,{Z:function(){return Z}});var r=n(20791),o=n(13428),i=n(2265),a=n(57042),l=n(43381),s=n(95600),g=n(35843),u=n(87927),c=n(28702),p=n(26520),d=n(25702);function getTypographyUtilityClass(t){return(0,d.Z)("MuiTypography",t)}(0,p.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var f=n(57437);let h=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],useUtilityClasses=t=>{let{align:e,gutterBottom:n,noWrap:r,paragraph:o,variant:i,classes:a}=t,l={root:["root",i,"inherit"!==t.align&&`align${(0,c.Z)(e)}`,n&&"gutterBottom",r&&"noWrap",o&&"paragraph"]};return(0,s.Z)(l,getTypographyUtilityClass,a)},m=(0,g.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(t,e)=>{let{ownerState:n}=t;return[e.root,n.variant&&e[n.variant],"inherit"!==n.align&&e[`align${(0,c.Z)(n.align)}`],n.noWrap&&e.noWrap,n.gutterBottom&&e.gutterBottom,n.paragraph&&e.paragraph]}})(({theme:t,ownerState:e})=>(0,o.Z)({margin:0},"inherit"===e.variant&&{font:"inherit"},"inherit"!==e.variant&&t.typography[e.variant],"inherit"!==e.align&&{textAlign:e.align},e.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},e.gutterBottom&&{marginBottom:"0.35em"},e.paragraph&&{marginBottom:16})),y={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},v={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},transformDeprecatedColors=t=>v[t]||t,b=i.forwardRef(function(t,e){let n=(0,u.Z)({props:t,name:"MuiTypography"}),i=transformDeprecatedColors(n.color),s=(0,l.Z)((0,o.Z)({},n,{color:i})),{align:g="inherit",className:c,component:p,gutterBottom:d=!1,noWrap:v=!1,paragraph:b=!1,variant:Z="body1",variantMapping:w=y}=s,x=(0,r.Z)(s,h),S=(0,o.Z)({},s,{align:g,color:i,className:c,component:p,gutterBottom:d,noWrap:v,paragraph:b,variant:Z,variantMapping:w}),k=p||(b?"p":w[Z]||y[Z])||"span",P=useUtilityClasses(S);return(0,f.jsx)(m,(0,o.Z)({as:k,ref:e,ownerState:S,className:(0,a.Z)(P.root,c)},x))});var Z=b},39190:function(t,e,n){var r=n(61047);let o=(0,r.ZP)();e.Z=o},31514:function(t,e,n){var r=n(57437),o=n(74966),i=n(39830);e.Z=()=>(0,r.jsx)(o.v,{icon:(0,r.jsx)(i.JO,{className:"main-icon",icon:"simple-icons:authelia",width:"90%",height:"100%"}),preparingText:"Checking authentication, Please wait for a moment..."})},74966:function(t,e,n){n.d(e,{v:function(){return PreparingContainer}});var r=n(57437),o=n(96507),i=n(13457),a=n(43226),l=n(35843);let s=(0,l.ZP)(o.Z)(t=>{let{theme:e}=t;return{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",padding:28,width:150,height:150,background:"transparent",border:"3px solid #3c3c3c",borderRadius:"50%",textAlign:"center",lineHeight:150,boxShadow:"0 0 20px rgba(0,0,0,.5)","&:before":{content:"''",position:"absolute",top:-3,left:-3,width:"calc(100% + 6px)",height:"calc(100% + 6px)",borderTop:"3px solid #f3f",borderRight:"3px solid #f3f",borderBottom:"3px solid transparent",borderRadius:"50%",animation:"rotate 3s linear infinite",transition:"all 1s ease-in"},".main-icon":{animation:"beating 1s linear infinite"},"span.bubble":{display:"block",position:"absolute",top:"calc(50% - 2px)",left:"50%",width:"50%",height:4,background:"transparent",transformOrigin:"left",animation:"rotate 3s linear infinite",rotate:"45deg","&:before":{content:"''",position:"absolute",width:16,height:16,borderRadius:"50%",background:"#f3f",top:-6,right:-8,boxShadow:"0 0 20px #f3f"}},"@keyframes rotate":{"0%":{filter:"hue-rotate(0deg)",transform:"rotate(0deg)"},"100%":{filter:"hue-rotate(360deg)",transform:"rotate(360deg)"}},"@keyframes beating":{"0%":{width:"90%"},"25%":{width:"85%"},"50%":{width:"90%"},"75%":{width:"95%"},"100%":{width:"90%"}}}}),PreparingContainer=t=>{let{icon:e,preparingText:n}=t;return(0,r.jsxs)(i.Z,{spacing:2,alignItems:"center",sx:{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)"},children:[(0,r.jsxs)(s,{children:[e,(0,r.jsx)("span",{className:"bubble"})]}),(0,r.jsx)(a.Z,{variant:"body1",textAlign:"center",children:n})]})}},63491:function(t,e,n){n.d(e,{$Y:function(){return setOnGoingFlowOperation},Ad:function(){return clearPostSignInUrl},Kt:function(){return getOnGoingFlowOperation},cX:function(){return o},fK:function(){return clearOnGoingFlowOperation},qC:function(){return setPostSignInUrl},vX:function(){return usePostSignInFlow}});var r,o,i=n(92e3),a=n(36079);(r=o||(o={}))[r.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",r[r.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",r[r.EmailSignIn=2]="EmailSignIn";let l="ongoingflowoperation",s="postsigninurl";function getOnGoingFlowOperation(){return o[localStorage.getItem(l)]}function setOnGoingFlowOperation(t){localStorage.setItem(l,o[t])}function clearOnGoingFlowOperation(){localStorage.removeItem(l)}function setPostSignInUrl(t){a.k.log("flow","Setting post sign in url to:",t),localStorage.setItem(s,t)}function clearPostSignInUrl(){a.k.log("flow","Clearing post sign in url"),localStorage.removeItem(s)}function usePostSignInFlow(){let t=(0,i.useRouter)();return{navigateToPostSignInLandingPage(e){let n=localStorage.getItem(s);if(n)a.k.log("flow","Navigating to post sign in landing page:",n),t.replace(n),clearPostSignInUrl();else{let n=e||"/dashboard";a.k.log("flow","Navigating to post sign in landing page ".concat(n)),t.push(n)}}}}}}]);