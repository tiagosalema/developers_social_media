import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ auth: { isAuthenticated, loading }, ...rest }) => {
  if (loading) return <p>Loading...</p>;
  else if (!isAuthenticated) return <Redirect to='/sign-in' />;
  else return <Route {...rest} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
