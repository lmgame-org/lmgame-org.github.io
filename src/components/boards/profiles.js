import React from 'react';

export default function Profiles({ Leaderboard, onRowClick }) {
    return (
        <div id="profile">
            {Leaderboard.map((user, index) => (
                <div
                    className="flex"
                    key={index}
                    onClick={() => onRowClick && onRowClick(user)} // Only call onRowClick if it’s provided
                    style={{ cursor: onRowClick ? 'pointer' : 'default' }} // Show pointer only if clickable
                >
                    <div className="item">
                        <div className="info">
                            {/* Display rank with conditional styling */}
                            <span className={`rank ${user.rank <= 3 ? 'top-three' : ''}`}>
                                #{user.rank}
                            </span>
                            <h3 className="name text-dark">
                                {/* Limit name length to avoid overflow */}
                                {user.name.length > 50 ? `${user.name.slice(0, 50)}...` : user.name}
                            </h3>
                        </div>
                    </div>
                    <div className="item score">
                        <span>{user.score}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}


// function Item(data){
//     return (

//         <>
//             {
//                 data.map((value, index) => (
//                     <div className="flex" key={index}>
//                         <div className="item">
//                             {/* <img src={value.img} alt="" /> */}
            
//                             <div className="info">
//                                 {/* Display rank with conditional styling */}
//                                 <span className={`rank ${value.rank <= 3 ? 'top-three' : ''}`}>
//                                     #{value.rank}
//                                 </span>
//                                 <h3 className='name text-dark'>
//                                     {value.name.length > 50 ? `${value.name.slice(0, 50)}...` : value.name}
//                                 </h3> 
//                                 {/* <span>{value.location}</span> */}
//                             </div>                
//                         </div>
//                         <div className="item score">
//                             <span>{value.score}</span>
//                         </div>
//                     </div>
//                     )
//                 )
//             }
//         </>

        
//     )
// }

