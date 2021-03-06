import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import VuexPersistence from "vuex-persist";
import { shuffle } from "./utils";
import { sendToHubspot } from "./hubspot";
import { testimonials } from "./testimonials";
import { pillars } from "./pillars";
import { technologies } from "./technologies";
import { internationalPlans, bootcampFeatures } from "./plans";
import { pathways } from "./pathways";
import { certifications } from "./certifications";
import { internshipPartners } from "./internshipPartners";
import { paymentTypes } from "./paymentTypes";
import { countries } from "./countries";
import { Plan } from "@/types/Plan";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

const ENROLL = "ENROLL";
const SET_START_DATE = "SET_START_DATE";
const APPLY_PROMO_CODE = "APPLY_PROMO_CODE";
const PAY_APP_FEE = "PAY_APP_FEE";
const SET_ACTIVE_PLAN = "SET_ACTIVE_PLAN";
const SCHEDULE_CARD_PAYMENT = "SCHEDULE_CARD_PAYMENT";
const SET_PRICE_CLASS = "SET_PRICE_CLASS";
const SET_PROGRAM_TITLE = "SET_PROGRAM_TITLE";
const RESET = "RESET";

async function sendToHubspotAndTrackErrors(
  portalId: string,
  formId: string,
  payload: any
) {
  try {
    return await sendToHubspot(portalId, formId, payload);
  } catch (error) {
    const v: any = Vue;
    v.rollbar.error(error);
    throw error;
  }
}
async function sendApplication({ context, applicant, hsForm }: any) {
  const formId = hsForm || "56d6a407-24b7-4a6b-be49-45d4dbc6eea5";
  const applicantWithId = { ...applicant, learnerId: Date.now() };
  context.commit(ENROLL, applicantWithId);
  await sendToHubspotAndTrackErrors("7092117", formId, applicantWithId);
}

export default new Vuex.Store({
  state: {
    testMode: false,
    startDate: false,
    applicant: undefined,
    promoCodes: [],
    appFeePaid: undefined,
    paymentInfo: undefined,
    priceClass: undefined,
    activePlan: undefined,
  },
  mutations: {
    [RESET](state: any) {
      state.applicant = null;
      state.activePlan = null;
    },
    [SCHEDULE_CARD_PAYMENT](state: any, paymentInfo) {
      state.paymentInfo = paymentInfo;
    },
    [SET_ACTIVE_PLAN](state: any, plan) {
      state.activePlan = plan;
    },
    [ENROLL](state: any, applicant) {
      state.applicant = applicant;
    },
    [SET_START_DATE](state: any, startDate) {
      state.startDate = startDate;
    },
    [APPLY_PROMO_CODE](state: any, promoCode) {
      state.promoCodes.push(promoCode);
    },
    [PAY_APP_FEE](state: any) {
      state.appFeePaid = new Date();
    },
    [SET_PRICE_CLASS](state: any, priceClass: string) {
      state.priceClass = priceClass;
    },
    [SET_PROGRAM_TITLE](state: any, title: string) {
      state.programTitle = title;
    },
  },
  actions: {
    reset({ commit }) {
      commit(RESET);
    },
    setPriceClass(context, priceClass: string) {
      context.commit(SET_PRICE_CLASS, priceClass);
    },
    setProgramTitle(context, title: string) {
      context.commit(SET_PROGRAM_TITLE, title);
    },
    async setPaymentInfo({ commit }, paymentInfo) {
      const formId = "a69ff037-472e-4b81-a35d-1a91b59787d7";
      commit(SCHEDULE_CARD_PAYMENT, paymentInfo);
      await sendToHubspotAndTrackErrors("7092117", formId, paymentInfo);
    },
    setActivePlan(context, plan: Plan) {
      context.commit(SET_ACTIVE_PLAN, plan);
    },
    setStartDate(context, startDate) {
      context.commit(SET_START_DATE, startDate);
    },
    async startApplication(context: any, { applicant, hsForm }: any) {
      await sendApplication({ context, applicant, hsForm });
    },
    async enroll(context, applicant) {
      await sendApplication({
        context,
        applicant,
        hsForm: "c4c04dcc-7c42-4552-86df-cd3d25294c79",
      });
    },
    applyPromoCode({ commit, state }, promoCodeInput) {
      const promoCode = (promoCodeInput || "").trim();
      const hasPromoCodeCode = state.promoCodes.indexOf(promoCode) > -1;
      if (!hasPromoCodeCode) {
        commit(APPLY_PROMO_CODE, promoCode);
      }
    },
    payAppFee({ commit }) {
      commit(PAY_APP_FEE);
    },
  },
  getters: {
    getActivePlan: (state): Plan => state.activePlan,
    getInternational: (state) => {
      if (state.priceClass) {
        return internationalPlans.filter(
          (x: any) => x.priceClass === state.priceClass
        );
      }

      return internationalPlans;
    },
    getPathways: () => pathways,
    getTechnologies: () =>
      technologies.sort((a: any, b: any) => a.order - b.order),
    getMethods: () => pillars,
    getThreeTestimonials: () => {
      const arr = testimonials;
      const shuffled = shuffle(arr);
      return shuffled.slice(0, 3);
    },
    getApplicant: (state) => state.applicant,
    getStartDate: (state) => state.startDate,
    getCertifications: () => certifications,
    getInternshipPartners: () => internshipPartners,
    getPromoCodes: (state) => state.promoCodes,
    getPromoCodesDisplay: (state) =>
      (state.promoCodes || [])
        .reverse()
        .join(", ")
        .toLowerCase(),
    getApplicationFee: (state) => state.appFeePaid,
    getBootcampFeatures: () => bootcampFeatures,
    getPaymentTypes: () => paymentTypes,
    getPaymentInfo: (state) => state.paymentInfo,
    getCountries: () => countries.filter((x: any) => x.country.length < 25),
    isInternational: (state) => state.priceClass === "international",
    getPriceClass: (state) => state.priceClass,
    getProgramTitle: (state) => state.programTitle,
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
