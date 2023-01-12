package spring.pp313.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

//    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/").setViewName("/login_page");
//        registry.addViewController("/login").setViewName("/login_page");
//        registry.addViewController("/user").setViewName("user");
//        registry.addViewController("/admin").setViewName("admin");
//
//    }
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/user").setViewName("user");
    }
}


