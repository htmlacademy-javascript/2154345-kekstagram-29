import { defineConfig } from 'vite';

export default defineConfig({
	base: '',
	build: {
		outDir: 'build',
	},
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
});
