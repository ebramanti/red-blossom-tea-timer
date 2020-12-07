(this["webpackJsonpred-blossom-tea-timer"]=this["webpackJsonpred-blossom-tea-timer"]||[]).push([[0],{131:function(e,t,n){},132:function(e,t,n){},200:function(e,t,n){"use strict";n.r(t);var r=n(9),a=n(0),c=n.n(a),o=n(23),s=n.n(o),u=(n(131),n(100)),i=n(61),l=n(38),d=n.n(l),f=n(30),p=n(55),b=(n(132),n(121)),m=n(204),j=n(118),O=n(202),h=n(120),v=n(67),x=n(205),g=n(203),y=x.a.Countdown,w=function(e){var t=e.temperature,n=e.leafAmount,c=e.duration,o=Object(a.useState)(!1),s=Object(f.a)(o,2),u=s[0],i=s[1],l=Object(a.useState)(c),d=Object(f.a)(l,2),p=d[0],b=d[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("p",{children:["Temperature: ",t]}),Object(r.jsxs)("p",{children:["Leaf quantity: ",n]}),c&&Object(r.jsx)(g.a.Search,{type:"number",inputMode:"decimal",style:{maxWidth:"150px"},size:"large",defaultValue:null===c||void 0===c?void 0:c.as("seconds"),min:0,step:15,enterButton:u?"Stop":"Start",onChange:function(e){return b(v.Duration.fromObject({seconds:Number(e.target.value)}))},onSearch:function(){return i((function(e){return!e}))}}),Object(r.jsx)(y,{format:"mm:ss",title:"Duration",value:u&&p?Date.now()+p.as("milliseconds"):void 0,onFinish:function(){return i(!1)},valueRender:c?void 0:function(){return"Not specified"}})]})},S={sec:"seconds",secs:"seconds",min:"minutes",mins:"minutes"},C=function(e){return!!e.name&&!!e.baseHref&&!e.name.includes("Collection")},A=function(){var e=Object(p.a)(d.a.mark((function e(t){var n,r,a,c,o,s,u,i,l,p,b,m,j=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=j.length>1&&void 0!==j[1]?j[1]:1,e.next=3,fetch("https://redblossomtea.com/collections/".concat(t,"?page=").concat(c));case 3:return o=e.sent,e.next=6,o.text();case 6:return s=e.sent,u=(new DOMParser).parseFromString(s,"text/html"),i=(null===(n=u.querySelector("li.position"))||void 0===n||null===(r=n.textContent)||void 0===r||null===(a=r.match(/\d+/g))||void 0===a?void 0:a.map(Number))||[1,1],l=Object(f.a)(i,2),p=l[0],b=l[1],m=Array.from(u.querySelectorAll("div.product-card-details > h2.title > a")).map((function(e){return{name:e.textContent,baseHref:e.getAttribute("href")}})).filter(C),e.abrupt("return",{teas:m,numberOfPages:b,page:p});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(p.a)(d.a.mark((function e(t){var n,r,a,c,o,s,u,l,p;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://redblossomtea.com".concat(t.baseHref));case 2:return r=e.sent,e.next=5,r.text();case 5:if(a=e.sent,c=(new DOMParser).parseFromString(a,"text/html"),!(o=null===(n=c.getElementsByClassName("tabs-content")[0])||void 0===n?void 0:n.lastElementChild)){e.next=16;break}return u=Array.from(o.getElementsByTagName("p")).map((function(e){return e.textContent})).join("\n"),l=null===(s=c.querySelector("h3 ~ table:last-of-type"))||void 0===s?void 0:s.querySelectorAll("tbody.screen-large > tr > td"),p=[],l&&(p=Array.from(l).map((function(e){var t,n=Array.from(e.children),r=1===n.length;r&&(n=Array.from(n[0].querySelectorAll('[class^="brew"]')));var a,c=n,o=Object(f.a)(c,3),s=o[1],u=o[2],l=null!==(t=null===s||void 0===s?void 0:s.textContent)&&void 0!==t?t:"",d=r||"Tea Bowl"===l?"span.data-data, span > span:last-child > span":"span.data-data, span:last-child > span",p=Array.from(u.querySelectorAll(d)).map((function(e){return e.textContent||""})),b=Object(f.a)(p,3),m=b[0],j=b[1],O=b[2];if(O){var h=O.split(" "),x=Object(f.a)(h,2),g=x[0],y=x[1];a=v.Duration.fromObject(Object(i.a)({},S[y],g))}return{type:l,leafAmount:m,temperature:j,duration:a}}))),e.abrupt("return",{name:t.name,description:u,brewingInfo:p});case 16:throw new Error("Error: Unable to parse brewing guide content for given tea: ".concat(t.name));case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function F(){var e=Object(a.useState)("all-products"),t=Object(f.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)([]),s=Object(f.a)(o,2),i=s[0],l=s[1],v=Object(a.useState)(),x=Object(f.a)(v,2),g=x[0],y=x[1],S=Object(a.useState)(1),C=Object(f.a)(S,2),F=C[0],P=C[1],q=Object(a.useState)(1),D=Object(f.a)(q,2),E=D[0],B=D[1];Object(a.useEffect)((function(){(function(){var e=Object(p.a)(d.a.mark((function e(){var t,r,a,c,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A(n);case 2:return t=e.sent,r=t.teas,a=t.page,c=t.numberOfPages,l(r),P(a),B(c),e.next=11,k(r[0]);case 11:o=e.sent,y(o);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[n]);var I=function(){var e=Object(p.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k(t);case 2:n=e.sent,y(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(p.a)(d.a.mark((function e(t){var r,a,c,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A(n,t);case 2:r=e.sent,a=r.teas,c=r.page,o=r.numberOfPages,l(a),P(c),B(o);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(b.a,{onClick:function(){return c("all-products")},children:"All"}),Object(r.jsx)(b.a,{onClick:function(){return c("oolong")},children:"Oolong"}),Object(r.jsx)(m.b,{bordered:!0,loading:0===i.length,dataSource:i,renderItem:function(e){return Object(r.jsx)(m.b.Item,{style:{cursor:"pointer"},onClick:function(){return I(e)},children:e.name})}}),Object(r.jsx)(j.a,{simple:!0,current:F,defaultPageSize:12,total:12*E,onChange:N}),g?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("p",{children:g.name}),Object(r.jsx)("p",{children:g.description}),Object(r.jsx)(O.a,{defaultActiveKey:"1",children:g.brewingInfo.map((function(e,t){return Object(r.jsx)(O.a.TabPane,{tab:e.type,children:Object(r.jsx)(w,Object(u.a)({},e),e.type)},t+1)}))})]}):Object(r.jsx)(h.a,{})]})}var P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,206)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(F,{})}),document.getElementById("root")),P()}},[[200,1,2]]]);
//# sourceMappingURL=main.1e03a231.chunk.js.map