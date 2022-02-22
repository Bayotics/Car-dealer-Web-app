<template>
  <form @input="emitFormData">
    <div class="field">
      <label class="title m-b-sm">Choose Title</label>
      <input v-model="form.title"
             @blur="$v.form.title.$touch()"
             class="input"
             type="text"
             placeholder="Enter Title">
      <div v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="help is-danger">Title is required</span>
      </div>
    </div>
    <!-- <div class="field">
      <label class="title m-b-sm">Start Date</label>
      <datepicker @input="setDate"
                  :disabledDates="disabledDates"
                  :input-class="'input'"
                  :placeholder= "new Date | formatDate" ></datepicker>
      <div v-if="$v.form.startDate.$error">
        <span v-if="!$v.form.startDate.required" class="help is-danger">Starts at is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">From</label>
      <vue-timepicker :minute-interval= "10"
                      @change= "changeTime($event, 'timeFrom')"></vue-timepicker>
    </div>
    <div class="field">
      <label class="title m-b-sm">To</label>
      <vue-timepicker :minute-interval= "10"
                      @change= "changeTime($event, 'timeTo')"></vue-timepicker>
    </div> -->
    <div class="field">
      <label class="title m-b-sm">Please Choose the Category.</label>
      <div class="m-b-lg">
        <div class="select">
          <select v-model="form.category"
                  @blur= "$v.form.category.$touch()"
                  @change= "emitFormData"> 
            <option v-for="category of categories"
                    :value= "category"
                    :key= "category.id"> {{category.name}} </option>
          </select>
        </div>
        <div v-if="$v.form.category.$error">
          <span v-if="!$v.form.category.required" class="help is-danger">Category is required</span>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">Please Choose the Brand.</label>
      <div class="m-b-lg">
        <div class="select">
          <select v-model="form.brand"
                  @blur= "$v.form.brand.$touch()"
                  @change= "emitFormData">
            <option v-for="brand of brands"
                    :value= "brand"
                    :key= "brand.id"> {{brand.name}} </option>
          </select>
        </div>
        <div v-if="$v.form.brand.$error">
          <span v-if="!$v.form.brand.required" class="help is-danger">Brand is required</span>
        </div>
      </div>
    </div>
     <div class="field">
      <label class="title m-b-sm">Input price in ₦.</label>
      <input v-model="form.priceTag"
             @blur="$v.form.priceTag.$touch()"
             class="input"
             type="number"
             placeholder="Input Price">
      <div v-if="$v.form.priceTag.$error">
        <span v-if="!$v.form.priceTag.required" class="help is-danger">PriceTag is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">Please Select price category</label>
      <div class="m-b-lg">
        <div class="select">
          <select v-model="form.price"
                  @blur= "$v.form.price.$touch()"
                  @change= "emitFormData">
            <option v-for="price of prices"
                    :value= "price"
                    :key= "price.id"> {{price.name}} </option>
          </select>
        </div>
        <div v-if="$v.form.price.$error">
          <span v-if="!$v.form.price.required" class="help is-danger">Price category is required</span>
        </div>
      </div>
    </div>
     <div class="field">
      <label class="title m-b-sm">Input WhatsApp number</label>
      <input v-model="form.whatsApp"
             @blur="$v.form.whatsApp.$touch()"
             class="input"
             type="number"
             placeholder="Enter WhatsApp number">
      <div v-if="$v.form.whatsApp.$error">
        <span v-if="!$v.form.whatsApp.required" class="help is-danger">WhatsApp is required</span>
      </div>
    </div>
  </form>
</template>

<script>
  // import Datepicker from 'vuejs-datepicker'
  // import VueTimepicker from 'vue2-timepicker'
  // import moment from 'moment'
  import { required } from 'vuelidate/lib/validators'
  export default {
    components: {
      // Datepicker,
      // VueTimepicker
    },
    data () {
      return {
        disabledDates: {
          customPredictor: function (date) {
            const today = new Date()
            const yesterday = today.setDate(today.getDate() - 1)
            return date < yesterday
          }
        },
        form: {
          title: null,
          // startDate: null,
          // timeTo: null,
          // timeFrom: null,
          category: null,
          price: null,
          priceTag: null,
          whatsApp: null,
          brand: null
        }
      }
    },
    validations: {
      form: {
        title: { required },
        // startDate: { required },
        category: { required },
        // timeTo: { required },
        // timeFrom: { required },
        price: { required },
        priceTag: { required },
        whatsApp: { required },
        brand: { required }
      }
    },
    computed: {
      categories () {
        return this.$store.state.categories.items
      },
      brands(){
        return this.$store.state.brands.items
      },
      prices(){
        return this.$store.state.prices.items
        // prices.forEach(item =>{
        //   for(let key in item)
        //     {
        //       if(item < 1000000){
        //         item = prices[0]
        //       }
        //       else if(item <= 2000000){
        //         item = prices[1]
        //       }
        //       else if(item <= 5000000){
        //         item = prices[2]
        //       }
        //       else if(item <= 10000000){
        //         item = prices[3]
        //       }
        //       else if(item <= 20000000){
        //         item = prices[4]
        //       }
        //       else{
        //         item = prices[5]
        //       }
        //     }        
        }
    },
    methods: {
      emitFormData () {
        this.$emit('stepUpdated', {data: this.form, isValid: !this.$v.$invalid})
      }
    },
  }
</script>

<style scoped>

</style>