import React, { lazy } from 'react';
import {
   BrowserRouter as Router,
   Routes as Switch,
   Route,
   Navigate,
} from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import paths from './paths';

// const Login = lazy(() => import('../Pages/Login'));
// const Register = lazy(() => import('../Pages/Register'));
// const TeacherDashboard = lazy(() => import('../Pages/Teacher/Dashboard'));

const Routes = () => {
   return (
      <Router>
         <Switch>
            <Route path='/' element={<Navigate to={paths.login} replace />} />
            <Route path={paths.login} element={<Login />} />
            <Route path={paths.register} element={<Register />} />
            {/* <Route
               path={paths.teacherDashboard}
               element={<TeacherDashboard />}
            /> */}
         </Switch>
      </Router>
   );
};

export default Routes;
