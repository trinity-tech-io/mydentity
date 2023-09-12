(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1716],{40471:function(r,e,a){"use strict";a.d(e,{Z:function(){return L}});var t=a(20791),n=a(13428),o=a(2265),i=a(57042),s=a(95600),l=a(99538),u=a(89975),c=a(28702),f=a(41101),d=a(35843),b=a(87927),m=a(26520),g=a(25702);function h(r){return(0,g.Z)("MuiLinearProgress",r)}(0,m.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var p=a(57437);let v=["className","color","value","valueBuffer","variant"],y=r=>r,Z,k,x,C,B,w,$=(0,l.F4)(Z||(Z=y`
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
`)),P=(0,l.F4)(k||(k=y`
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
`)),I=(0,l.F4)(x||(x=y`
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
`)),S=r=>{let{classes:e,variant:a,color:t}=r,n={root:["root",`color${(0,c.Z)(t)}`,a],dashed:["dashed",`dashedColor${(0,c.Z)(t)}`],bar1:["bar",`barColor${(0,c.Z)(t)}`,("indeterminate"===a||"query"===a)&&"bar1Indeterminate","determinate"===a&&"bar1Determinate","buffer"===a&&"bar1Buffer"],bar2:["bar","buffer"!==a&&`barColor${(0,c.Z)(t)}`,"buffer"===a&&`color${(0,c.Z)(t)}`,("indeterminate"===a||"query"===a)&&"bar2Indeterminate","buffer"===a&&"bar2Buffer"]};return(0,s.Z)(n,h,e)},E=(r,e)=>"inherit"===e?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:"light"===r.palette.mode?(0,u.$n)(r.palette[e].main,.62):(0,u._j)(r.palette[e].main,.5),N=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{let{ownerState:a}=r;return[e.root,e[`color${(0,c.Z)(a.color)}`],e[a.variant]]}})(({ownerState:r,theme:e})=>(0,n.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:E(e,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"})),j=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{let{ownerState:a}=r;return[e.dashed,e[`dashedColor${(0,c.Z)(a.color)}`]]}})(({ownerState:r,theme:e})=>{let a=E(e,r.color);return(0,n.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${a} 0%, ${a} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},(0,l.iv)(C||(C=y`
    animation: ${0} 3s infinite linear;
  `),I)),M=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{let{ownerState:a}=r;return[e.bar,e[`barColor${(0,c.Z)(a.color)}`],("indeterminate"===a.variant||"query"===a.variant)&&e.bar1Indeterminate,"determinate"===a.variant&&e.bar1Determinate,"buffer"===a.variant&&e.bar1Buffer]}})(({ownerState:r,theme:e})=>(0,n.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(B||(B=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),$)),O=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{let{ownerState:a}=r;return[e.bar,e[`barColor${(0,c.Z)(a.color)}`],("indeterminate"===a.variant||"query"===a.variant)&&e.bar2Indeterminate,"buffer"===a.variant&&e.bar2Buffer]}})(({ownerState:r,theme:e})=>(0,n.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:E(e,r.color),transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(w||(w=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),P)),q=o.forwardRef(function(r,e){let a=(0,b.Z)({props:r,name:"MuiLinearProgress"}),{className:o,color:s="primary",value:l,valueBuffer:u,variant:c="indeterminate"}=a,d=(0,t.Z)(a,v),m=(0,n.Z)({},a,{color:s,variant:c}),g=S(m),h=(0,f.Z)(),y={},Z={bar1:{},bar2:{}};if(("determinate"===c||"buffer"===c)&&void 0!==l){y["aria-valuenow"]=Math.round(l),y["aria-valuemin"]=0,y["aria-valuemax"]=100;let r=l-100;"rtl"===h.direction&&(r=-r),Z.bar1.transform=`translateX(${r}%)`}if("buffer"===c&&void 0!==u){let r=(u||0)-100;"rtl"===h.direction&&(r=-r),Z.bar2.transform=`translateX(${r}%)`}return(0,p.jsxs)(N,(0,n.Z)({className:(0,i.Z)(g.root,o),ownerState:m,role:"progressbar"},y,{ref:e},d,{children:["buffer"===c?(0,p.jsx)(j,{className:g.dashed,ownerState:m}):null,(0,p.jsx)(M,{className:g.bar1,ownerState:m,style:Z.bar1}),"determinate"===c?null:(0,p.jsx)(O,{className:g.bar2,ownerState:m,style:Z.bar2})]}))});var L=q},66252:function(r,e,a){Promise.resolve().then(a.bind(a,75662))},75662:function(r,e,a){"use strict";a.r(e);var t=a(57437),n=a(1349),o=a(10343),i=a(40471),s=a(38693),l=a(16421),u=a(24033),c=a(2265);e.default=()=>{let r=(0,u.useRouter)(),e=(0,u.useSearchParams)(),a=e.get("code");return(0,c.useEffect)(()=>{if(!a){alert("MicrosoftRedirect: No code from microsoft authentication callback.");return}let e=(0,s.Kt)();switch(e){case s.cX.OnBoardingEmailBinding:(0,s.fK)(),(0,l.h3)(a).then(e=>{e?r.push("/account/security"):r.push("/account/security?error=unknown")}).catch(e=>{e instanceof n.E&&r.push("/account/security?error=emailExists")});break;case s.cX.EmailSignIn:(0,s.fK)(),(0,l.U)(a).then(e=>{e?r.push("/dashboard"):r.push("/signin?error=unknown")}).catch(e=>{e instanceof o.h&&r.push("/signin?error=oauthEmailNotExists")});break;default:alert("Invalid operation, please try again.");return}},[]),(0,t.jsx)("div",{className:"col-span-full",children:(0,t.jsxs)("div",{className:"flex flex-col w-full",children:[(0,t.jsx)("div",{className:"italic",children:"Checking authentication, hold on..."}),(0,t.jsx)(i.Z,{})]})})}},38693:function(r,e,a){"use strict";var t,n;a.d(e,{$Y:function(){return s},Kt:function(){return i},cX:function(){return t},fK:function(){return l}}),(n=t||(t={}))[n.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",n[n.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",n[n.EmailSignIn=2]="EmailSignIn";let o="ongoingflowoperation";function i(){return t[localStorage.getItem(o)]}function s(r){localStorage.setItem(o,t[r])}function l(){localStorage.removeItem(o)}},24033:function(r,e,a){r.exports=a(68165)}},function(r){r.O(0,[6990,9787,9443,8218,6110,2361,8920,7679,3412,6432,1305,2971,596,1744],function(){return r(r.s=66252)}),_N_E=r.O()}]);