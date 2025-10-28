package com.github.flamingrose.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TranslateRequest {

    private String text;
    private String from;
    private String to;
}
