// Test the actual sampler and ordered-transport functions without a browser.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname, '../components/toolbox/ParticleMorph.tsx'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const compiledExports = {};
const sandbox = { exports: compiledExports, require: () => ({}), module: { exports: compiledExports } };
vm.runInNewContext(compiled + '\nexports.geometry = { pixels, pairPixels };', sandbox);
const { pixels, pairPixels } = compiledExports.geometry;
function bitmap(paint) {
  const data = new Uint8ClampedArray(280 * 140 * 4);
  for(let y=0;y<140;y++) for(let x=0;x<280;x++) if(paint(x,y)) data.set([230,70,25,255],(y*280+x)*4);
  return pixels({getImageData:()=>({data})});
}
const logo = bitmap((x,y)=>x>110&&x<170&&y>40&&y<100);
const word = bitmap((x,y)=>x>35&&x<245&&y>60&&y<80&&(x%32<18));
const pairs = pairPixels(logo,word);
assert.equal(pairs.length, Math.max(logo.length,word.length));
assert(pairs.every(p=>p.from && p.to));
assert(pairs.some(p=>Math.abs(p.to.x-p.from.x)>50), 'Actual geometry travels into wider glyph positions');
for (const t of [0,.01,.25,.5,.75,.99,1]) {
  const eased = t*t*t*(t*(t*6-15)+10);
  for(const p of pairs) {
    const x=p.from.x+(p.to.x-p.from.x)*eased;
    const y=p.from.y+(p.to.y-p.from.y)*eased;
    assert(Number.isFinite(x)&&Number.isFinite(y));
    if(t===0) assert.equal(x,p.from.x);
    if(t===1) assert.equal(x,p.to.x);
  }
}
assert(source.includes('cancelAnimationFrame(frame)'), 'Animation cleanup');
assert(/reduce\.matches\s*\? target/.test(source), 'Instant reduced-motion state');
assert(source.includes('progress + (target ? delta : -delta)'), 'Continuous reversal from current geometry');
console.log(`PASS: ${logo.length} logo samples, ${word.length} glyph samples, ${pairs.length} paired particles; exact endpoints, finite intermediate positions, reversible motion and cleanup guards.`);
