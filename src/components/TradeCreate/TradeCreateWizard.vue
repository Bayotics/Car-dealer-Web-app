<template>
  <div class="trade-create-form">
    <div class="current-step is-pulled-right">
      {{currentStep}} of {{allStepsCount}}
    </div>
    <!-- Form Steps -->
    <keep-alive>
      <component :is="currentComponent"
                 @stepUpdated="mergeStepData"
                 ref="currentComponent"
                 :tradeToCreate="form" />
    </keep-alive>

    <progress class="progress"
              :value="currentProgress"
               max="100">{{currentProgress}}%</progress>
    <div class="controll-btns m-b-md" >
      <button v-if="currentStep !== 1"
              @click="moveToPreviousStep"
              class="button is-primary m-r-sm" style = "background-color: #209cee">Back</button>
      <button v-if="currentStep !== allStepsCount"
              @click="moveToNextStep"
              :disabled="!canProceed"
              class="button is-primary" style = "background-color: #209cee">Next</button>
      <button v-else
              @click="emitTradeConfirm"
              class="button is-primary" style = "background-color: #209cee">Confirm</button>
    </div>
  </div>
</template>

<script>
  import TradeLocation from './TradeLocation'
  import TradeDetail from './TradeDetail'
  import TradeDescription from './TradeDescription'
  import TradeConfirmation from './TradeConfirmation'
  export default {
    components: {
      TradeLocation,
      TradeDetail,
      TradeDescription,
      TradeConfirmation
    },
    data () {
      return {
        currentStep: 1,
        canProceed: false,
        formSteps: ['TradeLocation', 'TradeDetail', 'TradeDescription', 'TradeConfirmation'],
        form: {
          location: null,
          title: null,
          // startDate: null,
          category: null,
          image: null,
          shortInfo: null,
          description: null,
          timeTo: null,
          timeFrom: null,
          price: null, 
          priceTag: null,
          whatsApp: null,
          brand: null
        }
      }
    },
    computed: {
      allStepsCount () {
        return this.formSteps.length
      },
      currentProgress () {
        return (100 / this.allStepsCount) * this.currentStep
      },
      currentComponent () {
        return this.formSteps[this.currentStep - 1]
      }
    },
    methods: {
      mergeStepData (step) {
        this.form = {...this.form, ...step.data}
        this.canProceed = step.isValid
      },
      moveToNextStep () {
        this.currentStep++

        this.$nextTick(() => {
          this.canProceed = !this.$refs['currentComponent'].$v.$invalid
        })
      },
      moveToPreviousStep () {
        this.currentStep--
        this.canProceed = true
      },
      emitTradeConfirm () {
        this.$emit('tradeConfirmed', this.form)
      }
    }
  }
</script>

<style scoped>
  .trade-create-form {
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 840px;
    padding: 24px 16px 8px;
    width: 100%;
  }
</style>