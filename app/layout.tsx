import { Sidebar, Header } from '../component/index' 
import '../globals.css'
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className="overflow-x-hidden bg-[s#F9F7FF]">
        <div className="hidden lg:block border-r-[1px] h-0 border-[#ddd] lg:h-screen fixed top-0 left-0 bottom-0 lg:w-[300px] bg-white">
          <Sidebar />
        </div>
        <main  className=" ml-0 lg:ml-[300px] rounded-lg mx-10 my-24 lg:m-24 border-l-[1px] h-0 border-black">
          <Header />
          <div className="ml-6 sm:ml-0 mx-auto rounded-lg px-4 sm:px-10 my-24">{children}</div>
        </main>
      </body>
    </html>
  )
}

export default Layout


// Define a TypeScript type for pages that might have a getLayout property
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// Update AppProps to use the new page type
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  // Otherwise, wrap the page in the default <Layout> component
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  // Render the page, potentially wrapped by its specific layout or the default one
  return getLayout(<Component {...pageProps} />);
}