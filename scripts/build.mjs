import fs from 'node:fs';
import path from 'node:path';
import {build,createServer} from 'vite';
import {validateDraft,normalize} from './draft-article.mjs';
process.env.VITE_BUILD_DATE=process.env.BUILD_DATE||new Date().toISOString().slice(0,10);
if(fs.existsSync('src/content/articles'))for(const name of fs.readdirSync('src/content/articles').filter(n=>n.endsWith('.json'))){const g=JSON.parse(fs.readFileSync('src/content/articles/'+name,'utf8'));if(g.status==='approved'){if(g.generated!==true||typeof g.reviewedBy!=='string'||!g.reviewedBy.trim()||!/^\d{4}-\d{2}-\d{2}$/.test(g.reviewedOn)||g.reviewedOn>process.env.VITE_BUILD_DATE||!/^\d{4}-\d{2}-\d{2}$/.test(g.publishOn))throw Error('Article needs actual reviewer and dates: '+name);validateDraft({...g,sections:g.sections.map(([heading,body])=>({heading,body}))},g.sources.map(s=>normalize(s.url)));}}
await build();
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json=v=>JSON.stringify(v).replace(/</g,'\\u003c');
const origin='https://pannuholistic.com';
try{
 const {pages,render}=await server.ssrLoadModule('/src/entry-server.jsx');
 const template=fs.readFileSync('dist/index.html','utf8');
 const seen=new Set();
 for(const p of [...pages,{path:'/404/',title:'Page not found',description:'Find care and appointment information at Pannu Holistic.',kind:'404'}]){
  if(seen.has(p.path)||!/^\/(?:[a-z0-9-]+\/)*$/.test(p.path))throw Error('Duplicate or unsafe page path');seen.add(p.path);
  const url=origin+p.path;const title=p.path==='/'?p.title:p.title+' | Pannu Holistic';const description=p.description.slice(0,180);
  const business={'@type':'MedicalBusiness','@id':origin+'/#practice',name:'Pannu Holistic Dental Myology',url:origin+'/',telephone:'+1-415-755-5549',address:{'@type':'PostalAddress',streetAddress:'229 Tewksbury Ave. Ste A',addressLocality:'Point Richmond',addressRegion:'CA',postalCode:'94801',addressCountry:'US'},sameAs:['https://www.instagram.com/holistic_dental_wellness/','https://www.facebook.com/PannuHolistic','https://www.yelp.com/biz/pannu-holistic-dental-myology-point-richmond']};
  const graph=[business,{'@type':'WebPage','@id':url,name:p.title,url,description,isPartOf:{'@id':origin+'/#website'}},{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Pannu Holistic'}];
  if(p.path!=='/')graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:p.title,item:url}]});
  if(p.kind==='service')graph.push({'@type':'Service',name:p.title,description,provider:{'@id':origin+'/#practice'},areaServed:'Point Richmond, California',url});
  if(p.kind==='article')graph.push({'@type':'Article',headline:p.title,description,datePublished:p.publishOn,dateModified:p.updatedOn||p.publishOn,mainEntityOfPage:url,author:{'@type':'Organization',name:'Pannu Holistic',url:origin+'/about/'},publisher:{'@id':origin+'/#practice'}});
  let html=template.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${esc(description)}"/>`).replace('<div id="root"></div>',`<div id="root">${render(p.path)}</div>`);
  html=html.replace('</head>',`<link rel="canonical" href="${url}"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(description)}"/><meta property="og:url" content="${url}"/><meta property="og:type" content="${p.kind==='article'?'article':'website'}"/><meta property="og:image" content="${origin}/spa.jpg"/><meta name="twitter:card" content="summary_large_image"/><link rel="alternate" type="application/rss+xml" title="Pannu patient guides" href="/resources/feed.xml"/><script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script>${p.kind==='404'?'<meta name="robots" content="noindex"/>':''}</head>`);
  const filename=p.kind==='404'?'dist/404.html':path.join('dist',p.path,'index.html');fs.mkdirSync(path.dirname(filename),{recursive:true});fs.writeFileSync(filename,html);
 }
 fs.writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p=>`<url><loc>${origin}${p.path}</loc>${p.kind==='article'?`<lastmod>${p.updatedOn||p.publishOn}</lastmod>`:''}</url>`).join('')}</urlset>`);
 fs.writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
 fs.mkdirSync('dist/resources',{recursive:true});fs.writeFileSync('dist/resources/feed.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Pannu Holistic patient guides</title><link>${origin}/resources/</link><description>Practical reading for your next visit.</description>${pages.filter(p=>p.kind==='article').map(p=>`<item><title>${esc(p.title)}</title><link>${origin}${p.path}</link><guid>${origin}${p.path}</guid><description>${esc(p.description)}</description><pubDate>${new Date(p.publishOn+'T12:00:00Z').toUTCString()}</pubDate></item>`).join('')}</channel></rss>`);
 fs.writeFileSync('dist/.nojekyll','');
 // Saved source-platform HTML is editorial input, not a public website page.
 for(const file of ['google.html','yelp.html'])fs.rmSync(path.join('dist',file),{force:true});
 fs.writeFileSync('dist/pages.json',JSON.stringify(pages.map(p=>({path:p.path,title:p.title})),null,2));
 console.log('Prerendered '+pages.length+' complete pages. Hero video preserved.');
}finally{await server.close()}
