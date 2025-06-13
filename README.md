# like-crc32

Verify the integrity of data using Cyclic Redundancy Check 32

```
npm i like-crc32
```

## Usage

```js
const crc32 = require('like-crc32')

const checksum = crc32('abc')
// => 891568578

const checksum2 = crc32(Buffer.from([0x61, 0x62, 0x63]))
// => 891568578
```

## License

MIT
