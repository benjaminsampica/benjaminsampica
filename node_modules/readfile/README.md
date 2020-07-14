# readfile

[![Build Status](https://travis-ci.org/evanlucas/readfile.svg)](https://travis-ci.org/evanlucas/readfile)
[![Coverage Status](https://coveralls.io/repos/evanlucas/readfile/badge.svg?branch=master&service=github)](https://coveralls.io/github/evanlucas/readfile?branch=master)

Don't let `fs.readFile` throw because buffer is too big on v4.x

On non v4 versions, simply exports `fs.readFile`, otherwise, make sure
it does not throw due to the buffer being too large to perform `toString`

## Install

```bash
$ npm install --save readfile
```

## Test

```bash
$ npm test
```

## Usage

See [`fs.readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback)

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
