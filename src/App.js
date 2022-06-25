import { useContext } from 'react';
import "./App.scss";
import { HomePage } from './components/Home/HomePage';
import AuthContext from './util/auth-context';

export const App = () => {

  const authCtx = useContext(AuthContext);
  
  return (
    <HomePage />
  );
}

export default App;