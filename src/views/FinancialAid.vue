<template>
  <div class="financing pb-5">
    <Hero unsplashId="XJXWbfSo2f0" height="40vh">
      <h2>Financial Aid</h2>
      <h5>We've got you covered</h5>
    </Hero>
    <div class="container mt-5">
      <h1 class="section-title">Tuition Financing from Climb Credit</h1>
      <p class="mb-5 text-center">
        CodeX Academy partners with Climb Credit to offer special financing for
        any learning plan for a minimum of 3 months.
      </p>
      <div class="row mx-auto">
        <div class="col-12 col-md-4" v-for="r in reasons" :key="r.title">
          <div class="w-75 mx-auto text-center mb-5">
            <div class="beach-ball mx-auto mb-3">
              <font-awesome-icon :icon="['fas', r.icon]"></font-awesome-icon>
            </div>
            <h3>{{ r.title }}</h3>
            <p>{{ r.description }}</p>
          </div>
        </div>
      </div>

      <div class="text-center">
        <SelectPlanButton text="Apply Now" buttonClass="btn-lg" />
      </div>

      <div class="mt-5">
        <Quote
          text="The loan process with Climb Credit has simply set the bar for loan companies.
Climb takes the ‘whole person’ and ‘whole profile’ into account."
          author="Tonia, IL"
        />
      </div>

      <div class="mt-5 text-center">
        <h3>Sample Loan</h3>
        <SampleLoan :sampleData="sampleData" :disclaimer="disclaimer" />
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Quote from "@/components/Quote";
import SampleLoan from "@/components/SampleLoan";
import SelectPlanButton from "@/components/SelectPlanButton";
import Hero from "@/components/Hero";

export default {
  components: { FontAwesomeIcon, Quote, SampleLoan, SelectPlanButton, Hero },
  data: () => ({
    reasons: [
      {
        title: "Safe and Fast",
        icon: "tv",
        description:
          "Online Application. Pre-approval in minutes. Applying does not affect credit score."
      },
      {
        title: "Flexible Terms",
        icon: "percent",
        description:
          "Flexible terms and fixed interest rates for the life of your loan."
      },
      {
        title: "Co-Borrower",
        icon: "users",
        description:
          "Add a qualifying co-borrower to your application for a better rate."
      }
    ],
    sampleData: [
      {
        title: "Loan Amount",
        content: "$9,000",
        footnote: "1",
        footnoteText:
          "Finance up to tuition. The minimum loan amount is $3,000 or max loan if below $3,000."
      },
      {
        title: "Term (months)",
        content: "45",
        footnote: "2",
        footnoteText:
          "Sample 42-month term includes 42 months of principal and interest payments. Terms vary by program."
      },
      {
        title: "Interest Rate",
        content: "7.49%",
        footnote: "3",
        footnoteText:
          "Interest rates range from 6.99%-13.99%. Actual interest rates may vary based on a number of factors."
      },
      {
        title: "APR",
        content: "9.8%",
        footnote: "4",
        footnoteText:
          "APRs on loans range from 9.87%-17.01%. An annual percentage rate (APR) in the annual rate charged for borrowing and is expressed as a percentage that represents the actual yearly cost of funds over the term of a loan. The APR includes a 5% origination fee."
      },
      {
        title: "Interest-Only Pmt",
        content: "$59",
        footnote: ""
      },
      {
        title: "Principal & Interest Pmt",
        content: "$294",
        footnote: ""
      }
    ],
    disclaimer:
      "Loan approval subject to full underwriting. Loans are originated by Climb \
      Investco, LLC (Registered as Climb Credit Investco, LLC in Florida). Code \
      X Academy does not endorse loans originated by Climb Investco, LLC and \
      Climb Investco, LLC is not affiliated with Code X Academy. California \
      Finance Lender #60DBO-44527. NMLS Consumer Access (NMLS# 1240013)."
  })
};
</script>

<style lang="scss">
@import "@/variables";

.financing {
  .beach-ball {
    background-color: $fucia;
    border-radius: 50%;
    background-image: linear-gradient($primary, $fucia);
    text-align: center;
    width: 100px;

    color: white;

    svg {
      font-size: 3em;
      height: 100px;
    }
  }
}
</style>
