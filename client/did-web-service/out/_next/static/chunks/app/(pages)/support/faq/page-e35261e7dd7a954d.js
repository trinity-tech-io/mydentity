(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8155],{4199:function(e,t,n){"use strict";var r=n(26314);t.Z=void 0;var o=r(n(80984)),i=n(57437),u=(0,o.default)((0,i.jsx)("path",{d:"M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"}),"ArrowForwardIosSharp");t.Z=u},80984:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=n(43135)},43135:function(e,t,n){"use strict";n.r(t),n.d(t,{capitalize:function(){return o.Z},createChainedFunction:function(){return i},createSvgIcon:function(){return u.Z},debounce:function(){return c.Z},deprecatedPropType:function(){return utils_deprecatedPropType},isMuiElement:function(){return a.Z},ownerDocument:function(){return s.Z},ownerWindow:function(){return l.Z},requirePropFactory:function(){return utils_requirePropFactory},setRef:function(){return d},unstable_ClassNameGenerator:function(){return x},unstable_useEnhancedEffect:function(){return f.Z},unstable_useId:function(){return p.Z},unsupportedProp:function(){return utils_unsupportedProp},useControlled:function(){return m.Z},useEventCallback:function(){return h.Z},useForkRef:function(){return y.Z},useIsFocusVisible:function(){return b.Z}});var r=n(25097),o=n(28702),i=n(62940).Z,u=n(59782),c=n(80494),utils_deprecatedPropType=function(e,t){return()=>null},a=n(10673),s=n(53931),l=n(26649);n(13428);var utils_requirePropFactory=function(e,t){return()=>null},d=n(13840).Z,f=n(88519),p=n(62916),utils_unsupportedProp=function(e,t,n,r,o){return null},m=n(73292),h=n(96),y=n(37663),b=n(53308);let x={configure:e=>{r.Z.configure(e)}}},10673:function(e,t,n){"use strict";n.d(t,{Z:function(){return utils_isMuiElement}});var r=n(2265),utils_isMuiElement=function(e,t){return r.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}},62916:function(e,t,n){"use strict";var r=n(33449);t.Z=r.Z},78078:function(e,t,n){"use strict";function debounce(e,t=166){let n;function debounced(...r){clearTimeout(n),n=setTimeout(()=>{e.apply(this,r)},t)}return debounced.clear=()=>{clearTimeout(n)},debounced}n.d(t,{Z:function(){return debounce}})},96278:function(e,t,n){"use strict";function ownerDocument(e){return e&&e.ownerDocument||document}n.d(t,{Z:function(){return ownerDocument}})},88221:function(e,t,n){"use strict";n.d(t,{Z:function(){return ownerWindow}});var r=n(96278);function ownerWindow(e){let t=(0,r.Z)(e);return t.defaultView||window}},33449:function(e,t,n){"use strict";n.d(t,{Z:function(){return useId}});var r,o=n(2265);let i=0,u=(r||(r=n.t(o,2)))["useId".toString()];function useId(e){if(void 0!==u){let t=u();return null!=e?e:t}return function(e){let[t,n]=o.useState(e),r=e||t;return o.useEffect(()=>{null==t&&(i+=1,n(`mui-${i}`))},[t]),r}(e)}},78044:function(e,t,n){Promise.resolve().then(n.bind(n,38115))},38115:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var r=n(57437),o=n(43226),i=n(4199),u=n(82057),c=n(58768),a=n(15873),s=n(35843),l=n(2265);let d=(0,s.ZP)(e=>(0,r.jsx)(u.Z,{disableGutters:!0,elevation:0,square:!0,...e}))(e=>{let{theme:t}=e;return{border:"1px solid ".concat(t.palette.divider),"&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"}}}),f=(0,s.ZP)(e=>(0,r.jsx)(a.Z,{expandIcon:(0,r.jsx)(i.Z,{sx:{fontSize:"0.9rem"}}),...e}))(e=>{let{theme:t}=e;return{backgroundColor:"dark"===t.palette.mode?"rgba(255, 255, 255, .05)":"rgba(0, 0, 0, .03)",flexDirection:"row-reverse","& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":{transform:"rotate(90deg)"},"& .MuiAccordionSummary-content":{marginLeft:t.spacing(1)}}}),p=(0,s.ZP)(c.Z)(e=>{let{theme:t}=e;return{padding:t.spacing(2),borderTop:"1px solid rgba(0, 0, 0, .125)"}}),FAQ=e=>{let{group:t,className:n}=e,[i,u]=(0,l.useState)(!1),handleChange=e=>(t,n)=>{u(!!n&&e)};return(0,r.jsxs)("div",{className:n,children:[(0,r.jsx)(o.Z,{variant:"h4",children:t.title}),t.items.map((e,t)=>(0,r.jsxs)(d,{expanded:i===e.title,onChange:handleChange(e.title),children:[(0,r.jsx)(f,{"aria-controls":"panel1d-content",id:"panel1d-header",children:(0,r.jsx)(o.Z,{children:e.title})}),(0,r.jsx)(p,{children:e.content})]},t))]})},m={title:"DIDs",items:[{title:"What is a DID?",content:(0,r.jsxs)("p",{children:["A DID is a digital identifier for yourself, a bit like your Google account is. But it's actually rather different than your Google or Apple account, because it is what fashion people call ",(0,r.jsx)("b",{children:"decentralized"}),".",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)("i",{children:"What does that really mean, decentralized?"}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),"This means that the identifier is not controlled by a company, it's controlled by yourself only. Basically, with this identity, you sign information that you share with apps, and no one else than you can reproduce this signature. As a result, anyone can make sure where a piece of information comes from."]})},{title:"Who created those DIDs?",content:""},{title:"How are DIDs better than my Google account?",content:""}]},h=[m,{title:"Mydentity",items:[{title:"Do I need to save cryptographic keys when I use this service?",content:""},{title:"So you mean, you are like Google in the end?",content:""},{title:"Why is there an account profile, and identities profiles?",content:""},{title:"I own DIDs in another identity app, can I use them in this web service?",content:""},{title:"I don't want to use your app any more, can I export my identities?",content:""}]}];var page=()=>(0,r.jsxs)("div",{className:"col-span-full",children:[(0,r.jsx)(o.Z,{variant:"h3",children:"F.A.Q."}),(0,r.jsx)(o.Z,{children:'You have many questions about these new "identities"? We might have answers.'}),h.map((e,t)=>(0,r.jsx)(FAQ,{className:"mt-6",group:e},t))]})},8236:function(e,t){"use strict";Symbol.for("react.element"),Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.server_context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.suspense_list"),Symbol.for("react.memo"),Symbol.for("react.lazy"),Symbol.for("react.offscreen"),Symbol.for("react.module.reference")},9176:function(e,t,n){"use strict";n(8236)},26314:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},function(e){e.O(0,[395,1228,5295,2503,8641,921,2971,7864,1744],function(){return e(e.s=78044)}),_N_E=e.O()}]);