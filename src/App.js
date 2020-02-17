import React, { Component } from 'react';
import fetchJSON from './lib/api.js';
import range from '@bit/ramda.ramda.range';
import ListItem from './components/ListItem/ListItem';
import Button from './components/Button/Button';

const API_ORIGIN = 'https://pokeapi.co/api/v2/pokemon';
const spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const limitItems = 50;
const perPage = 5;

let urlMatch = (url) => {
  return url.match(/(\d+)\/$/)[1]
}

let filter = (arr, v) => {
    return arr.filter(el => el.name.match(v))
}

let slicer = (arr, i, n) => {
    let start = i * n - n;
    let end = start + n;

    return arr.slice(start, end)
}

let compareFunc = (a, b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
    }

    if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
    }

    return 0;
};

export default class App extends Component {
    state = {
        isLoading: false,
        pokemons: [],
        currentPage: 1,
        value: ''
    }

    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })

        let data = await fetchJSON(`${API_ORIGIN}?limit=${limitItems}`);
        let results = data.body.results.sort(compareFunc);

        this.setState({
            isLoading: false,
            pokemons: results
        })
    }

    setPage = (event) => {
        let page = event.target.innerHTML;

        this.setState({
            currentPage: page
        })
    }

    onInputFilter = (event) => {
        let { pokemons } = this.state;
        let { value } = event.target;
        let filtered = filter(pokemons, value)

        this.setState({
            pokemons: filtered,
            value: value
        })
    }

    render() {
        let { isLoading, pokemons, currentPage, value } = this.state;
        let pages = Math.floor(pokemons.length / perPage);
        let pageItems = slicer(pokemons, currentPage, perPage);

        return (
            isLoading
            ? <div>Loading...</div>
            : <div>
                <label>
                    Name:
                    {' '}
                    <input
                        type="text"
                        placeholder="Pikachu..."
                        onChange={this.onInputFilter}
                        value={value}/>
                </label>
                {pageItems.map(pokemon =>
                    <ListItem
                        key={pokemon.url}
                        image={`${spriteUrl}${urlMatch(pokemon.url)}.png`}
                        name={pokemon.name} />
                )}
                {range(1, pages + 1).map(button =>
                    <Button
                        key={button}
                        page={button}
                        clicked={this.setPage} />
                )}
            </div>
        )
    }
}
