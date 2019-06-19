import * as React from 'react';
import {Button, Card, Form, Grid, Icon, Image, Input, Label, Modal} from "semantic-ui-react";
import {IProduct} from "../../shared/models/IProduct";
import {ChangeEvent} from "react";
import productService from "../../shared/services/product.service";
import {toast} from "react-toastify";

export interface IProductCardProps {
    product: IProduct;
    onUpdate: () => void;
}

export interface IProductCardState {
    isEditModalOpen: boolean;
    isUpdatingProduct: boolean;
    productToUpdate: IProduct;
}

class ProductCard extends React.Component<IProductCardProps, IProductCardState> {

    constructor(props: IProductCardProps) {
        super(props);

        this.state ={
            isEditModalOpen: false,
            isUpdatingProduct: false,
            productToUpdate: {... props.product}

        };

        this.handleEditModalToggle = this.handleEditModalToggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEditProductSubmit = this.handleEditProductSubmit.bind(this);

    }

    handleEditModalToggle(): void {
        this.setState(prevState => {
            return {
                isEditModalOpen: !prevState.isEditModalOpen
            };
        });
    }

    handleEditProductSubmit(): void {
        this.setState({
            isUpdatingProduct: true
        }, () => {
            productService.updateProduct(this.state.productToUpdate).then(product => {
                toast.success('Product updated successfully.');
                this.setState({
                    isUpdatingProduct: false
                }, () => {
                    this.handleEditModalToggle();
                    this.props.onUpdate();
                });
            }).catch(error => {
                toast.error('Error: '+ error.toString());
                this.setState({
                    isUpdatingProduct: false}
                ,() => {
                    this.handleEditModalToggle();
                });
            });
        });
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void{
        const {name, value} = event.target;
        this.setState(prevState => {
            const productToUpdate = prevState.productToUpdate;
            productToUpdate[name] = value;
            return {productToUpdate};
        });
    }

    render() {
        const {product} = this.props;
        const {isEditModalOpen, productToUpdate, isUpdatingProduct} = this.state;

        return(
           <Card>
                <Image src={product.pictureUrl} wrapped ui={false} />
                <Card.Content>
                    <Button floated='right' basic circular icon='edit' onClick={this.handleEditModalToggle} />
                    <Card.Header> {product.name} </Card.Header>
                    <Card.Meta>
                        <p style={{ color: product.available ? 'black' : 'red'}}>
                            {product.available ? 'Available' : 'Out of stock'}
                        </p>
                    </Card.Meta>
                    <Card.Description>
                        {product.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='rupee' />
                    {product.price}
                </Card.Content>
                <Modal open={isEditModalOpen} size='small'>
                    <Modal.Header> Edit Product </Modal.Header>
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
                                            <input placeholder='TV Set, Sofa..' value={productToUpdate.name} name='name' onChange={this.handleInputChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label> Description</label>
                                            <textarea placeholder='A brief description about the product...'
                                                        value={productToUpdate.description} name='description' onChange={this.handleInputChange} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Price</label>
                                            <Input labelPosition='right' type='text' placeholder='Amount'>
                                                <Label basic><Icon name= 'rupee'/></Label>
                                                <input type='number' value={productToUpdate.price} name='price' onChange={this.handleInputChange} />
                                                <Label>0.0</Label>
                                            </Input>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleEditModalToggle} basic negative>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleEditProductSubmit}
                            basic positive labelPosition='right' icon='checkmark' content='Submit'
                            loading={isUpdatingProduct}
                        />
                    </Modal.Actions>
                </Modal>
           </Card>
        );
    }

}

export default ProductCard;