'use client' // Error components must be Client Components

import { logger } from '@services/logger';
import { FC, useEffect } from 'react';

const Error: FC<{ error: Error, reset: () => void }> = ({ error, reset }) => {
  useEffect(() => {
    try {
      logger.error("Global", error);
    }
    catch (e) {
      // Just in case, some errors can throw at init when console is not ready yet. In such case
      // this would produce infinite error loop and make the browser stuck.
      console.warn(e);
    }
  }, [error])

  return (
    <div>
      <h2>Something went wrong! </h2>
    </div>
  )
}

export default Error;