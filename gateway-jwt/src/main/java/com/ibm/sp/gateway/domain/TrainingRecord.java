package com.ibm.sp.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.ibm.sp.gateway.domain.enumeration.TrainRecordStatus;

/**
 * TrainingRecord entity.\n@author full stack trainning laidongshi.
 */
@ApiModel(description = "TrainingRecord entity.\n@author full stack trainning laidongshi.")
@Entity
@Table(name = "training_record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TrainingRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TrainRecordStatus status;

    @NotNull
    @Column(name = "progress", nullable = false)
    private Integer progress;

    @NotNull
    @Column(name = "commission_amount", nullable = false)
    private Float commissionAmount;

    @NotNull
    @Column(name = "avg_rating", nullable = false)
    private Float avgRating;

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
    @Column(name = "amount_received", nullable = false)
    private Float amountReceived;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NotNull
    @Column(name = "user_name", nullable = false)
    private String userName;

    @NotNull
    @Column(name = "training_id", nullable = false)
    private Long trainingId;

    @NotNull
    @Column(name = "skill_name", nullable = false)
    private String skillName;

    @NotNull
    @Column(name = "fees", nullable = false)
    private Float fees;

    @Column(name = "remarks")
    private String remarks;

    @OneToOne
    @JoinColumn(unique = true)
    private Member user;

    @ManyToOne
    @JsonIgnoreProperties("trainingRecords")
    private Training training;

    @ManyToOne
    @JsonIgnoreProperties("trainingRecords")
    private Skill skill;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TrainRecordStatus getStatus() {
        return status;
    }

    public TrainingRecord status(TrainRecordStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(TrainRecordStatus status) {
        this.status = status;
    }

    public Integer getProgress() {
        return progress;
    }

    public TrainingRecord progress(Integer progress) {
        this.progress = progress;
        return this;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Float getCommissionAmount() {
        return commissionAmount;
    }

    public TrainingRecord commissionAmount(Float commissionAmount) {
        this.commissionAmount = commissionAmount;
        return this;
    }

    public void setCommissionAmount(Float commissionAmount) {
        this.commissionAmount = commissionAmount;
    }

    public Float getAvgRating() {
        return avgRating;
    }

    public TrainingRecord avgRating(Float avgRating) {
        this.avgRating = avgRating;
        return this;
    }

    public void setAvgRating(Float avgRating) {
        this.avgRating = avgRating;
    }

    public String getStartDate() {
        return startDate;
    }

    public TrainingRecord startDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public TrainingRecord endDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public TrainingRecord startTime(String startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public TrainingRecord endTime(String endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Float getAmountReceived() {
        return amountReceived;
    }

    public TrainingRecord amountReceived(Float amountReceived) {
        this.amountReceived = amountReceived;
        return this;
    }

    public void setAmountReceived(Float amountReceived) {
        this.amountReceived = amountReceived;
    }

    public Long getUserId() {
        return userId;
    }

    public TrainingRecord userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public TrainingRecord userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getTrainingId() {
        return trainingId;
    }

    public TrainingRecord trainingId(Long trainingId) {
        this.trainingId = trainingId;
        return this;
    }

    public void setTrainingId(Long trainingId) {
        this.trainingId = trainingId;
    }

    public String getSkillName() {
        return skillName;
    }

    public TrainingRecord skillName(String skillName) {
        this.skillName = skillName;
        return this;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public Float getFees() {
        return fees;
    }

    public TrainingRecord fees(Float fees) {
        this.fees = fees;
        return this;
    }

    public void setFees(Float fees) {
        this.fees = fees;
    }

    public String getRemarks() {
        return remarks;
    }

    public TrainingRecord remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Member getUser() {
        return user;
    }

    public TrainingRecord user(Member member) {
        this.user = member;
        return this;
    }

    public void setUser(Member member) {
        this.user = member;
    }

    public Training getTraining() {
        return training;
    }

    public TrainingRecord training(Training training) {
        this.training = training;
        return this;
    }

    public void setTraining(Training training) {
        this.training = training;
    }

    public Skill getSkill() {
        return skill;
    }

    public TrainingRecord skill(Skill skill) {
        this.skill = skill;
        return this;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrainingRecord)) {
            return false;
        }
        return id != null && id.equals(((TrainingRecord) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TrainingRecord{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", progress=" + getProgress() +
            ", commissionAmount=" + getCommissionAmount() +
            ", avgRating=" + getAvgRating() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", amountReceived=" + getAmountReceived() +
            ", userId=" + getUserId() +
            ", userName='" + getUserName() + "'" +
            ", trainingId=" + getTrainingId() +
            ", skillName='" + getSkillName() + "'" +
            ", fees=" + getFees() +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
