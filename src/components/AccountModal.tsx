import React, { useState } from "react";
import Modal from "react-modal";
import "./AccountModal.css";
import {useDispatch, useSelector} from "react-redux";
import {deleteCashData, selectCashData, updateCashData, updateExpenditureData, updateIncomeData} from "../redux/slice";
import {accountActions, accountTypes} from "../constants";

interface AccountModalProps {
    isOpen: boolean;
    closeModal: () => void;
    action: string;
    accountType: string;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, closeModal, action, accountType }) => {
    const dispatch = useDispatch();
    const cashData = useSelector(selectCashData);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleNameChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setName(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleCancelButtonClick = () => {
        closeModal();
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const floatAmount = parseFloat(amount);
        if (accountType === accountTypes.CASH) {
            switch (action) {
                case accountActions.ADD:
                    floatAmount > 0
                        ? dispatch(updateIncomeData({ name: name, amount: floatAmount }))
                        : dispatch(updateExpenditureData({ name: name, amount: -floatAmount }));
                    try {
                        // @ts-ignore
                        dispatch(updateCashData({name: name, balance: parseInt(amount)}));
                    } catch (error) {
                        console.error(error);
                    }
                    break;
                case accountActions.DELETE:
                    // @ts-ignore
                    dispatch(deleteCashData({name: name}));
                    break;
                default:
                    // TODO
                    break;
            }
        }
        else {
            // TODO
        }

        closeModal();
    };


    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>{action} - {accountType}</h2>
            <form onSubmit={handleSubmit}>
                {action === accountActions.ADD && accountType === accountTypes.CASH && (
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
                {action === accountActions.DELETE && accountType === accountTypes.CASH && (
                    <div>
                        <label>Select an account to delete:</label>
                        <select value={name} onChange={handleNameChangeSelect}>
                            <option value="">Select an account</option>
                            {cashData.map((account: {id: number; amount: number; name: string;}) => (
                                <option key={account.id} value={account.name}>
                                    {account.name}
                                </option>
                            ))}
                        </select>
                    </div>
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
