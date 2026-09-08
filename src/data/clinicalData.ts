import { JointData, Specialist, Modality, TrajectoryPhase } from '../types';

export const CLINICAL_JOINTS: Record<string, JointData> = {
  knee: {
    id: 'knee',
    name: 'Knee & Patellofemoral',
    anatomicalName: 'TIBIOFEMORAL & PATELLOFEMORAL JOINT',
    category: 'Lower Kinetic Chain',
    biomechanics: 'Deceleration forces, patellar tracking, and meniscus shock absorption',
    coordinates: { x: 44, y: 68 },
    commonConcerns: [
      'Anterior knee ache descending stairs or downhill running',
      'Stiffness following prolonged sitting with bent knees (moviegoer sign)',
      'Lateral knee tightness during running past kilometer 5',
      'Patellar tendon sensitivity on sudden jump landing or deceleration'
    ],
    clinicalEvidenceFocus:
      'Proximal hip strength rehabilitation combined with localized quadriceps loading shows 88% success in patellofemoral recovery over passive knee bracing.',
    successRate: '94% within 8 weeks',
    keyIndicators: ['Q-Angle Alignment', 'VMO Activation Timing', 'Hamstring:Quad Ratio 0.65'],
    recommendedSpecialistId: 'sarah-chen'
  },
  spine: {
    id: 'spine',
    name: 'Lumbar & Axial Spine',
    anatomicalName: 'LUMBAR LORDOSIS & SACROILIAC JUNCTION',
    category: 'Axial Column',
    biomechanics: 'Rotational torque distribution, intra-abdominal pressure gating, and intervertebral shear dampening',
    coordinates: { x: 50, y: 48 },
    commonConcerns: [
      'Deep central ache during flexion when bending to tie shoelaces',
      'Radiating buttock or posterior thigh numbness upon prolonged sitting',
      'Morning lumbar lock requiring 20 minutes of gentle ambulation to resolve',
      'Loss of pelvic stability during heavy rotational athletic loading'
    ],
    clinicalEvidenceFocus:
      'Motor control retraining of transversus abdominis and multifidus reduces recurrence of non-specific low back pain by 73% at 12-month follow-up (Lancet Rheumatology 2023).',
    successRate: '92% within 6 weeks',
    keyIndicators: ['Multifidus Sonography', 'Sorensen Endurance Test >120s', 'Slump Neurodynamics'],
    recommendedSpecialistId: 'marcus-vance'
  },
  shoulder: {
    id: 'shoulder',
    name: 'Shoulder & Glenohumeral',
    anatomicalName: 'GLENOHUMERAL & SCAPULOTHORACIC ARTICULATION',
    category: 'Upper Kinetic Chain',
    biomechanics: 'Multidirectional tri-planar range, scapular upward rotation, and rotator cuff force-coupling',
    coordinates: { x: 38, y: 28 },
    commonConcerns: [
      'Sharp catch in anterior shoulder during overhead reaches past 90 degrees',
      'Inability to sleep on affected shoulder due to dull throbbing ache',
      'Scapular winging or loss of rhythmic control when lowering arm',
      'Posterior capsule tightness leading to internal rotation deficit'
    ],
    clinicalEvidenceFocus:
      'Supervised progressive rotator cuff loading with serratus anterior activation achieves outcomes equal to subacromial decompression surgery, avoiding surgical morbidity (BMJ 2022).',
    successRate: '91% within 9 weeks',
    keyIndicators: ['Scapular Dyskinesis Test', 'Internal Rotation Deficit (GIRD) <15°', 'ER:IR Ratio 0.75'],
    recommendedSpecialistId: 'elena-rostova'
  },
  hip: {
    id: 'hip',
    name: 'Hip & Acetabulofemoral',
    anatomicalName: 'ACETABULOFEMORAL & PELVIC RING',
    category: 'Central Kinetic Junction',
    biomechanics: 'Weight-bearing tri-axial ground reaction absorption, gluteal propulsion, and femoroacetabular clearance',
    coordinates: { x: 45, y: 54 },
    commonConcerns: [
      'Pinching sensation in deep groin at bottom of squat or sitting in low car seats',
      'Lateral hip pain when lying on side (trochanteric pain syndrome)',
      'Trendelenburg gait or pelvic drop during unilateral stance and stair climbs',
      'Restricted hip internal rotation affecting golf or tennis swing torque'
    ],
    clinicalEvidenceFocus:
      'Gluteus medius and minimus isometric loading coupled with movement re-education demonstrates 84% resolution of greater trochanteric pain without corticosteroid injection.',
    successRate: '89% within 7 weeks',
    keyIndicators: ['FADIR Test Clearance', 'Single Leg Pelvic Drop <3°', 'Abductor Peak Torque'],
    recommendedSpecialistId: 'elena-rostova'
  },
  ankle: {
    id: 'ankle',
    name: 'Ankle & Subtalar Complex',
    anatomicalName: 'TALOCRURAL & SUBTALAR MORTISE',
    category: 'Distal Kinetic Foundation',
    biomechanics: 'Plantarflexion elastic recoil, sagittal dorsiflexion glide, and rearfoot eversion shock mitigation',
    coordinates: { x: 44, y: 88 },
    commonConcerns: [
      'Stiff dorsiflexion restricting squat depth or descending curbs',
      'Recurrent inversion ankle rolls on uneven pavement or grass',
      'Morning Achilles tendon stiffness requiring eccentric warm-up',
      'Plantar fascia strain upon the first three steps out of bed'
    ],
    clinicalEvidenceFocus:
      'High-load slow resistance training stimulates tenocyte collagen synthesis in Achilles tendinopathy with superior long-term tendon stiffness compared to stretching alone.',
    successRate: '96% within 10 weeks',
    keyIndicators: ['Weight-Bearing Lunge Test >10cm', 'Calf Raise Endurance >30 reps', 'Subtalar Neutral'],
    recommendedSpecialistId: 'sarah-chen'
  },
  cervical: {
    id: 'cervical',
    name: 'Cervical & Craniovertebral',
    anatomicalName: 'CERVICOTHORACIC JUNCTION & SUBOCCIPITAL AXIS',
    category: 'Upper Axial',
    biomechanics: 'Ocular-vestibular proprioception, craniovertebral load buffering, and postural cervical lordosis',
    coordinates: { x: 50, y: 19 },
    commonConcerns: [
      'Tension headaches originating at skull base radiating to forehead',
      'Sharp pain when checking blind spot while driving',
      'Postural neck fatigue after 4 hours of desktop screen viewing',
      'Trap muscle spasm with tingling into hand along C6/C7 dermatome'
    ],
    clinicalEvidenceFocus:
      'Deep cervical flexor endurance training combined with thoracic spine mobilization reduces cervicogenic headache frequency by 68% (JOSPT 2023).',
    successRate: '93% within 5 weeks',
    keyIndicators: ['Craniocervical Flexion Test', 'Thoracic Kyphosis Angle', 'Upper Limb Tension Test'],
    recommendedSpecialistId: 'marcus-vance'
  }
};

