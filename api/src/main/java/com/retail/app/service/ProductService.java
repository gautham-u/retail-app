package com.retail.app.service;

import com.retail.app.model.Product;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Validated
public interface ProductService {

    @NotNull Iterable<Product> getAllProducts();

    Product getProduct(@Min(value = 1L, message = "Invalid product ID.") long id);

    Product save(Product product);

    Product update(@Min(value = 1L, message = "Invalid product Id") long id, Product product);

    void delete(long id);
}
