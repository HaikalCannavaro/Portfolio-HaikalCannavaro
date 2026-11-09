const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const assert = require('node:assert/strict');
const path = require('node:path');
const output = {};
const file = path.join(__dirname, '../components/toolbox/toolPalettes.ts');
vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText, {exports:output});
function luminance(hex) {
  const [r,g,b] = hex.slice(1).match(/../g).map(n=>parseInt(n,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
  return .2126*r+.7152*g+.0722*b;
}
let minimum = Infinity;
assert.equal(Object.keys(output.toolPalettes).length,18);
for (const [name,palette] of Object.entries(output.toolPalettes)) for (const mode of ['light','dark']) {
  assert(palette[mode].length>=2,`${name}: gradient stops`);
  for (const color of palette[mode]) {
    const a=luminance(color), b=luminance(mode==='light'?'#f2efe6':'#171916');
    const contrast=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    minimum=Math.min(minimum,contrast);
    assert(contrast>=3,`${name} ${mode}: large-text contrast`);
  }
}
console.log(`PASS: all 18 light/dark gradients meet 3:1 large-text stop contrast; minimum ${minimum.toFixed(2)}:1.`);
