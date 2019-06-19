import * as React from 'react';
import {toast} from 'react-toastify';
import {Button, Container, Divider, Header, Loader, Grid, Modal, Image, Card, Form, Checkbox, Input, Label, Icon} from 'semantic-ui-react';

import {IGlobalContext, withGlobalContext} from '../../shared/contexts/global.context';
import productService from '../../shared/services/product.service';
import {IProduct} from "../../shared/models/IProduct";
import ProductCard from "./ProductCard";
import {ChangeEvent, FormEvent} from "react";

export interface IHomeProps {
    globalContext: IGlobalContext;
}

export interface IHomeState {
    products: IProduct[];
    isLoadingProducts: boolean;
    isAddModalOpen: boolean;
    newProduct: IProduct;
    isAddingNewProduct: boolean;
}

class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            isLoadingProducts: true,
            products: [],
            isAddModalOpen: false,
            isAddingNewProduct: false,
            newProduct: {
                id:0,
                available: true,
                description: '',
                name: '',
                pictureUrl: 'http://placehold.it/200x200',
                price: 0
            }
        };

        this.handleAddModalToggle = this.handleAddModalToggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNewProductSubmit = this.handleNewProductSubmit.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
    }

    fetchProducts(): void {
        this.setState({
            isLoadingProducts: true
        }, () => {
            productService.getAllProducts().then(products => {
                this.setState({
                    products: products.reverse(),
                    isLoadingProducts: false
                });
            }).catch(error => {
                toast.error(error.toString());
                this.setState({
                    products: [],
                    isLoadingProducts: false
                });
            });
        });
    }

    handleAddModalToggle(): void {
        this.setState(prevState => {
            return{
                isAddModalOpen: !prevState.isAddModalOpen
                };
            });
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const {name, value} = event.target;
        this.setState(prevState => {
            const newProduct = prevState.newProduct;
            newProduct[name] = value;
            return {newProduct};
        });

    }


    handleNewProductSubmit(): void {
        this.setState({
            isAddingNewProduct: true
        }, () => {
            productService.addNewProduct(this.state.newProduct).then(product => {
                toast.success('Product added Successfully.');
                this.setState({
                    isAddingNewProduct: false
                }, () => {
                    this.handleAddModalToggle();
                    this.fetchProducts();
                });
            }).catch(error => {
                toast.error('Error: '+ error.toString());
                this.setState({
                    isAddingNewProduct: false
                }, () => {
                    this.handleAddModalToggle();
                });
             });
        });
    }

    componentDidMount() {
        this.fetchProducts();
    }

    render() {
        const {globalContext} = this.props;
        const {isLoadingProducts, products, isAddModalOpen, newProduct, isAddingNewProduct} = this.state;

        return(
            <Container className='pt-5'>
                <Header as='h1' size='huge' className='pt-2'>
                    Welcome, { globalContext.userInfo ? globalContext.userInfo.name : 'User' }!
                </Header>
                <Divider />
                { isLoadingProducts && <Loader active inline='centered' className='mt-3 mb-3' /> }
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column class='right aligned'>
                            <Button circulat icon='plus' color='teal' onClick={this.handleAddModalToggle}/>
                        </Grid.Column>
                    </Grid.Row>
                     <Grid.Row columns={4}>
                        { products.map(product =>
                            <Grid.Column key={product.id} className= 'mb-2'>
                                <ProductCard product={product} onUpdate={this.fetchProducts} />
                            </Grid.Column>
                        )}
                     </Grid.Row>
                </Grid>
                <Modal open={isAddModalOpen} size='small'>
                    <Modal.Header> Add a Product </Modal.Header>
                    <Modal.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Image wrapped fluid src='http://placehold.it/200x200' />
                                    <div className='pt-1 pb-1' style={{textAlign: 'center'}}>
                                        <a> Select a Picture</a>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Form>
                                        <Form.Field>
                                            <label>Name</label>
                                            <input placeholder='TV Set, Sofa..' value={newProduct.name} name='name' onChange={this.handleInputChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label> Description</label>
                                            <textarea placeholder='A brief description about the product...'
                                                        value={newProduct.description} name='description' onChange={this.handleInputChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Price</label>
                                            <Input labelPosition='right' type='text' placeholder='Amount'>
                                                <Label basic><Icon name= 'rupee'/></Label>
                                                <input type='number' value={newProduct.price} name='price' onChange={this.handleInputChange} />
                                                <Label>0.0</Label>
                                            </Input>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleAddModalToggle} basic negative>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleNewProductSubmit}
                            basic positive labelPosition='right' icon='checkmark' content='Submit'
                            loading={isAddingNewProduct}
                        />
                    </Modal.Actions>
                </Modal>


            </Container>
        );
    }

}

export default withGlobalContext(Home);
