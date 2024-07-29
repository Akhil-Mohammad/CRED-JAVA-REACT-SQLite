package com.management.projectmanagement.dto;

import com.management.projectmanagement.dto.ClientDetailsDTO;

public class ClientDetailsResponseDTO {
    private ClientDetailsDTO clientDetails;

    public ClientDetailsResponseDTO(ClientDetailsDTO clientDetails) {
        this.clientDetails = clientDetails;
    }

    public ClientDetailsDTO getClientDetails() {
        return clientDetails;
    }

    public void setClientDetails(ClientDetailsDTO clientDetails) {
        this.clientDetails = clientDetails;
    }
}
