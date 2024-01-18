import{a as d}from"./assets/vendor-e238d6ef.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const u=document.querySelector(".search-form"),l=document.querySelector(".gallery");document.querySelector(".span-loader");const c=document.getElementById("btn");console.log(c);const p="41747369-46a857856bf510ac3748d6666",f=async o=>{try{return(await d.get("https://pixabay.com/api/",{params:o})).data}catch{}},m=o=>{let s=1;const n=40;let t=!1;return async()=>{try{if(t)return;const e={key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:n},{hits:r,totalHits:a}=await f(e);return s>=Math.ceil(a/n)&&(t=!0),s+=1,r}catch(e){console.log(e)}}},g=(o=[])=>{const s=o.reduce((n,t)=>n+`<li class="img-item">
      <div class="img">
  <a class="img-link" href="${t.largeImageURL}">
    <img
      class="images"
      src="${t.webformatURL}"
      data-source="${t.largeImageURL}"
      alt="${t.tags}"
      width="360"
      height="200"
  /></a></div>
<div class="description">
  <div class="category">
    <p><b>Likes</b></p>
    <p>${t.likes}</p>
  </div>
  <div>
    <p><b>Views</b></p>
    <p>${t.views}</p>
  </div>
  <div>
    <p><b>Comments</b></p>
    <p>${t.comments}</p>
  </div>
  <div>
    <p><b>Downloads</b></p>
    <p>${t.downloads}</p>
  </div>
</div>
</li>`,"");l.insertAdjacentHTML("beforeend",s)};let i=null;u.addEventListener("submit",async o=>{o.preventDefault(),i!=null&&c.removeEventListener("click",i);const n=new FormData(o.currentTarget).get("query").trim();l.innerHTML="";const t=m(n);i=async()=>{const e=await t();g(e)},await i(),c.classList.remove("is-hidden"),c.addEventListener("click",i)});
//# sourceMappingURL=commonHelpers.js.map
