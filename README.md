# Star Notary v1.0

A non-tokenized version of the Star Notary Smart Contract. Uses the [truffle webpack box](https://trufflesuite.com/boxes/webpack/index.html).

## Running

To run the truffle development enviroment, run:

```console
truffle develop
```

To compile the smart contract, within the truffle development environment, run:

```console
compile
```

To migrate and create a fresh and clean smart contract session, within the truffle development environment, run:

```console
migrate --refresh
```

To run the test cases within the truffle development environment, run:

```console
test
```

npm install @openzeppelin/contracts@2.5.1

<p align="center">
  <h3 align="center">Evaluate News NLP</h3>

  <p align="center">
    This project is a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. <br>
   Part of the Udacity Frontend Nanodegree
    <br>
    </p>
</p>

<br>

## Table of contents

- [About the Website](#about-the-website)
- [Technical](#technical)
- [Licence](#license)
- [Versions](#versions)
- [Contact Information](#contact-information)

### About the website

This is a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites.

<p align="center">
  <img src="./assets/TYSWRUv0Vc.gif"/>
</p>

#### Hosted?

The project is hosted on Heroku [here](https://desolate-castle-57412.herokuapp.com/). The project is deployed in development mode by setting

```console
heroku config:set NPM_CONFIG_PRODUCTION=false
```

### Technical

#### Technology Used

This project uses: - HTML - CSS - SCSS - JS - NodeJS - Webpack - Babel

#### Running the project

A `.env` file needs to be created at the root of the project with the following text

- **LICENSE_KEY=""** obtained from [meaning cloud](https://www.meaningcloud.com/)

The npm packages need to be installed by running

```console
npm install
```

Once the installation process has been done, to run the project, you can run the backend server in developer mode by running:

```console
npm run serve-dev
```

To run the server in production mode, run:

```console
npm run serve-prod
```

To run the fronted in developer mode, you can simply run:

```console
npm run build-dev
```

To run the frontend in production mode, you can simply run

```console
npm run build-prod
```

To run both the frontend and backend in production mode, you can simply run

```console
npm run start
```

To run tests, you can simply run

```console
npm run test
```

Once the project is running, the website can be accessed from `localhost:3000` by default.

#### CONTRIBUTING

I would/ We'd love to have your help in making **{this app (replace with name of your project)}** better. The project is still very incomplete, but if there's an issue you'd like to see addressed sooner rather than later, let me(/us) know.

Before you contribute though read the contributing guide here: [Contributing.md](https://github.com/peterokwara/evaluate-news-nlp/blob/master/CONTRIBUTING.md)

For any concerns, please open an [issue](https://github.com/peterokwara/evaluate-news-nlp/issues), or JUST, [fork the project and send a pull request](https://github.com/peterokwara/evaluate-news-nlp/pulls).

<hr>

### License

- see [LICENSE](https://github.com/peterokwara/evaluate-news-nlp/blob/master/LICENSE) file

### Versions

- Version 1.0 DATE 24/11/2021

### Contact Information

If you have found any bugs, or have any feedback or questions and or want to post a feature request please use the [Issuetracker](https://github.com/peterokwara/evaluate-news-nlp/issues) to report them.

<hr>

[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source-200x33.png?v=103)](#)

<br>

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](https://github.com/peterokwara/evaluate-news-nlp/blob/master/LICENSE)
