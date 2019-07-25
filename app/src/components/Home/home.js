import React, {Component} from "react";
import NavBar from "./../subComponents/NavBar/navbar";
import axios from "axios";
import Products from "./../subComponents/Products/products";
import Container from '@material-ui/core/Container';
import { Box } from "@material-ui/core";
import io from 'socket.io-client';

class Home extends Component
{
    state = {
        socket: io('http://localhost:3001'),
        products: [],
    }

    componentDidMount()
    {
        axios.get("http://localhost:3001/products").then(res => {
            const products = res.data;
            this.setState({ products });
        });

        this.state.socket.on("home", products => {
            this.setState({ products });
        })
    }

    render()
    {
        console.log(this.state.products);
        return(
            <div>
                <NavBar/>
                <Container fixed>
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                    {this.state.products.map((product) =>
                        <Products 
                        title={product.name} 
                        price={product.price}
                        link={`products/${product._id}`}
                        />
                    )}
                    </Box>
                </Container>
            </div>
        )
    }
}

export default Home;
