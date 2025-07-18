import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "/",
	plugins: [react()],
	assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png'],
	preview: {
		port: 8080,
		strictPort: true,
	},
	server: {
		port: 5173,
		strictPort: true,
		host: true,
		origin: "http://localhost:5173",
	},
});
