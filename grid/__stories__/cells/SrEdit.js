import React, { useState } from "react";

const SREdit = ({ rowData, rowUpdateCallBack }) => {
    const [updatedRowData, setUpdatedRowData] = useState(rowData);
    const { sr } = updatedRowData;

    const updateRowData = (updatedSrData) => {
        const updatedRow = {
            ...updatedRowData,
            sr: updatedSrData
        };
        setUpdatedRowData(updatedRow);
        rowUpdateCallBack(updatedRow);
    };

    const updateSrValue = (e) => {
        updateRowData(e.target.value);
    };

    return (
        <div>
            <input type="text" value={sr} onChange={updateSrValue} />
        </div>
    );
};

export default SREdit;
