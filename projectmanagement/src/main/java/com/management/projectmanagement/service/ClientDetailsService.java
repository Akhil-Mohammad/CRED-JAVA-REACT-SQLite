package com.management.projectmanagement.service;

import com.management.projectmanagement.dto.ClientDetailsDTO;
import com.management.projectmanagement.dto.ClientDetailsResponseDTO;
import com.management.projectmanagement.dto.ProjectDetailsDTO;
import com.management.projectmanagement.entity.ClientDetails;
import com.management.projectmanagement.entity.ProjectDetails;
import com.management.projectmanagement.repository.ClientDetailsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClientDetailsService {
    @Autowired
    private ClientDetailsRepository clientDetailsRepository;

    public ClientDetails saveClient(ClientDetailsDTO clientDetailsDTO) {
        ClientDetails clientDetails = new ClientDetails();
        clientDetails.setId(clientDetails.getId());
        clientDetails.setName(clientDetailsDTO.getName());
        clientDetails.setAddress(clientDetailsDTO.getAddress());
        clientDetails.setWorkLocation(clientDetailsDTO.getWorkLocation());

        List<ProjectDetails> projects = new ArrayList<>();
        for (ProjectDetailsDTO projectDetailsDTO : clientDetailsDTO.getProjects()) {
            ProjectDetails projectDetails = new ProjectDetails();
            projectDetails.setProjectId(projectDetailsDTO.getProjectId());
            projectDetails.setProjectName(projectDetailsDTO.getProjectName());
            projectDetails.setRevenue(projectDetailsDTO.getRevenue());
            projectDetails.setStartDate(projectDetailsDTO.getStartDate());
            projectDetails.setEndDate(projectDetailsDTO.getEndDate());
            projectDetails.setClient(clientDetails);
            projects.add(projectDetails);
        }
        clientDetails.setProjects(projects);

        clientDetails = clientDetailsRepository.save(clientDetails);
        return clientDetails;
    }

    public ClientDetailsDTO toDTO(ClientDetails clientDetails) {
        ClientDetailsDTO dto = new ClientDetailsDTO();
        dto.setId(clientDetails.getId());
        dto.setName(clientDetails.getName());
        dto.setAddress(clientDetails.getAddress());
        dto.setWorkLocation(clientDetails.getWorkLocation());

        List<ProjectDetailsDTO> projectDTOs = new ArrayList<>();
        for (ProjectDetails project : clientDetails.getProjects()) {
            ProjectDetailsDTO projectDTO = new ProjectDetailsDTO();
            projectDTO.setProjectId(project.getProjectId());
            projectDTO.setProjectName(project.getProjectName());
            projectDTO.setRevenue(project.getRevenue());
            projectDTO.setStartDate(project.getStartDate());
            projectDTO.setEndDate(project.getEndDate());
            projectDTOs.add(projectDTO);
        }
        dto.setProjects(projectDTOs);

        return dto;
    }


    public ClientDetails updateClient(Long clientId, ClientDetailsDTO clientDetailsDTO) {
        ClientDetails existingClient = clientDetailsRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + clientId));

        existingClient.setName(clientDetailsDTO.getName());
        existingClient.setAddress(clientDetailsDTO.getAddress());
        existingClient.setWorkLocation(clientDetailsDTO.getWorkLocation());

        // Clear existing projects
        existingClient.getProjects().clear();

        // Update projects (add new collection items)
        for (ProjectDetailsDTO projectDetailsDTO : clientDetailsDTO.getProjects()) {
            ProjectDetails projectDetails = new ProjectDetails();
            projectDetails.setProjectName(projectDetailsDTO.getProjectName());
            projectDetails.setRevenue(projectDetailsDTO.getRevenue());
            projectDetails.setStartDate(projectDetailsDTO.getStartDate());
            projectDetails.setEndDate(projectDetailsDTO.getEndDate());
            projectDetails.setClient(existingClient); // Set the client for the project
            existingClient.getProjects().add(projectDetails);
        }

        // Save the updated client
        existingClient = clientDetailsRepository.save(existingClient);
        return existingClient;
    }




    public void deleteClient(Long clientId) {
        ClientDetails existingClient = clientDetailsRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + clientId));
        clientDetailsRepository.delete(existingClient);
    }



    public List<ClientDetailsDTO> getAll() {
        List<ClientDetails> clients = clientDetailsRepository.findAll();
        return clients.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }





    public ClientDetailsDTO getClientById(Long clientId) {
        ClientDetails clientDetails = clientDetailsRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + clientId));
        return toDTO(clientDetails);
    }

}
