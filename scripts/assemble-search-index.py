#!/usr/bin/env python3
from collections import defaultdict
from hashlib import sha1
from pathlib import Path
import re

ROOT = Path("scripts/search-index")
EXPECTED = {
    0: (70000, "e5b3a222c3d81442fddd91473b682e92bf162eb3"),
    1: (70000, "ba7f4e29b3565389bc9be2fd3d50a62ef2ce5473"),
    2: (70000, "44cc69b68a01dca832054b1b7382025a95178173"),
    3: (70000, "229ee16378494ee9329b0912c58a4d493c51c06b"),
    4: (70000, "c71605d0a00385c6607e9bc15226c4ca79b136c0"),
    5: (70000, "c88d9d9612704e6dfce083403ba9f79265978215"),
    6: (70000, "5a8a358cac29fb2149ad48d8433efca8d5b708f7"),
    7: (70000, "ac3193772677a94f8518691367042690e16ceb0f"),
    8: (70000, "d37453278eddfe5f7ed9d17601564aba07c3dc08"),
    9: (70000, "6e78749189e340b51b819a197507ca2d9b61d3c6"),
    10: (41472, "ae4651bc51ec0ed1c2fcd9a9c0192fea71be512d"),
}

def git_blob_sha(data: bytes) -> str:
    return sha1(b"blob %d\0" % len(data) + data).hexdigest()

probes: dict[int, dict[int, bytes]] = defaultdict(dict)
for path in ROOT.iterdir():
    match = re.fullmatch(r"_probe-p(\d+)-(\d+)", path.name)
    if not match:
        continue
    probes[int(match.group(1))][int(match.group(2))] = path.read_bytes()

for part, chunks in sorted(probes.items()):
    if part not in EXPECTED:
        print(f"skip unknown part {part}")
        continue
    if not chunks:
        continue
    n = max(chunks) + 1
    if any(i not in chunks for i in range(n)):
        missing = [i for i in range(n) if i not in chunks]
        print(f"part {part:02d} incomplete, missing {missing}")
        continue
    data = b"".join(chunks[i] for i in range(n))
    size, expected_sha = EXPECTED[part]
    got = git_blob_sha(data)
    print(f"part {part:02d} assembled size={len(data)} sha={got}")
    if len(data) != size:
        print(f"part {part:02d} not complete yet {len(data)}/{size}")
        continue
    if got != expected_sha:
        raise SystemExit(f"SHA mismatch part {part:02d}: {got} != {expected_sha}")
    out = ROOT / f"part-{part:02d}.b64"
    out.write_bytes(data)
    print(f"wrote {out}")
