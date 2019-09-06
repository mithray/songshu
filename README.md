# Songshu

_A usable node module for secure credential storage_

![Songshu](https://raw.githubusercontent.com/mithrayls/songshu/master/squirrel_small.png)

## Introduction

`songshu` is a friendly squirrel🐿️ that can work as a drop in replacement for configstore but also provides extra options to make it more convenient to use such as providing
This is basically an encrypted wrapper around the npm packages `inquirer` and `configstore` and put into one useful package. `songshu` provides the following features.

-   **Security hardened** 🔒. `songshu` encrypts everything in the configuration storage by default, prompting a user for password to use to seed the encryption key.
-   **Convenient** 🌰. `songshu` automatically stores answers received by `inquirer` into encrypted `configstore`.
-   **Extra Convenient** 🆒. If you provide an array of questions to `songshu` you can choose to have them only prompt the user if the answer is not already saved in storage.
-   **Compatible**. It can be used as a drop in replacement for the extremely popular `configstore`(which it uses under the hood). lays well with others❤️. `songshu` has been trained to mimic🦜 the behavior of config store in most cases. Not thoroughly tested, but the API exposes the same functions⚙️. If you switch to `songshu`😍🐿️ , you will however need to reenter your config information🙃.

---

## Contents

-   [Introduction](#introduction)
-   [Contents](#contents)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Roadmap](#roadmap)

## Installation

```sh
yarn install songshu

# or

npm install songshu
```

## Usage

The API is identical to the npm package `configstore`, so you can copy their examples except with some exceptions.

```javascript
const Songshu = require('songshu')
const packageJson = require('./package.json')
songshu = new Songshu(packageJson.name)
```

You can pass an object to the `songshu` constructor for additional configuration.

```javascript
options = {
    mask: '*',
    globalConfigPath: false,
    configPath: `${CONFIG}/configstore/${PACKAGE_NAME}.json`
}
songshu = new Songshu()
```

```

```

You can even set the mask to any arbitrary character!? Why not choose something with character? You can even choose something fun like the hammer and sickle☭ if you're partial to mass murder🎉😍!!

```
...
    mask: '☭'
...
```

## Roadmap

-   [ ] Encryption options

```javascript
        encryption: {
        enabled: true,
        algorithm_encryption: [aes-256-xts, aes-256-xts, nacl, OpenPGP]
        algorithm_stretching: [argon2id, pbkdf2, scrypt, argon2i, argon2d]
        padding: [nacl random bytes, buffer bytes, 0]
        },
```
