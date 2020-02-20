import React, { Component } from 'react';
import * as A from './lib/api.js';
import * as U from './lib/utils.js';
import range from '@bit/ramda.ramda.range';
import ListItem from './components/ListItem/ListItem';
import Button from './components/Button/Button';

const API_ORIGIN = 'https://pokeapi.co/api/v2/pokemon';
const spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const limitItems = 50;
const perPage = 5;

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

        let data = await A.fetchJSON(`${API_ORIGIN}?limit=${limitItems}`);
        let results = U.sortBy(data.body.results);

        this.setState({
            isLoading: false,
            pokemons: results
        })
    }

    setPage = (event) => {
        this.setState({
            currentPage: event.target.innerHTML
        })
    }

    onInputFilter = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        let { isLoading, pokemons, currentPage, value } = this.state;
        pokemons = U.filter(pokemons, value)
        let pages = Math.ceil(pokemons.length / perPage);
        let pageItems = U.slicer(pokemons, currentPage, perPage);

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
                        image={`${spriteUrl}${U.urlMatch(pokemon.url)}.png`}
                        name={U.capitalizeFirst(pokemon.name)} />
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
