'use client';

import React, { useState } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Step data ─── */
const applicationCycles = [
  { value: 'early-action', label: 'Early Action (Deadline: 1 Nov 2026)' },
  { value: 'regular-1', label: 'Regular Decision I (Deadline: 13 Jan 2027)' },
  { value: 'regular-2', label: 'Regular Decision II (Deadline: 24 Feb 2027)' },
  { value: 'extended', label: 'Extended Decision (Deadline: 7 Apr 2027 — No Aid)' },
];

const concentrationOptions = [
  { value: '', label: 'Select a concentration...' },
  { value: 'natural-sciences', label: 'Natural Sciences' },
  { value: 'computational-sciences', label: 'Computational Sciences' },
  { value: 'social-sciences', label: 'Social Sciences' },
  { value: 'arts-humanities', label: 'Arts & Humanities' },
  { value: 'engineering-technology', label: 'Engineering & Technology' },
  { value: 'health-medicine', label: 'Health & Medicine' },
  { value: 'business-governance', label: 'Business & Governance' },
  { value: 'education-development', label: 'Education & Human Development' },
  { value: 'undecided', label: 'Undecided / Interdisciplinary' },
];

const countryOptions = [
  '', 'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Egypt', 'Ethiopia', 'France', 'Germany', 'Ghana', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kenya', 'Korea, South', 'Lebanon', 'Malaysia', 'Mexico', 'Morocco', 'Nepal', 'Netherlands', 'Nigeria', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Singapore', 'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Venezuela', 'Vietnam', 'Zambia', 'Zimbabwe',
];

const howHeardOptions = [
  '', 'Web search', 'Social media', 'Friend or family', 'Teacher or counsellor', 'University fair or event', 'News article', 'Alumni recommendation', 'Partner organisation', 'Other',
];

const gradingScaleOptions = [
  '', '4.0 GPA Scale', '4.0 Weighted GPA', '5.0 GPA Scale', '10-point scale', '100-point scale', 'Percentage (0-100)', 'IB Points (24-45)', 'UK A-Levels (A*-E)', 'French Baccalaureate (0-20)', 'German Abitur (1-6)', 'Other international scale',
];

