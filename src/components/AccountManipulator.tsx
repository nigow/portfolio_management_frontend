import React, { useState } from "react";
import "./AccountManipulator.css";
import {useDispatch} from "react-redux";
import {loadAccountType, loadAction} from "../actions";
import ModalComponent from "./AccountModal";
import { accountActions, accountTypes } from "../constants";


function AccountManipulator() {
    const dispatch = useDispatch();
    const [action, setAction] = useState<string>(accountActions.ADD);
    const [accountType, setAccountType] = useState<string>(accountTypes.CASH);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAction(event.target.value);
    };

    const handleAccountTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAccountType(event.target.value);
    };

    const handleSelect = () => {
        dispatch(loadAction(action));
        dispatch(loadAccountType(accountType));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <h3 className="title">Add / Modify / Close Account</h3>
            <div className="dropdowns">
                <div className="dropdown">
                    <select id="actionDropdown" value={action} onChange={handleActionChange}>
                        <option value={accountActions.ADD}>Add</option>
                        <option value={accountActions.MODIFY}>Modify</option>
                        <option value={accountActions.DELETE}>Delete</option>
                    </select>
                </div>
                <div className="dropdown">
                    <select id="accountTypeDropdown" value={accountType} onChange={handleAccountTypeChange}>
                        <option value={accountTypes.CASH}>Cash</option>
                        <option value={accountTypes.STOCK}>Stock</option>
                    </select>
                </div>
                <div>
                    <button className="select-button" onClick={handleSelect}>Select</button>
                    <ModalComponent
                        isOpen={isModalOpen}
                        closeModal={closeModal}
                        action={action}
                        accountType={accountType}
                    />
                </div>
            </div>
        </div>
    );
}

export default AccountManipulator;
