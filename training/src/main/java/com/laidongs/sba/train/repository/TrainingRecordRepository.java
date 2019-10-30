package com.laidongs.sba.train.repository;
import com.laidongs.sba.train.domain.TrainingRecord;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TrainingRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainingRecordRepository extends JpaRepository<TrainingRecord, Long> {

}
