// userInfoModal.js
import React from "react";

export default function UserInfoModal({ user, onClose, gamename }) {
    const shareOnTwitter = () => {
        const text = encodeURIComponent(
            `I just dominated AI Space Escape on Roblox! 🚀🤖\nI beat LLM and ranked #${user.rank} with a score of ${user.score} in ${gamename}! 🔥\nCan you do better? 😏\n`
        );
        const url = encodeURIComponent("https://lmgame.org/"); // Replace with your actual website link
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(twitterUrl, "_blank");
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>User Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Rank:</strong> #{user.rank}</p>
                <p><strong>Score:</strong> {user.score}</p>
                <button className="share-button" onClick={shareOnTwitter}>Share on Twitter</button>
            </div>
        </div>
    );
}
