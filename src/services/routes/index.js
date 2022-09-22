import React, { useContext } from "react";
import AuthContext from "services/contexts/auth";
import AuthRoutes from './auth.routes';
import AppRoutes from "./app.routes";

const Routes = () => {
  const { signed } = useContext(AuthContext);
  console.log("signed @ services/routes/index.js, ", signed);
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;