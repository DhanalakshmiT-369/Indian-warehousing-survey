window.SURVEY_DATA = {};
window.SURVEY_DATA.SECTIONS = [
  {num:1,title:"Respondent profile",qs:[1,2,3,4,5],tip:"Tell us about your organisation — this helps tailor later questions."},
  {num:2,title:"Current state of warehousing",qs:[6,7,8,9,10],tip:"Share your view on where India's warehousing sector stands today."},
  {num:3,title:"Business scale & growth",qs:[11,12,13,14,15,16,17],tip:"Questions on capacity, costs, and growth trends."},
  {num:4,title:"Opportunities",qs:[18,19,20,21,22],tip:"Where do you see the biggest opportunities ahead?"},
  {num:5,title:"Challenges & bottlenecks",qs:[23,24,25,26,27,28],tip:"What's holding the sector back?"},
  {num:6,title:"Technology adoption",qs:[29,30,31,32,33,34,35],tip:"WMS, automation, IoT, and digital maturity."},
  {num:7,title:"Policy & regulatory",qs:[36,37,38,39,40,41],tip:"GST, NLP, and government initiatives."},
  {num:8,title:"Sustainability & green",qs:[42,43,44,45],tip:"ESG, green buildings, and sustainability barriers."},
  {num:9,title:"Global benchmarking",qs:[46,47,48,49,50,51],tip:"How India compares internationally."},
  {num:10,title:"Cold chain",qs:[52,53,54],tip:"Temperature-controlled logistics and gaps."},
  {num:11,title:"Workforce & skills",qs:[55,56,57],tip:"Training, skills gaps, and workforce quality."},
  {num:12,title:"E-commerce & quick commerce",qs:[58,59,60],tip:"Dark stores, fulfilment models, and quick commerce."},
  {num:13,title:"Investment & financing",qs:[61,62,63],tip:"Capital sources, REITs, and financing challenges."},
  {num:14,title:"Future outlook",qs:[64,65,66],tip:"5-year outlook and 2030 scenarios."},
  {num:15,title:"Strategic recommendations",qs:[67,68,69,70,71,72,73,74,75],tip:"Your policy and strategic recommendations — the final stretch!"},
];
window.SURVEY_DATA.QUESTIONS = Object.assign({}, ...Object.keys(window.SURVEY_QUESTION_SECTIONS || {})
  .sort((a, b) => Number(a) - Number(b))
  .map(key => window.SURVEY_QUESTION_SECTIONS[key]));
window.SURVEY_DATA.AUTOFILL_RULES = {
  12:{from:[1],fn:(a)=>{const r=a[1];if(!r)return null;if(r.includes('E-commerce'))return'Grown very rapidly (>30% p.a.)';if(r.includes('FMCG'))return'Grown strongly (15%–30% p.a.)';if(r.includes('Logistics'))return'Grown moderately (5%–15% p.a.)';return null;}},
  15:{from:[1],fn:(a)=>{const r=a[1];if(!r)return null;if(r.includes('E-commerce'))return'1–3 years';if(r.includes('Operator')||r.includes('3PL'))return'3–5 years';if(r.includes('Manufacturer'))return'5–9 years';return null;}},
  10:{from:[1],fn:(a)=>{const r=a[1];if(!r)return null;if(r.includes('Consultant')||r.includes('Government')||r.includes('Technology'))return'Not applicable to my role';return null;}},
  11:{from:[1],fn:(a)=>{const r=a[1];if(!r)return null;if(r.includes('Consultant')||r.includes('Government')||r.includes('Technology')||r.includes('Financial'))return'Not applicable';return null;}},
  57:{from:[1],fn:(a)=>{const r=a[1];if(!r)return null;if(r.includes('Consultant')||r.includes('Government')||r.includes('Technology')||r.includes('Financial'))return'Not applicable';return null;}},
  59:{from:[1],fn:(a)=>{const r=a[1];if(!r)return null;if(!r.includes('E-commerce'))return'Not applicable';return null;}},
  37:{from:[4],fn:(a)=>{const r=a[4];if(!r)return null;if(r.includes('2 years')||r.includes('2–5'))return'Neutral – too early to assess impact';if(r.includes('20 years'))return'Moderately effective – good intent but limited execution';return null;}},
  64:{from:[12],fn:(a)=>{const r=a[12];if(!r)return null;if(r.includes('very rapidly')||r.includes('strongly'))return'Very Optimistic – strong growth, policy support and global competitiveness';if(r.includes('moderately'))return'Optimistic – solid growth with some challenges being resolved';if(r.includes('flat'))return'Neutral – moderate growth but significant structural challenges remain';return null;}},
  61:{from:[2],fn:(a)=>{const r=a[2];if(!r)return null;if(r.includes('10 Crore')||r.includes('50 Crore'))return'Promoter / owner equity without institutional backing';if(r.includes('5,000 Crore'))return'Foreign direct investment (foreign PE / institutional funds)';return null;}},
  44:{from:[42],fn:(a)=>{const r=a[42];if(!r)return null;if(r.includes('Core strategic'))return'Brand image and investor ESG expectations';if(r.includes('Increasingly'))return'Long-term cost savings (energy, water)';if(r.includes('Low priority')||r.includes('Not relevant'))return'Sustainability is not yet a driver';return null;}},
};
window.SURVEY_DATA.STORAGE_KEY = 'india_warehousing_survey_draft';

