import { useState, useEffect } from 'react';

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(result);
  }, [result]);

  return data;
};
