import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts.map(({ id, msg, alertType, mount }) => (
    <div key={id} className={`alert alert-${alertType} ${mount}`}>
      {msg}
    </div>
  ));

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
