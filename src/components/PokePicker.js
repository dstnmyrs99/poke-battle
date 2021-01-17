import axios from "axios";
import React, { useState, useEffect } from "react";
import "./PokePicker.css";
import Pokemon from "./Pokemon";
import Battle from "./Battle";

let poke = {};

async function getStarter(num) {
  const url = `https://pokeapi.co/api/v2/pokemon/`;
  poke = await axios.get(`${url}${num}`);
  let stats = poke.data.stats.map((stat) => stat.base_stat);
  return [
    poke.data.id,
    poke.data.name,
    poke.data.sprites.other[`official-artwork`].front_default,
    poke.data.types[0].type["name"],
    stats,
  ];
}

function PokePicker() {
  const [starter, setStarter] = useState([]);
  const [starterPicked, setStarterPicked] = useState(false);
  const [opponent, setOpponent] = useState([]);
  const [ko, setKo] = useState(false);
  const [evolve, setEvolve] = useState(false);
  useEffect(() => {
    initialStarter(1);
    initialOpponent();
  }, []);

  if (ko) {
    if (starter[4][0] < 65) {
      initialOpponent();
      setKo(false);
    } else {
      newOpponent();
      setKo(false);
    }
  }
  if (evolve) {
    if (starter[0] === 133) {
      let e = starter[0] + (Math.floor(Math.random() * 3) + 1);
      console.log(e);
      initialStarter(e);
      setEvolve(false);
    } else {
      initialStarter(starter[0] + 1);
      setEvolve(false);
    }
  }
  async function initialStarter(e) {
    setStarter(await getStarter(e));
  }
  async function initialOpponent() {
    const initial = [
      1,
      4,
      7,
      10,
      13,
      16,
      19,
      21,
      23,
      25,
      27,
      29,
      32,
      37,
      39,
      41,
      43,
      46,
      48,
      50,
      52,
      54,
      56,
      63,
      66,
      69,
    ];
    let e = Math.floor(Math.random() * initial.length);
    setOpponent(await getStarter(initial[e]));
  }
  async function newOpponent() {
    let e = Math.floor(Math.random() * 150 + 1);
    setOpponent(await getStarter(e));
  }

  async function changeHandler(e) {
    setStarter(await getStarter(e.target.value));
  }

  return (
    <div className="PokePicker">
      <h1>{!starterPicked ? "Pick your starter Pokemon" : ""}</h1>
      <div>
        {!starterPicked ? (
          <select defaultValue="0" onChange={changeHandler}>
            <option value="1">Bulbasaur</option>
            <option value="4">Charmander</option>
            <option value="7">Squirtle</option>
            <option value="133">Eevee</option>
          </select>
        ) : (
          ""
        )}
      </div>
      <br />
      <div className="flex">
        {!starterPicked ? <Pokemon poke={starter} stats={starter[4]} /> : ""}
        {!starterPicked ? (
          ""
        ) : (
          <Battle
            starter={starter}
            opponent={opponent}
            setKo={setKo}
            setEvolve={setEvolve}
          />
        )}
      </div>
      <br />
      <div>
        {!starterPicked ? (
          <button
            onClick={() => {
              setStarterPicked(true);
            }}
          >
            Pick {starter[1]}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PokePicker;
