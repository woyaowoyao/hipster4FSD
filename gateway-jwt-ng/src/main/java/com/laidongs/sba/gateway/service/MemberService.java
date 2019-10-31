package com.laidongs.sba.gateway.service;

import com.laidongs.sba.gateway.domain.Member;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Member}.
 */
public interface MemberService {

    /**
     * Save a member.
     *
     * @param member the entity to save.
     * @return the persisted entity.
     */
    Member save(Member member);

    /**
     * Get all the members.
     *
     * @return the list of entities.
     */
    List<Member> findAll();


    /**
     * Get the "id" member.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Member> findOne(Long id);

    /**
     * Delete the "id" member.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
