import React, { Component } from 'react';
import fetchJSON from './lib/api.js';
import ListItem from './components/ListItem/ListItem';
import Button from './components/Button/Button';

const API_ORIGIN = "https://pokeapi.co/api/v2/pokemon";
const perPage = 5;
const totalPages = 10;

export default class App extends Component {
    state = {
        isLoading: false,
        data: []
    }

    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })

        let data = await fetchJSON(`${API_ORIGIN}?limit=${perPage}`);

        this.setState({
            isLoading: false,
            data: data.body.results
        })
    }

    render() {
        let { isLoading, data } = this.state;
        console.log(data);
        return (
            isLoading
            ? <div>Loading...</div>
            : <div>
                <label>
                    Name:
                    {" "}
                    <input type="text" placeholder="Pikachu..."/>
                </label>
                {data.map((item, i) =>
                    <ListItem
                        key={i}
                        image={item.url}
                        name={item.name} />
                )}
            </div>
        )
    }
}
