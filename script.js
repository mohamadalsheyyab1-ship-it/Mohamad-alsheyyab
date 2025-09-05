const deals = [
  {id:"papaya", shop:"مطعم بابايا", title:"خصم 20%", img:"https://images.unsplash.com/photo-1600891963932-05c0d1f1b1f0?q=80&w=1200&auto=format&fit=crop", url:"https://www.rewards.orange.jo/ar/deals", category:"مطاعم", tags:["مطاعم","خصم","عمان"], source:"Orange Deals"},
  {id:"cafe-barbera", shop:"Cafe Barbera", title:"اشتري 1 واحصل على الثاني مجانًا", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop", url:"https://www.rewards.orange.jo/ar/deals", category:"مطاعم", tags:["قهوة","مشروبات","عروض"], source:"Orange Deals"},
  {id:"talabat", shop:"Talabat الأردن", title:"عروض يومية من طلبات", img:"https://images.unsplash.com/photo-1598514982655-cf5f0c6e36ef?q=80&w=1200&auto=format&fit=crop", url:"https://www.talabat.com/ar/jordan/offers", category:"مطاعم", tags:["توصيل","مطاعم","عروض"], source:"Talabat"},
  {id:"ikooz-jordan", shop:"محل @ikooz.jordan (الجبيهة)", title:"تنزيلات من نصف دينار إلى 3 دنانير", img:"https://images.unsplash.com/photo-1585238342028-5d0d35d81614?q=80&w=1200&auto=format&fit=crop", url:"https://www.instagram.com/reel/DJGHUr1ChQZ", category:"أخرى", tags:["تنزيلات","خصومات","الجبيهة"], source:"Instagram"}
];

const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const queryInput = document.getElementById('q');
const chips = document.getElementById('chips');
const toast = document.getElementById('toast');
const copyBtn = document.getElementById('copyLink');
document.getElementById('year').textContent = new Date().getFullYear();

function makeCard(d){
  const el = document.createElement('article');
  el.className = 'card';
  el.dataset.cat = d.category;
  el.dataset.text = (d.shop + ' ' + d.title + ' ' + d.tags.join(' ')).toLowerCase();
  el.innerHTML = `
    <div class="thumb">
      <img alt="صورة ${d.shop}" loading="lazy" src="${d.img}"/>
      <div class="badge">${d.category}</div>
    </div>
    <div class="content">
      <div class="title">${d.title}</div>
      <div class="shop">المتجر: ${d.shop} • المصدر: ${d.source}</div>
      <div class="tags">${d.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="actions">
        <a class="btn primary" target="_blank" href="${d.url}">شوف العرض</a>
      </div>
    </div>
  `;
  return el;
}

function filterDeals(){
  const val = queryInput.value.toLowerCase();
  const activeCat = document.querySelector('.chip.active').dataset.cat;
  grid.innerHTML = '';
  let count = 0;
  deals.forEach(d=>{
    if( (activeCat==='الكل' || d.category===activeCat) && (d.shop+d.title+d.tags.join('')).toLowerCase().includes(val)){
      grid.appendChild(makeCard(d));
      count++;
    }
  });
  empty.style.display = count? 'none':'block';
}

queryInput.addEventListener('input', filterDeals);

chips.querySelectorAll('.chip').forEach(ch=>{
  ch.addEventListener('click', ()=>{
    chips.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    ch.classList.add('active');
    filterDeals();
  });
});

copyBtn.addEventListener('click', ()=>{
  const q = queryInput.value.trim();
  const url = window.location.href.split('#')[0] + (q ? '#'+encodeURIComponent(q) : '');
  navigator.clipboard.writeText(url).then(()=>{
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 1500);
  });
});

// Initial render
filterDeals();