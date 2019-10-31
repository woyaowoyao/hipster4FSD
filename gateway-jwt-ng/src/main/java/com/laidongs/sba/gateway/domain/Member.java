package com.laidongs.sba.gateway.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.laidongs.sba.gateway.domain.enumeration.MemberType;

/**
 * A Member.
 */
@Entity
@Table(name = "member")
public class Member implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private MemberType type;

    @Column(name = "user_name")
    private String userName;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

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

    public MemberType getType() {
        return type;
    }

    public Member type(MemberType type) {
        this.type = type;
        return this;
    }

    public void setType(MemberType type) {
        this.type = type;
    }

    public String getUserName() {
        return userName;
    }

    public Member userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getName() {
        return name;
    }

    public Member name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Member getUser() {
        return user;
    }

    public Member user(Member member) {
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
        if (!(o instanceof Member)) {
            return false;
        }
        return id != null && id.equals(((Member) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Member{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", userName='" + getUserName() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
