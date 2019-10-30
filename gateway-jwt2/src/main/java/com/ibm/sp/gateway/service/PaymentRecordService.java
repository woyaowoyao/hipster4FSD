package com.ibm.sp.gateway.service;

import com.ibm.sp.gateway.domain.PaymentRecord;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link PaymentRecord}.
 */
public interface PaymentRecordService {

    /**
     * Save a paymentRecord.
     *
     * @param paymentRecord the entity to save.
     * @return the persisted entity.
     */
    PaymentRecord save(PaymentRecord paymentRecord);

    /**
     * Get all the paymentRecords.
     *
     * @return the list of entities.
     */
    List<PaymentRecord> findAll();


    /**
     * Get the "id" paymentRecord.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PaymentRecord> findOne(Long id);

    /**
     * Delete the "id" paymentRecord.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
