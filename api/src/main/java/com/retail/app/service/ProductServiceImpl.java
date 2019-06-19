package com.retail.app.service;

import com.retail.app.exception.ResourceNotFoundException;
import com.retail.app.model.Product;
import com.retail.app.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Min;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Iterable<Product> getAllProducts() {
        logger.debug("ProductServiceImpl -> getAllProducts");
        return productRepository.findAll();
    }

    @Override
    public Product getProduct(long id) {
        logger.debug("ProductServiceImpl -> getProduct By id");
        return productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("IProduct not found"));
    }

    @Override
    public Product save(Product product) {
        logger.debug("ProductServiceImpl -> saveProduct");
        return productRepository.save(product);
    }

    @Override
    public Product update(@Min(value = 1L, message = "Invalid product Id") long id, Product product) {

        if (productRepository.findById(id) == null) {
            logger.error("ProductServiceImpl -> update-> Product not found");
            throw new ResourceNotFoundException("Product not found");
        } else {
            logger.debug("ProductServiceImpl -> update");
            product.setId(id);
            return productRepository.save(product);
        }

    }

    @Override
    public void delete(long id){
        if (productRepository.findById(id) == null) {
            logger.error("ProductServiceImpl -> delete-> Product not found");
            throw new ResourceNotFoundException("IProduct not found");
        } else {
            logger.debug("ProductServiceImpl -> delete");
            productRepository.deleteById(id);
        }
    }
}