export const SPECIALISTS_DATA: Specialist[] = [
  {
    id: 'sarah-chen',
    name: 'Dr. Sarah Chen, DPT',
    title: 'Orthopedic & Sports Physiotherapy',
    degrees: 'DPT, OCS, CSCS',
    specialization: 'Knee Biomechanics & Running Gait',
    category: 'knee',
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 186,
    consultationFee: 1840,
    cashlessCopay: 350,
    matchScore: 98,
    matchReasons: [
      'Doctor of Physical Therapy (Univ. of Southern California)',
      '11+ years specialized knee & running kinetic rehabilitation',
      'Consultant to Olympic track & distance runners'
    ],
    audioIntroSeconds: 18,
    audioQuote:
      'We do not treat MRIs in isolation. We analyze how your foot strike, hip rotation, and trunk control interact to resolve knee pain permanently.',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813681-ef0e8b15d2a7?auto=format&fit=crop&w=400&q=80',
    focusTags: ['Lumbar rehabilitation', 'Running injuries', 'Strength & conditioning', 'Post-ACL return to sport'],
    availableSlots: ['5:30 PM', '6:30 PM', '7:15 PM'],
    education: [
      'Doctor of Physical Therapy (DPT) — University of Southern California',
      'Board-Certified Clinical Specialist in Orthopedic Physical Therapy (OCS)',
      'Certified Strength & Conditioning Specialist (CSCS)'
    ],
    clinicalFocus:
      'Patellofemoral tracking disorders, high-speed deceleration force absorption, and kinematic running gait correction.',
    publishedResearch: [
      'Frontal Plane Projection Angle in Female Deceleration Tasks (JOSPT 2021)',
      'Proximal Hip Abductor Torque and Patellar Tendon Strain Rates (BJSM 2023)'
    ],
    clinicLocation: 'Bandra West Movement Lab, Mumbai / Tele-Rehab'
  },
  {
    id: 'marcus-vance',
    name: 'Dr. Marcus Vance, PT, DPT',
    title: 'Spine & Biomechanical Kinematics',
    degrees: 'DPT, FAAOMPT, Dip. MDT',
    specialization: 'Axial Spine, Lumbar Disc & Neck Pain',
    category: 'spine',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 214,
    consultationFee: 2016,
    cashlessCopay: 400,
    matchScore: 95,
    matchReasons: [
      'Fellow of American Academy of Orthopaedic Manual Physical Therapists',
      'Advanced McKenzie (MDT) Diplomat in mechanical spinal diagnosis',
      'Pioneer in force plate axial load distribution'
    ],
    audioIntroSeconds: 22,
    audioQuote:
      'Spinal rehabilitation is about teaching your deep stabilising musculature to decompress discs automatically during daily posture and heavy lifting.',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    focusTags: ['Spinal manipulation', 'Dry needling', 'Axial load progression', 'Disc herniation protocol'],
    availableSlots: ['4:30 PM', '5:30 PM', '6:30 PM'],
    education: [
      'Doctor of Physical Therapy (DPT) — Northwestern University',
      'Fellowship in Orthopaedic Manual Physical Therapy (FAAOMPT)',
      'MDT Credentialed Spine Specialist'
    ],
    clinicalFocus:
      'Lumbar radiculopathy, mechanical directional preference assessment, thoracic kyphosis mobilizations, and return-to-deadlift clearance.',
    publishedResearch: [
      'Multifidus Motor Unit Recruitment Under Variable Axial Loads (Spine 2020)',
      'Longitudinal Outcomes of Mechanical Diagnosis Therapy in Degenerative Disc Disease (Lancet Reh 2022)'
    ],
    clinicLocation: 'Indiranagar Spine & Sport, Bengaluru / Tele-Rehab'
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova, MSc, PT',
    title: 'Knee, Hip & Kinetic Movement Science',
    degrees: 'MSc PT, CMP, CSCS',
    specialization: 'Hip Femoroacetabular & Overhead Shoulder',
    category: 'hip',
    experienceYears: 9,
    rating: 4.8,
    reviewsCount: 142,
    consultationFee: 1736,
    cashlessCopay: 350,
    matchScore: 94,
    matchReasons: [
      'Masters in Neuromusculoskeletal Physiotherapy (King’s College London)',
      'Certified Mulligan Practitioner (CMP)',
      'Lead biomechanist for national swimming & tennis squads'
    ],
    audioIntroSeconds: 19,
    audioQuote:
      'When your shoulder or hip is painful, the culprit is often two joints away. We map the entire movement chain to create pain-free movement.',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    focusTags: ['Gait biomechanics', 'Patellar tendon loading', 'Hip preservation', 'Scapular rhythm restore'],
    availableSlots: ['6:00 PM', '6:30 PM', '7:30 PM'],
    education: [
      'MSc Neuromusculoskeletal Physiotherapy — King’s College London',
      'BSc (Hons) Physiotherapy — Karolinska Institute, Sweden',
      'Certified Mulligan Practitioner'
    ],
    clinicalFocus:
      'Labral tear rehabilitation, femoroacetabular impingement (FAI), rotator cuff tendinopathy, and swimming stroke analysis.',
    publishedResearch: [
      'Scapulothoracic Upward Rotation Deficits in Overhead Athletes (AJSM 2022)',
      'Hip Abductor Activation Ratios During Squatting Variations (Gait & Posture 2023)'
    ],
    clinicLocation: 'Vasant Vihar Biomechanics Clinic, New Delhi / Tele-Rehab'
  }
];

