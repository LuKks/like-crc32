const CRC = new Uint32Array(256)

for (let i = 0; i < 256; i++) {
  let x = i

  for (let z = 0; z < 8; z++) {
    x = (x & 1) ? (0xEDB88320 ^ (x >>> 1)) : (x >>> 1)
  }

  CRC[i] = x >>> 0
}

module.exports = function crc32 (buf) {
  if (typeof buf === 'string') buf = Buffer.from(buf)

  let crc = ~0

  for (let i = 0; i < buf.length; i++) {
    crc = CRC[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8)
  }

  return ~crc >>> 0
}
