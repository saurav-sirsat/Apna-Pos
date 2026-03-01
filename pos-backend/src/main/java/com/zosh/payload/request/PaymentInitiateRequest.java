package com.zosh.payload.request;

import com.zosh.domain.PaymentGateway;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentInitiateRequest {

    @NotNull(message = "Store ID is mandatory")
    private Long storeId;

    @NotNull(message = "subscriptionId is required")


    @NotNull(message = "Payment gateway is mandatory")

    @NotNull(message = "Amount is mandatory")
    @Positive(message = "Amount must be positive")
    private Double amount;

    private String description;


}
