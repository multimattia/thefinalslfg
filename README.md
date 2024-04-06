## General architecture

Two pages, one with a table component (MattTable), and one with a form component (MattForm). Both pages are React Server Components, but the table and form components are client components (`use client`). Table uses Tanstack Table with shadcn. Form uses React Hook Forms with shadcn. The filter component state is managed with Next.js' useSearchParams hook so that state can be hoisted across server and client components. For those who know better, please file an issue if this isn't the way to go!

Adding new records is handled by server actions.

## Running locally

1. Clone this repo in the terminal using `git clone ${REPO_URL}`.
2. `cd` into the repo: `cd thefinalslfg`
3. Install dependencies using package manager of choice with `pnpm run dev` (we use `pnpm` for speed and space efficiency)h
4. Ask matt (github multimattia) for env variables and/or current supabase configuration.
5. Run the development server using `pnpm run dev`.
