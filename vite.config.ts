/// <reference types="vitest" />
import { defineConfig as defineTestConfig } from "vitest/config"
import { defineConfig, mergeConfig } from "vite"

import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
const config = defineConfig({
	plugins: [react()],
})

const testConfig = mergeConfig(
	config,
	defineTestConfig({
		test: {
			environment: "jsdom",
			globals: true,
			watch: false,
			setupFiles: ["/src/test/setup-tests.ts", "/src/test/setup-msw.ts"],
		},
	}),
)

const isTestConfig = process.env.VITEST === "true"

export default isTestConfig ? testConfig : config
