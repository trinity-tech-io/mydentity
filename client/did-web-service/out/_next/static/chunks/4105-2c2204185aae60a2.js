(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4105],{7175:function(e,t,n){"use strict";var u=n(26314);t.Z=void 0;var r=u(n(80984)),i=n(57437),o=(0,r.default)((0,i.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy");t.Z=o},80984:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u.createSvgIcon}});var u=n(43135)},80494:function(e,t,n){"use strict";var u=n(78078);t.Z=u.Z},43135:function(e,t,n){"use strict";n.r(t),n.d(t,{capitalize:function(){return r.Z},createChainedFunction:function(){return i},createSvgIcon:function(){return o.Z},debounce:function(){return c.Z},deprecatedPropType:function(){return utils_deprecatedPropType},isMuiElement:function(){return s.Z},ownerDocument:function(){return l.Z},ownerWindow:function(){return f.Z},requirePropFactory:function(){return utils_requirePropFactory},setRef:function(){return a},unstable_ClassNameGenerator:function(){return m},unstable_useEnhancedEffect:function(){return d.Z},unstable_useId:function(){return p.Z},unsupportedProp:function(){return utils_unsupportedProp},useControlled:function(){return Z.Z},useEventCallback:function(){return v.Z},useForkRef:function(){return h.Z},useIsFocusVisible:function(){return y.Z}});var u=n(25097),r=n(28702),i=n(62940).Z,o=n(59782),c=n(80494),utils_deprecatedPropType=function(e,t){return()=>null},s=n(10673),l=n(53931),f=n(26649);n(13428);var utils_requirePropFactory=function(e,t){return()=>null},a=n(13840).Z,d=n(88519),p=n(62916),utils_unsupportedProp=function(e,t,n,u,r){return null},Z=n(73292),v=n(96),h=n(37663),y=n(53308);let m={configure:e=>{u.Z.configure(e)}}},10673:function(e,t,n){"use strict";n.d(t,{Z:function(){return utils_isMuiElement}});var u=n(2265),utils_isMuiElement=function(e,t){return u.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}},53931:function(e,t,n){"use strict";var u=n(96278);t.Z=u.Z},26649:function(e,t,n){"use strict";var u=n(88221);t.Z=u.Z},73292:function(e,t,n){"use strict";var u=n(34625);t.Z=u.Z},88519:function(e,t,n){"use strict";var u=n(1091);t.Z=u.Z},96:function(e,t,n){"use strict";var u=n(78136);t.Z=u.Z},37663:function(e,t,n){"use strict";var u=n(95137);t.Z=u.Z},62916:function(e,t,n){"use strict";var u=n(33449);t.Z=u.Z},53308:function(e,t,n){"use strict";let u;n.d(t,{Z:function(){return utils_useIsFocusVisible}});var r=n(2265);let i=!0,o=!1,c={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function handleKeyDown(e){e.metaKey||e.altKey||e.ctrlKey||(i=!0)}function handlePointerDown(){i=!1}function handleVisibilityChange(){"hidden"===this.visibilityState&&o&&(i=!0)}var utils_useIsFocusVisible=function(){let e=r.useCallback(e=>{if(null!=e){var t;(t=e.ownerDocument).addEventListener("keydown",handleKeyDown,!0),t.addEventListener("mousedown",handlePointerDown,!0),t.addEventListener("pointerdown",handlePointerDown,!0),t.addEventListener("touchstart",handlePointerDown,!0),t.addEventListener("visibilitychange",handleVisibilityChange,!0)}},[]),t=r.useRef(!1);return{isFocusVisibleRef:t,onFocus:function(e){return!!function(e){let{target:t}=e;try{return t.matches(":focus-visible")}catch(e){}return i||function(e){let{type:t,tagName:n}=e;return"INPUT"===n&&!!c[t]&&!e.readOnly||"TEXTAREA"===n&&!e.readOnly||!!e.isContentEditable}(t)}(e)&&(t.current=!0,!0)},onBlur:function(){return!!t.current&&(o=!0,window.clearTimeout(u),u=window.setTimeout(()=>{o=!1},100),t.current=!1,!0)},ref:e}}},43381:function(e,t,n){"use strict";n.d(t,{Z:function(){return extendSxProp}});var u=n(13428),r=n(20791),i=n(15959),o=n(58122);let c=["sx"],splitProps=e=>{var t,n;let u={systemProps:{},otherProps:{}},r=null!=(t=null==e||null==(n=e.theme)?void 0:n.unstable_sxConfig)?t:o.Z;return Object.keys(e).forEach(t=>{r[t]?u.systemProps[t]=e[t]:u.otherProps[t]=e[t]}),u};function extendSxProp(e){let t;let{sx:n}=e,o=(0,r.Z)(e,c),{systemProps:s,otherProps:l}=splitProps(o);return t=Array.isArray(n)?[s,...n]:"function"==typeof n?(...e)=>{let t=n(...e);return(0,i.P)(t)?(0,u.Z)({},s,t):s}:(0,u.Z)({},s,n),(0,u.Z)({},l,{sx:t})}},62940:function(e,t,n){"use strict";function createChainedFunction(...e){return e.reduce((e,t)=>null==t?e:function(...n){e.apply(this,n),t.apply(this,n)},()=>{})}n.d(t,{Z:function(){return createChainedFunction}})},78078:function(e,t,n){"use strict";function debounce(e,t=166){let n;function debounced(...u){clearTimeout(n),n=setTimeout(()=>{e.apply(this,u)},t)}return debounced.clear=()=>{clearTimeout(n)},debounced}n.d(t,{Z:function(){return debounce}})},96278:function(e,t,n){"use strict";function ownerDocument(e){return e&&e.ownerDocument||document}n.d(t,{Z:function(){return ownerDocument}})},88221:function(e,t,n){"use strict";n.d(t,{Z:function(){return ownerWindow}});var u=n(96278);function ownerWindow(e){let t=(0,u.Z)(e);return t.defaultView||window}},13840:function(e,t,n){"use strict";function setRef(e,t){"function"==typeof e?e(t):e&&(e.current=t)}n.d(t,{Z:function(){return setRef}})},34625:function(e,t,n){"use strict";n.d(t,{Z:function(){return useControlled}});var u=n(2265);function useControlled({controlled:e,default:t,name:n,state:r="value"}){let{current:i}=u.useRef(void 0!==e),[o,c]=u.useState(t),s=i?e:o,l=u.useCallback(e=>{i||c(e)},[]);return[s,l]}},1091:function(e,t,n){"use strict";var u=n(2265);let r="undefined"!=typeof window?u.useLayoutEffect:u.useEffect;t.Z=r},78136:function(e,t,n){"use strict";var u=n(2265),r=n(1091);t.Z=function(e){let t=u.useRef(e);return(0,r.Z)(()=>{t.current=e}),u.useCallback((...e)=>(0,t.current)(...e),[])}},95137:function(e,t,n){"use strict";n.d(t,{Z:function(){return useForkRef}});var u=n(2265),r=n(13840);function useForkRef(...e){return u.useMemo(()=>e.every(e=>null==e)?null:t=>{e.forEach(e=>{(0,r.Z)(e,t)})},e)}},33449:function(e,t,n){"use strict";n.d(t,{Z:function(){return useId}});var u,r=n(2265);let i=0,o=(u||(u=n.t(r,2)))["useId".toString()];function useId(e){if(void 0!==o){let t=o();return null!=e?e:t}return function(e){let[t,n]=r.useState(e),u=e||t;return r.useEffect(()=>{null==t&&(i+=1,n(`mui-${i}`))},[t]),u}(e)}},67650:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return i}});let u=n(21024),r=u._(n(2265)),i=r.default.createContext(null)},26314:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}}]);