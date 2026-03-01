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
public class PaymentSuccessEvent {

    private Long paymentId;

    private Long storeId;


    private Double amount;



    private Long subscriptionId;

    private String providerPaymentId;

    private String transactionId;

    private LocalDateTime paidAt;

    private String description;
}
