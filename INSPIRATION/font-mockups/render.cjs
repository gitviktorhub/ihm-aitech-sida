const { chromium } = require('C:/Users/vevve/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const fs = require('fs');
(async()=>{
 const fontData={};
 for(const dir of fs.readdirSync(path.join(__dirname,'fonts'))){
  for(const file of fs.readdirSync(path.join(__dirname,'fonts',dir))){
   if(/\.(ttf|otf)$/i.test(file)) fontData[dir+'/'+file]='data:font/ttf;base64,'+fs.readFileSync(path.join(__dirname,'fonts',dir,file)).toString('base64');
  }
 }
 fs.writeFileSync(path.join(__dirname,'font-data.js'),'const FONT_DATA='+JSON.stringify(fontData)+';');
 const browser=await chromium.launch({headless:true,channel:'msedge',args:['--allow-file-access-from-files']});
 const page=await browser.newPage({viewport:{width:1666,height:1200},deviceScaleFactor:1});
 await page.goto(require('url').pathToFileURL(path.join(__dirname,'index.html')).href);
 console.log(await page.evaluate(()=>Promise.all([...document.fonts].map(f=>f.loaded.then(()=>({font:f.family,status:'ok'}),()=>({font:f.family,status:'error'}))))));
 await page.evaluate(()=>window.mockupsReady);
 await page.locator('.architecture img').first().evaluate(img=>img.decode());
 fs.mkdirSync(path.join(__dirname,'png'),{recursive:true});
 const sections=await page.locator('section').all();
 for(const section of sections){
  const id=await section.getAttribute('id');
  await section.locator('.viewport').screenshot({path:path.join(__dirname,'png',id+'.png')});
 }
 const entries=await page.evaluate(()=>CONFIG.map(([name,id])=>({name,id})));
 const tiles=entries.map(({name,id},i)=>`<div><h2>${String(i+1).padStart(2,'0')} / ${name}</h2><img src="data:image/png;base64,${fs.readFileSync(path.join(__dirname,'png',id+'.png')).toString('base64')}"></div>`).join('');
 const overview=await browser.newPage({viewport:{width:1400,height:1200},deviceScaleFactor:1});
 await overview.setContent(`<style>*{box-sizing:border-box}body{margin:0;padding:30px;background:#e9e9e9;font-family:Arial}h1{font-size:26px;margin:0 0 22px}main{display:grid;grid-template-columns:1fr 1fr;gap:24px}h2{font-size:18px;margin:0 0 10px}img{display:block;width:100%}</style><h1>VIKTOR KVIST / 11 FONTMOCKUPS</h1><main>${tiles}</main>`);
 await overview.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
 await overview.screenshot({path:path.join(__dirname,'overview.png'),fullPage:true});
 console.log(JSON.stringify(await page.evaluate(()=>({fonts:document.fonts.size,loaded:[...document.fonts].every(f=>f.status==='loaded'),mockups:document.querySelectorAll('section').length}))),null,2);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
