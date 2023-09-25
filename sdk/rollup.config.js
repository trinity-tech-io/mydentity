//import path from "path";
import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import resolve from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import { terser } from 'rollup-plugin-terser';
//import analyze from 'rollup-plugin-analyzer';
import eslint from '@rollup/plugin-eslint';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: './src/index.ts',
	output: [
		{
			sourcemap: true,
			format: 'cjs',
			file: 'dist/index.js'
		},
		{
			sourcemap: true,
			format: 'esm',
			file: 'dist.esm/index.js'
		}
	],
	external: Object.keys(pkg.dependencies || {}), // Exclude all package.json dependencies
	plugins: [
		json(),
		resolve({
			browser: true,
			preferBuiltins: true
		}),
		commonjs(),
		typescript({
			sourceMap: true,
			inlineSources: !production
		}),
		eslint({
			throwOnError: true, // This option throws an error if there are eslint errors/warnings
		}),
		// If we're building for production (npm run build instead of npm run dev), minify
		production && terser(),

		/*analyze({
				limit: 10
		})*/
	],
	watch: {
		clearScreen: true
	}
};