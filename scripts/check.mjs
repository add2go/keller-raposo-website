import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const errors=[];let links=0,images=0;
async function walk(dir){const list=[];for(const name of await readdir(dir)){const target=path.join(dir,name);if((await stat(target)).isDirectory())list.push(...await walk(target));else list.push(target);}return list;}
const files=await walk(root), htmls=files.filter(f=>f.endsWith('.html'));
const contents=new Map(await Promise.all(htmls.map(async file=>[file,await readFile(file,'utf8')])));
for(const [file,text] of contents){
  if(!text.includes('lang="pt-BR"'))errors.push(`${path.relative(root,file)}: idioma ausente`);
  if(!/name="robots" content="noindex,nofollow"/.test(text))errors.push(`${path.relative(root,file)}: noindex ausente`);
  const ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(ids).size!==ids.length)errors.push(`${path.relative(root,file)}: IDs duplicados`);
  for(const match of text.matchAll(/\b(href|src)="([^"]+)"/g)){
    const [,attribute,raw]=match;
    const value=raw.replace(/&amp;/g,'&');
    if(/^(?:https?:|mailto:|tel:|data:)/.test(value))continue;
    if(attribute==='src')images++;else links++;
    const [pathname,hash]=value.split('#');
    let target=path.resolve(path.dirname(file),decodeURIComponent(pathname||'.'));
    if(pathname==='')target=file;
    try{if((await stat(target)).isDirectory())target=path.join(target,'index.html');await stat(target);}
    catch{errors.push(`${path.relative(root,file)}: caminho ausente ${value}`);continue;}
    if(hash&&target.endsWith('.html')){
      const dest=contents.get(target)||await readFile(target,'utf8');
      if(!dest.includes(`id="${hash}"`))errors.push(`${path.relative(root,file)}: âncora ausente ${value}`);
    }
  }
}
const css=await readFile(path.join(root,'assets/fonts.css'),'utf8');
for(const m of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)){
  if(m[1].startsWith('http'))continue;
  try{await stat(path.resolve(root,'assets',m[1]));}catch{errors.push(`Fonte ausente: ${m[1]}`);}
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`${htmls.length} páginas verificadas; ${links} links internos e ${images} referências de arquivos válidos. IDs, âncoras e noindex presentes.`);
