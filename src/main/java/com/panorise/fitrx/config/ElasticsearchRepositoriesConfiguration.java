package com.panorise.fitrx.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.elasticsearch.repository.config.EnableReactiveElasticsearchRepositories;

@Configuration
@Profile("elasticsearch")
@EnableReactiveElasticsearchRepositories("com.panorise.fitrx.repository.search")
public class ElasticsearchRepositoriesConfiguration {}
