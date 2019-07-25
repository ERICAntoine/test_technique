import React, {Component} from "react";
import NavBar from "../subComponents/NavBar/navbar";
import axios from "axios";
import { Container, TextField, Box, Typography, Button, Grid } from "@material-ui/core";
import io from 'socket.io-client';
import Card from '@material-ui/core/Card';
  
class Edit extends Component
{
    state = {
        product: [],
        socket: io('http://localhost:3001'),
    }

    componentDidMount()
    {
        const idProduct = this.props.match.params.id;
        axios.get(`http://localhost:3001/products/${idProduct}`).then(res =>
        {
            const product = res.data;
            this.setState({product});
        });
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
        console.log(e.target.name);
    }

    edit()
    {
        const idProduct = this.props.match.params.id;

        axios.post(`http://localhost:3001/products/${idProduct}`, [this.state.product]).then(res =>
        {
            console.log(res);
            this.state.socket.emit("edit", this.state.product, idProduct);
        }); 
    }

    delete()
    {
        const idProduct = this.props.match.params.id;

        axios.delete(`http://localhost:3001/products/${idProduct}`, [this.state.product]).then(res =>
        {
            window.location.replace("http://localhost:3000/");
            this.state.socket.emit("delete");

        }); 
    }

    render()
    {
        const product = this.state.product;
        console.log(product);
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
                                        value={product.name}
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
                                        value={product.price}
                                        id="price"
                                        name="price"
                                        label="Price"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        type="number"
                                        margin="normal"
                                        />                            
                                        <TextField
                                        value={product.type}
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
                                        value={product.rating}
                                        id="rating"
                                        name="rating"
                                        label="Rating"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        margin="normal"
                                        type="number"
                                        />
                                        <TextField
                                        value={product.warranty_years}
                                        id="warranty_years"
                                        name="warranty_years"
                                        label="Warranty Years"
                                        onChange={this.change.bind(this)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        type="number"
                                        margin="normal"
                                        />
                                        <TextField
                                            value={product.available}
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
                                <Box pb={2} pt={2}>
                                    <Grid>
                                        <Button size="medium" onClick={this.edit.bind(this)} variant="contained" color="primary">Edit</Button>
                                    </Grid>
                                </Box>
                                <Grid>
                                    <Button size="medium" onClick={this.delete.bind(this)} variant="contained" color="secondary">Remove</Button>
                                </Grid>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default Edit;