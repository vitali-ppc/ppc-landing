(()=>{var e={};e.id=276,e.ids=[276],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},8335:()=>{},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9555:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>m,routeModule:()=>d,serverHooks:()=>h,workAsyncStorage:()=>c,workUnitAsyncStorage:()=>l});var s={};r.r(s),r.d(s,{POST:()=>u});var n=r(6559),a=r(8088),o=r(7719),i=r(2190);let p=new Map;async function u(e){try{let{question:t,image:r}=await e.json();if(!t)return i.NextResponse.json({error:"Question is required"},{status:400});let s=`${t}${r||""}`,n=p.get(s);if(n&&Date.now()-n.timestamp<864e5)return i.NextResponse.json(n.data);let a=process.env.AI_SERVER_URL||"http://91.99.225.211:8000/chat",o={question:`${t}

IMPORTANT: Respond in the same language as the user's question. If the user writes in Russian, respond in Russian. If the user writes in English, respond in English.`,image:r||null,timestamp:new Date().toISOString()},u=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":"PPCSet-AI-Client/1.0"},body:JSON.stringify(o),signal:AbortSignal.timeout(12e4)});if(!u.ok)throw Error(`AI server responded with status: ${u.status}`);let d=await u.json();if(!d.answer)throw Error("Invalid response format from AI server");return p.set(s,{data:d,timestamp:Date.now()}),i.NextResponse.json(d)}catch(e){if(console.error("Chat API error:",e),"AbortError"===e.name||e.message.includes("fetch"))return i.NextResponse.json({answer:`🔧 **AI-сервер тимчасово недоступний**

Наразі я не можу обробити ваш запит через технічні причини. Спробуйте:

1. **Перевірити підключення** до інтернету
2. **Повторити запит** через кілька хвилин
3. **Звернутися до підтримки** якщо проблема повторюється

*Помилка: ${e.message}*`});return i.NextResponse.json({answer:`❌ **Помилка обробки запиту**

Виникла неочікувана помилка при обробці вашого запиту. Спробуйте:

1. **Переформулювати питання**
2. **Перевірити підключення**
3. **Повторити спробу**

*Деталі: ${e.message}*`},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"C:\\Users\\Vitaliy\\ppc-landing\\src\\app\\api\\chat\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:c,workUnitAsyncStorage:l,serverHooks:h}=d;function m(){return(0,o.patchFetch)({workAsyncStorage:c,workUnitAsyncStorage:l})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[447,580],()=>r(9555));module.exports=s})();