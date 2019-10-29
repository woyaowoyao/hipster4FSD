package com.ibm.sp.gateway.web.rest;

import com.ibm.sp.gateway.GatewayApp;
import com.ibm.sp.gateway.domain.PaymentRecord;
import com.ibm.sp.gateway.repository.PaymentRecordRepository;
import com.ibm.sp.gateway.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ibm.sp.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PaymentRecordResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
public class PaymentRecordResourceIT {

    private static final String DEFAULT_TXN_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TXN_TYPE = "BBBBBBBBBB";

    private static final Float DEFAULT_AMOUNT = 1F;
    private static final Float UPDATED_AMOUNT = 2F;

    private static final Long DEFAULT_MENTOR_ID = 1L;
    private static final Long UPDATED_MENTOR_ID = 2L;

    private static final String DEFAULT_MENTOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MENTOR_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_TRAINING_ID = 1L;
    private static final Long UPDATED_TRAINING_ID = 2L;

    private static final String DEFAULT_SKILL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SKILL_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_TOTAL_AMOUNT_TO_MENTOR = 1F;
    private static final Float UPDATED_TOTAL_AMOUNT_TO_MENTOR = 2F;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private PaymentRecordRepository paymentRecordRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPaymentRecordMockMvc;

    private PaymentRecord paymentRecord;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PaymentRecordResource paymentRecordResource = new PaymentRecordResource(paymentRecordRepository);
        this.restPaymentRecordMockMvc = MockMvcBuilders.standaloneSetup(paymentRecordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentRecord createEntity(EntityManager em) {
        PaymentRecord paymentRecord = new PaymentRecord()
            .txnType(DEFAULT_TXN_TYPE)
            .amount(DEFAULT_AMOUNT)
            .mentorId(DEFAULT_MENTOR_ID)
            .mentorName(DEFAULT_MENTOR_NAME)
            .trainingId(DEFAULT_TRAINING_ID)
            .skillName(DEFAULT_SKILL_NAME)
            .totalAmountToMentor(DEFAULT_TOTAL_AMOUNT_TO_MENTOR)
            .remarks(DEFAULT_REMARKS);
        return paymentRecord;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentRecord createUpdatedEntity(EntityManager em) {
        PaymentRecord paymentRecord = new PaymentRecord()
            .txnType(UPDATED_TXN_TYPE)
            .amount(UPDATED_AMOUNT)
            .mentorId(UPDATED_MENTOR_ID)
            .mentorName(UPDATED_MENTOR_NAME)
            .trainingId(UPDATED_TRAINING_ID)
            .skillName(UPDATED_SKILL_NAME)
            .totalAmountToMentor(UPDATED_TOTAL_AMOUNT_TO_MENTOR)
            .remarks(UPDATED_REMARKS);
        return paymentRecord;
    }

    @BeforeEach
    public void initTest() {
        paymentRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaymentRecord() throws Exception {
        int databaseSizeBeforeCreate = paymentRecordRepository.findAll().size();

        // Create the PaymentRecord
        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isCreated());

        // Validate the PaymentRecord in the database
        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentRecord testPaymentRecord = paymentRecordList.get(paymentRecordList.size() - 1);
        assertThat(testPaymentRecord.getTxnType()).isEqualTo(DEFAULT_TXN_TYPE);
        assertThat(testPaymentRecord.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testPaymentRecord.getMentorId()).isEqualTo(DEFAULT_MENTOR_ID);
        assertThat(testPaymentRecord.getMentorName()).isEqualTo(DEFAULT_MENTOR_NAME);
        assertThat(testPaymentRecord.getTrainingId()).isEqualTo(DEFAULT_TRAINING_ID);
        assertThat(testPaymentRecord.getSkillName()).isEqualTo(DEFAULT_SKILL_NAME);
        assertThat(testPaymentRecord.getTotalAmountToMentor()).isEqualTo(DEFAULT_TOTAL_AMOUNT_TO_MENTOR);
        assertThat(testPaymentRecord.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createPaymentRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paymentRecordRepository.findAll().size();

        // Create the PaymentRecord with an existing ID
        paymentRecord.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentRecord in the database
        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTxnTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentRecordRepository.findAll().size();
        // set the field null
        paymentRecord.setTxnType(null);

        // Create the PaymentRecord, which fails.

        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentRecordRepository.findAll().size();
        // set the field null
        paymentRecord.setAmount(null);

        // Create the PaymentRecord, which fails.

        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMentorIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentRecordRepository.findAll().size();
        // set the field null
        paymentRecord.setMentorId(null);

        // Create the PaymentRecord, which fails.

        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMentorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentRecordRepository.findAll().size();
        // set the field null
        paymentRecord.setMentorName(null);

        // Create the PaymentRecord, which fails.

        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTrainingIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentRecordRepository.findAll().size();
        // set the field null
        paymentRecord.setTrainingId(null);

        // Create the PaymentRecord, which fails.

        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSkillNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentRecordRepository.findAll().size();
        // set the field null
        paymentRecord.setSkillName(null);

        // Create the PaymentRecord, which fails.

        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalAmountToMentorIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentRecordRepository.findAll().size();
        // set the field null
        paymentRecord.setTotalAmountToMentor(null);

        // Create the PaymentRecord, which fails.

        restPaymentRecordMockMvc.perform(post("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPaymentRecords() throws Exception {
        // Initialize the database
        paymentRecordRepository.saveAndFlush(paymentRecord);

        // Get all the paymentRecordList
        restPaymentRecordMockMvc.perform(get("/api/payment-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].txnType").value(hasItem(DEFAULT_TXN_TYPE)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].mentorId").value(hasItem(DEFAULT_MENTOR_ID.intValue())))
            .andExpect(jsonPath("$.[*].mentorName").value(hasItem(DEFAULT_MENTOR_NAME)))
            .andExpect(jsonPath("$.[*].trainingId").value(hasItem(DEFAULT_TRAINING_ID.intValue())))
            .andExpect(jsonPath("$.[*].skillName").value(hasItem(DEFAULT_SKILL_NAME)))
            .andExpect(jsonPath("$.[*].totalAmountToMentor").value(hasItem(DEFAULT_TOTAL_AMOUNT_TO_MENTOR.doubleValue())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS)));
    }
    
    @Test
    @Transactional
    public void getPaymentRecord() throws Exception {
        // Initialize the database
        paymentRecordRepository.saveAndFlush(paymentRecord);

        // Get the paymentRecord
        restPaymentRecordMockMvc.perform(get("/api/payment-records/{id}", paymentRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paymentRecord.getId().intValue()))
            .andExpect(jsonPath("$.txnType").value(DEFAULT_TXN_TYPE))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.mentorId").value(DEFAULT_MENTOR_ID.intValue()))
            .andExpect(jsonPath("$.mentorName").value(DEFAULT_MENTOR_NAME))
            .andExpect(jsonPath("$.trainingId").value(DEFAULT_TRAINING_ID.intValue()))
            .andExpect(jsonPath("$.skillName").value(DEFAULT_SKILL_NAME))
            .andExpect(jsonPath("$.totalAmountToMentor").value(DEFAULT_TOTAL_AMOUNT_TO_MENTOR.doubleValue()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS));
    }

    @Test
    @Transactional
    public void getNonExistingPaymentRecord() throws Exception {
        // Get the paymentRecord
        restPaymentRecordMockMvc.perform(get("/api/payment-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaymentRecord() throws Exception {
        // Initialize the database
        paymentRecordRepository.saveAndFlush(paymentRecord);

        int databaseSizeBeforeUpdate = paymentRecordRepository.findAll().size();

        // Update the paymentRecord
        PaymentRecord updatedPaymentRecord = paymentRecordRepository.findById(paymentRecord.getId()).get();
        // Disconnect from session so that the updates on updatedPaymentRecord are not directly saved in db
        em.detach(updatedPaymentRecord);
        updatedPaymentRecord
            .txnType(UPDATED_TXN_TYPE)
            .amount(UPDATED_AMOUNT)
            .mentorId(UPDATED_MENTOR_ID)
            .mentorName(UPDATED_MENTOR_NAME)
            .trainingId(UPDATED_TRAINING_ID)
            .skillName(UPDATED_SKILL_NAME)
            .totalAmountToMentor(UPDATED_TOTAL_AMOUNT_TO_MENTOR)
            .remarks(UPDATED_REMARKS);

        restPaymentRecordMockMvc.perform(put("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaymentRecord)))
            .andExpect(status().isOk());

        // Validate the PaymentRecord in the database
        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeUpdate);
        PaymentRecord testPaymentRecord = paymentRecordList.get(paymentRecordList.size() - 1);
        assertThat(testPaymentRecord.getTxnType()).isEqualTo(UPDATED_TXN_TYPE);
        assertThat(testPaymentRecord.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testPaymentRecord.getMentorId()).isEqualTo(UPDATED_MENTOR_ID);
        assertThat(testPaymentRecord.getMentorName()).isEqualTo(UPDATED_MENTOR_NAME);
        assertThat(testPaymentRecord.getTrainingId()).isEqualTo(UPDATED_TRAINING_ID);
        assertThat(testPaymentRecord.getSkillName()).isEqualTo(UPDATED_SKILL_NAME);
        assertThat(testPaymentRecord.getTotalAmountToMentor()).isEqualTo(UPDATED_TOTAL_AMOUNT_TO_MENTOR);
        assertThat(testPaymentRecord.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingPaymentRecord() throws Exception {
        int databaseSizeBeforeUpdate = paymentRecordRepository.findAll().size();

        // Create the PaymentRecord

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaymentRecordMockMvc.perform(put("/api/payment-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentRecord)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentRecord in the database
        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaymentRecord() throws Exception {
        // Initialize the database
        paymentRecordRepository.saveAndFlush(paymentRecord);

        int databaseSizeBeforeDelete = paymentRecordRepository.findAll().size();

        // Delete the paymentRecord
        restPaymentRecordMockMvc.perform(delete("/api/payment-records/{id}", paymentRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAll();
        assertThat(paymentRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentRecord.class);
        PaymentRecord paymentRecord1 = new PaymentRecord();
        paymentRecord1.setId(1L);
        PaymentRecord paymentRecord2 = new PaymentRecord();
        paymentRecord2.setId(paymentRecord1.getId());
        assertThat(paymentRecord1).isEqualTo(paymentRecord2);
        paymentRecord2.setId(2L);
        assertThat(paymentRecord1).isNotEqualTo(paymentRecord2);
        paymentRecord1.setId(null);
        assertThat(paymentRecord1).isNotEqualTo(paymentRecord2);
    }
}
