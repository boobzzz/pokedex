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

export default class App extends Component {
    state = {
        isLoading: false,
        data: []
    }

    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })

        let data = await fetchJSON(`${API_ORIGIN}?limit=${limitItems}`);

        this.setState({
            isLoading: false,
            data: data.body.results
        })
    }

    render() {
        let { isLoading, data } = this.state;
        let pages = Math.floor(data.length / perPage);
        let page = range(1, pages + 1)

        return (
            isLoading
            ? <div>Loading...</div>
            : <div>
                <label>
                    Name:
                    {' '}
                    <input type="text" placeholder="Pikachu..."/>
                </label>
                {data.map(pokemon =>
                    <ListItem
                        key={pokemon.url}
                        image={`${spriteUrl}${urlMatch(pokemon.url)}.png`}
                        name={pokemon.name} />
                )}
                {range(1, pages + 1).map(item => <Button page={item} />)}
            </div>
        )
    }
}
