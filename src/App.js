import { useContext } from 'react';
import "./App.scss";
import { HomePage } from './components/Home/HomePage';
import AuthContext from './util/auth-context';
// import restProvider from 'ra-data-simple-rest';
// import {Admin, Resource} from 'react-admin';

// const dataProvider = restProvider('http://localhost:4001');

export const App = () => {

  const authCtx = useContext(AuthContext);
  
  return (
      <HomePage />
      // <>
      //   <div>Admin component</div>
      //   <Admin dataProvider={dataProvider} >
      //       <Resource name='client' />
      //   </Admin>
      //   </>
  );
}

export default App;