export const MODALITIES_DATA: Modality[] = [
  {
    id: 'manual-therapy',
    title: 'MANUAL THERAPY',
    evidenceStrength: 'STRONG',
    subtitle: 'JOINT MOBILIZATION, MYOFASCIAL RELEASE & HIGH-VELOCITY THRUST',
    description:
      'Hands-on techniques used alongside active rehabilitation to improve movement, modulate neurophysiological threat, and restore joint arthrokinematics.',
    mechanisms: [
      'Mechanoreceptor stimulation down-regulating nociceptive dorsal horn transmission',
      'Capsular glide restoration improving end-range joint clearance',
      'Transient reduction in surrounding protective muscle hypertonicity'
    ],
    indications: ['Acute facet joint lock', 'Adhesive capsulitis', 'Ankle mortise dorsiflexion restriction', 'Post-immobilisation stiffness'],
    contraindications: ['Active bone pathology', 'Severe osteoporosis with T-score <-3.0', 'Cervical arterial insufficiency'],
    clinicalCitations: [
      {
        journal: 'Journal of Orthopaedic & Sports Physical Therapy',
        year: 2023,
        title: 'Manual Therapy Combined With Exercise for Knee Osteoarthritis: A Systematic Review',
        finding: 'Showed immediate clinically meaningful pain reductions (ES: 0.72) facilitating higher tolerance for progressive resistance exercises.'
      },
      {
        journal: 'Cochrane Database of Systematic Reviews',
        year: 2022,
        title: 'Manipulative Therapy for Mechanical Neck Disorders',
        finding: 'Moderate-quality evidence demonstrates superior short-term pain relief when paired with deep neck flexor strengthening.'
      }
    ]
  },
  {
    id: 'dry-needling',
    title: 'DRY NEEDLING',
    evidenceStrength: 'MODERATE',
    subtitle: 'INTRAMUSCULAR TRIGGER POINT RELEASE & NEUROMUSCULAR RESET',
    description:
      'A targeted technique often used alongside movement and exercise-based rehabilitation to relieve localized muscular hypertonicity and trigger point irritability.',
    mechanisms: [
      'Mechanical disruption of sustained actin-myosin motor endplate contraction',
      'Local twitch response leading to immediate drop in inflammatory biochemicals (substance P, CGRP)',
      'Focal hyperaemia increasing microvascular oxygenation in ischemic knots'
    ],
    indications: ['Myofascial pain syndromes', 'Chronic piriformis syndrome', 'Upper trapezius tension headaches', 'Patellar fat pad impingement'],
    contraindications: ['Needle phobia', 'Active anticoagulant therapy', 'Local skin infection', 'Compromised immune response'],
    clinicalCitations: [
      {
        journal: 'British Journal of Sports Medicine',
        year: 2023,
        title: 'Trigger Point Dry Needling for Musculoskeletal Pain: Systematic Review & Meta-Analysis',
        finding: 'Statistically significant reduction in subjective visual analog scale (VAS) scores at 48 hours and 4 weeks post-treatment.'
      }
    ]
  },
  {
    id: 'hydrotherapy',
    title: 'HYDROTHERAPY',
    evidenceStrength: 'CONTEXT DEPENDENT',
    subtitle: 'BUOYANCY-ASSISTED AQUATIC KINEMATICS & GRADED DELOADING',
    description:
      'Movement-based rehabilitation using the reduced-load environment of water to train motor control when ground reaction forces are temporarily contraindicated.',
    mechanisms: [
      'Archimedes buoyancy offsetting up to 90% of body weight when immersed to neck level',
      'Hydrostatic pressure assisting venous return and post-operative peripheral lymphatic drainage',
      'Viscous drag providing smooth, accommodates-to-effort concentric resistance in all movement vectors'
    ],
    indications: ['Early post-op knee ligament reconstructions', 'Severe spinal spinal stenosis', 'Weight-bearing non-union fractures', 'High BMI arthritic unloading'],
    contraindications: ['Open surgical wounds without waterproof sealing', 'Uncontrolled cardiovascular instability', 'Acute chlorine allergies'],
    clinicalCitations: [
      {
        journal: 'Physical Therapy & Rehabilitation Journal',
        year: 2022,
        title: 'Aquatic Versus Land-Based Rehabilitation Following Total Knee Arthroplasty',
        finding: 'Aquatic interventions preserved early quadriceps voluntary activation while reducing analgesic requirements by 34%.'
      }
    ]
  },
  {
    id: 'eccentric-loading',
    title: 'ECCENTRIC ISOKINETIC LOADING',
    evidenceStrength: 'HIGH GRADE A',
    subtitle: 'COLLAGEN REMODELING, STRUCTURAL TENDON STIFFNESS & FORCE ABSORPTION',
    description:
      'High-load, slow velocity muscle lengthening protocols designed to stimulate tenocyte tenascin-C upregulation and remodel disrupted collagen architecture.',
    mechanisms: [
      'High-magnitude tendon tensile strain inducing cell-matrix mechanotransduction',
      'Neovascularization regression in chronic degenerate tendinopathy zones',
      'Cortical motor reorganization eliminating maladaptive load-avoidance inhibition'
    ],
    indications: ['Achilles tendinopathy', 'Patellar tendinopathy (jumper’s knee)', 'Proximal hamstring tendinopathy', 'Lateral epicondylalgia'],
    contraindications: ['Acute full-thickness tendon rupture', 'Unstabilized avulsion fractures'],
    clinicalCitations: [
      {
        journal: 'The American Journal of Sports Medicine',
        year: 2024,
        title: 'Heavy Slow Resistance Versus Eccentric Training for Tendinopathy: A 5-Year Cohort Study',
        finding: '88% of patients maintained symptom-free athletic return at 5 years with increased collagen fibril diameter on ultrasound.'
      }
    ]
  }
];

