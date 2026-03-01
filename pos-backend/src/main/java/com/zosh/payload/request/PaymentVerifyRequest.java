package com.zosh.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentVerifyRequest {





    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;

    private String stripePaymentIntentId;
    private String stripePaymentIntentStatus;

}
