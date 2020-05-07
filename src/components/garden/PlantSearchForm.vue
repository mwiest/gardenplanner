<template>
  <b-form>
    <b-form-group label="Add plants">
      <b-input-group size="lg">
        <b-input
          v-model.trim="searchTerm"
          @update="search"
          type="search"
          placeholder="Hazel"
          autofocus
          debounce="500"
        />
        <template v-slot:append>
          <b-input-group-text><BIconSearch /></b-input-group-text>
        </template>
      </b-input-group>
    </b-form-group>
    <ul class="list-unstyled">
      <PlantListEntry
        v-for="result in searchResultsFiltered"
        :key="result.plantId"
        :plant="result"
        action="Add"
        @select="$emit('select', result)"
      />
    </ul>
    <b-button block pill variant="primary" to="/plants/add">New Plant</b-button>
  </b-form>
</template>

<script>
import PlantListEntry from "@/components/garden/PlantListEntry.vue";
import { BIconSearch } from "bootstrap-vue";
import Firebase from "firebase";

export default {
  name: "PlantSearchForm",
  components: {
    PlantListEntry,
    BIconSearch
  },
  props: {
    excludePlants: { type: Array, required: false }
  },
  data: function() {
    return { searchTerm: "", searchResults: [] };
  },
  methods: {
    search: function() {
      Firebase.database()
        .ref("plants")
        .orderByChild("displayName")
        .startAt(this.searchTerm)
        .endAt(this.searchTerm + "\uF8FF")
        .limitToFirst(5)
        .on("value", snap => {
          this.searchResults.splice(0, this.searchResults.length);
          snap.forEach(n => {
            this.searchResults.push({ plantId: n.key, ...n.val() });
          });
        });
    }
  },
  computed: {
    searchResultsFiltered: function() {
      return this.searchResults.filter(r => {
        return (
          !this.excludePlants ||
          this.excludePlants.length == 0 ||
          !this.excludePlants.some(p => p.plantId == r.plantId)
        );
      });
    }
  },
  mounted: function() {
    this.search();
  }
};
</script>
