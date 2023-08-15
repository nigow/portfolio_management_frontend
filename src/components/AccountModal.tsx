import React, { useState } from "react";
import Modal from "react-modal";
import "./AccountModal.css";
import {useDispatch} from "react-redux";
import {updateExpenditureData, updateIncomeData} from "../slice";

interface AccountModalProps {
    isOpen: boolean;
    closeModal: () => void;
    action: string;
    accountType: string;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, closeModal, action, accountType }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleCancelButtonClick = () => {
        closeModal();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(updateIncomeData({ name: name, amount: parseFloat(amount) }));
        dispatch(updateExpenditureData({ name: name, amount: parseFloat(amount) }));
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>{action} - {accountType}</h2>
            <form onSubmit={handleSubmit}>
                {action === "Add" && accountType === "Cash" && (
                    <>
                        <div>
                            <label>Name of new cash account:</label>
                            <input type="text" value={name} onChange={handleNameChange} />
                        </div>
                        <div>
                            <label>Initial amount to be deposited:</label>
                            <input type="text" value={amount} onChange={handleAmountChange} />
                        </div>
                    </>
                )}
                <div className="button-container">
                    <button type="submit">Submit</button>
                    <button onClick={handleCancelButtonClick}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default AccountModal;
