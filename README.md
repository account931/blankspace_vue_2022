# Blankspace_remover_vue

> 99% the same as Cleansed version (Cleansed version contains less comments)

> Text editing tool on Vue Framework. Additionally uses Typo-JS Library for spell check (https://github.com/cfinke/Typo.js)
> For production Typo-JS Library Dictionary must be in the same root with index.html (in /dist)

- <p> How to use Typo-js Library: </p>
- <p> Use `npm i typo-js` to install .</p>
- <p> In Vue case, copy Dictionary content files from /node_modules/typo-js/dictionaries to /static/dictionaries </p>
- <p> To init Typo-js object, specify the dictionary  folder path =>  `let dictionary = new Typo("en_US", false, false, { dictionaryPath: "/static/dictionaries" }); ` 
      To check a work use =>  `let is_spelled_correctly = dictionary.check(currWord);  //return true/false `
</p>




## Blankspace remover tool on Vue Framework.

- <p> The application checks text for commom punctuantion errors; it performs a check, finds, highlights and fixes all double blankspaces, blankspace + comma, blankspace + full stop. </p>
 
- <p> Additionally, it fixes consecutive duplicates, double commas, double dots, cases when word is preceeded by comma without no space and more, see full list below.</p>

- <p> Ready build script can be found at /dist </p>

- <p> Hot reload is availabe at http://localhost:8080/#/  on CLI -> npm run dev </p>

## Brief overview of the application

![Screenshot](screenshots/1.png)

## On click the app corrects the text fixing found errors

![Screenshot](screenshots/2.png)

![Screenshot](screenshots/3.png)

## Detailed list of found errors

![Screenshot](screenshots/4.png)

## Input check

![Screenshot](screenshots/5.png)

## Checking for some specifics (if you tick the checkbox)

![Screenshot](screenshots/6.png)
![Screenshot](screenshots/7.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
