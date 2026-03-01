package com.zosh.controller;

import com.zosh.domain.PaymentGateway;
import com.zosh.domain.PaymentStatus;
import com.zosh.domain.SubscriptionStatus;
import com.zosh.exception.PaymentException;
import com.zosh.modal.Subscription;
import com.zosh.payload.response.PaymentInitiateResponse;
import com.zosh.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;


    @PostMapping("/subscribe")
    public ResponseEntity<?> createSubscription(
            @RequestParam Long storeId,
            @RequestParam Long planId,
            @RequestParam(defaultValue = "RAZORPAY") PaymentGateway gateway,
            @RequestParam(required = false) String transactionId
    ) throws PaymentException {


        PaymentInitiateResponse res=subscriptionService.createSubscription(storeId, planId, gateway, transactionId);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/upgrade")
    public ResponseEntity<?> upgradePlan(
            @RequestParam Long storeId,
            @RequestParam Long planId,
            @RequestParam(defaultValue = "RAZORPAY") PaymentGateway gateway,
            @RequestParam(required = false) String transactionId
    ) throws PaymentException {

        PaymentInitiateResponse res= subscriptionService.upgradeSubscription(storeId, planId, gateway, transactionId);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{subscriptionId}/activate")
    public Subscription activateSubscription(@PathVariable Long subscriptionId) {
        return subscriptionService.activateSubscription(subscriptionId);
    }

    @PutMapping("/{subscriptionId}/cancel")
    public Subscription cancelSubscription(@PathVariable Long subscriptionId) {
        return subscriptionService.cancelSubscription(subscriptionId);
    }

    @PutMapping("/{subscriptionId}/payment-status")
    public Subscription updatePaymentStatus(
            @PathVariable Long subscriptionId,
            @RequestParam PaymentStatus status
    ) {
        return subscriptionService.updatePaymentStatus(subscriptionId, status);
    }

    @GetMapping("/store/{storeId}")
    public List<Subscription> getStoreSubscriptions(
            @PathVariable Long storeId,
            @RequestParam(required = false) SubscriptionStatus status
    ) {
        return subscriptionService.getSubscriptionsByStore(storeId, status);
    }

    @GetMapping("/admin")
    public List<Subscription> getAllSubscriptions(
            @RequestParam(required = false) SubscriptionStatus status
    ) {
        return subscriptionService.getAllSubscriptions(status);
    }

    @GetMapping("/admin/expiring")
    public List<Subscription> getExpiringSubscriptions(
            @RequestParam(defaultValue = "7") int days
    ) {
        return subscriptionService.getExpiringSubscriptionsWithin(days);
    }

    @GetMapping("/admin/count")
    public Long countByStatus(
            @RequestParam SubscriptionStatus status
    ) {
        return subscriptionService.countByStatus(status);
    }
}
