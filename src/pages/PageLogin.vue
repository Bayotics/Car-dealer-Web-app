<template>
    <!-- i kind of rushed through the front end of the login page so pardon me for the rough work. Bayotics ;) -->
      <body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form>
        <h3>Login Here</h3>
	<div class="field">
                <div class="control">
        <label for="username">Email</label>
	 <input v-model="form.email"
                         @blur="$v.form.email.$touch()"
                         class="input is-large"
                         type="email"
			 id = "username"
                         placeholder="Your Email"
                         autofocus=""
                         autocomplete="email">
	 <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">Email is required</span>
                    <span v-if="!$v.form.email.email" class="help is-danger">Email address is not valid</span>
                  </div>
		</div>
		</div>
        <label for="password">Password</label>

	<div class="field">
                <div class="control">
                  <input v-model="form.password"
                         @blur="$v.form.password.$touch()"
                         class="input is-large"
                         type="password"
			 id = "password"
                         placeholder="Your Password"
                         autocomplete="current-password">
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span v-if="!$v.form.password.required" class="help is-danger">Password is required</span>
                  </div>
                </div>
              </div>
        <button @click.prevent="login"
                      :disabled="isFormInvalid">
                      Login</button>
        <div class="social">
          <div class="go"> <a href = "#">Sign in with Google?</a></div>
          <router-link :to="{name: 'PageRegister'}"><div class="fb">Sign Up</div></router-link> &nbsp;·&nbsp;
        </div>
    </form>
</body>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        form: {
          email: null,
          password: null
        }
      }
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    computed: {
      isFormInvalid () {
        return this.$v.form.$invalid
      }
    },
    methods: {
      login () {
        this.$v.form.$touch()
        this.$store.dispatch('auth/loginWithEmailAndPassword', this.form)
          .then(() => this.$router.push('/'))
          .catch((errorMessage) => {
            this.$toasted.error(errorMessage, {duration: 5000})
          })
      }
    }
  }
</script>

<style scoped>
  *:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    background-color: #080710;
    height: 800px;
}
.background{
    width: 430px;
    height: 540px;
    position: relative;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}
form{
    min-height: 530px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    margin-top: 150px;
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: #e5e5e5;
}
button{
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
.social{
  margin-top: 30px;
  display: flex;
}
.social div{
  width: 150px;
  border-radius: 3px;
  padding: 0;
  min-height: 30px;
  color: #eaf0fb;
  text-align: center;
}
.social div:hover{
  /* background-color: rgba(255,255,255,0.47); */
}
.social .fb{
  margin-left: 25px;
}
.social i{
  margin-right: 4px;
}
.help.is-danger {
    color: #ff3860;
    font-size: 14px;
}
</style>