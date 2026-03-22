package com.panorise.fitrx.service.search;

import com.panorise.fitrx.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Profile("!elasticsearch")
public class NoOpUserSearchService implements UserSearchService {

    private static final Logger LOG = LoggerFactory.getLogger(NoOpUserSearchService.class);

    @Override
    public Mono<User> save(User user) {
        return Mono.just(user);
    }

    @Override
    public Mono<Void> delete(User user) {
        return Mono.empty();
    }

    @Override
    public Flux<User> search(String query) {
        LOG.debug("Skipping search for query '{}' because the elasticsearch profile is not active", query);
        return Flux.empty();
    }
}
