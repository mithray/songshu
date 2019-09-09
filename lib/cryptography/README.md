# <a name="cryptography"></a>Cryptography 🔒

![Songshu](https://raw.githubusercontent.com/mithrayls/songshu/master/lib/cryptography/diagram.png)

## Derive Encryption Key

To **derive an encryption key**, `songshu` does the following:

1. Prompts for a password from the user
2. Stretches the password with argon2id to get an output key
3. Hashes the argon2id key with sha256 (to get the right key length for aes)
4. Uses the argon2id hash as the input entropy creates an AES cipher

In order to avoid the need for ever storing the key on the hard drive, it is derived each time by the user typing their password and deterministically turning that password into a hash. Because the key is derived deterministically from a password, it is only a finite improvement on a password. The encryption key could potentially be brute forced with a password less than perhaps 10 characters. This brute force attack can be made significantly harder by increasing the cycles of the argon2id cipher. This means that your password will be hashed over and over again so that the computation power needed to discover your password from brute force attacks becomes increasingly difficult. The only side effect to this is that `songshu` is slightly delayed in receiving your password into the system, albeit likely only by a few seconds. We have not yet included this option yet.

## Encryption and Storage

To **encrypt and store** information, `songshu` does the following:

1. Prompts for information to store
2. Pads each of those keys and values with random bytes (nacl.randomBytes)
3. Encrypts them with AES-256-XTS encryption (description derived as above)
4. Stores the encrypted information with `configstore`

## <a name="roadmap"></a> Roadmap

-   [ ] Support more encryption options

    ```javascript
    // Default
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
    },
    ```

    See [Summary of Key Derivation Functions][kdfs], [Node ciphers][node_algs], [tweetnacl][], [summary of padding algorithms][padding].

    | option         | algorithm_name                                                                                                                                           |
    | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | alg_stretching | <ul><li>argon2id</li><li>pbkdf2</li><li>scrypt</li><li>argon2i</li><li>argon2d</li><li>bcrypt</li></ul>                                                  |
    | alg_encryption | <ul><li>aes-256-xts</li><li>nacl</li><li>OpenPGP</li><li>various OpenSSL/node `crypto`</li></ul>                                                         |
    | alg_padding    | <ul><li>nacl</li><li>node</li><li>zero</li><li>bit</li><li>tbc</li><li>pkcs5</li><li>pkcs7</li> <li>iso7816</li> <li>iso10126</li><li>ansix923</li></ul> |

[kdfs]: https://en.wikipedia.org/wiki/Key_derivation_function 'Key Derivation Functions'
[node_algs]: https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options 'Node ciphers'
[tweetnacl]: https://github.com/dchest/tweetnacl-js 'tweetnacl-js'
[padding]: http://www.crypto-it.net/eng/theory/padding.html 'Summary of padding types'
