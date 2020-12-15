import React from "react";
import logo from './logo.svg';
import './App.css';
import {Alert, InputPicker, IconButton, Icon } from "rsuite";
import 'rsuite/dist/styles/rsuite-default.css'
const URL = "https://api.chucknorris.io/jokes/";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            joke: "",
            categories: [],
            category: "",
            loading: true,
            loadingJoke: false
        };
        this.setUp = this.setUp.bind(this);
        this.getJoke = this.getJoke.bind(this);
        this.setCategory = this.setCategory.bind(this);
    }

    componentDidMount() {
        this.setUp();
    }


    render() {
        return (
            <div className="wrapper">
                <img src={logo} alt="chuck norris logo" width={400} />
                <h1>Chuck's Categorised Jokes</h1>
                <div>
                    {
                        <blockquote>
                            {" " + this.state.joke}
                        </blockquote>
                    }
                </div>
                <div>
                    <InputPicker
                        data={this.state.categories}
                        style={{ width: 224 }}
                        placeholder="Choose Category"
                        onSelect={val => {
                            this.setCategory(val);
                        }}
                    />
                    <IconButton
                        icon={<Icon icon="arrow-right" />}
                        placement="right"
                        className="next"
                        onClick={() => {
                            this.getJoke();
                        }}
                    >
                        Next
                    </IconButton>
                </div>
                <div />
            </div>
        );

    }
    setUp() {
        this.setState({ loading: true });
        fetch(URL + "categories")
            .then(resp => resp.json())
            .then(resp => {
                const categories = resp.map(val => {
                    return { label: val, value: val };
                });
                this.setState({ categories: categories });
                this.setState({ category: "random" });
            })
            .then(x => {
                return fetch(URL + "random");
            })
            .then(resp => resp.json())
            .then(resp => {
                this.setState({ joke: resp.value, loading: false });
            })
            .catch(err =>
                Alert.error("Oops an unexpected error occurred! Try again later.")
            );
    }
    getJoke(){
        let url = URL + "random";
        if (this.state.category !== "random") {
            url += "?category=" + this.state.category;
        }

        this.setState({ loadingJoke: true });
        fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({ joke: resp.value });
                this.setState({ loadingJoke: false });
            })
            .catch(err =>console.log(err));
    }

    setCategory(category) {
        this.setState({ category: category });
    }

}

export default App;
