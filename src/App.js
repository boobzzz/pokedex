import React, { Component } from 'react';
import fetchJSON from './lib/api.js';

const API_ORIGIN = "https://pokeapi.co/api/v2/pokemon";

export default class App extends Component {
    state = {
        isLoading: false,
        data: {}
    }

    componentDidMount = async () => {
        let data = await fetchJSON();
    }

    render() {
        let { data } = this.state;

        return (
            <div>

            </div>
        )
    }
}
