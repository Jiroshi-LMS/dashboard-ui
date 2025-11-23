'use client';

import NextTopLoader from 'nextjs-toploader';

const NextTopLoaderProvider = () => {
    return (
        <NextTopLoader
            color="#00bba7"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #00bba7,0 0 5px #00bba7"
        />
    );
};

export default NextTopLoaderProvider;
