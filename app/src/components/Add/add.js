import React, {Component} from "react";
import NavBar from "../subComponents/NavBar/navbar";
import axios from "axios";
import { Container, TextField, Box, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import io from 'socket.io-client';

class Add extends Component
{
    state = {
        product: [],
        socket: io('http://localhost:3001'),
    }

    change(e)
    {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(prevState => ({
            product: {
                ...prevState.product,
                [name]: value
            }
        }))
    }

    add()
    {
        axios.post(`http://localhost:3001/products/add`, [this.state.product]).then(res =>
        {
            console.log(res);
            this.state.socket.emit("add", this.state.product);
        }); 
    }

    render()
    {
        return(
            <div>
                <NavBar/>
                <Container>
                    <Box p={5}>
                        <Card>
                            <Box p={5}>
                                <Typography>Add Product</Typography>
                                <form>
                                    <Box>
                                        <TextField
                                        id="name"
                                        name="name"
                                        label="Name"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        margin="normal"
                                        />
                                        <TextField
                                        id="price"
                                        name="price"
                                        label="Price"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        margin="normal"
                                        />                            
                                        <TextField
                                        id="type"
                                        name="type"
                                        label="Type"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        margin="normal"
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                        id="rating"
                                        name="rating"
                                        label="Rating"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        margin="normal"
                                        />
                                        <TextField
                                        id="warranty_years"
                                        name="warranty_years"
                                        label="Warranty Years"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        margin="normal"
                                        />
                                        <TextField
                                        id="available"
                                        name="available"
                                        label="Available"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        margin="normal"
                                        />
                                    </Box>
                                </form>
                                <Button onClick={this.add.bind(this)} variant="contained" color="primary">Add</Button>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default Add;