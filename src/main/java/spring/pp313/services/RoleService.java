package spring.pp313.services;

import spring.pp313.models.Role;

import java.util.List;

public interface RoleService {

    public Role findById(Long id);
    public List<Role> getAllRoles();
    public void addRole(Role role);

}
