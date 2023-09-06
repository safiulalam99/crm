import{c as x,g as S,s as d,l as a,_ as i,w as b,o as $,p as f,r as v,u as C,d as y,j as l,h as z,i as R}from"./index-56f029cb.js";import{S as M}from"./SwitchBase-bbaa0cee.js";function B(t){return S("MuiSwitch",t)}const j=x("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),e=j,I=["className","color","edge","size","sx"],N=t=>{const{classes:o,edge:s,size:r,color:p,checked:h,disabled:u}=t,g={root:["root",s&&`edge${a(s)}`,`size${a(r)}`],switchBase:["switchBase",`color${a(p)}`,h&&"checked",u&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},w=R(g,B,o);return i({},o,w)},T=d("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:s}=t;return[o.root,s.edge&&o[`edge${a(s.edge)}`],o[`size${a(s.size)}`]]}})(({ownerState:t})=>i({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},t.edge==="start"&&{marginLeft:-8},t.edge==="end"&&{marginRight:-8},t.size==="small"&&{width:40,height:24,padding:7,[`& .${e.thumb}`]:{width:16,height:16},[`& .${e.switchBase}`]:{padding:4,[`&.${e.checked}`]:{transform:"translateX(16px)"}}})),U=d(M,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(t,o)=>{const{ownerState:s}=t;return[o.switchBase,{[`& .${e.input}`]:o.input},s.color!=="default"&&o[`color${a(s.color)}`]]}})(({theme:t})=>({position:"absolute",top:0,left:0,zIndex:1,color:t.palette.mode==="light"?t.palette.common.white:t.palette.grey[300],transition:t.transitions.create(["left","transform"],{duration:t.transitions.duration.shortest}),[`&.${e.checked}`]:{transform:"translateX(20px)"},[`&.${e.disabled}`]:{color:t.palette.mode==="light"?t.palette.grey[100]:t.palette.grey[600]},[`&.${e.checked} + .${e.track}`]:{opacity:.5},[`&.${e.disabled} + .${e.track}`]:{opacity:t.palette.mode==="light"?.12:.2},[`& .${e.input}`]:{left:"-100%",width:"300%"}}),({theme:t,ownerState:o})=>i({"&:hover":{backgroundColor:b(t.palette.action.active,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${e.checked}`]:{color:t.palette[o.color].main,"&:hover":{backgroundColor:b(t.palette[o.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${e.disabled}`]:{color:t.palette.mode==="light"?$(t.palette[o.color].main,.62):f(t.palette[o.color].main,.55)}},[`&.${e.checked} + .${e.track}`]:{backgroundColor:t.palette[o.color].main}})),_=d("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(t,o)=>o.track})(({theme:t})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:t.palette.mode==="light"?t.palette.common.black:t.palette.common.white,opacity:t.palette.mode==="light"?.38:.3})),E=d("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(t,o)=>o.thumb})(({theme:t})=>({boxShadow:t.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"})),P=v.forwardRef(function(o,s){const r=C({props:o,name:"MuiSwitch"}),{className:p,color:h="primary",edge:u=!1,size:g="medium",sx:w}=r,k=y(r,I),c=i({},r,{color:h,edge:u,size:g}),n=N(c),m=l.jsx(E,{className:n.thumb,ownerState:c});return l.jsxs(T,{className:z(n.root,p),sx:w,ownerState:c,children:[l.jsx(U,i({type:"checkbox",icon:m,checkedIcon:m,ref:s,ownerState:c},k,{classes:i({},n,{root:n.switchBase})})),l.jsx(_,{className:n.track,ownerState:c})]})}),O=P;export{O as M,e as s};
