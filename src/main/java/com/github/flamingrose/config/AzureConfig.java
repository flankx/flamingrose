package com.github.flamingrose.config;

import java.util.Map;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class AzureConfig {

    @Value("${azure.translator.key}")
    private String apiKey;

    @Value("${azure.translator.endpoint}")
    private String endpoint;

    @Value("${azure.translator.region}")
    private String region;

    @Bean
    @Qualifier("azureRestClient")
    public RestClient azureRestClient() {
        return RestClient.builder()
            .baseUrl(endpoint)
            .defaultHeaders(headers -> {
                headers.add("Ocp-Apim-Subscription-Key", apiKey);
                headers.add("Ocp-Apim-Subscription-Region", region);
                headers.add("Content-type", "application/json");
            })
            .build();
    }
}
