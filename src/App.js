import React, { Component } from 'react';
import fetchJSON from './lib/api.js';
import range from '@bit/ramda.ramda.range';
import ListItem from './components/ListItem/ListItem';
import Button from './components/Button/Button';

const API_ORIGIN = 'https://pokeapi.co/api/v2/pokemon';
const spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const limitItems = 50;
const perPage = 5;

let urlMatch = url => {
  return url.match(/(\d+)\/$/)[1]
}

let spliced = (arr, i, n) => {
    arr.splice(i * n, i * n + n)
}

export default class App extends Component {
    state = {
        isLoading: false,
        pokemons: [],
        currentPage: 1
    }

    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })

        let data = await fetchJSON(`${API_ORIGIN}?limit=${limitItems}`);
        let sorted

        this.setState({
            isLoading: false,
            pokemons: data.body.results.sort()
        })
    }

    setPage = (page) => {
        // this.setState({
        //     currentPage: page
        // })
    }

    render() {
        let { isLoading, pokemons, currentPage } = this.state;
        let pages = Math.floor(pokemons.length / perPage);
        // let currentItems = pokemons.slice(currentPage)
        console.log(pokemons);
        return (
            isLoading
            ? <div>Loading...</div>
            : <div>
                <label>
                    Name:
                    {' '}
                    <input type="text" placeholder="Pikachu..."/>
                </label>
                {pokemons.map(pokemon =>
                    <ListItem
                        key={pokemon.url}
                        image={`${spriteUrl}${urlMatch(pokemon.url)}.png`}
                        name={pokemon.name} />
                )}
                {range(1, pages + 1).map(button =>
                    <Button
                        key={button}
                        page={button}
                        clicked={this.setPage()} />
                )}
            </div>
        )
    }
}
