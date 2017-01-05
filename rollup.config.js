import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import uglify from 'rollup-plugin-uglify';

const config = {
  entry: 'src/index.js',
  dest: 'build/app.js',
  format: 'iife',
  sourceMap: 'inline',
};

const plugins = [
  sass({
    output: 'build/app.css',
    processor(css, id) {
      return postcss([autoprefixer({ browsers: ['last 2 versions'] })])
        .process(css)
        .then(result => result.css);
    }
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  commonjs({
    include: 'node_modules/**',
    exclude: [
      'node_modules/react-router/**',
      'node_modules/redux/**',
    ],
    namedExports: {
      'node_modules/react/react.js': ['createElement', 'PropTypes'],
      'node_modules/react-dom/index.js': ['render'],
    },
  }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['es2015', { modules: false } ], 'stage-0', 'react'],
    plugins: ['external-helpers'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
];

if (process.env.NODE_ENV == 'production') {
  config.sourceMap = true;
  plugins.push(uglify());
}

config.plugins = plugins;

export default config;
