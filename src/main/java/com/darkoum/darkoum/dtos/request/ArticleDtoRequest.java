package com.darkoum.darkoum.dtos.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@NoArgsConstructor
public class ArticleDtoRequest {
    private String codeArticle;
    private String designation;
    private Long userId;
}