import React from 'react';
import { useAlertContext } from "../../context/alert/alertContext";

function Alerts() {
    const { alerts } = useAlertContext();
    return (
        alerts.length > 0 && alerts.map(alert =>
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"> </i> {alert.msg}
            </div>)
    );
}

export default Alerts;
