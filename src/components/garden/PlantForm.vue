<template>
  <b-form class="plantform" @submit.stop.prevent="onSubmit">
    <b-form-group
      label="Display name"
      invalid-feedback="Please pick a display name."
      :state="displayNameState"
    >
      <b-form-input
        v-model.trim="localPlant.displayName"
        type="text"
        placeholder="Chaste tree"
        :state="displayNameState"
      />
    </b-form-group>
    <b-form-group label="Synonyms">
      <b-form-input
        v-model.trim="synonymStr"
        type="text"
        placeholder="Chastetree, Monk's pepper"
      />
    </b-form-group>
    <b-form-group
      label="Scientific name"
      invalid-feedback="Please research the plant's scientific (latin) name."
      :state="sciNameState"
    >
      <b-form-input
        v-model.trim="localPlant.sciName"
        type="text"
        placeholder="Vitex agnus-castus"
        :state="sciNameState"
      />
    </b-form-group>
    <b-form-group
      label="Description"
      invalid-feedback="Please give a short description."
      :state="descriptionState"
    >
      <b-form-textarea
        v-model.trim="localPlant.description"
        type="text"
        placeholder="..."
        rows="4"
        :state="descriptionState"
      />
    </b-form-group>
    <div role="tablist">
      <div
        v-for="action in localPlant.actions"
        :key="action.plantActionId"
        class="plantform__action"
      >
        <div
          class="d-flex justify-content-between align-items-center font-weight-bold"
        >
          <b-icon-calendar class="mr-2" />
          <span class="flex-grow-1"
            >{{ action.dateName
            }}<span v-if="action.dateName && action.name">: </span
            >{{ action.name }}</span
          >
          <b-button
            variant="link"
            @click="
              activeAction =
                activeAction !== action.plantActionId
                  ? action.plantActionId
                  : null
            "
            ><b-icon-pencil
              v-show="activeAction !== action.plantActionId"/><b-icon-check
              v-show="activeAction == action.plantActionId"
          /></b-button>
          <b-button variant="link" @click="deleteAction(action)"
            ><b-icon-trash variant="danger"
          /></b-button>
        </div>
        <b-collapse :visible="activeAction == action.plantActionId">
          <plant-action-form
            :action="action"
            :validated="validated"
            :invalidActions="invalidActions"
          />
        </b-collapse>
      </div>
      <b-button variant="link" @click="addAction">
        <b-icon-plus varian="success" />
        Add
      </b-button>
    </div>
    <b-button type="submit" block variant="primary" class="mt-3">Save</b-button>
  </b-form>
</template>
<script>
import {
  BIconCalendar,
  BIconPencil,
  BIconTrash,
  BIconCheck,
  BIconPlus
} from "bootstrap-vue";
import PlantActionForm from "@/components/garden/PlantActionForm.vue";

export default {
  name: "PlantForm",
  components: {
    PlantActionForm,
    BIconCalendar,
    BIconPencil,
    BIconTrash,
    BIconCheck,
    BIconPlus
  },
  props: {
    plant: Object
  },
  data: function() {
    return {
      localPlant: JSON.parse(JSON.stringify(this.plant)),
      validated: false,
      invalidActions: [],
      synonymStr: this.plant.synonyms.join(", "),
      activeAction: null
    };
  },
  computed: {
    displayNameState: function() {
      return !this.plant.displayName && this.validated ? false : null;
    },
    sciNameState: function() {
      return !this.plant.sciName && this.validated ? false : null;
    },
    descriptionState: function() {
      return !this.plant.description && this.validated ? false : null;
    }
  },
  methods: {
    onSubmit: function() {
      this.validated = true;
      if (
        this.displayNameState !== false &&
        this.sciNameState !== false &&
        this.descriptionState !== false &&
        this.invalidActions.length === 0
      ) {
        console.log("Submit");
        this.activeAction = null;
        this.$emit("update:plant", this.localPlant);
      }
    },
    addAction: function() {
      const newAction = { plantActionId: this.uuidv4() };
      this.localPlant.actions.push(newAction);
      this.activeAction = newAction.plantActionId;
      this.validated = false;
    },
    deleteAction: function(action) {
      const index = this.localPlant.actions.indexOf(action);
      if (index > -1) {
        this.localPlant.actions.splice(index, 1);
        this.validated = false;
      }
    },
    uuidv4: function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  },
  watch: {
    synonymStr: function(val) {
      this.localPlant.synonyms = val.split(",").map(a => a.trim());
    }
  }
};
</script>
