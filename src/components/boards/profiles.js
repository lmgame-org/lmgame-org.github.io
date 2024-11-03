import React from 'react'

export default function profiles({ Leaderboard }) {
  return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
  )
}

function Item(data){
    return (

        <>
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            {/* <img src={value.img} alt="" /> */}
            
                            <div className="info">
                                {/* Display rank with conditional styling */}
                                <span className={`rank ${value.rank <= 3 ? 'top-three' : ''}`}>
                                    #{value.rank}
                                </span>
                                <h3 className='name text-dark'>{value.name}</h3>    
                                {/* <span>{value.location}</span> */}
                            </div>                
                        </div>
                        <div className="item score">
                            <span>{value.score}</span>
                        </div>
                    </div>
                    )
                )
            }
        </>

        
    )
}
