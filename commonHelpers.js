import{i as c,a as d,S as f}from"./assets/vendor-bad0427b.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const u=()=>{const{height:a}=document.querySelector(".gallery").firstChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})},r={searchFormRef:document.querySelector(".search-form"),galleryRef:document.querySelector(".gallery"),spanLoaderRef:document.querySelector(".span-loader"),loadMoreBtnRef:document.getElementById("btn")},p=(a=[])=>{const s=a.reduce((n,t)=>n+`<li class="img-item">
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
</li>`,"");r.galleryRef.insertAdjacentHTML("beforeend",s)},m="41747369-46a857856bf510ac3748d6666",y=async a=>{try{return(await d.get("https://pixabay.com/api/",{params:a})).data}catch{}},g=a=>{let s=1;const n=40;let t=!1;return async()=>{try{if(t)return;const e={key:m,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:n},{hits:o,totalHits:l}=await y(e);return r.loadMoreBtnRef.style.display="block",o.length===0?(r.loadMoreBtnRef.style.display="none",r.spanLoaderRef.classList.remove("loader"),c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})):s>=Math.ceil(l/n)&&(t=!0,r.loadMoreBtnRef.style.display="none",c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})),s+=1,r.searchFormRef.reset(),o}catch{}}},h=new f(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0,scrollZoom:!1,fadeSpeed:400});let i=null;const L=async a=>{a.preventDefault(),r.spanLoaderRef.classList.add("loader"),i!=null&&r.loadMoreBtnRef.removeEventListener("click",i);const n=new FormData(a.currentTarget).get("query").trim();r.galleryRef.innerHTML="";const t=g(n);i=async()=>{r.loadMoreBtnRef.style.display="none",r.spanLoaderRef.classList.add("loader");const e=await t();r.spanLoaderRef.classList.remove("loader"),p(e),document.querySelectorAll(".img-item").length>40&&u()},await i(),h.refresh(),r.spanLoaderRef.classList.remove("loader"),r.loadMoreBtnRef.addEventListener("click",i)};r.searchFormRef.addEventListener("submit",L);
//# sourceMappingURL=commonHelpers.js.map
