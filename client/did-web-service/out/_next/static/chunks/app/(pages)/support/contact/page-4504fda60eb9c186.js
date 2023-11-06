(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4465],{13457:function(t,e,n){"use strict";n.d(e,{Z:function(){return w}});var o=n(20791),r=n(13428),i=n(2265),a=n(57042),s=n(15959),l=n(95600),c=n(25702),u=n(39190),d=n(48153),p=n(43381),m=n(84775),f=n(65425),b=n(47508),g=n(57437);let h=["component","direction","spacing","divider","children","className","useFlexGap"],v=(0,m.Z)(),y=(0,u.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,e)=>e.root});function useThemePropsDefault(t){return(0,d.Z)({props:t,name:"MuiStack",defaultTheme:v})}let getSideFromDirection=t=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[t],style=({ownerState:t,theme:e})=>{let n=(0,r.Z)({display:"flex",flexDirection:"column"},(0,f.k9)({theme:e},(0,f.P$)({values:t.direction,breakpoints:e.breakpoints.values}),t=>({flexDirection:t})));if(t.spacing){let o=(0,b.hB)(e),r=Object.keys(e.breakpoints.values).reduce((e,n)=>(("object"==typeof t.spacing&&null!=t.spacing[n]||"object"==typeof t.direction&&null!=t.direction[n])&&(e[n]=!0),e),{}),i=(0,f.P$)({values:t.direction,base:r}),a=(0,f.P$)({values:t.spacing,base:r});"object"==typeof i&&Object.keys(i).forEach((t,e,n)=>{let o=i[t];if(!o){let o=e>0?i[n[e-1]]:"column";i[t]=o}}),n=(0,s.Z)(n,(0,f.k9)({theme:e},a,(e,n)=>t.useFlexGap?{gap:(0,b.NA)(o,e)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${getSideFromDirection(n?i[n]:t.direction)}`]:(0,b.NA)(o,e)}}))}return(0,f.dt)(e.breakpoints,n)};var k=n(35843),Z=n(87927);let x=function(t={}){let{createStyledComponent:e=y,useThemeProps:n=useThemePropsDefault,componentName:s="MuiStack"}=t,useUtilityClasses=()=>(0,l.Z)({root:["root"]},t=>(0,c.Z)(s,t),{}),u=e(style),d=i.forwardRef(function(t,e){let s=n(t),l=(0,p.Z)(s),{component:c="div",direction:d="column",spacing:m=0,divider:f,children:b,className:v,useFlexGap:y=!1}=l,k=(0,o.Z)(l,h),Z=useUtilityClasses();return(0,g.jsx)(u,(0,r.Z)({as:c,ownerState:{direction:d,spacing:m,useFlexGap:y},ref:e,className:(0,a.Z)(Z.root,v)},k,{children:f?function(t,e){let n=i.Children.toArray(t).filter(Boolean);return n.reduce((t,o,r)=>(t.push(o),r<n.length-1&&t.push(i.cloneElement(e,{key:`separator-${r}`})),t),[])}(b,f):b}))});return d}({createStyledComponent:(0,k.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,e)=>e.root}),useThemeProps:t=>(0,Z.Z)({props:t,name:"MuiStack"})});var w=x},41101:function(t,e,n){"use strict";n.d(e,{Z:function(){return useTheme}}),n(2265);var o=n(95270),r=n(53794),i=n(53469);function useTheme(){let t=(0,o.Z)(r.Z);return t[i.Z]||t}},39190:function(t,e,n){"use strict";var o=n(61047);let r=(0,o.ZP)();e.Z=r},23232:function(t,e,n){Promise.resolve().then(n.bind(n,48562))},48562:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return page}});var o=n(57437),r=n(2265),i=n(60230),a=n(23965),s=n(91395),l=n(36079),c=n(29748);function _templateObject(){let t=(0,i._)(["\n          mutation SubmitContactUs($message: String!) {\n            submitContactUs(message: $message)\n          }\n        "]);return _templateObject=function(){return t},t}let u=new class{async sendReport(t){let{data:e}=await (0,c.Pt)(async()=>await (await (0,s.W)()).mutate({mutation:(0,a.Ps)(_templateObject()),variables:{message:t}})),n=null==e?void 0:e.submitContactUs;return n?l.k.log("contact-us","Contact us message sent."):l.k.warn("contact-us","Failed to send contact us message."),n}};var d=n(19739),p=n(15707),m=n(13457),f=n(84671),b=n(23785),page=()=>{let[t,e]=(0,r.useState)(""),[n,i]=(0,r.useState)(!1),{showSuccessToast:a,showErrorToast:s}=(0,d.p)(),handleButtonClick=async()=>{i(!1);try{if(""===t.trim()){s("Message cannot be empty.");return}i(!0);let e=await u.sendReport(t);null!=e||void 0!=e?a("Contact us message sent."):s("Failed to send contact us message.")}catch(t){s("Failed to send contact us message.")}i(!1)};return(0,o.jsxs)("div",{children:[(0,o.jsx)(p.Z,{title:"Contact Us",description:"Feel free to get in touch with our dedicated support team through our Contact Us page. We're here to assist you with any questions, feedback, or assistance you may need.",showBg:!0}),(0,o.jsxs)(m.Z,{alignItems:"center",spacing:2,children:[(0,o.jsx)(f.Z,{id:"outlined-multiline",className:"w-full",label:"Enter your message",multiline:!0,InputProps:{readOnly:n},onChange:t=>{e(t.target.value.trim())},rows:8}),(0,o.jsx)(b.Kz,{className:"w-40 mt-4",loading:n,onClick:handleButtonClick,disabled:t.length<1,children:"SUBMIT"})]})]})}},23785:function(t,e,n){"use strict";n.d(e,{Yd:function(){return y},hO:function(){return a},qi:function(){return button_CopyButton},Kz:function(){return l},UO:function(){return g}});var o=n(35843),r=n(44551);let i=(0,o.ZP)(r.Z)(t=>{let{theme:e}=t;return{background:"#000 !important",borderRadius:4,color:"white","&:disabled":{opacity:"0.7 !important",backgroundColor:"#343434 !important",color:"#fff !important"},"&:hover":{background:"#222 !important"},[e.breakpoints.down("md")]:{fontSize:12,padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var a=i;let s=(0,o.ZP)(r.Z)(t=>{let{theme:e,className:n}=t;return{background:"#323B45 !important",borderRadius:(null==n?void 0:n.includes("rounded"))?8:4,color:"white",textTransform:"uppercase",paddingLeft:12,paddingRight:12,"&:disabled":{opacity:"0.7 !important",backgroundColor:"#555 !important",color:"#fff !important"},"&:hover":{background:"#666e76 !important"},[e.breakpoints.down("md")]:{padding:"6px 14px"},".MuiLoadingButton-loadingIndicator":{position:"unset",color:"white",visibility:"inherit"}}});var l=s,c=n(57437);n(2265);var u=n(86781),d=n(39830),p=n(52653),m=n(19739),button_CopyButton=t=>{let{text:e,iconWidth:n="17px"}=t,{showSuccessToast:o}=(0,m.p)();return(0,c.jsx)(u.CopyToClipboard,{text:e,onCopy:()=>{o("Copied to clipboard")},children:(0,c.jsx)(p.Z,{type:"button",sx:{p:"5px"},"aria-label":"link",onClick:t=>{t.preventDefault(),t.stopPropagation()},color:"primary",children:(0,c.jsx)(d.JO,{icon:"material-symbols:content-copy-rounded",width:n})})})},f=n(49050);let b=(0,o.ZP)(f.Z)(t=>{let{theme:e}=t;return{color:"dark"===e.palette.mode?"white":"black"}});var g=b,h=n(45295);let v=(0,o.ZP)(h.Z)(t=>{let{theme:e}=t;return{borderRadius:"4px",overflow:"hidden","&:after":{background:"#fff",content:"''",height:155,left:-75,opacity:.2,position:"absolute",top:-50,width:50,WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",WebkitTransform:"rotate(35deg)",MsTransform:"rotate(35deg)",transform:"rotate(35deg)",zIndex:-10},"&:hover":{boxShadow:"0px 0px 7px #999999","&:after":{left:"120%",WebkitTransition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)",transition:"all 550ms cubic-bezier(0.19, 1, 0.22, 1)"}}}});var y=v},15707:function(t,e,n){"use strict";var o=n(57437),r=n(35843),i=n(43226);let a=(0,r.ZP)("div")(t=>{let{showBg:e}=t;return{marginBottom:"1.5rem",background:e?"url('/headline-banner.png') no-repeat center center / cover":"none"}});e.Z=t=>{let{title:e,description:n,showBg:r=!1}=t;return(0,o.jsxs)(a,{showBg:r,className:r?"p-4 sm:p-6 rounded-lg":"",children:[(0,o.jsx)(i.Z,{className:"w-full pb-3 sm:pb-4 sm:pb-8",variant:"h3",color:"text.primary",children:e}),(0,o.jsx)(i.Z,{className:"mt-4",variant:"body1",color:"text.primary",children:n})]})}},19739:function(t,e,n){"use strict";n.d(e,{p:function(){return useToast}});var o=n(36953);function useToast(){let{enqueueSnackbar:t}=(0,o.Ds)();return{showSuccessToast:e=>{t(e,{variant:"success"})},showErrorToast:e=>{t(e,{variant:"error"})}}}}},function(t){t.O(0,[6990,9787,9443,8218,3988,3861,6506,8644,9490,9830,1711,1510,6953,378,5951,8599,3451,1662,1869,4671,7056,2971,7864,1744],function(){return t(t.s=23232)}),_N_E=t.O()}]);