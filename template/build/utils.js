"use strict";

const path = require("path");
const config = require("../config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.assetsPath = (_path) => {
	return path.posix.join(config.build.assetsSubDirectory, _path)
};

exports.cssLoaders = (options) => {
	options = options || {};
	// generate loader string to be used with extract text plugin
	function generateLoaders(loaders) {
		let sourceLoader = loaders.map((loader) => {
			let extraParamChar;
			if (/\?/.test(loader)) {
				loader = loader.replace(/\?/, "-loader?");
				extraParamChar = "&"
			}
			else {
				loader = loader + "-loader";
				extraParamChar = "?"
			}
			return loader + (options.sourceMap ? extraParamChar + "sourceMap" : "")
		}).join("!");

		if (options.extract) {
			return ExtractTextPlugin.extract("vue-style-loader", sourceLoader)
		}
		else {
			return [
				"vue-style-loader",
				sourceLoader
			].join("!")
		}
	}

	// http://vuejs.github.io/vue-loader/configurations/extract-css.html
	return {
		css: generateLoaders(["css"]),
		postcss: generateLoaders(["css"]),
		less: generateLoaders([
			"css",
			"less"
		]),
		sass: generateLoaders([
			"css",
			"sass?indentedSyntax"
		]),
		scss: generateLoaders([
			"css",
			"sass"
		]),
		stylus: generateLoaders([
			"css",
			"stylus"
		]),
		styl: generateLoaders([
			"css",
			"stylus"
		])
	};
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (options) => {
	let output = [];
	let loaders = exports.cssLoaders(options);
	for (let extension in loaders) {
		let loader = loaders[extension];
		output.push({
			test: new RegExp("\\." + extension + "$"),
			loader: loader
		});
	}
	return output;
};
