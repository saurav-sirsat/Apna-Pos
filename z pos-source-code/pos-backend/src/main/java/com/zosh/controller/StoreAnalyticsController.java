package com.zosh.controller;

import com.zosh.payload.StoreAnalysis.*;
import com.zosh.service.StoreAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store/analytics")
@RequiredArgsConstructor
public class StoreAnalyticsController {

    private final StoreAnalyticsService storeAnalyticsService;

    @GetMapping("/{storeAdminId}/overview")
    public StoreOverviewDTO getStoreOverview(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getStoreOverview(storeAdminId);
    }

    @GetMapping("/{storeAdminId}/sales-trends")
    public TimeSeriesDataDTO getSalesTrends(@PathVariable Long storeAdminId,
                                            @RequestParam String period) {
    }

    @GetMapping("/{storeAdminId}/sales/monthly")
    public List<TimeSeriesPointDTO> getMonthlySales(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getMonthlySalesGraph(storeAdminId);
    }

    @GetMapping("/{storeAdminId}/sales/daily")
    public List<TimeSeriesPointDTO> getDailySales(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getDailySalesGraph(storeAdminId);
    }

    @GetMapping("/{storeAdminId}/sales/category")
    public List<CategorySalesDTO> getSalesByCategory(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getSalesByCategory(storeAdminId);
    }

    @GetMapping("/{storeAdminId}/sales/payment-method")
    public List<PaymentInsightDTO> getSalesByPaymentMethod(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getSalesByPaymentMethod(storeAdminId);
    }

    @GetMapping("/{storeAdminId}/sales/branch")
    public List<BranchSalesDTO> getSalesByBranch(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getSalesByBranch(storeAdminId);
    }

    @GetMapping("/{storeAdminId}/payments")
    public List<PaymentInsightDTO> getPaymentBreakdown(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getPaymentBreakdown(storeAdminId);
    }

    @GetMapping("/{storeAdminId}/branch-performance")
    public BranchPerformanceDTO getBranchPerformance(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getBranchPerformance(storeAdminId);
    }

    @GetMapping("/{storeAdminId}/alerts")
    public StoreAlertDTO getStoreAlerts(@PathVariable Long storeAdminId) {
        return storeAnalyticsService.getStoreAlerts(storeAdminId);
    }
}
