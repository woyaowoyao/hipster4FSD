package com.laidongs.sba.payment.domain;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.laidongs.sba.payment.domain.enumeration.PayTraType;

/**
 * PaymentRecord entity.\n@author full stack trainning laidongshi.
 */
@ApiModel(description = "PaymentRecord entity.\n@author full stack trainning laidongshi.")
@Entity
@Table(name = "payment_record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PaymentRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "txn_type", nullable = false)
    private PayTraType txnType;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Float amount;

    @NotNull
    @Column(name = "mentor_id", nullable = false)
    private Long mentorId;

    @NotNull
    @Column(name = "mentor_name", nullable = false)
    private String mentorName;

    @NotNull
    @Column(name = "training_id", nullable = false)
    private Long trainingId;

    @NotNull
    @Column(name = "skill_name", nullable = false)
    private String skillName;

    @NotNull
    @Column(name = "total_amount_to_mentor", nullable = false)
    private Float totalAmountToMentor;

    @Column(name = "remarks")
    private String remarks;

    @OneToOne
    @JoinColumn(unique = true)
    private Member user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PayTraType getTxnType() {
        return txnType;
    }

    public PaymentRecord txnType(PayTraType txnType) {
        this.txnType = txnType;
        return this;
    }

    public void setTxnType(PayTraType txnType) {
        this.txnType = txnType;
    }

    public Float getAmount() {
        return amount;
    }

    public PaymentRecord amount(Float amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public PaymentRecord mentorId(Long mentorId) {
        this.mentorId = mentorId;
        return this;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public String getMentorName() {
        return mentorName;
    }

    public PaymentRecord mentorName(String mentorName) {
        this.mentorName = mentorName;
        return this;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public Long getTrainingId() {
        return trainingId;
    }

    public PaymentRecord trainingId(Long trainingId) {
        this.trainingId = trainingId;
        return this;
    }

    public void setTrainingId(Long trainingId) {
        this.trainingId = trainingId;
    }

    public String getSkillName() {
        return skillName;
    }

    public PaymentRecord skillName(String skillName) {
        this.skillName = skillName;
        return this;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public Float getTotalAmountToMentor() {
        return totalAmountToMentor;
    }

    public PaymentRecord totalAmountToMentor(Float totalAmountToMentor) {
        this.totalAmountToMentor = totalAmountToMentor;
        return this;
    }

    public void setTotalAmountToMentor(Float totalAmountToMentor) {
        this.totalAmountToMentor = totalAmountToMentor;
    }

    public String getRemarks() {
        return remarks;
    }

    public PaymentRecord remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Member getUser() {
        return user;
    }

    public PaymentRecord user(Member member) {
        this.user = member;
        return this;
    }

    public void setUser(Member member) {
        this.user = member;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaymentRecord)) {
            return false;
        }
        return id != null && id.equals(((PaymentRecord) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PaymentRecord{" +
            "id=" + getId() +
            ", txnType='" + getTxnType() + "'" +
            ", amount=" + getAmount() +
            ", mentorId=" + getMentorId() +
            ", mentorName='" + getMentorName() + "'" +
            ", trainingId=" + getTrainingId() +
            ", skillName='" + getSkillName() + "'" +
            ", totalAmountToMentor=" + getTotalAmountToMentor() +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
