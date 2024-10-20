import React, {useState} from 'react';

const RecordPayment = () => {
    const [paymentData, setPaymentData] = useState({
        name: 'Tshidilo Mokono',
        month: '',
        amount: ''
    });

    const handleChange = (e) => {
        setPaymentData({
            ...paymentData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Payment Submitted", paymentData);
    };

    return (
        <div className="record-payment-page">
           
                <h1>Pay</h1>


            <form className="payment-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={paymentData.name}
                    disabled
                />
                <input
                    type="text"
                    name="month"
                    placeholder="Month"
                    value={paymentData.month}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={paymentData.amount}
                    onChange={handleChange}
                />
                <button type="submit" className="payment-button">Pay with Cash</button>
            </form>
        </div>
    );
}

export default RecordPayment;
