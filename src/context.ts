import React, { createContext } from 'react';

export type Context = {
  theme: 'dark' | 'light';
};

export default createContext<Context>({ theme: 'dark' });
