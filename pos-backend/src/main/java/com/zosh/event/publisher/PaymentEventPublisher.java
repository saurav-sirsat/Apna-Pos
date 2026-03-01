package com.zosh.event.publisher;

import com.zosh.event.PaymentFailedEvent;
import com.zosh.event.PaymentInitiatedEvent;
import com.zosh.event.PaymentSuccessEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PaymentEventPublisher {

    private final ApplicationEventPublisher applicationEventPublisher;

    public void publishPaymentInitiated(PaymentInitiatedEvent event) {


        applicationEventPublisher.publishEvent(event);

        log.debug("PaymentInitiatedEvent published successfully for payment ID: {}",
            event.getPaymentId());
    }

    public void publishPaymentSuccess(PaymentSuccessEvent event) {


        applicationEventPublisher.publishEvent(event);

        log.debug("PaymentSuccessEvent published successfully for payment ID: {}",
            event.getPaymentId());
    }

    public void publishPaymentFailed(PaymentFailedEvent event) {


        applicationEventPublisher.publishEvent(event);

        log.debug("PaymentFailedEvent published successfully for payment ID: {}",
            event.getPaymentId());
    }
}
