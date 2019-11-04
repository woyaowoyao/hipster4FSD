package com.laidongs.sba.technology.service;

import com.laidongs.sba.technology.domain.Technology;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Technology}.
 */
public interface TechnologyService {

    /**
     * Save a technology.
     *
     * @param technology the entity to save.
     * @return the persisted entity.
     */
    Technology save(Technology technology);

    /**
     * Get all the technologies.
     *
     * @return the list of entities.
     */
    List<Technology> findAll();


    /**
     * Get the "id" technology.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Technology> findOne(Long id);

    /**
     * Delete the "id" technology.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
