import{s as I,_ as a,r,u as x,d as p,a9 as u,j as f,h as d,i as g}from"./index-56f029cb.js";import{g as L}from"./listItemIconClasses-7b184a3f.js";const S=["className"],h=s=>{const{alignItems:t,classes:e}=s;return g({root:["root",t==="flex-start"&&"alignItemsFlexStart"]},L,e)},v=I("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(s,t)=>{const{ownerState:e}=s;return[t.root,e.alignItems==="flex-start"&&t.alignItemsFlexStart]}})(({theme:s,ownerState:t})=>a({minWidth:56,color:(s.vars||s).palette.action.active,flexShrink:0,display:"inline-flex"},t.alignItems==="flex-start"&&{marginTop:8})),C=r.forwardRef(function(t,e){const o=x({props:t,name:"MuiListItemIcon"}),{className:i}=o,c=p(o,S),l=r.useContext(u),n=a({},o,{alignItems:l.alignItems}),m=h(n);return f.jsx(v,a({className:d(m.root,i),ownerState:n,ref:e},c))}),w=C;export{w as L};
