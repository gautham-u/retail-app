package com.retail.app;

import com.retail.app.model.Product;
import com.retail.app.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@Configuration
@EnableSwagger2
public class RetailAppApplication {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE").allowedOrigins("*")
						.allowedHeaders("*");
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(RetailAppApplication.class, args);
	}

	//Load Data into the DB
	@Bean
	CommandLineRunner runner(ProductService productService) {
		return args -> {
			productService.save(new Product(1L, "Mobile","",true, 30000.00, "http://placehold.it/200x200"));
			productService.save(new Product(2L, "Game Console","",true, 20000.00, "http://placehold.it/200x200"));
			productService.save(new Product(3L, "Bean Bag","",true, 1000.00, "http://placehold.it/200x200"));
			productService.save(new Product(4L, "Bottles","",true, 500.00, "http://placehold.it/200x200"));
			productService.save(new Product(5L, "Bags","",true, 3000.00, "http://placehold.it/200x200"));
			productService.save(new Product(6L, "Laptop","",true, 50000.00, "http://placehold.it/200x200"));
			productService.save(new Product(7L, "Watch","",true, 3000.00, "http://placehold.it/200x200"));
		};
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.any())
				.paths(PathSelectors.any())
				.build();
	}
}
