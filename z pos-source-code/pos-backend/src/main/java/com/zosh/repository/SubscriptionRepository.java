package com.zosh.repository;

import com.zosh.domain.SubscriptionStatus;
import com.zosh.modal.Store;
import com.zosh.modal.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    List<Subscription> findByStore(Store store);

    List<Subscription> findByStoreAndStatus(Store store, SubscriptionStatus status);

    List<Subscription> findByStatus(SubscriptionStatus status);

    List<Subscription> findByEndDateBetween(LocalDate startDate, LocalDate endDate);

    Long countByStatus(SubscriptionStatus status);
}
