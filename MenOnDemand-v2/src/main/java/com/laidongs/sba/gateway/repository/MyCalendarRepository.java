package com.laidongs.sba.gateway.repository;
import com.laidongs.sba.gateway.domain.MyCalendar;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the MyCalendar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MyCalendarRepository extends JpaRepository<MyCalendar, Long> {

    @Query("select myCalendar from MyCalendar myCalendar where myCalendar.user.login = ?#{principal.username}")
    List<MyCalendar> findByUserIsCurrentUser();

}
