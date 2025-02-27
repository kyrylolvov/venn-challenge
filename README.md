# Venn Frontend Challenge (Onboarding Form)

A Next.js 15 applications, with onboarding form

## Technical Stack
- TypeScript
- React.js
- Next.js
- Axios
- TailwindCSS
- Bun

## Features
- Leverages react-hook-form and zod for client-side validation of all form fields.
- Validates corporation numbers and submits profile details by calling backend endpoints.
- Built with TailwindCSS to ensure a modern and responsive design.
- Uses Bun for fast dependency management, development server, and testing.


## Local Development
1. Clone the repository
```
git clone https://github.com/kyrylolvov/venn-challenge.git
cd venn-challenge
```

2. Install dependencies
```
bun install
```

3. Start development server
```
bun run dev
```

## Environment Variables
Make sure to have `.env` file in the root of the project with `NEXT_PUBLIC_API_URL` containing base url for Venn's API

## Testing
This project uses bun with happy-dom and react-testing-library. To run the tests:
```
bun run test
```

## Project Structure
```
├── src
│   ├── __tests__           # Folder containing unit tests
│   ├── api                 # Folder containing axios instance and Venn API calls
│   ├── app                 # Folder containing layout.tsx and page.tsx
│   ├── components          # Folder containing components
│   ├── styles              # Folder containing global styles
│   ├── utils               # Folder containing utility functions
├── eslint.config.mjs       # Eslint configuration
├── prettier.config.mjs     # Prettier configuration
```
