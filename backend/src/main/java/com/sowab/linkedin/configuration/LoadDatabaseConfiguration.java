package com.sowab.linkedin.configuration;

import com.sowab.linkedin.features.authentication.model.AuthenticationUser;
import com.sowab.linkedin.features.authentication.repository.AuthenticationUserRepository;
import com.sowab.linkedin.features.authentication.utils.Encoder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadDatabaseConfiguration {

    private final Encoder encoder;

    public LoadDatabaseConfiguration(Encoder encoder) {
        this.encoder = encoder;
    }

    @Bean
    public CommandLineRunner initDatabase(AuthenticationUserRepository authenticationUserRepository) {
        return args -> {
            AuthenticationUser authenticationUser = new AuthenticationUser("sowab@example.com", encoder.encode("sowab"));
            authenticationUserRepository.save(authenticationUser);
        };
    }
}
