# Songshu 🐿️

_A usable node module for secure credential storage_

![Songshu](https://raw.githubusercontent.com/mithrayls/songshu/master/squirrel_small.png)

## Introduction 🔰

`songshu` is a friendly squirrel🐿️ that can act almost as a drop in replacement for `configstore`(it has minor API differences) but provides extra methods and stores data as encrypted by default. For the most part, it is an encrypted wrapper around the npm packages `configstore` but for helpful prompting functionality from `inquirer`. `songshu` provides the following features:

-   **Security hardened** 🔒. `songshu` by default automatically encrypts all information it receives from the user to manage. `songshu` prompts the user for a password with which to seed the encryption key.
-   **Convenient Storage** 🌰. `songshu` automatically stores🌰 answers it receives into encrypted `configstore`.
-   **Extra Convenient** 🆒. You can provide an array of questions to `songshu` and have `songshu` only prompt the user if the answer is not already saved in storage.
-   **User Friendly** 😊. `songshu` uses `inquirer` for prompts which means that the prompts look attractive, simple, and friendly.
-   **Compatible** ✅. `songshu` plays well with others and can be used _almost_ as a drop in replacement for the extremely popular `configstore`(which it uses under the hood). `songshu` has been trained to mimic🦜 the behavior of config store, but not all. Not thoroughly tested, but the API exposes the same functions⚙️.

---

## Contents 📖

-   [Introduction](#introduction-)
-   [Contents](#contents-)
-   [Installation](#installation-%EF%B8%8F)
-   [Usage](#usage-%EF%B8%8F)
-   [Issues and `configstore` Differences](#issues-and-configstore-differencs)
-   [Cryptography](#cryptography-)
-   [Roadmap](#roadmap-%EF%B8%8F)

## Installation 🏗️

```sh
yarn add songshu

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

## Issues and `configstore` Differences

This section only describes the surface API differences between the two, it does not include encryption which is defined in the section [cryptography](#cryptography-).

### Issues

-   If you switch to `songshu`😍🐿️ , you will need to reenter your config information🙃.
-   `configstore` has three _properties_ which in `songshu` are _methods_. This _may_ change, but it is this way for
    -   **API Consumers:** It seems more consistent if they are _methods_, as they are used like methods.
    -   **API Developers:** Because `songshu` requires a password to encrypt and decrypt, and because it aims to be modular in making its methods usable independently of the `songshu` object, it is much easier to implement _functions_ as object properties which can be run anytime, rather than properties, which are normally defined when the object is created.

### Extra functions

-   **`getSet`**: `songshu`'s `getSet` function is similar to `configstore`'s `set` function, except
    -   `getSet` only accepts a key, it does not accept a value.
    -   If the key already exists in storage, `getSet` will not redefine it.
    -   If the key does not exist in storage, `getSet` will prompt the user to enter it with inquirer.
-   **`setPrompt`**: There is a use case missing from getSet, namely that a developer may wish to prompt the user to replace the value given to a key, even if that key already exists in storage. `songshu`s `setPrompt` method doesn't care if a key/value pair exists in the storage or not. It will be overwritten if it exists, it will be created if it does not exist.

    ```javascript
    songshu.set('some_key', {})
    ```

-   The following `songshu` methods accept arrays as parameters:
    -   **`get`**: Returns an array of values corresponding to the array of keys.
    -   **`getSet`**: Checks every key in the array to see if it exists in storage, if it doesn't, it will prompt the user to set its value.
    -   **`setPrompt`**: For every key in the array, it will prompt the user to set its value.

## Cryptography 🔒

To derive an encryption key, `songshu` does the following:

1. Prompts for a password from the user
2. Asks for confirmation with a retype
3. Stretches the password with argon2id to get an output key
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
