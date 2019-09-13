# Songshu 🐿️

_A usable node module for secure credential storage_

![Songshu](https://raw.githubusercontent.com/mithrayls/songshu/master/songshu.png)

## <a name="introduction"></a>Introduction 🔰

`songshu` is a friendly squirrel🐿️ that can act almost as a drop in replacement for `configstore`(it has minor API differences) but provides extra methods and stores data as encrypted by default. For the most part, it is an encrypted wrapper around the npm package `configstore` but also contains helpful prompting functionality from `inquirer`. `songshu` provides the following features:

-   **Security hardened** 🔒. `songshu` by default automatically encrypts all information it receives from the user to manage. `songshu` prompts the user for a password with which to seed the encryption key.
-   **Convenient Storage** 🌰. `songshu` automatically stores🌰 answers it receives into encrypted `configstore`.
-   **Extra Convenient** 🆒. You can provide an array of questions to `songshu` and have `songshu` only prompt the user if the answer is not already saved in storage.
-   **User Friendly** 🙂. `songshu` uses `inquirer` for prompts which means that the prompts look attractive, simple, and friendly.
-   **Compatible** ✅. `songshu` plays well with others and can be used _almost_ as a drop in replacement for the extremely popular `configstore`(which it uses under the hood). See the section [issues and differences](#issues-and-configstore-differences). `songshu` has been trained to mimic the behavior of config store, but not all. Not thoroughly tested, but the API exposes the same functions⚙️.

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

The API is nearly identical to the npm package `configstore`, so you can copy their [examples](https://github.com/yeoman/configstore) except with [some exceptions](#issues-and-configstore-differences).

```javascript
const Songshu = require('songshu')
const packageJson = require('./package.json')
const songshu = new Songshu(packageJson.name)
```

## Issues and `configstore` Differences

This section only describes the surface API differences between the two, it does not include encryption which is defined in the section [cryptography](#cryptography-).

-   `configstore` has three _properties_ which in `songshu` are _methods_: `.size`, `.path`, and `.all`. That means you should access them like this:

```javascript
let all = songshu.all()
let path = songshu.path()
let size = songshu.size()
```

This _may_ change, if some people would prefer it this way.

## Extra Features

-   **`getSet`**: `songshu`'s `getSet` function is similar to `configstore`'s `set` function, except:
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

_see section [Cryptography](https://github.com/mithrayls/songshu/tree/master/lib/cryptography) for details_

Data stored with `songshu` is encrypted by default. The key used for encryption is obtained by prompting the user for a password and stetching it into a full key. The prompt will occur every time the user attempts to do something for which decryption is required. **soon** You can save time entering your encryption key to an environment variable, this will however mean you encryption key is stored on your hardrive. Presently it only ever exists in memory.

## <a name="roadmap"></a> Roadmap 🛣️

-   [ ] Basic functionality

    -   [x] set( key, value )
    -   [ ] set( Object )
    -   [x] get( key )
    -   [x] has( key )
    -   [x] delete( key )
    -   [x] clear()
    -   [x] size()
    -   [x] path()
    -   [x] all()

-   [ ] Songshu extensions

    -   [x] getSet(key)
    -   [x] getSet( [ key1, key2, ... ] )
    -   [x] get( [ key1, key2, ... ] )
    -   [x] hashTest()
    -   [ ] stretchPassword(password)
    -   [ ] setPrompt( key )
    -   [ ] reKey()
    -   [ ] exportEncryptionKey()
    -   [ ] exportEncryptedData()
    -   [ ] exportDecryptedData()

-   [ ] Three interfaces:

    -   [x] Node Module
    -   [ ] Non-Interactive CLI with `commander`
    -   [ ] Interactive CLI with `inquirer`

-   [ ] Customize logging options

-   [ ] Support more encryption options. See [cryptography roadmap](https://github.com/mithrayls/songshu/tree/master/lib/cryptography/#roadmap) for details.

[kdfs]: https://en.wikipedia.org/wiki/Key_derivation_function 'Key Derivation Functions'
[node_algs]: https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options 'Node ciphers'
[tweetnacl]: https://github.com/dchest/tweetnacl-js 'tweetnacl-js'
[padding]: http://www.crypto-it.net/eng/theory/padding.html 'Summary of padding types'

## Passing Options

**Not yet implemented**

You can pass an object to the `songshu` constructor for additional configuration.

```javascript
options = {
    mask: '*',
    globalConfigPath: false,
    configPath: `${CONFIG}/configstore/${PACKAGE_NAME}.json`
    encryption: {
        enabled: true,
        alg_stretching: {
            alg_name: 'argon2id',
            memory_cost: 2**18
        },
        alg_encryption: {
            alg_name: 'aes-256-xts'
        },
        alg_padding: {
            alg_name: 'nacl'
        }
    }
}
```
