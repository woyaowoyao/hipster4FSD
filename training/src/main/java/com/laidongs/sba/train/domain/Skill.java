package com.laidongs.sba.train.domain;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * Skill entity.\n@author full stack trainning laidongshi.
 */
@ApiModel(description = "Skill entity.\n@author full stack trainning laidongshi.")
@Entity
@Table(name = "skill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Skill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "toc")
    private String toc;

    @Column(name = "preprequisites")
    private String preprequisites;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Skill name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToc() {
        return toc;
    }

    public Skill toc(String toc) {
        this.toc = toc;
        return this;
    }

    public void setToc(String toc) {
        this.toc = toc;
    }

    public String getPreprequisites() {
        return preprequisites;
    }

    public Skill preprequisites(String preprequisites) {
        this.preprequisites = preprequisites;
        return this;
    }

    public void setPreprequisites(String preprequisites) {
        this.preprequisites = preprequisites;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Skill)) {
            return false;
        }
        return id != null && id.equals(((Skill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Skill{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", toc='" + getToc() + "'" +
            ", preprequisites='" + getPreprequisites() + "'" +
            "}";
    }
}
