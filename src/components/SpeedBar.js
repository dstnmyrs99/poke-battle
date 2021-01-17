

function SpeedBar({ percent }){   


    return(
        <div className='speedBar'>
            <div className='filler' style={{width: `${percent}%`}}></div>
        </div>
    )
}

export default SpeedBar;