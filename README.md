# Songshu

_A usable node module for secure credential storage_

![Songshu](https://raw.githubusercontent.com/mithrayls/songshu/master/squirrel_small.png)

## Introduction

This is basically an encrypted wrapper around the npm packages `inquirer` and `configstore` and put into one useful package. `songshu` provides the following features.

-   Security hardened🔒. `songshu` encrypts everything in the configuration storage by default, prompting a user for password to use to seed the encryption key.
-   Convenient. `songshu` automatically stores🌰 answers received by `inquirer` into encrypted `configstore`.
-   Extra Convenient. If you provide an array of questions to `songshu` you can choose to have them only prompt the user if the answer is not already saved in storage.
-   Compatible with the extremely popular `configstore`. `songshu` is a friendly squirrel🐿️ that plays well with others❤️. `songshu` has been trained to mimic🦜 the behavior of config store in most cases. Not thoroughly tested, but the API exposes the same functions⚙️. If you switch to `songshu`😍🐿️ , you will however need to reenter your config information🙃.

---

## Contents

-   [Introduction](#introduction)
-   [Contents](#contents)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Roadmap](#roadmap)

## Installation

```shell
yarn install songshu

# or

npm install songshu
```

## Usage

The API is identical to the npm package `configstore`, so you can copy their examples except with some exceptions.

```
const Songshu = require('songshu')
const packageJson = require('./package.json')
songshu = new Songshu(packageJson.name)
```

## Roadmap

Fill in later.

# songshu
