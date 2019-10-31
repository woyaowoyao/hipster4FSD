package com.laidongs.sba.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.laidongs.sba.gateway.domain.enumeration.TrainRecordStatus;

/**
 * TrainingRecord entity.\n@author full stack trainning laidongshi.
 */
@ApiModel(description = "TrainingRecord entity.\n@author full stack trainning laidongshi.")
@Entity
@Table(name = "training_record")
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

    @Column(name = "avg_rating")
    private Float avgRating;

    @NotNull
    @Column(name = "amount_received", nullable = false)
    private Float amountReceived;

    @Column(name = "user_name")
    private String userName;

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
    private Technology skill;

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

    public Technology getSkill() {
        return skill;
    }

    public TrainingRecord skill(Technology technology) {
        this.skill = technology;
        return this;
    }

    public void setSkill(Technology technology) {
        this.skill = technology;
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
            ", amountReceived=" + getAmountReceived() +
            ", userName='" + getUserName() + "'" +
            ", fees=" + getFees() +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
