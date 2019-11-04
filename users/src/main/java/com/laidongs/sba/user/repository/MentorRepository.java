package com.laidongs.sba.user.repository;
import com.laidongs.sba.user.domain.Mentor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Mentor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {

}
