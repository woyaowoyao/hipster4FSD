package com.laidongs.sba.technology.service.impl;

import com.laidongs.sba.technology.service.TechnologyService;
import com.laidongs.sba.technology.domain.Technology;
import com.laidongs.sba.technology.repository.TechnologyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Technology}.
 */
@Service
@Transactional
public class TechnologyServiceImpl implements TechnologyService {

    private final Logger log = LoggerFactory.getLogger(TechnologyServiceImpl.class);

    private final TechnologyRepository technologyRepository;

    public TechnologyServiceImpl(TechnologyRepository technologyRepository) {
        this.technologyRepository = technologyRepository;
    }

    /**
     * Save a technology.
     *
     * @param technology the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Technology save(Technology technology) {
        log.debug("Request to save Technology : {}", technology);
        return technologyRepository.save(technology);
    }

    /**
     * Get all the technologies.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Technology> findAll() {
        log.debug("Request to get all Technologies");
        return technologyRepository.findAll();
    }


    /**
     * Get one technology by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Technology> findOne(Long id) {
        log.debug("Request to get Technology : {}", id);
        return technologyRepository.findById(id);
    }

    /**
     * Delete the technology by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Technology : {}", id);
        technologyRepository.deleteById(id);
    }
}
