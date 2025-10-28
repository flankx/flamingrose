package com.github.flamingrose.web.rest;

import com.github.flamingrose.dto.TranslateRequest;
import com.github.flamingrose.service.TranslationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/translate")
@RequiredArgsConstructor
public class TranslationController {

    private final TranslationService translationService;

    @PostMapping
    public ResponseEntity<String> translate(@RequestBody TranslateRequest text) {
        String result = translationService.translate(text.getText(), text.getFrom(), text.getTo());
        return ResponseEntity.ok(result);
    }
}
