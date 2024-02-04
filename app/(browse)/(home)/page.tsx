import React, { Suspense } from 'react'
import { Feed, FeedSkeleton } from './_components/feed';

const HomePage = () => {
  return (
    <div className='h-full p-8 max-w-screen-2xl mx-auto'>
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
    </div>
  )
}

export default HomePage;
