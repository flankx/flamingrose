package com.github.flamingrose.dto;

import java.util.List;
import lombok.Data;

@Data
public class TranslateResponse {

    private List<Translation> translations;

    @Data
    public static class Translation {

        private String text;
        private String to;
    }
}
