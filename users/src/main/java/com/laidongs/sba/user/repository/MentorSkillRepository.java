package com.laidongs.sba.user.repository;
import com.laidongs.sba.user.domain.MentorSkill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MentorSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MentorSkillRepository extends JpaRepository<MentorSkill, Long> {

}
