package com.laidongs.sba.user.domain;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import com.laidongs.sba.user.domain.enumeration.PayTraType;

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
    @Column(name = "total_amount_to_mentor", nullable = false)
    private Float totalAmountToMentor;

    @NotNull
    @Column(name = "issued_time", nullable = false)
    private Instant issuedTime;

    @Column(name = "remarks")
    private String remarks;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

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

    public Instant getIssuedTime() {
        return issuedTime;
    }

    public PaymentRecord issuedTime(Instant issuedTime) {
        this.issuedTime = issuedTime;
        return this;
    }

    public void setIssuedTime(Instant issuedTime) {
        this.issuedTime = issuedTime;
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

    public User getUser() {
        return user;
    }

    public PaymentRecord user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
            ", totalAmountToMentor=" + getTotalAmountToMentor() +
            ", issuedTime='" + getIssuedTime() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
