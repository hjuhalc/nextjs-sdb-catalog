# nextjs-sdb-catalog

A truly scalable product catalog built using [Next.js](https://nextjs.org/) and [SurrealDB](https://surrealdb.com/). This project is a work in progess.

## Getting Started

### Pre-requisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [SurrealDB](https://surrealdb.com/install)

1. Clone the repository.

2. Run SurrealDB:

    ```bash
    surreal start --user root --pass root file://catalog.db 
    ```

    With Docker:

    ```bash
    docker run --rm -p 8000:8000 surrealdb/surrealdb:latest start --user root --pass root file://catalog.db
    ```

2. Create a copy of `.env.example` and rename it to `.env`:

    ```bash
    cp .env.example .env
    ```

    > Make sure to update the env vars in `.env` with your own values.

3. Install dependencies:

    ```bash
    yarn install
    ```
4. Run the development server:

    ```bash
    yarn dev
    ```

## SurrealDB

You can find a basic CRUD implementation with SurrealDB in the [`/product`](./src/pages/product.tsx) and [`/api/products`](./src/pages/api).
