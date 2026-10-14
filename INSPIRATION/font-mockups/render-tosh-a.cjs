const {chromium}=require('C:/Users/vevve/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{
 const source='C:/Users/vevve/OneDrive/privat/font';
 const files={wave:'Wavetosh.ttf',regular:'TRYToshA-Regular-BF677df27a66806.ttf',bold:'TRYToshA-Bold-BF677df27a68b37.ttf'};
 const data=Object.fromEntries(Object.entries(files).map(([key,file])=>[key,'data:font/ttf;base64,'+fs.readFileSync(path.join(source,file)).toString('base64')]));
 fs.writeFileSync(path.join(__dirname,'tosh-a-data.js'),'const TOSH_FONTS='+JSON.stringify(data)+';');
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
  const page=await browser.newPage({viewport:{width:1586,height:1300},deviceScaleFactor:1});
  await page.goto(pathToFileURL(path.join(__dirname,'portfolio.html')).href);
  await page.evaluate(()=>window.mockupsReady);
  await page.locator('img').evaluate(img=>img.decode());
  await page.screenshot({path:path.join(__dirname,'portfolio.png'),fullPage:true});
  console.log(await page.evaluate(()=>({fonts:[...document.fonts].map(f=>({name:f.family,weight:f.weight,status:f.status})),overflow:document.documentElement.scrollWidth>innerWidth})));
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>fitTitle());
  await page.screenshot({path:path.join(__dirname,'portfolio-mobile.png'),fullPage:true});
  console.log(await page.evaluate(()=>({mobileOverflow:document.documentElement.scrollWidth>innerWidth,links:[...document.querySelectorAll('nav a')].every(a=>document.querySelector(a.getAttribute('href')))})));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
