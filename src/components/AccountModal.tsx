import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import "./AccountModal.css";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCashData,
    selectInvestmentData,
    updateCashData,
    updateExpenditureData,
    updateIncomeData, updateInvestmentData
} from "../redux/slice";
import {accountActions, accountTypes, cashActions} from "../constants";
import axios from "axios";

interface AccountModalProps {
    isOpen: boolean;
    closeModal: () => void;
    action: string;
    accountType: string;
}

interface CompanyData {
    ticker: string;
    companyName: string;
    price: number;
    lastDayPrice: number;
    percentChange: number;
}

const buySellChoices = ["Buy", "Sell"];


const AccountModal: React.FC<AccountModalProps> = ({ isOpen, closeModal, action, accountType }) => {
    const dispatch = useDispatch();
    const cashData = useSelector(selectCashData);
    const investmentData = useSelector(selectInvestmentData)
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [companyData, setCompanyData] = useState<CompanyData[]>([]);
    const [buySell, setBuySell] = useState(buySellChoices[0]);
    const [errorMessage, setErrorMessage] = useState("");
    const [depositWithdraw, setDepositWithdraw] = useState(cashActions.DEPOSIT);
    const showSubmit = !(action === accountActions.DELETE && accountType === accountTypes.STOCK);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ENDPOINT}/stocks`)
            .then(response => {
                setCompanyData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleNameChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setName(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseInt(event.target.value);
        const inputValue = isNaN(parsed) ? amount : parsed;
        setAmount(inputValue);
    };

    const handleCancelButtonClick = () => {
        closeModal();
    };

    const handleBuySellChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuySell(event.target.value);
    };

    const handleDepositWithdrawChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDepositWithdraw(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (accountType === accountTypes.CASH) {
            switch (action) {
                case accountActions.DELETE:
                    // @ts-ignore
                    dispatch(updateCashData({name: name, action: action}));
                    break;
                case accountActions.MODIFY:
                    // @ts-ignore
                    dispatch(updateCashData({name: name, balance: parseInt(amount), action: action, cashAction: depositWithdraw}));
                    depositWithdraw === cashActions.WITHDRAW
                        ? dispatch(updateExpenditureData({ name: name, balance: amount }))
                        : dispatch(updateIncomeData({ name: name, balance: amount }))
                    break;
                case accountActions.ADD:
                    // @ts-ignore
                    dispatch(updateCashData({name: name, balance: parseInt(amount), action: action}));
                    dispatch(updateIncomeData({ name: name, balance: amount }));
                    break;
                default:
                    break;
            }
        }
        else {
            switch (action) {
                case accountActions.DELETE:
                    // TODO
                    break;
                default:
                    let isError = false;
                    investmentData.forEach(data => {
                        if (data.ticker === name && data.amountOwned < amount && buySell === buySellChoices[1]) {
                            setErrorMessage("You don't have sufficient stocks to sell");
                            isError = true;
                        }
                    });
                    if (!isError) {
                        setErrorMessage("");
                        const foundCompany = companyData.find(item => item.ticker === name);
                        try {
                            // @ts-ignore
                            const costBasis = foundCompany.price;
                            // @ts-ignore
                            dispatch(updateInvestmentData({ticker: name, costBasis: costBasis, amountOwned: amount, buyOrSell: buySell}));
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                    break;
            }
        }

        if (!errorMessage) closeModal();
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
                {action === accountActions.MODIFY && accountType === accountTypes.CASH && (
                    <div>
                        <label>Select an account to modify:</label>
                        <select value={name} onChange={handleNameChangeSelect}>
                            <option value="">Select an account</option>
                            {cashData.map((account: { id: number; amount: number; name: string; }) => (
                                <option key={account.id} value={account.name}>
                                    {account.name}
                                </option>
                            ))}
                        </select>
                        <label>Deposit or Withdraw?</label>
                        <select value={depositWithdraw} onChange={handleDepositWithdrawChange}>
                            {Object.values(cashActions).map((choice: string) => (
                                <option key={choice} value={choice}>
                                    {choice}
                                </option>
                            ))}
                        </select>
                        <div>
                            <label>Amount to {depositWithdraw.toLowerCase()}:</label>
                            <input type="text" value={amount} onChange={handleAmountChange} />
                        </div>
                    </div>
                )}
                {action !== accountActions.DELETE && accountType === accountTypes.STOCK && (
                    <div>
                        <label>Select a ticker</label>
                        <select value={name} onChange={handleNameChangeSelect}>
                            <option value="">Select an account</option>
                            {companyData.map((account: CompanyData) => (
                                <option key={account.ticker} value={account.ticker}>
                                    {account.ticker}
                                </option>
                            ))}
                        </select>
                        <label>Buy or Sell?</label>
                        <select value={buySell} onChange={handleBuySellChange}>
                            {buySellChoices.map((decision: string) => (
                                <option key={decision} value={decision}>
                                    {decision}
                                </option>
                            ))}
                        </select>
                        <div>
                            <label>Amount to {buySell.toLowerCase()}</label>
                            <input type="text" value={amount} onChange={handleAmountChange} />
                        </div>
                        {errorMessage ? <label>{errorMessage}</label> : <></>}
                    </div>
                )}
                {action === accountActions.DELETE && accountType === accountTypes.STOCK && (
                    <div>
                        <label>This functionality is currently unavailable</label>
                    </div>
                )}
                <div className="button-container">
                    {showSubmit && <button type="submit">Submit</button>}
                    <button onClick={handleCancelButtonClick}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default AccountModal;
