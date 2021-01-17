import Pokemon from "./Pokemon";
import { useEffect, useState } from "react";

function Battle({ starter, opponent, setKo, setEvolve }) {
  const [hp, setHp] = useState(parseInt(starter[4][0]));
  const [oppHp, setOppHp] = useState(parseInt(opponent[4][0]));
  const [combatText, setCombatText] = useState("");
  const [defText, setDefText] = useState("");
  const [stats, setStats] = useState(starter[4]);
  const [lvl, setLvl] = useState(1);
  const [canAtt, setCanAtt] = useState(false);
  const [oppCanAtt, setOppCanAtt] = useState(false);
  const [percent, setPercent] = useState(0);
  const [oppPercent, setOppPercent] = useState(0);

  const newOpponent = () => {
    setKo(true);
    setHp(stats[0]);
  };

  const levelUp = () => {
    if (lvl === 3 || lvl === 7) {
      if (
        starter[0] !== 133 &&
        starter[0] !== 134 &&
        starter[0] !== 135 &&
        starter[0] !== 136
      ) {
        setLvl(lvl + 1);
        setCombatText(`${starter[1]} has evolved`);
        setEvolve(true);
      } else {
        setLvl(lvl + 1);
        setStats(stats.map((stat) => stat + 3));
        setDefText(`${starter[1]} has leveled up and is now level ${lvl + 1}`);
        setHp(stats[0] + 3);
      }
    } else {
      setLvl(lvl + 1);
      setStats(stats.map((stat) => stat + 3));
      setDefText(`${starter[1]} has leveled up and is now level ${lvl + 1}`);
      setHp(stats[0] + 3);
    }
    if (starter[0] === 133 && lvl === 5) {
      setLvl(lvl + 1);
      setCombatText(`${starter[1]} has evolved`);
      setEvolve(true);
    }
  };

  const physAttack = () => {
    let pd = Math.floor(
      parseInt(starter[4][1]) / 2 -
        parseInt(opponent[4][2] / 5) +
        Math.random() * 5
    );
    setPercent(0);
    setCanAtt(false);
    if (oppHp - pd > 0) {
      setCombatText(`${starter[1]} hit ${opponent[1]} for ${pd} damage`);
      setOppHp(oppHp - pd);
    } else {
      setCombatText(`${opponent[1]} was KO'ed`);
      setOppHp(0);
      levelUp();
    }
  };

  const specAttack = () => {
    let pd = Math.floor(
      parseInt(starter[4][3]) / 2 -
        parseInt(opponent[4][4] / 5) +
        Math.random() * 5
    );
    setPercent(0);
    setCanAtt(false);
    if (oppHp - pd > 0) {
      setCombatText(`${starter[1]} hit ${opponent[1]} for ${pd} damage`);
      setOppHp(oppHp - pd);
    } else {
      setCombatText(`${opponent[1]} was KO'ed`);
      setOppHp(0);
      levelUp();
    }
  };

  const cpuAttack = () => {
    if(oppHp <= 0) return;
    let cd = 0;
    if (parseInt(opponent[4][1]) > parseInt(opponent[4][3])) {
      cd = Math.floor(
        parseInt(opponent[4][1] / 2) -
          parseInt(starter[4][2] / 4) +
          Math.random() * 5
      );
    } else {
      cd = Math.floor(
        parseInt(opponent[4][3] / 2) -
          parseInt(starter[4][4] / 4) +
          Math.random() * 5
      );
    }
    if (hp - cd > 0) {
      setDefText(`${opponent[1]} hit ${starter[1]} for ${cd} damage`);
      setHp(hp - cd);
    } else {
      setCombatText(
        `${opponent[1]} hit ${starter[1]} for ${cd} damage and ${starter[1]} was KO'ed`
      );
      setHp(0);
    }
  };

  const setPercentage = ()=>{
    if(percent + (stats[5] / 3) >= 100 && hp > 0 && oppHp > 0){
      setPercent(100);
      setCanAtt(true);
    }else{
      setPercent(percent + (stats[5] / 3));
    }
  }

  const setOppPercentage = ()=>{
    if(oppPercent + (opponent[4][5] / 3) >= 100 && hp > 0 && oppHp > 0){
      setOppPercent(100);
      cpuAttack();
      setOppPercent(0);

    }else{
      setOppPercent(oppPercent + (opponent[4][5] / 3));
    }
  }

  if(!canAtt && hp > 0 && oppHp > 0){
    setTimeout(()=>{
      if(percent < 100) setPercentage();
    }, 1000);
  }
  if(!oppCanAtt  && hp > 0 && oppHp > 0){
    setTimeout(()=>{
      if(oppPercent < 100) setOppPercentage();
    }, 1000);
  }

  useEffect(() => {
    setOppHp(parseInt(opponent[4][0]));
    setCombatText(`Wild ${opponent[1]} appeared`);
    setDefText("");
    setPercent(0);
    setCanAtt(false);
    setOppPercent(0);
    setOppCanAtt(false);
  }, [opponent]);

  useEffect(() => {
    setStats(starter[4]);
    setHp(starter[4][0]);
    setDefText("");
    setPercent(0);
    setCanAtt(false);
  }, [starter]);



  return (
    <div className="Battle flex">
      <Pokemon poke={starter} hp={hp} stats={stats} setCanAtt={setCanAtt} percent={percent}/>
      <div>
        {oppHp > 0 ? (
          hp <= 0 ? (
            <div>
              <button onClick={() => window.location.reload(false)}>
                Restart
              </button>
              <p>{combatText}</p>
            </div>
          ) : (
            <div>
              <button disabled={!canAtt} onClick={physAttack}>Physical Attack</button>
              <br />
              <button disabled={!canAtt} onClick={specAttack}>Special Attack</button>
              <p>{combatText}</p>
              <p>{defText}</p>
            </div>
          )
        ) : (
          <div>
            <button onClick={newOpponent}>New Opponent</button>
            <p>{combatText}</p>
            <p>{defText}</p>
          </div>
        )}
      </div>
      <Pokemon poke={opponent} hp={oppHp} stats={opponent[4]} setCanAtt={setOppCanAtt} percent={oppPercent}/>
    </div>
  );
}

export default Battle;
