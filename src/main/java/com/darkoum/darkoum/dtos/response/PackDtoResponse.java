package com.darkoum.darkoum.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PackDtoResponse {

    private Long id;
    private String name;
    private String description;
    private Float price;
    private List<String> articleNames;
}