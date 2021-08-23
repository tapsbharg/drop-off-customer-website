import { Redirect, Route } from "react-router-dom";
function PrivateRoute ({components:Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true ? <Component  {...props} />
        : (authed==false?<Redirect to={{pathname: '/sign-in', state: {from: props.location}}} />:'')}
      />
    )
}
export default PrivateRoute;