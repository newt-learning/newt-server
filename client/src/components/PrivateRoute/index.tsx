import React from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
  // https://stackoverflow.com/questions/53452966/typescript-3-jsx-element-type-component-does-not-have-any-construct-or-call-s?rq=1
  Component: React.ReactType;
  authExists: boolean;
}

function PrivateRoute({ Component, authExists, ...rest }: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authExists ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
