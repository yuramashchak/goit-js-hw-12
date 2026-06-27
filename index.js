import{a as P,S as q,i as c}from"./assets/vendor-DpalZR8d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const M="https://pixabay.com/api/",E="56295692-388ed2392ca37d8a60cb7a75d";async function h(e,r){return(await P.get(M,{params:{key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}const u=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load"),g=new q(".gallery a",{captionsData:"alt",captionDelay:250});function B(e){return`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}">
      </a>

      <div class="underpicture">
        <div class="info">
          <p class="words">Likes</p>
          <p class="numbers">${e.likes}</p>
        </div>

        <div class="info">
          <p class="words">Views</p>
          <p class="numbers">${e.views}</p>
        </div>

        <div class="info">
          <p class="words">Comments</p>
          <p class="numbers">${e.comments}</p>
        </div>

        <div class="info">
          <p class="words">Downloads</p>
          <p class="numbers">${e.downloads}</p>
        </div>
      </div>
    </li>
  `}function L(e){return e.map(B).join("")}function $(e){u.innerHTML=L(e),g.refresh()}function H(e){u.insertAdjacentHTML("beforeend",L(e)),g.refresh()}function p(){u.innerHTML=""}function w(){m.classList.remove("hidden")}function v(){m.classList.add("hidden")}function O(){y.classList.remove("hide")}function n(){y.classList.add("hide")}const x=document.querySelector(".form"),A=document.querySelector(".search-text"),R=document.querySelector(".load");let i="",s=1,l=0;const b=15;n();x.addEventListener("submit",async e=>{if(e.preventDefault(),s=1,i=A.value.trim(),i===""){n(),p();return}p(),n(),w();try{const r=await h(i,s);if(l=Math.ceil(Math.min(r.totalHits,500)/b),r.hits.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}$(r.hits),S()}catch{c.error({title:"Error",message:"Something went wrong. Please try again!"})}finally{v()}});R.addEventListener("click",async()=>{if(s>=l){n();return}s+=1,n(),w();try{const e=await h(i,s);l=Math.ceil(Math.min(e.totalHits,500)/b),H(e.hits);const r=document.querySelector(".gallery-item");if(r){const{height:a}=r.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}S()}catch{c.error({title:"Error",message:"Something went wrong. Please try again!"})}finally{v()}});function S(){s<l?O():(n(),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results"}))}
//# sourceMappingURL=index.js.map
