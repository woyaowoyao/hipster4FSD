package com.ibm.sp.gateway.repository;
import com.ibm.sp.gateway.domain.TrainingRecord;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TrainingRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainingRecordRepository extends JpaRepository<TrainingRecord, Long> {

}
