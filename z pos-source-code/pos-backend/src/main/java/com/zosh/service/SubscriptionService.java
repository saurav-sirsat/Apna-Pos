package com.zosh.service;

import com.zosh.domain.PaymentGateway;
import com.zosh.domain.PaymentStatus;
import com.zosh.domain.SubscriptionStatus;
import com.zosh.exception.PaymentException;
import com.zosh.modal.Payment;
import com.zosh.modal.Store;
import com.zosh.modal.Subscription;
import com.zosh.modal.SubscriptionPlan;
import com.zosh.payload.response.PaymentInitiateResponse;

import java.util.List;
import java.util.Optional;

public interface SubscriptionService {

    PaymentInitiateResponse createSubscription(Long storeId,
                                               Long planId,
                                               PaymentGateway gateway,
                                               String transactionId
    ) throws PaymentException;

    PaymentInitiateResponse upgradeSubscription(Long storeId,
                                     Long planId,
                                     PaymentGateway gateway, String transactionId) throws PaymentException;

    Subscription activateSubscription(Long subscriptionId);

    Subscription cancelSubscription(Long subscriptionId);

    void expirePastSubscriptions();

    Subscription updatePaymentStatus(Long subscriptionId, PaymentStatus status);



    List<Subscription> getExpiringSubscriptionsWithin(int days);

    Long countByStatus(SubscriptionStatus status);
}
