package spring.pp313.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import spring.pp313.models.User;
import spring.pp313.services.RoleService;
import spring.pp313.services.UserService;


import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;

    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String showAllUsers(Principal principal, Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("admin", userService.findUserByUsername(principal.getName()));
        model.addAttribute("newUser", new User());
        model.addAttribute("rolesAdd", roleService.getAllRoles());
        return "admin";
    }

    @PostMapping
    public String addCreateNewUser(@ModelAttribute("user") User user) {
        userService.createNewUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/{id}")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

}
