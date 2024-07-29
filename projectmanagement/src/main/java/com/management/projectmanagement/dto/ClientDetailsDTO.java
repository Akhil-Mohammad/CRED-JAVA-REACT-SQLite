package com.management.projectmanagement.dto;


import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Data
@JsonPropertyOrder({ "id", "name", "address", "workLocation", "projects" })
public class ClientDetailsDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String Address;
    private String workLocation;
    private List<ProjectDetailsDTO> projects;

}
