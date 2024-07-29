package com.management.projectmanagement.repository;

import com.management.projectmanagement.entity.ClientDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientDetailsRepository extends JpaRepository<ClientDetails, Long> {
}
