import{s as i,T as t,B as s,j as e,a as n,L as c,W as l,b as p}from"./index-56f029cb.js";import{C as o}from"./Container-818505ea.js";import{G as a}from"./Grid-8466383b.js";import{C as d}from"./Card-0c28d1de.js";const x=i(t)(({theme:r})=>`
    font-size: ${r.typography.pxToRem(50)};
`),g=i(t)(({theme:r})=>`
    font-size: ${r.typography.pxToRem(17)};
`),h=i(s)(({theme:r})=>`
    background-color: ${r.colors.success.main};
    color: ${r.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${r.typography.pxToRem(11)};
    padding: ${r.spacing(.5)} ${r.spacing(1.5)};
    margin-bottom: ${r.spacing(2)};
`),m=i(s)(({theme:r})=>`
    width: ${r.spacing(8)};
    height: ${r.spacing(8)};
    border-radius: ${r.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${r.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`),u=i(s)(({theme:r})=>`
    width: ${r.spacing(8)};
    height: ${r.spacing(8)};
    border-radius: ${r.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${r.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`);function b(){return e.jsx(o,{maxWidth:"lg",sx:{textAlign:"center"},children:e.jsx(a,{spacing:{xs:6,md:10},justifyContent:"center",alignItems:"center",container:!0,children:e.jsxs(a,{item:!0,md:10,lg:8,mx:"auto",children:[e.jsx(h,{color:"success",children:"Version 2.0.0"}),e.jsx(x,{sx:{mb:2},variant:"h1",children:"Tokyo Free Black React Typescript Admin Dashboard"}),e.jsx(g,{sx:{lineHeight:1.5,pb:4},variant:"h4",color:"text.secondary",fontWeight:"normal",children:"High performance React template built with lots of powerful Material-UI components across multiple product niches for fast & perfect apps development processes"}),e.jsx(n,{component:c,to:"/dashboards/tasks",size:"large",variant:"contained",children:"Browse Live Preview"}),e.jsx(n,{sx:{ml:2},component:"a",target:"_blank",rel:"noopener",href:"https://bloomui.com/product/tokyo-free-black-react-typescript-material-ui-admin-dashboard",size:"large",variant:"text",children:"Key Features"}),e.jsxs(a,{container:!0,spacing:3,mt:5,children:[e.jsxs(a,{item:!0,md:6,children:[e.jsx(m,{children:e.jsx("img",{src:"/static/images/logo/material-ui.svg",alt:"Material-UI"})}),e.jsxs(t,{variant:"h4",children:[e.jsx(s,{sx:{pb:2},children:e.jsx("b",{children:"Powered by MUI (Material-UI)"})}),e.jsx(t,{component:"span",variant:"subtitle2",children:"A simple and customizable component library to build faster, beautiful, and accessible React apps."})]})]}),e.jsxs(a,{item:!0,md:6,children:[e.jsx(u,{children:e.jsx("img",{src:"/static/images/logo/typescript.svg",alt:"Typescript"})}),e.jsxs(t,{variant:"h4",children:[e.jsx(s,{sx:{pb:2},children:e.jsx("b",{children:"Built with Typescript"})}),e.jsx(t,{component:"span",variant:"subtitle2",children:"Tokyo Free Black features a modern technology stack and is built with React + Typescript."})]})]})]})]})})})}const f=i(s)(()=>`
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`);function T(){return e.jsxs(f,{children:[e.jsx(l,{children:e.jsx("title",{children:"Tokyo Free Black React Typescript Admin Dashboard"})}),e.jsxs(o,{maxWidth:"lg",children:[e.jsx(s,{display:"flex",justifyContent:"center",py:5,alignItems:"center",children:e.jsx(p,{})}),e.jsx(d,{sx:{p:10,mb:10,borderRadius:12},children:e.jsx(b,{})})]})]})}export{T as default};
