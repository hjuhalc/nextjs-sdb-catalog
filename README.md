# nextjs-sdb-catalog

A product catalog built using [Next.js](https://nextjs.org/) and [SurrealDB](https://surrealdb.com/). This project is a work in progess.

## Getting Started

### Pre-requisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [SurrealDB](https://surrealdb.com/install)

Clone the repository:

```bash
git clone
```

Create a copy of `.env.example` and rename it to `.env`:

```bash
cp .env.example .env
```

Install dependencies:

```bash
yarn install
```
Run the development server:

```bash
yarn dev
```

## SurrealDB

You can find a basic CRUD implementation with SurrealDB in the [`/product`](./src/pages/product.tsx) route.
