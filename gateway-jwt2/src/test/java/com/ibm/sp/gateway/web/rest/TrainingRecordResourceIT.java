package com.ibm.sp.gateway.web.rest;

import com.ibm.sp.gateway.GatewayApp;
import com.ibm.sp.gateway.domain.TrainingRecord;
import com.ibm.sp.gateway.repository.TrainingRecordRepository;
import com.ibm.sp.gateway.service.TrainingRecordService;
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

import com.ibm.sp.gateway.domain.enumeration.TrainRecordStatus;
/**
 * Integration tests for the {@link TrainingRecordResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
public class TrainingRecordResourceIT {

    private static final TrainRecordStatus DEFAULT_STATUS = TrainRecordStatus.Propose;
    private static final TrainRecordStatus UPDATED_STATUS = TrainRecordStatus.Progress;

    private static final Integer DEFAULT_PROGRESS = 1;
    private static final Integer UPDATED_PROGRESS = 2;

    private static final Float DEFAULT_COMMISSION_AMOUNT = 1F;
    private static final Float UPDATED_COMMISSION_AMOUNT = 2F;

    private static final Float DEFAULT_AVG_RATING = 1F;
    private static final Float UPDATED_AVG_RATING = 2F;

    private static final String DEFAULT_START_DATE = "AAAAAAAAAA";
    private static final String UPDATED_START_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_END_DATE = "AAAAAAAAAA";
    private static final String UPDATED_END_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_START_TIME = "AAAAAAAAAA";
    private static final String UPDATED_START_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_END_TIME = "AAAAAAAAAA";
    private static final String UPDATED_END_TIME = "BBBBBBBBBB";

    private static final Float DEFAULT_AMOUNT_RECEIVED = 1F;
    private static final Float UPDATED_AMOUNT_RECEIVED = 2F;

    private static final String DEFAULT_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SKILL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SKILL_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_FEES = 1F;
    private static final Float UPDATED_FEES = 2F;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private TrainingRecordRepository trainingRecordRepository;

    @Autowired
    private TrainingRecordService trainingRecordService;

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

    private MockMvc restTrainingRecordMockMvc;

    private TrainingRecord trainingRecord;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainingRecordResource trainingRecordResource = new TrainingRecordResource(trainingRecordService);
        this.restTrainingRecordMockMvc = MockMvcBuilders.standaloneSetup(trainingRecordResource)
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
    public static TrainingRecord createEntity(EntityManager em) {
        TrainingRecord trainingRecord = new TrainingRecord()
            .status(DEFAULT_STATUS)
            .progress(DEFAULT_PROGRESS)
            .commissionAmount(DEFAULT_COMMISSION_AMOUNT)
            .avgRating(DEFAULT_AVG_RATING)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .amountReceived(DEFAULT_AMOUNT_RECEIVED)
            .userName(DEFAULT_USER_NAME)
            .skillName(DEFAULT_SKILL_NAME)
            .fees(DEFAULT_FEES)
            .remarks(DEFAULT_REMARKS);
        return trainingRecord;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingRecord createUpdatedEntity(EntityManager em) {
        TrainingRecord trainingRecord = new TrainingRecord()
            .status(UPDATED_STATUS)
            .progress(UPDATED_PROGRESS)
            .commissionAmount(UPDATED_COMMISSION_AMOUNT)
            .avgRating(UPDATED_AVG_RATING)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .amountReceived(UPDATED_AMOUNT_RECEIVED)
            .userName(UPDATED_USER_NAME)
            .skillName(UPDATED_SKILL_NAME)
            .fees(UPDATED_FEES)
            .remarks(UPDATED_REMARKS);
        return trainingRecord;
    }

    @BeforeEach
    public void initTest() {
        trainingRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrainingRecord() throws Exception {
        int databaseSizeBeforeCreate = trainingRecordRepository.findAll().size();

        // Create the TrainingRecord
        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isCreated());

        // Validate the TrainingRecord in the database
        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeCreate + 1);
        TrainingRecord testTrainingRecord = trainingRecordList.get(trainingRecordList.size() - 1);
        assertThat(testTrainingRecord.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTrainingRecord.getProgress()).isEqualTo(DEFAULT_PROGRESS);
        assertThat(testTrainingRecord.getCommissionAmount()).isEqualTo(DEFAULT_COMMISSION_AMOUNT);
        assertThat(testTrainingRecord.getAvgRating()).isEqualTo(DEFAULT_AVG_RATING);
        assertThat(testTrainingRecord.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTrainingRecord.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testTrainingRecord.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testTrainingRecord.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testTrainingRecord.getAmountReceived()).isEqualTo(DEFAULT_AMOUNT_RECEIVED);
        assertThat(testTrainingRecord.getUserName()).isEqualTo(DEFAULT_USER_NAME);
        assertThat(testTrainingRecord.getSkillName()).isEqualTo(DEFAULT_SKILL_NAME);
        assertThat(testTrainingRecord.getFees()).isEqualTo(DEFAULT_FEES);
        assertThat(testTrainingRecord.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createTrainingRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainingRecordRepository.findAll().size();

        // Create the TrainingRecord with an existing ID
        trainingRecord.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingRecord in the database
        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setStatus(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProgressIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setProgress(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCommissionAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setCommissionAmount(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAvgRatingIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setAvgRating(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setStartDate(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setEndDate(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setStartTime(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setEndTime(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountReceivedIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setAmountReceived(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUserNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setUserName(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSkillNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setSkillName(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFeesIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRecordRepository.findAll().size();
        // set the field null
        trainingRecord.setFees(null);

        // Create the TrainingRecord, which fails.

        restTrainingRecordMockMvc.perform(post("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrainingRecords() throws Exception {
        // Initialize the database
        trainingRecordRepository.saveAndFlush(trainingRecord);

        // Get all the trainingRecordList
        restTrainingRecordMockMvc.perform(get("/api/training-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainingRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].progress").value(hasItem(DEFAULT_PROGRESS)))
            .andExpect(jsonPath("$.[*].commissionAmount").value(hasItem(DEFAULT_COMMISSION_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].avgRating").value(hasItem(DEFAULT_AVG_RATING.doubleValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME)))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME)))
            .andExpect(jsonPath("$.[*].amountReceived").value(hasItem(DEFAULT_AMOUNT_RECEIVED.doubleValue())))
            .andExpect(jsonPath("$.[*].userName").value(hasItem(DEFAULT_USER_NAME)))
            .andExpect(jsonPath("$.[*].skillName").value(hasItem(DEFAULT_SKILL_NAME)))
            .andExpect(jsonPath("$.[*].fees").value(hasItem(DEFAULT_FEES.doubleValue())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS)));
    }
    
    @Test
    @Transactional
    public void getTrainingRecord() throws Exception {
        // Initialize the database
        trainingRecordRepository.saveAndFlush(trainingRecord);

        // Get the trainingRecord
        restTrainingRecordMockMvc.perform(get("/api/training-records/{id}", trainingRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trainingRecord.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.progress").value(DEFAULT_PROGRESS))
            .andExpect(jsonPath("$.commissionAmount").value(DEFAULT_COMMISSION_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.avgRating").value(DEFAULT_AVG_RATING.doubleValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME))
            .andExpect(jsonPath("$.amountReceived").value(DEFAULT_AMOUNT_RECEIVED.doubleValue()))
            .andExpect(jsonPath("$.userName").value(DEFAULT_USER_NAME))
            .andExpect(jsonPath("$.skillName").value(DEFAULT_SKILL_NAME))
            .andExpect(jsonPath("$.fees").value(DEFAULT_FEES.doubleValue()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS));
    }

    @Test
    @Transactional
    public void getNonExistingTrainingRecord() throws Exception {
        // Get the trainingRecord
        restTrainingRecordMockMvc.perform(get("/api/training-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrainingRecord() throws Exception {
        // Initialize the database
        trainingRecordService.save(trainingRecord);

        int databaseSizeBeforeUpdate = trainingRecordRepository.findAll().size();

        // Update the trainingRecord
        TrainingRecord updatedTrainingRecord = trainingRecordRepository.findById(trainingRecord.getId()).get();
        // Disconnect from session so that the updates on updatedTrainingRecord are not directly saved in db
        em.detach(updatedTrainingRecord);
        updatedTrainingRecord
            .status(UPDATED_STATUS)
            .progress(UPDATED_PROGRESS)
            .commissionAmount(UPDATED_COMMISSION_AMOUNT)
            .avgRating(UPDATED_AVG_RATING)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .amountReceived(UPDATED_AMOUNT_RECEIVED)
            .userName(UPDATED_USER_NAME)
            .skillName(UPDATED_SKILL_NAME)
            .fees(UPDATED_FEES)
            .remarks(UPDATED_REMARKS);

        restTrainingRecordMockMvc.perform(put("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrainingRecord)))
            .andExpect(status().isOk());

        // Validate the TrainingRecord in the database
        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeUpdate);
        TrainingRecord testTrainingRecord = trainingRecordList.get(trainingRecordList.size() - 1);
        assertThat(testTrainingRecord.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTrainingRecord.getProgress()).isEqualTo(UPDATED_PROGRESS);
        assertThat(testTrainingRecord.getCommissionAmount()).isEqualTo(UPDATED_COMMISSION_AMOUNT);
        assertThat(testTrainingRecord.getAvgRating()).isEqualTo(UPDATED_AVG_RATING);
        assertThat(testTrainingRecord.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTrainingRecord.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testTrainingRecord.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testTrainingRecord.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testTrainingRecord.getAmountReceived()).isEqualTo(UPDATED_AMOUNT_RECEIVED);
        assertThat(testTrainingRecord.getUserName()).isEqualTo(UPDATED_USER_NAME);
        assertThat(testTrainingRecord.getSkillName()).isEqualTo(UPDATED_SKILL_NAME);
        assertThat(testTrainingRecord.getFees()).isEqualTo(UPDATED_FEES);
        assertThat(testTrainingRecord.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingTrainingRecord() throws Exception {
        int databaseSizeBeforeUpdate = trainingRecordRepository.findAll().size();

        // Create the TrainingRecord

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingRecordMockMvc.perform(put("/api/training-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingRecord)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingRecord in the database
        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrainingRecord() throws Exception {
        // Initialize the database
        trainingRecordService.save(trainingRecord);

        int databaseSizeBeforeDelete = trainingRecordRepository.findAll().size();

        // Delete the trainingRecord
        restTrainingRecordMockMvc.perform(delete("/api/training-records/{id}", trainingRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TrainingRecord> trainingRecordList = trainingRecordRepository.findAll();
        assertThat(trainingRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingRecord.class);
        TrainingRecord trainingRecord1 = new TrainingRecord();
        trainingRecord1.setId(1L);
        TrainingRecord trainingRecord2 = new TrainingRecord();
        trainingRecord2.setId(trainingRecord1.getId());
        assertThat(trainingRecord1).isEqualTo(trainingRecord2);
        trainingRecord2.setId(2L);
        assertThat(trainingRecord1).isNotEqualTo(trainingRecord2);
        trainingRecord1.setId(null);
        assertThat(trainingRecord1).isNotEqualTo(trainingRecord2);
    }
}
