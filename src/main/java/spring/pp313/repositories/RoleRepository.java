package spring.pp313.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spring.pp313.models.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
