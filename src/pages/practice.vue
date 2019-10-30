<template>
  <q-page padding>
    <button style="position:absolute; right: 10px"
    @click="counter++"
    >{{ counter }}</button>
    <input type="text" name="" v-model="message"
    @keyup.enter="alertMessage"
    @keyup.esc="clearMessage"
    v-autofocus
    v-bind:class="{'error': message.length > 22 }"
    />
     <input type="text" name="" v-model="message"
    @keyup.enter="alertMessage"
    @keyup.esc="clearMessage"
    v-autofocus
    :style="errorStyle"
    />
       <input type="text" name="" v-model="message"
    @keyup.enter="alertMessage"
    @keyup.esc="clearMessage"
    v-autofocus
    :class="{'error': message.length > 10}"
    ref="messageInput"
    />
    <button @click="clearMessage">Clear</button>
    <div>{{message.length}}</div>
    <h5 class="border-grey" v-if="message.length">{{ message }}</h5>
    <h6 v-else>No message entered</h6>
    <hr>
    <p>Uppercase message: {{ messageUppercase }} </p>
    <p>Lowercase message: {{ message | messageLowercase }} </p>
  </q-page>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      message: 'vvv',
      counter: 0
    }
  }, 
  computed: {
    messageUppercase(){
      console.log('messageUpdercase was fired');
      return this.message.toUpperCase() + this.counter
    },
    errorStyle(){
      if(this.message.length > 5) {
        return {
          'color':'red',
          'background':'yellow'
        }
      }
    }
  },
  methods: {
    clearMessage() {
      this.message = '';
    },
    alertMessage() {
      alert(this.message);
    }
  },
  filters: {
    messageLowercase(value) {
      return value.toLowerCase();
    }
  },
  directives: {
    autofocus: {
      inserted(el) {
        el.focus();
        console.log('input inserted');
      }
    }
  },
  beforeCreate(){
    console.log('beforeCreate');
  },
  created(){
    console.log('created');
  },
  beforeMount(){
    console.log('beforeMount');
  },
  mounted(){
    console.log('mounted');
    console.log(this.$refs);
    this.$refs.messageInput.className = 'bg-green';
  },
  beforeUpdate(){
    console.log('beforeUpdate');
  },
  updated(){
    console.log('updated');
  },
  beforeDestroy(){
    console.log('beforeDestroy');
  }, 
  destroyed(){
    console.log('destroyed');
  }

}
</script>

<style>
.border-grey {
  border: 1px solid grey;
}
input, button {
  font-size: 23px;
}
.error {
  color: red;
  background: pink;
}
</style>