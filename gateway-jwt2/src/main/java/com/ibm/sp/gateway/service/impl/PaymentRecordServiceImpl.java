package com.ibm.sp.gateway.service.impl;

import com.ibm.sp.gateway.service.PaymentRecordService;
import com.ibm.sp.gateway.domain.PaymentRecord;
import com.ibm.sp.gateway.repository.PaymentRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PaymentRecord}.
 */
@Service
@Transactional
public class PaymentRecordServiceImpl implements PaymentRecordService {

    private final Logger log = LoggerFactory.getLogger(PaymentRecordServiceImpl.class);

    private final PaymentRecordRepository paymentRecordRepository;

    public PaymentRecordServiceImpl(PaymentRecordRepository paymentRecordRepository) {
        this.paymentRecordRepository = paymentRecordRepository;
    }

    /**
     * Save a paymentRecord.
     *
     * @param paymentRecord the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PaymentRecord save(PaymentRecord paymentRecord) {
        log.debug("Request to save PaymentRecord : {}", paymentRecord);
        return paymentRecordRepository.save(paymentRecord);
    }

    /**
     * Get all the paymentRecords.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PaymentRecord> findAll() {
        log.debug("Request to get all PaymentRecords");
        return paymentRecordRepository.findAll();
    }


    /**
     * Get one paymentRecord by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PaymentRecord> findOne(Long id) {
        log.debug("Request to get PaymentRecord : {}", id);
        return paymentRecordRepository.findById(id);
    }

    /**
     * Delete the paymentRecord by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PaymentRecord : {}", id);
        paymentRecordRepository.deleteById(id);
    }
}
