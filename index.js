const CRC = Array.from({ length: 8 }, () => new Uint32Array(256))

for (let i = 0; i < 256; i++) {
  let x = i

  for (let z = 0; z < 8; z++) {
    x = (x & 1) ? (0xEDB88320 ^ (x >>> 1)) : (x >>> 1)
  }

  CRC[0][i] = x >>> 0
}

for (let z = 1; z < 8; z++) {
  for (let i = 0; i < 256; i++) {
    CRC[z][i] = (CRC[z - 1][i] >>> 8) ^ CRC[0][CRC[z - 1][i] & 0xFF]
  }
}

module.exports = function crc32 (buf) {
  if (typeof buf === 'string') buf = Buffer.from(buf)

  let crc = ~0
  let i = 0

  for (; i + 8 <= buf.length; i += 8) {
    crc ^= buf[i] |
          (buf[i + 1] << 8) |
          (buf[i + 2] << 16) |
          (buf[i + 3] << 24)

    crc =
      CRC[7][crc & 0xFF] ^
      CRC[6][(crc >>> 8) & 0xFF] ^
      CRC[5][(crc >>> 16) & 0xFF] ^
      CRC[4][crc >>> 24] ^
      CRC[3][buf[i + 4]] ^
      CRC[2][buf[i + 5]] ^
      CRC[1][buf[i + 6]] ^
      CRC[0][buf[i + 7]]
  }

  for (; i < buf.length; i++) {
    crc = CRC[0][(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8)
  }

  return ~crc >>> 0
}
