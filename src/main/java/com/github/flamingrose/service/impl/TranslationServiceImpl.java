package com.github.flamingrose.service.impl;

import com.github.flamingrose.dto.TranslateResponse;
import com.github.flamingrose.service.TranslationService;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestClient;

@Service
public class TranslationServiceImpl implements TranslationService {

    private final RestClient restClient;

    public TranslationServiceImpl(@Qualifier("azureRestClient") RestClient restClient) {
        this.restClient = restClient;
    }

    @Override
    public String translate(String text, String fromLang, String toLang) {
        List<TranslateResponse> resp = restClient
            .post()
            .uri(
                uriBuilder ->
                    uriBuilder
                        .path("/translate")
                        .queryParam("api-version", "3.0")
                        .queryParam("from", fromLang)
                        .queryParam("to", toLang)
                        .build()
            )
            .contentType(MediaType.APPLICATION_JSON)
            .body(Collections.singletonList(Map.of("Text", text)))
            .retrieve()
            .body(new ParameterizedTypeReference<>() {});
        if (CollectionUtils.isEmpty(resp)) {
            return null;
        }
        TranslateResponse response = resp.get(0);
        if (CollectionUtils.isEmpty(response.getTranslations())) {
            return null;
        }
        return response.getTranslations().get(0).getText();
    }
}
