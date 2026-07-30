import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = compat.extends('next/core-web-vitals');

// Allow <img> tags — we use direct Supabase URLs that don't need next/image
config.push({
  rules: {
    '@next/next/no-img-element': 'off',
  },
});

export default config;
