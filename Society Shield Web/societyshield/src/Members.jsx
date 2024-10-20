import React, {useState} from 'react';

const Members = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        idNumber: '',
        email: '',
        age: '',
        address: '',
        phone: '',
        password:''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <div className="add-member-page">
          <h1>Add Member</h1>

            <form className="add-member-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="idNumber"
                    placeholder="ID Number"
                    value={formData.idNumber}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Home Address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" className="register-button">Register</button>
            </form>

        </div>

    );
}

export default Members;
