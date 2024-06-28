import{a as v,S as E,i as s}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const S="44479541-afd008fbdfda4a6c986ece69f";async function p(e,t){const{data:a}=await v.get("https://pixabay.com/api/",{params:{key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}});return a}const I=document.querySelector(".gallery");function y(e){const t=document.createDocumentFragment();e.forEach(a=>{const n=q(a);t.appendChild(n)}),I.appendChild(t)}function q(e){const t=document.createElement("div");return t.classList.add("card"),t.innerHTML=`
    <a class="gallery-link" href="${e.largeImageURL}">
      <img class="card-image" src="${e.webformatURL}" alt="${e.tags}" loading="lazy">
    </a>
    <div class="card-info">
      <p class="card-text"><b>Likes:</b> ${e.likes}</p>
      <p class="card-text"><b>Views:</b> ${e.views}</p>
      <p class="card-text"><b>Comments:</b> ${e.comments}</p>
      <p class="card-text"><b>Downloads:</b> ${e.downloads}</p>
    </div>
  `,t}const P=document.querySelector(".search-form"),$=document.querySelector(".gallery"),h=document.querySelector(".loader"),u=document.querySelector(".load-more"),b=new E(".gallery a",{captionsData:"alt",captionDelay:250});let l=1,c=0,d="",i=0;h.style.display="none";u.classList.remove("visible");P.addEventListener("submit",x);u.addEventListener("click",M);async function x(e){if(e.preventDefault(),m(),R(),l=1,d=e.target.querySelector(".search-input").value.trim(),L(),!d){s.warning({title:"Warning!",message:"Please enter image name!",position:"topRight"});return}try{const t=await p(d,l);if(t.hits.length===0){s.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}c=t.totalHits,i=t.hits.length,y(t.hits),b.refresh(),w(),s.info({message:`We found ${c} images.`,position:"topRight"})}catch{g(),s.error({message:"Failed to fetch images. Please try again later.",position:"topRight"})}}function R(){$.innerHTML="",l=1,m()}async function M(){L(),m();try{const e=await p(d,l);if(g(),e.hits.length===0)return;l++,i+e.hits.length>c&&(e.hits=e.hits.slice(0,c-i)),i+=e.hits.length,y(e.hits),b.refresh(),i>=c?(m(),s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w();const t=document.querySelectorAll(".card"),a=Array.from(t).slice(-15);a.length>0&&a[0].scrollIntoView({behavior:"smooth",block:"start"})}catch(e){console.error("Error fetching more images:",e),g(),s.error({message:"Failed to fetch more images. Please try again later.",position:"topRight"})}}function L(){h.style.display="block"}function g(){h.style.display="none"}function w(){u.style.display="block"}function m(){u.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
