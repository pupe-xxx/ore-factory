// 見本の三目並べのうち、新しいゲームでは要らないファイルを外す。
// 使い方: npm run drop-sample （型から作ったリポジトリで、最初に1回）
// 消すのは下の決まったファイルだけ。ほかのファイルには触れない
// （Claude Code の権限では削除を拒否しているので、このコマンドだけを許可している）。
// CPU と対戦するゲームを作る時は使わない（cpu.ts・sim.ts を書き換えて使う）。
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const FILES = ['src/game/cpu.ts', 'src/game/sim.ts', 'scripts/sim.ts', 'src/ui/render.ts'];

for (const file of FILES) {
  const url = new URL(file, root);
  if (existsSync(url)) {
    unlinkSync(url);
    console.log(`外した: ${file}`);
  }
}

// 画面なしの対戦のコマンドも外す（tsx は npm run record が使うので残す）
const pkgUrl = new URL('package.json', root);
const pkg = JSON.parse(readFileSync(pkgUrl, 'utf8'));
if (pkg.scripts?.sim) {
  delete pkg.scripts.sim;
  writeFileSync(pkgUrl, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log('外した: package.json の sim');
}

console.log('src/main.ts はまだ見本を読み込んでいるので、自分のゲームに書き換える');
