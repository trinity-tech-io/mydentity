(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[684],{28213:function(e,n,t){Promise.resolve().then(t.bind(t,95536))},95536:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return C}});var i=t(57437),r=t(43226),s=t(16421),l=t(2265),a=t(12131),c=t(39830),o=t(10343),u=t(88938),d=t(67212),m=t(8140),f=t(38693),h=t(57042);let x=(0,m.Z)(e=>({centeredContainer:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"20vh"}})),g=()=>{let e=(0,l.useRef)(null),[n,t]=(0,l.useState)(!1),r=(0,l.useRef)(null),m=x(),[g,j]=(0,l.useState)(null),v=async()=>{let n=e.current.value;if(""!==n){t(!0),(0,f.$Y)(f.cX.EmailSignIn);try{await (0,s.X)(n)}catch(e){e instanceof o.h?j("This email address is unknown."):j("Unknown error, please try again."),t(!1)}}};async function w(n){null==n||n.preventDefault(),e.current.blur(),await v()}return(0,i.jsxs)(u.Z,{component:"div",className:(0,h.Z)(m.centeredContainer),children:[!n&&(0,i.jsx)("form",{onSubmit:w,ref:r,className:"w-full my-4",children:(0,i.jsx)(d.Z,{inputRef:e,label:"Your email address",placeholder:"Input email address",className:"w-full",size:"small",type:"email",name:"email"})}),!n&&(0,i.jsx)(a.c,{leftIcon:(0,i.jsx)(c.JO,{icon:"material-symbols:key"}),onClick:v,className:"w-full",children:"Send magic key to email"}),n&&(0,i.jsx)("div",{className:"text-center mt-10",children:"Magic link sent, please check your mailbox."}),g&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"text-red-600",children:g})})]})},j=()=>(0,i.jsxs)("div",{children:[(0,i.jsx)(r.Z,{variant:"h4",className:"w-full text-center font-semibold mt-4 mb-24 leading-9",children:"Welcome back \uD83D\uDC4B"}),(0,i.jsx)(r.Z,{children:"Choose how to sign in below"})]});var v=t(24033);let w=(0,m.Z)(e=>({centeredContainer:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"10vh"}}));var p=()=>{let e=w(),n=(0,v.useRouter)(),t=(0,v.useSearchParams)(),r=t.get("error"),[s,o]=(0,l.useState)(null);return(0,l.useEffect)(()=>{"oauthEmailNotExists"===r?o("This email address is unknown."):"unknown"===r&&o("Failed to sign in with MS account.")},[r]),(0,i.jsxs)("div",{className:(0,h.Z)(e.centeredContainer,"relative"),children:[(0,i.jsx)(a.c,{leftIcon:(0,i.jsx)(c.JO,{icon:"logos:microsoft-icon"}),onClick:()=>{(0,f.$Y)(f.cX.EmailSignIn),n.push("".concat("https://didweb-service.trinity-tech.io","/microsoft"))},children:"Sign in with Microsoft"}),s&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"text-red-600",children:s})})]})},b=t(57135),y=t(96556);let k=(0,m.Z)(e=>({centeredContainer:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"10vh"}}));var S=()=>{let e=k(),n=(0,v.useRouter)(),{showSuccessToast:t}=(0,y.p)(),r=async()=>{let e=await (0,b.HL)(()=>(0,s.bB)());e&&(t("Successful sign in"),n.replace("/dashboard"))};return(0,i.jsx)("div",{className:(0,h.Z)(e.centeredContainer,"relative"),children:(0,i.jsx)(a.c,{leftIcon:(0,i.jsx)(c.JO,{icon:""}),onClick:r,children:"\uD83D\uDD10 Sign in with Passkey"})})};let N=e=>{let{title:n,children:t}=e;return(0,i.jsxs)("div",{className:"col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-4",children:[(0,i.jsx)(r.Z,{variant:"h5",children:n}),t]})};var C=()=>((0,l.useEffect)(()=>{(0,s.w7)()},[]),(0,i.jsx)("div",{className:"col-span-full flex flex-col justify-center items-center",children:(0,i.jsxs)("div",{className:"w-full text-center",children:[(0,i.jsx)(j,{}),(0,i.jsxs)("div",{className:"grid grid-cols-12 bg-red mt-10 gap-4",children:[(0,i.jsx)(N,{title:"Social account",children:(0,i.jsx)(p,{})}),(0,i.jsx)(N,{title:"Email magic key",children:(0,i.jsx)(g,{})}),(0,i.jsx)(N,{title:"Browser",children:(0,i.jsx)(S,{})})]})]})}))},96556:function(e,n,t){"use strict";t.d(n,{p:function(){return r}});var i=t(36953);function r(){let{enqueueSnackbar:e}=(0,i.Ds)();return{showSuccessToast:n=>{e(n,{variant:"success"})},showErrorToast:n=>{e(n,{variant:"error"})}}}},38693:function(e,n,t){"use strict";var i,r;t.d(n,{$Y:function(){return a},Kt:function(){return l},cX:function(){return i},fK:function(){return c}}),(r=i||(i={}))[r.OnBoardingEmailBinding=0]="OnBoardingEmailBinding",r[r.OnBoardingBrowserBinding=1]="OnBoardingBrowserBinding",r[r.EmailSignIn=2]="EmailSignIn";let s="ongoingflowoperation";function l(){return i[localStorage.getItem(s)]}function a(e){localStorage.setItem(s,i[e])}function c(){localStorage.removeItem(s)}}},function(e){e.O(0,[6990,6110,1510,8920,4057,6953,2177,6327,1385,2971,596,1744],function(){return e(e.s=28213)}),_N_E=e.O()}]);