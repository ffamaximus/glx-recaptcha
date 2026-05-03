# glx-recaptcha

[![npm version](https://img.shields.io/npm/v/glx-recaptcha.svg?style=flat-square)](https://www.npmjs.com/package/glx-recaptcha)
[![bundle size](https://img.shields.io/bundlephobia/minzip/glx-recaptcha?style=flat-square)](https://bundlephobia.com/result?p=glx-recaptcha)
[![license](https://img.shields.io/npm/l/glx-recaptcha.svg?style=flat-square)](https://github.com/ffmaximus/glx-recaptcha/blob/main/LICENSE)

A lightweight, framework-agnostic, universal loader for Google reCAPTCHA v2 and v3. Designed for modern web applications with zero dependencies and a focus on performance.

---

## 🚀 Features

- **Universal Support**: Works with React, Vue, Angular, Svelte, and Vanilla JS.
- **Dynamic Loading**: Smart script injection (never loads the Google API twice).
- **Full Support**: Handles both reCAPTCHA v2 (Checkbox & Invisible) and v3 (Actions).
- **SSR Ready**: Safe for Next.js, Nuxt, and other server-side rendering environments.
- **Lightweight**: Zero external dependencies.
- **Type Safe**: Written in TypeScript with full type definitions.

## 📦 Installation

```bash
npm install glx-recaptcha
# or
yarn add glx-recaptcha
# or
pnpm add glx-recaptcha
```

## 🛠 Usage

### 1. Load the Script
Before using reCAPTCHA, you need to load the script. This function is idempotent (it won't inject the script if it's already there).

```typescript
import { loadRecaptcha } from "glx-recaptcha";

// For v2 (Checkbox or Invisible)
await loadRecaptcha("YOUR_SITE_KEY", "v2");

// For v3
await loadRecaptcha("YOUR_SITE_KEY", "v3");
```

### 2. reCAPTCHA v2 Implementation

```typescript
import { loadRecaptcha, renderV2 } from "glx-recaptcha";

await loadRecaptcha("YOUR_SITE_KEY", "v2");

  console.log("Verified Token:", token);
});

// You can reset the widget if needed:
// import { resetV2 } from "glx-recaptcha";
// resetV2(widgetId);
```

### 3. reCAPTCHA v3 Implementation

```typescript
import { loadRecaptcha, setV3SiteKey, executeV3 } from "glx-recaptcha";

await loadRecaptcha("YOUR_V3_SITE_KEY", "v3");
setV3SiteKey("YOUR_V3_SITE_KEY");

const token = await executeV3("login");
```

---

## 🧩 Framework Examples

### React
```tsx
import { useEffect } from "react";
import { loadRecaptcha, renderV2 } from "glx-recaptcha";

export function RecaptchaReact() {
  useEffect(() => {
    loadRecaptcha("YOUR_SITE_KEY", "v2").then(() => {
      renderV2("captcha-react", "YOUR_SITE_KEY", (token) => {
        console.log("React token:", token);
      });
    });
  }, []);

  return <div id="captcha-react" />;
}
```

### Vue 3
```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { loadRecaptcha, renderV2 } from "glx-recaptcha";

onMounted(async () => {
  await loadRecaptcha("YOUR_SITE_KEY", "v2");
  renderV2("captcha-vue", "YOUR_SITE_KEY", (token) => {
    console.log("Vue token:", token);
  });
});
</script>

<template>
  <div id="captcha-vue"></div>
</template>
```

### Angular
```typescript
import { Component, OnInit } from "@angular/core";
import { loadRecaptcha, renderV2 } from "glx-recaptcha";

@Component({
  selector: "app-recaptcha",
  template: `<div id="captcha-angular"></div>`
})
export class RecaptchaComponent implements OnInit {
  ngOnInit() {
    loadRecaptcha("YOUR_SITE_KEY", "v2").then(() => {
      renderV2("captcha-angular", "YOUR_SITE_KEY", (token) => {
        console.log("Angular token:", token);
      });
    });
  }
}
```

---

## 🌐 SSR Notes
`loadRecaptcha()` automatically detects server environments and does nothing during SSR. To ensure compatibility, you must call it inside client-only lifecycle hooks:
- **React**: `useEffect`
- **Vue**: `onMounted`
- **Angular**: `ngOnInit`

---

## 📄 License

MIT License © 2025 Andrés