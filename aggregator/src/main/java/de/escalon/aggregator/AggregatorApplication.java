package de.escalon.aggregator;

import nz.net.ultraq.thymeleaf.LayoutDialect;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.StandardTemplateModeHandlers;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;
import org.thymeleaf.templateresolver.UrlTemplateResolver;

@SpringBootApplication
public class AggregatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(AggregatorApplication.class, args);
    }

    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.addTemplateResolver(templateResolver());
        templateEngine.addTemplateResolver(urlTemplateResolver());
//        templateEngine.addDialect(new LayoutDialect());
        return templateEngine;
    }

    @Bean
    public ITemplateResolver urlTemplateResolver() {
        UrlTemplateResolver urlTemplateResolver = new UrlTemplateResolver();
        urlTemplateResolver.setTemplateMode(StandardTemplateModeHandlers.LEGACYHTML5.getTemplateModeName());
        urlTemplateResolver.setCacheable(false);
        return urlTemplateResolver;
    }

    @Bean
    public ITemplateResolver templateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setPrefix("classpath:templates/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode(StandardTemplateModeHandlers.LEGACYHTML5.getTemplateModeName());
        resolver.setCharacterEncoding("UTF-8");
        resolver.setCacheable(false);
//        ServletContextTemplateResolver resolver = new ServletContextTemplateResolver();
//        resolver.setPrefix("/WEB-INF/thymeleaf/");
//        resolver.setSuffix(".html");
//        resolver.setCharacterEncoding("UTF-8");
//        resolver.setCacheable(false);
//        resolver.setTemplateMode(StandardTemplateModeHandlers.LEGACYHTML5.getTemplateModeName());
        return resolver;
    }

}
