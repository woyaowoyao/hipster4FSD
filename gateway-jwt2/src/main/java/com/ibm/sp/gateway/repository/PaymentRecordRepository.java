package com.ibm.sp.gateway.repository;
import com.ibm.sp.gateway.domain.PaymentRecord;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PaymentRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {

}
