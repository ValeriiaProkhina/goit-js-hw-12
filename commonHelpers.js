import{i as c,a as d,S as f}from"./assets/vendor-ed396e71.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const u=()=>{const{height:a}=document.querySelector(".gallery").firstChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})},o={searchFormRef:document.querySelector(".search-form"),galleryRef:document.querySelector(".gallery"),spanLoaderRef:document.querySelector(".span-loader"),loadMoreBtnRef:document.getElementById("btn")},p=(a=[])=>{const s=a.reduce((n,t)=>n+`<li class="img-item">
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
</li>`,"");o.galleryRef.insertAdjacentHTML("beforeend",s)},m="41747369-46a857856bf510ac3748d6666",y=async a=>{try{return(await d.get("https://pixabay.com/api/",{params:a})).data}catch{}},g=a=>{let s=1;const n=40;let t=!1;return async()=>{try{if(t)return;const e={key:m,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:n},{hits:r,totalHits:l}=await y(e);return o.loadMoreBtnRef.style.display="block",r.length===0?(o.loadMoreBtnRef.style.display="none",o.spanLoaderRef.classList.remove("loader"),c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})):s>=Math.ceil(l/n)&&(t=!0,o.loadMoreBtnRef.style.display="none",c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})),s+=1,o.searchFormRef.reset(),r}catch{}}};let i=null;const h=async a=>{a.preventDefault(),o.spanLoaderRef.classList.add("loader"),i!=null&&o.loadMoreBtnRef.removeEventListener("click",i);const n=new FormData(a.currentTarget).get("query").trim();o.galleryRef.innerHTML="";const t=g(n);i=async()=>{o.loadMoreBtnRef.style.display="none",o.spanLoaderRef.classList.add("loader");const e=await t();o.spanLoaderRef.classList.remove("loader");const r=new f(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0,scrollZoom:!1,fadeSpeed:400});p(e),r.refresh(),document.querySelectorAll(".img-item").length>40&&u()},await i(),o.spanLoaderRef.classList.remove("loader"),o.loadMoreBtnRef.addEventListener("click",i)};o.searchFormRef.addEventListener("submit",h);
//# sourceMappingURL=commonHelpers.js.map
