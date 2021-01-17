import SpeedBar from "./SpeedBar";


function Pokemon({poke, hp, stats, setCanAtt, percent}){
 
    return (
        <div className='Pokemon'>
            <h2>{poke[1]}</h2>
            
            <img src={poke[2]} alt="" width='130'/>
            <div className='Stats'>
            <p>{poke[3]} type</p>
            <h4>{stats ? 
            <ul>
                <li>HP: {hp == null ? poke[4][0] : hp}</li>
                <li>Physical Att: {stats[1]}</li>
                <li>Physical Def: {stats[2]}</li>
                <li>Special Att: {stats[3]}</li>
                <li>Special Def: {stats[4]}</li>
                <li>Speed: {stats[5]}</li>
                {typeof setCanAtt === 'function' && <SpeedBar percent={percent}/>}
            </ul>
             : ''}
            </h4>
        </div>
        </div>
    )
}


export default Pokemon;