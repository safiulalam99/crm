import{c as $,g as T,s as j,l as h,_ as c,r as C,u as E,d as M,e as N,f as U,T as g,j as P,h as _,i as w}from"./index-56f029cb.js";function D(o){return T("MuiFormControlLabel",o)}const S=$("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]),i=S,W=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","value"],z=o=>{const{classes:e,disabled:a,labelPlacement:l,error:d}=o,m={root:["root",a&&"disabled",`labelPlacement${h(l)}`,d&&"error"],label:["label",a&&"disabled"]};return w(m,D,e)},A=j("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:a}=o;return[{[`& .${i.label}`]:e.label},e.root,e[`labelPlacement${h(a.labelPlacement)}`]]}})(({theme:o,ownerState:e})=>c({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${i.disabled}`]:{cursor:"default"}},e.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},e.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},e.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${i.label}`]:{[`&.${i.disabled}`]:{color:(o.vars||o).palette.text.disabled}}})),B=C.forwardRef(function(e,a){const l=E({props:e,name:"MuiFormControlLabel"}),{className:d,componentsProps:m={},control:s,disabled:L,disableTypography:y,label:x,labelPlacement:F="end"}=l,R=M(l,W),b=N();let t=L;typeof t>"u"&&typeof s.props.disabled<"u"&&(t=s.props.disabled),typeof t>"u"&&b&&(t=b.disabled);const p={disabled:t};["checked","name","onChange","value","inputRef"].forEach(n=>{typeof s.props[n]>"u"&&typeof l[n]<"u"&&(p[n]=l[n])});const v=U({props:l,muiFormControl:b,states:["error"]}),f=c({},l,{disabled:t,labelPlacement:F,error:v.error}),u=z(f);let r=x;return r!=null&&r.type!==g&&!y&&(r=P.jsx(g,c({component:"span",className:u.label},m.typography,{children:r}))),P.jsxs(A,c({className:_(u.root,d),ownerState:f,ref:a},R,{children:[C.cloneElement(s,p),r]}))}),I=B;export{I as F};
