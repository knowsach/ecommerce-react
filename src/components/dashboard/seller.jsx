import React from 'react'
import { withRouter } from 'react-router-dom'

import { 
    Box,
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core'

import axios from 'axios'
import { getProducts, allUsers, base } from '../../common/script/api'

class Seller extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            allProducts: []
        }

        this.fetchProducts = this.fetchProducts.bind(this)
    }

    fetchProducts(){
        axios.get(getProducts, { cancelToken: this._source.token})
        .then( data =>{
            this.setState({allProducts: data.data.data})
        })
    }

    componentDidMount(){
        this._source = axios.CancelToken.source()
        this.fetchProducts()
    }

    componentWillUnmount(){
        if(this._source != '')
            this._source.cancel()
    }

    render(){
        return(
            <Container maxWidth='lg'>
                <Box p={2}>
                    <Typography variant="h3">
                        Seller Dashboard
                    </Typography>

                    <Paper elevation={2}>
                        <Box p={2}>
                            <Typography variant="h4">
                                My Product
                            </Typography>
                            <List>
                                {this.state.allProducts.map((item, key)=>{
                                    return (
                                        <ListItem key={key}>
                                            <ListItemIcon>
                                                <img src={base+item.avatar} className="admin-user-image"/>
                                            </ListItemIcon>
                                            <ListItemText>{item.title}</ListItemText>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Box>
                    </Paper>
                </Box>

            </Container>
        )
    }
}

export default withRouter(Seller)