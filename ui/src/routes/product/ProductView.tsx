import * as React from 'react';
import {IProduct} from '../../shared/models/IProduct';
import productService from '../../shared/services/product.service';
import {toast} from "react-toastify";
import {Button, Container, Divider, Header, Loader, Grid, Placeholder, Image, Item, Icon, Label} from 'semantic-ui-react';


export interface IProductViewProps {
    match: any;
}

export interface IProductViewState {
    isLoading: boolean;
    product?: IProduct;
}

export default class ProductView extends React.Component<IProductViewProps, IProductViewState> {

    private productId: string;

    constructor(props: IProductViewProps) {
        super(props);

        this.state = {
            isLoading: true
        };

        this.productId = '';
    }
    
    fetchProduct() {
        this.setState({
            isLoading: true
        }, () => {
            productService.getProductById(this.productId).then(product => {
                setTimeout(() => {
                    this.setState({
                        product,
                        isLoading: false
                    });
                }, 1000);
            }).catch(error => {
                toast.error(error.toString());
                this.setState({
                    product: undefined,
                    isLoading: false
                });
            });
        });
    }

    componentDidMount() {
        this.productId = this.props.match.params.id;
        this.fetchProduct();
    }

    render() {
        const {isLoading, product} = this.state;

        if (isLoading) {
            return(
                <Container className='pt-5 pb-5'>
                    <Grid divided='vertically'>
                        <Grid.Row className='pt-3 pb-3'>
                            <Grid.Column width={4}>
                                <Placeholder>
                                    <Placeholder.Image square />
                                </Placeholder>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Placeholder>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                </Placeholder>
                                <Placeholder fluid>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                </Placeholder>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }

        if (product) {
            return(
                <Container className='pt-5 pb-5'>
                    <Grid divided='vertically'>
                        <Grid.Row className='pt-3 pb-3'>
                            <Grid.Column width={4}>
                                <Image src={product.pictureUrl} fluid/>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <h2>
                                    {product.name}
                                    <Button floated='right' circular icon='edit' />
                                </h2>
                                <p>{product.description}</p>
                                <Button
                                    disabled={!product.available}
                                    basic
                                    color={product.available ? 'blue' : 'red'}
                                    content={product.price}
                                    icon='rupee'
                                    label={{ as: 'a', basic: true, color: product.available ? 'blue' : 'red', pointing: 'left',
                                        content: product.available ? 'Buy Now' : 'Out of Stock',
                                        disabled: !product.available }}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }

        /*return(
            <Container className='pt-5 pb-5'>
                <Grid divided='vertically'>
                    <Grid.Row className='pt-3 pb-3'>
                        <Grid.Column width={4}>
                            { isLoading &&
                                <Placeholder>
                                    <Placeholder.Image square />
                                </Placeholder>
                            }
                            { product &&
                                <Image src={product.pictureUrl} wrapped ui={false} />
                            }
                        </Grid.Column>
                        <Grid.Column width={12}>
                            {isLoading &&
                                <Placeholder>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                </Placeholder>
                            }
                            { product &&
                                <h2>{product.name}</h2>
                            }
                            {isLoading &&
                                <Placeholder fluid>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                </Placeholder>
                            }
                            { product &&
                                <p>{product.description}</p>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );*/
    }

}