(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7083],{94802:function(e,t,n){Promise.resolve().then(n.bind(n,29121))},29121:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});var r=n(57437),i=n(451),a=n(29281),s=n(43226),u=n(69990),l=n(16421),c=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;let o=[];for(let e=0;e<256;++e)o.push((e+256).toString(16).slice(1));var f=function(e,t=0){let n=function(e,t=0){return o[e[t+0]]+o[e[t+1]]+o[e[t+2]]+o[e[t+3]]+"-"+o[e[t+4]]+o[e[t+5]]+"-"+o[e[t+6]]+o[e[t+7]]+"-"+o[e[t+8]]+o[e[t+9]]+"-"+o[e[t+10]]+o[e[t+11]]+o[e[t+12]]+o[e[t+13]]+o[e[t+14]]+o[e[t+15]]}(e,t);if(!("string"==typeof n&&c.test(n)))throw TypeError("Stringified UUID is invalid");return n},h=n(67133).Buffer,d=void 0!==h?e=>h.from(e,"base64"):e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)),p=n(24033),m=n(2265),y=()=>{let e=(0,p.useSearchParams)(),t=e.get("key"),n=t?f(d(t.replace(/-/g,"+").replace(/_/g,"/")+"==")):null,[c,o]=(0,m.useState)(!1),[h,y]=(0,m.useState)(!1),[b]=(0,i.V)(u.jU),g=(0,p.useRouter)();return(0,m.useEffect)(()=>{n&&((0,l.jF)()?(y(!0),null==b||b.get("email").checkRawEmailBind(n).then(e=>{e?g.push("/account/security"):o(!0)})):(0,l.kv)(n).then(e=>{e?null==b||b.get("activity").createActivity(a.T.SIGNED_IN,{type:"RAW_EMAIL"}).then(e=>{g.push("/dashboard")}).catch(e=>{g.push("/dashboard")}):o(!0)}))},[n,b,g]),(0,r.jsxs)("div",{className:"m-20 w-full",children:[!c&&(0,r.jsxs)(s.Z,{variant:"h4",className:"w-full text-center",children:[h?"Bind email":"Sign In","..."]}),c&&(0,r.jsxs)(s.Z,{variant:"h6",className:"w-full text-center",children:["Sorry, unable to ",h?"bind your email":"sign you in",". Your magic link is possibly expired."]})]})}},24033:function(e,t,n){e.exports=n(68165)}},function(e){e.O(0,[6990,6110,1510,8920,4057,1385,2971,596,1744],function(){return e(e.s=94802)}),_N_E=e.O()}]);