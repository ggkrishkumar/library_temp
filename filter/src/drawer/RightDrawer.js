/* eslint-disable react/destructuring-assignment */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik, withFormik } from "formik";
import Port from "../types/Port";
import DateTimeComponent from "../types/DateTimeComponent";
import DateTimeRange from "../types/DateTimeRange";
import TextField from "../types/TextField";
import { SaveLogo } from "../Utilities/SvgUtilities";
import "react-datepicker/dist/react-datepicker.css";

const RightDrawer = (props) => {
    const [showSavePopup, setShowSavePopup] = useState("none");
    const [saveFilterName, setSaveFilterName] = useState("");
    const [saveFilterWarning, setSaveFilterWarning] = useState("");
    const [warningLabel, setWarningLabel] = useState("");
    const [applyFilterWarning, setApplyFilterWarning] = useState("");
    const [initialValuesObject, setInitialValuesObject] = useState({});
    const [
        applyfilterWarningClassName,
        setApplyFilterWariningClassname
    ] = useState("");
    const [recentFilterShow, setRecentFilterShow] = useState("none");
    const [filterShow, setFilterShow] = useState("");
    useEffect(() => {
        setApplyFilterWarning(props.emptyFilterWarning);
        setApplyFilterWariningClassname(props.emptyFilterClassName);
    }, [props.emptyFilterWarning, props.emptyFilterClassName]);
    useEffect(() => {
        setWarningLabel(props.saveWarningClassName);
        setSaveFilterWarning(props.saveWarningLabel);
        setShowSavePopup(props.showSavePopUp);
    }, [
        props.saveWarningClassName,
        props.saveWarningLabel,
        props.showSavePopUp
    ]);
    useEffect(() => {
        setRecentFilterShow(props.recentFilterShow);
        setFilterShow(props.filterShow);
    }, [props.recentFilterShow, props.filterShow]);
    useEffect(() => {
        if (props.initialValuesObject) {
            const init = { ...props.initialValuesObject };
            init.email = "";

            setInitialValuesObject(init);
        }
    }, [props.initialValuesObject]);

    const formik = useFormik({
        initialValues: initialValuesObject,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    /**
     * Method To pass the required name of the filter required to be saved
     * @param {*} e is event triggered when typing on the to-save filter name field
     */
    const registersaveFilterName = (e) => {
        setSaveFilterName(e.target.value);
    };

    /**
     * Method To close the save popup on clicking cancel button
     */
    const cancelSavePopup = () => {
        // setShowSavePopup("none");
        setSaveFilterWarning("");
        setWarningLabel("");
    };
    let savedFilters = localStorage.getItem("savedFilters");
    savedFilters = savedFilters ? JSON.parse(savedFilters) : [];
    if (savedFilters.length > 2) {
        savedFilters = savedFilters.slice(
            savedFilters.length - 2,
            savedFilters.length
        );
    }
    const recent = savedFilters.map((filterArray) => {
        return (
            <div
                role="presentation"
                className="recentFilters"
                data-testid="recentFilters-div"
                key={Object.keys(filterArray)[0]}
                onClick={() => {
                    props.addSavedFilters(filterArray);
                }}
            >
                {Object.keys(filterArray)[0]}
            </div>
        );
    });
    console.log(initialValuesObject);
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div
                    style={{
                        display: recentFilterShow
                    }}
                    className="filter__content"
                >
                    <div>Recent Filters</div>
                    {recent}
                </div>

                <div
                    style={{
                        display: filterShow
                    }}
                >
                    <div className="filter__title">
                        Selected Filters
                        <span className="filter-count">
                            {props.filterCount}
                        </span>
                    </div>
                    <div className="filter__content">
                        <Port
                            portsArray={props.portsArray}
                            closePortElement={props.closePortElement}
                            portConditionHandler={props.portConditionHandler}
                        />
                        <DateTimeComponent
                            dateTimesArray={props.dateTimesArray}
                            closeDateTime={props.closeDateTime}
                        />
                        <DateTimeRange
                            dateTimeRangesArray={props.dateTimeRangesArray}
                            closeDateTimeRange={props.closeDateTimeRange}
                        />
                        <TextField
                            textComponentsArray={props.textComponentsArray}
                            closeTextField={props.closeTextField}
                            textFieldconditionHandler={
                                props.textFieldconditionHandler
                            }
                        />
                        <input
                            name="email"
                            onChange={formik.handleChange}
                            // value={formik.values.email}
                        />
                    </div>
                    <div className="filter__btn">
                        <div className="filter__save">
                            <button
                                type="button"
                                className="button-save"
                                variant=""
                                onClick={() => {
                                    props.openShowSavePopUp();
                                }}
                            >
                                <SaveLogo />
                                <span>SAVE</span>
                            </button>
                        </div>
                        <div className="btn-wrap">
                            <span className={applyfilterWarningClassName}>
                                {applyFilterWarning}
                            </span>
                            <button
                                type="button"
                                variant=""
                                className="reset"
                                onClick={props.resetDrawer}
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                variant=""
                                className="applyFilter"
                                data-testid="applyFilter-button"
                                onClick={() => {
                                    props.applyFilter();
                                }}
                            >
                                Apply Filter
                            </button>
                        </div>
                        <div
                            style={{
                                display: showSavePopup
                            }}
                            className="popup--save"
                        >
                            <h5>Save the Filter</h5>
                            <span className={warningLabel}>
                                {saveFilterWarning}
                            </span>
                            <label htmlFor="saveFilterName">
                                Save Filter Name
                                <input
                                    id="saveFilterName"
                                    className="txt"
                                    value={saveFilterName}
                                    data-testid="registersaveFilterName-input"
                                    onChange={(e) => registersaveFilterName(e)}
                                />
                            </label>
                            <div className="btn-wrap">
                                <button
                                    type="button"
                                    className="button"
                                    data-testid="cancelSavePopup-button"
                                    onClick={() => {
                                        cancelSavePopup();
                                        props.cancelSavePopup();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="button"
                                    data-testid="saveFilter-button"
                                    onClick={() => {
                                        props.saveFilter(saveFilterName);
                                        // setSaveFilterName("");
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

RightDrawer.propTypes = {
    emptyFilterWarning: PropTypes.any,
    emptyFilterClassName: PropTypes.any,
    saveWarningClassName: PropTypes.any,
    saveWarningLabel: PropTypes.any,
    showSavePopUp: PropTypes.any,
    recentFilterShow: PropTypes.any,
    filterShow: PropTypes.any,
    addSavedFilters: PropTypes.any,
    filterCount: PropTypes.any,
    openShowSavePopUp: PropTypes.any,
    resetDrawer: PropTypes.any,
    applyFilter: PropTypes.any,
    saveFilter: PropTypes.any,
    cancelSavePopup: PropTypes.any,
    portsArray: PropTypes.any,
    dateTimesArray: PropTypes.any,
    textComponentsArray: PropTypes.any,
    closeDateTime: PropTypes.any,
    dateTimeRangesArray: PropTypes.any,
    closeDateTimeRange: PropTypes.any,
    closePortElement: PropTypes.any,
    closeTextField: PropTypes.any,
    portConditionHandler: PropTypes.any,
    textFieldconditionHandler: PropTypes.any,
    initialValuesObject: PropTypes.any
};

export default withFormik({
    displayName: "BasicForm",
    mapPropsToValues: (props) => props.initialValuesObject
})(RightDrawer);
