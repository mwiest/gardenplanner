<template>
  <b-form class="plantactionform" @submit.stop.prevent="onSubmit">
    <b-row>
      <b-col col>
        <b-form-group
          label="When"
          invalid-feedback="Missing descriptive 'when'."
          label-size="sm"
          :state="whenState"
        >
          <b-form-input
            v-model.trim="action.dateName"
            type="text"
            size="sm"
            placeholder="Mid-June"
            :state="whenState"
          />
        </b-form-group>
      </b-col>
      <b-col col>
        <b-form-group
          label="Starting"
          invalid-feedback="Invalid reminder date."
          label-size="sm"
          :state="dateState"
        >
          <b-form-datepicker
            v-model="action.date"
            :date-format-options="{
              year: undefined,
              month: 'short',
              day: 'numeric'
            }"
            right
            locale="en"
            size="sm"
            :state="dateState"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group
      label="Action"
      invalid-feedback="Please provide a short name of the action."
      label-size="sm"
      :state="actionState"
    >
      <b-form-input
        v-model.trim="action.name"
        type="text"
        size="sm"
        placeholder="Harvest"
        :state="actionState"
      />
    </b-form-group>
    <b-form-group
      label="Instructions"
      invalid-feedback="Please give a short description of what to do."
      label-size="sm"
      :state="instructionState"
    >
      <b-form-textarea
        v-model.trim="action.details"
        type="text"
        size="sm"
        placeholder="..."
        rows="4"
        :state="instructionState"
      />
    </b-form-group>
  </b-form>
</template>
<script>
//import { BIconCalendar, BIconPlus } from "bootstrap-vue";

export default {
  name: "PlantActionForm",
  props: {
    action: Object,
    validated: Boolean,
    invalidActions: Array
  },
  data: function() {
    return {};
  },
  computed: {
    whenState: function() {
      return !this.action.dateName && this.validated ? false : null;
    },
    dateState: function() {
      return !this.action.date && this.validated ? false : null;
    },
    actionState: function() {
      return !this.action.name && this.validated ? false : null;
    },
    instructionState: function() {
      return !this.action.details && this.validated ? false : null;
    }
  },
  watch: {
    validated: function(val) {
      if (
        val &&
        this.whenState !== false &&
        this.dateState !== false &&
        this.actionState !== false &&
        this.instructionState !== false
      ) {
        const index = this.invalidActions.indexOf(this.action);
        if (index > -1) {
          this.invalidActions.splice(index, 1);
        }
      } else {
        this.invalidActions.push(this.action);
      }
    }
  }
};
</script>
