import{c as s,j as e,I as i}from"./index-CrqahKzn.js";/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=s("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=s("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t=s("Folder",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=s("HardDrive",[["line",{x1:"22",x2:"2",y1:"12",y2:"12",key:"1y58io"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16",key:"sgf278"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16",key:"1l4acy"}]]);/**
 * @license lucide-react v0.359.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=s("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]),d=[{name:"Documents",type:"folder",icon:t,color:"text-blue-400"},{name:"Downloads",type:"folder",icon:t,color:"text-blue-400"},{name:"Pictures",type:"folder",icon:t,color:"text-blue-400"},{name:"Desktop",type:"folder",icon:t,color:"text-blue-400"},{name:"project_notes.txt",type:"file",icon:a,color:"text-gray-300"},{name:"vacation.jpg",type:"image",icon:i,color:"text-emerald-400"},{name:"presentation.pdf",type:"file",icon:a,color:"text-red-400"}],p=()=>e.jsxs("div",{className:"flex h-full bg-black/60 text-white",children:[e.jsxs("div",{className:"w-48 bg-black/40 border-r border-white/10 p-3 flex flex-col gap-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2",children:"Favorites"}),e.jsxs("ul",{className:"space-y-1",children:[e.jsxs("li",{className:"flex items-center gap-2 px-2 py-1.5 bg-white/10 rounded-md cursor-pointer text-sm",children:[e.jsx(x,{size:14,className:"text-yellow-400"})," Favorites"]}),e.jsxs("li",{className:"flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer text-sm",children:[e.jsx(n,{size:14,className:"text-blue-400"})," Recents"]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2",children:"Locations"}),e.jsxs("ul",{className:"space-y-1",children:[e.jsxs("li",{className:"flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer text-sm",children:[e.jsx(l,{size:14,className:"text-gray-300"})," Macintosh HD"]}),e.jsxs("li",{className:"flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer text-sm",children:[e.jsx(l,{size:14,className:"text-gray-300"})," Cosmos OS"]})]})]})]}),e.jsxs("div",{className:"flex-1 flex flex-col min-w-0",children:[e.jsx("div",{className:"h-12 border-b border-white/10 flex items-center px-4 bg-white/5",children:e.jsxs("div",{className:"flex items-center gap-2 text-sm text-gray-300",children:[e.jsx("span",{className:"cursor-pointer hover:text-white",children:"Cosmos OS"}),e.jsx("span",{className:"text-gray-500",children:"/"}),e.jsx("span",{className:"cursor-pointer hover:text-white",children:"Users"}),e.jsx("span",{className:"text-gray-500",children:"/"}),e.jsx("span",{className:"text-white font-medium",children:"Guest"})]})}),e.jsx("div",{className:"flex-1 p-4 overflow-y-auto",children:e.jsx("div",{className:"grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4",children:d.map((r,o)=>{const c=r.icon;return e.jsxs("div",{className:"flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer group transition-colors",children:[e.jsx(c,{size:48,className:`${r.color} drop-shadow-md group-hover:scale-105 transition-transform`,strokeWidth:1.5}),e.jsx("span",{className:"text-xs text-center truncate w-full px-1",children:r.name})]},o)})})})]})]});export{p as FileExplorer};
