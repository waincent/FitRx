package com.panorise.fitrx.service.search;

import com.panorise.fitrx.domain.User;
import com.panorise.fitrx.repository.search.UserSearchRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Profile("elasticsearch")
public class ElasticsearchUserSearchService implements UserSearchService {

    private final UserSearchRepository userSearchRepository;

    public ElasticsearchUserSearchService(UserSearchRepository userSearchRepository) {
        this.userSearchRepository = userSearchRepository;
    }

    @Override
    public Mono<User> save(User user) {
        return userSearchRepository.save(user);
    }

    @Override
    public Mono<Void> delete(User user) {
        return userSearchRepository.delete(user);
    }

    @Override
    public Flux<User> search(String query) {
        return userSearchRepository.search(query);
    }
}
