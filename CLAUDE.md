# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RSImageTrainUI (遥影智训) is a remote sensing image training platform built with Nuxt 4 and Nuxt UI. It provides both user-facing learning/training interfaces and an admin dashboard for content management.

### Key Technologies
- **Nuxt 4** - Full-stack Vue framework (SSR disabled, SPA mode)
- **Nuxt UI** - UI component library with Tailwind CSS
- **TipTap** - Rich text editor for content creation
- **Pinia** - State management
- **TypeScript** - Type safety

## Development Commands

### Package Manager
This project uses `pnpm` (specified in package.json). Always use pnpm for package management.

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run ESLint
pnpm lint

# Type checking
pnpm typecheck
```

## Architecture

### Directory Structure
```
app/
├── app.config.ts        # Nuxt UI configuration (colors, page grid)
├── app.vue             # Root component with SEO meta
├── assets/
│   └── css/
│       └── main.css    # Global styles
├── components/
│   ├── admin/          # Admin-specific components
│   │   ├── AdminNav.vue        # Fixed sidebar navigation for admin
│   │   └── RichTextEditor.vue  # TipTap-based rich text editor
│   ├── AppLogo.vue     # Logo component
│   └── TemplateMenu.vue
├── composables/
│   └── useApi.ts       # API client wrapper (base URL: localhost:9696)
├── layouts/
│   ├── admin.vue       # Admin layout (sidebar + content)
│   └── user.vue        # User layout (header, main, footer)
├── pages/
│   ├── index.vue       # Landing page
│   ├── courses/[id].vue # Course detail page
│   └── admin/          # Admin routes
│       ├── index.vue            # Admin dashboard
│       ├── courses/             # Course management
│       │   ├── index.vue        # Course list
│       │   ├── create.vue       # Create new course
│       │   └── [id]/index.vue   # Edit course
│       └── content/             # Content management
└── plugins/            # (empty, auto-imported composables available)
```

### Layout System
Two distinct layouts serve different user types:

1. **`admin.vue`**: Fixed sidebar navigation (w-64) with ml-64 main content area
   - Used for `/admin/*` routes
   - Includes `<AdminNav />` component
   - Dark theme sidebar (bg-gray-900)

2. **`user.vue`**: Traditional layout with header, main content, and footer
   - Used for public-facing pages
   - Includes logo, navigation, UColorModeButton, and footer

### API Communication
The `useApi()` composable handles all HTTP requests:
- Base URL: `http://localhost:9696/api`
- Returns `{ get, post, put, delete }` methods
- Each method returns `{ data, error }` tuple
- All requests include `Content-Type: application/json` header

### Component Patterns

#### Admin Pages
Admin pages use `definePageMeta({ layout: 'admin' })` to apply admin layout.

#### Rich Text Editor
`<RichTextEditor>` component uses TipTap with:
- v-model:content for two-way binding
- Toolbar with formatting options (bold, italic, headings, lists, code, etc.)
- Prose styling for content display
- Undo/redo support

#### Icons
- Heroicons: `heroicons:*` (default icon set)
- Lucide: `i-lucide-*`
- Simple Icons: `i-simple-icons-*`

### Styling
- **Tailwind CSS** via Nuxt UI
- Custom colors: primary (green), neutral (slate) - defined in app.config.ts
- Dark mode support via `UColorModeButton`
- Prose classes for rich text content styling

### TypeScript Configuration
- Project references Nuxt-generated configs in .nuxt/
- No custom tsconfig - relies on Nuxt's auto-generated configuration

### ESLint
- Uses `@nuxt/eslint` module
- Extends `.nuxt/eslint.config.mjs`
- Stylistic rules: `commaDangle: 'never'`, `braceStyle: '1tbs'`

## Admin Dashboard Navigation
The admin sidebar (`AdminNav.vue`) includes:
- 后台首页 (/admin)
- 课程管理 - dropdown with:
  - 课程列表 (/admin/courses)
  - 创建课程 (/admin/courses/create)
- 内容管理 (/admin/content)
- 用户管理 (/admin/users)
- 数据统计 (/admin/analytics)
- 系统设置 (/admin/settings)
- 返回前台 (/)

The courses menu auto-expands when navigating to any `/admin/courses/*` route.

## API Integration Notes
- Backend expected at `localhost:9696`
- All API calls should use the `useApi()` composable for consistency
- Error handling displays Chinese error messages
- Forms include validation before API submission
