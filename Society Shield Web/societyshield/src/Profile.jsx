import React from 'react';

const Profile = () => {
    return (
        <div className="profile-page">
            <header className="header">
                <button className="back-button">←</button>
                <h1>My Profile</h1>
            </header>

            <div className="profile-info">
                <div className="profile-avatar">TM</div>
                <h2>Tshidilo Mokono</h2>
            </div>

            <div className="profile-details">
                <a href="#" className="profile-link">Personal details</a>
                <a href="#" className="profile-link">Address details</a>
                <a href="#" className="profile-link">Contact details</a>
                <a href="#" className="profile-link">Receipts</a>
            </div>
        </div>
    );
}

export default Profile;
