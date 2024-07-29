package com.management.projectmanagement.dto;


import lombok.Data;

import java.time.LocalDate;

@Data
public class ProjectDetailsDTO {

    private Long projectId;
    private String projectName;
    private double revenue;
    private LocalDate startDate;
    private LocalDate endDate;


}