export const TRAJECTORY_STEPS: TrajectoryPhase[] = [
  {
    step: 'STEP 01',
    timeframe: 'DAY 01',
    phaseName: 'ASSESS',
    clinicalObjective: 'Baseline & Kinematics',
    interventions: [
      'High-speed digital 240fps video motion capture across 3 planes',
      'Dual dual-axis force plate ground reaction force asymmetry measurement',
      'Handheld isometric dynamometry torque profiling',
      'Clinical joint clearance & neural sensitivity testing'
    ],
    clearanceMilestone: 'Clear mechanical classification & identification of driver joint',
    targetMetrics: 'Baseline established · Asymmetry baseline logged'
  },
  {
    step: 'STEP 02',
    timeframe: 'WEEK 01',
    phaseName: 'NEUROMODULATION',
    clinicalObjective: 'Baseline Neuromodulation & Threat Reduction',
    interventions: [
      'Targeted spinal decompression & gentle joint mobilizations',
      'Pain gating and sensory discrimination training',
      'Diaphragmatic intra-abdominal pressure modulation',
      'Early gentle protected range recovery without symptom aggravation'
    ],
    clearanceMilestone: 'Pain VAS <3/10 with resting daily postures',
    targetMetrics: 'Resting VAS ≤ 2 · Sleeping through the night uninterrupted'
  },
  {
    step: 'STEP 03',
    timeframe: 'WEEK 02-05',
    phaseName: 'MOBILITY & CAPSULAR GLIDE',
    clinicalObjective: 'Restoring Arthrokinematics & Motor Guarding Removal',
    interventions: [
      'Physiological arthrokinematics restoration through loaded end-range training',
      'Inhibition of protective co-contraction loops',
      'Unilateral closed kinetic chain neuromuscular patterns',
      'Isolated muscle capacity building'
    ],
    clearanceMilestone: 'Full anatomical joint range without protective muscular hitching',
    targetMetrics: 'Active ROM within 5% of unaffected limb · Zero post-session flare'
  },
  {
    step: 'STEP 04',
    timeframe: 'WEEK 06-10',
    phaseName: 'DYNAMIC LOAD & STRENGTH',
    clinicalObjective: 'Progressive Overload & Kinetic Chain Integration',
    interventions: [
      'Heavy slow resistance (HSR) tendon adaptation',
      'Rate of force development (RFD) training',
      'Multi-planar deceleration and cutting mechanics',
      'Perturbation training on dynamic instability platforms'
    ],
    clearanceMilestone: 'Limb Symmetry Index (LSI) >85% on isometric testing',
    targetMetrics: 'Isometric peak force ≥85% contralateral · Y-Balance test symmetry'
  },
  {
    step: 'STEP 05',
    timeframe: 'WEEK 12+',
    phaseName: 'RETURN TO SPORT & LIFE',
    clinicalObjective: 'High Velocity Deceleration & Resilience Discharge',
    interventions: [
      'Maximal reactive strength index (RSI) plyometric testing',
      'Fatigued-state biomechanical motion capture audit',
      'Sport-specific or vocation-specific movement stress testing',
      'Long-term autonomous maintenance programming'
    ],
    clearanceMilestone: 'Limb Symmetry Index >95% + Psychological readiness score',
    targetMetrics: 'Full discharge clearance · ACL-RSI / SIRAS score >80'
  }
];

