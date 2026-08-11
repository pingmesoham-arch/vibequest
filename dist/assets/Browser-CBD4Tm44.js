import{c as r,r as o,j as e,S as m}from"./index-CrqahKzn.js";/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=r("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=r("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=r("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=r("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]),y=()=>{const[a,d]=o.useState("https://example.com"),[t,l]=o.useState(a),[c,s]=o.useState(!1),h=i=>{i.preventDefault(),s(!0);let n=t;!t.startsWith("http://")&&!t.startsWith("https://")&&(n="https://"+t),d(n),l(n),setTimeout(()=>{s(!1)},800)};return e.jsxs("div",{className:"flex flex-col h-full bg-white text-black",children:[e.jsxs("div",{className:"h-12 bg-gray-100 border-b border-gray-300 flex items-center px-2 gap-2",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("button",{className:"p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors",children:e.jsx(u,{size:16})}),e.jsx("button",{className:"p-1.5 rounded hover:bg-gray-200 text-gray-400 transition-colors",children:e.jsx(p,{size:16})}),e.jsx("button",{className:"p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors",onClick:()=>{s(!0),setTimeout(()=>s(!1),800)},children:e.jsx(x,{size:16,className:c?"animate-spin":""})}),e.jsx("button",{className:"p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors",children:e.jsx(g,{size:16})})]}),e.jsxs("form",{onSubmit:h,className:"flex-1 flex items-center max-w-2xl bg-white border border-gray-300 rounded-full px-3 py-1 shadow-inner focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",children:[e.jsx(m,{size:14,className:"text-gray-400 mr-2"}),e.jsx("input",{type:"text",value:t,onChange:i=>l(i.target.value),className:"flex-1 text-sm outline-none bg-transparent",placeholder:"Search or enter web address"})]})]}),e.jsx("div",{className:"flex-1 relative bg-gray-50 flex items-center justify-center",children:c?e.jsxs("div",{className:"text-gray-400 text-sm flex items-center gap-2",children:[e.jsx(x,{size:16,className:"animate-spin"})," Loading ",a,"..."]}):e.jsxs("div",{className:"text-center p-8",children:[e.jsx("h1",{className:"text-4xl font-bold text-gray-800 mb-4",children:"Welcome to the Web"}),e.jsx("p",{className:"text-gray-600 mb-6",children:"You are currently visiting:"}),e.jsx("div",{className:"inline-block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-blue-600 font-medium",children:a}),e.jsx("p",{className:"text-xs text-gray-400 mt-8",children:"Note: This is a simulated browser experience for Cosmos OS."})]})})]})};export{y as Browser};
