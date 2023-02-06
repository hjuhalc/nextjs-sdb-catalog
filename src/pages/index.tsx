import Head from 'next/head';
import { Inter } from '@next/font/google';
import ProductListing from '@/components/ProductsListing';

export default function Home() {
  return (
    <>
      <main>
        <ProductListing />
      </main>
    </>
  );
}