export const CLINICAL_STANDARDS = [
  {
    id: 'specialists',
    title: 'Board-Certified Specialists Only',
    subtitle: 'Doctoral Degrees & Dedicated Care',
    description:
      'Every therapist holds doctoral degrees (DPT) or board clinical specializations (MPT, OCS, SCS). Dedicated 60-minute 1-on-1 clinical care with no junior aides managing your loading.',
    badge: '100% Specialist Faculty'
  },
  {
    id: 'biomechanics',
    title: 'Objective Biomechanical Screening',
    subtitle: 'Force Plates, Motion Capture & Dynamometry',
    description:
      'Force plates, high-speed camera gait analysis, and isometric dynamometry replace guesswork with measurable degrees, microvolts, and Newtons.',
    badge: 'Precision Instrumentation'
  },
  {
    id: 'coverage',
    title: 'Transparent Indian & Global Cashless Coverage',
    subtitle: 'Direct TPA Approval Across All Major Insurers',
    description:
      'Direct cashless approval across Star Health, HDFC ERGO, ICICI Lombard, Care Health, Bupa, CGHS with clear upfront co-pay and instant UPI receipts.',
    badge: 'Instant On-Site TPA'
  }
];

export const CLINICS = [
  {
    city: 'Mumbai',
    centerName: 'Bandra West Movement Lab',
    address: 'One Bandra, Level 4, Linking Road, Bandra West, Mumbai 400050',
    phone: '+91 22 6821 4400',
    timing: 'Mon – Sat: 7:30 AM – 8:30 PM'
  },
  {
    city: 'Bengaluru',
    centerName: 'Indiranagar Spine & Sport',
    address: '100 Feet Road, 12th Main, HAL 2nd Stage, Bengaluru 560038',
    phone: '+91 80 4412 8800',
    timing: 'Mon – Sat: 7:30 AM – 8:30 PM'
  },
  {
    city: 'New Delhi',
    centerName: 'Vasant Vihar Biomechanics Clinic',
    address: 'Basant Lok Community Centre, Vasant Vihar, New Delhi 110057',
    phone: '+91 11 4988 2200',
    timing: 'Mon – Sat: 7:30 AM – 8:30 PM'
  },
  {
    city: 'London',
    centerName: 'Mayfair Kinetic Practice',
    address: '28 Berkeley Square, Mayfair, London W1J 6EJ',
    phone: '+44 20 7946 0912',
    timing: 'Mon – Fri: 8:00 AM – 7:00 PM'
  }
];
