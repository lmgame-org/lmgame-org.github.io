// userInfoModal.js
import React from 'react';

export default function UserInfoModal({ user, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>User Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Rank:</strong> #{user.rank}</p>
                <p><strong>Score:</strong> {user.score}</p>
                <button className="share-button">Share</button>
            </div>
        </div>
    );
}

