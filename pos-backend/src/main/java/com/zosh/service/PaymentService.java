package com.zosh.service;

import com.zosh.exception.PaymentException;
import com.zosh.exception.UserException;
import com.zosh.payload.dto.PaymentDTO;
import com.zosh.payload.request.PaymentInitiateRequest;
import com.zosh.payload.request.PaymentVerifyRequest;
import com.zosh.payload.response.PaymentInitiateResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentService {
    PaymentInitiateResponse initiatePayment(PaymentInitiateRequest request) throws PaymentException;

    PaymentDTO verifyPayment(PaymentVerifyRequest request) throws PaymentException;


    Page<PaymentDTO> getAllPayments(Pageable pageable) throws UserException;




}
