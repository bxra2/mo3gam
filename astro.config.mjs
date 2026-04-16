import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

export default defineConfig({
    integrations: [tailwind(), react()],
    site: 'https://bxra2.github.io', // ← no repo here
    base: '/mo3gam/',                // ← repo goes here
})