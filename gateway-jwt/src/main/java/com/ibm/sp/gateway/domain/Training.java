package com.ibm.sp.gateway.domain;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.ibm.sp.gateway.domain.enumeration.TrainStatus;

/**
 * Training entity.\n@author full stack trainning laidongshi.
 */
@ApiModel(description = "Training entity.\n@author full stack trainning laidongshi.")
@Entity
@Table(name = "training")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Training implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TrainStatus status;

    @NotNull
    @Column(name = "commission_amount", nullable = false)
    private Float commissionAmount;

    @Column(name = "avg_rating")
    private Integer avgRating;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private String startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private String endDate;

    @NotNull
    @Column(name = "start_time", nullable = false)
    private String startTime;

    @NotNull
    @Column(name = "end_time", nullable = false)
    private String endTime;

    @NotNull
    @Column(name = "mentor_id", nullable = false)
    private Long mentorId;

    @NotNull
    @Column(name = "mentor_name", nullable = false)
    private String mentorName;

    @NotNull
    @Column(name = "skill_name", nullable = false)
    private String skillName;

    @NotNull
    @Column(name = "fees", nullable = false)
    private Float fees;

    @Column(name = "remarks")
    private String remarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TrainStatus getStatus() {
        return status;
    }

    public Training status(TrainStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(TrainStatus status) {
        this.status = status;
    }

    public Float getCommissionAmount() {
        return commissionAmount;
    }

    public Training commissionAmount(Float commissionAmount) {
        this.commissionAmount = commissionAmount;
        return this;
    }

    public void setCommissionAmount(Float commissionAmount) {
        this.commissionAmount = commissionAmount;
    }

    public Integer getAvgRating() {
        return avgRating;
    }

    public Training avgRating(Integer avgRating) {
        this.avgRating = avgRating;
        return this;
    }

    public void setAvgRating(Integer avgRating) {
        this.avgRating = avgRating;
    }

    public String getStartDate() {
        return startDate;
    }

    public Training startDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public Training endDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public Training startTime(String startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public Training endTime(String endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Training mentorId(Long mentorId) {
        this.mentorId = mentorId;
        return this;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public String getMentorName() {
        return mentorName;
    }

    public Training mentorName(String mentorName) {
        this.mentorName = mentorName;
        return this;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public String getSkillName() {
        return skillName;
    }

    public Training skillName(String skillName) {
        this.skillName = skillName;
        return this;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public Float getFees() {
        return fees;
    }

    public Training fees(Float fees) {
        this.fees = fees;
        return this;
    }

    public void setFees(Float fees) {
        this.fees = fees;
    }

    public String getRemarks() {
        return remarks;
    }

    public Training remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Training)) {
            return false;
        }
        return id != null && id.equals(((Training) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Training{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", commissionAmount=" + getCommissionAmount() +
            ", avgRating=" + getAvgRating() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", mentorId=" + getMentorId() +
            ", mentorName='" + getMentorName() + "'" +
            ", skillName='" + getSkillName() + "'" +
            ", fees=" + getFees() +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
