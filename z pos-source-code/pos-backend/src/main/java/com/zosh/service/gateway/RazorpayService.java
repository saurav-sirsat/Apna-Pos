package com.zosh.service.gateway;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.zosh.exception.PaymentException;
import com.zosh.modal.Payment;
import com.zosh.modal.User;
import com.zosh.payload.response.PaymentLinkResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@Slf4j
@RequiredArgsConstructor
public class RazorpayService {


    @Value("${razorpay.api.key}")
    private String razorpayKeyId;

    @Value("${razorpay.api.secret}")
    private String razorpayKeySecret;

    private String callbackBaseUrl;




    public PaymentLinkResponse createPaymentLink(
            User user,
            Payment payment) throws PaymentException {

        validateConfiguration();

        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            BigDecimal amount = BigDecimal.valueOf(payment.getAmount());
            Long amountInPaisa = amount.multiply(new BigDecimal("100")).longValue();


            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amountInPaisa);
            paymentLinkRequest.put("currency", "INR");
            paymentLinkRequest.put("description", payment.getTransactionId());

            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            if (user.getPhone() != null) {
                customer.put("contact", user.getPhone());
            }
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            notify.put("sms", user.getPhone() != null);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("reminder_enable", true);

            String successUrl = callbackBaseUrl + "/booking-success/" + payment.getSubscription().getId();
            String cancelUrl = callbackBaseUrl + "/payment-cancelled/" + payment.getId();

            paymentLinkRequest.put("callback_url", successUrl);
            paymentLinkRequest.put("callback_method", "get");

            JSONObject notes = new JSONObject();
            notes.put("user_id", user.getId());
            notes.put("payment_id", payment.getId());
            notes.put("subscription_id",payment.getSubscription().getId());

            paymentLinkRequest.put("notes", notes);

            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentUrl = paymentLink.get("short_url");
            String paymentLinkId = paymentLink.get("id");

            log.info("Razorpay payment link created successfully. Link ID: {}, Payment ID: {}",
                paymentLinkId, payment.getId());

            PaymentLinkResponse response = new PaymentLinkResponse();
            response.setPayment_link_url(paymentUrl);
            response.setPayment_link_id(paymentLinkId);

            return response;

        } catch (RazorpayException e) {
            log.error("Failed to create Razorpay payment link: {}", e.getMessage(), e);
            throw new PaymentException("Failed to create payment link: " + e.getMessage());
        }
    }





    public boolean isConfigured() {
        return razorpayKeyId != null && !razorpayKeyId.isEmpty()
               && razorpayKeySecret != null && !razorpayKeySecret.isEmpty();
    }

    private void validateConfiguration() throws PaymentException {
        if (!isConfigured()) {
            throw new PaymentException(
                "Razorpay is not configured. Please set razorpay.key.id and razorpay.key.secret");
        }
    }


    public JSONObject fetchPaymentDetails(String paymentId) throws PaymentException {
        validateConfiguration();

        System.out.println("RAZORYPAY PAYMENT_ID: ------- " + paymentId);

        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            com.razorpay.Payment payment = razorpay.payments.fetch(paymentId);

            return payment.toJson();

        } catch (RazorpayException e) {
            log.error("Failed to fetch payment details for {}: {}", paymentId, e.getMessage(), e);
            throw new PaymentException("Failed to fetch payment details: " + e.getMessage());
        }
    }

    public boolean isValidPayment(String paymentId) {
        try {

            JSONObject paymentDetails =fetchPaymentDetails(paymentId);

            String status = paymentDetails.optString("status");
            long amount = paymentDetails.optLong("amount");
            long amountInRupees = amount / 100;

            JSONObject notes = paymentDetails.getJSONObject("notes");

            System.out.println("payment details ------ "+ paymentDetails);

            if (!"captured".equalsIgnoreCase(status)) {
                log.warn("Payment not captured. Current status: {}", status);
                return false;
            }


            String bookingId = paymentDetails.optString("booking_id");

            return true;


        } catch (Exception e) {
            log.error("❌ Error verifying Razorpay payment: {}", e.getMessage(), e);
            return false;
        }
    }
}
