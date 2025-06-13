const test = require('brittle')
const crc32 = require('./index.js')

test('basic', async function (t) {
  t.is(crc32(''), 0x0)
  t.is(crc32('a'), 0xe8b7be43)
  t.is(crc32('ab'), 0x9e83486d)
  t.is(crc32('abc'), 0x352441c2)
  t.is(crc32('abcd'), 0xed82cd11)
  t.is(crc32('abcde'), 0x8587d865)
  t.is(crc32('abcdef'), 0x4b8e39ef)
  t.is(crc32('abcdefg'), 0x312a6aa6)

  t.is(crc32('abcdefgh'), 0xaeef2a50)
  t.is(crc32('abcdefghabcdefgh'), 0xb80137e4)
  t.is(crc32('abcdefghabcdefghabcdefgh'), 0x2f5a0a67)
  t.is(crc32('abcdefghabcdefghabcdefghabcdefgh'), 0x3e354ff8)
  t.is(crc32('abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgh'), 0x6b64f5d)
})

test.skip('benchmark', function (t) {
  const png = Buffer.alloc(1024 * 1024).fill(97)

  for (let i = 0; i < 20; i++) {
    const start = process.hrtime.bigint()

    crc32(png)

    const end = process.hrtime.bigint()

    t.comment(Number(end - start) / 1e6, 'ms')
  }
})
