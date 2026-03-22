package com.panorise.fitrx.service.search;

import com.panorise.fitrx.domain.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserSearchService {
    Mono<User> save(User user);

    Mono<Void> delete(User user);

    Flux<User> search(String query);
}
