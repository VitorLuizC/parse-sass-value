# parse-sass-value

[![Greenkeeper badge](https://badges.greenkeeper.io/VitorLuizC/parse-sass-value.svg)](https://greenkeeper.io/)
[![Travis](https://travis-ci.org/VitorLuizC/parse-sass-value.svg?branch=master)](https://travis-ci.org/VitorLuizC/parse-sass-value)

Simple value parser, from JavaScript to SASS (Scss).

# Usage
The module is just a function to compile values to SASS (Scss).
```js
const parse = require('parse-sass-value');

let background = parse('12px');

let theme = {
  parent: null,
  name: 'flat-green',
  width: '100%',
  height: '12rem',
  font: ['Roboto', 'sans-serif'],
  colors: {
    primary: '#1abc9c'
  },
  childs: 4
};

let sassTheme = parse(theme, {
  quotes: 'single',
  separator: 'comma'
});

/*
(
  parent: null,
  name: 'flat-green',
  width: 100%,
  height: 12rem,
  font: ('Roboto', 'sans-serif'),
  colors: (
    primary: #1abc9c
  ),
  childs: 4
)
*/
```

## Workaround with Gulp
```js
const gulp = require('gulp');
const header = require('gulp-header');
const parseValue = require('parse-sass-value');
const sass = require('gulp-sass');
const vars = object => header(
  Object
    .keys(object)
    .map(key => `$${key}: ${parseValue(object[key])};`)
    .join('\n');
);

gulp.task('compile', () => {
  let settings = {
    theme: 'default',
    parent: null,
    colors: {
      primary: 'rgb(255, 0, 0)',
      borders: '#ff0'
    },
    cols: 12,
    breakpoints: ['544px', '768px', '1024px', '1366px']
  };

  return gulp
    .src('./src/sass/*.scss')
    .pipe(vars(settings, { quotes: 'single' }))
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});
```

## Options
#### ```quotes```
Set string comma character.
Options: ```'single'``` or ```'double'```.

#### ```separator```
Set maps and lists separator character.
Options: ```'comma'``` or ```'space'```.
