package com.bugtracker.codeclan.bugtracker.components;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.bugtracker.codeclan.bugtracker.models.Bug;
import com.bugtracker.codeclan.bugtracker.models.User;
import com.bugtracker.codeclan.bugtracker.repositories.BugRepository;
import com.bugtracker.codeclan.bugtracker.repositories.UserRepository;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BugRepository bugRepository;

    public DataLoader() {
    }

    @Override
    public void run(ApplicationArguments args) {

        // -------- ADMINS (Senior Players ) --------
        User virat = new User(
                "virat",
                "Virat K",
                "vKohli",
                "virat.k@demo.com",
                "admin"
        );
        userRepository.save(virat);

        User rohit = new User(
                "rohit",
                "Rohit S",
                "rSharma",
                "rohit.s@demo.com",
                "admin"
        );
        userRepository.save(rohit);

        User dhoni = new User(
                "dhoni",
                "Mahendra D",
                "mDhoni",
                "mahendra.d@demo.com",
                "admin"
        );
        userRepository.save(dhoni);

        User rahul = new User(
                "rahul",
                "KL Rahul",
                "kRahul",
                "kl.rahul@demo.com",
                "admin"
        );
        userRepository.save(rahul);

        // -------- USERS (Team Players) --------
        User bumrah = new User(
                "bumrah",
                "Jasprit B",
                "jBumrah",
                "jasprit.b@demo.com",
                "user"
        );
        userRepository.save(bumrah);

        User hardik = new User(
                "hardik",
                "Hardik P",
                "hPandya",
                "hardik.p@demo.com",
                "user"
        );
        userRepository.save(hardik);

        User jadeja = new User(
                "jadeja",
                "Ravindra J",
                "rJadeja",
                "ravindra.j@demo.com",
                "user"
        );
        userRepository.save(jadeja);

        User shubman = new User(
                "shubman",
                "Shubman G",
                "sGill",
                "shubman.g@demo.com",
                "user"
        );
        userRepository.save(shubman);


        Bug bug1 = new Bug("Captain dashboard not loading", "high", virat);
        bug1.addAssignee(virat);
        bug1.addAssignee(rohit);
        bug1.setDateReported(LocalDate.of(2021, 12, 25));
        bugRepository.save(bug1);

        Bug bug2 = new Bug("Scorecard UI alignment issue", "low", rahul);
        bug2.addAssignee(rahul);
        bug2.setDateReported(LocalDate.of(2020, 10, 12));
        bugRepository.save(bug2);

        Bug bug3 = new Bug("Navbar breaks on mobile view", "medium", dhoni);
        bug3.addAssignee(bumrah);
        bug3.setDateReported(LocalDate.of(2020, 8, 7));
        bugRepository.save(bug3);

        Bug bug4 = new Bug("User registration form timeout", "high", rohit);
        bug4.addAssignee(hardik);
        bug4.setDateReported(LocalDate.of(2021, 2, 5));
        bugRepository.save(bug4);

        Bug bug5 = new Bug("Session expires in middle of workflow", "low", rohit);
        bug5.addAssignee(jadeja);
        bug5.setDateReported(LocalDate.of(2021, 1, 26));
        bugRepository.save(bug5);

        Bug bug6 = new Bug("Footer not rendering correctly", "high", rahul);
        bug6.addAssignee(shubman);
        bug6.setDateReported(LocalDate.of(2020, 12, 28));
        bugRepository.save(bug6);

        Bug bug7 = new Bug("Careers page missing content", "low", bumrah);
        bug7.addAssignee(rohit);
        bugRepository.save(bug7);

        Bug bug8 = new Bug("Notifications are inconsistent", "medium", hardik);
        bug8.addAssignee(dhoni);
        bugRepository.save(bug8);
    }
}
