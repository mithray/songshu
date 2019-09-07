# Songshu 🐿️

_A usable node module for secure credential storage_

![Songshu](https://raw.githubusercontent.com/mithrayls/songshu/master/squirrel_small.png)

## Introduction 🔰

`songshu` is a friendly squirrel🐿️ that can work as a drop in replacement for configstore but also provides extra options to make it more convenient to use such as providing
This is basically an encrypted wrapper around the npm packages `inquirer` and `configstore` and put into one useful package. `songshu` provides the following features.

-   **Security hardened** 🔒. `songshu` encrypts everything in the configuration storage by default, prompting a user for password to use to seed the encryption key.
-   **Convenient** 🌰. `songshu` automatically stores answers received by `inquirer` into encrypted `configstore`.
-   **Extra Convenient** 🆒. If you provide an array of questions to `songshu` you can choose to have them only prompt the user if the answer is not already saved in storage.
-   **Compatible**. It can be used as a drop in replacement for the extremely popular `configstore`(which it uses under the hood). lays well with others❤️. `songshu` has been trained to mimic🦜 the behavior of config store in most cases. Not thoroughly tested, but the API exposes the same functions⚙️. If you switch to `songshu`😍🐿️ , you will however need to reenter your config information🙃.

---

## Contents 📖

-   [Introduction](#introduction)
-   [Contents](#contents)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Roadmap](#roadmap)

## Installation 🏗️

```sh
yarn install songshu

# or

npm install songshu
```

## Usage ⌨️

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

You can even set the mask to any arbitrary character!? Why not choose something with character? You can even choose something fun like the hammer and sickle ☭ if you're partial to mass murder🎉😍!!

```javascript
...
    mask: '☭'
...
```

## Cryptography 🔒

To derive an encryption key, `songshu` does the following:

1. Prompts for a password from the user
2. Asks for confirmation with a retype
3. Stretches the password with argon2id to get an output key.
4. Hashes the argon2id key with sha256 (to get the right key length for aes)
5. Uses the argon2id hash as the input entropy creates an AES cipher

Note that because the key is derived deterministically from a password, it is only a finite improvement on a password. The encryption key could potentially be brute forced with a password less than perhaps 10 characters. This brute force attack can be made significantly harder by increasing the cycles of the argon2id cipher. This means that your password will be hashed over and over again so that the computation power needed to discover your password from brute force attacks becomes increasingly difficult. The only side effect to this is that `songshu` is slightly delayed in receiving your password into the system, albeit likely only by a few seconds. We have not yet included this option yet.

Upon receiving a key and a value to store, `songshu` does the following:

1. Pads each of those keys and values with random bytes.
2. Encrypts them with AES-256-XTS encryption
3. Stores the encrypted key and value with `configstore`.

## Roadmap 🗺️

-   [ ] Encryption options

```javascript
encryption: {
    enabled: true,
    alg_encryption: [ 'aes-256-xts', 'nacl', 'OpenPGP', 'all node crypto algos']
    alg_stretching: ['argon2id, pbkdf2, scrypt, argon2i, argon2d, bcrypt]
    alg_padding: [ 'nacl.randomBytes', 'crypto.randomBytes', 'zero', 'bit', 'TBC', 'PKCS#5', 'PKCS#7', 'ISO7816-4', 'ISO10126-2', 'ANSIx9.23']
},
```

-   [ ] Create three interfaces
    -   [ ] Node Module
    -   [ ] Non Interactive CLI with `commander`
    -   [ ] Interactive CLI with `inquirer`
-   [ ] Customize logging

###

[Node Crypto algorithms](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options)
[tweetnacl-js](https://github.com/dchest/tweetnacl-js)
[summary of padding types](http://www.crypto-it.net/eng/theory/padding.html)
