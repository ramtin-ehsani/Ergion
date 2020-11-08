import React, {Component} from "react";
import "./AddCourse.scss";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import main from "jss-rtl";


class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testArr: ['salam', 'salam1', 'salam2', 'khoobi?', 'negin', 'ramtin',
                'navid', 'navid23', 'arian', 'yasin', 'hossein', 'alii', 'alli', 'reza', 'react', 'test11']
        };
    }


    render() {
        return (
            <main className="main">
                <div className="heroContent">
                    <Container maxWidth="sm">
                        <div>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <h1>
                                        Search bar test with a test array
                                    </h1>
                                    <section>
                                        <List items={this.state.testArr}/>
                                    </section>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        );
    }
}

export default AddCourse;


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            filtered: this.props.items
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    handleChange(event) {

        let currentList = [];
        let newList = [];

        if (event.target.value !== "") {
            currentList = this.props.items;
            newList = currentList.filter(item => {
                const lc = item.toLowerCase();
                const filter = event.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.props.items;
        }

        this.setState({
            filtered: newList
        });
    }

    render() {
        return (
            <main className="main2">
                <div className="heroContent">
                    <Container maxWidth="sm">
                        <div>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <TextField onChange={this.handleChange} placeholder="Search..."/>
                                    <ul className="filteredList">
                                        {this.state.filtered.map(item => (
                                            <li key={item}>
                                                {item} &nbsp;
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        )
    }
}