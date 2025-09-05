const deals = [
  // هنا ضيف كل العروض اللي جمعناها
  {
    id:"planet-donuts",
    shop:"Planet Donuts",
    title:"عرض بوكس 12 قطعة بسعر خاص",
    img:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1200&auto=format&fit=crop",
    url:"https://planetdonuts.com/home/dashboard",
    category:"حلويات",
    tags:["حلويات","دونتس","عمّان"],
    source:"الموقع الرسمي"
  },
  // … ضيف باقي العروض هنا بنفس البنية
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
      <div class="tags">
        ${