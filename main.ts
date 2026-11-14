// A working ai-happy-01 entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by
// 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The grader provides /output, but make the run robust if it does not exist yet.
mkdirSync(OUTPUT_DIR, { recursive: true });

const outPath = join(OUTPUT_DIR, 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), outPath);

// The gate takes at most 1 MiB: refuse to leave a bad file behind.
if (statSync(outPath).size > 1048576) throw new Error('entry.png exceeds 1 MiB');
