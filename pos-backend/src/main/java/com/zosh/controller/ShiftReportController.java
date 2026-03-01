package com.zosh.controller;

import com.zosh.exception.UserException;
import com.zosh.mapper.ShiftReportMapper;
import com.zosh.modal.ShiftReport;
import com.zosh.payload.dto.ShiftReportDTO;
import com.zosh.service.ShiftReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shift-reports")
@RequiredArgsConstructor
public class ShiftReportController {

    private final ShiftReportService shiftReportService;
    private final ShiftReportMapper shiftReportMapper;

    @PostMapping("/start")
    public ResponseEntity<ShiftReport> startShift(
            @RequestParam Long branchId
    ) throws UserException {
        ShiftReport shift = shiftReportService.startShift(
                null,
                branchId,
                LocalDateTime.now());
        return ResponseEntity.ok(shift);
    }

    @PatchMapping("/end")
    public ResponseEntity<ShiftReportDTO> endShift() throws UserException {
        ShiftReport ended = shiftReportService.endShift(
                null,
                LocalDateTime.now()
        );
        return ResponseEntity.ok(ShiftReportMapper.toDTO(ended));
    }

    @GetMapping("/current")
    public ResponseEntity<ShiftReportDTO> getCurrentShiftProgress(
           ) throws UserException {
        ShiftReport shift = shiftReportService.getCurrentShiftProgress(null);
        return ResponseEntity.ok(ShiftReportMapper.toDTO(shift));
    }

    @GetMapping("/cashier/{cashierId}/by-date")
    public ResponseEntity<ShiftReportDTO> getShiftReportByDate(
            @PathVariable Long cashierId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date
    ) {
        ShiftReport shift = shiftReportService.getShiftReportByCashierAndDate(
                cashierId, date);
        
        return ResponseEntity.ok(ShiftReportMapper.toDTO(shift));
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<ShiftReportDTO>> getShiftsByCashier(
            @PathVariable Long cashierId
    ) {
        List<ShiftReport> shift = shiftReportService
                .getShiftReportsByCashier(cashierId);
        List<ShiftReportDTO> dto = shift.stream()
                .map(ShiftReportMapper::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<ShiftReportDTO>> getShiftsByBranch(
            @PathVariable Long branchId
    ) {
        List<ShiftReport> shifts = shiftReportService.getShiftReportsByBranch(branchId);
        List<ShiftReportDTO> dto = shifts.stream()
                .map(ShiftReportMapper::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<ShiftReportDTO>> getAllShifts() {
        List<ShiftReport> shifts=shiftReportService.getAllShiftReports();

        List<ShiftReportDTO> dto = shifts.stream()
                .map(ShiftReportMapper::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShiftReportDTO> getShiftById(@PathVariable Long id) {
        ShiftReport shifts=shiftReportService.getShiftReportById(id);

        return ResponseEntity.ok(ShiftReportMapper.toDTO(shifts));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShift(@PathVariable Long id) {
        shiftReportService.deleteShiftReport(id);
        return ResponseEntity.ok().build();
    }
}
