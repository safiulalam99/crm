import{F as f,G as g,j as e,an as l,r as u,W as D,V as P,T as R,a as S,aQ as k,b2 as q,U as I,X as p,af as m,H as x,b3 as j,Y as h}from"./index-56f029cb.js";import{P as T}from"./index-0fdc08a6.js";import{P as M}from"./index-8ccd445a.js";import{C as A}from"./Container-818505ea.js";import{G as v}from"./Grid-8466383b.js";import{C as V}from"./Card-0c28d1de.js";import{C as L}from"./CardHeader-03f1de37.js";import{C as O}from"./CardContent-bec384f6.js";import"./AddTwoTone-1af7eec3.js";var c={},$=g;Object.defineProperty(c,"__esModule",{value:!0});var C=c.default=void 0,H=$(f()),z=e,E=(0,H.default)((0,z.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");C=c.default=E;var d={},F=g;Object.defineProperty(d,"__esModule",{value:!0});var b=d.default=void 0,G=F(f()),W=e,B=(0,G.default)((0,W.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");b=d.default=B;const _=["username@gmail.com","user02@gmail.com"];function y(o){const{onClose:t,selectedValue:a,open:i}=o,n=()=>{t(a)},r=s=>{t(s)};return e.jsxs(k,{onClose:n,open:i,children:[e.jsx(q,{children:"Set backup account"}),e.jsxs(I,{sx:{pt:0},children:[_.map(s=>e.jsxs(p,{button:!0,onClick:()=>r(s),children:[e.jsx(m,{children:e.jsx(x,{sx:{bgcolor:j[100],color:j[600]},children:e.jsx(C,{})})}),e.jsx(h,{primary:s})]},s)),e.jsxs(p,{autoFocus:!0,button:!0,onClick:()=>r("addAccount"),children:[e.jsx(m,{children:e.jsx(x,{children:e.jsx(b,{})})}),e.jsx(h,{primary:"Add account"})]})]})]})}y.propTypes={onClose:l.func.isRequired,open:l.bool.isRequired,selectedValue:l.string.isRequired};function ee(){const[o,t]=u.useState(!1),[a,i]=u.useState(_[1]),n=()=>{t(!0)},r=s=>{t(!1),i(s)};return e.jsxs(e.Fragment,{children:[e.jsx(D,{children:e.jsx("title",{children:"Modals - Components"})}),e.jsx(M,{children:e.jsx(T,{heading:"Modals",subHeading:"Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.",docs:"https://material-ui.com/components/dialogs/"})}),e.jsx(A,{maxWidth:"lg",children:e.jsx(v,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:e.jsx(v,{item:!0,xs:12,children:e.jsxs(V,{children:[e.jsx(L,{title:"Basic Dialog"}),e.jsx(P,{}),e.jsxs(O,{children:[e.jsxs(R,{variant:"subtitle1",component:"div",children:["Selected: ",a]}),e.jsx("br",{}),e.jsx(S,{variant:"outlined",onClick:n,children:"Open simple dialog"}),e.jsx(y,{selectedValue:a,open:o,onClose:r})]})]})})})})]})}export{ee as default};