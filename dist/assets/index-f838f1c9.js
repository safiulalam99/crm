import{g,c as f,s as c,_ as n,r as x,u as y,d as C,j as l,h as p,i as b,an as r}from"./index-56f029cb.js";function A(s){return g("MuiCardActions",s)}f("MuiCardActions",["root","spacing"]);const S=["disableSpacing","className"],T=s=>{const{classes:a,disableSpacing:o}=s;return b({root:["root",!o&&"spacing"]},A,a)},$=c("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(s,a)=>{const{ownerState:o}=s;return[a.root,!o.disableSpacing&&a.spacing]}})(({ownerState:s})=>n({display:"flex",alignItems:"center",padding:8},!s.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),w=x.forwardRef(function(a,o){const e=y({props:a,name:"MuiCardActions"}),{disableSpacing:t=!1,className:d}=e,m=C(e,S),i=n({},e,{disableSpacing:t}),u=T(i);return l.jsx($,n({className:p(u.root,d),ownerState:i,ref:o},m))}),R=w,M=c("span")(({theme:s})=>`
      display: inline-block;
      align-items: center;

      &.flexItem {
        display: inline-flex;
      }
      
      &.MuiText {

        &-black {
          color: ${s.palette.common.black}
        }

        &-primary {
          color: ${s.palette.primary.main}
        }
        
        &-secondary {
          color: ${s.palette.secondary.main}
        }
        
        &-success {
          color: ${s.palette.success.main}
        }
        
        &-warning {
          color: ${s.palette.warning.main}
        }
              
        &-error {
          color: ${s.palette.error.main}
        }
        
        &-info {
          color: ${s.palette.info.main}
        }
      }
`),N=({className:s,color:a="secondary",flex:o,children:e,...t})=>l.jsx(M,{className:p("MuiText-"+a,{flexItem:o}),...t,children:e});N.propTypes={children:r.node,className:r.string,color:r.oneOf(["primary","secondary","error","warning","success","info","black"])};export{R as C,N as T};
