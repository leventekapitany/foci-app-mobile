import { useContext } from 'react';
import { Context } from '../context';

const WHITE = '#e2e2e';
const BLACK = '#ececec';

type Colors = {
  backgroundColor: string;
};

export default function (context: React.Context<Context>): Colors {
  const state = useContext(context);

  return { backgroundColor: state.theme === 'dark' ? BLACK : WHITE };
}
