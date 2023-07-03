(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const u=(e,t)=>{const n=Math.ceil(Math.min(e,t)),c=Math.floor(Math.max(e,t)),o=Math.random()*(c-n+1)+n;return Math.floor(o)},w=e=>e[u(0,e.length-1)],R=e=>e.key==="Escape",L=e=>{const t=document.querySelector(`#${e}`);if(t===null)throw new Error(`Template with id ${e} not found`);const n=t.content.firstElementChild;if(n===null)throw new Error(`Template with id ${e} not found`);return n},p=(e,t,n)=>{n||(n=e.classList[0]);const c=e.querySelector(`.${n}__${t}`);if(c===null)throw new Error(`Element ${t} not found in block ${n}`);return c},$=["Всё отлично!","В целом всё неплохо. Но не всё.","Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.","Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.","Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.","Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"],N=["Серега Серый","Саня Белый","Никитос Черный","Гошан Фиолетовый","Леха Бордовый","Максон Зеленый","Дэнчик Желтый","Ромчик Пурпурный","Викуся Камуфляжная"],y=(e,t)=>{const n=[];return function(){let c=u(e,t);if(n.length>=t-e+1)return null;for(;n.includes(c);)c=u(e,t);return n.push(c),c}},F=y(1,25),I=y(1,25),B=y(1,800),k=()=>({id:B(),avatar:`img/avatar-${u(1,6)}.svg`,message:w($),name:w(N)}),D=()=>({id:F(),url:`photos/${I()}.jpg`,description:"Скоро тут появится полноценное описание!",likes:u(15,200),comments:Array.from({length:u(1,30)},k)}),K=()=>Array.from({length:25},D),_=document.querySelector(".comments-count"),g=document.querySelector(".comments-current-count"),U=document.querySelector(".social__comment-count"),h=document.querySelector(".social__comments-loader"),C=document.createDocumentFragment(),V=L("comment"),d=document.querySelector(".social__comments"),P=5;if(!U||!h||!d||!_||!g||!d)throw new Error("Critical elements for comments were not found");let i=0;const E=(e,t)=>{const n=t-e;return n>0&&(i+=Math.min(P,n)),i},j=e=>{const t=e.length;_.textContent=t.toString();const n=E(i,t);return g.textContent=n.toString(),h.classList.remove("hidden"),()=>{e.slice(i,i+P).forEach(o=>{const r=V.cloneNode(!0),s=p(r,"picture","social"),f=p(r,"text","social");s.src=o.avatar,s.alt=o.name,f.textContent=o.message,C.append(r)}),i=E(i,t),g.textContent=i.toString(),d.append(C),i===t&&h.classList.add("hidden")}},z=()=>{d.innerHTML="",i=0},m=document.querySelector(".big-picture"),q=document.querySelector(".big-picture__cancel");if(!m||!q)throw new Error("Critical. Big picture or close button were not found.");const v=m.querySelector(".big-picture__img img"),M=m.querySelector(".likes-count"),b=m.querySelector(".comments-count"),T=m.querySelector(".social__caption"),l=document.querySelector(".social__comments-loader");if(!v||!M||!b||!T||!l)throw new Error("Critical big picture elements were not found.");const G=e=>{R(e)&&(e.preventDefault(),x())};let a;const H=e=>{if(!e)throw new Error("Critical user data not found.");m.classList.remove("hidden"),document.body.classList.add("modal-open"),v.src=e.url,M.textContent=e.likes.toString(),b.textContent=e.comments.length.toString(),T.textContent=e.description,a=j(e.comments),z(),a(),l.addEventListener("click",a),document.addEventListener("keydown",G),q.addEventListener("click",x)};function x(){m.classList.add("hidden"),document.body.classList.remove("modal-open"),l==null||l.removeEventListener("click",a)}const A=document.querySelector(".pictures"),O=L("picture"),S=document.createDocumentFragment();if(!A||!O)throw new Error("Critical. Picture elements not found.");const J=e=>{const{url:t,description:n,likes:c,comments:o}=e,r=O.cloneNode(!0),s=p(r,"img");if(!s)throw new Error("Critical. Picture elements not found.");return s.src=t,s.alt=n,r.querySelector(".picture__likes").textContent=c.toString(),r.querySelector(".picture__comments").textContent=o.length.toString(),r.addEventListener("click",f=>{f.preventDefault(),H(e)}),r},Q=e=>{e.forEach(t=>{S.append(J(t))}),A.append(S)},W=K();Q(W);
