const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Plugin to remove duplicate CSS files (when entrypoint doesn't import CSS)
class RemoveDuplicateCssPlugin {
	apply(compiler) {
		compiler.hooks.thisCompilation.tap('RemoveDuplicateCssPlugin', (compilation) => {
			compilation.hooks.processAssets.tap(
				{
					name: 'RemoveDuplicateCssPlugin',
					stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_HASH,
				},
				(assets) => {
					const cssFiles = {};
					const cssHashes = {};

					// First pass: collect all CSS files and their content hashes
					Object.keys(assets).forEach((filename) => {
						if (filename.endsWith('.css')) {
							const content = assets[filename].source();
							const hash = require('crypto').createHash('md5').update(content).digest('hex');

							if (!cssHashes[hash]) {
								cssHashes[hash] = [];
							}
							cssHashes[hash].push(filename);
							cssFiles[filename] = hash;
						}
					});

					// Second pass: for each hash with multiple files, keep only global.css
					Object.values(cssHashes).forEach((files) => {
						if (files.length > 1) {
							// Keep global.css, remove others
							files.forEach((file) => {
								if (file !== 'global.css') {
									delete assets[file];
								}
							});
						}
					});
				}
			);
		});
	}
}

const isProduction = process.env.NODE_ENV === 'production';
const srcDir = path.resolve(__dirname, 'src');
const entrypointsDir = path.resolve(srcDir, 'entrypoints');
const assetsDir = path.resolve(srcDir, 'assets');
const outputDir = path.resolve(__dirname, 'assets');
const entrypoints = fs.readdirSync(entrypointsDir).reduce(
	(entrypoints, file) => ({
		...entrypoints,
		[path.parse(file).name]: path.resolve(entrypointsDir, file),
	}),
	{},
);

module.exports = {
	mode: isProduction ? 'production' : 'development',
	devtool: isProduction ? false : 'eval-source-map',
	entry: entrypoints,
	output: {
		path: outputDir,
		filename: '[name].js',
	},
	watchOptions: {
		followSymlinks: true
	},
	optimization: {
		minimizer: ['...', new CssMinimizerPlugin()],
		// Remove empty chunks (like CSS files from JS-only entry points)
		removeEmptyChunks: true,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'esbuild-loader',
				options: {
					loader: 'jsx',
					target: 'es2021',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				include: [srcDir],
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new RemoveDuplicateCssPlugin(),
		new CopyPlugin({
			patterns: [{from: assetsDir, to: outputDir}],
		}),
	],
};
