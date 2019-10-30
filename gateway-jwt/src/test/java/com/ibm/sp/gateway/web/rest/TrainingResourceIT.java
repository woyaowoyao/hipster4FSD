package com.ibm.sp.gateway.web.rest;

import com.ibm.sp.gateway.GatewayApp;
import com.ibm.sp.gateway.domain.Training;
import com.ibm.sp.gateway.repository.TrainingRepository;
import com.ibm.sp.gateway.service.TrainingService;
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

import com.ibm.sp.gateway.domain.enumeration.TrainStatus;
/**
 * Integration tests for the {@link TrainingResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
public class TrainingResourceIT {

    private static final TrainStatus DEFAULT_STATUS = TrainStatus.Active;
    private static final TrainStatus UPDATED_STATUS = TrainStatus.Inactive;

    private static final Float DEFAULT_COMMISSION_AMOUNT = 1F;
    private static final Float UPDATED_COMMISSION_AMOUNT = 2F;

    private static final Integer DEFAULT_AVG_RATING = 1;
    private static final Integer UPDATED_AVG_RATING = 2;

    private static final String DEFAULT_START_DATE = "AAAAAAAAAA";
    private static final String UPDATED_START_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_END_DATE = "AAAAAAAAAA";
    private static final String UPDATED_END_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_START_TIME = "AAAAAAAAAA";
    private static final String UPDATED_START_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_END_TIME = "AAAAAAAAAA";
    private static final String UPDATED_END_TIME = "BBBBBBBBBB";

    private static final Long DEFAULT_MENTOR_ID = 1L;
    private static final Long UPDATED_MENTOR_ID = 2L;

    private static final String DEFAULT_MENTOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MENTOR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SKILL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SKILL_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_FEES = 1F;
    private static final Float UPDATED_FEES = 2F;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private TrainingService trainingService;

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

    private MockMvc restTrainingMockMvc;

    private Training training;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainingResource trainingResource = new TrainingResource(trainingService);
        this.restTrainingMockMvc = MockMvcBuilders.standaloneSetup(trainingResource)
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
    public static Training createEntity(EntityManager em) {
        Training training = new Training()
            .status(DEFAULT_STATUS)
            .commissionAmount(DEFAULT_COMMISSION_AMOUNT)
            .avgRating(DEFAULT_AVG_RATING)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .mentorId(DEFAULT_MENTOR_ID)
            .mentorName(DEFAULT_MENTOR_NAME)
            .skillName(DEFAULT_SKILL_NAME)
            .fees(DEFAULT_FEES)
            .remarks(DEFAULT_REMARKS);
        return training;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Training createUpdatedEntity(EntityManager em) {
        Training training = new Training()
            .status(UPDATED_STATUS)
            .commissionAmount(UPDATED_COMMISSION_AMOUNT)
            .avgRating(UPDATED_AVG_RATING)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .mentorId(UPDATED_MENTOR_ID)
            .mentorName(UPDATED_MENTOR_NAME)
            .skillName(UPDATED_SKILL_NAME)
            .fees(UPDATED_FEES)
            .remarks(UPDATED_REMARKS);
        return training;
    }

    @BeforeEach
    public void initTest() {
        training = createEntity(em);
    }

    @Test
    @Transactional
    public void createTraining() throws Exception {
        int databaseSizeBeforeCreate = trainingRepository.findAll().size();

        // Create the Training
        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isCreated());

        // Validate the Training in the database
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeCreate + 1);
        Training testTraining = trainingList.get(trainingList.size() - 1);
        assertThat(testTraining.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTraining.getCommissionAmount()).isEqualTo(DEFAULT_COMMISSION_AMOUNT);
        assertThat(testTraining.getAvgRating()).isEqualTo(DEFAULT_AVG_RATING);
        assertThat(testTraining.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTraining.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testTraining.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testTraining.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testTraining.getMentorId()).isEqualTo(DEFAULT_MENTOR_ID);
        assertThat(testTraining.getMentorName()).isEqualTo(DEFAULT_MENTOR_NAME);
        assertThat(testTraining.getSkillName()).isEqualTo(DEFAULT_SKILL_NAME);
        assertThat(testTraining.getFees()).isEqualTo(DEFAULT_FEES);
        assertThat(testTraining.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createTrainingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainingRepository.findAll().size();

        // Create the Training with an existing ID
        training.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        // Validate the Training in the database
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setStatus(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCommissionAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setCommissionAmount(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setStartDate(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setEndDate(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setStartTime(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setEndTime(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMentorIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setMentorId(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMentorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setMentorName(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSkillNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setSkillName(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFeesIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setFees(null);

        // Create the Training, which fails.

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrainings() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList
        restTrainingMockMvc.perform(get("/api/trainings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(training.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].commissionAmount").value(hasItem(DEFAULT_COMMISSION_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].avgRating").value(hasItem(DEFAULT_AVG_RATING)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME)))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME)))
            .andExpect(jsonPath("$.[*].mentorId").value(hasItem(DEFAULT_MENTOR_ID.intValue())))
            .andExpect(jsonPath("$.[*].mentorName").value(hasItem(DEFAULT_MENTOR_NAME)))
            .andExpect(jsonPath("$.[*].skillName").value(hasItem(DEFAULT_SKILL_NAME)))
            .andExpect(jsonPath("$.[*].fees").value(hasItem(DEFAULT_FEES.doubleValue())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS)));
    }
    
    @Test
    @Transactional
    public void getTraining() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get the training
        restTrainingMockMvc.perform(get("/api/trainings/{id}", training.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(training.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.commissionAmount").value(DEFAULT_COMMISSION_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.avgRating").value(DEFAULT_AVG_RATING))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME))
            .andExpect(jsonPath("$.mentorId").value(DEFAULT_MENTOR_ID.intValue()))
            .andExpect(jsonPath("$.mentorName").value(DEFAULT_MENTOR_NAME))
            .andExpect(jsonPath("$.skillName").value(DEFAULT_SKILL_NAME))
            .andExpect(jsonPath("$.fees").value(DEFAULT_FEES.doubleValue()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS));
    }

    @Test
    @Transactional
    public void getNonExistingTraining() throws Exception {
        // Get the training
        restTrainingMockMvc.perform(get("/api/trainings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTraining() throws Exception {
        // Initialize the database
        trainingService.save(training);

        int databaseSizeBeforeUpdate = trainingRepository.findAll().size();

        // Update the training
        Training updatedTraining = trainingRepository.findById(training.getId()).get();
        // Disconnect from session so that the updates on updatedTraining are not directly saved in db
        em.detach(updatedTraining);
        updatedTraining
            .status(UPDATED_STATUS)
            .commissionAmount(UPDATED_COMMISSION_AMOUNT)
            .avgRating(UPDATED_AVG_RATING)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .mentorId(UPDATED_MENTOR_ID)
            .mentorName(UPDATED_MENTOR_NAME)
            .skillName(UPDATED_SKILL_NAME)
            .fees(UPDATED_FEES)
            .remarks(UPDATED_REMARKS);

        restTrainingMockMvc.perform(put("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTraining)))
            .andExpect(status().isOk());

        // Validate the Training in the database
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeUpdate);
        Training testTraining = trainingList.get(trainingList.size() - 1);
        assertThat(testTraining.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTraining.getCommissionAmount()).isEqualTo(UPDATED_COMMISSION_AMOUNT);
        assertThat(testTraining.getAvgRating()).isEqualTo(UPDATED_AVG_RATING);
        assertThat(testTraining.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTraining.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testTraining.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testTraining.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testTraining.getMentorId()).isEqualTo(UPDATED_MENTOR_ID);
        assertThat(testTraining.getMentorName()).isEqualTo(UPDATED_MENTOR_NAME);
        assertThat(testTraining.getSkillName()).isEqualTo(UPDATED_SKILL_NAME);
        assertThat(testTraining.getFees()).isEqualTo(UPDATED_FEES);
        assertThat(testTraining.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingTraining() throws Exception {
        int databaseSizeBeforeUpdate = trainingRepository.findAll().size();

        // Create the Training

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingMockMvc.perform(put("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(training)))
            .andExpect(status().isBadRequest());

        // Validate the Training in the database
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTraining() throws Exception {
        // Initialize the database
        trainingService.save(training);

        int databaseSizeBeforeDelete = trainingRepository.findAll().size();

        // Delete the training
        restTrainingMockMvc.perform(delete("/api/trainings/{id}", training.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Training.class);
        Training training1 = new Training();
        training1.setId(1L);
        Training training2 = new Training();
        training2.setId(training1.getId());
        assertThat(training1).isEqualTo(training2);
        training2.setId(2L);
        assertThat(training1).isNotEqualTo(training2);
        training1.setId(null);
        assertThat(training1).isNotEqualTo(training2);
    }
}
