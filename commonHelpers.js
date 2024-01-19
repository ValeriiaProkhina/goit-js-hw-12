import{S as f,i as c,a as p}from"./assets/vendor-ed396e71.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const y=()=>{const{height:o}=document.querySelector(".gallery").firstChild.getBoundingClientRect();window.scrollBy({top:o*3,behavior:"smooth"})},s={searchFormRef:document.querySelector(".search-form"),galleryRef:document.querySelector(".gallery"),spanLoaderRef:document.querySelector(".span-loader"),loadMoreBtnRef:document.getElementById("btn")},m=new f(".gallery a",{nav:!0,captionDelay:250,captionsData:"alt",close:!0,enableKeyboard:!0,docClose:!0,scrollZoom:!1,fadeSpeed:400}),g=(o=[])=>{const a=o.reduce((n,t)=>n+`<li class="img-item">
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
</li>`,"");s.galleryRef.insertAdjacentHTML("beforeend",a),m.refresh()},d=()=>{s.spanLoaderRef.style.display="block",s.spanLoaderRef.style.visibility="visible"},u=()=>{s.spanLoaderRef.style.display="none",s.spanLoaderRef.style.visibility="hidden"},h="41747369-46a857856bf510ac3748d6666",b=async o=>{try{return d(),(await p.get("https://pixabay.com/api/",{params:o})).data}catch{}},v=o=>{let a=1;const n=40;let t=!1;return async()=>{try{if(t)return;const e={key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:n};if(!o)return c.warning({position:"topRight",message:"Please enter your query!"});const{hits:r,totalHits:i}=await b(e);return r.length===0?c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}):a>=Math.ceil(i/n)?(t=!0,c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(s.loadMoreBtnRef.style.display="block",a+=1,r)}catch{}finally{u(),s.searchFormRef.reset()}}};let l=null;const R=async o=>{o.preventDefault(),d(),l!=null&&s.loadMoreBtnRef.removeEventListener("click",l);const n=new FormData(o.currentTarget).get("query").trim();s.galleryRef.innerHTML="";const t=v(n);l=async()=>{s.loadMoreBtnRef.style.display="none";const e=await t();g(e),document.querySelectorAll(".img-item").length>40&&y()},await l(),u(),s.loadMoreBtnRef.addEventListener("click",l)};s.searchFormRef.addEventListener("submit",R);
//# sourceMappingURL=commonHelpers.js.map
