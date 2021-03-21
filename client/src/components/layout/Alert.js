import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts.map(({ id, msg, alertType }) => (
    <div key={id} className={`alert alert-${alertType}`}>
      {msg}
    </div>
  ));

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
