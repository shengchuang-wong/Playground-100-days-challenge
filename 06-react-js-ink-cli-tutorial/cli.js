#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ 06-react-js-ink-cli-tutorial

	Options
		--name  Your name

	Examples
	  $ 06-react-js-ink-cli-tutorial --name=Jane
	  Hello, Jane
`);

render(React.createElement(ui, cli.flags));
