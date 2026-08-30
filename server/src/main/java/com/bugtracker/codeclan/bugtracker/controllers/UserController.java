package com.bugtracker.codeclan.bugtracker.controllers;

import com.bugtracker.codeclan.bugtracker.models.User;
import com.bugtracker.codeclan.bugtracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> getAllUsers(
            @RequestParam(name = "bug_id", required = false) Long id
    ){
        if(id != null)  {
            return new ResponseEntity(userRepository.findByBugsId(id),HttpStatus.OK);
        }

        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

//    @GetMapping(value = "/users/{id}")
//    public ResponseEntity getUserById(@PathVariable Long id){
//        return new ResponseEntity(userRepository.findById(id), HttpStatus.OK);
//    }

    @GetMapping(value = "/users/{username}")
    public ResponseEntity getUserByUsername(@PathVariable String username){
        return new ResponseEntity(userRepository.findByUsername(username), HttpStatus.OK);
    }

    @PostMapping(value = "/users")
    public ResponseEntity<User> postUser(@RequestBody User user){
        User foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser == null) {
            userRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }
        else {
            foundUser.setName(user.getName());
            foundUser.setNickname(user.getNickname());
            foundUser.setEmail(user.getEmail());
            foundUser.setRole(user.getRole());
            return new ResponseEntity<>(foundUser, HttpStatus.OK);
        }
    }

}
