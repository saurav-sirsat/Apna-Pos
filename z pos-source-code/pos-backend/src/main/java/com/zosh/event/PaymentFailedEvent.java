package com.zosh.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentFailedEvent {

    private Long paymentId;

    private Long storeId;


    private Double amount;


    private Long subscriptionId;

    private String failureReason;

    private String providerPaymentId;

    private String transactionId;

    private LocalDateTime failedAt;

    private String description;


}
