package com.management.projectmanagement.controller;

import com.management.projectmanagement.dto.ClientDetailsDTO;
import com.management.projectmanagement.dto.ClientDetailsResponseDTO;
import com.management.projectmanagement.entity.ClientDetails;
import com.management.projectmanagement.service.ClientDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
public class ClientDetailsController {

    @Autowired
    private ClientDetailsService clientDetailsService;

    @PostMapping("/save")
    public ResponseEntity<ClientDetailsResponseDTO> createClientDetails(@RequestBody ClientDetailsDTO clientDetailsDTO) {
        ClientDetails clientDetails = clientDetailsService.saveClient(clientDetailsDTO);
        ClientDetailsDTO clientDetailsDTOResponse = clientDetailsService.toDTO(clientDetails);
        ClientDetailsResponseDTO response = new ClientDetailsResponseDTO(clientDetailsDTOResponse);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<ClientDetailsDTO>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(clientDetailsService.getAll());
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<ClientDetails> updateClient(@PathVariable Long id,
                                                      @RequestBody ClientDetailsDTO clientDetailsDTO) {
        ClientDetails updatedClient = clientDetailsService.updateClient(id, clientDetailsDTO);
        return new ResponseEntity<>(updatedClient, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{clientId}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long clientId) {
        clientDetailsService.deleteClient(clientId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ClientDetailsDTO> getClientById(@PathVariable Long id) {
        ClientDetailsDTO clientDetailsDTO = clientDetailsService.getClientById(id);
        return ResponseEntity.ok(clientDetailsDTO);
    }
}
