package com.laidongs.sba.gateway.repository;
import com.laidongs.sba.gateway.domain.Mentor;
import com.laidongs.sba.gateway.domain.MentorSkill;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MentorSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MentorSkillRepository extends JpaRepository<MentorSkill, Long> {
	
	@Query("select a from MentorSkill a where a.technology.name like CONCAT('%',?1,'%')") 
    List<MentorSkill> search(String technologyName);

    //@EntityGraph(attributePaths = "technology")
   // List<MentorSkill> findAllWithTechnologyBy(String technologyName);
}
