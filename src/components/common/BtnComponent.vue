<template>
  <div class="button">
    {{ buttonText }}
    <i @click="$emit('icon-clicked', $event.target.value)">?</i>
  </div>
</template>
<script>
export default {
  name: 'BtnComponent ',
  props: {
    buttonText: {
      type: String,
      default: 'Submit',
    }
  },
  watch: {
    buttonText() {
      this.alertMe();
    }
  },
  methods: {
    alertMe() {
      window.alert(this.buttonText);
    }
  }
}
</script>
