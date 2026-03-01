package com.zosh.event;

import com.zosh.domain.PaymentGateway;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentInitiatedEvent {

    private Long paymentId;

    private Long storeId;


    private PaymentGateway provider;

    private Double amount;


    private Long subscriptionId;

    private String transactionId;

    private LocalDateTime initiatedAt;

    private String description;

    private String checkoutUrl;


    private String storeName;
}
