# Songshu 🐿️

_A usable node module for secure credential storage_

![Songshu](https://raw.githubusercontent.com/mithrayls/songshu/master/squirrel_small.png)

## <a name="introduction"></a>Introduction 🔰

`songshu` is a friendly squirrel🐿️ that can act almost as a drop in replacement for `configstore`(it has minor API differences) but provides extra methods and stores data as encrypted by default. For the most part, it is an encrypted wrapper around the npm packages `configstore` but for helpful prompting functionality from `inquirer`. `songshu` provides the following features:

-   **Security hardened** 🔒. `songshu` by default automatically encrypts all information it receives from the user to manage. `songshu` prompts the user for a password with which to seed the encryption key.
-   **Convenient Storage** 🌰. `songshu` automatically stores🌰 answers it receives into encrypted `configstore`.
-   **Extra Convenient** 🆒. You can provide an array of questions to `songshu` and have `songshu` only prompt the user if the answer is not already saved in storage.
-   **User Friendly** 😊. `songshu` uses `inquirer` for prompts which means that the prompts look attractive, simple, and friendly.
-   **Compatible** ✅. `songshu` plays well with others and can be used _almost_ as a drop in replacement for the extremely popular `configstore`(which it uses under the hood). `songshu` has been trained to mimic🦜 the behavior of config store, but not all. Not thoroughly tested, but the API exposes the same functions⚙️.

---

## <a name="contents"></a>Contents 📖

-   [Introduction](#introduction)
-   [Contents](#contents)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Issues and `configstore` Differences](#issues-and-configstore-differencs)
-   [Extra Features](#extra-features)
-   [Cryptography](#cryptography)
-   [Roadmap](#roadmap)

## <a name="installation"></a>Installation 🏗️

```sh
yarn add songshu

# or

npm install songshu
```

## <a name="usage"></a>Usage ⌨️

The API is identical to the npm package `configstore`, so you can copy their [examples](https://github.com/yeoman/configstore) except with [some exceptions](#issues-and-configstore-differences).

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

-   If you switch to `songshu`😍🐿️ , you will need to reenter your config information🙃.
-   `configstore` has three _properties_ which in `songshu` are _methods_. This _may_ change, but it is this way for
    -   **API Consumers:** It seems more consistent if they are _methods_, as they are used like methods.
    -   **API Developers:** Because `songshu` requires a password to encrypt and decrypt, and because it aims to be modular in making its methods usable independently of the `songshu` object, it is much easier to implement _functions_ as object properties which can be run anytime, rather than properties, which are normally defined when the object is created.

## Extra Features

-   **`getSet`**: `songshu`'s `getSet` function is similar to `configstore`'s `set` function, except
    -   `getSet` only accepts a key, it does not accept a value.
    -   If the key already exists in storage, `getSet` will not redefine it.
    -   If the key does not exist in storage, `getSet` will prompt the user to enter it with inquirer.

**The features below are not yet implemented in the external API**

-   **`setPrompt`**: There is a use case missing from getSet, namely that a developer may wish to prompt the user to replace the value given to a key, even if that key already exists in storage. `songshu`s `setPrompt` method doesn't care if a key/value pair exists in the storage or not. It will be overwritten if it exists, it will be created if it does not exist.

    ```javascript
    songshu.set('some_key', {})
    ```

-   The following `songshu` methods accept arrays as parameters:

    -   **`get`**: Returns an array of values corresponding to the array of keys.
    -   **`getSet`**: Checks every key in the array to see if it exists in storage, if it doesn't, it will prompt the user to set its value.
    -   **`setPrompt`**: For every key in the array, it will prompt the user to set its value.

-   **`reKey`**
-   **`padString`**

## <a name="cryptography"></a>Cryptography 🔒

To **derive an encryption key**, `songshu` does the following:

1. Prompts for a password from the user
2. Asks for confirmation with a retype
3. Stretches the password with argon2id to get an output key
4. Hashes the argon2id key with sha256 (to get the right key length for aes)
5. Uses the argon2id hash as the input entropy creates an AES cipher

In order to avoid the need for ever storing the key on the hard drive, it is derived each time by the user typing their password and deterministically turning that password into a hash. Because the key is derived deterministically from a password, it is only a finite improvement on a password. The encryption key could potentially be brute forced with a password less than perhaps 10 characters. This brute force attack can be made significantly harder by increasing the cycles of the argon2id cipher. This means that your password will be hashed over and over again so that the computation power needed to discover your password from brute force attacks becomes increasingly difficult. The only side effect to this is that `songshu` is slightly delayed in receiving your password into the system, albeit likely only by a few seconds. We have not yet included this option yet.

To **encrypt and store** information, `songshu` does the following:

1. Pads each of those keys and values with random bytes (nacl.randomBytes)
2. Encrypts them with AES-256-XTS encryption (description derived as above)
3. Stores the encrypted information with `configstore`

## <a name="roadmap"></a> Roadmap 🛣️

-   [ ] Support more encryption options, especially the ones supported by Nacl, Node Crypto(uses OpenSSL), OpenPGP

    ```javascript
    // Default
    encryption: {
        enabled: true,
        alg_stretching: 'argon2id',
        alg_encryption: 'aes-256-xts',
        alg_padding: 'nacl'
    },
    ```

    See [kdfs][], [node_algs][], [tweetnacl][], [summary of padding algorithms][padding].

    | option         | algorithm_name                                                                                                                                           |
    | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | alg_stretching | <ul><li>argon2id</li><li>pbkdf2</li><li>scrypt</li><li>argon2i</li><li>argon2d</li><li>bcrypt</li></ul>                                                  |
    | alg_encryption | <ul><li>aes-256-xts</li><li>nacl</li><li>OpenPGP</li><li>all node crypto algos</li></ul>                                                                 |
    | alg_padding    | <ul><li>nacl</li><li>node</li><li>zero</li><li>bit</li><li>tbc</li><li>pkcs5</li><li>pkcs7</li> <li>iso7816</li> <li>iso10126</li><li>ansix923</li></ul> |

-   [ ] Three interfaces:
    -   [ ] Node Module
    -   [ ] Non Interactive CLI with `commander`
    -   [ ] Interactive CLI with `inquirer`
-   [ ] Customize logging options

[kdfs]: https://en.wikipedia.org/wiki/Key_derivation_function 'Key Derivation Functions'
[node_algs]: https://nodejs.org/api/crypte.html#crypto_crypto_createcipheriv_algorithm_key_iv_options 'Node ciphers'
[tweetnacl]: https://github.com/dchest/tweetnacl-js 'tweetnacl-js'
[padding]: http://www.crypto-it.net/eng/theory/padding.html 'Summary of padding types'
