(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1716],{40471:function(r,e,t){"use strict";t.d(e,{Z:function(){return R}});var a=t(20791),n=t(13428),o=t(2265),i=t(57042),s=t(95600),l=t(99538),u=t(89975),c=t(28702),f=t(41101),d=t(35843),b=t(87927),m=t(26520),h=t(25702);function g(r){return(0,h.Z)("MuiLinearProgress",r)}(0,m.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var p=t(57437);let v=["className","color","value","valueBuffer","variant"],y=r=>r,Z,C,k,x,B,w,I=(0,l.F4)(Z||(Z=y`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),P=(0,l.F4)(C||(C=y`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),S=(0,l.F4)(k||(k=y`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),$=r=>{let{classes:e,variant:t,color:a}=r,n={root:["root",`color${(0,c.Z)(a)}`,t],dashed:["dashed",`dashedColor${(0,c.Z)(a)}`],bar1:["bar",`barColor${(0,c.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,c.Z)(a)}`,"buffer"===t&&`color${(0,c.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,s.Z)(n,g,e)},E=(r,e)=>"inherit"===e?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:"light"===r.palette.mode?(0,u.$n)(r.palette[e].main,.62):(0,u._j)(r.palette[e].main,.5),N=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.root,e[`color${(0,c.Z)(t.color)}`],e[t.variant]]}})(({ownerState:r,theme:e})=>(0,n.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:E(e,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"})),M=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.dashed,e[`dashedColor${(0,c.Z)(t.color)}`]]}})(({ownerState:r,theme:e})=>{let t=E(e,r.color);return(0,n.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},(0,l.iv)(x||(x=y`
    animation: ${0} 3s infinite linear;
  `),S)),O=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,c.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})(({ownerState:r,theme:e})=>(0,n.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(B||(B=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),I)),K=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,c.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})(({ownerState:r,theme:e})=>(0,n.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:E(e,r.color),transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(w||(w=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),P)),L=o.forwardRef(function(r,e){let t=(0,b.Z)({props:r,name:"MuiLinearProgress"}),{className:o,color:s="primary",value:l,valueBuffer:u,variant:c="indeterminate"}=t,d=(0,a.Z)(t,v),m=(0,n.Z)({},t,{color:s,variant:c}),h=$(m),g=(0,f.Z)(),y={},Z={bar1:{},bar2:{}};if(("determinate"===c||"buffer"===c)&&void 0!==l){y["aria-valuenow"]=Math.round(l),y["aria-valuemin"]=0,y["aria-valuemax"]=100;let r=l-100;"rtl"===g.direction&&(r=-r),Z.bar1.transform=`translateX(${r}%)`}if("buffer"===c&&void 0!==u){let r=(u||0)-100;"rtl"===g.direction&&(r=-r),Z.bar2.transform=`translateX(${r}%)`}return(0,p.jsxs)(N,(0,n.Z)({className:(0,i.Z)(h.root,o),ownerState:m,role:"progressbar"},y,{ref:e},d,{children:["buffer"===c?(0,p.jsx)(M,{className:h.dashed,ownerState:m}):null,(0,p.jsx)(O,{className:h.bar1,ownerState:m,style:Z.bar1}),"determinate"===c?null:(0,p.jsx)(K,{className:h.bar2,ownerState:m,style:Z.bar2})]}))});var R=L},54832:function(r,e,t){Promise.resolve().then(t.bind(t,75662))},75662:function(r,e,t){"use strict";t.r(e);var a=t(57437),n=t(29281),o=t(1349),i=t(10343),s=t(40471),l=t(38693),u=t(16421),c=t(24033),f=t(2265),d=t(19162),b=t(47101);e.default=()=>{let r=(0,c.useRouter)(),e=(0,c.useSearchParams)(),t=e.get("code");return(0,f.useEffect)(()=>{if(!t){alert("MicrosoftRedirect: No code from microsoft authentication callback.");return}let e=(0,l.Kt)();switch(e){case l.cX.OnBoardingEmailBinding:(0,u.h3)(t).then(e=>{e?b.L.createActivity({type:n.T.BIND_EMAIL,userEmailProvider:d.M.MICROSOFT}).then(e=>{(0,l.fK)(),r.push("/account/security")}).catch(e=>{(0,l.fK)(),r.push("/account/security")}):((0,l.fK)(),r.push("/account/security?error=unknown"))}).catch(e=>{e&&e instanceof o.E?((0,l.fK)(),r.push("/account/security?error=emailExists")):((0,l.fK)(),r.push("/account/security?error=unknown"))});break;case l.cX.EmailSignIn:(0,u.U)(t).then(e=>{e?b.L.createActivity({type:n.T.USER_SIGN_IN,userEmailProvider:d.M.MICROSOFT}).then(e=>{(0,l.fK)(),r.push("/dashboard")}).catch(e=>{(0,l.fK)(),r.push("/dashboard")}):((0,l.fK)(),r.push("/signin?error=unknown"))}).catch(e=>{e instanceof i.h&&((0,l.fK)(),r.push("/signin?error=oauthEmailNotExists"))});break;default:alert("Invalid operation, please try again.");return}},[t,r]),(0,a.jsx)("div",{className:"col-span-full",children:(0,a.jsxs)("div",{className:"flex flex-col w-full",children:[(0,a.jsx)("div",{className:"italic",children:"Checking authentication, hold on..."}),(0,a.jsx)(s.Z,{})]})})}},38693:function(r,e,t){"use strict";var a,n;t.d(e,{$Y:function(){return s},Kt:function(){return i},cX:function(){return a},fK:function(){return l}}),(n=a||(a={}))[n.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",n[n.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",n[n.EmailSignIn=2]="EmailSignIn";let o="ongoingflowoperation";function i(){return a[localStorage.getItem(o)]}function s(r){localStorage.setItem(o,a[r])}function l(){localStorage.removeItem(o)}},24033:function(r,e,t){r.exports=t(68165)}},function(r){r.O(0,[6990,3988,395,5295,1510,4440,6171,8098,1385,2971,596,1744],function(){return r(r.s=54832)}),_N_E=r.O()}]);