export default function Apply({ goToPage }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Part 1: Personal
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [dualCitizenship, setDualCitizenship] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [howHeardOther, setHowHeardOther] = useState('');
  const [applicationCycle, setApplicationCycle] = useState('');
  const [concentration, setConcentration] = useState('');

  // Part 2: Academic
  const [currentlyEnrolled, setCurrentlyEnrolled] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolCountry, setSchoolCountry] = useState('');
  const [schoolCity, setSchoolCity] = useState('');
  const [enrollmentStart, setEnrollmentStart] = useState('');
  const [enrollmentEnd, setEnrollmentEnd] = useState('');
  const [gradingScale, setGradingScale] = useState('');
  const [gpa, setGpa] = useState('');
  const [maxGpa, setMaxGpa] = useState('');
  const [satMath, setSatMath] = useState('');
  const [satReading, setSatReading] = useState('');
  const [actScore, setActScore] = useState('');
  const [isTestOptional, setIsTestOptional] = useState(false);

  // Part 3: Accomplishments & Statement
  const [accomplishments, setAccomplishments] = useState<{ title: string; description: string; role: string; impact: string }[]>([
    { title: '', description: '', role: '', impact: '' },
  ]);
  const [personalStatement, setPersonalStatement] = useState('');
  const [missionStatement, setMissionStatement] = useState('');

  // Part 4: Financial Aid & Agreements
  const [applyingForAid, setApplyingForAid] = useState('');
  const [householdIncome, setHouseholdIncome] = useState('');
  const [dependents, setDependents] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeCertification, setAgreeCertification] = useState(false);

  const activeSection = useActiveSection(['application', 'deadlines', 'financial-aid']);

  const addAccomplishment = () => {
    if (accomplishments.length < 6) {
      setAccomplishments([...accomplishments, { title: '', description: '', role: '', impact: '' }]);
    }
  };

  const updateAccomplishment = (index: number, field: string, value: string) => {
    const updated = [...accomplishments];
    updated[index] = { ...updated[index], [field]: value };
    setAccomplishments(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#8A0000] transition-colors text-[14px]";
  const labelClass = "block text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-2";
  const selectClass = "w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#8A0000] transition-colors bg-white text-[14px]";

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[35vh] min-h-[280px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523050335102-c3250d857224?auto=format&fit=crop&q=80&w=1800"
              alt="Apply to Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Join Artemis</span>
              </div>
              <h1 className="text-[48px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4 uppercase">
                Application for<br />Admission
              </h1>
              <p className="text-[17px] text-white/70 max-w-xl leading-relaxed font-light">
                Join the next generation of scholars, innovators, and leaders at the University of Artemis. No application fee. Standardised tests are optional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'application', label: 'Application' },
          { id: 'deadlines', label: 'Deadlines' },
          { id: 'financial-aid', label: 'Financial Aid' },
        ]}
        activeSection={activeSection}
      />

      <div id="application" className="max-w-[1000px] mx-auto w-full px-8 lg:px-20 pt-16 mb-24 scroll-mt-[110px]">
        <p className="text-[14px] text-gray-500 leading-relaxed mb-10">
          Our application assesses who you are, how you think, and what you have done. There is no application fee. Standardised tests (SAT/ACT) are optional. Take your time — you can navigate between sections using the step indicators above.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 h-1 mb-12">
          <div className="bg-[#8A0000] h-1 transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
        </div>

        {submitted ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
            <CheckCircle2 size={64} className="text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received</h2>
            <p className="text-lg text-gray-600 mb-4">Thank you for your interest in the University of Artemis. We will be in touch regarding your application status.</p>
            <p className="text-[14px] text-gray-500 mb-8">You will receive a confirmation email at the address you provided. Please check your inbox and spam folder.</p>
            <button onClick={() => goToPage('home')} className="px-8 py-3 bg-[#141414] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#8A0000] transition-colors rounded">
              Return Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ═══ PART 1: PERSONAL INFORMATION ═══ */}
            {currentStep === 1 && (
              <div id="deadlines" className="space-y-8 scroll-mt-[110px]">
                <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100">
                  <div className="mb-8 flex items-center space-x-3">
                    <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Part 1 — Personal Information</span>
                  </div>

                  {/* Application Cycle */}
                  <div className="mb-8">
                    <label className={labelClass}>Application Cycle *</label>
                    <select required value={applicationCycle} onChange={e => setApplicationCycle(e.target.value)} className={selectClass}>
                      <option value="">Select a cycle...</option>
                      {applicationCycles.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Last / Family Name *</label>
                      <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Confirm Email *</label>
                      <input required type="email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  {/* Phone & Birthdate */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="+country code number" />
                    </div>
                    <div>
                      <label className={labelClass}>Date of Birth *</label>
                      <input required type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  {/* Gender & Pronoun */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Gender *</label>
                      <select required value={gender} onChange={e => setGender(e.target.value)} className={selectClass}>
                        <option value="">Select...</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not">Prefer not to say</option>
                        <option value="self-describe">Self-describe</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Pronoun (optional)</label>
                      <input type="text" value={pronoun} onChange={e => setPronoun(e.target.value)} className={inputClass} placeholder="e.g., she/her, they/them" />
                    </div>
                  </div>

                  {/* Citizenship */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Primary Citizenship *</label>
                      <select required value={citizenship} onChange={e => setCitizenship(e.target.value)} className={selectClass}>
                        <option value="">Select country...</option>
                        {countryOptions.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Secondary Citizenship</label>
                      <select value={dualCitizenship} onChange={e => setDualCitizenship(e.target.value)} className={selectClass}>
                        <option value="">None / Select...</option>
                        {countryOptions.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <label className={labelClass}>Street Address *</label>
                    <input required type="text" value={address} onChange={e => setAddress(e.target.value)} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                    <div className="col-span-1">
                      <label className={labelClass}>City *</label>
                      <input required type="text" value={city} onChange={e => setCity(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>State / Province</label>
                      <input type="text" value={state} onChange={e => setState(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Postal Code</label>
                      <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Country *</label>
                      <select required value={country} onChange={e => setCountry(e.target.value)} className={selectClass}>
                        <option value="">Select...</option>
                        {countryOptions.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Concentration */}
                  <div className="mb-6">
                    <label className={labelClass}>Intended Concentration *</label>
                    <select required value={concentration} onChange={e => setConcentration(e.target.value)} className={selectClass}>
                      {concentrationOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  {/* How did you hear */}
                  <div className="mb-6">
                    <label className={labelClass}>How did you learn about Artemis? *</label>
                    <select required value={howHeard} onChange={e => setHowHeard(e.target.value)} className={selectClass}>
                      {howHeardOptions.map((o, i) => <option key={i} value={o}>{o || 'Select...'}</option>)}
                    </select>
                  </div>
                  {howHeard === 'Other' && (
                    <div className="mb-6">
                      <label className={labelClass}>Please specify</label>
                      <input type="text" value={howHeardOther} onChange={e => setHowHeardOther(e.target.value)} className={inputClass} />
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={() => setCurrentStep(2)} className="flex items-center gap-2 px-8 py-3 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#141414] transition-colors rounded">
                    Next: Academic <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ═══ PART 2: ACADEMIC INFORMATION ═══ */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100">
                  <div className="mb-8 flex items-center space-x-3">
                    <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Part 2 — Academic Information</span>
                  </div>

                  {/* Currently enrolled */}
                  <div className="mb-6">
                    <label className={labelClass}>Are you currently enrolled in secondary school? *</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-[14px]">
                        <input type="radio" name="enrolled" value="yes" checked={currentlyEnrolled === 'yes'} onChange={e => setCurrentlyEnrolled(e.target.value)} className="accent-[#8A0000]" /> Yes
                      </label>
                      <label className="flex items-center gap-2 text-[14px]">
                        <input type="radio" name="enrolled" value="no" checked={currentlyEnrolled === 'no'} onChange={e => setCurrentlyEnrolled(e.target.value)} className="accent-[#8A0000]" /> No
                      </label>
                    </div>
                  </div>

                  {/* School info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>School Name *</label>
                      <input required type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>School Country *</label>
                      <select required value={schoolCountry} onChange={e => setSchoolCountry(e.target.value)} className={selectClass}>
                        <option value="">Select...</option>
                        {countryOptions.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
                    <div>
                      <label className={labelClass}>School City *</label>
                      <input required type="text" value={schoolCity} onChange={e => setSchoolCity(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Enrolment Start *</label>
                      <input required type="text" value={enrollmentStart} onChange={e => setEnrollmentStart(e.target.value)} className={inputClass} placeholder="e.g., Sep 2022" />
                    </div>
                    <div>
                      <label className={labelClass}>Enrolment End *</label>
                      <input required type="text" value={enrollmentEnd} onChange={e => setEnrollmentEnd(e.target.value)} className={inputClass} placeholder="e.g., Jun 2026" />
                    </div>
                  </div>

                  {/* Grading */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Grading Scale *</label>
                      <select required value={gradingScale} onChange={e => setGradingScale(e.target.value)} className={selectClass}>
                        {gradingScaleOptions.map((o, i) => <option key={i} value={o}>{o || 'Select...'}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Your GPA / Score *</label>
                      <input required type="text" value={gpa} onChange={e => setGpa(e.target.value)} className={inputClass} placeholder="e.g., 3.85" />
                    </div>
                    <div>
                      <label className={labelClass}>Maximum Possible *</label>
                      <input required type="text" value={maxGpa} onChange={e => setMaxGpa(e.target.value)} className={inputClass} placeholder="e.g., 4.0" />
                    </div>
                  </div>

                  {/* Standardised tests */}
                  <div className="border-t border-gray-200 pt-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <label className="text-[12px] font-bold text-gray-900 uppercase tracking-widest">Standardised Tests (Optional)</label>
                        <p className="text-[12px] text-gray-500 mt-1">Artemis is test-optional. Self-report if you choose.</p>
                      </div>
                      <button type="button" onClick={() => setIsTestOptional(!isTestOptional)} className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000] hover:underline">
                        {isTestOptional ? 'Hide' : 'Report Scores'}
                      </button>
                    </div>
                    {isTestOptional && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                          <label className={labelClass}>SAT Math</label>
                          <input type="number" min="200" max="800" value={satMath} onChange={e => setSatMath(e.target.value)} className={inputClass} placeholder="200-800" />
                        </div>
                        <div>
                          <label className={labelClass}>SAT Reading/Writing</label>
                          <input type="number" min="200" max="800" value={satReading} onChange={e => setSatReading(e.target.value)} className={inputClass} placeholder="200-800" />
                        </div>
                        <div>
                          <label className={labelClass}>ACT Composite</label>
                          <input type="number" min="1" max="36" value={actScore} onChange={e => setActScore(e.target.value)} className={inputClass} placeholder="1-36" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(1)} className="px-8 py-3 border-2 border-gray-300 text-gray-600 text-[12px] font-bold uppercase tracking-widest hover:border-[#8A0000] hover:text-[#8A0000] transition-colors rounded">
                    &larr; Back
                  </button>
                  <button type="button" onClick={() => setCurrentStep(3)} className="flex items-center gap-2 px-8 py-3 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#141414] transition-colors rounded">
                    Next: Portfolio <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ═══ PART 3: ACCOMPLISHMENTS & STATEMENTS ═══ */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100">
                  <div className="mb-8 flex items-center space-x-3">
                    <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Part 3 — Accomplishments & Statements</span>
                  </div>

                  <p className="text-[14px] text-gray-600 leading-relaxed mb-8">
                    Describe your most meaningful achievements. Artemis does not define what counts as an accomplishment — you choose what matters most. Provide between 3 and 6 items, each with a brief description of your role and its impact.
                  </p>

                  {/* Accomplishments */}
                  {accomplishments.map((acc, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-6 mb-6">
                      <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-4 uppercase">
                        Accomplishment {i + 1}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className={labelClass}>Title *</label>
                          <input required type="text" value={acc.title} onChange={e => updateAccomplishment(i, 'title', e.target.value)} className={inputClass} placeholder="e.g., Founded community coding initiative" />
                        </div>
                        <div>
                          <label className={labelClass}>Your Role *</label>
                          <input required type="text" value={acc.role} onChange={e => updateAccomplishment(i, 'role', e.target.value)} className={inputClass} placeholder="e.g., Founder and lead organiser" />
                        </div>
                        <div>
                          <label className={labelClass}>Description *</label>
                          <textarea required rows={3} value={acc.description} onChange={e => updateAccomplishment(i, 'description', e.target.value)} className={`${inputClass} resize-none`} placeholder="What inspired this, what you did, and what you learned..." />
                        </div>
                        <div>
                          <label className={labelClass}>Impact / Outcome</label>
                          <textarea rows={2} value={acc.impact} onChange={e => updateAccomplishment(i, 'impact', e.target.value)} className={`${inputClass} resize-none`} placeholder="Measurable results, recognition, or lasting change..." />
                        </div>
                      </div>
                    </div>
                  ))}

                  {accomplishments.length < 6 && (
                    <button type="button" onClick={addAccomplishment} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 text-[12px] font-bold uppercase tracking-widest hover:border-[#8A0000] hover:text-[#8A0000] transition-colors rounded mb-8">
                      + Add Accomplishment ({accomplishments.length}/6)
                    </button>
                  )}

                  {/* Personal Statement */}
                  <div className="bg-white border border-gray-100 p-6 mb-6">
                    <label className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-2 block">Personal Statement (Max 500 words) *</label>
                    <p className="text-[12px] text-gray-500 mb-3">Tell us about your aspirations, what drives you, and why Artemis is the right environment for your growth.</p>
                    <textarea required rows={8} value={personalStatement} onChange={e => setPersonalStatement(e.target.value)} className={`${inputClass} resize-none`} placeholder="Write your personal statement here..." />
                    <div className="text-right mt-1 text-[11px] text-gray-400">{personalStatement.split(/\s+/).filter(Boolean).length} / 500 words</div>
                  </div>

                  {/* Mission Statement */}
                  <div className="bg-white border border-gray-100 p-6">
                    <label className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-2 block">Mission Statement (Max 250 words) *</label>
                    <p className="text-[12px] text-gray-500 mb-3">At Artemis, students declare missions, not majors. What global challenge or question do you want to dedicate your studies to?</p>
                    <textarea required rows={5} value={missionStatement} onChange={e => setMissionStatement(e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the mission you want to pursue..." />
                    <div className="text-right mt-1 text-[11px] text-gray-400">{missionStatement.split(/\s+/).filter(Boolean).length} / 250 words</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(2)} className="px-8 py-3 border-2 border-gray-300 text-gray-600 text-[12px] font-bold uppercase tracking-widest hover:border-[#8A0000] hover:text-[#8A0000] transition-colors rounded">
                    &larr; Back
                  </button>
                  <button type="button" onClick={() => setCurrentStep(4)} className="flex items-center gap-2 px-8 py-3 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#141414] transition-colors rounded">
                    Next: Aid & Submit <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ═══ PART 4: FINANCIAL AID & AGREEMENTS ═══ */}
            {currentStep === 4 && (
              <div id="financial-aid" className="space-y-8 scroll-mt-[110px]">
                <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100">
                  <div className="mb-8 flex items-center space-x-3">
                    <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Part 4 — Financial Aid & Agreements</span>
                  </div>

                  <p className="text-[14px] text-gray-600 leading-relaxed mb-8">
                    Artemis is need-aware: financial need is taken into consideration when making final admissions recommendations. Applying early maximises your aid prospects. All aid is funded through private philanthropy, ensuring equitable access regardless of nationality. The Extended Decision cycle does not offer financial aid.
                  </p>

                  {/* Applying for aid */}
                  <div className="mb-6">
                    <label className={labelClass}>Are you applying for financial aid? *</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-[14px]">
                        <input type="radio" name="aid" value="yes" checked={applyingForAid === 'yes'} onChange={e => setApplyingForAid(e.target.value)} className="accent-[#8A0000]" /> Yes
                      </label>
                      <label className="flex items-center gap-2 text-[14px]">
                        <input type="radio" name="aid" value="no" checked={applyingForAid === 'no'} onChange={e => setApplyingForAid(e.target.value)} className="accent-[#8A0000]" /> No
                      </label>
                    </div>
                  </div>

                  {applyingForAid === 'yes' && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                        <div>
                          <label className={labelClass}>Estimated Household Income (USD equivalent)</label>
                          <select value={householdIncome} onChange={e => setHouseholdIncome(e.target.value)} className={selectClass}>
                            <option value="">Select range...</option>
                            <option value="under-25k">Under $25,000</option>
                            <option value="25k-50k">$25,000 - $49,999</option>
                            <option value="50k-75k">$50,000 - $74,999</option>
                            <option value="75k-100k">$75,000 - $99,999</option>
                            <option value="100k-150k">$100,000 - $149,999</option>
                            <option value="150k-200k">$150,000 - $199,999</option>
                            <option value="200k-plus">$200,000+</option>
                            <option value="prefer-not">Prefer not to say</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Number of Dependents in Household</label>
                          <input type="number" min="0" value={dependents} onChange={e => setDependents(e.target.value)} className={inputClass} placeholder="e.g., 4" />
                        </div>
                      </div>
                      <div className="bg-white border border-gray-100 p-5 mb-6 text-[13px] text-gray-600 leading-relaxed">
                        <strong className="text-[#141414]">Next steps for aid applicants:</strong> After submitting your application, you will receive access to the Artemis Financial Aid Centre, where you will complete a detailed financial questionnaire and upload supporting documents (income statements, bank statements, tax returns or local equivalents). The aid deadline is one week after the application deadline for your chosen cycle.
                      </div>
                    </>
                  )}

                  {/* Agreements */}
                  <div className="border-t border-gray-200 pt-6 space-y-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="accent-[#8A0000] mt-1" />
                      <span className="text-[13px] text-gray-700 leading-relaxed">
                        I agree to the <strong>Terms of Use</strong> and <strong>Privacy Policy</strong> of the University of Artemis. I certify that all information provided in this application is true and complete to the best of my knowledge. *
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required checked={agreeCertification} onChange={e => setAgreeCertification(e.target.checked)} className="accent-[#8A0000] mt-1" />
                      <span className="text-[13px] text-gray-700 leading-relaxed">
                        I understand that I may apply in only one admissions cycle per academic year, and that if denied, I may not reapply in a subsequent cycle. I certify that I have not previously been admitted to and declined an offer from the University of Artemis. *
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(3)} className="px-8 py-3 border-2 border-gray-300 text-gray-600 text-[12px] font-bold uppercase tracking-widest hover:border-[#8A0000] hover:text-[#8A0000] transition-colors rounded">
                    &larr; Back
                  </button>
                  <button type="submit" className="flex items-center gap-2 px-10 py-4 bg-[#8A0000] text-white text-[14px] font-bold uppercase tracking-widest hover:bg-[#141414] transition-colors rounded">
                    Submit Application <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
