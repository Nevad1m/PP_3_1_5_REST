package spring.pp313;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import spring.pp313.models.Role;
import spring.pp313.models.User;
import spring.pp313.repositories.RoleRepository;
import spring.pp313.repositories.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
public class InitUsers implements CommandLineRunner {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public InitUsers(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public void run(String... arg) throws Exception {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        Set<Role> adminRoles = new HashSet<>();
        Set<Role> userRoles = new HashSet<>();
        roleRepository.save(roleAdmin);
        roleRepository.save(roleUser);
        adminRoles.add(roleAdmin);
        adminRoles.add(roleUser);
        userRoles.add(roleUser);

        User userAdmin = new User("Vadim", "Petrenko", 27, "vadim@gmail.com",
                "$2a$12$pSKVszenGxZNKhulnhXX4u1DEo.o3EZ6gUJ5IM5iUmX3sQ9c2IzU6", adminRoles);//Password 100
        User userUser = new User("Mark", "Frolov", 24, "mark@gmail.com",
                "$2a$12$1eZnwb.FO0tnfBewGIcQ8OuqnDt8io5wlr1/GfgrjC4GQ5iwCWYty", userRoles);//Password 200
        userRepository.save(userAdmin);
        userRepository.save(userUser);

    }

}
