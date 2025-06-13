module.exports = function crc32 (buf) {
  if (typeof buf === 'string') buf = Buffer.from(buf)

  let crc = ~0

  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]

    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }

  return ~crc >>> 0
}
