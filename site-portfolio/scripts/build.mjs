import {readFileSync,writeFileSync,mkdirSync,readdirSync,copyFileSync} from 'node:fs';
import path from 'node:path';
const assets={};
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf','.gs':'text/plain; charset=utf-8'};
for(const file of readdirSync('web'))assets[file]={data:readFileSync('web/'+file).toString('base64'),type:types[path.extname(file)]};
for(const file of readdirSync('assets'))assets['assets/'+file]={data:readFileSync('assets/'+file).toString('base64'),type:types[path.extname(file)]};
assets['integration.gs']={data:readFileSync('integration/Code.gs').toString('base64'),type:types['.gs']};
mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});
writeFileSync('dist/server/index.js','const ASSETS='+JSON.stringify(assets)+';\n'+readFileSync('worker/runtime.js','utf8'));
copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');console.log('Build pronto: '+Object.keys(assets).length+' arquivos incorporados.');

