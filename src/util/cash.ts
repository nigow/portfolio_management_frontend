import cashData from '../json/cash.json';
import axios from "axios";

export let initialStateCash = cashData;

if (process.env.REACT_APP_ENVIRONMENT === "production") {
    axios.get(`${process.env.REACT_APP_ENDPOINT}/cash`)
        .then(response => {
            initialStateCash = response.data.map((item: { id: number; name: string; balance: number; }) => ({
                id: item.id,
                name: item.name,
                balance: item.balance
            }));
        })
        .catch(error => {
            console.error(error);
        });
}
