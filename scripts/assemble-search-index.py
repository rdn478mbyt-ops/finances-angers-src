#!/usr/bin/env python3
from hashlib import sha1
from pathlib import Path
import urllib.request

ROOT = Path("scripts/search-index")
ROOT.mkdir(parents=True, exist_ok=True)

PARTS = {
    0: (70000, "e5b3a222c3d81442fddd91473b682e92bf162eb3",
        ["https://paste.rs/ccony", "https://litter.catbox.moe/njo46e.b64"]),
    1: (70000, "ba7f4e29b3565389bc9be2fd3d50a62ef2ce5473",
        ["https://paste.rs/4zr6V", "https://litter.catbox.moe/d2on0f.b64"]),
    2: (70000, "44cc69b68a01dca832054b1b7382025a95178173",
        ["https://paste.rs/fsCGc", "https://litter.catbox.moe/8ylb6r.b64"]),
    3: (70000, "229ee16378494ee9329b0912c58a4d493c51c06b",
        ["https://paste.rs/bXWc4", "https://litter.catbox.moe/t6s78z.b64"]),
    4: (70000, "c71605d0a00385c6607e9bc15226c4ca79b136c0",
        ["https://paste.rs/N1lef", "https://litter.catbox.moe/vumtkh.b64"]),
    5: (70000, "c88d9d9612704e6dfce083403ba9f79265978215",
        ["https://paste.rs/Cfao1", "https://litter.catbox.moe/wff3n0.b64"]),
    6: (70000, "5a8a358cac29fb2149ad48d8433efca8d5b708f7",
        ["https://paste.rs/pI4Qw", "https://litter.catbox.moe/zg2jcn.b64"]),
    7: (70000, "ac3193772677a94f8518691367042690e16ceb0f",
        ["https://paste.rs/7iBhb", "https://litter.catbox.moe/glpreq.b64"]),
    8: (70000, "d37453278eddfe5f7ed9d17601564aba07c3dc08",
        ["https://paste.rs/LymiM", "https://litter.catbox.moe/8rwk58.b64"]),
    9: (70000, "6e78749189e340b51b819a197507ca2d9b61d3c6",
        ["https://paste.rs/gpKEd", "https://litter.catbox.moe/ecxz1a.b64"]),
    10: (41472, "ae4651bc51ec0ed1c2fcd9a9c0192fea71be512d",
         ["https://paste.rs/xH7oa", "https://litter.catbox.moe/1rnbkb.b64"]),
}

def git_blob_sha(data: bytes) -> str:
    return sha1(b"blob %d\0" % len(data) + data).hexdigest()

def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "finances-angers-src-assemble"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()

for part, (size, expected_sha, urls) in PARTS.items():
    data = None
    last_err = None
    for url in urls:
        try:
            candidate = fetch(url)
            got = git_blob_sha(candidate)
            if len(candidate) == size and got == expected_sha:
                data = candidate
                print(f"part-{part:02d} fetched {url}")
                break
            last_err = f"{url} size={len(candidate)} sha={got}"
        except Exception as exc:
            last_err = f"{url} {exc}"
    if data is None:
        raise SystemExit(f"failed part {part:02d}: {last_err}")
    out = ROOT / f"part-{part:02d}.b64"
    out.write_bytes(data)
    print(f"wrote {out} sha={expected_sha}")
