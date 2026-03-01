package com.zosh.controller;


import com.zosh.exception.ResourceNotFoundException;
import com.zosh.modal.SubscriptionPlan;
import com.zosh.service.SubscriptionPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/super-admin/subscription-plans")
@RequiredArgsConstructor
public class SubscriptionPlanController {

    private final SubscriptionPlanService subscriptionPlanService;

    @PostMapping
    public SubscriptionPlan createPlan(@RequestBody SubscriptionPlan plan) {
        return subscriptionPlanService.createPlan(plan);
    }

    @PutMapping("/{id}")
    public SubscriptionPlan updatePlan(
            @PathVariable Long id,
            @RequestBody SubscriptionPlan plan
    ) throws ResourceNotFoundException {
        return subscriptionPlanService.updatePlan(id, plan);
    }

    @GetMapping
    public List<SubscriptionPlan> getAllPlans() {
        return subscriptionPlanService.getAllPlans();
    }

    @GetMapping("/{id}")
    public SubscriptionPlan getPlanById(@PathVariable Long id) throws ResourceNotFoundException {
        return subscriptionPlanService.getPlanById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePlan(@PathVariable Long id) throws ResourceNotFoundException {
        subscriptionPlanService.deletePlan(id);
    }
}
